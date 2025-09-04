document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const gallery = document.querySelector('[data-gallery]');
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImg = document.querySelector('.lightbox-media');
  const lightboxClose = document.querySelector('.lightbox-close');
  if (gallery && lightbox && lightboxImg && lightboxClose) {
    gallery.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.tagName === 'IMG' && t.dataset.full) {
        lightboxImg.src = t.dataset.full;
        lightbox.hidden = false;
      }
    });
    lightboxClose.addEventListener('click', () => (lightbox.hidden = true));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.hidden = true;
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.hidden = true;
    });
  }

  const filters = document.querySelector('.filters');
  const grid = document.querySelector('[data-releases]');
  if (filters && grid) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      const type = btn.dataset.filter;
      filters.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      grid.querySelectorAll('.release-card').forEach((card) => {
        card.style.display = type === 'all' || card.dataset.type === type ? '' : 'none';
      });
      neonConfetti(btn);
    });
  }

  // Local video sliders
  document.querySelectorAll('[data-video-slider]').forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('[data-prev]');
    const next = slider.querySelector('[data-next]');
    const dotsWrap = slider.querySelector('[data-dots]');
    let i = slides.findIndex(s => s.classList.contains('active'));
    if (i < 0) i = 0;

    const pauseAll = () => slides.forEach(v => { try { v.pause(); } catch(e){} });
    const show = (idx) => {
      i = (idx + slides.length) % slides.length;
      slides.forEach((s, j) => s.classList.toggle('active', j === i));
      if (dotsWrap) dotsWrap.querySelectorAll('button').forEach((d, j) => d.setAttribute('aria-current', j === i ? 'true':'false'));
      pauseAll();
    };

    // Dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, j) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to video ${j+1}`);
        if (j === i) b.setAttribute('aria-current','true');
        b.addEventListener('click', () => show(j));
        dotsWrap.appendChild(b);
      });
    }

    prev && prev.addEventListener('click', () => show(i - 1));
    next && next.addEventListener('click', () => show(i + 1));

    // Keyboard
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });

    // Swipe
    let sx = null;
    slider.addEventListener('pointerdown', (e) => { sx = e.clientX; });
    slider.addEventListener('pointerup', (e) => {
      if (sx == null) return; const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 30) { if (dx < 0) show(i+1); else show(i-1); }
    });
  });

  // Scroll reveal
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  // Cute tilt on hover
  const addTilt = (el) => {
    let rAF = null;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = (y * -6).toFixed(2);
      const rotY = (x * 6).toFixed(2);
      if (!rAF) rAF = requestAnimationFrame(() => {
        el.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
        rAF = null;
      });
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  };
  if (!prefersReduced) document.querySelectorAll('.tilt').forEach(addTilt);

  // Neon confetti dots (new)
  function neonConfetti(anchor) {
    if (prefersReduced) return;
    const host = document.body;
    const rect = anchor.getBoundingClientRect();
    for (let i = 0; i < 12; i++) {
      const d = document.createElement('div');
      d.setAttribute('aria-hidden', 'true');
      Object.assign(d.style, {
        position: 'fixed',
        left: `${rect.left + rect.width / 2}px`,
        top: `${rect.top + rect.height / 2}px`,
        width: '8px', height: '8px', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
        background: Math.random() > 0.5 ? 'rgba(57,255,136,.9)' : 'rgba(167,139,250,.9)',
        boxShadow: '0 0 10px rgba(57,255,136,.6), 0 0 18px rgba(167,139,250,.5)'
      });
      const dx = (Math.random() - 0.5) * 160;
      const dy = - (80 + Math.random() * 140);
      const scale = 0.6 + Math.random() * 0.8;
      d.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0 }
      ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.2,1)' });
      host.appendChild(d);
      setTimeout(() => d.remove(), 1600);
    }
  }

  // Cursor trail (interactive)
  if (!prefersReduced) {
    let last = 0;
    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - last < 25) return; // throttle
      last = now;
      const dot = document.createElement('div');
      Object.assign(dot.style, {
        position: 'fixed', left: `${e.clientX}px`, top: `${e.clientY}px`,
        width: '6px', height: '6px', borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
        background: Math.random() > 0.5 ? 'rgba(57,255,136,.85)' : 'rgba(167,139,250,.85)',
        boxShadow: '0 0 10px rgba(57,255,136,.7), 0 0 14px rgba(167,139,250,.5)'
      });
      document.body.appendChild(dot);
      dot.animate([
        { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%,-50%) scale(0.4)', opacity: 0 }
      ], { duration: 700, easing: 'ease-out' });
      setTimeout(() => dot.remove(), 720);
    });
  }

  // Parallax blobs and reactive hero glow
  const b1 = document.querySelector('.blob.b1');
  const b2 = document.querySelector('.blob.b2');
  const hero = document.querySelector('.hero-art');
  if (!prefersReduced && (b1 || b2 || hero)) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      if (b1) b1.style.transform = `translate(${x * 20}px, ${y * 10}px)`;
      if (b2) b2.style.transform = `translate(${x * -25}px, ${y * -12}px)`;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const hx = ((e.clientX - rect.left) / rect.width) * 100;
        const hy = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mx', `${hx}%`);
        hero.style.setProperty('--my', `${hy}%`);
      }
    });
    window.addEventListener('scroll', () => {
      const sy = window.scrollY || 0;
      if (hero) hero.style.transform = `translateY(${Math.min(10, sy * 0.02)}px)`;
    }, { passive: true });
  }

  // Magnetic buttons
  if (!prefersReduced) {
    document.querySelectorAll('.btn').forEach((btn) => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        btn.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
      };
      const onLeave = () => { btn.style.transform = ''; };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
  }
  // Confetti hearts
  function confetti(anchor) {
    if (prefersReduced) return;
    const host = document.body;
    for (let i = 0; i < 10; i++) {
      const s = document.createElement('span');
      s.textContent = '❤';
      s.setAttribute('aria-hidden', 'true');
      s.style.position = 'fixed';
      const rect = anchor.getBoundingClientRect();
      s.style.left = `${rect.left + rect.width / 2}px`;
      s.style.top = `${rect.top}px`;
      const size = 10 + Math.random() * 10;
      s.style.fontSize = `${size}px`;
      s.style.pointerEvents = 'none';
      s.style.zIndex = 9999;
      const dx = (Math.random() - 0.5) * 120;
      const dy = - (80 + Math.random() * 100);
      const rot = (Math.random() - 0.5) * 80;
      s.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity: 0 }
      ], { duration: 900 + Math.random() * 400, easing: 'ease-out' });
      host.appendChild(s);
      setTimeout(() => s.remove(), 1400);
    }
  }

  // Buttons: neon ripple + confetti on click
  document.querySelectorAll('.btn').forEach((b) => {
    b.addEventListener('click', (e) => {
      if (prefersReduced) return;
      const r = document.createElement('span');
      r.style.position = 'absolute';
      r.style.inset = '0';
      r.style.pointerEvents = 'none';
      const rect = b.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      r.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(57,255,136,.35), transparent 60%)`;
      b.appendChild(r);
      r.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, easing: 'ease-out' });
      setTimeout(() => r.remove(), 650);
      neonConfetti(b);
    });
  });
});
