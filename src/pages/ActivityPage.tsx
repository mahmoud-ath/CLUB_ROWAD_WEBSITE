import { ArrowForward, ExternalLink, Instagram } from '../components/icons'
import { LineHeading, Reveal } from '../components/Reveal'
import { Motif } from '../components/Motif'
import { ActivityStory } from '../components/ActivityStory'
import { Link } from '../router'
import { usePageMeta } from '../hooks/usePageMeta'
import { activities, activityNumber, type Activity } from '../data/activities'
import { activityPage, activities as activitiesCopy, club, contact, links } from '../data/club'
import { activityDetails } from '../data/activityDetails'
import { archivePhotos, type ArchivePhoto } from '../data/media'
import { seededPick } from '../lib/seeded'
import './ActivityPage.css'

const ARCHIVE_COUNT = 4

/**
 * اختيار شبه-عشوائي لكنه ثابت: النشاط نفسه يعطي الصور نفسها في كل عرض
 * (لا وميض بين إعادات الرسم)، وصفحتان مختلفتان لا تعطيان المجموعة نفسها.
 */
function pickArchivePhotos(activityId: string, count: number): ArchivePhoto[] {
  const own = archivePhotos.filter((photo) => photo.activity === activityId)
  /* صور النشاط نفسه أولًا، وإلا فمن أرشيف النادي كله */
  const source = own.length >= count ? own : archivePhotos
  return seededPick(source, count, activityId)
}

/**
 * صفحة نشاط: العنوان الكبير، الصورة الموثّقة، المحور الذي ينتمي إليه النشاط
 * داخل هوية النادي، ثم بقية الأنشطة. التركيب يتناوب (نص/صورة) بحسب ترتيب
 * النشاط، فيأخذ كل نشاط إيقاعه الخاص داخل النظام نفسه.
 */
