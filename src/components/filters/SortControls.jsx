import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import styles from './SortControls.module.css';

const OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'vote_average', label: 'Rating' },
  { value: 'primary_release_date', label: 'Release Date' },
];

export default function SortControls({ value, onChange, disabled = false }) {
  const [field, direction] = value.split('.');

  const handleField = (e) => onChange(`${e.target.value}.${direction}`);
  const toggleDir = () =>
    onChange(`${field}.${direction === 'desc' ? 'asc' : 'desc'}`);

  return (
    <div className={styles.wrap}>
      <label htmlFor="sort-field" className={styles.label}>Sort:</label>

      <div className={styles.sortControl}>
        <select
          id="sort-field"
          value={field}
          onChange={handleField}
          className={styles.select}
          disabled={disabled}
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={toggleDir}
          className={styles.dir}
          disabled={disabled}
          aria-label="Toggle sort direction"
        >
          {direction === 'desc' ? <FiArrowDown /> : <FiArrowUp />}
        </button>
      </div>
    </div>
  );
}