/**
 * ─────────────────────────────────────────────────────────────────────────────
 * الأنشطة — Activity records
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * الحالة الحالية: لا توجد سجلات مؤكَّدة.
 *
 * أثناء بناء الموقع لم يكن محتوى إنستغرام/فيسبوك/يوتيوب متاحًا (واجهة تسجيل
 * الدخول)، ولم تُقدَّم عناوين أنشطة أو تواريخ أو أماكن. لذلك القائمة فارغة
 * عمدًا، ويعرض القسم حالة فارغة صادقة مع رابط الحساب الرسمي.
 *
 * لإضافة نشاط: انسخ القالب أدناه، واملأ فقط ما تملك مصدره.
 *   - `dateLabel` بصيغة عربية واضحة (مثال: «مارس 2025» أو «12 مارس 2025»)
 *   - `source` رابط المنشور أو الصورة الرسمية
 *   - `poster` صورة الملصق، و`posterFit: 'contain'` إن كان القصّ يخفي معلومة
 * سيظهر القسم تلقائيًّا كشبكة بطاقات بدل الحالة الفارغة.
 */

export type ActivityCategory = 'education' | 'awareness' | 'culture'

export interface Activity {
  id: string
  title: string
  category: ActivityCategory
  categoryLabel: string
  description: string
  /** اتركها فارغة إن لم تتأكّد. لا تخترع تواريخ. */
  dateLabel?: string
  location?: string
  poster?: string
  posterAlt?: string
  posterFit?: 'cover' | 'contain'
  sourceLabel?: string
  sourceHref?: string
}

export const activityCategories: Record<ActivityCategory, string> = {
  education: 'تعليم',
  awareness: 'توعية',
  culture: 'ثقافة',
}

export const activities: Activity[] = []

export const hasVerifiedActivities = activities.length > 0
