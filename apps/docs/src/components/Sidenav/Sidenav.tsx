import { NavLink } from 'react-router';
import { Badge, Sheet } from '@base-joy/ui-styled';
import { navigation } from '../../config/navigation';

export function Sidenav() {
  return (
    <Sheet
      variant="plain"
      color="neutral"
      className="w-64 min-h-screen border-r border-neutral-200 p-4 flex flex-col"
    >
      {/* Logo/Title */}
      <NavLink to="/" className="mb-6">
        <h1 className="text-xl font-bold text-neutral-900">Base Joy</h1>
        <p className="text-sm text-neutral-500">Component Library</p>
      </NavLink>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto" aria-label="Component navigation">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item) =>
                item.comingSoon ? (
                  <li key={item.path}>
                    <span className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-neutral-400 cursor-not-allowed">
                      {item.label}
                      <Badge variant="soft" color="neutral" size="sm">
                        Soon
                      </Badge>
                    </span>
                  </li>
                ) : (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? 'bg-primary-100 text-primary-700 font-medium'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-500">
        v0.0.1
      </div>
    </Sheet>
  );
}
