import { ratingTier } from '../../utils/ratingTier.js';
import styles from './RatingBadge.module.css';

export default function RatingBadge({ rating, className = '' }) {
  if (!rating || rating <= 0) return null;
  const tier = ratingTier(rating);
  return (
    <span
      className={`${styles.badge} ${styles[tier]} ${className}`}
      aria-label={`Rating ${rating.toFixed(1)} out of 10`}
    >
      ★ {rating.toFixed(1)}
    </span>
  );
}