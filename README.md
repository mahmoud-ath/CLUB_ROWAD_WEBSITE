# نادي رواد — Club Rowad

موقع تعريفي عربي بالكامل، بتجربة أصلية من اليمين إلى اليسار، لنادٍ ثقافي طلابي في الحي الجامعي بمدينة طنجة.
An Arabic-first, native RTL website for the cultural student club **نادي رواد / Club Rowad**.

Built with **React + Vite + TypeScript**, a centralized CSS-variable design system, hand-written motion
(no animation library), and lightweight inline SVG.

---

## 1. تشغيل المشروع — Run it

```bash
bun install
bun run dev       # http://localhost:5173
bun run build     # type-check + production build → dist/
bun run preview   # serve the production build
```

`npm` works too, but this project was developed with `bun`.
Requires Node 18+.

---

## 2. بنية المشروع — Architecture

```
index.html                     ← <html lang="ar" dir="rtl">, title, meta description, JSON-LD
public/
  brand/
    logo-rowad.png             ← ★ official logo (transparent PNG)
    logo-mark-512.png          ← square, trimmed master used for the icons
  favicon.ico · favicon.png · apple-touch-icon.png  ← generated from the logo
  fonts/                       ← self-hosted Tajawal WOFF2 (SIL OFL) — provisional
  video/cinemaric_video.mp4    ← hero background loop
docs/
  brand.md                     ← how to replace the logo and regenerate the icons
  media.md                     ← how to add real club photographs / clips
  fonts.md                     ← notes on the provisional font files
src/
  main.tsx                     ← design system first, then app
  App.tsx                      ← routes: home · /activities/<id> · 404
  router.tsx                   ← minimal client router (usePathname / navigate / Link)
  pages/
    HomePage.tsx               ← the home sections, unchanged
    ActivityPage.tsx           ← ★ one page per activity (alternating composition)
    NotFoundPage.tsx
  hooks/
    useActiveSection.ts        ← header current-section mark
    usePageMeta.ts             ← per-route title + meta description
  data/
    club.ts                    ← ★ all visitor-facing Arabic copy + source records
    media.ts                   ← ★ gallery, memory-mosaic tiles, archive photo pool
    activities.ts              ← ★ activity records + their cover photographs
    activityDetails.ts         ← ★ per-activity story: intro, objectives, documented
                                 entries (books, editions, courses, episodes) + links
  components/
    Header.tsx                 ← sticky header, desktop nav, accessible mobile menu
    Hero.tsx                   ← badge, headline, CTAs
    CurvedGallery.tsx          ← curved draggable gallery (rAF + pointer inertia)
    About.tsx                  ← intro + the three themes
    Activities.tsx             ← أنشطتنا: horizontal accordion of activity strips
    ActivityStory.tsx          ← story + documented entries on each activity page
    MemoryMosaic.tsx           ← paper section, 3-column vertical mosaic
    Podcast.tsx                ← «بودكاست خبرة» intro card
    Contact.tsx                ← closing CTA
    Footer.tsx
    EditorialTile.tsx          ← decorative tile built from the club's type + motifs
    Motif.tsx / icons.tsx      ← line-art motifs and SVG icon set
    Reveal.tsx                 ← entrance + line-by-line heading reveal, reduced-motion aware
    SectionHead.tsx
  styles/
    tokens.css                 ← ★ colours, type scale, spacing, radii, motion tokens
    fonts.css                  ← ★ @font-face — the only place fonts are registered
    base.css                   ← reset, layout primitives, buttons, reveal
src/components/*.css           ← component styles, all using the shared tokens
```

---

## 3. تعديل المحتوى العربي — Where to edit the Arabic copy

**كل نص يراه الزائر موجود في `src/data/`. لا حاجة لمس المكوّنات.**

