# Notes for Claude: clementpoon.com

Clement Poon's portfolio site. This file is for future Claude sessions; it isn't published (see `.assetsignore`).

## How it's hosted
- Plain HTML/CSS/JS, no build step. Folder: `C:\Users\Cleme\OneDrive - The University of Texas at Austin\App stuff\portfolio-site`.
- GitHub repo: `ClementPoon/Website` (public). Only one branch, **`master`**, which is also the default branch.
- **Cloudflare Workers** deploys `master` to clementpoon.com. There's no Wrangler config file; the repo root is the assets folder.
  - In Cloudflare, under Settings → Build: Deploy command `npx wrangler deploy`, production branch `master`, preview builds off.
    Preview builds need a `previews` block in a Wrangler config, which the site doesn't have.
  - Don't add a `wrangler.jsonc` unless its `name` matches the Worker name in the Cloudflare dashboard (unknown), or deploys break.
- `.assetsignore` keeps `.git`, `README.md`, `CLAUDE.md`, `_to_delete`, and `Claude outputs` out of the upload.
  Cloudflare allows at most **25 MiB per file**, and the `.git` pack is over 90 MB.
- GitHub Pages is off ("None"). Leave it off, or it will fight Cloudflare for the domain.
- Clement commits and pushes himself (`git add -A`, `git commit -m "..."`, `git push`).
  Claude can't push: the device shell can't read the OneDrive `.git` folder, and the session has no GitHub access.
- `_to_delete/` holds stray files left by an accidental `git pull` on Oct 29. It's git-ignored, so Clement can delete it.

## Working on the files
- Edit in the cloud copy, test there (Playwright, html-validate, axe), then write to the folder with `device_commit_files`.
  Use `expectedMtimeMs` guards and check md5s afterwards.
- JPEGs written to the folder gain a ~5.8 KB provenance (APP11) block. The pixels don't change; that's expected.
- Clement wants: the answer first, simple explanations, git commands at the end of each change.

## Main site (`index.html`, `contact.html`, `assets/`)
- Datasheet-style EE portfolio, with a résumé at `assets/Clement_Poon_Resume.pdf`. The phone number was removed from it on Oct 30.
  The LaTeX source (Overleaf) still has the number.
- Project order: Payload (rocketry), Mintality, FPGA, Vehicle, Arcade, VIPER, Earlier builds.
- The Photography tab links to `photography/`. The photography site never links back to the main site.

## Photography site (`photography/`)
- Sections: Portraits, Travel, Cars. There are no section labels or descriptions, and no photo titles; each photo shows only its camera settings.
- Photo files:
  - `img/<set>/<slug>.jpg`: the **full-resolution original**, with metadata removed and no re-compression. Must stay under 25 MiB.
    victoria-peak was re-saved at quality 98 to fit.
  - `<slug>-sm.jpg`: 1600 px on the long side, quality 92, 4:4:4. This is what the grid shows.
  - The two Milky Way shots (`cars/under-the-milky-way`, `portraits/light-portal`) are only 1334×2000 copies; the originals were never sent.
- Each photo is a `<figure class="shot" style="--r:W/H">` holding a `<button class="shot__img" data-full="...">` with the `-sm` image inside.
  An optional `<figcaption><span class="shot__meta">`.
- Viewer (`photo.js`):
  - Opens with the `-sm` copy instantly, then swaps to the full file once it has decoded.
  - Zoom stops at 1080p size: the photo 1920 px on its long side (`ZOOM_LIMIT`). The magnifier hides when the photo is already that big.
  - Controls: click, double-tap, pinch, wheel, + / − / 0, drag to pan.
  - The variable name `current` is taken by the nav code; the viewer uses `viewSeq`.
- Save deterrents: no right-click or long-press on photos, no dragging, and no direct links to the image files.
- Cover photo: `img/cover-{1440,1920,2560,3840,5120}.jpg` with `sizes="(max-aspect-ratio: 4/3) 134vh, 100vw"`. The grain overlay is off on the cover.
- Home cards: Portraits uses `light-portal-sm` at `object-position: 50% 86%`, Travel uses `sensoji-reflection`, Cars uses `under-the-milky-way`.
- Portraits order: caven-clark-field, from-above, on-the-stairs, light-portal, stargazer (added Oct 30; 16mm, f/1.8, 13 s, ISO 1600),
  then navy-suit, white-polo, blue-tie, black-tie, glass-hallway.
- Gear list (About): Sony a7R III. Lenses, in order: Sigma 24–70mm f/2.8 DG DN II Art, Sony Zeiss 24–70 f/4, Sony 50 f/1.8,
  Sony 85 f/1.8, Tamron 70–300.
- The contact form uses Web3Forms. The key in the HTML is meant to be public.
