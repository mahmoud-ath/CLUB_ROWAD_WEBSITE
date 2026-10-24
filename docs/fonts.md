# الخطوط — Fonts

`public/fonts/` holds self-hosted **Tajawal** WOFF2 files (Arabic + Latin subsets) so the
site never calls a font CDN at runtime.

- **License:** SIL Open Font License 1.1 (Boutros Fonts / Google Fonts).
- **Status:** provisional — Tajawal is only the fallback behind the two internal aliases.

## Installing the club's custom Arabic fonts

1. Put the WOFF2 files in `public/fonts/` (prefer WOFF2; keep the Arabic subset).
2. Edit **`src/styles/fonts.css`** — the only registration point:
   - `"Rowad Display"` → your display face (headings).
   - `"Rowad Text"` → your text face (paragraphs and UI).
3. Match `font-weight` to each file's real weight. Variable fonts only: use a range,
   e.g. `font-weight: 300 900;`
4. Keep `font-display: swap;` and the `unicode-range` blocks.
5. Never rely on synthetic bold: `base.css` sets `font-synthesis-weight: none`.

Nothing else in the project references a font by name — only `--font-display` /
`--font-body` in `src/styles/tokens.css`.

## After swapping the display face, check

- `--lh-heading` (currently `1.34`) — Arabic headings need ~1.25–1.4.
- `.line-mask` padding in `base.css` — keeps dots, diacritics and ascenders visible
  inside the line-by-line reveal masks.
- The hero underline position under «مستنيرة» (`.hero__underline`).

No commercial font has been installed or claimed by this project.
