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
      { sel: '.photo-tile',     strength: 0.8 },
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

  // ── ASCII sound bars behind hero ──────────────────────
  const heroEl = document.querySelector('.hero');
  if (heroEl && !prefersReducedMotion) {
    const asciiShell = document.createElement('div');
    asciiShell.className = 'hero__ascii';
    asciiShell.setAttribute('aria-hidden', 'true');

    const asciiPre = document.createElement('pre');
    asciiPre.className = 'hero__ascii-frame';
    asciiShell.appendChild(asciiPre);

    const overlay = heroEl.querySelector('.hero__overlay');
    if (overlay && overlay.parentElement === heroEl) {
      overlay.insertAdjacentElement('afterend', asciiShell);
    } else {
      heroEl.insertBefore(asciiShell, heroEl.firstChild);
    }

    const glyphs = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];
    let columns = 0;
    let rows = 0;
    let phases = [];
    let speeds = [];
    let lastFrame = 0;

    const resize = () => {
      const rect = asciiShell.getBoundingClientRect();
      const narrow = window.matchMedia('(max-width: 640px)').matches;
      columns = Math.max(36, Math.min(narrow ? 62 : 112, Math.floor(rect.width / (narrow ? 8 : 10))));
      rows = Math.max(16, Math.min(narrow ? 26 : 34, Math.floor(rect.height / (narrow ? 16 : 18))));
      phases = Array.from({ length: columns }, () => Math.random() * Math.PI * 2);
      speeds = Array.from({ length: columns }, () => 0.7 + Math.random() * 1.2);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (t) => {
      if (t - lastFrame < 58) {
        requestAnimationFrame(draw);
        return;
      }
      lastFrame = t;

      const barHeights = [];
      for (let x = 0; x < columns; x++) {
        const centerFade = 1 - Math.pow(Math.abs(x - columns / 2) / (columns / 2), 2.4);
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.0032 * speeds[x] + phases[x]);
        const wave = 0.5 + 0.5 * Math.sin(t * 0.0012 + x * 0.34);
        const kick = Math.pow(0.5 + 0.5 * Math.sin(t * 0.0056 + x * 0.09), 5);
        const energy = Math.min(1, (pulse * 0.48 + wave * 0.34 + kick * 0.38) * (0.36 + centerFade));
        barHeights.push(Math.max(1, Math.round(energy * rows)));
      }

      const frame = [];
      for (let y = rows; y >= 1; y--) {
        let line = '';
        for (let x = 0; x < columns; x++) {
          const active = barHeights[x] >= y;
          const noise = Math.sin(t * 0.002 + x * 1.7 + y * 0.9) * 0.5 + 0.5;
          const level = active ? Math.min(glyphs.length - 1, Math.floor((1 - y / rows) * 7 + noise * 3)) : 0;
          line += glyphs[level];
        }
        frame.push(line);
      }
      asciiPre.textContent = frame.join('\n');
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
