import { ArrowForward, Instagram, YouTube } from './icons'
import { Reveal } from './Reveal'
import type { ActivityEntryView, ActivityStoryView } from '../data/activityDetails'
import './ActivityStory.css'

function EntryCard({ entry }: { entry: ActivityEntryView }) {
  const LinkIcon = entry.link?.kind === 'youtube' ? YouTube : Instagram

  return (
    <article className={['entry', entry.cover ? 'entry--media' : ''].filter(Boolean).join(' ')}>
      {entry.cover && (
        <div className="entry__media">
          <img
            src={entry.cover.src}
            alt={entry.cover.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="entry__body">
        <span className="entry__badge">{entry.badge}</span>
        <h3 className="entry__title">{entry.title}</h3>
        {entry.subtitle && <p className="entry__subtitle">{entry.subtitle}</p>}
        {entry.meta && entry.meta.length > 0 && (
          <p className="entry__meta">{entry.meta.join(' · ')}</p>
        )}

        <p className="entry__summary">{entry.summary}</p>

        {entry.people && entry.people.length > 0 && (
          <ul className="entry__people">
            {entry.people.map((person) => (
              <li key={person.name}>
                <strong>{person.name}</strong> — {person.role}
              </li>
            ))}
          </ul>
        )}

        {entry.topics && entry.topics.length > 0 && (
          <ul className="entry__topics">
            {entry.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        )}

        {entry.photos && entry.photos.length > 0 && (
          <ul className="entry__gallery">
            {entry.photos.map((photo) => (
              <li key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        )}

        {entry.link && (
          <a
            className="entry__link"
            href={entry.link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon size={16} />
            {entry.link.label}
            <ArrowForward size={15} />
          </a>
        )}
      </div>
    </article>
  )
}

/**
 * حكاية النشاط: الفكرة والأهداف، ثم اللقاءات الموثّقة (كتب، نسخ، حلقات، دورات)
 * بصورها وروابطها الرسمية. تقرأ على الورق لتكون مساحة قراءة لا استعراض.
 */
export function ActivityStory({ story }: { story: ActivityStoryView }) {
  return (
    <>
      <section className="section--tight story on-paper" aria-labelledby="story-title">
        <div className="container story__grid">
          <Reveal className="story__copy">
            <span className="kicker">{story.introKicker}</span>
            <h2 className="story__title" id="story-title">
              {story.introTitle}
            </h2>
            {story.intro.map((paragraph) => (
              <p className="story__text" key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="story__objectives" delay={90}>
            <h3 className="story__objectives-title">{story.objectivesTitle}</h3>
            <ul className="story__list">
              {story.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section--tight entries on-paper" aria-labelledby="entries-title">
        <div className="container">
          <Reveal className="entries__head">
            <span className="kicker">{story.entriesKicker}</span>
            <h2 className="entries__title" id="entries-title">
              {story.entriesTitle}
            </h2>
            {story.entriesLead && <p className="entries__lead">{story.entriesLead}</p>}
          </Reveal>

          <ol className="entries__list">
            {story.entries.map((entry, index) => (
              <Reveal as="li" className="entries__item" key={entry.id} delay={index * 70}>
                <EntryCard entry={entry} />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