export function ActivityPage({ activity }: { activity: Activity }) {
  const index = activities.findIndex((item) => item.id === activity.id)
  const total = String(activities.length).padStart(2, '0')
  const number = activityNumber(activity.id)
  const theme = club.themes.find((item) => item.id === activity.category) ?? club.themes[0]
  const others = activities.filter((item) => item.id !== activity.id)
  const photos = pickArchivePhotos(activity.id, ARCHIVE_COUNT)
  const story = activityDetails[activity.id]

  usePageMeta({
    title: `${activity.title} — ${club.name}`,
    description: activity.description,
  })

  return (
    <article className="ap" data-side={index % 2 === 0 ? 'start' : 'end'}>
      <header className="ap__hero">
        <span className="ap__ghost" aria-hidden="true">
          {number}
        </span>

        <div className="container">
          <nav className="ap__crumbs" aria-label={activityPage.crumbsLabel}>
            <Link to="/">{activityPage.home}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/#activities">{activitiesCopy.kicker}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{activity.title}</span>
          </nav>

          <div className="ap__grid">
            <Reveal className="ap__copy">
              <p className="ap__meta">
                <span className="ap__num">{number}</span>
                <span aria-hidden="true">/</span>
                <span className="ap__of">{total}</span>
                <span className="ap__cat">{activity.categoryLabel}</span>
              </p>

              <h1 className="ap__title">{activity.title}</h1>
              <p className="ap__lead">{activity.description}</p>

              <div className="ap__actions">
                <a
                  className="btn btn--primary"
                  href={links.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={18} className="btn__icon" />
                  {activityPage.instagramCta}
                </a>
                <Link className="btn btn--ghost" to="/#activities">
                  {activityPage.allActivities}
                  <ArrowForward size={18} className="btn__icon" />
                </Link>
              </div>
            </Reveal>

            <Reveal as="div" className="ap__figure-wrap" delay={110}>
              <figure className="ap__visual">
                {activity.cover ? (
                  <img
                    className="ap__img"
                    src={activity.cover}
                    alt={activity.coverAlt ?? activity.title}
                    style={{ objectPosition: activity.focus ?? '50% 50%' }}
                    decoding="async"
                  />
                ) : (
                  <div
                    className="ap__visual-empty"
                    role="img"
                    aria-label={`لوحة تحريرية تعبيرية لنشاط «${activity.title}»`}
                  >
                    <Motif name={activity.motif} />
                  </div>
                )}

                <span className="ap__watermark" aria-hidden="true">
                  <Motif name={activity.motif} />
                </span>

                {activity.coverCaption && (
                  <figcaption className="ap__caption">{activity.coverCaption}</figcaption>
                )}
              </figure>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="ap__band on-paper" aria-labelledby="ap-theme-title">
        <div className="container ap__band-grid">
          <Reveal className="ap__band-copy">
            <span className="kicker">{activityPage.themeKicker}</span>
            <h2 className="ap__band-title" id="ap-theme-title">
              {theme.label}
            </h2>
            <p className="ap__band-text">{theme.description}</p>

            <span className="ap__band-motif" aria-hidden="true">
              <Motif name={theme.motif} />
            </span>
          </Reveal>

          <Reveal className="ap__facts-wrap" delay={90}>
            <dl className="ap__facts">
              <div>
                <dt>{activityPage.facts.theme}</dt>
                <dd>{theme.label}</dd>
              </div>
              <div>
                <dt>{activityPage.facts.label}</dt>
                <dd>{activity.categoryLabel}</dd>
              </div>
              <div>
                <dt>{activityPage.facts.order}</dt>
                <dd>
                  {number} / {total}
                </dd>
              </div>
              <div>
                <dt>{activityPage.facts.source}</dt>
                <dd>
                  <a
                    className="ap__source"
                    href={links.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span dir="ltr" lang="en">
                      {links.instagram.handle}
                    </span>
                    <ExternalLink size={13} />
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {story && <ActivityStory story={story} />}

      <section className="ap__archive" aria-labelledby="ap-archive-title">
        <div className="container">
          <div className="ap__archive-head">
            <h2 className="ap__archive-title" id="ap-archive-title">
              {activityPage.archiveTitle}
            </h2>
            <p className="ap__archive-lead">{activityPage.archiveLead}</p>
          </div>

          <ul className="ap__archive-grid">
            {photos.map((photo) => (
              <li className="ap__archive-item" key={photo.id}>
                <img src={photo.src} alt="" loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ap__more" aria-labelledby="ap-more-title">
        <div className="container">
          <div className="ap__more-head">
            <div>
              <h2 className="ap__more-title" id="ap-more-title">
                {activityPage.othersTitle}
              </h2>
              <p className="ap__more-lead">{activityPage.othersLead}</p>
            </div>
            <Link className="link-arrow" to="/#activities">
              {activityPage.allActivities}
              <ArrowForward size={17} />
            </Link>
          </div>

          <ul className="ap__more-grid">
            {others.map((item) => (
              <li key={item.id}>
                <Link className="ap__card" to={item.path}>
                  <span className="ap__card-media">
                    {item.cover ? (
                      <img
                        src={item.cover}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: item.focus ?? '50% 50%' }}
                      />
                    ) : (
                      <span className="ap__card-glyph" aria-hidden="true">
                        <Motif name={item.motif} />
                      </span>
                    )}
                    <span className="ap__card-num" aria-hidden="true">
                      {activityNumber(item.id)}
                    </span>
                  </span>

                  <span className="ap__card-body">
                    <span className="ap__card-text">
                      <span className="ap__card-cat">{item.categoryLabel}</span>
                      <span className="ap__card-title">{item.title}</span>
                    </span>
                    <span className="ap__card-go" aria-hidden="true">
                      <ArrowForward size={16} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ap__closing on-mist" aria-labelledby="ap-closing-title">
        <div className="container ap__closing-inner">
          <div className="ap__closing-copy">
            <span className="kicker">{contact.kicker}</span>
            <LineHeading
              as="h2"
              id="ap-closing-title"
              className="ap__closing-title"
              lines={contact.titleLines}
            />
            <p className="ap__closing-text">{contact.body}</p>
          </div>

          <div className="ap__closing-actions">
            <a
              className="btn btn--ink"
              href={links.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} className="btn__icon" />
              {contact.instagramCta}
            </a>
            <Link className="link-arrow" to="/">
              {activityPage.backHome}
              <ArrowForward size={16} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
