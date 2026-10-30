import { ArrowForward } from './icons'
import { CurvedGallery } from './CurvedGallery'
import { useReducedMotion } from './Reveal'
import { hero } from '../data/club'
import './Hero.css'

export function Hero() {
  const [firstLine, secondLine] = hero.headingLines
  const [before, after] = secondLine.split(hero.underlineWord)
  const reduced = useReducedMotion()

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      {/* خلفية متحركة: فيلم النادي، في حلقة صامتة بتمويه 50% */}
      <div className="hero__media" aria-hidden="true">
        <video
          className="hero__video"
          src={hero.video.src}
          autoPlay={!reduced}
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
        />
        <span className="hero__veil" />
      </div>

      <div className="hero__arc" aria-hidden="true">
        <svg viewBox="0 0 1440 520" fill="none" preserveAspectRatio="none">
          <path d="M-60 470C290 170 1150 170 1500 470" stroke="rgba(121,230,216,0.1)" strokeWidth="1" />
          <path d="M120 500C420 260 1020 260 1320 500" stroke="rgba(245,243,235,0.05)" strokeWidth="1" />
        </svg>
      </div>

      <div className="container hero__inner">
        <p className="pill hero__badge hero__enter" style={{ ['--enter-delay' as string]: '60ms' }}>
          <span className="pill__dot" aria-hidden="true" />
          {hero.badge}
        </p>

        <h1 className="hero__title line-heading" id="hero-title">
          <span className="line-mask">
            <span className="line-inner hero__line" style={{ ['--line-delay' as string]: '120ms' }}>
              {firstLine}
            </span>
          </span>
          <span className="line-mask">
            <span className="line-inner hero__line" style={{ ['--line-delay' as string]: '240ms' }}>
              {before}
              <span className="hero__accent">
                {hero.underlineWord}
                <svg className="hero__underline" viewBox="0 0 200 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 11C40 4 96 2 197 6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {after}
            </span>
          </span>
        </h1>

        <p className="hero__intro hero__enter" style={{ ['--enter-delay' as string]: '380ms' }}>
          {hero.intro}
        </p>

        <div className="hero__actions hero__enter" style={{ ['--enter-delay' as string]: '480ms' }}>
          <a className="btn btn--primary" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
            <ArrowForward size={18} className="btn__icon" />
          </a>
          <a className="btn btn--ghost" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <CurvedGallery />
    </section>
  )
}
