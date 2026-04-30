document.addEventListener('DOMContentLoaded', () => {
  const defaultLanguage = 'en';
  const storageKey = 'kizu-language';
  const namespaceMap = {
    home: ['home'],
    biography: ['bio'],
    media: ['media'],
    releases: ['releases'],
    booking: ['booking'],
    impressum: ['imprint'],
    datenschutz: ['privacy'],
  };
  const pageId = document.body?.dataset.page || 'home';
  const activeNamespaces = ['common', ...(namespaceMap[pageId] ?? [])];

  const scriptEl = document.currentScript || document.querySelector('script[src*="assets/js/main.js"]');
  const localeBase = scriptEl
    ? new URL('../locales/', scriptEl.src)
    : new URL('../assets/locales/', window.location.href);

  const languageButtons = document.querySelectorAll('[data-lang-switch] [data-lang]');
  const supportedLanguages = (() => {
    const codes = Array.from(languageButtons)
      .map((button) => (button.dataset.lang || '').toLowerCase())
      .filter(Boolean);
    if (!codes.includes(defaultLanguage)) {
      codes.push(defaultLanguage);
    }
    return codes.length ? Array.from(new Set(codes)) : [defaultLanguage];
  })();

  const normalizeLang = (value) => {
    if (!value) return null;
    const short = value.toLowerCase().slice(0, 2);
    return supportedLanguages.includes(short) ? short : null;
  };

  const languageCache = new Map();
  const inflightRequests = new Map();

  const fetchLocale = async (lang) => {
    const url = new URL(`${lang}.json`, localeBase);
    try {
      const response = await fetch(url.href, { credentials: 'same-origin' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`Failed to load locale file for ${lang}`, error);
      return {};
    }
  };

  const loadLocale = async (lang) => {
    const normalized = normalizeLang(lang) || defaultLanguage;
    if (languageCache.has(normalized)) {
      return languageCache.get(normalized);
    }
    if (!inflightRequests.has(normalized)) {
      const promise = fetchLocale(normalized)
        .then((data) => {
          languageCache.set(normalized, data);
          inflightRequests.delete(normalized);
          return data;
        })
        .catch((error) => {
          inflightRequests.delete(normalized);
          throw error;
        });
      inflightRequests.set(normalized, promise);
    }
    return inflightRequests.get(normalized);
  };

  const composeBundle = (localeData) => {
    if (!localeData) return {};
    return activeNamespaces.reduce((acc, namespace) => {
      const data = localeData[namespace];
      if (!data) return acc;
      if (namespace === 'common') {
        Object.assign(acc, data);
      } else {
        acc[namespace] = data;
      }
      return acc;
    }, {});
  };

  const resolveTranslation = (bundle, key) => {
    if (!bundle) return undefined;
    const parts = key.split('.');
    let result = bundle;
    for (const part of parts) {
      if (result && Object.prototype.hasOwnProperty.call(result, part)) {
        result = result[part];
      } else {
        return undefined;
      }
    }
    return typeof result === 'string' ? result : undefined;
  };

  const getStoredLanguage = () => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      return normalizeLang(stored);
    } catch (error) {
      return null;
    }
  };

  const setStoredLanguage = (lang) => {
    try {
      window.localStorage.setItem(storageKey, lang);
    } catch (error) {
      // ignore storage errors
    }
  };

  let currentLanguage = null;

  const applyLanguage = async (lang) => {
    const normalized = normalizeLang(lang) || defaultLanguage;
    if (normalized === currentLanguage && languageCache.has(normalized)) {
      return;
    }

    const [locale, fallbackLocale] = await Promise.all([
      loadLocale(normalized),
      normalized === defaultLanguage ? Promise.resolve(null) : loadLocale(defaultLanguage),
    ]);

    const bundle = composeBundle(locale);
    const fallback = fallbackLocale ? composeBundle(fallbackLocale) : bundle;

    document.documentElement.lang = normalized;
    if (document.body) {
      document.body.dataset.language = normalized;
    }

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (!key) return;
      const attr = element.dataset.i18nAttr;
      const mode = element.dataset.i18nMode;
      const candidate = resolveTranslation(bundle, key);
      const value = candidate !== undefined ? candidate : resolveTranslation(fallback, key);
      if (value === undefined) return;
      if (attr) {
        element.setAttribute(attr, value);
      } else if (mode === 'html') {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    });

    languageButtons.forEach((button) => {
      const isActive = (button.dataset.lang || '').toLowerCase() === normalized;
      button.setAttribute('aria-pressed', String(isActive));
    });
    document.querySelectorAll('[data-lang-switch]').forEach((switcher) => {
      switcher.setAttribute('data-active-lang', normalized);
    });

    currentLanguage = normalized;
    setStoredLanguage(normalized);
    document.dispatchEvent(new CustomEvent('kizu:i18n-applied', { detail: { lang: normalized } }));
  };

  const detectInitialLanguage = () => {
    const stored = getStoredLanguage();
    if (stored) return stored;
    const candidates = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language, navigator.userLanguage];
    for (const candidate of candidates) {
      const normalized = normalizeLang(candidate);
      if (normalized) return normalized;
    }
    return defaultLanguage;
  };

  languageButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const target = button.dataset.lang;
      if (target) {
        applyLanguage(target).catch((error) => {
          console.error('Failed to switch language', error);
        });
      }
    });
  });

  applyLanguage(detectInitialLanguage()).catch((error) => {
    console.error('Failed to apply initial language', error);
  });

  // Update year stamp
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation toggle
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('.nav-toggle');

  // Create backdrop once, inject into body
  let backdrop = null;
  if (toggle && nav) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);
  }

  const closeNav = () => {
    nav.classList.remove('open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.classList.remove('active');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (backdrop) backdrop.classList.toggle('active', open);
    });

    // Close on backdrop click
    if (backdrop) {
      backdrop.addEventListener('click', closeNav);
    }

    // Close on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
        toggle.focus();
      }
    });

    // Close when a nav link is clicked (page nav)
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  // ── Stagger reveal delays for grid children ──────────
  const staggerParents = [
    '.spotlight-grid',
    '.release-grid',
    '.video-grid',
    '.bio-stats-grid',
  ];
  staggerParents.forEach((selector) => {
    const parent = document.querySelector(selector);
    if (!parent) return;
    const revealChildren = Array.from(parent.children).filter(
      (el) => el.classList.contains('reveal')
    );
    revealChildren.forEach((child, i) => {
      child.dataset.revealDelay = String(Math.min(i + 1, 6));
    });
  });

  // Keep page content offset in sync with fixed header height
  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeaderOffset = () => {
      const height = header.getBoundingClientRect().height;
      if (height) {
        document.documentElement.style.setProperty('--header-offset', `${height}px`);
      }
    };
    updateHeaderOffset();
    window.addEventListener('resize', updateHeaderOffset);
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(updateHeaderOffset);
      observer.observe(header);
    }
  }

  // Biography detail toggles
  const detailSections = new Map();
  document.querySelectorAll('[data-detail-content]').forEach((section) => {
    const key = section.dataset.detailContent;
    if (key) {
      detailSections.set(key, section);
    }
  });

  document.querySelectorAll('[data-detail-toggle]').forEach((trigger) => {
    const key = trigger.dataset.detailToggle;
    if (!key) return;
    const section = detailSections.get(key);
    if (!section) return;
    trigger.addEventListener('click', () => {
      const isOpen = !section.classList.contains('is-open');
      section.classList.toggle('is-open', isOpen);
      if (isOpen) {
        section.removeAttribute('hidden');
      } else {
        section.setAttribute('hidden', '');
      }
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Gallery lightbox
  const gallery = document.querySelector('[data-gallery]');
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImg = document.querySelector('.lightbox-media');
  const lightboxClose = document.querySelector('.lightbox-close');
  if (gallery && lightbox && lightboxImg && lightboxClose) {
    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.removeAttribute('src');
      lightboxImg.removeAttribute('srcset');
      lightboxImg.onerror = null;
    };

    gallery.addEventListener('click', (event) => {
      const img = event.target.closest('img[data-full]');
      if (!img) return;
      const fallbackSrc = img.dataset.full || '';
      const candidate = img.dataset.fullWebp || fallbackSrc || img.currentSrc;
      lightboxImg.decoding = 'async';
      if (fallbackSrc && fallbackSrc !== candidate) {
        lightboxImg.onerror = () => {
          lightboxImg.onerror = null;
          lightboxImg.src = fallbackSrc;
        };
      } else {
        lightboxImg.onerror = null;
      }
      lightboxImg.src = candidate;
      lightbox.hidden = false;
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  // Media slider
  const mediaSlider = document.querySelector('[data-media-slider]');
  if (mediaSlider) {
    const track = mediaSlider.querySelector('[data-media-track]');
    const slides = track ? Array.from(track.querySelectorAll('.media-slide')) : [];
    const prev = mediaSlider.querySelector('[data-media-prev]');
    const next = mediaSlider.querySelector('[data-media-next]');
    const dotsWrap = mediaSlider.querySelector('[data-media-dots]');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let autoTimer = null;
    const autoDelay = 7000;

    if (slides.length) {
      const initialIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
      if (initialIndex >= 0) {
        index = initialIndex;
      } else if (slides[0]) {
        slides[0].classList.add('is-active');
      }
    }

    const applyTransform = (immediate) => {
      if (!track) return;
      if (immediate) {
        track.classList.add('is-immediate');
      } else {
        track.classList.remove('is-immediate');
      }
      track.style.transform = `translateX(-${index * 100}%)`;
      if (immediate) {
        const restore = () => track.classList.remove('is-immediate');
        if (typeof window.requestAnimationFrame === 'function') {
          window.requestAnimationFrame(restore);
        } else {
          setTimeout(restore, 16);
        }
      }
    };

    const updateActiveStates = () => {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('is-active', idx === index);
      });
      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll('button');
        dots.forEach((dot, idx) => {
          dot.setAttribute('aria-current', idx === index ? 'true' : 'false');
        });
      }
    };

    const goTo = (target, options) => {
      if (!slides.length) return;
      const immediate = options && options.immediate;
      index = (target + slides.length) % slides.length;
      updateActiveStates();
      applyTransform(immediate);
    };

    const stopAuto = () => {
      if (autoTimer) {
        clearTimeout(autoTimer);
        autoTimer = null;
      }
    };

    const scheduleAuto = () => {
      if (motionQuery.matches) return;
      stopAuto();
      autoTimer = setTimeout(() => {
        goTo(index + 1);
        scheduleAuto();
      }, autoDelay);
    };

    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to highlight ${idx + 1}`);
        if (idx === index) dot.setAttribute('aria-current', 'true');
        dot.addEventListener('click', () => {
          goTo(idx);
          scheduleAuto();
        });
        dotsWrap.appendChild(dot);
      });
    };

    buildDots();
    goTo(index, { immediate: true });
    scheduleAuto();

    if (prev) {
      prev.addEventListener('click', () => {
        goTo(index - 1);
        scheduleAuto();
      });
    }

    if (next) {
      next.addEventListener('click', () => {
        goTo(index + 1);
        scheduleAuto();
      });
    }

    mediaSlider.addEventListener('pointerenter', stopAuto);
    mediaSlider.addEventListener('pointerleave', scheduleAuto);
    mediaSlider.addEventListener('focusin', stopAuto);
    mediaSlider.addEventListener('focusout', (event) => {
      const nextTarget = event.relatedTarget;
      if (!nextTarget || !mediaSlider.contains(nextTarget)) {
        scheduleAuto();
      }
    });

    mediaSlider.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(index - 1);
        scheduleAuto();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(index + 1);
        scheduleAuto();
      }
    });

    window.addEventListener('resize', () => goTo(index, { immediate: true }));

    const handleVisibility = () => {
      if (document.hidden) {
        stopAuto();
      } else {
        scheduleAuto();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const handleMotionChange = (event) => {
      if (event.matches) {
        stopAuto();
      } else {
        scheduleAuto();
      }
    };

    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', handleMotionChange);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(handleMotionChange);
    }
  }

  // Release cards flip interactions
  const releaseCards = document.querySelectorAll('[data-release-card]');
  if (releaseCards.length) {
    const hoverMedia = window.matchMedia('(hover: hover)');
    releaseCards.forEach((card) => {
      const front = card.querySelector('.release-front');
      const closeBtn = card.querySelector('[data-release-close]');
      if (!front) return;

      const setFlipped = (value) => {
        card.classList.toggle('is-flipped', value);
        front.setAttribute('aria-expanded', value ? 'true' : 'false');
      };

      const flipOpen = () => setFlipped(true);
      const flipClose = () => setFlipped(false);

      // Touch-friendly interaction
      let touchStartTime = 0;
      
      front.addEventListener('touchstart', () => {
        touchStartTime = Date.now();
      }, { passive: true });
      
      front.addEventListener('touchend', (event) => {
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < 300 && !card.classList.contains('is-flipped')) {
          event.preventDefault();
          flipOpen();
        }
      });

      front.addEventListener('click', (event) => {
        if (!hoverMedia.matches && !card.classList.contains('is-flipped')) {
          event.preventDefault();
          flipOpen();
        }
      });

      front.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          flipOpen();
        }
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          flipClose();
          if (typeof front.focus === 'function') {
            setTimeout(() => front.focus({ preventScroll: true }), 100);
          }
        });
      }

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && card.classList.contains('is-flipped')) {
          flipClose();
          if (typeof front.focus === 'function') {
            front.focus({ preventScroll: true });
          }
        }
      });

      card.addEventListener('mouseleave', () => {
        if (hoverMedia.matches && !card.contains(document.activeElement)) {
          flipClose();
        }
      });

      if (typeof hoverMedia.addEventListener === 'function') {
        hoverMedia.addEventListener('change', (event) => {
          if (event.matches) {
            flipClose();
          }
        });
      } else if (typeof hoverMedia.addListener === 'function') {
        hoverMedia.addListener((event) => {
          if (event.matches) {
            flipClose();
          }
        });
      }
    });
  }

  // Release filters
  const filters = document.querySelector('.filters');
  const grid = document.querySelector('[data-releases]');
  if (filters && grid) {
    filters.addEventListener('click', (event) => {
      const control = event.target.closest('[data-filter]');
      if (!control) return;
      const type = control.dataset.filter;
      filters.querySelectorAll('.pill').forEach((pill) => {
        pill.classList.toggle('active', pill === control);
      });
      grid.querySelectorAll('[data-type]').forEach((item) => {
        const match = type === 'all' || item.dataset.type === type;
        item.style.display = match ? '' : 'none';
      });
    });
  }

  // YouTube embeds
  const youtubeEmbeds = document.querySelectorAll('[data-youtube]');
  if (youtubeEmbeds.length) {
    let warmedYouTube = false;
    const warmConnections = () => {
      if (warmedYouTube) return;
      warmedYouTube = true;
      const head = document.head || document.getElementsByTagName('head')[0];
      if (!head) return;
      const addLink = (href) => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        if (!href.startsWith(window.location.origin)) {
          link.crossOrigin = '';
        }
        head.appendChild(link);
      };
      ['https://www.youtube.com', 'https://www.google.com', 'https://i.ytimg.com'].forEach(addLink);
    };

    const loadVideo = (container, id, autoplay) => {
      if (container.dataset.embedLoaded === 'true') return;
      const params = autoplay ? '?autoplay=1&rel=0' : '?rel=0';
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}${params}`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      container.dataset.embedLoaded = 'true';
      container.classList.remove('video-embed--lite');
      container.classList.add('video-embed--loaded');
      container.innerHTML = '';
      container.appendChild(iframe);
    };

    const getTranslation = (key) => {
      const lang = currentLanguage || defaultLanguage;
      return resolveTranslation(lang, key) ?? resolveTranslation(defaultLanguage, key);
    };

    youtubeEmbeds.forEach((container) => {
      const id = (container.dataset.youtube || '').trim();
      if (!id || id.toUpperCase().startsWith('VIDEO_ID')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'embed-placeholder';
        placeholder.innerHTML = 'Add a YouTube ID to <code>data-youtube</code> to show an embedded player.';
        container.innerHTML = '';
        container.appendChild(placeholder);
        return;
      }

      const poster = (container.dataset.youtubePoster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`).trim();
      container.classList.add('video-embed--lite');
      container.dataset.embedLoaded = 'false';
      container.innerHTML = '';

      const thumb = document.createElement('img');
      thumb.className = 'video-embed__thumb';
      thumb.src = poster;
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      thumb.alt = container.dataset.youtubeAlt || '';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'video-embed__trigger';
      button.dataset.i18n = 'media.videos.playLabel';
      button.dataset.i18nAttr = 'aria-label';

      const icon = document.createElement('span');
      icon.className = 'video-embed__icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = String.fromCharCode(0x25B6);

      const label = document.createElement('span');
      label.className = 'video-embed__text';
      label.dataset.i18n = 'media.videos.playCta';
      label.textContent = getTranslation('media.videos.playCta') || 'Play video';

      const ariaText = getTranslation('media.videos.playLabel') || label.textContent;
      button.setAttribute('aria-label', ariaText);

      button.append(icon, label);
      container.append(thumb, button);

      const activate = (autoplay) => {
        warmConnections();
        loadVideo(container, id, autoplay);
      };

      button.addEventListener('click', (event) => {
        event.preventDefault();
        activate(true);
      });
      button.addEventListener('pointerenter', warmConnections, { once: true });
      button.addEventListener('touchstart', warmConnections, { once: true, passive: true });
      button.addEventListener('focus', warmConnections, { once: true });
      container.addEventListener('pointerenter', warmConnections, { once: true });
    });
  }

  // SoundCloud embeds
  document.querySelectorAll('[data-soundcloud]').forEach((container) => {
    const url = (container.dataset.soundcloud || '').trim();
    if (!url || url.toLowerCase().includes('replace')) {
      container.innerHTML = '<div class="embed-placeholder">Paste a SoundCloud track or mix URL in <code>data-soundcloud</code>.</div>';
      return;
    }
    const truthy = (value, fallback) => {
      if (value === undefined || value === '') return fallback;
      const normalized = value.toString().toLowerCase();
      return !['false', '0', 'no', 'off'].includes(normalized);
    };
    const iframe = document.createElement('iframe');
    const color = container.dataset.soundcloudColor || '#00f5ff';
    const params = new URLSearchParams();
    params.set('url', url);
    params.set('color', color);
    params.set('auto_play', truthy(container.dataset.soundcloudAutoplay, false) ? 'true' : 'false');
    params.set('hide_related', truthy(container.dataset.soundcloudHideRelated, false) ? 'true' : 'false');
    params.set('show_comments', truthy(container.dataset.soundcloudComments, true) ? 'true' : 'false');
    params.set('show_user', truthy(container.dataset.soundcloudUser, true) ? 'true' : 'false');
    params.set('show_reposts', truthy(container.dataset.soundcloudReposts, false) ? 'true' : 'false');
    params.set('show_teaser', truthy(container.dataset.soundcloudTeaser, false) ? 'true' : 'false');
    const visual = truthy(container.dataset.soundcloudVisual, true);
    params.set('visual', visual ? 'true' : 'false');
    if (!visual) {
      params.set('show_artwork', truthy(container.dataset.soundcloudArtwork, true) ? 'true' : 'false');
      params.set('sharing', truthy(container.dataset.soundcloudSharing, true) ? 'true' : 'false');
      params.set('buying', truthy(container.dataset.soundcloudBuying, false) ? 'true' : 'false');
    }
    iframe.src = `https://w.soundcloud.com/player/?${params.toString()}`;
    iframe.allow = 'autoplay';
    iframe.loading = 'lazy';
    iframe.title = 'SoundCloud audio player';
    const desiredHeight = container.dataset.soundcloudHeight;
    if (desiredHeight) {
      const normalizedHeight = /px$|%$/.test(desiredHeight) ? desiredHeight : `${desiredHeight}px`;
      iframe.height = normalizedHeight;
      iframe.style.minHeight = normalizedHeight;
      container.style.minHeight = normalizedHeight;
      container.style.setProperty('--audio-embed-min', normalizedHeight);
    }
    container.innerHTML = '';
    container.appendChild(iframe);
  });

  // Spotify embeds
  document.querySelectorAll('[data-spotify]').forEach((container) => {
    const path = (container.dataset.spotify || '').trim();
    if (!path || path.toLowerCase().includes('replace')) {
      container.innerHTML = '<div class="embed-placeholder">Add a Spotify track or album path to <code>data-spotify</code>.</div>';
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/${path}?utm_source=generator&theme=0`;
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    iframe.title = 'Spotify audio player';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = '118px';
    iframe.style.border = '0';
    iframe.style.display = 'block';
    container.innerHTML = '';
    container.appendChild(iframe);
  });

  // Player tabs (Spotify ↔ SoundCloud)
  document.querySelectorAll('[data-player-tabs]').forEach((tabsEl) => {
    const buttons = Array.from(tabsEl.querySelectorAll('[data-tab-btn]'));
    const panels = Array.from(tabsEl.querySelectorAll('[data-tab-panel]'));
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tabBtn;
        buttons.forEach((b) => b.classList.toggle('is-active', b === btn));
        panels.forEach((p) => {
          const active = p.dataset.tabPanel === target;
          p.classList.toggle('is-active', active);
          if (active) {
            p.removeAttribute('hidden');
          } else {
            p.setAttribute('hidden', '');
          }
        });
      });
    });
  });

  // Contact / booking form — mailto handler
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const statusEl = contactForm.querySelector('[data-contact-status]');

    // Live validation: mark fields as touched on blur so :invalid shows only after interaction
    contactForm.querySelectorAll('.bform-input').forEach((field) => {
      field.addEventListener('blur', () => field.classList.add('touched'), { once: true });
    });

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;

      // Mark all fields as touched to show validation state
      form.querySelectorAll('.bform-input').forEach((f) => f.classList.add('touched'));

      if (!form.checkValidity()) {
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const data     = new FormData(form);
      const name      = (data.get('name')       || '').toString().trim();
      const email     = (data.get('email')      || '').toString().trim();
      const eventDate = (data.get('event-date') || '').toString().trim();
      const eventType = (data.get('event-type') || '').toString().trim();
      const details   = (data.get('message')    || '').toString().trim();

      const subjectParts = ['Booking Request'];
      if (eventType) subjectParts.push(eventType);
      if (eventDate) subjectParts.push(eventDate);
      const subject = subjectParts.join(' — ');

      const bodyLines = [
        `Name:        ${name      || 'N/A'}`,
        `E-Mail:      ${email     || 'N/A'}`,
        `Event Date:  ${eventDate || 'N/A'}`,
        `Event Type:  ${eventType || 'N/A'}`,
        '',
        'Details:',
        details || 'N/A',
      ];

      const mailto = `mailto:bookings@kizuloge.com`
        + `?subject=${encodeURIComponent(subject)}`
        + `&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      window.location.href = mailto;

      if (statusEl) {
        statusEl.textContent = 'Your email app is opening — review the details, then hit Send.';
        statusEl.removeAttribute('hidden');
      }

      window.setTimeout(() => {
        try { form.reset(); } catch (_) { /* ignore */ }
        form.querySelectorAll('.bform-input').forEach((f) => f.classList.remove('touched'));
      }, 400);
    });
  }

  // Scroll reveal
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -72px 0px',
      threshold: 0,
    });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('in'));
  }

  // ── Hero cursor-following glow ────────────────────────
  const hero = document.querySelector('.hero');
  if (hero && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    let targetX = 50, targetY = 50, currentX = 50, currentY = 50;
    let rafId = null;
    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      hero.style.setProperty('--mx', currentX + '%');
      hero.style.setProperty('--my', currentY + '%');
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
      hero.classList.add('is-pointer');
      if (!rafId) rafId = requestAnimationFrame(tick);
    });
    hero.addEventListener('pointerleave', () => {
      hero.classList.remove('is-pointer');
    });
  }

  // ── Keep spotlight glitch layers in sync with i18n ────
  const syncSpotlightDataText = () => {
    document.querySelectorAll('.spotlight-card h3').forEach((h) => {
      h.setAttribute('data-text', h.textContent.trim());
    });
  };
  syncSpotlightDataText();
  document.addEventListener('kizu:i18n-applied', syncSpotlightDataText);

  // ── Magnetic 3D tilt — broadened to cards across pages ─
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    const tiltSelectors = [
      { sel: '.spotlight-card', strength: 1.0 },
      { sel: '.video-card',     strength: 0.9 },
      { sel: '.bio-photo-wrap', strength: 0.7 },
      { sel: '.bio-quote',      strength: 0.6 },
    ];
    tiltSelectors.forEach(({ sel, strength }) => {
      document.querySelectorAll(sel).forEach((card) => {
        card.classList.add('tilt-target');
        card.addEventListener('pointermove', (e) => {
          const rect = card.getBoundingClientRect();
          const dx = (e.clientX - rect.left) / rect.width - 0.5;
          const dy = (e.clientY - rect.top) / rect.height - 0.5;
          card.classList.add('is-tilting');
          const tx = dx * 10 * strength;
          const ty = dy * 10 * strength;
          const rx = -dy * 8 * strength;
          const ry = dx * 8 * strength;
          card.style.transform =
            `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
          card.style.setProperty('--tilt-mx', ((dx + 0.5) * 100) + '%');
          card.style.setProperty('--tilt-my', ((dy + 0.5) * 100) + '%');
        });
        card.addEventListener('pointerleave', () => {
          card.classList.remove('is-tilting');
          card.style.transform = '';
        });
      });
    });
  }

  // ── Kinetic split-letter headlines (i18n-aware) ───────
  const kineticSelectors = [
    '.page-header h1',
    '.bio-editorial-headline',
    '.booking-page-header h1',
  ].join(',');
  const splitKineticText = (el) => {
    const text = (el.textContent || '').trim();
    if (!text) return;
    const hasChars = !!el.querySelector('.char');
    if (hasChars && el.dataset.kineticSig === text) return;
    el.dataset.kineticSig = text;
    el.setAttribute('aria-label', text);
    el.classList.add('kinetic-text');
    el.innerHTML = '';
    const words = text.split(/(\s+)/);
    let charIndex = 0;
    words.forEach((word) => {
      if (!word) return;
      if (/^\s+$/.test(word)) {
        el.appendChild(document.createTextNode(' '));
        return;
      }
      const wordEl = document.createElement('span');
      wordEl.className = 'word';
      wordEl.setAttribute('aria-hidden', 'true');
      [...word].forEach((ch) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.style.setProperty('--char-i', charIndex++);
        span.textContent = ch;
        wordEl.appendChild(span);
      });
      el.appendChild(wordEl);
    });
  };
  const splitAllKinetic = () => {
    document.querySelectorAll(kineticSelectors).forEach(splitKineticText);
  };
  // Split after i18n applies so spans aren't immediately wiped by textContent
  // assignment. The 600ms timeout is a fallback if i18n never fires.
  document.addEventListener('kizu:i18n-applied', () => requestAnimationFrame(splitAllKinetic));
  setTimeout(splitAllKinetic, 600);

  // ── Cursor glow on page-headers and bio editorial ─────
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.page-header, .booking-page-header, .bio-editorial')
      .forEach((el) => {
        el.classList.add('has-cursor-glow');
        el.addEventListener('pointermove', (e) => {
          const rect = el.getBoundingClientRect();
          el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
          el.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
          el.classList.add('is-pointer');
        });
        el.addEventListener('pointerleave', () => el.classList.remove('is-pointer'));
      });
  }

  // ── Scroll-driven parallax on headlines ───────────────
  if (!prefersReducedMotion) {
    const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'));
    // Skip .bio-editorial-headline — it's itself a .reveal target,
    // so an inline transform here would override the entrance translate.
    document.querySelectorAll('.page-header h1, .booking-page-header h1')
      .forEach((el) => {
        if (!el.hasAttribute('data-parallax')) {
          el.setAttribute('data-parallax', '0.18');
          parallaxItems.push(el);
        }
      });
    if (parallaxItems.length) {
      let ticking = false;
      const update = () => {
        const vh = window.innerHeight;
        parallaxItems.forEach((el) => {
          const rate = parseFloat(el.getAttribute('data-parallax')) || 0.18;
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const offset = (center - vh / 2) * rate;
          el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
        });
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();
    }
  }

  // ── Scroll-velocity reactive marquee ──────────────────
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack && !prefersReducedMotion) {
    let offset = 0;
    let lastScroll = window.scrollY;
    let scrollVel = 0;
    const baseSpeed = 0.55;
    let trackHalf = 0;
    const measure = () => { trackHalf = marqueeTrack.scrollWidth / 2; };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', () => {
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      scrollVel += dy;
    }, { passive: true });
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      scrollVel *= 0.85;
      const boost = Math.min(Math.abs(scrollVel) / 18, 6);
      const dir = scrollVel >= 0 ? 1 : -1;
      offset -= (baseSpeed * dt * 0.06) * (1 + boost);
      // subtle direction nudge from scroll
      offset -= dir * boost * 0.2;
      if (trackHalf > 0) {
        if (offset <= -trackHalf) offset += trackHalf;
        if (offset >= 0) offset -= trackHalf;
      }
      marqueeTrack.style.transform = `translate3d(${offset}px, 0, 0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  } else if (marqueeTrack) {
    marqueeTrack.parentElement.classList.add('is-fallback');
  }

  // ── Audio-reactive (procedural) bars behind hero ──────
  const heroEl = document.querySelector('.hero');
  if (heroEl && !prefersReducedMotion) {
    const canvas = document.createElement('canvas');
    canvas.className = 'hero__bars';
    canvas.setAttribute('aria-hidden', 'true');
    // Insert after the overlay so it stacks above it but below content
    const overlay = heroEl.querySelector('.hero__overlay');
    if (overlay && overlay.parentElement === heroEl) {
      overlay.insertAdjacentElement('afterend', canvas);
    } else {
      heroEl.insertBefore(canvas, heroEl.firstChild);
    }
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '0, 245, 255';
    const N = 80;
    const phases = Array.from({ length: N }, () => Math.random() * Math.PI * 2);
    const speeds = Array.from({ length: N }, () => 0.6 + Math.random() * 0.7);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = (t) => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const barW = w / N;
      const grad = ctx.createLinearGradient(0, h, 0, h * 0.45);
      grad.addColorStop(0,   `rgba(${accent}, 0.9)`);
      grad.addColorStop(0.6, `rgba(${accent}, 0.45)`);
      grad.addColorStop(1,   `rgba(${accent}, 0)`);
      ctx.fillStyle = grad;
      for (let i = 0; i < N; i++) {
        const p = phases[i];
        const s = speeds[i];
        const beat = 0.5 + 0.5 * Math.sin(t * 0.0028 * s + p);
        const sub  = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.0009 + i * 0.42));
        const edgeFade = 1 - Math.pow(Math.abs(i - N / 2) / (N / 2), 3);
        const amp = beat * sub * edgeFade;
        const barH = amp * h * 0.42;
        const x = i * barW + barW * 0.18;
        const bw = barW * 0.64;
        ctx.fillRect(x, h - barH, bw, barH);
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  // ── Page-transition curtain (acid wipe) ───────────────
  if (!prefersReducedMotion) {
    const curtain = document.createElement('div');
    curtain.id = 'page-curtain';
    curtain.setAttribute('aria-hidden', 'true');
    curtain.innerHTML = '<span class="page-curtain__mark">KIZU</span>';
    document.body.appendChild(curtain);

    // Subtle fade-in for the new page after a curtain navigation
    if (sessionStorage.getItem('kizu-page-incoming') === '1') {
      sessionStorage.removeItem('kizu-page-incoming');
      document.body.classList.add('is-page-fade-in');
      setTimeout(() => document.body.classList.remove('is-page-fade-in'), 460);
    }

    const isInternalNav = (a) => {
      if (!a || !a.getAttribute) return false;
      const href = a.getAttribute('href');
      if (!href) return false;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
      let url;
      try { url = new URL(a.href, location.href); } catch (_) { return false; }
      if (url.origin !== location.origin) return false;
      if (a.target && a.target !== '_self') return false;
      if (a.hasAttribute('download')) return false;
      return true;
    };

    document.addEventListener('click', (e) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!isInternalNav(a)) return;
      e.preventDefault();
      sessionStorage.setItem('kizu-page-incoming', '1');
      curtain.classList.add('is-covering');
      setTimeout(() => { window.location.href = a.href; }, 460);
    });
  }
});
