import { LineHeading } from './Reveal'
import type { ReactNode } from 'react'
import './SectionHead.css'

export function SectionHead({
  id,
  kicker,
  lines,
  lead,
  className,
}: {
  id: string
  kicker: string
  lines: ReactNode[]
  lead?: string
  className?: string
}) {
  return (
    <header className={['section-head', className].filter(Boolean).join(' ')}>
      <span className="kicker">{kicker}</span>
      <LineHeading as="h2" id={id} className="section-title section-head__title" lines={lines} />
      {lead && <p className="lead section-head__lead">{lead}</p>}
    </header>
  )
}
