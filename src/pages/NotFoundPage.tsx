import { ArrowForward } from '../components/icons'
import { Link } from '../router'
import { usePageMeta } from '../hooks/usePageMeta'
import { activityPage, club } from '../data/club'
import './NotFoundPage.css'

export function NotFoundPage() {
  usePageMeta({ title: `الصفحة غير موجودة — ${club.name}` })

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="container not-found__inner">
        <p className="not-found__code" aria-hidden="true">
          {activityPage.notFound.code}
        </p>
        <span className="kicker">{club.slogan}</span>
        <h1 className="not-found__title" id="not-found-title">
          {activityPage.notFound.title}
        </h1>
        <p className="not-found__body">{activityPage.notFound.body}</p>

        <div className="not-found__actions">
          <Link className="btn btn--primary" to="/">
            {activityPage.notFound.back}
            <ArrowForward size={18} className="btn__icon" />
          </Link>
          <Link className="btn btn--ghost" to="/#activities">
            {activityPage.allActivities}
          </Link>
        </div>
      </div>
    </section>
  )
}
