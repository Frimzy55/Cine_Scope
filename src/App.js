import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import DiscoveryPage from './pages/DiscoveryPage.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DiscoveryPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}