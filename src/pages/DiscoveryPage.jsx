import { useEffect, useRef, useState } from 'react';
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

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(null);

  const loadMoreRef = useRef(null);

  const genres = useAsync((signal) => getGenres({ signal }), []);

  const genreKey = genreIds.join(',');

 
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(1);
    setSelectedMovie(null);
    setLoadMoreError(null);
  }, [query, genreKey, sortBy]);

 
  const results = useAsync(
    (signal) =>
      query
        ? searchMovies({
            query,
            page: 1,
            signal,
          })
        : discoverMovies({
            genreIds,
            sortBy,
            page: 1,
            signal,
          }),
    [query, genreKey, sortBy]
  );

 
  useEffect(() => {
    if (!results.data) return;

    setMovies(results.data.results ?? []);
    setPage(1);
    setTotalPages(results.data.total_pages ?? 1);
  }, [results.data]);

  
  const loadMore = async () => {
    if (loadingMore) return;
    if (page >= totalPages) return;

    setLoadingMore(true);
    setLoadMoreError(null);

    try {
      const nextPage = page + 1;

      const data = query
        ? await searchMovies({
            query,
            page: nextPage,
          })
        : await discoverMovies({
            genreIds,
            sortBy,
            page: nextPage,
          });

      setMovies((current) => [
        ...current,
        ...(data.results ?? []),
      ]);

      setPage(nextPage);
      setTotalPages(data.total_pages ?? totalPages);
    } catch (error) {
      setLoadMoreError(error);
    } finally {
      setLoadingMore(false);
    }
  };

  
  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: '400px',
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [page, totalPages, loadingMore, query, genreKey, sortBy]);

  const showingSearch = query.length > 0;

  const isEmpty =
    !results.loading &&
    !results.error &&
    movies.length === 0;

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
        <h2 className={styles.heading}>
          Results for “{query}”
        </h2>
      )}

      {results.error && (
        <ErrorState
          message={results.error.message}
          onRetry={results.reload}
        />
      )}

      {!results.error && (
        <div className={styles.movieArea}>
          <MovieGrid
            movies={movies}
            loading={results.loading}
            onSelect={setSelectedMovie}
            selectedId={selectedMovie?.id}
          />

          {selectedMovie && (
            <MovieDetailPanel
              movieId={selectedMovie.id}
              onClose={() => setSelectedMovie(null)}
            />
          )}

          {!results.loading && movies.length > 0 && (
            <>
              <div
                ref={loadMoreRef}
                className={styles.loadMoreTrigger}
                aria-hidden="true"
              />

              {loadingMore && (
                <div className={styles.loadingMore}>
                  Loading more movies...
                </div>
              )}

              {loadMoreError && (
                <button
                  type="button"
                  className={styles.retryMore}
                  onClick={loadMore}
                >
                  Failed to load more. Try again
                </button>
              )}

              {!loadingMore && page >= totalPages && (
                <p className={styles.endMessage}>
                  You've reached the end.
                </p>
              )}
            </>
          )}
        </div>
      )}

      {isEmpty && !showingSearch && (
        <p className={styles.empty}>
          No movies match those filters.
        </p>
      )}

      {isEmpty && showingSearch && (
        <p className={styles.empty}>
          No results for “{query}”.
        </p>
      )}
    </div>
  );
}