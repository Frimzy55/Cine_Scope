import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'cinescope:watchlist';
const WatchlistContext = createContext(null);

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const has = (id) => items.some((m) => m.id === id);

  const add = (movie) => {
    setItems((prev) => (prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]));
  };

  const remove = (id) => {
    setItems((prev) => prev.filter((m) => m.id !== id));
  };

  const toggle = (movie) => {
    setItems((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  return (
    <WatchlistContext.Provider value={{ items, has, add, remove, toggle }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
}