import { Outlet } from 'react-router-dom';
import TopBar from './TopBar.jsx';

export default function Layout() {
  return (
    <>
      <TopBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}