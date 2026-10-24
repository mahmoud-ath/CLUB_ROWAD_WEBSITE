import { useCallback, useEffect, useRef, useState } from 'react'
import { Brand } from './Logo'
import { ArrowForward, Close, Menu } from './icons'
import { club, navItems, primaryCta } from '../data/club'
import { useActiveSection } from '../hooks/useActiveSection'
import './Header.css'

const sectionIds = navItems.map((item) => item.href.replace('#', ''))

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  /* Elevate the header slightly once the page moves. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) {
      requestAnimationFrame(() => toggleRef.current?.focus())
    }
  }, [])

  /* Escape, tab containment, and dismiss-on-outside-click for the mobile menu. */
  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : []

    requestAnimationFrame(() => focusables()[0]?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== 'Tab') return

      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement as HTMLElement | null

      if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && (current === first || !panel?.contains(current))) {
        event.preventDefault()
        last.focus()
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (panel?.contains(target) || toggleRef.current?.contains(target)) return
      closeMenu(false)
    }

    const onResize = () => {
      if (window.innerWidth > 960) closeMenu(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open, closeMenu])

  return (
    <header className={['site-header', scrolled ? 'is-scrolled' : '', open ? 'is-open' : '']
      .filter(Boolean)
      .join(' ')}>
      <div className="site-header__inner container">
        <Brand size={44} />

        <nav className="site-nav" aria-label="القائمة الرئيسية">
          <ul className="site-nav__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className="site-nav__link"
                  href={item.href}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a className="btn btn--primary btn--sm site-header__cta" href={primaryCta.href}>
            {primaryCta.label}
            <ArrowForward size={18} className="btn__icon" />
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            aria-label={open ? 'إغلاق قائمة التنقّل' : 'فتح قائمة التنقّل'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
            <span className="nav-toggle__label">{open ? 'إغلاق' : 'القائمة'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu" id="site-mobile-menu" ref={panelRef}>
          <nav className="mobile-menu__nav container" aria-label="قائمة التنقّل للهاتف">
            <ul className="mobile-menu__list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    className="mobile-menu__link"
                    href={item.href}
                    aria-current={active === item.id ? 'true' : undefined}
                    onClick={() => closeMenu(false)}
                  >
                    <span>{item.label}</span>
                    <ArrowForward size={18} />
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="btn btn--primary mobile-menu__cta"
              href={primaryCta.href}
              onClick={() => closeMenu(false)}
            >
              {primaryCta.label}
              <ArrowForward size={18} className="btn__icon" />
            </a>
            <p className="mobile-menu__slogan">{club.slogan}</p>
          </nav>
        </div>
      )}
    </header>
  )
}
