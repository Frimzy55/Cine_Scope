import styles from './GenreChips.module.css';


const ALLOWED_GENRE_IDS = [
  28,    
  878,    
  18,     
  35,     
  27,     
];

export default function GenreChips({ genres, selected, onChange, disabled = false }) {
  if (!genres.length) return null;

  const visibleGenres = genres.filter((g) => ALLOWED_GENRE_IDS.includes(g.id));
  if (!visibleGenres.length) return null;

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
      {visibleGenres.map((g) => {
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