import { Outlet } from 'react-router';
import { Sidenav } from '../Sidenav/Sidenav';

export function Layout() {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidenav />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
