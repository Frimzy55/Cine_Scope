export function ratingTier(rating) {
  if (!rating || rating <= 0) return 'none';
  if (rating >= 8) return 'high';
  if (rating >= 6) return 'mid';
  return 'low';
}