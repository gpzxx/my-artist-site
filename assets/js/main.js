document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const setTheme = (isDark) => {
    root.dataset.theme = isDark ? 'dark' : 'light';
  };
  setTheme(themeQuery.matches);
  if (typeof themeQuery.addEventListener === 'function') {
    themeQuery.addEventListener('change', (event) => setTheme(event.matches));
  } else if (typeof themeQuery.addListener === 'function') {
    themeQuery.addListener((event) => setTheme(event.matches));
  }

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
      grid.querySelectorAll('.release-card').forEach((card) => {
        const match = type === 'all' || card.dataset.type === type;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  // Video sliders
  document.querySelectorAll('[data-video-slider]').forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('[data-prev]');
    const next = slider.querySelector('[data-next]');
    const dotsWrap = slider.querySelector('[data-dots]');
    let index = slides.findIndex((slide) => slide.classList.contains('active'));
    if (index < 0) index = 0;

    const pauseAll = () => slides.forEach((slide) => {
      try {
        slide.pause();
      } catch (error) {
        /* ignore */
      }
    });

    const show = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      if (dotsWrap) {
        dotsWrap.querySelectorAll('button').forEach((dot, i) => {
          dot.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
      }
      pauseAll();
    };

    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', `Go to video ${i + 1}`);
        if (i === index) button.setAttribute('aria-current', 'true');
        button.addEventListener('click', () => show(i));
        dotsWrap.appendChild(button);
      });
    }

    prev?.addEventListener('click', () => show(index - 1));
    next?.addEventListener('click', () => show(index + 1));

    slider.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') show(index - 1);
      if (event.key === 'ArrowRight') show(index + 1);
    });

    let startX = null;
    slider.addEventListener('pointerdown', (event) => {
      startX = event.clientX;
    });
    slider.addEventListener('pointerup', (event) => {
      if (startX == null) return;
      const deltaX = event.clientX - startX;
      startX = null;
      if (Math.abs(deltaX) > 30) {
        if (deltaX < 0) show(index + 1);
        else show(index - 1);
      }
    });
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
