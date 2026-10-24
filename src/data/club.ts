/**
 * ─────────────────────────────────────────────────────────────────────────────
 * محتوى الموقع — Single source of truth for all Arabic copy.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * كل النصوص التي يراها الزائر موجودة في هذا الملف، ما عدا ملفات الوسائط.
 * لتعديل الموقع لاحقًا: عدّل هنا فقط، ولا تلمس المكوّنات.
 *
 * CONTENT INTEGRITY
 * كل ما في هذا الملف مأخوذ من المعطيات المؤكَّدة التي قدّمها النادي
 * (الاسم، الشعار، المحاور الثلاثة، الطابع الثقافي الطلابي في الحي الجامعي
 * بطنجة، اسم البودكاست) أو هو نص تحريري مقترح للموقع.
 * لا تواريخ تأسيس، ولا أرقام أعضاء، ولا شركاء، ولا شهادات، ولا أسماء قيادات.
 * المصادر مسجّلة في `contentSources` أدناه.
 */

export type ThemeId = 'education' | 'awareness' | 'culture'

export interface ClubTheme {
  id: ThemeId
  label: string
  latinLabel: string
  description: string
  motif: 'book' | 'torch' | 'spark'
}

export interface ClubLink {
  id: 'instagram' | 'youtube' | 'facebook'
  label: string
  latinLabel: string
  href: string
  handle: string
  actionLabel: string
}

export interface ContentSource {
  id: string
  label: string
  href?: string
  kind: 'brief' | 'social'
  /** هل أمكن التحقّق من المحتوى المنشور على هذا المصدر أثناء البناء؟ */
  reachable: boolean
  note: string
}

/* ── هوية النادي ────────────────────────────────────────────────────────── */

export const club = {
  name: 'نادي رواد',
  latinName: 'Club Rowad',
  slogan: 'رواد… بخطى مستنيرة',
  /** الشعار الرسمي. إن وُضع مسار صورة هنا تُستعمل بدل العلامة المؤقتة. */
  logoSrc: '' as string,
  logoAlt: 'شعار نادي رواد: كتاب مفتوح وشعلة داخل إطار دائري',
  themes: [
    {
      id: 'education',
      label: 'تعليم',
      latinLabel: 'Education',
      description:
        'نتعلّم معًا لا وحدنا: نتبادل ما نعرفه، ونحوّل الفضول إلى معرفة، ونفتح لمن يأتي بعدنا بابًا مفتوحًا.',
      motif: 'book',
    },
    {
      id: 'awareness',
      label: 'توعية',
      latinLabel: 'Awareness',
      description:
        'نقترب من القضايا التي تشغل الطالب والمجتمع، ونفتح لها نقاشًا هادئًا مبنيًّا على المعلومة لا على الضجيج.',
      motif: 'torch',
    },
    {
      id: 'culture',
      label: 'ثقافة',
      latinLabel: 'Culture',
      description:
        'كتب وأفكار وفنون… نصنع لقاءً يقرّب الطلبة من بعضهم، ومن العالم الذي يحيط بهم.',
      motif: 'spark',
    },
  ] satisfies ClubTheme[],
} as const

/* ── التنقّل ────────────────────────────────────────────────────────────── */

export interface NavItem {
  id: string
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'عن رواد', href: '#about' },
  { id: 'activities', label: 'أنشطتنا', href: '#activities' },
  { id: 'memory', label: 'ذاكرة رواد', href: '#memory' },
  { id: 'podcast', label: 'بودكاست خبرة', href: '#podcast' },
  { id: 'contact', label: 'تواصل معنا', href: '#contact' },
]

export const primaryCta = {
  label: 'اكتشف رواد',
  href: '#about',
  ariaLabel: 'اكتشف رواد: تعرّف على النادي',
}

/* ── منصّات النادي ──────────────────────────────────────────────────────── */

export const links: Record<ClubLink['id'], ClubLink> = {
  instagram: {
    id: 'instagram',
    label: 'إنستغرام',
    latinLabel: 'Instagram',
    href: 'https://www.instagram.com/clubrowad/',
    handle: '@clubrowad',
    actionLabel: 'تواصل عبر إنستغرام',
  },
  youtube: {
    id: 'youtube',
    label: 'يوتيوب',
    latinLabel: 'YouTube',
    href: 'https://www.youtube.com/@ClubRowad',
    handle: '@ClubRowad',
    actionLabel: 'شاهد قناتنا على يوتيوب',
  },
  facebook: {
    id: 'facebook',
    label: 'فيسبوك',
    latinLabel: 'Facebook',
    href: 'https://www.facebook.com/CLUBROWAD/',
    handle: 'CLUBROWAD',
    actionLabel: 'صفحة النادي على فيسبوك',
  },
}

export const socialLinks: ClubLink[] = [links.instagram, links.youtube]

/* ── نصوص الأقسام ───────────────────────────────────────────────────────── */

export const hero = {
  badge: 'تعليم · توعية · ثقافة',
  headingLines: ['رواد…', 'بخطى مستنيرة'],
  /** الكلمة التي تُسطَّر بخط وامض مرسوم يدويًّا في العنوان */
  underlineWord: 'مستنيرة',
  intro:
    'مساحة طلابية للمعرفة والحوار، نلتقي فيها حول الثقافة، ونفتح بها آفاقًا جديدة للتعلّم والمشاركة.',
  primaryCta: { label: 'اكتشف أنشطتنا', href: '#activities' },
  secondaryCta: { label: 'تعرّف على رواد', href: '#about' },
  annotation: 'هنا تبدأ الحكاية',
  galleryLabel: 'معرض رواد',
  galleryHint: 'اسحب المعرض يمينًا أو يسارًا، أو استخدم أزرار التنقّل',
  galleryEmptyNote:
    'لوحات تحريرية مؤقتة بخطوط النادي وزخارفه، إلى حين إضافة صور الأنشطة الرسمية.',
}

