/**
 * ─────────────────────────────────────────────────────────────────────────────
 * الأنشطة — Activity records
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * الأسماء واللوحات والأوصاف مأخوذة من معطيات النادي
 * (`public/data/activities-overview.json`).
 *
 * أغلفة الأنشطة الآن **لوحات تعريفية مصمّمة** محفوظة في `public/media/activities/`
 * بصيغة WebP (1080×1350). الملفات الأصلية PNG محفوظة في `media-source/activities/`
 * خارج مجلد النشر — لتحويل لوحة جديدة:
 *   magick media-source/activities/<name>.png -strip -resize 1080x1350 \
 *     -quality 82 -define webp:method=6 public/media/activities/<name>.webp
 *
 * لإضافة نشاط جديد: أضف سجلًّا في المصفوفة أدناه.
 *   - `path` مسار صفحة النشاط، ويُشتقّ من `id`.
 *   - `cover` صورة موثّقة من النشاط. إن غابت، تُرسم لوحة تحريرية بالزخرفة
 *     (`motif`) ولا تُعرَض أي صورة ليست من النادي.
 * لا تواريخ ولا أرقام ولا أسماء لم يتأكّد مصدرها.
 */

import type { MotifName } from './media'

export type ActivityCategory = 'education' | 'awareness' | 'culture'

export interface Activity {
  id: string
  /** مسار الصفحة الخاصة بالنشاط داخل الموقع: /activities/<id> */
  path: string
  title: string
  /** المحور الذي ينتمي إليه النشاط */
  category: ActivityCategory
  /** اللافتة العربية كما وردت في معطيات النادي */
  categoryLabel: string
  description: string
  /** لوحة النشاط أو صورته — مسار ملف ويب (WebP مفضّل) */
  cover?: string
  /** وصف الصورة لقارئات الشاشة، يصف ما فيها فعلًا */
  coverAlt?: string
  /** تعليق ظاهر أسفل الصورة — يُترك فارغًا للّوحات التعريفية */
  coverCaption?: string
  /** نقطة التركيز داخل الصورة (object-position) حين يقصّها الشريط الطويل */
  focus?: string
  /** زخرفة اللوحة البديلة حين لا توجد صورة */
  motif: MotifName
}

export const activities: Activity[] = [
  {
    id: 'jalsat-kitab',
    path: '/activities/jalsat-kitab',
    title: 'جلسة كتاب',
    category: 'culture',
    categoryLabel: 'القراءة والحوار',
    description:
      'لقاءات قرائية تجمع أعضاء نادي رواد حول الكتب، لتبادل الأفكار وتنمية التفكير النقدي في أجواء من الحوار والتفاعل.',
    cover: '/media/activities/jalsat-kitab.webp',
    coverAlt:
      'لوحة نشاط «جلسة كتاب»: كتاب مفتوح على طاولة خشبية، وفانوس مضيء فوق كومة كتب قديمة في مكتبة دافئة',
    focus: '50% 50%',
    motif: 'book',
  },
  {
    id: 'sonaa-al-athir',
    path: '/activities/sonaa-al-athir',
    title: 'صناع الأثير',
    category: 'culture',
    categoryLabel: 'لقاءات ثقافية',
    description:
      'لقاءات شبابية تستضيف شخصيات ذات تجارب متنوعة، لفتح الحوار وتبادل الخبرات ومناقشة القضايا التي تشغل الشباب.',
    cover: '/media/activities/sona3-atheer.webp',
    coverAlt:
      'لوحة نشاط «صناع الأثير»: منصة خشبية منقوشة بمذياع قديم، وخلفية تحمل اسم النشاط، وفانوسان مضيئان',
    focus: '50% 55%',
    motif: 'wave',
  },
  {
    id: 'jusur-al-fikr',
    path: '/activities/jusur-al-fikr',
    title: 'جسور الفكر',
    category: 'culture',
    categoryLabel: 'زيارات ثقافية',
    description:
      'زيارات إلى فضاءات ثقافية وتاريخية تربط المعرفة بالمكان، وتفتح أمام الشباب أبواب اكتشاف الذاكرة والتنوع الحضاري.',
    cover: '/media/activities/josor-fikr.webp',
    coverAlt:
      'لوحة نشاط «جسور الفكر»: كتاب مفتوح يعلوه جسر حجري منقوش تحمل عليه لوحة اسم النشاط',
    focus: '50% 45%',
    motif: 'arc',
  },
  {
    id: 'rowad-academy',
    path: '/activities/rowad-academy',
    title: 'أكاديمية رواد',
    category: 'education',
    categoryLabel: 'التكوين والمهارات',
    description:
      'ورشات تطبيقية ودورات تفاعلية تمنح الطلبة أدوات لتطوير مهاراتهم وتوسيع معارفهم وبناء حضورهم الشخصي والمهني.',
    cover: '/media/activities/academy-rowad.webp',
    coverAlt:
      'لوحة نشاط «أكاديمية رواد»: مكتب خشبي بمصباح ودفتر مفتوح وكرة أرضية، وخلفه لوحة تحمل اسم النشاط',
    focus: '50% 48%',
    motif: 'torch',
  },
  {
    id: 'khibra-podcast',
    path: '/activities/khibra-podcast',
    title: 'بودكاست خبرة',
    category: 'awareness',
    categoryLabel: 'بودكاست فكري',
    description:
      'حوارات مع شخصيات في الفكر والأدب والعلم، نستكشف من خلالها التجارب والمسارات ونناقش قضايا توسع آفاق المعرفة لدى الشباب.',
    cover: '/media/activities/podcast-khebra.webp',
    coverAlt:
      'لوحة نشاط «بودكاست خبرة»: مذياع استوديو وسماعتا رأس على مكتب، وخلفهما لوحة «Podcast» وفانوس مضيء',
    focus: '50% 55%',
    motif: 'ring',
  },
  {
    id: 'your-suggestions',
    path: '/activities/your-suggestions',
    title: 'اقتراحاتكم',
    category: 'awareness',
    categoryLabel: 'مساحة مفتوحة',
    description:
      'باب مفتوح لأفكاركم: اقتراحاتكم للكتب والمواضيع والزيارات تصل إلينا، ومنها نبني لقاءاتنا القادمة.',
    cover: '/media/activities/suggestion.webp',
    coverAlt:
      'لوحة نشاط «اقتراحاتكم»: صندوق مضيء بفتحات مقوّسة تدخل فيه بطاقة ذهبية، وفوقه فقاعة حوار ذهبية',
    focus: '50% 48%',
    motif: 'spark',
  },
]

/** صفحة النشاط المطابقة لمسار، أو undefined إن لم توجد. */
export const findActivityByPath = (path: string) =>
  activities.find((activity) => activity.path === path)

/** رقم النشاط كما يظهر على البطاقات: «01». */
export const activityNumber = (id: string) =>
  String(Math.max(0, activities.findIndex((activity) => activity.id === id)) + 1).padStart(2, '0')
