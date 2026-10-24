import { LineHeading, Reveal } from './Reveal'
import { YouTube } from './icons'
import { links, podcast } from '../data/club'
import './Podcast.css'

const WAVE = [
  28, 54, 38, 76, 46, 92, 60, 34, 68, 100, 52, 40, 84, 58, 30, 72, 48, 88, 36, 62, 96, 44, 66, 32,
]

export function Podcast() {
  return (
    <section className="section podcast" id="podcast" aria-labelledby="podcast-title">
      <div className="container">
        <Reveal className="podcast__card">
          <div className="podcast__copy">
            <span className="kicker">{podcast.kicker}</span>
            <LineHeading
              as="h2"
              id="podcast-title"
              className="podcast__title"
              lines={[podcast.title]}
            />
            <p className="podcast__lead">{podcast.intro}</p>
            <p className="podcast__body">{podcast.body}</p>

            <div className="podcast__actions">
              <a
                className="btn btn--primary"
                href={links.youtube.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTube size={18} />
                {podcast.ctaLabel}
              </a>
            </div>

            <p className="podcast__note">{podcast.honestyNote}</p>
          </div>

          <div className="podcast__visual" aria-hidden="true">
            <span className="podcast__halo" />
            <span className="podcast__wordmark">
              <span>خبرة</span>
            </span>
            <div className="podcast__wave">
              {WAVE.map((height, index) => (
                <span
                  key={index}
                  style={{
                    height: `${height}%`,
                    animationDelay: `${index * 90}ms`,
                  }}
                />
              ))}
            </div>
            <span className="podcast__caption">بودكاست نادي رواد</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
