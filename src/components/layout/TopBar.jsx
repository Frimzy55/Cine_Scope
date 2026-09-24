import { NavLink } from 'react-router-dom';
import { FiFilm } from 'react-icons/fi';
import SearchInput from '../search/SearchInput.jsx';
import { useWatchlist } from '../../context/WatchlistContext.jsx';
import styles from './TopBar.module.css';

export default function TopBar() {
  const { items } = useWatchlist();
  const count = items.length;

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand}>
          <FiFilm aria-hidden="true" /> CineScope
        </NavLink>

        <div className={styles.search}>
          <SearchInput />
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Watchlist
            {count > 0 && (
              <span className={styles.badge} aria-label={`${count} saved`}>
                {count}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}