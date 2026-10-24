import { Motif } from './Motif'
import type { MotifName, TileVariant } from '../data/media'
import './EditorialTile.css'

/**
 * A tile built from the club's own type system and logo motifs — used only
 * when a real photograph is not available. It never imitates photography.
 * Supplying `src` swaps it for an authentic image.
 */
export function EditorialTile({
  variant,
  motif,
  word,
  note,
  src,
  alt,
  label,
  className,
}: {
  variant: TileVariant
  motif: MotifName
  word?: string
  note?: string
  src?: string
  alt?: string
  label?: string
  className?: string
}) {
  const description =
    label || `لوحة تحريرية${word ? ` بعنوان «${word}»` : ''}${note ? ` — ${note}` : ''}`

  if (src) {
    return (
      <img
        className={['tile', 'tile--photo', className].filter(Boolean).join(' ')}
        src={src}
        alt={alt || description}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <div
      className={['tile', `tile--${variant}`, className].filter(Boolean).join(' ')}
      role="img"
      aria-label={description}
    >
      <span className="tile__motif" aria-hidden="true">
        <Motif name={motif} />
      </span>
      {(word || note) && (
        <span className="tile__body">
          {word && <span className="tile__word">{word}</span>}
          {note && <span className="tile__note">{note}</span>}
        </span>
      )}
    </div>
  )
}
