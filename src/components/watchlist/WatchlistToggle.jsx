import { FiBookmark } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import { useWatchlist } from '../../context/WatchlistContext.jsx';
import styles from './WatchlistToggle.module.css';

export default function WatchlistToggle({ movie, variant = 'card' }) {
  const { has, toggle } = useWatchlist();
  const saved = has(movie.id);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggle({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
  };

  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[variant]} ${saved ? styles.saved : ''}`}
      onClick={handleClick}
      aria-label={saved ? 'Remove from watchlist' : 'Save to watchlist'}
      aria-pressed={saved}
      title={saved ? 'Saved' : 'Save to watchlist'}
    >
      {saved ? <FaBookmark /> : <FiBookmark />}
      {variant === 'panel' && (
        <span className={styles.label}>
          {saved ? 'Saved' : 'Save to Watchlist'}
        </span>
      )}
    </button>
  );
}