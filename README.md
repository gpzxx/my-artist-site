```
██╗  ██╗██╗███████╗██╗   ██╗
██║ ██╔╝██║╚══███╔╝██║   ██║
█████╔╝ ██║  ███╔╝ ██║   ██║
██╔═██╗ ██║ ███╔╝  ██║   ██║
██║  ██╗██║███████╗╚██████╔╝
╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝
```

# KIZU — Official Artist Portfolio

> DJ · Producer · Trance · Hard House · Speed Garage · Ravensburg, DE

[![Live Site](https://img.shields.io/badge/Live%20Site-kizu-00f5ff?style=for-the-badge&logo=github-pages&logoColor=black)](https://gpzxx.github.io/my-artist-site/home/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-00f5ff?style=for-the-badge&logo=checkmarx&logoColor=black)](/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

---

A dark, high-energy artist portfolio built for the underground. Full-screen hero, flip-card release catalogue, live Spotify & SoundCloud embeds, booking form, and a photo/video gallery — all in pure HTML, CSS, and JavaScript. No framework. No build step. No bullshit.

---

## ✦ Features

| Feature | Details |
|---|---|
| **Full-screen Hero** | 100vh / 100svh (iOS safe), video-loop ready, dark overlay with electric-cyan glow |
| **Scroll Reveal** | IntersectionObserver-driven fade-in with staggered delays |
| **Release Grid** | 3D flip-cards with Spotify + SoundCloud tab players embedded per card |
| **Photo Gallery** | Touch/drag slider with keyboard arrow support and lightbox |
| **Video Section** | Lazy-loaded YouTube click-to-play embeds |
| **Booking Form** | Mailto handler with client-side validation, rider PDF download & preview |
| **i18n** | Full EN/DE language switch via JSON locale files (`assets/locales/`) |
| **Animations** | Neon-breathe buttons, hero glow pulse, hamburger → × nav — all `prefers-reduced-motion` aware |
| **Mobile Nav** | Animated backdrop + slide-in nav, keyboard-accessible |
| **Dark-first Theme** | CSS custom properties; light mode via `@media (prefers-color-scheme: light)` |

---

## ✦ Tech Stack

- **HTML5** — Semantic markup (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **CSS3** — Custom properties, Grid, Flexbox, `@supports`, `clamp()`, `backdrop-filter`
- **Vanilla JS** — ES6+, no framework, no bundler
- **Google Fonts** — [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) (hero display) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (body & UI)
- **Hosting** — GitHub Pages (static, no server)

---

## ✦ Project Structure

```
my-artist-site/
│
├── home/               ← Landing page (hero, spotlight cards, vibe section)
├── biography/          ← Bio text, stats, expandable detail panels
├── media/              ← Photo slider + YouTube video grid
├── releases/           ← Flip-card release catalogue with Spotify/SoundCloud
├── booking/            ← Booking form + technical rider download
├── impressum/          ← Legal notice (DE law)
├── datenschutz/        ← Privacy policy (DE law)
│
└── assets/
    ├── css/
    │   └── styles.css          ← Single stylesheet (~2900 lines, CSS vars at top)
    ├── js/
    │   └── main.js             ← All interactivity (i18n, nav, reveal, players, form)
    ├── locales/
    │   ├── en.json             ← English strings
    │   └── de.json             ← German strings
    ├── img/                    ← Hero image, bio portrait, press photos
    ├── icons/                  ← Social SVGs, logo, favicon
    └── docs/
        └── KIZU_Rider.pdf      ← Technical & hospitality rider
```

---

## ✦ Design System

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#00f5ff` | Buttons, glow effects, active states |
| `--bg` | `#030304` | Page background |
| `--surface` | `#09090c` | Card backgrounds |
| `--ink` | `#f2f2f5` | Body text |
| Display font | **Bebas Neue** | Hero title |
| UI font | **Space Grotesk** | Headings, body, nav |
| Border radius | `0px` | Sharp, club-aesthetic edges |

All tokens live in `:root` inside `assets/css/styles.css`. Change the accent color in one line and the whole site updates.

---

## ✦ Quickstart

No install needed. Clone and open:

```bash
git clone https://github.com/gpzxx/my-artist-site.git
cd my-artist-site
open home/index.html   # macOS
# or: start home/index.html  (Windows)
# or: xdg-open home/index.html (Linux)
```

For local development with live reload:

```bash
npx serve .
# → visit http://localhost:3000/home/
```

---

## ✦ Customization Guide

### Change accent color
Open `assets/css/styles.css`, update line 1:
```css
:root {
  --accent: #00f5ff;      /* ← swap this */
  --accent-rgb: 0, 245, 255; /* ← and this (R, G, B) */
}
```

### Swap the hero background
**Image (current default):**
Replace `assets/img/hero-kizu.jpg` and `assets/img/hero-kizu.webp` with your own files.

**Video loop (when clip is ready):**
In `home/index.html`, uncomment the `<source>` tag inside the `<video>` element:
```html
<video class="hero-bg__video" autoplay muted loop playsinline ...>
  <source src="../assets/video/hero-loop.mp4" type="video/mp4" /> <!-- uncomment this -->
</video>
```

### Update releases
Edit `releases/index.html`. Each flip-card uses:
```html
<div class="release-card" data-type="track">
  <!-- front: cover art -->
  <!-- back: title, label, year, player tabs -->
  <div data-spotify="track/YOUR_TRACK_ID"></div>
  <div data-soundcloud="YOUR_SOUNDCLOUD_URL" data-soundcloud-visual="false"></div>
</div>
```

### Update social links
Footer is identical across all pages. Search for `class="icon"` to find the social link block.

### Update locale strings
Edit `assets/locales/en.json` and `assets/locales/de.json` to change any text without touching HTML.

### Replace the rider PDF
Drop your file at `assets/docs/KIZU_Rider.pdf` — the booking page links to it automatically.

### Add/remove nav pages
1. Add a new `yourpage/index.html` folder following the existing page structure
2. Add the nav link to `<nav class="site-nav">` in every `index.html`
3. Add locale keys to both JSON files

---

## ✦ Deployment

The site deploys automatically via **GitHub Pages** from the `main` branch.

```bash
git add .
git commit -m "your changes"
git push origin main
# → live at https://gpzxx.github.io/my-artist-site/home/
```

---

## ✦ Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full (svh fix included) |
| Mobile (iOS/Android) | ✅ Touch-optimized |

---

## ✦ Performance Notes

- Zero JavaScript frameworks or build dependencies
- Fonts loaded via Google Fonts with `display=swap` to prevent FOUT
- Images use `<picture>` with `.webp` source + `.jpg` fallback
- Videos are lazy-loaded (click-to-play), no autoplay bandwidth cost
- `fetchpriority="high"` on hero image for LCP optimization
- All animations wrapped in `@media (prefers-reduced-motion: no-preference)`

---

## ✦ Contact & Booking

| | |
|---|---|
| **Booking** | [bookings@kizuloge.com](mailto:bookings@kizuloge.com) |
| **Instagram** | [@lc.kizu](https://www.instagram.com/lc.kizu) |
| **SoundCloud** | [soundcloud.com/kizuloge](https://www.soundcloud.com/kizuloge) |
| **Spotify** | [Open Artist Profile](https://open.spotify.com/intl-de/artist/2xyVS681aStt1edfMGddLY) |
| **Resident Advisor** | [ra.co/dj/kizu](https://de.ra.co/dj/kizu) |

---

<p align="center">
  <sub>Built by KIZU · Ravensburg, DE · No frameworks were harmed in the making of this site.</sub>
</p>
