# Clement Poon — Design Portfolio

A single-page portfolio / build log covering a car-audio, power, lighting and
embedded-control project. Dark "engineering build-log" aesthetic with a
draggable before/after floodlight comparison, an animated EQ motif, and
scroll-reveal sections.

## Files
- `index.html` — the whole site (HTML + CSS + JS inline).
- `assets/img/` — all photographs and the wiring diagram.

## Deploy to GitHub Pages
1. Create a new repository (e.g. `portfolio`) and push these files to it
   (keep the folder structure: `index.html` at the root, images in `assets/img/`).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick the `main` branch and the `/ (root)` folder, then **Save**.
5. Wait ~1 minute. Your site goes live at
   `https://<your-username>.github.io/<repo-name>/`.

### Tip — a user site
If you name the repo `<your-username>.github.io`, the site is served from the
root domain `https://<your-username>.github.io/` instead of a subpath.

## Notes
- Everything is static — no build step, no dependencies.
- Fonts load from Google Fonts; an internet connection shows them, otherwise
  the browser falls back to system fonts.
- A `.nojekyll` file is included so GitHub Pages serves every file verbatim.

## Single-file alternative
`index_standalone.html` (in the download) is the exact same site with every
image embedded as a data URI — drop that one file anywhere and it just works,
no `assets/` folder needed.
