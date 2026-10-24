# الشعار الرسمي — Installing the official logo

⚠️ **الحالة الحالية / Current state:** لم يُسلَّم ملف الشعار الرسمي. `src/components/Logo.tsx`
يرسم **علامة مؤقتة** (كتاب مفتوح + شعلة + إطار دائري، فيروزي وبرتقالي على قرص داكن)
حتى يمكن تقييم التصميم. هذه ليست شعار النادي.

## Steps

1. Create `public/brand/` and add the file (PNG or SVG, square, ≥512px).
2. Open `src/data/club.ts` and set:

   ```ts
   logoSrc: '/brand/logo-rowad.png',
   logoAlt: 'شعار نادي رواد: …',   // وصف عربي حقيقي للشعار
   ```

3. `Logo.tsx` then renders the image instead of the placeholder, inside the same
   rounded frame used in the header and footer.

## Notes

- If the logo has a dark background baked into the file, it is kept and shown as a
  deliberate dark disc — the layout never pretends the image is transparent.
- Keep the logo's proportions: the frame is square and uses `object-fit: contain`.
- The favicon (`public/favicon.svg`) is also temporary; replace it when the official
  asset exists.
