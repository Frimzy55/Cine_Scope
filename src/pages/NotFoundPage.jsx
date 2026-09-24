import EmptyState from '../components/ui/EmptyState.jsx';

export default function NotFoundPage() {
  return (
    <EmptyState
      icon="🧭"
      title="Page not found"
      message="The page you're looking for doesn't exist."
      ctaLabel="Back to Discover"
      ctaTo="/"
    />
  );
}