import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

/* Directional arrows: RTL "forward" points left, so they are authored
   in the correct reading direction rather than mirroring at runtime. */
export const ArrowForward = (props: IconProps) => (
  <Svg {...props}>
    <path d="M19 12H5" />
    <path d="m11 18-6-6 6-6" />
  </Svg>
)

export const ArrowBack = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
)

export const ArrowDown = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 5v14" />
    <path d="m18 13-6 6-6-6" />
  </Svg>
)

export const Play = (props: IconProps) => (
  <Svg {...props}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />
  </Svg>
)

export const Pause = (props: IconProps) => (
  <Svg {...props}>
    <path d="M9 5v14M15 5v14" strokeWidth={2.1} />
  </Svg>
)

export const Menu = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Svg>
)

export const Close = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const Instagram = ({ size = 20, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
  </svg>
)

export const YouTube = ({ size = 20, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect x="2.2" y="5.2" width="19.6" height="13.6" rx="4.3" />
    <path d="M10.4 9.1v5.8l4.9-2.9-4.9-2.9Z" fill="currentColor" stroke="none" />
  </svg>
)

export const LinkedIn = ({ size = 20, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
    <path d="M7.4 10.6v6.1" />
    <circle cx="7.4" cy="7.9" r="0.9" fill="currentColor" stroke="none" />
    <path d="M11.2 16.7v-6.1" />
    <path d="M11.2 13.3c0-1.6 1.1-2.6 2.5-2.6s2.5 1 2.5 2.6v3.4" />
  </svg>
)

export const Mic = ({ size = 24, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect x="9" y="2.6" width="6" height="11" rx="3" />
    <path d="M5.4 11.4a6.6 6.6 0 0 0 13.2 0" />
    <path d="M12 18v3.4M8.6 21.4h6.8" />
  </svg>
)

export const ExternalLink = (props: IconProps) => (
  <Svg {...props}>
    <path d="M14 4h6v6" />
    <path d="M20 4 10 14" />
    <path d="M18.5 14.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5h4.5" />
  </Svg>
)

export const Book = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 7.2c-1.9-1.5-4.4-2.1-7-1.9v11c2.6-.2 5.1.4 7 1.9 1.9-1.5 4.4-2.1 7-1.9v-11c-2.6-.2-5.1.4-7 1.9Z" />
    <path d="M12 7.2v11" />
  </Svg>
)

export const Torch = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3.2c2 2.3 3 4 3 5.4a3 3 0 1 1-6 0c0-1.4 1-3.1 3-5.4Z" />
    <path d="M12 11.6v9.2M9.2 20.8h5.6" />
  </Svg>
)

export const Spark = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3.4 13.8 10l6.6 1.8-6.6 1.8L12 20.2l-1.8-6.6L3.6 11.8 10.2 10 12 3.4Z" />
  </Svg>
)

export const DragHint = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 12h16" />
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
  </Svg>
)
