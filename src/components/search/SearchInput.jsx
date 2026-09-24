import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import styles from './SearchInput.module.css';

export default function SearchInput() {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  
  const urlQuery = location.pathname === '/' ? params.get('q') ?? '' : '';
  const [value, setValue] = useState(urlQuery);

  useEffect(() => {
    setValue(urlQuery);
  }, [urlQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    const q = value.trim();
    if (!q) {
      navigate('/');
      return;
    }
    navigate(`/?q=${encodeURIComponent(q)}`);
  }

  function handleChange(e) {
    const next = e.target.value;
    setValue(next);

    
  }

  
  useEffect(() => {
    if (location.pathname !== '/') return;
    const trimmed = value.trim();
    const current = params.get('q') ?? '';
    if (trimmed === current) return;

    const id = setTimeout(() => {
      if (trimmed) {
        navigate(`/?q=${encodeURIComponent(trimmed)}`, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }, 350);

    return () => clearTimeout(id);
  }, [value, location.pathname]); 

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search movies…"
        aria-label="Search movies"
        autoComplete="off"
      />
    </form>
  );
}