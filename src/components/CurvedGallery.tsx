import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowBack, ArrowForward, Pause, Play } from './icons'
import { hero } from '../data/club'
import { galleryItems } from '../data/media'
import { EditorialTile } from './EditorialTile'
import { useReducedMotion } from './Reveal'
import './CurvedGallery.css'

/* Proportional geometry per breakpoint (px). Derived from the card's position
   relative to the gallery centre, so any number of cards curves consistently. */
type Geometry = {
  w: number
  h: number
  step: number
  edgeScale: number
  rise: number
  band: number
  maxRot: number
  bottom: number
}

const GEOMETRY: Record<'desktop' | 'tablet' | 'mobile', Geometry> = {
  desktop: { w: 172, h: 278, step: 242, edgeScale: 1.4, rise: 42, band: 480, maxRot: 10, bottom: 30 },
  tablet: { w: 132, h: 214, step: 198, edgeScale: 1.44, rise: 32, band: 420, maxRot: 11, bottom: 28 },
  mobile: { w: 100, h: 162, step: 150, edgeScale: 1.5, rise: 22, band: 292, maxRot: 12, bottom: 24 },
}

const AUTO_SPEED = 17 // px per second, right → left
const TWEEN_MS = 560
const FRICTION = 0.9
const MAX_FLING = 1500

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const smoothstep = (t: number) => t * t * (3 - 2 * t)
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function pickGeometry(): Geometry {
  if (typeof window === 'undefined') return GEOMETRY.desktop
  if (window.innerWidth >= 1024) return GEOMETRY.desktop
  if (window.innerWidth >= 640) return GEOMETRY.tablet
  return GEOMETRY.mobile
}

