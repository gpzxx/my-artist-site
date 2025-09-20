document.addEventListener('DOMContentLoaded', () => {
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

  // Media slideshow
  const gallerySlider = document.querySelector('[data-gallery-slider]');
  if (gallerySlider) {
    const slides = Array.from(gallerySlider.querySelectorAll('.media-slide'));
    const slideTrack = gallerySlider.querySelector('.media-slides');
    const prev = gallerySlider.querySelector('[data-gallery-prev]');
    const next = gallerySlider.querySelector('[data-gallery-next]');
    const dotsWrap = gallerySlider.querySelector('[data-gallery-dots]');
    let index = slides.findIndex((slide) => slide.classList.contains('active'));
    if (index < 0) index = 0;
    let timerId;

    const setTransform = (smooth = true) => {
      if (!slideTrack) return;
      if (!smooth) {
        slideTrack.classList.add('no-animate');
      } else {
        slideTrack.classList.remove('no-animate');
      }
      slideTrack.style.transform = `translateX(-${index * 100}%)`;
      if (!smooth) {
        const restore = () => slideTrack.classList.remove('no-animate');
        if (typeof requestAnimationFrame === 'function') {
          requestAnimationFrame(restore);
        } else {
          setTimeout(restore, 16);
        }
      }
    };

    const activate = (i, { smooth = true } = {}) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === index);
      });
      if (dotsWrap) {
        dotsWrap.querySelectorAll('button').forEach((dot, idx) => {
          dot.setAttribute('aria-current', idx === index ? 'true' : 'false');
        });
      }
      setTransform(smooth);
    };

    const stopAuto = () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };

    const startAuto = () => {
      stopAuto();
      timerId = setInterval(() => activate(index + 1), 6000);
    };

    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to image ${idx + 1}`);
        if (idx === index) dot.setAttribute('aria-current', 'true');
        dot.addEventListener('click', () => {
          activate(idx);
          startAuto();
        });
        dotsWrap.append(dot);
      });
    }

    activate(index, { smooth: false });

    prev?.addEventListener('click', () => {
      activate(index - 1);
      startAuto();
    });

    next?.addEventListener('click', () => {
      activate(index + 1);
      startAuto();
    });

    gallerySlider.addEventListener('pointerdown', () => stopAuto());
    gallerySlider.addEventListener('pointerup', () => startAuto());
    gallerySlider.addEventListener('pointerleave', () => startAuto());

    window.addEventListener('resize', () => setTransform(false));

    startAuto();
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

      front.addEventListener('click', (event) => {
        if (hoverMedia.matches) return;
        event.preventDefault();
        flipOpen();
      });

      front.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          flipOpen();
        }
      });

      closeBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        flipClose();
        if (typeof front.focus === 'function') {
          front.focus({ preventScroll: true });
        }
      });

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

      hoverMedia.addEventListener?.('change', (event) => {
        if (event.matches) {
          flipClose();
        }
      });
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
  document.querySelectorAll('[data-youtube]').forEach((container) => {
    const id = (container.dataset.youtube || '').trim();
    if (!id || id.toUpperCase().startsWith('VIDEO_ID')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'embed-placeholder';
      placeholder.innerHTML = 'Add a YouTube ID to <code>data-youtube</code> to show an embedded player.';
      container.innerHTML = '';
      container.appendChild(placeholder);
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?rel=0`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    container.innerHTML = '';
    container.appendChild(iframe);
  });

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
