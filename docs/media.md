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

3. **Memory mosaic** — `src/data/media.ts` → `mosaicColumns[][].src` + `alt`.
4. **Activities** (`src/data/activities.ts`): `poster`, `posterAlt`, and
   `posterFit: 'contain'` when cropping would hide text in the poster.
5. **Real clip in the hero** — add:

   ```ts
   video: { src: '/media/clip.mp4', poster: '/media/clip.jpg', label: 'وصف المقطع' }
   ```

   Clips play **muted and inline**, only near the centre of the gallery (max 2 at once),
   pause off-screen and under `prefers-reduced-motion`, and never show a fake play button.

## Cleanup once real photos exist

Delete the transparency notes in `src/data/club.ts` — `hero.galleryEmptyNote` and
`memory.note` — and their paragraphs in `CurvedGallery.tsx` / `MemoryMosaic.tsx`.
