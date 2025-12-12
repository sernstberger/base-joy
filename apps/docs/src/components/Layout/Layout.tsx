import { Outlet } from 'react-router';
import { Sidenav } from '../Sidenav/Sidenav';

export function Layout() {
  return (
    <div className="min-h-screen flex">
      <Sidenav />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
