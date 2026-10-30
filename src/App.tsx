import { useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ActivityPage } from './pages/ActivityPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { findActivityByPath } from './data/activities'
import { usePathname } from './router'

export default function App() {
  const pathname = usePathname()
  const activity = findActivityByPath(pathname)

  /* Deep links such as /#activities: scroll once the home page has mounted. */
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        تخطَّ إلى المحتوى
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        {activity ? (
          <ActivityPage key={activity.id} activity={activity} />
        ) : pathname === '/' ? (
          <HomePage />
        ) : (
          <NotFoundPage />
        )}
      </main>

      <Footer />
    </>
  )
}
