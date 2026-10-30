import { useEffect, useRef, useState } from 'react'
import { LineHeading, useReducedMotion } from './Reveal'
import { EditorialTile } from './EditorialTile'
import { Instagram, Pause, Play } from './icons'
import { links, memory } from '../data/club'
import { mosaicColumns } from '../data/media'
import './MemoryMosaic.css'

export function MemoryMosaic() {
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const stageRef = useRef<HTMLDivElement | null>(null)

  /* Continuous motion is suspended while the section is off-screen. */
  useEffect(() => {
    const el = stageRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const suspended = reduced || paused || !inView

  return (
    <section className="section memory on-paper" id="memory" aria-labelledby="memory-title">
      <div className="container memory__grid">
        <div className="memory__copy">
          <span className="kicker">{memory.kicker}</span>
          <LineHeading
            as="h2"
            id="memory-title"
            className="memory__title"
            lines={memory.titleLines}
          />
          <p className="memory__body">{memory.body}</p>

          <div className="memory__actions">
            <a
              className="btn btn--ink"
              href={links.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} />
              {memory.ctaLabel}
            </a>
          </div>

          <p className="memory__note">{memory.note}</p>
        </div>

        <div className="memory__stage" ref={stageRef}>
          <div
            className={['mosaic', suspended ? 'is-suspended' : ''].filter(Boolean).join(' ')}
            role="group"
            aria-label={memory.mosaicLabel}
          >
            {mosaicColumns.map((tiles, columnIndex) => (
              <div className="mosaic__col" key={`col-${columnIndex}`}>
                <div className="mosaic__track" style={{ ['--speed' as string]: `${27 + columnIndex * 2.5}s`, ['--phase' as string]: `${-6 - columnIndex * 7}s` }}>
                  {[...tiles, ...tiles].map((tile, index) => (
                    <div
                      className={`mosaic__tile mosaic__tile--${columnIndex}`}
                      key={`${tile.id}-${index}`}
                      style={{ aspectRatio: String(tile.aspect) }}
                      aria-hidden={index >= tiles.length ? 'true' : undefined}
                    >
                      <EditorialTile
                        variant={tile.variant ?? 'surface'}
                        motif={tile.motif ?? 'arc'}
                        word={tile.word}
                        note={tile.note}
                        src={tile.src}
                        alt={tile.alt}
                        overlay
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {!reduced && (
            <button
              type="button"
              className="memory__pause"
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
              <span>{paused ? 'تشغيل الحركة' : 'إيقاف الحركة'}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
