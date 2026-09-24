import styles from './ErrorState.module.css';

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className={styles.box} role="alert">
      <span className={styles.icon} aria-hidden="true">⚠️</span>
      <div className={styles.body}>
        <p className={styles.text}>{message}</p>
        {onRetry && (
          <button type="button" className={styles.retry} onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}