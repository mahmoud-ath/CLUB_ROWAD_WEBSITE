import type { MotifName } from '../data/media'

/**
 * Fine line-art motifs drawn from the logo's vocabulary: the open book, the
 * torch, and the circular outline. Used only as decorative composition inside
 * editorial tiles — never as a substitute for a real photograph.
 */
export function Motif({ name, className }: { name: MotifName; className?: string }) {
  const common = {
    viewBox: '0 0 120 120',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: 'false' as const,
    className,
  }

  switch (name) {
    case 'book':
      return (
        <svg {...common}>
          <path d="M60 84c-11-8-26-10-39-7V44c13-3 28-1 39 7 11-8 26-10 39-7v33c-13-3-28-1-39 7Z" />
          <path d="M60 51v33" opacity="0.7" />
          <path d="M32 58c8-1 16 1 22 5M32 67c8-1 16 1 22 5" opacity="0.55" />
          <path d="M88 58c-8-1-16 1-22 5M88 67c-8-1-16 1-22 5" opacity="0.55" />
        </svg>
      )
    case 'torch':
      return (
        <svg {...common}>
          <path d="M60 22c9 10 13 17 13 23a13 13 0 0 1-26 0c0-6 4-13 13-23Z" />
          <path d="M60 33c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" opacity="0.5" />
          <path d="M60 58v40M50 98h20" />
          <path d="M42 78h36" opacity="0.45" />
        </svg>
      )
    case 'arc':
      return (
        <svg {...common}>
          <path d="M16 96a44 44 0 0 1 88 0" />
          <path d="M32 96a28 28 0 0 1 56 0" opacity="0.65" />
          <path d="M48 96a12 12 0 0 1 24 0" opacity="0.4" />
          <circle cx="60" cy="96" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'dots':
      return (
        <svg {...common}>
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={28 + col * 16}
                cy={28 + row * 16}
                r={1.5}
                fill="currentColor"
                stroke="none"
                opacity={row === 2 && col === 2 ? 0.95 : 0.5}
              />
            )),
          )}
        </svg>
      )
    case 'spark':
      return (
        <svg {...common}>
          <path d="M60 18c3.4 20 9.6 30.6 28 34-18.4 3.4-24.6 14-28 34-3.4-20-9.6-30.6-28-34 18.4-3.4 24.6-14 28-34Z" />
          <circle cx="60" cy="52" r="3" opacity="0.5" />
        </svg>
      )
    case 'wave':
      return (
        <svg {...common}>
          <path d="M14 62c10-18 22-18 32 0s22 18 32 0 18-14 28 2" />
          <path d="M14 80c10-18 22-18 32 0s22 18 32 0 18-14 28 2" opacity="0.55" />
          <path d="M14 44c10-18 22-18 32 0s22 18 32 0 18-14 28 2" opacity="0.32" />
        </svg>
      )
    case 'ring':
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="38" />
          <path d="M60 22a38 38 0 0 1 0 76" opacity="0.6" />
          <circle cx="60" cy="60" r="14" opacity="0.4" />
          <circle cx="60" cy="60" r="2.6" fill="currentColor" stroke="none" />
        </svg>
      )
    default:
      return null
  }
}
