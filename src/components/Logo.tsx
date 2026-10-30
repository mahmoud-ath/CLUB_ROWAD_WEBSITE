import { club } from '../data/club'
import { Link } from '../router'

/**
 * BRAND MARK
 * ----------
 * The official logo is installed at /brand/logo-rowad.png and `logoSrc` in
 * src/data/club.ts points at it, so this component normally renders that image
 * (transparent, kept in proportion, never clipped into a disc).
 *
 * The inline SVG below is kept only as a fallback for when `logoSrc` is emptied
 * — it is a hand-drawn stand-in (open book • torch • arc), not the club logo.
 * See docs/brand.md for replacing the artwork and regenerating the favicons.
 */
export function Logo({
  size = 44,
  className,
}: {
  size?: number
  className?: string
}) {
  if (club.logoSrc) {
    return (
      <img
        className={['brand-mark', 'brand-mark--image', className].filter(Boolean).join(' ')}
        src={club.logoSrc}
        alt={club.logoAlt}
        width={size}
        height={size}
        loading="eager"
        decoding="async"
      />
    )
  }

  return (
    <svg
      className={['brand-mark', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={club.logoAlt}
    >
      <circle cx="60" cy="60" r="59" fill="#1b201e" />
      <circle cx="60" cy="60" r="58.4" fill="none" stroke="rgba(121,230,216,0.26)" strokeWidth="1.2" />

      {/* fine outer arc — the logo's circular outline */}
      <path
        d="M60 8.5a51.5 51.5 0 0 0-36.4 15.1"
        fill="none"
        stroke="#249F96"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M96.4 23.6A51.5 51.5 0 0 1 111.5 60"
        fill="none"
        stroke="#F39A1F"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* open book */}
      <path
        d="M60 87.5c-10.5-7.6-24.6-9.4-37-6.6V53.2c12.4-2.8 26.5-1 37 6.6 10.5-7.6 24.6-9.4 37-6.6v27.7c-12.4-2.8-26.5-1-37 6.6Z"
        fill="#249F96"
      />
      <path d="M60 59.8v27.7" stroke="#0b1513" strokeWidth="2.4" opacity="0.5" />
      <path
        d="M31 62.5c7.4-1 14.8.6 20.5 4M31 71.5c7.4-1 14.8.6 20.5 4M89 62.5c-7.4-1-14.8.6-20.5 4M89 71.5c-7.4-1-14.8.6-20.5 4"
        stroke="#0b1513"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.28"
        fill="none"
      />

      {/* torch */}
      <path d="M60 53V38.5" stroke="#F39A1F" strokeWidth="3.4" strokeLinecap="round" />
      <path
        d="M60 15c8.6 9.6 11.8 15.4 11.8 19.7a11.8 11.8 0 0 1-23.6 0C48.2 30.4 51.4 24.6 60 15Z"
        fill="#F39A1F"
      />
      <path
        d="M60 25.4c4 4.6 5.6 7.5 5.6 9.7a5.6 5.6 0 0 1-11.2 0c0-2.2 1.6-5.1 5.6-9.7Z"
        fill="#1b201e"
        opacity="0.28"
      />
    </svg>
  )
}

/** Wordmark lockup: logo on the inline-start side, Arabic name + Latin label. */
export function Brand({
  href = '/',
  size = 44,
  className,
}: {
  href?: string
  size?: number
  className?: string
}) {
  return (
    <Link className={['brand', className].filter(Boolean).join(' ')} to={href}>
      <Logo size={size} />
      <span className="brand__text">
        <span className="brand__name">{club.name}</span>
        <span className="brand__latin" dir="ltr" lang="en">
          {club.latinName}
        </span>
      </span>
    </Link>
  )
}
