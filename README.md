# Clement Poon — Portfolio

A datasheet-style portfolio site for EE internship and co-op applications.
It's plain HTML, CSS, and a little JavaScript: no build step, no frameworks, nothing to install.

Live site (once you publish it): **https://clementpoon.github.io**

---

## What's in this folder

```
index.html                  the whole site (all the text lives here)
404.html                    "pin not connected" page for broken links
favicon.svg                 browser-tab icon
.nojekyll                   tells GitHub Pages to serve the files as-is
README.md                   this file
assets/
  Clement_Poon_Resume.pdf   the résumé every "Résumé" button links to
  css/style.css             colors, fonts, layout (TOKENS block at the top)
  js/main.js                dark-mode toggle, photo viewer, video player, copy-email
  fonts/                    IBM Plex, self-hosted (SIL Open Font License)
  img/                      project photos, social preview image, home-screen icon
```

## Preview it on your computer

Double-click `index.html`. It opens in your browser and works offline.

## Publish it on GitHub Pages (about 5 minutes, no command line)

1. Sign in to GitHub as **ClementPoon**.
2. Click **+ → New repository**. Name it exactly **`ClementPoon.github.io`**, set it to **Public**, leave "Add a README" unchecked, and click **Create repository**.
3. On the empty repository page, click **uploading an existing file**.
4. Open this folder, select **everything inside it** (`index.html`, `404.html`, `favicon.svg`, `README.md`, `.nojekyll`, and the `assets` folder), and drag it onto the upload page.
   Drag the *contents*, not the folder itself, so `index.html` ends up at the top level of the repository.
5. Click **Commit changes**.
6. Open **Settings → Pages**. Under *Build and deployment*, make sure Source is **Deploy from a branch**, Branch is **main**, folder **/ (root)**, then click **Save**. (For a `ClementPoon.github.io` repository this is usually already set.)
7. Wait a minute or two and open **https://clementpoon.github.io**. The **Actions** tab shows deploy progress.

> **About `.nojekyll`:** Mac Finder hides files whose names start with a dot, so it may not get dragged in. The site works fine without it. (Press **Cmd + Shift + .** in Finder to show hidden files.) Windows shows it normally.

### Or, with git

```bash
cd path/to/this/folder
git init -b main
git add .
git commit -m "Portfolio site"
git remote add origin https://github.com/ClementPoon/ClementPoon.github.io.git
git push -u origin main
```

### Using a different repository name

If you name the repository something else, like `portfolio`, the site lives at
`https://clementpoon.github.io/portfolio/`. Everything still works because all links are relative, except:

- the 4 URL tags near the top of `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`), which LinkedIn uses for link previews, and
- the two `/` links in `404.html` (`href="/"` and `/favicon.svg`), which should become `/portfolio/`.

## Updating the site later

Edit files directly on GitHub (open a file → pencil icon → **Commit changes**), or upload replacements the same way you uploaded the first time. Changes go live in about a minute.

| To change | Do this |
|---|---|
| Your résumé | Replace `assets/Clement_Poon_Resume.pdf` with a new file **with the same name**. |
| Any text | Edit `index.html`. Each section starts with a big comment, like `<!-- 4 PROJECTS -->`. |
| Add a project | Copy a whole `<article class="project"> … </article>` block, paste it after the last one, and change its `id`, number, title, chips, specs, bullets, and figure. |
| Add a photo | Put a JPG in `assets/img/` (about 1200 px wide keeps the page fast) and point an `<img src="assets/img/…">` at it. Give it a short `alt` description. |
| Contact links | Search `index.html` for `ClementP@utexas.edu`, `linkedin.com/in/clement-poon`, and `github.com/ClementPoon`. |
| "Revised October 2026" | Update the date in the header (and the `Rev` tags under Experience) when you make big changes. |
| Colors or fonts | The TOKENS block at the top of `assets/css/style.css`. |
| Social preview image | Replace `assets/img/og-image.png` (1200 × 630). LinkedIn caches previews; paste your URL into LinkedIn's Post Inspector to refresh it. |

## Before you share the link

- **Check every detail.** Interviewers will ask about anything on here. Most text comes from your Tech résumé; a few details came from earlier notes and are worth a second look: the TPS62933 part number on the payload board, and the 12-speaker, BLE, and ESP32 details on the vehicle project.
- **Your résumé PDF includes your phone number.** Once the site is live, anyone can download it.
- **The arcade demo video is on another YouTube channel.** If it was a team project, consider crediting your partner, or upload your own copy and swap the video ID (`bRI7dZDsyjc`) in `index.html`.
- **Fix your résumé's "Portfolio" link.** On the vehicle project it points to an old LinkedIn URL; point it at `https://clementpoon.github.io/#vehicle` instead.
- **Link the site everywhere:** your résumé header, LinkedIn (Contact info → Website), and your GitHub profile.

## Optional: your own domain

Buy a domain (for example `clementpoon.com`), then go to **Settings → Pages → Custom domain**. GitHub's Pages documentation walks through the DNS records.

---

Fonts: IBM Plex © IBM Corp., licensed under the SIL Open Font License 1.1 (`assets/fonts/OFL-LICENSE.txt`).
