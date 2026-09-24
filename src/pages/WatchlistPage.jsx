import { FaFilm } from 'react-icons/fa';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import MovieGrid from '../components/movie/MovieGrid.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import styles from './WatchlistPage.module.css';

export default function WatchlistPage() {
  const { items } = useWatchlist();

  if (!items.length) {
    return (
      <EmptyState
        icon={<FaFilm />}
        title="Your watchlist is empty"
        message="Save films you want to watch later by tapping the star on any movie card."
        ctaLabel="Browse movies"
        ctaTo="/"
      />
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>My Watchlist</h1>
        <p className={styles.count}>
          {items.length} {items.length === 1 ? 'film' : 'films'} saved
        </p>
      </header>


      <MovieGrid
  movies={items}
  loading={false}
  onSelect={() => {}}
  showRemoveButton
/>
    </div>
  );
}
