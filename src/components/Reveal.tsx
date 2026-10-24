import { useEffect, useRef, useState, type ReactNode } from 'react'

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Reactive version of prefersReducedMotion(). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function useInView<T extends HTMLElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {},
) {
  const { threshold = 0.2, rootMargin = '0px 0px -10% 0px', once = true } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}

/**
 * Section entrance. Content renders visible by default; only after mount
 * (and only when motion is allowed) does it switch to a pending state and
 * wait for the intersection observer. If the script fails, everything stays
 * readable.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'footer'
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

  return (
    <Tag
      ref={ref as never}
      className={['reveal', className].filter(Boolean).join(' ')}
      data-reveal={reduced ? 'visible' : inView ? 'visible' : 'pending'}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/**
 * Line-by-line heading reveal. Each line is a pre-authored phrase (Arabic is
 * never split per character, so shaping, dots and diacritics stay intact).
 * The mask keeps extra vertical padding so ascenders are not clipped.
 */
export function LineHeading({
  lines,
  as: Tag = 'h2',
  className,
  id,
  delay = 0,
}: {
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  id?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLHeadingElement>({ threshold: 0.15, rootMargin: '0px 0px -5% 0px' })

  return (
    <Tag
      id={id}
      ref={ref}
      className={['line-heading', className].filter(Boolean).join(' ')}
      data-reveal={reduced ? 'visible' : inView ? 'visible' : 'pending'}
    >
      {lines.map((line, index) => (
        <span className="line-mask" key={index}>
          <span
            className="line-inner"
            style={{ ['--line-delay' as string]: `${delay + index * 110}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