| What | File |
| --- | --- |
| Club name, slogan, hero, about, themes, podcast, contact, footer | `src/data/club.ts` |
| Navigation labels + primary CTA | `navItems` / `primaryCta` in `src/data/club.ts` |
| Social links | `links` in `src/data/club.ts` |
| Where facts came from | `contentSources` in `src/data/club.ts` |
| Gallery tiles (words, colours, motifs, photos) | `src/data/media.ts` → `galleryItems` |
| Memory mosaic columns/tiles | `src/data/media.ts` → `mosaicColumns` |
| Activities | `src/data/activities.ts` |
| تفاصيل الأنشطة (الفكرة، الأهداف، اللقاءات، الحلقات، الروابط) | `src/data/activityDetails.ts` |
| Page title, meta description, social meta | `index.html` |
| Copyright year | automatic (`new Date().getFullYear()` in `Footer.tsx`) |

### إضافة نشاط (activity) حقيقي

Fill in an entry in `src/data/activities.ts`:

```ts
{
  id: 'talk-001',
  path: '/activities/talk-001',      // صفحة النشاط — تُربط بزرّ «اكتشف النشاط»
  title: 'عنوان النشاط كما نُشر',
  category: 'education',             // education | awareness | culture
  categoryLabel: 'تعليم',            // اللافتة الظاهرة تحت الاسم
  description: 'وصف قصير من المنشور الأصلي.',
  cover: '/media/activity-001.jpg',  // اتركه فارغًا إن لم توجد صورة موثّقة
  coverAlt: 'وصف الصورة كما تُنشر في المصدر',
  focus: '50% 40%',                  // object-position حين تُقصّ الصورة
  motif: 'torch',                    // book | torch | arc | dots | spark | wave | ring
}
```

Every record becomes one strip in the horizontal accordion. The selected strip
expands to three times an inactive one, keeps its photograph in full colour, and
fills the details row below with its category, description and a CTA that opens
its own page. «بودكاست خبرة» is the initial selection; a record without `cover`
shows an editorial gradient with its `motif` instead of a photograph. Filters are
intentionally **not** implemented — the brief asks for filters only when the real
volume makes them useful.

### صفحات الأنشطة — activity pages

Six real URLs, all served by the same build:

| Route | Renders |
| --- | --- |
| `/` | home (all sections) |
| `/activities/jalsat-kitab` … `/activities/your-suggestions` | `ActivityPage` for that record |
| anything else | `NotFoundPage` |

- The route is the record's `path`; nothing else needs registering.
- Routing is one small module (`src/router.tsx`) — no router dependency. `Link`
  renders a real `href`, so middle-click and ⌘/Ctrl-click still open new tabs.
- Each activity page repeats the club identity rather than inventing facts: its
  documented photo and caption, the club theme it belongs to (`club.themes`), its
  place in the series, and the other five activities. The hero alternates the
  text/photo sides by position in the list (`data-side`).
- **Hosting:** the server must answer unknown paths with `index.html` (SPA
  fallback) — Netlify `/* /index.html 200`, Vercel `rewrites`, or Nginx
  `try_files $uri /index.html`. `bun run dev` and `bun run preview` already do it.
- Section links from a sub-page use `/#about`-style URLs so they land on the home
  page first; the header dropdown and the footer list every activity.

---

## 4. الخطوط العربية — Custom Arabic fonts

Typography is aliased in `src/styles/tokens.css`:

```css
--font-display: "Rowad Display", "Tajawal", "Noto Sans Arabic", system-ui, sans-serif;
--font-body:    "Rowad Text",    "Tajawal", "Noto Sans Arabic", system-ui, sans-serif;
```

Everything in the site references only these two variables, so adding your fonts is a
single-file change in **`src/styles/fonts.css`**:

1. Put the WOFF2 files in `public/fonts/` (e.g. `rowad-display-bold.woff2`).
2. Replace the `src:` URLs of the `"Rowad Display"` blocks with your display file(s), and
   the `"Rowad Text"` blocks with your text file(s).
3. Keep `font-weight` equal to the **real** weight of each file (no synthetic bold — the
   site sets `font-synthesis-weight: none`).
