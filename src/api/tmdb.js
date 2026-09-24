const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';



const API_KEY = process.env.REACT_APP_TMDB_KEY;
console.log("TMDB KEY:", API_KEY);

async function fetchJson(path, params = {}, signal) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, Array.isArray(v) ? v.join(',') : v);
    }
  });

  const res = await fetch(url, { signal });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.status_message) message = body.status_message;
    } catch {  }
    throw new Error(message);
  }
  return res.json();
}

export function getGenres({ signal } = {}) {
  return fetchJson('/genre/movie/list', {}, signal);
}

export function discoverMovies({ genreIds = [], sortBy = 'popularity.desc', page = 1, signal } = {}) {
  return fetchJson('/discover/movie', {
    with_genres: genreIds,
    sort_by: sortBy,
    page,
    include_adult: false,
    'vote_count.gte': 50,
  }, signal);
}

export function searchMovies({ query, page = 1, signal } = {}) {
  return fetchJson('/search/movie', {
    query,
    page,
    include_adult: false,
  }, signal);
}

export function getMovieDetail(id, { signal } = {}) {
  return fetchJson(`/movie/${id}`, {}, signal);
}

export function getMovieCredits(id, { signal } = {}) {
  return fetchJson(`/movie/${id}/credits`, {}, signal);
}

export function getMovieVideos(id, { signal } = {}) {
  return fetchJson(`/movie/${id}/videos`, {}, signal);
}

export function imageUrl(path, size = 'w500') {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}