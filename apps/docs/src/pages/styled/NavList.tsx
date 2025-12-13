import { Typography, NavList, NavListItem, Badge } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';

const navListProps: PropMeta[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'The size of navigation items.',
    required: false,
  },
  {
    name: 'spacing',
    type: "'none' | 'sm' | 'md' | 'lg'",
    defaultValue: "'sm'",
    description: 'The spacing between navigation items.',
    required: false,
  },
];

const navListItemProps: PropMeta[] = [
  {
    name: 'to',
    type: 'string',
    description: 'The route path to navigate to.',
    required: true,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Optional icon displayed at the start.',
    required: false,
  },
  {
    name: 'badge',
    type: 'React.ReactNode',
    description: 'Optional badge/content displayed at the end.',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the item is disabled.',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The label text for the navigation item.',
    required: true,
  },
];

const navListGroupProps: PropMeta[] = [
  {
    name: 'defaultOpen',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the group is open by default.',
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: "'group'",
    description: 'Unique value for the accordion item.',
    required: false,
  },
];

const navListGroupTriggerProps: PropMeta[] = [
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Optional icon displayed at the start.',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The label text for the group.',
    required: true,
  },
];

export function NavListPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="NavList"
        description="A navigation list component with active state detection, built on List and integrated with React Router."
      />

      <Section title="Usage" id="usage">
        <Typography level="body-sm" className="mb-4">
          NavList is designed for navigation menus. NavListItem automatically
          detects the active route using React Router's{' '}
          <code className="font-mono text-sm">useMatch</code> hook and highlights
          the current item.
        </Typography>
        <Typography level="body-sm" className="mb-4">
          The component is currently being used in the sidebar navigation of this
          documentation site.
        </Typography>
      </Section>

      <Section title="Examples" id="examples">
        <div className="space-y-8">
          <Section title="Basic Navigation" titleLevel="h3" id="basic">
            <Typography level="body-sm" className="mb-4">
              NavListItems always render as links. The active item is
              automatically highlighted based on the current route.
            </Typography>
            <div className="max-w-xs border border-neutral-200 rounded-lg p-4">
              <NavList size="sm" spacing="sm">
                <NavListItem to="/styled/navlist">NavList (Current)</NavListItem>
                <NavListItem to="/styled/list">List</NavListItem>
                <NavListItem to="/styled/accordion">Accordion</NavListItem>
              </NavList>
            </div>
          </Section>

          <Section title="With Icons" titleLevel="h3" id="icons">
            <div className="max-w-xs border border-neutral-200 rounded-lg p-4">
              <NavList size="sm" spacing="sm">
                <NavListItem to="#home" icon="🏠">
                  Home
                </NavListItem>
                <NavListItem to="#docs" icon="📚">
                  Documentation
                </NavListItem>
                <NavListItem to="#settings" icon="⚙️">
                  Settings
                </NavListItem>
              </NavList>
            </div>
          </Section>

          <Section title="With Badges" titleLevel="h3" id="badges">
            <Typography level="body-sm" className="mb-4">
              Use badges to show status, counts, or labels like "Coming Soon".
            </Typography>
            <div className="max-w-xs border border-neutral-200 rounded-lg p-4">
              <NavList size="sm" spacing="sm">
                <NavListItem
                  to="#inbox"
                  badge={
                    <Badge variant="solid" color="primary" size="sm">
                      12
                    </Badge>
                  }
                >
                  Inbox
                </NavListItem>
                <NavListItem
                  to="#drafts"
                  badge={
                    <Badge variant="soft" color="neutral" size="sm">
                      3
                    </Badge>
                  }
                >
                  Drafts
                </NavListItem>
                <NavListItem
                  to="#coming"
                  disabled
                  badge={
                    <Badge variant="soft" color="neutral" size="sm">
                      Soon
                    </Badge>
                  }
                >
                  New Feature
                </NavListItem>
              </NavList>
            </div>
          </Section>

          <Section title="Disabled Items" titleLevel="h3" id="disabled">
            <Typography level="body-sm" className="mb-4">
              Disabled items are visible but cannot be clicked or focused.
            </Typography>
            <div className="max-w-xs border border-neutral-200 rounded-lg p-4">
              <NavList size="sm" spacing="sm">
                <NavListItem to="#enabled">Enabled</NavListItem>
                <NavListItem to="#disabled" disabled>
                  Disabled
                </NavListItem>
                <NavListItem to="#also-enabled">Also Enabled</NavListItem>
              </NavList>
            </div>
          </Section>

          <Section title="Sizes" titleLevel="h3" id="sizes">
            <div className="space-y-6">
              <div className="max-w-xs border border-neutral-200 rounded-lg p-4">
                <Typography level="body-sm" className="mb-2">
                  Small
                </Typography>
                <NavList size="sm" spacing="sm">
                  <NavListItem to="#sm-1">First Item</NavListItem>
                  <NavListItem to="#sm-2">Second Item</NavListItem>
                </NavList>
              </div>
              <div className="max-w-xs border border-neutral-200 rounded-lg p-4">
                <Typography level="body-sm" className="mb-2">
                  Medium (default)
                </Typography>
                <NavList size="md" spacing="sm">
                  <NavListItem to="#md-1">First Item</NavListItem>
                  <NavListItem to="#md-2">Second Item</NavListItem>
                </NavList>
              </div>
              <div className="max-w-xs border border-neutral-200 rounded-lg p-4">
                <Typography level="body-sm" className="mb-2">
                  Large
                </Typography>
                <NavList size="lg" spacing="sm">
                  <NavListItem to="#lg-1">First Item</NavListItem>
                  <NavListItem to="#lg-2">Second Item</NavListItem>
                </NavList>
              </div>
            </div>
          </Section>
        </div>
      </Section>

      <Section title="React Router Integration" id="router">
        <Typography level="body-sm" className="mb-4">
          NavListItem uses React Router's <code className="font-mono text-sm">NavLink</code>{' '}
          component internally and detects the active route via{' '}
          <code className="font-mono text-sm">useMatch</code>. Active items automatically
          receive:
        </Typography>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <Typography level="body-sm">
              <code className="font-mono text-sm">selected</code> state (highlighted background)
            </Typography>
          </li>
          <li>
            <Typography level="body-sm">
              <code className="font-mono text-sm">primary</code> color (instead of neutral)
            </Typography>
          </li>
        </ul>
      </Section>

      <Section title="API Reference" id="api">
        <div className="space-y-8">
          <div>
            <Typography level="h3" className="mb-4">
              NavList
            </Typography>
            <PropsTable props={navListProps} />
          </div>
          <div>
            <Typography level="h3" className="mb-4">
              NavListItem
            </Typography>
            <PropsTable props={navListItemProps} />
          </div>
          <div>
            <Typography level="h3" className="mb-4">
              NavListGroup
            </Typography>
            <Typography level="body-sm" className="mb-4">
              A collapsible group for nested navigation items, built on Accordion.
            </Typography>
            <PropsTable props={navListGroupProps} />
          </div>
          <div>
            <Typography level="h3" className="mb-4">
              NavListGroupTrigger
            </Typography>
            <PropsTable props={navListGroupTriggerProps} />
          </div>
          <div>
            <Typography level="h3" className="mb-4">
              NavListGroupContent
            </Typography>
            <Typography level="body-sm">
              Container for nested NavListItems. Accepts children and className props.
            </Typography>
          </div>
        </div>
      </Section>
    </div>
  );
}
