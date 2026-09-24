import styles from './Spinner.module.css';

export default function Spinner({ size = 40, label = 'Loading…' }) {
  return (
    <div className={styles.wrap} role="status" aria-label={label}>
      <div className={styles.circle} style={{ width: size, height: size }} />
    </div>
  );
}