4. Variable fonts only: use a range, e.g. `font-weight: 300 900;` and one `@font-face` per subset.
5. Keep `font-display: swap;` and the Arabic `unicode-range` blocks so Latin fallback stays sane.

**Current state:** both aliases point at **Tajawal** (SIL Open Font License, downloaded
from Google Fonts and self-hosted in `public/fonts/`). No commercial font has been
installed or claimed. If the display font you supply has short ascenders or tall
diacritics you may need to tune:

- `--lh-heading` in `tokens.css` (currently `1.34`)
- `.line-mask` padding in `base.css` (keeps dots/diacritics inside masked reveals)

> The small orange annotation «هنا تبدأ الحكاية» uses the display family on purpose:
> no Arabic handwriting font was supplied, and the brief says to fall back to the main
> type system gracefully rather than fake one.

---

## 5. الصور والشعار — Adding the real logo and photographs

### الشعار الرسمي (required)

The official logo file was **not supplied**, so `src/components/Logo.tsx` draws a clearly
labelled **provisional mark** from the described elements (open book, torch, circular
outline, turquoise + orange on dark). To install the real artwork:

1. Put the file in `public/brand/` (PNG/SVG, ideally square, ≥512px) — create the folder if needed.
2. Set `logoSrc` in `src/data/club.ts` → `'/brand/logo-rowad.png'`.
3. Update `logoAlt` with a description of the real artwork.

See `docs/brand.md` for the short version of this checklist.

The component then renders your image in the same rounded frame. If the logo has a dark
background baked in, it is kept (shown as a deliberate dark disc) rather than pretending
to be transparent.

### صور الأنشطة (optional but recommended)

The gallery and the memory mosaic currently show **editorial compositions** — Arabic
words, line-art motifs (book / torch / arc / dots / spark / wave / ring) and the brand
palette. They are explicitly *not* stock photography and never claim to be documentary.

To use real photos: put them in `public/media/` and add `src` + Arabic `alt` to the
record in `src/data/media.ts`. For the hero you may also add a real clip:
```ts
video: { src: '/media/clip.mp4', poster: '/media/clip.jpg', label: 'وصف المقطع' }
```

Clips play muted and inline, only near the centre of the gallery (max 2 at once), pause
when off-screen or when `prefers-reduced-motion` is on, and never show a fake play button.

Once real photos exist, you can delete the two transparency notes:
`hero.galleryEmptyNote` and `memory.note` in `src/data/club.ts`.

---

## 6. ما ينقص أو يحتاج تأكيدًا — Missing assets & facts to confirm

| # | Item | Status |
| --- | --- | --- |
| 1 | **Official logo file** | ❌ not supplied — provisional SVG mark in use |
| 2 | **Club photographs** (activities, memory) | ❌ not supplied — decorative editorial tiles in use |
| 3 | **Verified activity archive** (titles, dates, places, sources) | ⚠️ titles + descriptions come from `public/data/activities-overview.json`; no per-event dates yet |
| 4 | **Podcast episode data** (title, guest, thumbnail, video URL) | ❌ none available — intro card + channel link only |
| 5 | **Membership / registration flow** | ❌ does not exist → «انضم الآن» is deliberately absent |
| 6 | **Contact email / phone / postal address** | ❌ not verified → deliberately absent (Instagram DM note shown instead) |
| 7 | **Institutional affiliation** (e.g. a specific faculty) | ⚠️ not stated — the copy says only «الحي الجامعي بمدينة طنجة» |
| 8 | **Founding date, member counts, partners, testimonials** | ❌ not invented anywhere; do not add without a source |
| 9 | **Custom Arabic fonts** | ⏳ promised later — Tajawal is provisional |
| 10 | **Production domain + Open Graph image** | ⏳ no domain/OG asset — canonical & `og:image` intentionally omitted |

