import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync.js';
import { getGenres, discoverMovies, searchMovies } from '../api/tmdb.js';
import GenreChips from '../components/filters/GenreChips.jsx';
import SortControls from '../components/filters/SortControls.jsx';
import MovieGrid from '../components/movie/MovieGrid.jsx';
import MovieDetailPanel from '../components/detail/MovieDetailPanel.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import styles from './DiscoveryPage.module.css';

export default function DiscoveryPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';

  const [genreIds, setGenreIds] = useState([]);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const genres = useAsync((signal) => getGenres({ signal }), []);
  const genreKey = genreIds.join(',');

  const results = useAsync(
    (signal) =>
      query
        ? searchMovies({ query, signal })
        : discoverMovies({ genreIds, sortBy, signal }),
    [query, genreKey, sortBy]
  );

  const showingSearch = query.length > 0;
  const movies = results.data?.results ?? [];
  const isEmpty = !results.loading && !results.error && movies.length === 0;

  return (
    <div className={styles.page}>
      <div className={styles.controlsRow}>
        <GenreChips
          genres={genres.data?.genres ?? []}
          selected={genreIds}
          onChange={setGenreIds}
          disabled={showingSearch}
        />
        <SortControls
          value={sortBy}
          onChange={setSortBy}
          disabled={showingSearch}
        />
      </div>

      {showingSearch && (
        <h2 className={styles.heading}>Results for “{query}”</h2>
      )}

      {results.error && (
        <ErrorState message={results.error.message} onRetry={results.reload} />
      )}

      {!results.error && (
        <MovieGrid
          movies={movies}
          loading={results.loading}
          onSelect={setSelectedMovie}
          selectedId={selectedMovie?.id}
        />
      )}

      {isEmpty && !showingSearch && (
        <p className={styles.empty}>No movies match those filters.</p>
      )}
      {isEmpty && showingSearch && (
        <p className={styles.empty}>No results for “{query}”.</p>
      )}

      {selectedMovie && (
        <MovieDetailPanel
          movieId={selectedMovie.id}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}