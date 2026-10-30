# صور النادي — Adding real photographs and clips

يعرض المعرض في الواجهة وفسيفساء «ذاكرة رواد» حاليًّا **ألواحًا تحريرية**: كلمات عربية،
زخارف خطية (كتاب، شعلة، قوس، نقاط، بريق، موج، حلقة) وألوان الهوية. هذه ليست صورًا
فوتوغرافية ولا تُقدَّم أبدًا كصور توثيقية للنادي.

The gallery in the hero and the memory mosaic currently show **editorial tiles**. They are
never presented as documentary images.

## Steps

1. Create `public/media/` and add the images (JPG/WebP, ~1200–1600px on the long edge).
2. **Hero gallery** — `src/data/media.ts` → `galleryItems`:

   ```ts
   {
     id: 'g-activity-01',
     word: 'تعلّم',            // يبقى مطلوبًا حتى لو أُضيفت صورة
     note: 'من لقاء …',
     variant: 'surface',        // يُستخدم فقط إن لم توجد صورة
     motif: 'book',
     src: '/media/gallery-01.jpg',
     alt: 'طلبة يستمعون إلى متحدّث في قاعة صغيرة داخل الحي الجامعي',
   }
   ```

3. **Memory mosaic** — already driven by real photographs: `src/data/media.ts`
   builds `mosaicColumns` from `archivePhotos` (18 tiles, deterministic pick).
   To hand-pick instead, replace the generator with explicit tiles
   `{ id, src, alt?, aspect }` — a tile without `src` falls back to the
   editorial composition (`variant` + `motif`).
4. **Activities** (`src/data/activities.ts`): `cover` + `coverAlt` + `focus` on the record.
   The six covers are designed posters (1080×1350). Keep the PNG master in
   `media-source/activities/` — it is git-ignored and never published — and ship
   the WebP:

   ```bash
   magick media-source/activities/<name>.png -strip -resize 1080x1350 \
     -quality 82 -define webp:method=6 public/media/activities/<name>.webp
   ```

   A record without `cover` renders an editorial composition from its `motif`.
5. **Archive strip on activity pages** — `src/data/media.ts` → `archivePhotos`
   (built from `photoSeries`). The published copies live in `public/media/archive/`
   as WebP at 900px; the raw folders stay in `media-source/`.

   ```bash
   for f in media-source/<folder>/*.webp; do n=$((n+1)); \
     magick "$f" -strip -resize '900x900>' -quality 78 \
     public/media/archive/<slug>-$(printf '%02d' $n).webp; done
   ```

   Each activity page shows four of them, chosen deterministically per activity
   (its own photos first, otherwise from the whole archive), at `opacity: 0.38`
   in grayscale — full colour on hover. See `.ap__archive` in `ActivityPage.css`.
6. **Real clip in the hero** — add:

   ```ts
   video: { src: '/media/clip.mp4', poster: '/media/clip.jpg', label: 'وصف المقطع' }
   ```

   Clips play **muted and inline**, only near the centre of the gallery (max 2 at once),
   pause off-screen and under `prefers-reduced-motion`, and never show a fake play button.
7. **Hero background film** — `src/data/club.ts` → `hero.video.src`
   (currently `/video/cinemaric_video.mp4`, 2.7 MB).

   It plays muted, inline and in a loop behind the hero copy at `opacity: 0.5`
   (`.hero__video` in `src/components/Hero.css`), with a dark veil above it
   (`.hero__veil`) so the Arabic headline keeps its contrast. `autoPlay` is off
   when the visitor prefers reduced motion — the first frame is shown instead.
   Keep any replacement short and quiet: it sits *under* text, not next to it.
8. **Podcast poster** — `src/data/club.ts` → `podcast.poster` (currently
   `public/media/podcast/Khebra_guests.webp`, portrait 1024×1536; masters live in
   `media-source/podcast/`). It fills the side panel of the podcast card, capped by
   `max-height` so the card stays balanced — `.podcast__poster` in `Podcast.css`.
   `podcast.latest` holds the newest episode (title/guest from the official video).
9. **تفاصيل كل نشاط** — `src/data/activityDetails.ts` (الفكرة، الأهداف، واللقاءات
   الموثّقة). النصوص مأخوذة من `public/data/*.json`، وصورها مستخرجة من تلك الملفات
   إلى `public/media/activities/gallery/` (WebP، حتى 900px)؛ الأصلية في
   `media-source/gallery/`.

   - **يوتيوب**: عنوان كل حلقة من صفحة الفيديو الرسمية (oEmbed)، والمصغّرات محفوظة
     في `public/media/podcast/ep-0N.webp`، وكل بطاقة تفتح الفيديو مباشرة.
   - **إنستغرام**: لا يمكن سحب صور المنشورات دون تسجيل دخول، لذلك تُعرض الصور
     الموجودة في ملفات المعطيات، ويُربط كل لقاء بمنشوره الرسمي. رُتّبت المنشورات
     بمقارنة تاريخ المنشور (المستخرج من معرّفه) بتاريخ اللقاء في المعطيات.

## الحالة — where the real photographs stand
- **ذاكرة رواد** — hybrid tiles: the photo is the background, the club's words and
  motifs stay on top (`overlay` on `EditorialTile`). `memory.note` is kept.
- **صفحات الأنشطة** — designed covers, plus the faded archive strip.
- **بودكاست خبرة** — a real episode poster beside the copy.
- **معرض الواجهة** — still editorial tiles, so `hero.galleryEmptyNote` and its
  paragraph in `CurvedGallery.tsx` stay until that gallery has real photos too.
