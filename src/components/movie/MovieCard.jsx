import { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { imageUrl, getMovieDetail } from '../../api/tmdb.js';
import { formatYear } from '../../utils/formatYear.js';
import { useWatchlist } from '../../context/WatchlistContext.jsx';
import RatingBadge from './RatingBadge.jsx';
import WatchlistToggle from '../watchlist/WatchlistToggle.jsx';
import styles from './MovieCard.module.css';

function formatRuntime(minutes) {
  if (!minutes) return null;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}m`;
}

export default function MovieCard({
  movie,
  onSelect,
  isSelected = false,
  showRemoveButton = false,
}) {
  const [runtime, setRuntime] = useState(null);
  const { remove } = useWatchlist();

  const poster = imageUrl(movie.poster_path, 'w342');

  useEffect(() => {
    let cancelled = false;

    async function loadRuntime() {
      try {
        const details = await getMovieDetail(movie.id);

        if (!cancelled) {
          setRuntime(formatRuntime(details.runtime));
        }
      } catch (error) {
        console.error('Failed to load movie runtime:', error);
      }
    }

    loadRuntime();

    return () => {
      cancelled = true;
    };
  }, [movie.id]);

  function handleRemove(e) {
    e.stopPropagation();
    e.preventDefault();
    remove(movie.id);
  }

  return (
    <article className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      <button
        type="button"
        className={styles.posterBtn}
        onClick={() => onSelect(movie)}
        aria-label={`View details for ${movie.title}`}
      >
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            loading="lazy"
            className={styles.poster}
          />
        ) : (
          <div className={styles.posterFallback}>No poster</div>
        )}

        <WatchlistToggle movie={movie} variant="corner" />

        <RatingBadge
          rating={movie.vote_average}
          className={styles.rating}
        />

        
        {showRemoveButton && <span className={styles.overlay} aria-hidden="true" />}
      </button>

      
      {showRemoveButton && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={handleRemove}
          aria-label={`Remove ${movie.title} from watchlist`}
          title="Remove from watchlist"
        >
          <FiTrash2 aria-hidden="true" />
          <span className={styles.removeLabel}>Remove</span>
        </button>
      )}

      <div className={styles.info}>
        <h3 className={styles.title} title={movie.title}>
          {movie.title}
        </h3>

        <div className={styles.meta}>
          <span>{formatYear(movie.release_date)}</span>

          {runtime && (
            <>
              <span>•</span>
              <span>{runtime}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}