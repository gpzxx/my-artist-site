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
      lightboxImg.src = '';
    };

    gallery.addEventListener('click', (event) => {
      const img = event.target.closest('img[data-full]');
      if (!img) return;
      lightboxImg.src = img.dataset.full;
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

    const scrollToIndex = (smooth = true) => {
      if (!slideTrack) return;
      const offset = slideTrack.clientWidth * index;
      const behavior = smooth ? 'smooth' : 'auto';
      if (typeof slideTrack.scrollTo === 'function') {
        slideTrack.scrollTo({ left: offset, behavior });
      } else {
        slideTrack.scrollLeft = offset;
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
      scrollToIndex(smooth);
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

    window.addEventListener('resize', () => scrollToIndex(false));

    startAuto();
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
    const iframe = document.createElement('iframe');
    iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23b7a6ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true`;
    iframe.allow = 'autoplay';
    iframe.loading = 'lazy';
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
