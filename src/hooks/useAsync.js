import { useCallback, useEffect, useRef, useState } from 'react';

export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  
  const fnRef = useRef(asyncFn);
  useEffect(() => {
    fnRef.current = asyncFn;
  });

  // Bump this to force a reload
  const [nonce, setNonce] = useState(0);
  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    setState((s) => ({ ...s, loading: true, error: null }));

    (async () => {
      try {
        const data = await fnRef.current(controller.signal);
        if (!cancelled) setState({ data, loading: false, error: null });
      } catch (err) {
        if (err?.name === 'AbortError') return;
        if (!cancelled) setState({ data: null, loading: false, error: err });
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  
  }, [...deps, nonce]);

  return { ...state, reload };
}