import { LineHeading, Reveal } from './Reveal'
import { Instagram, YouTube } from './icons'
import { contact, links } from '../data/club'
import './Contact.css'

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__arcs" aria-hidden="true">
        <svg viewBox="0 0 1200 420" fill="none" preserveAspectRatio="xMidYMid meet">
          <path d="M60 400c0-190 220-300 540-300s540 110 540 300" stroke="rgba(121,230,216,0.14)" strokeWidth="1" />
          <path d="M190 400c0-150 170-234 410-234s410 84 410 234" stroke="rgba(243,154,31,0.14)" strokeWidth="1" />
        </svg>
      </div>

      <Reveal className="container contact__inner">
        <span className="kicker contact__kicker">{contact.kicker}</span>
        <LineHeading
          as="h2"
          id="contact-title"
          className="contact__title"
          lines={contact.titleLines}
        />
        <p className="contact__body">{contact.body}</p>

        <div className="contact__actions">
          <a
            className="btn btn--primary"
            href={links.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={18} />
            {contact.instagramCta}
          </a>
          <a
            className="btn btn--ghost"
            href={links.youtube.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube size={18} />
            {contact.youtubeCta}
          </a>
        </div>

        <p className="contact__note">{contact.note}</p>
      </Reveal>
    </section>
  )
}
