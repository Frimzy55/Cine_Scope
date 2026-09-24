import { useAsync } from '../../hooks/useAsync.js';
import { useEscapeKey } from '../../hooks/useEscapeKey.js';
import { imageUrl, getMovieDetail, getMovieCredits } from '../../api/tmdb.js';
import { formatYear } from '../../utils/formatYear.js';
import { formatRuntime } from '../../utils/formatRuntime.js';
import RatingBadge from '../movie/RatingBadge.jsx';
import WatchlistToggle from '../watchlist/WatchlistToggle.jsx';
import CastScroll from './CastScroll.jsx';
import ReadMore from './ReadMore.jsx';
import Spinner from '../ui/Spinner.jsx';
import ErrorState from '../ui/ErrorState.jsx';
import styles from './MovieDetailPanel.module.css';

export default function MovieDetailPanel({ movieId, onClose }) {
  useEscapeKey(onClose);

  const detail = useAsync(
    (signal) => getMovieDetail(movieId, { signal }),
    [movieId]
  );
  const credits = useAsync(
    (signal) => getMovieCredits(movieId, { signal }),
    [movieId]
  );

  const d = detail.data;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Movie details"
    >
      <div className={styles.backdrop} onClick={onClose} />
      <aside className={styles.panel}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {detail.loading && (
          <div className={styles.center}>
            <Spinner />
          </div>
        )}

        {detail.error && (
          <div className={styles.center}>
            <ErrorState
              message={detail.error.message}
              onRetry={detail.reload}
            />
          </div>
        )}

        {d && !detail.loading && (
          <div className={styles.content}>
            {/* -------- HERO -------- */}
            <header className={styles.hero}>
              {d.poster_path && (
                <img
                  className={styles.poster}
                  src={imageUrl(d.poster_path, 'w500')}
                  alt={d.title}
                />
              )}

              <div className={styles.meta}>
                <h2 className={styles.title}>{d.title}</h2>
                {d.tagline && (
                  <p className={styles.tagline}>“{d.tagline}”</p>
                )}

                <div className={styles.statsRow}>
                  <RatingBadge
                    rating={d.vote_average}
                    className={styles.statRating}
                  />

                  <span className={styles.sep} aria-hidden="true">•</span>
                  <span className={styles.stat}>
                    {formatYear(d.release_date)}
                  </span>

                  {d.runtime > 0 && (
                    <>
                      <span className={styles.sep} aria-hidden="true">•</span>
                      <span className={styles.stat}>
                        {formatRuntime(d.runtime)}
                      </span>
                    </>
                  )}

                  {d.genres?.map((g) => (
                    <span key={g.id} className={styles.genre}>
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            {/* -------- OVERVIEW -------- */}
            <section className={styles.section}>
              <h3>Overview</h3>
              <ReadMore text={d.overview || 'No overview available.'} />
            </section>

            {/* -------- CAST -------- */}
            {credits.loading && (
              <section className={styles.section}>
                <h3>Cast</h3>
                <Spinner size={28} />
              </section>
            )}

            {credits.data?.cast?.length > 0 && (
              <section className={styles.section}>
                <h3>Cast</h3>
                <CastScroll cast={credits.data.cast.slice(0, 15)} />
              </section>
            )}

            {/* -------- SAVE -------- */}
            <div className={styles.actions}>
              <WatchlistToggle
                movie={{
                  id: d.id,
                  title: d.title,
                  poster_path: d.poster_path,
                  release_date: d.release_date,
                  vote_average: d.vote_average,
                }}
                variant="panel"
              />
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}