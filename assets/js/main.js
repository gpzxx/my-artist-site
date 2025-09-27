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
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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

  // Popups
  const popups = document.querySelectorAll('[data-popup]');
  if (popups.length) {
    const popupById = new Map();
    const focusableSelector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let activePopup = null;
    let lastTrigger = null;
    let scrollY = 0;

    const toggleScrollLock = (lock) => {
      if (lock) {
        scrollY = window.scrollY || window.pageYOffset || 0;
        document.body.classList.add('popup-open');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
      } else {
        document.body.classList.remove('popup-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      }
    };

    const getFocusable = (popup) => {
      return Array.from(popup.querySelectorAll(focusableSelector)).filter((element) => {
        return !(element.hasAttribute('disabled') || element.getAttribute('aria-hidden') === 'true');
      });
    };

    const focusFirst = (popup) => {
      requestAnimationFrame(() => {
        const focusable = getFocusable(popup);
        const fallback = popup.querySelector('.popup__dialog') || popup;
        const target = focusable[0] || fallback;
        if (typeof target.focus === 'function') {
          try {
            target.focus({ preventScroll: true });
          } catch (error) {
            target.focus();
          }
        }
      });
    };

    const trapFocus = (event) => {
      if (!activePopup || event.key !== 'Tab') return;
      const focusable = getFocusable(activePopup);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const [first, last] = [focusable[0], focusable[focusable.length - 1]];
      const activeElement = document.activeElement;
      if (event.shiftKey) {
        if (activeElement === first || !activePopup.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
      } else if (activeElement === last || !activePopup.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    const closePopup = () => {
      if (!activePopup) return;
      activePopup.classList.remove('is-active');
      activePopup.setAttribute('aria-hidden', 'true');
      activePopup.setAttribute('hidden', '');
      toggleScrollLock(false);
      window.removeEventListener('keydown', trapFocus, true);
      const trigger = lastTrigger;
      activePopup = null;
      lastTrigger = null;
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
        if (typeof trigger.focus === 'function') {
          trigger.focus();
        }
      }
    };

    const openPopup = (id, trigger) => {
      const popup = popupById.get(id);
      if (!popup || popup === activePopup) return;
      if (activePopup) closePopup();
      activePopup = popup;
      lastTrigger = trigger || null;
      popup.removeAttribute('hidden');
      popup.setAttribute('aria-hidden', 'false');
      popup.classList.add('is-active');
      toggleScrollLock(true);
      window.addEventListener('keydown', trapFocus, true);
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'true');
      }
      focusFirst(popup);
    };

    popups.forEach((popup) => {
      const id = popup.dataset.popup;
      if (!id) return;
      popupById.set(id, popup);
      popup.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('popup__backdrop') || target.closest('[data-popup-close]')) {
          event.preventDefault();
          closePopup();
        }
      });
      popup.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closePopup();
        }
      });
    });

    document.querySelectorAll('[data-popup-target]').forEach((trigger) => {
      const id = trigger.dataset.popupTarget;
      if (!id) return;
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openPopup(id, trigger);
      });
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPopup(id, trigger);
        }
      });
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    });
  }

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
    const color = container.dataset.soundcloudColor || '#b7a6ff';
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

  // Contact form mailto handling
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const statusEl = contactForm.querySelector('[data-contact-status]');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const subjectValue = (data.get('subject') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const subject = subjectValue || 'Contact request';
      const bodyLines = [
        `Name: ${name || 'N/A'}`,
        `Email: ${email || 'N/A'}`,
        '',
        'Message:',
        message || 'N/A',
      ];
      const body = bodyLines.join('\n');
      const mailto = `mailto:bookings@kizuloge.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      if (statusEl) {
        statusEl.textContent = 'Your email application opened. Please review the details and send the message there.';
        statusEl.hidden = false;
      }
      window.setTimeout(() => {
        try {
          form.reset();
        } catch (error) {
          console.error(error);
        }
      }, 300);
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
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('in'));
  }
});
