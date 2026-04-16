import type { ApodData } from '../types'
import styles from './ApodCard.module.css'

interface ApodCardProps {
  data: ApodData
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ApodCard({ data }: ApodCardProps) {
  const { title, date, explanation, url, hdurl, media_type, copyright, thumbnail_url } = data

  const displayImageUrl = media_type === 'video' ? thumbnail_url : url
  const formattedDate = formatDate(date)

  return (
    <article className={styles.card} aria-label={`Astronomy Picture of the Day: ${title}`}>
      <header className={styles.header}>
        <div className={styles.dateBadge} aria-label={`Date: ${formattedDate}`}>
          <time dateTime={date}>{formattedDate}</time>
        </div>
        {media_type === 'video' && (
          <span className={styles.badge} aria-label="Media type: video">
            Video
          </span>
        )}
      </header>

      <h2 className={styles.title}>{title}</h2>

      {displayImageUrl ? (
        <figure className={styles.figure}>
          <img
            src={displayImageUrl}
            alt={`NASA APOD for ${formattedDate}: ${title}`}
            className={styles.image}
            loading="lazy"
          />
          {media_type === 'video' && (
            <figcaption className={styles.videoNote}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch the video: ${title} (opens in a new tab)`}
              >
                Watch the full video ↗
              </a>
            </figcaption>
          )}
        </figure>
      ) : media_type === 'video' ? (
        <div className={styles.videoEmbed}>
          <iframe
            src={url}
            title={`NASA APOD video: ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        </div>
      ) : null}

      <div className={styles.body}>
        <section aria-labelledby="explanation-heading">
          <h3 id="explanation-heading" className={styles.sectionHeading}>
            About this image
          </h3>
          <p className={styles.explanation}>{explanation}</p>
        </section>

        <footer className={styles.footer}>
          {copyright && (
            <p className={styles.copyright}>
              <span className={styles.metaLabel}>Credit:</span>{' '}
              {copyright.replace(/\n/g, ', ')}
            </p>
          )}
          {hdurl && media_type === 'image' && (
            <a
              href={hdurl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.hdLink}
              aria-label={`Download high definition version of ${title} (opens in a new tab)`}
            >
              View HD image ↗
            </a>
          )}
        </footer>
      </div>
    </article>
  )
}
