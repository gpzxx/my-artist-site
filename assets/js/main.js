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
      } else {
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

      if (closeBtn) {
        closeBtn.addEventListener('click', (event) => {
          event.preventDefault();
          flipClose();
          if (typeof front.focus === 'function') {
            front.focus({ preventScroll: true });
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