**Sources of factual content** are recorded in `contentSources` (`src/data/club.ts`).
During the build, Instagram, YouTube and Facebook returned login walls / 401, so **no
posts were scraped** and no activity, photo, episode or date was extracted. Everything on
the page comes from the brief you provided (name, slogan, three themes, student/cultural
context, عراقة podcast name) plus clearly-editorial wording. The only established
quotation is the slogan «رواد… بخطى مستنيرة».

---

## 7. نظام التصميم — Design system

- **Palette:** charcoal `#171918`, surface `#202422` / raised `#29302D`, off-white
  `#F5F3EB`, muted `#B5BDB7`, turquoise `#249F96` / `#79E6D8`, torch amber `#F39A1F`,
  warm paper `#F3F0E6` + ink `#18221F` for «ذاكرة رواد».
- **Contrast-checked roles:** `--on-teal` (dark ink on turquoise, 5.7:1),
  `--teal-deep` (teal text on paper, 5.6:1), `--ink-muted` (6.6:1 on paper).
  Amber is never used as text on paper, nor white on amber.
- **Geometry:** 1280px container, 22px card radius, 28px large panels, 52px buttons,
  56–120px section rhythm, thin borders, one restrained shadow token.
- **Type:** `clamp(44px, 5.8vw, 84px)` hero, Arabic heading line-height ≈1.3,
  18–20px desktop body, 16–18px mobile body, 1.85 line-height, no letter-spacing on
  Arabic, no per-character splitting.
- **Motion:** CSS entrances, line-by-line masked heading reveals (lines are whole Arabic
  phrases, so shaping is never broken), a rAF-driven curved gallery, and CSS-only mosaic
  drift. All of it respects `prefers-reduced-motion`.

---

## 8. RTL & accessibility

- `<html lang="ar" dir="rtl">`; the logo/brand sits at the **right**, reading order flows
  right → left, all spacing uses logical properties (`inset-inline-*`, `margin-inline-*`,
  `padding-block`).
- Directional arrows are authored pointing left (RTL “forward”). Play icons and brand
  marks are never mirrored. Latin platform handles use `dir="ltr" lang="en"`.
- Landmarks: one `<main>`, header navs labelled in Arabic, section `aria-labelledby`.
- Skip link first in the tab order; visible focus rings (`--teal-light`, `--teal-deep` on paper).
- Mobile menu: labelled toggle, `aria-expanded`/`aria-controls`, focus moves to the first
  link, Tab is contained, `Escape` closes and returns focus to the toggle, outside click
  closes, choosing a link closes and scrolls.
- Gallery: focusable group with Arabic instructions, ←/→ keys page through cards, pause
  button with `aria-pressed`, auto-motion pauses on hover/focus/drag, drags never trigger
  clicks.
- Mosaic: duplicate sequences are `aria-hidden`; a pause control is exposed; motion stops
  when the section leaves the viewport.
- No form, no fake success state, no fake counters, no scrolling hijack, no custom cursor,
  no full-page scroll lock.

### Verified in this build

- Breakpoints 390 / 768 / 1024 / 1440: **no horizontal overflow**, no console errors.
- Contrast: text/bg 15.9:1, muted/bg 9.2:1, teal button 5.7:1, ink on paper 14.3:1,
  teal-on-paper 5.6:1, amber-on-charcoal 8.0:1 — all pass WCAG AA.
- Focus order: skip link → brand → nav → header CTA → hero CTAs → gallery → gallery controls.
- `prefers-reduced-motion`: gallery drift off, mosaic drift off, content immediately visible,
  manual controls still work.
- Anchor navigation lands below the sticky header (≈15px offset).

> There is no automated test suite checked in — the checks above were run with a headless
> Chromium script during development.

---

## 9. Notes for deployment

- `bun run build` outputs a static `dist/` — deploy to any static host.
- When a domain exists, add `<link rel="canonical">` and an `og:image` (1200×630) to
  `index.html`; both were omitted on purpose rather than pointing at files that do not exist.
- Instagram / YouTube / Facebook links are real and open with `rel="noopener noreferrer"`.
- The site does **not** depend on live social scraping at runtime.