export const about = {
  kicker: 'عن رواد',
  titleLines: ['تجمعنا المعرفة،', 'ويقرّبنا الحوار'],
  body: [
    'نادي رواد نادٍ ثقافي أسّسه طلبة جامعيون في الحي الجامعي بمدينة طنجة. نشأ من حاجة بسيطة: مساحة يجد فيها الطالب ما يتجاوز حدود الدرس — كتابًا يُقرأ، سؤالًا يُطرح، وفكرةً تُناقش دون استعجال.',
    'لا نعد بضجيج، بل بلقاءات صغيرة تصنع أثرًا طويلًا: نُعلّم ونتعلّم، ونُوعّي ونتوعّى، ونقرأ الثقافة بوصفها حوارًا لا ملكية.',
  ],
  themesTitle: 'ثلاثة محاور، مساحة واحدة',
  themesLead:
    'كل ما نفعله يعود إلى هذه المحاور الثلاثة، بلا استعراض ولا أرقام.',
}

export const activities = {
  kicker: 'أنشطتنا',
  titleLines: ['لقاءات تُبنى', 'على المعرفة والحوار'],
  intro:
    'نُوثّق هنا ما ننظّمه فعلًا: العنوان، التاريخ، المكان، والمصدر. لا نضيف ما لم يقع.',
  empty: {
    title: 'الأرشيف قيد التوثيق',
    body: 'لم نُدرج بعدُ أنشطةً مؤكَّدة بتاريخها ومصدرها على هذا الموقع. نفضّل أن يظهر كل نشاط كما وقع تمامًا، لا كما نتمنّاه. إلى أن يكتمل الأرشيف، تجدون أحدث اللقاءات على حساب النادي.',
    primaryLabel: 'آخر الأنشطة على إنستغرام',
    secondaryLabel: 'شاهد القناة على يوتيوب',
  },
  detailLabel: 'اكتشف التفاصيل',
}

export const memory = {
  kicker: 'ذاكرة رواد',
  titleLines: ['لحظات تبقى،', 'وأثر يستمر'],
  body: 'من لقاء إلى آخر، تتشكّل ذاكرة رواد بما نتعلّمه، وما نتشاركه، ومن نلتقي بهم.',
  ctaLabel: 'تابع لحظاتنا على إنستغرام',
  mosaicLabel: 'فسيفساء ذاكرة رواد',
  note: 'ألواح تحريرية بالألوان والخط نفسه، تُستبدل بصور النادي حين تتوفّر.',
}

export const podcast = {
  kicker: 'إعلام النادي',
  title: 'بودكاست خبرة',
  intro: 'حوارات تفتح باب السؤال، وتقرّبنا من الأفكار والتجارب.',
  body: 'في «خبرة» نستضيف تجارب وأصواتًا نتعلم منها: مسارات، دروس، وأسئلة لم تُطرح بعد. الحلقات تُنشر على قناة النادي على يوتيوب.',
  ctaLabel: 'استكشف القناة',
  honestyNote:
    'لا نعرض هنا حلقات بأعيانها بعد؛ نُفضّل ذكر كل حلقة بعنوانها وضيفها من مصدرها الرسمي.',
}

export const contact = {
  kicker: 'تواصل معنا',
  titleLines: ['للفكرة بداية،', 'وللحوار مساحة'],
  body: 'إن كانت لديك فكرة لقاء أو مبادرة تشبه روح رواد، أو أردت فقط أن تعرف متى نلتقي، فالحوار مفتوح. تابعنا، أو راسلنا على منصّات النادي.',
  instagramCta: 'تواصل عبر إنستغرام',
  youtubeCta: 'شاهد قناتنا على يوتيوب',
  note: 'نردّ عبر رسائل إنستغرام. لا يوجد حاليًّا نموذج تسجيل للعضوية على هذا الموقع.',
}

export const footer = {
  tagline: 'رواد… بخطى مستنيرة',
  about: 'نادٍ ثقافي طلابي · طنجة، المغرب',
  navTitle: 'أقسام الموقع',
  socialTitle: 'تابعنا',
  copyrightOwner: 'نادي رواد',
  copyrightSuffix: 'جميع الحقوق محفوظة.',
  credit: 'تعليم · توعية · ثقافة',
}

/* ── المصادر الموثّقة ───────────────────────────────────────────────────── */

export const contentSources: ContentSource[] = [
  {
    id: 'brief',
    label: 'معطيات مقدَّمة من النادي (اسم النادي، الشعار، المحاور، السياق)',
    kind: 'brief',
    reachable: true,
    note: 'المصدر الأساسي لكل محتوى الموقع.',
  },
  {
    id: 'instagram',
    label: 'حساب النادي على إنستغرام',
    href: links.instagram.href,
    kind: 'social',
    reachable: false,
    note: 'المحتوى محجوب خلف تسجيل الدخول أثناء البناء؛ لم يُستخرج أي نشاط أو صورة.',
  },
  {
    id: 'youtube',
    label: 'قناة النادي على يوتيوب',
    href: links.youtube.href,
    kind: 'social',
    reachable: false,
    note: 'لم تُتح بيانات الحلقات أثناء البناء؛ لذلك لا توجد حلقات مذكورة بالاسم.',
  },
  {
    id: 'facebook',
    label: 'صفحة النادي على فيسبوك',
    href: links.facebook.href,
    kind: 'social',
    reachable: false,
    note: 'الصفحة تعرض واجهة تسجيل الدخول فقط؛ لم يُعتمد عليها في أي معلومة.',
  },
]