export function CurvedGallery() {
  const reduced = useReducedMotion()
  const [geometry, setGeometry] = useState<Geometry>(pickGeometry)
  const [paused, setPaused] = useState(false)

  const bandRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const pointerRef = useRef({ active: false, id: -1, lastX: 0, lastTime: 0, startX: 0, moved: 0 })
  const tweenRef = useRef<{ from: number; to: number; start: number } | null>(null)
  const hoverRef = useRef(false)
  const focusRef = useRef(false)
  /* skip redundant style writes while nothing moves */
  const needsPaintRef = useRef(true)
  /* timestamp until which clicks are ignored (a drag just happened) */
  const suppressClickRef = useRef(0)

  const count = galleryItems.length
  const loopWidth = count * geometry.step

  useEffect(() => {
    const onResize = () => {
      needsPaintRef.current = true
      setGeometry(pickGeometry())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* Position every card from its distance to the centre of the gallery. */
  const paint = useCallback(
    (now: number, dt: number, vw: number) => {
      const before = offsetRef.current
      offsetRef.current = ((offsetRef.current % loopWidth) + loopWidth) % loopWidth

      const tween = tweenRef.current
      if (tween) {
        const p = clamp((now - tween.start) / TWEEN_MS, 0, 1)
        offsetRef.current = tween.from + (tween.to - tween.from) * easeOutCubic(p)
        if (p >= 1) tweenRef.current = null
      } else if (!pointerRef.current.active) {
        const velocity = velocityRef.current
        if (Math.abs(velocity) > 6) {
          offsetRef.current += velocity * dt
          velocityRef.current = velocity * Math.pow(FRICTION, dt * 60)
        } else {
          velocityRef.current = 0
        }
        const shouldDrift = !paused && !hoverRef.current && !focusRef.current && !reduced
        if (shouldDrift) offsetRef.current += AUTO_SPEED * dt
      }

      if (!needsPaintRef.current && offsetRef.current === before) return
      needsPaintRef.current = false

      const half = loopWidth / 2
      const spread = Math.max(vw * 0.52, 220)
      let playing = 0

      for (let index = 0; index < count; index += 1) {
        const el = cardRefs.current[index]
        if (!el) continue

        let x = index * geometry.step - offsetRef.current
        x = ((x % loopWidth) + loopWidth) % loopWidth
        if (x > half) x -= loopWidth

        const t = clamp(x / spread, -1, 1)
        const e = Math.abs(t)
        const eased = smoothstep(e)
        const scale = 1 + (geometry.edgeScale - 1) * eased
        const lift = geometry.rise * eased
        const rotY = t * geometry.maxRot
        const rotZ = t * 1.15

        el.style.transform = `translate3d(${x.toFixed(2)}px, ${(-lift).toFixed(2)}px, 0) rotateY(${rotY.toFixed(
          2,
        )}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(4)})`
        el.style.zIndex = String(Math.round(eased * 90))
        el.style.opacity = '1'
        const offscreen = Math.abs(x) > vw / 2 + geometry.w * geometry.edgeScale
        el.style.visibility = offscreen ? 'hidden' : 'visible'

        const video = videoRefs.current[index]
        if (video) {
          const nearCentre = Math.abs(x) < vw * 0.36 && playing < 2
          if (nearCentre && !reduced) {
            if (video.paused) void video.play().catch(() => undefined)
            playing += 1
          } else if (!video.paused) {
            video.pause()
          }
        }
      }
    },
    [count, geometry, loopWidth, paused, reduced],
  )

  /* Place the cards before the first paint so nothing stacks on load. */
  useLayoutEffect(() => {
    needsPaintRef.current = true
    const band = bandRef.current
    if (band) paint(performance.now(), 0, band.clientWidth)
  }, [paint])

  /* One rAF loop; it stops entirely while the gallery is off-screen. */
  useEffect(() => {
    const band = bandRef.current
    if (!band) return

    let frame = 0
    let last = performance.now()
    let mounted = true

    const loop = (now: number) => {
      if (!mounted) return
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000))
      last = now
      paint(now, dt, band.clientWidth)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      if (frame) return
      last = performance.now()
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      videoRefs.current.forEach((video) => video?.pause())
    }

    start()

    let observer: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) start()
          else stop()
        },
        { threshold: 0.01 },
      )
      observer.observe(band)
    }

    return () => {
      mounted = false
      stop()
      observer?.disconnect()
    }
  }, [paint])

  /* ---- Pointer dragging -------------------------------------------------- */
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const target = event.currentTarget
    target.setPointerCapture(event.pointerId)
    pointerRef.current = {
      active: true,
      id: event.pointerId,
      lastX: event.clientX,
      lastTime: performance.now(),
      startX: event.clientX,
      moved: 0,
    }
    velocityRef.current = 0
    tweenRef.current = null
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer.active || pointer.id !== event.pointerId) return

    const now = performance.now()
    const dx = event.clientX - pointer.lastX
    const dt = Math.max(8, now - pointer.lastTime)
    pointer.lastX = event.clientX
    pointer.lastTime = now
    pointer.moved += Math.abs(dx)

    offsetRef.current -= dx
    velocityRef.current = clamp((-dx / dt) * 1000, -MAX_FLING, MAX_FLING)

    if (pointer.moved > 6) suppressClickRef.current = performance.now() + 320
  }

  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer.active || pointer.id !== event.pointerId) return
    pointer.active = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    /* A drag should never fire a click on a card underneath the pointer. */
    if (pointer.moved > 6) {
      suppressClickRef.current = performance.now() + 320
    }
  }

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (performance.now() > suppressClickRef.current) return
    event.preventDefault()
    event.stopPropagation()
  }

  /* ---- Controls ---------------------------------------------------------- */
  const moveBy = (direction: 1 | -1) => {
    const from = offsetRef.current
    tweenRef.current = { from, to: from + geometry.step * direction, start: performance.now() }
    velocityRef.current = 0
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveBy(1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveBy(-1)
    }
  }

  return (
    <div className="gallery">
      <div className="gallery__annotation" aria-hidden="true">
        <span className="gallery__annotation-text">{hero.annotation}</span>
        <svg className="gallery__annotation-arrow" viewBox="0 0 120 74" fill="none">
          <path
            d="M8 6c34 4 68 18 86 54"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M100 46c-1.6 7-4 11.6-6.4 14.4-2.6-3.4-6-6.4-10.2-8.8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        className={['gallery__band', paused ? 'is-paused' : ''].filter(Boolean).join(' ')}
        ref={bandRef}
        role="group"
        aria-roledescription="معرض صور متحرّك"
        aria-label={hero.galleryLabel}
        aria-describedby="gallery-hint"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onClickCapture={onClickCapture}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') hoverRef.current = true
        }}
        onPointerLeave={() => {
          hoverRef.current = false
        }}
        onFocus={() => {
          focusRef.current = true
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            focusRef.current = false
          }
        }}
        style={{ ['--band-h' as string]: `${geometry.band}px` }}
      >
        {galleryItems.map((item, index) => {
          const label = item.alt || `لوحة تحريرية بعنوان «${item.word}» — ${item.note}`
          return (
            <div
              className="gallery__card"
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              style={{
                ['--card-w' as string]: `${geometry.w}px`,
                ['--card-h' as string]: `${geometry.h}px`,
                ['--card-bottom' as string]: `${geometry.bottom}px`,
              }}
            >
              {item.video ? (
                <video
                  className="gallery__media"
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  src={item.video.src}
                  poster={item.video.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={item.video.label}
                />
              ) : (
                <EditorialTile
                  variant={item.variant}
                  motif={item.motif}
                  word={item.word}
                  note={item.note}
                  src={item.src}
                  alt={item.alt}
                  label={label}
                  className="gallery__tile"
                />
              )}
            </div>
          )
        })}
      </div>

      <div className="gallery__controls">
        <button
          type="button"
          className="gallery__control"
          aria-label="الوسائط السابقة في المعرض"
          onClick={() => moveBy(-1)}
        >
          <ArrowBack size={20} />
        </button>
        <button
          type="button"
          className="gallery__control gallery__control--pause"
          aria-label={paused ? 'تشغيل حركة المعرض' : 'إيقاف حركة المعرض مؤقتًا'}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play size={18} /> : <Pause size={18} />}
          <span className="gallery__control-label">{paused ? 'تشغيل' : 'إيقاف'}</span>
        </button>
        <button
          type="button"
          className="gallery__control"
          aria-label="الوسائط التالية في المعرض"
          onClick={() => moveBy(1)}
        >
          <ArrowForward size={20} />
        </button>
      </div>

      <p className="gallery__hint" id="gallery-hint">
        {hero.galleryHint}
      </p>
      <p className="gallery__note">{hero.galleryEmptyNote}</p>
    </div>
  )
}
