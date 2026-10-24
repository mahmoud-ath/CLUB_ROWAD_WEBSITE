import { LineHeading, Reveal } from './Reveal'
import { Motif } from './Motif'
import { about, club } from '../data/club'
import './About.css'

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__head">
          <div className="about__headline">
            <span className="kicker">{about.kicker}</span>
            <LineHeading
              as="h2"
              id="about-title"
              className="about__title"
              lines={about.titleLines}
            />
          </div>

          <Reveal className="about__body">
            {about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <div className="about__themes">
          <Reveal className="about__themes-head">
            <h3 className="about__themes-title">{about.themesTitle}</h3>
            <p className="about__themes-lead">{about.themesLead}</p>
          </Reveal>

          <ul className="themes">
            {club.themes.map((theme, index) => (
              <Reveal as="li" className="theme" key={theme.id} delay={index * 90}>
                <span className="theme__icon" aria-hidden="true">
                  <Motif name={theme.motif} />
                </span>
                <h4 className="theme__label">{theme.label}</h4>
                <p className="theme__text">{theme.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
