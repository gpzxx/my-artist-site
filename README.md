# Artist Portfolio (Cute UI)

Static, responsive artist portfolio with a pastel, playful theme.

- Biography page
- Photos & Videos gallery with lightbox
- Releases page with filters (tracks, podcasts, mixes)
- Booking page with PDF embed and download

## Use

- Open `home/index.html` directly in a browser (or `index.html` for a redirect).

## Customize

- Brand/name: change top-left brand text in each HTML file (`home/`, `biography/`, `media/`, `releases/`, `booking/`).
- Social links: edit footer links on each page.
- Colors/theme: tweak CSS variables in `assets/css/styles.css` (top of file).
- Photos: replace files in `assets/img/` and update `media/index.html` image tags.
- Videos: swap the video sources in `media/index.html`.
- Releases: edit cards in `releases/index.html` and set `data-type` (`track|podcast|mix`).
- Favicon/logo: replace `assets/icons/favicon.svg` and `assets/icons/heart.svg`.
- Rider PDF: put your file at `assets/docs/rider.pdf` and visit `booking/`.

## Notes

- No build step or external dependencies.
- Video embeds require internet to play.
 - Animations are lightweight and respect `prefers-reduced-motion` where applicable.
