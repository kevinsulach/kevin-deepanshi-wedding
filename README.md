# Kevin & Deepanshi — A Royal Wedding Invitation 💌

A cinematic, mobile-first digital wedding invitation. Guests tap a wax-sealed
royal envelope, watch gold dust rise, then scroll through the countdown,
scratch-to-reveal date, events, gallery, venue and RSVP — in deep emerald,
ivory and champagne gold.

---

## 📸 Q1: Can I change ALL the photos? — YES ✅

**Easiest way (2 minutes, no coding):**

1. Open the folder `src/assets/images/` — you will see 8 photos:
   | File | Used for |
   | --- | --- |
   | `hero-couple.jpg` | Main couple photo (top of site + gallery) |
   | `kevin.jpg` | Groom portrait |
   | `deepanshi.jpg` | Bride portrait |
   | `haldi.jpg` | Candid / haldi moment |
   | `mehendi.jpg` | Mehendi / detail shot |
   | `rings.jpg` | Rings / detail shot |
   | `silhouette.jpg` | Romantic candid |
   | `venue.jpg` | Venue / ballroom shot |
2. Replace any (or all) of them with your own photos — **keep the exact same
   file names** (e.g. your couple photo must still be called `hero-couple.jpg`).
3. Push to GitHub (see below) — the site rebuilds automatically with your photos.

**Tips:** JPG format, under ~1 MB each is ideal for fast loading on phones.
Landscape works best for hero/venue; portrait for Kevin/Deepanshi profiles.
Captions ("Haldi morning" etc.) can be edited in `src/config.ts` → `photos`.

## 🎵 Q2: Can I change the music? — YES ✅

Right now the site plays a **built-in soft instrumental** (created live in the
browser — no file, instant load, no copyright problems).

**To use your own song:**

1. Copy your song into `public/music/` — e.g. `public/music/wedding.mp3`
   (mp3 works best on Android + iPhone; keep it under ~5 MB).
2. Open `src/config.ts`, find `musicUrl: null` and change it to:
   ```ts
   musicUrl: "./music/wedding.mp3",
   ```
   (Keep the `./` at the start — it makes the song work on GitHub Pages.)
3. Push to GitHub — done. To go back to the built-in music, set it to `null` again.

## ✏️ Q3: What else can I edit?

Almost everything lives in **one file: `src/config.ts`**

| What | Where |
| --- | --- |
| Names, initials, tagline | `groom`, `bride`, `initials`, `tagline` |
| ⭐ Wedding date & time | `dateISO` (`YYYY-MM-DDTHH:MM:SS`, 24h). Set `dateTentative: false` once confirmed |
| Venue, address, map link | `venue`, `city`, `address`, `mapUrl` |
| Event dates/times | `events` array (`null` → "To Be Announced" chip) |
| Letter, love story, bios | `invitationMessage`, `loveStory`, `story` |
| Dress-code swatches | `dressCode` |
| RSVP inbox (optional, free via formspree.io) | `rsvpFormEndpoint` |

---

## 🌐 Q4: If I upload this folder to GitHub, will it work directly?

**Almost — you upload the folder + click 2 settings. No code changes needed.**
GitHub cannot show the site from raw source files alone; it needs to *build*
them once. This repo already includes an auto-build file
(`.github/workflows/deploy.yml`), so:

### Option A — GitHub Pages (free, recommended) ⭐

1. Create a new repository on GitHub (e.g. `kevin-deepanshi-wedding`).
   - **Do NOT tick "Add a README"** — this folder already has one.
2. Upload this entire folder to that repository
   (GitHub web → *Add file → Upload files*, or `git push`).
   - Make sure the branch is called **`main`**.
3. Go to **Settings → Pages** in your repo:
   - *Source* → select **`GitHub Actions`** (important!)
4. Wait ~2 minutes → open the **Actions** tab → your site link appears:
   `https://<your-username>.github.io/<repo-name>/`
5. Share that link on WhatsApp with everyone! 💛

> Every time you change photos/text/music and push again, the site
> re-builds and updates itself in ~2 minutes. Nothing else to do.

### Option B — Netlify / Vercel (easiest, no settings)

1. Drag-drop this folder at [netlify.com](https://netlify.com) → *Add new site*.
2. Build command: `npm run build` · Publish directory: `dist`.
3. You get a shareable link instantly (free HTTPS + custom name possible).

### Option C — Just the single file

Run `npm run build` on your computer → take the single file `dist/index.html`
(~2 MB, everything inside) → send it to anyone or host it anywhere.
It works even opened directly from a phone's files.

---

## 🚀 Run it on your own computer

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build → dist/index.html
```

## 📱 Feature list

- 3D royal envelope: wax seal → flap opens → card slides out → gold dust
- Live ticking countdown · scratch-the-gold-leaf date reveal with petal burst
- Event timeline with Google Maps + Add to Calendar per event
- Couple profiles, love story, polaroid strip, gallery + lightbox
- Venue showcase, travel tips, dress-code swatches, RSVP form with celebration
- Background music + floating mute/unmute toggle
- Mobile-first, fast single-file build, reduced-motion friendly

Built with React + Vite + Tailwind CSS. With love, from both families.
