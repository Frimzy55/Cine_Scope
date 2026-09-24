import { imageUrl } from '../../api/tmdb.js';
import styles from './CastScroll.module.css';

export default function CastScroll({ cast }) {
  return (
    <div className={styles.scroll}>
      {cast.map((p) => {
        const avatar = imageUrl(p.profile_path, 'w185');
        return (
          <div key={p.id} className={styles.card}>
            {avatar ? (
              <img src={avatar} alt={p.name} className={styles.avatar} />
            ) : (
              <div className={`${styles.avatar} ${styles.avatarFallback}`}>
                {p.name?.[0] || '?'}
              </div>
            )}
            <p className={styles.actor}>{p.name}</p>
            <p className={styles.character}>{p.character}</p>
          </div>
        );
      })}
    </div>
  );
}