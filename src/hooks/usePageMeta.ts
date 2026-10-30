import { useEffect } from 'react'

/**
 * Page title + meta description for the current route, restored on unmount so
 * returning to the home page brings back the values baked into index.html.
 */
export function usePageMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    const previousTitle = document.title
    const tag = document.querySelector('meta[name="description"]')
    const previousDescription = tag?.getAttribute('content') ?? ''

    document.title = title
    if (description && tag) tag.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (tag) tag.setAttribute('content', previousDescription)
    }
  }, [title, description])
}
