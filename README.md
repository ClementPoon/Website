# Clement Poon — Portfolio

A datasheet-style portfolio site for EE internship and co-op applications.
It's plain HTML, CSS, and a little JavaScript: no build step, no frameworks, nothing to install.

Live site: **https://clementpoon.com** (custom domain via Cloudflare; also reachable at clementpoon.github.io)

---

## What's in this folder

```
index.html                  the whole site (all the text lives here)
contact.html                contact page with the message form
photography/                the photography site at clementpoon.com/photography (see below)
CNAME                       tells GitHub Pages to use clementpoon.com
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
4. Open this folder, select **everything inside it** (all the files plus the `assets` and `photography` folders), and drag it onto the upload page.
   Drag the *contents*, not the folder itself, so `index.html` ends up at the top level of the repository.
5. Click **Commit changes**.
6. Open **Settings → Pages**. Under *Build and deployment*, make sure Source is **Deploy from a branch**, Branch is **main**, folder **/ (root)**, then click **Save**. (For a `ClementPoon.github.io` repository this is usually already set.)
7. Wait a minute or two and open **https://clementpoon.com** (or clementpoon.github.io before the domain is set up). The **Actions** tab shows deploy progress.

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

## Contact form

The form on `contact.html` sends messages to ClementP@utexas.edu through **Web3Forms**, a free
service for static sites (250 messages a month). It's already set up: the access key is in
`contact.html` (search for `access_key`). The key is designed to be public.

- The first message may land in Junk; mark it "Not junk" so later ones reach your inbox.
- To send messages somewhere else, create a new key at https://web3forms.com with the new address
  and replace the old key in `contact.html`.

## Photography page (clementpoon.com/photography)

Everything for it lives in the `photography/` folder. It has its own look (dark and photo-first, with its own
fonts and icon) and it never links back to the engineering portfolio. The main site reaches it through the
**Photography** tab.

```
photography/
  index.html        the page: cover, Portraits, Travel, Cars, About, Contact
  photo.css         its styles (colors, fonts, and photo row height at the top)
<<<<<<< HEAD
  photo.js          full-screen photo viewer (arrows, swipe, zoom, Esc), header, contact form
=======
  photo.js          full-screen photo viewer (arrows, swipe, Esc), header, contact form
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
  fonts/            Instrument Serif and Inter (SIL Open Font License)
  favicon.svg, apple-touch-icon.png, og-image.jpg
  img/              your photos: img/portraits/, img/travel/, img/cars/
```

**Easiest way to add photos:** send them to Claude and say which set each one goes in. Otherwise:

<<<<<<< HEAD
1. Export two JPEGs of each photo from Lightroom at quality 90–100: one 3200 px on the long edge (`img/travel/big-bend.jpg`)
   and one 1600 px (`img/travel/big-bend-sm.jpg`). Under **Metadata**, choose "Copyright Only" and tick
=======
1. Export two JPEGs of each photo from Lightroom: one about 2400 px on the long edge (`img/travel/big-bend.jpg`)
   and one about 1200 px (`img/travel/big-bend-sm.jpg`). Under **Metadata**, choose "Copyright Only" and tick
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87
   **Remove Location Info**, so your GPS location isn't published with the photo.
2. In `photography/index.html`, find the set (search for `id="travel"`) and copy this block inside its `<div class="grid">`:
   ```html
   <figure class="shot" style="--r:1.5">
<<<<<<< HEAD
     <button class="shot__img" type="button" data-full="img/travel/big-bend.jpg"><img draggable="false" src="img/travel/big-bend-sm.jpg" width="1600" height="1067" alt="Describe the photo" loading="lazy" decoding="async"></button>
     <figcaption><span class="shot__meta">24mm · f/8 · 1/250 s · ISO 100</span></figcaption>
   </figure>
   ```
   `--r` is the photo's width ÷ height (3:2 = 1.5, 2:3 = 0.667, 4:5 = 0.8, 16:9 = 1.778). `width` and `height` are the pixel size of the `-sm` file.
3. To remove a photo, delete its whole `<figure class="shot">` block. Leave out the `<figcaption>` for a photo with no settings.

**Saving protection:** right-click, long-press, and dragging are blocked on the photos, and the large files aren't
linked directly. That stops casual "Save image as", but no website can stop screenshots, so add a watermark to any
photo you're especially protective of.

**Cover photos:** the big photo at the top is `img/cover-1440.jpg` / `img/cover-2560.jpg` (same photo, two sizes).
Each of the three cards under it uses one photo from its set; change its `<img src=…>` inside `<a class="set-card">`.
`object-position` on that image picks which part of the photo stays in view.
=======
     <a class="shot__img" href="img/travel/big-bend.jpg"><img src="img/travel/big-bend-sm.jpg" width="1200" height="800" alt="Describe the photo" loading="lazy" decoding="async"></a>
     <figcaption><span class="shot__title">Big Bend, Texas</span><span class="shot__meta">24mm · f/8 · 1/250 s · ISO 100</span></figcaption>
   </figure>
   ```
   `--r` is the photo's width ÷ height (3:2 = 1.5, 2:3 = 0.667, 4:5 = 0.8, 16:9 = 1.778). `width` and `height` are the pixel size of the `-sm` file.
3. Delete that set's gray "coming soon" frames (`<figure class="shot shot--empty" …>`) and its line
   `<p class="visually-hidden">Photos for this set are coming soon.</p>`.

**Cover photos:** the comment above `<section class="hero"` shows how to add the big photo at the top. For the three
cards under it, put `<img src="img/portraits/cover-sm.jpg" width="1200" height="1500" alt="" loading="lazy">` as the
first thing inside each `<a class="set-card">` and delete the `<span class="set-card__icon">…</span>` next to it.

**Before it goes live:** until your photos are in, the page shows gray "coming soon" frames. It's fine to publish
like that, but it looks best once the photos are in.
>>>>>>> 034399f7355ca514845a547c3b64e9b73fd8ad87

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

- **Check every detail.** Interviewers will ask about anything on here. Most text comes from your Tech résumé; a few details came from earlier notes and are worth a second look: the 12-speaker, BLE, and ESP32 details on the vehicle project.
- **Your résumé PDF includes your phone number.** Once the site is live, anyone can download it.
- **The arcade demo video is on another YouTube channel.** If it was a team project, consider crediting your partner, or upload your own copy and swap the video ID (`bRI7dZDsyjc`) in `index.html`.
- **Fix your résumé's "Portfolio" link.** On the vehicle project it points to an old LinkedIn URL; point it at `https://clementpoon.com/#vehicle` instead.
- **Link the site everywhere:** your résumé header, LinkedIn (Contact info → Website), and your GitHub profile.

## Custom domain (clementpoon.com)

The `CNAME` file tells GitHub Pages to serve this site at clementpoon.com. In Cloudflare DNS: four A records on `@` (185.199.108.153, .109.153, .110.153, .111.153) and a CNAME `www` → `clementpoon.github.io`, all set to "DNS only". Then Settings → Pages → Custom domain → `clementpoon.com` → Enforce HTTPS.

## Optional: a different domain

Buy a domain (for example `clementpoon.com`), then go to **Settings → Pages → Custom domain**. GitHub's Pages documentation walks through the DNS records.

---

Fonts: IBM Plex © IBM Corp., licensed under the SIL Open Font License 1.1 (`assets/fonts/OFL-LICENSE.txt`).
