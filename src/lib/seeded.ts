/**
 * اختيار شبه-عشوائي ثابت — deterministic pseudo-random pick.
 * البذرة نفسها تعطي النتيجة نفسها دائمًا، فلا تتغيّر الصور بين إعادات الرسم،
 * ومع ذلك يختلف الاختيار من مكان إلى آخر.
 */
export function seededPick<T>(items: readonly T[], count: number, seed: string): T[] {
  let state = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    state ^= seed.charCodeAt(i)
    state = Math.imul(state, 16777619)
  }

  const rest = [...items]
  const picked: T[] = []

  while (picked.length < count && rest.length > 0) {
    state = Math.imul(state ^ (state >>> 13), 16777619) >>> 0
    picked.push(...rest.splice(state % rest.length, 1))
  }

  return picked
}
