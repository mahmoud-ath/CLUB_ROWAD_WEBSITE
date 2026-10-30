# الشعار الرسمي — The official logo

✅ **الحالة / Current state:** الشعار الرسمي مثبَّت، ومنه اشتُقّت أيقونات الموقع.

| الملف | الاستعمال |
| --- | --- |
| `public/brand/logo-rowad.png` | الشعار كما هو (914×928، PNG بخلفية شفافة) |
| `public/brand/logo-mark-512.png` | نسخة مربّعة مقصوصة الحواف، مصدر الأيقونات |
| `public/favicon.ico` · `public/favicon.png` | أيقونة التبويب (64/48/32/16 و64px) |
| `public/apple-touch-icon.png` | أيقونة الهاتف (180px على خلفية `#171918`) |

يظهر الشعار في: الترويسة والتذييل (`Brand`)، مقدّمة قسم «عن رواد»
(`.about__emblem` في `About.css`)، وأيقونة المتصفّح (`index.html`).

## تغيير الشعار — Replacing it

1. استبدل الملف نفسه: `public/brand/logo-rowad.png` (PNG شفّاف، مربّع تقريبًا، ≥512px).
2. أعِد توليد الأيقونات منه:

   ```bash
   magick public/brand/logo-rowad.png -trim +repage -resize 512x512 \
     -background none -gravity center -extent 512x512 public/brand/logo-mark-512.png
   magick public/brand/logo-mark-512.png -resize 64x64 public/favicon.png
   magick public/brand/logo-mark-512.png -background "#171918" -flatten \
     -resize 180x180 public/apple-touch-icon.png
   magick public/brand/logo-mark-512.png -define icon:auto-resize=64,48,32,16 public/favicon.ico
   ```

3. إن تغيّر الشكل، حدّث `logoAlt` في `src/data/club.ts` بوصف عربي حقيقي.

## Notes

- `src/data/club.ts` → `logoSrc` هو المصدر الوحيد للمسار. إن تُرك فارغًا يعود
  `Logo.tsx` إلى رسم العلامة البديلة (كتاب + شعلة داخل قرص).
- الصورة تُعرض بـ `object-fit: contain` وبلا قصّ دائري، فتبقى نسبها وأطرافها سليمة.
- الأيقونات مشتقّة من الشعار نفسه؛ لا تُستخدم أيقونة مرسومة يدويًّا بعد الآن.

