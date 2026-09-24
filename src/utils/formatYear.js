export function formatYear(dateString) {
  if (!dateString) return '—';
  const year = new Date(dateString).getFullYear();
  return Number.isNaN(year) ? '—' : String(year);
}