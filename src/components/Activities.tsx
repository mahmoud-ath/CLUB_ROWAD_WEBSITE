import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { ArrowForward, Instagram, YouTube } from './icons'
import { activities, activityCategories, hasVerifiedActivities, type Activity } from '../data/activities'
import { activities as activitiesCopy, links } from '../data/club'
import './Activities.css'

function ActivityCard({ activity }: { activity: Activity }) {
  const href = activity.sourceHref || '#activities'

  return (
    <article className="activity">
      {activity.poster && (
        <div className="activity__media">
          <img
            className="activity__poster"
            src={activity.poster}
            alt={activity.posterAlt || `ملصق نشاط: ${activity.title}`}
            loading="lazy"
            decoding="async"
            style={{ objectFit: activity.posterFit || 'cover' }}
          />
        </div>
      )}

      <div className="activity__body">
        <p className="activity__category">{activity.categoryLabel}</p>
        <h3 className="activity__title">{activity.title}</h3>
        <p className="activity__description">{activity.description}</p>

        {(activity.dateLabel || activity.location) && (
          <dl className="activity__meta">
            {activity.dateLabel && (
              <div>
                <dt>التاريخ</dt>
                <dd>{activity.dateLabel}</dd>
              </div>
            )}
            {activity.location && (
              <div>
                <dt>المكان</dt>
                <dd>{activity.location}</dd>
              </div>
            )}
          </dl>
        )}

        <a
          className="link-arrow activity__link"
          href={href}
          {...(activity.sourceHref
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {activitiesCopy.detailLabel}
          <ArrowForward size={17} />
        </a>
      </div>
    </article>
  )
}

export function Activities() {
  return (
    <section className="section activities" id="activities" aria-labelledby="activities-title">
      <div className="container">
        <SectionHead
          id="activities-title"
          kicker={activitiesCopy.kicker}
          lines={activitiesCopy.titleLines}
          lead={activitiesCopy.intro}
        />

        {hasVerifiedActivities ? (
          <ul className="activities__grid">
            {activities.map((activity, index) => (
              <Reveal as="li" key={activity.id} delay={index * 70} className="activities__item">
                <ActivityCard activity={activity} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="archive-empty">
            <div className="archive-empty__visual" aria-hidden="true">
              <span className="archive-empty__grid" />
              <span className="archive-empty__stamp">
                <span>قيد</span>
                <span>التوثيق</span>
              </span>
              <span className="archive-empty__caption">{activityCategories.culture} · {activityCategories.education} · {activityCategories.awareness}</span>
            </div>

            <div className="archive-empty__copy">
              <h3 className="archive-empty__title">{activitiesCopy.empty.title}</h3>
              <p className="archive-empty__body">{activitiesCopy.empty.body}</p>

              <div className="archive-empty__actions">
                <a
                  className="btn btn--primary"
                  href={links.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={18} />
                  {activitiesCopy.empty.primaryLabel}
                </a>
                <a
                  className="btn btn--ghost"
                  href={links.youtube.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTube size={18} />
                  {activitiesCopy.empty.secondaryLabel}
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
