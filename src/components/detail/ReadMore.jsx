import { useState } from 'react';
import styles from './ReadMore.module.css';

export default function ReadMore({ text, limit = 280 }) {
  const [expanded, setExpanded] = useState(false);
  const long = text && text.length > limit;
  const display = expanded || !long ? text : `${text.slice(0, limit)}…`;

  return (
    <div>
      <p className={styles.text}>{display}</p>
      {long && (
        <button
          type="button"
          className={styles.btn}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}