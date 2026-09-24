import MovieCard from './MovieCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';
import styles from './MovieGrid.module.css';

export default function MovieGrid({
  movies,
  loading,
  onSelect,
  selectedId,
  showRemoveButton = false,   
  skeletonCount = 8,
}) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map((m) => (
        <MovieCard
          key={m.id}
          movie={m}
          onSelect={onSelect}
          isSelected={selectedId === m.id}
          showRemoveButton={showRemoveButton}   
        />
      ))}
    </div>
  );
}