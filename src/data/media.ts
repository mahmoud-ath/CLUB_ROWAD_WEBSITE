/**
 * ─────────────────────────────────────────────────────────────────────────────
 * الوسائط — Media assets
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * HOW TO REPLACE THE DECORATIVE TILES WITH REAL CLUB PHOTOGRAPHY
 * ------------------------------------------------------------
 * 1. Put the image in /public/media/  (e.g. /public/media/activity-01.jpg)
 * 2. Add `src` + `alt` to the record below.
 *    The tile then renders the photo instead of the editorial composition.
 * 3. For a real clip: add `video: { src, poster, label }`.
 *    It will be muted, inline and only loaded while visible.
 *
 * Tiles without `src` are explicit editorial compositions built from the
 * club's own type system and logo motifs (book / torch / arc). They are
 * NOT stock photographs and must never be presented as documentary images.
 */

export type TileVariant =
  | 'teal'
  | 'tealSoft'
  | 'amber'
  | 'paper'
  | 'surface'
  | 'dark'
  | 'ink'

export type MotifName = 'book' | 'torch' | 'arc' | 'dots' | 'spark' | 'wave' | 'ring'

export interface GalleryItem {
  id: string
  word: string
  note: string
  variant: TileVariant
  motif: MotifName
  /** Optional real photograph — replaces the editorial tile */
  src?: string
  alt?: string
  /** Optional real clip (muted, inline, no play button) */
  video?: { src: string; poster?: string; label: string }
  href?: string
}

export interface MosaicTile {
  id: string
  variant: TileVariant
  motif: MotifName
  aspect: number
  word?: string
  note?: string
  src?: string
  alt?: string
}

/* ── المعرض المنحني في الواجهة ──────────────────────────────────────────── */

export const galleryItems: GalleryItem[] = [
  {
    id: 'g-education',
    word: 'تعلّم',
    note: 'معرفة تُتشارك',
    variant: 'surface',
    motif: 'book',
  },
  {
    id: 'g-dialogue',
    word: 'حوار',
    note: 'أصوات تلتقي',
    variant: 'teal',
    motif: 'wave',
  },
  {
    id: 'g-culture',
    word: 'ثقافة',
    note: 'فضاء للفكرة',
    variant: 'paper',
    motif: 'arc',
  },
  {
    id: 'g-torch',
    word: 'ضوء',
    note: 'من الشعلة',
    variant: 'dark',
    motif: 'torch',
  },
  {
    id: 'g-question',
    word: 'سؤال',
    note: 'بداية الطريق',
    variant: 'tealSoft',
    motif: 'ring',
  },
  {
    id: 'g-book',
    word: 'كتاب',
    note: 'صفحة تُفتح',
    variant: 'surface',
    motif: 'dots',
  },
  {
    id: 'g-awareness',
    word: 'وعي',
    note: 'بالمعلومة',
    variant: 'amber',
    motif: 'spark',
  },
  {
    id: 'g-impact',
    word: 'أثر',
    note: 'ما يبقى',
    variant: 'paper',
    motif: 'book',
  },
  {
    id: 'g-steps',
    word: 'رواد',
    note: 'بخطى مستنيرة',
    variant: 'dark',
    motif: 'arc',
  },
]

/* ── فسيفساء «ذاكرة رواد» ───────────────────────────────────────────────── */

export const mosaicColumns: MosaicTile[][] = [
  [
    { id: 'm1', variant: 'paper', motif: 'book', aspect: 3 / 4, word: 'كتاب', note: 'صفحة تُفتح' },
    { id: 'm2', variant: 'teal', motif: 'wave', aspect: 1, word: 'حوار' },
    { id: 'm3', variant: 'surface', motif: 'dots', aspect: 4 / 5 },
    { id: 'm4', variant: 'amber', motif: 'spark', aspect: 3 / 4, word: 'ضوء' },
    { id: 'm5', variant: 'paper', motif: 'arc', aspect: 1, word: 'أثر', note: 'ما يبقى' },
    { id: 'm6', variant: 'surface', motif: 'book', aspect: 5 / 4 },
  ],
  [
    { id: 'm7', variant: 'ink', motif: 'arc', aspect: 4 / 5, word: 'أثر' },
    { id: 'm8', variant: 'tealSoft', motif: 'ring', aspect: 1, word: 'سؤال', note: 'يستحق النقاش' },
    { id: 'm9', variant: 'paper', motif: 'torch', aspect: 3 / 4, note: 'ذاكرة تُحكى' },
    { id: 'm10', variant: 'surface', motif: 'book', aspect: 1 },
    { id: 'm11', variant: 'teal', motif: 'wave', aspect: 5 / 4, word: 'لقاء' },
    { id: 'm12', variant: 'amber', motif: 'dots', aspect: 4 / 5 },
  ],
  [
    { id: 'm13', variant: 'amber', motif: 'dots', aspect: 1 },
    { id: 'm14', variant: 'paper', motif: 'wave', aspect: 4 / 5, word: 'فكرة' },
    { id: 'm15', variant: 'teal', motif: 'arc', aspect: 3 / 4, word: 'لقاء', note: 'بين طلبة' },
    { id: 'm16', variant: 'ink', motif: 'spark', aspect: 1 },
    { id: 'm17', variant: 'paper', motif: 'ring', aspect: 5 / 4, word: 'سؤال' },
    { id: 'm18', variant: 'tealSoft', motif: 'torch', aspect: 3 / 4, word: 'رواد', note: 'بخطى مستنيرة' },
  ],
]
