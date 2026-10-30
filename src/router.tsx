/**
 * ─────────────────────────────────────────────────────────────────────────────
 * التنقيب داخل الموقع — a minimal client router (no dependency)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * The site is a static Vite build; this keeps real URLs (/activities/jalsat-kitab)
 * without pulling in a router library:
 *
 *   - `usePathname()` subscribes to History changes.
 *   - `navigate()` pushes/replaces and then scrolls (top, or to an in-page anchor).
 *   - `<Link to>` renders a normal <a href> and only intercepts plain left clicks,
 *     so middle-click, ⌘/Ctrl-click and "open in new tab" keep working.
 *
 * Server note: the host must answer unknown paths with index.html (SPA fallback).
 * Vite's dev server already does this; see the README for static hosts.
 */

import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react'

const listeners = new Set<() => void>()

function notify() {
  for (const listener of listeners) listener()
}

function normalize(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname || '/'
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/* Hashes never change the rendered page, so the snapshot is the pathname only. */
function getSnapshot() {
  return normalize(window.location.pathname)
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', notify)
}

export function usePathname() {
  return useSyncExternalStore(subscribe, getSnapshot, () => '/')
}

/** Runs after React has committed the new route to the DOM. */
function afterPaint(task: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(task))
}

function scrollToId(id: string) {
  const target = document.getElementById(id)
  if (!target) return false
  target.scrollIntoView({ block: 'start' })
  return true
}

export function navigate(to: string, options: { replace?: boolean } = {}) {
  const url = new URL(to, window.location.href)
  const nextPath = normalize(url.pathname)
  const samePath = nextPath === normalize(window.location.pathname)
  const { hash } = url

  /* Same page: only the anchor changes. */
  if (samePath) {
    if (hash) {
      window.history.pushState(null, '', hash)
      afterPaint(() => scrollToId(hash.slice(1)))
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    return
  }

  const href = hash ? `${nextPath}${hash}` : nextPath
  if (options.replace) window.history.replaceState(null, '', href)
  else window.history.pushState(null, '', href)

  notify()

  afterPaint(() => {
    if (hash && scrollToId(hash.slice(1))) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
  replace?: boolean
}

export function Link({ to, replace = false, onClick, ...rest }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (rest.target && rest.target !== '_self') return
    event.preventDefault()
    navigate(to, { replace })
  }

  return <a {...rest} href={to} onClick={handleClick} />
}
