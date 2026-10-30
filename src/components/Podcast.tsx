import { LineHeading, Reveal } from './Reveal'
import { ArrowForward, Play, YouTube } from './icons'
import { links, podcast } from '../data/club'
import './Podcast.css'

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

          <figure className="podcast__visual">
            <span className="podcast__halo" aria-hidden="true" />
            <img
              className="podcast__poster"
              src={podcast.poster.src}
              alt={podcast.poster.alt}
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </Reveal>

        <Reveal className="podcast__latest-wrap" delay={90}>
          <a
            className="podcast__latest"
            href={podcast.latest.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="podcast__latest-media">
              <img
                src={podcast.latest.thumbnail}
                alt=""
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
              />
              <span className="podcast__latest-play" aria-hidden="true">
                <Play size={16} />
              </span>
            </span>

            <span className="podcast__latest-copy">
              <span className="podcast__latest-label">{podcast.latest.label}</span>
              <span className="podcast__latest-title">
                {podcast.latest.episode} — {podcast.latest.guest}
              </span>
              <span className="podcast__latest-sub">{podcast.latest.title}</span>
            </span>

            <span className="podcast__latest-go">
              <YouTube size={16} />
              {podcast.latest.watch}
              <ArrowForward size={16} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
