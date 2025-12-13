import { NavLink } from 'react-router';
import {
  Badge,
  Sheet,
  Typography,
  NavList,
  NavListItem,
  ListSubheader,
  ColorSchemeToggle,
} from '@base-joy/ui-styled';
import { navigation } from '../../config/navigation';

export function Sidenav() {
  return (
    <Sheet
      variant="plain"
      color="neutral"
      className="w-64 h-screen border-r border-neutral-200 p-4 flex flex-col overflow-y-auto"
    >
      {/* Logo/Title */}
      <NavLink to="/" className="mb-6">
        <Typography level="h1" className="text-xl font-bold text-neutral-900">
          Base Joy
        </Typography>
        <Typography level="body-sm" className="text-neutral-500">
          Component Library
        </Typography>
      </NavLink>

      {/* Navigation */}
      <nav className="flex-1" aria-label="Component navigation">
        {navigation.map((section) => (
          <NavList key={section.title} size="sm" spacing="sm" className="mb-6">
            <ListSubheader>{section.title}</ListSubheader>
            {section.items.map((item) => (
              <NavListItem
                key={item.path}
                to={item.path}
                disabled={item.comingSoon}
                badge={
                  item.comingSoon ? (
                    <Badge variant="soft" color="neutral" size="sm">
                      Soon
                    </Badge>
                  ) : undefined
                }
              >
                {item.label}
              </NavListItem>
            ))}
          </NavList>
        ))}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-neutral-200 space-y-3">
        <ColorSchemeToggle size="sm" />
        <Typography level="body-xs" className="text-neutral-500">
          v0.0.1
        </Typography>
      </div>
    </Sheet>
  );
}
