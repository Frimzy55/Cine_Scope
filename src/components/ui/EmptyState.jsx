import { Link } from 'react-router-dom';
import styles from './EmptyState.module.css';

export default function EmptyState({ icon = '🎬', title, message, ctaLabel, ctaTo }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon} aria-hidden="true">{icon}</div>
      {title && <h2 className={styles.title}>{title}</h2>}
      {message && <p className={styles.text}>{message}</p>}
      {ctaLabel && ctaTo && (
        <Link to={ctaTo} className={styles.cta}>{ctaLabel}</Link>
      )}
    </div>
  );
}