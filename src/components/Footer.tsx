import { Brand } from './Logo'
import { Instagram, LinkedIn, YouTube } from './icons'
import { Link } from '../router'
import { activities } from '../data/activities'
import { footer, navItems, socialLinks } from '../data/club'
import './Footer.css'

const year = new Date().getFullYear()

const socialIcon = {
  instagram: Instagram,
  youtube: YouTube,
  linkedin: LinkedIn,
} as const

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Brand size={46} />
            <p className="site-footer__slogan">«{footer.tagline}»</p>
            <p className="site-footer__about">{footer.about}</p>
          </div>

          <nav className="site-footer__col" aria-labelledby="footer-activities-title">
            <h2 className="site-footer__title" id="footer-activities-title">
              {footer.activitiesTitle}
            </h2>
            <ul className="site-footer__list site-footer__list--activities">
              {activities.map((activity) => (
                <li key={activity.id}>
                  <Link to={activity.path}>{activity.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-labelledby="footer-nav-title">
            <h2 className="site-footer__title" id="footer-nav-title">
              {footer.navTitle}
            </h2>
            <ul className="site-footer__list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link to={`/${item.href}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2 className="site-footer__title">{footer.socialTitle}</h2>
            <ul className="site-footer__list">
              {socialLinks.map((link) => {
                const Icon = socialIcon[link.id as keyof typeof socialIcon]
                return (
                  <li key={link.id}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <Icon size={16} />
                      {link.label}
                      <span className="site-footer__handle" dir="ltr" lang="en">
                        {link.handle}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {footer.copyrightOwner}. {footer.copyrightSuffix}
          </p>
          <p className="site-footer__credit">{footer.credit}</p>
        </div>
      </div>
    </footer>
  )
}
