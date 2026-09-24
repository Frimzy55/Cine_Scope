import styles from './GenreChips.module.css';

export default function GenreChips({ genres, selected, onChange, disabled = false }) {
  if (!genres.length) return null;

  const toggle = (id) => {
    if (disabled) return;
    onChange(
      selected.includes(id)
        ? selected.filter((g) => g !== id)
        : [...selected, id]
    );
  };

  return (
    <div className={styles.chips} role="group" aria-label="Filter by genre">
      {genres.map((g) => {
        const active = selected.includes(g.id);
        return (
          <button
            key={g.id}
            type="button"
            className={`${styles.chip} ${active ? styles.active : ''}`}
            onClick={() => toggle(g.id)}
            aria-pressed={active}
            disabled={disabled}
          >
            {g.name}
          </button>
        );
      })}
    </div>
  );
}