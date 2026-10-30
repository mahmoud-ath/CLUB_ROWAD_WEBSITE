import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import { LineHeading, Reveal, useInView, useReducedMotion } from './Reveal'
import { Motif } from './Motif'
import { ArrowForward } from './icons'
import { Link } from '../router'
import { activities, type Activity } from '../data/activities'
import { activities as copy } from '../data/club'
import './Activities.css'

const PANEL_ID = 'activity-details'
const tabId = (activity: Activity) => `activity-tab-${activity.id}`

/** الحالة الافتراضية: «بودكاست خبرة» */
const INITIAL_INDEX = Math.max(
  0,
  activities.findIndex((activity) => activity.id === 'khibra-podcast'),
)

/** خروج نصّ التفاصيل قبل استبداله — يطابق مدة التلاشي في CSS */
const OUT_MS = 120
/** ثبات المؤشّر على بطاقة قبل اختيارها بالتمرير */
const HOVER_MS = 120

export function Activities() {
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX)
  const [focusIndex, setFocusIndex] = useState(INITIAL_INDEX)
  const [shown, setShown] = useState<Activity>(activities[INITIAL_INDEX])
  const [leaving, setLeaving] = useState(false)

  const reduced = useReducedMotion()
  const { ref: accordionRef, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const entered = reduced || inView

  const stripRefs = useRef<Array<HTMLButtonElement | null>>([])
  const hoverRef = useRef<{ index: number; timer: number } | null>(null)
  const hoverAnchor = useRef<{ x: number; y: number } | null>(null)

  const active = activities[activeIndex] ?? activities[0]

  /* ── التفاصيل: خروج 120ms ثم دخول 250ms، وأي تغيير جديد يُلغي المؤقّت ── */
  useEffect(() => {
    if (shown.id === active.id) {
      setLeaving(false)
      return
    }

    setLeaving(true)
    const timer = window.setTimeout(
      () => {
        setShown(active)
        setLeaving(false)
      },
      reduced ? 0 : OUT_MS,
    )

    return () => window.clearTimeout(timer)
  }, [active, shown.id, reduced])

  /* ── الاختيار ────────────────────────────────────────────────────────── */
  const select = (index: number) => {
    setActiveIndex(index)
    setFocusIndex(index)
  }

  const cancelHover = useCallback(() => {
    if (hoverRef.current) {
      window.clearTimeout(hoverRef.current.timer)
      hoverRef.current = null
    }
  }, [])

  useEffect(() => cancelHover, [cancelHover])

  const handleClick = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    cancelHover()
    hoverAnchor.current = { x: event.clientX, y: event.clientY }
    select(index)
  }

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    /* التمرير يختار على الفأرة فقط، لا على اللمس أو القلم */
    if (event.pointerType !== 'mouse') return

    if (index === activeIndex) {
      cancelHover()
      return
    }

    /* حركة المؤشّر الناتجة عن توسّع البطاقات نفسها ليست اختيارًا مقصودًا */
    const anchor = hoverAnchor.current
    if (
      anchor &&
      Math.abs(event.clientX - anchor.x) < 8 &&
      Math.abs(event.clientY - anchor.y) < 8
    ) {
      return
    }

    if (hoverRef.current?.index === index) return

    cancelHover()
    const { clientX, clientY } = event
    hoverRef.current = {
      index,
      timer: window.setTimeout(() => {
        hoverRef.current = null
        hoverAnchor.current = { x: clientX, y: clientY }
        select(index)
      }, HOVER_MS),
    }
  }

  /* ── لوحة المفاتيح: تنقّل بالتركيز، والتفعيل بـ Enter أو Space ────────── */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = activities.length - 1
    let next: number | null = null

    /* RTL: البطاقة الأولى على اليمين، فالسهم الأيسر ينتقل إلى التالية */
    if (event.key === 'ArrowLeft') next = focusIndex === last ? 0 : focusIndex + 1
    else if (event.key === 'ArrowRight') next = focusIndex === 0 ? last : focusIndex - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last

    if (next === null) return
    event.preventDefault()
    setFocusIndex(next)
    stripRefs.current[next]?.focus()
  }

  return (
    <section
      className="section activities on-mist"
      id="activities"
      aria-labelledby="activities-title"
    >
      <div className="container">
        <header className="acc__head">
          <Reveal className="acc__headline">
            <span className="kicker">{copy.kicker}</span>
            <LineHeading
              as="h2"
              id="activities-title"
              className="acc__title"
              lines={copy.titleLines}
            />
          </Reveal>

          <Reveal className="acc__intro-wrap" delay={90}>
            <p className="acc__intro">{copy.intro}</p>
          </Reveal>
        </header>

        <div
          className="acc"
          ref={accordionRef}
          data-entered={entered}
          role="tablist"
          aria-orientation="horizontal"
          aria-label={copy.tablistLabel}
          onKeyDown={handleKeyDown}
        >
          {activities.map((activity, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={activity.id}
                ref={(node) => {
                  stripRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={tabId(activity)}
                aria-selected={isActive}
                aria-controls={PANEL_ID}
                aria-label={activity.title}
                tabIndex={index === focusIndex ? 0 : -1}
                data-active={isActive}
                data-has-cover={Boolean(activity.cover)}
                className="acc__strip"
                style={{ ['--stagger' as string]: index }}
                onClick={(event) => handleClick(index, event)}
                onPointerMove={(event) => handlePointerMove(event, index)}
                onPointerLeave={cancelHover}
                onBlur={cancelHover}
                onFocus={() => setFocusIndex(index)}
              >
                <span className="acc__media" aria-hidden="true">
                  {activity.cover && (
                    <img
                      className="acc__img"
                      src={activity.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ ['--focus' as string]: activity.focus ?? '50% 50%' }}
                    />
                  )}
                </span>

                <span className="acc__scrim" aria-hidden="true" />
                <span className="acc__ring" aria-hidden="true" />

                <span className="acc__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="acc__icon" aria-hidden="true">
                  <Motif name={activity.motif} />
                </span>

                <span className="acc__vertical" aria-hidden="true">
                  {activity.title}
                </span>

                <span className="acc__content" aria-hidden="true">
                  <span className="acc__strip-title">{activity.title}</span>
                  <span className="acc__strip-cat">{activity.categoryLabel}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="acc__details">
          <div
            className="acc__details-inner"
            id={PANEL_ID}
            role="tabpanel"
            aria-labelledby={tabId(active)}
            tabIndex={0}
            data-leaving={leaving}
            key={shown.id}
          >
            <div className="acc__details-head">
              <span className="acc__dot" aria-hidden="true" />
              <h3 className="acc__details-title">{shown.title}</h3>
              <span className="acc__details-cat">{shown.categoryLabel}</span>
            </div>

            <p className="acc__desc">{shown.description}</p>

            <Link className="acc__cta" to={shown.path}>
              {copy.detailLabel}
              <ArrowForward size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
