import { Typography, Sheet, Badge } from '@base-joy/ui-styled';
import {
  Item,
  ItemStart,
  ItemContent,
  ItemEnd,
} from '@base-joy/ui-unstyled';
import { Section } from '../../components/Section';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Link } from 'react-router';

const baseItemProps: PropMeta[] = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    description: 'The size of the item. Controls padding and font size.',
    required: false,
    defaultValue: "'md'",
  },
  {
    name: 'interactive',
    type: 'boolean',
    description: 'Whether the item is interactive (hoverable/clickable).',
    required: false,
    defaultValue: 'false',
  },
  {
    name: 'selected',
    type: 'boolean',
    description: 'Whether the item is selected.',
    required: false,
    defaultValue: 'false',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Whether the item is disabled.',
    required: false,
    defaultValue: 'false',
  },
  {
    name: 'render',
    type: 'React.ReactElement',
    description: 'Render as a different element using the render prop pattern.',
    required: false,
  },
];

const slotComponents: PropMeta[] = [
  {
    name: 'ItemStart',
    type: 'React.ReactNode',
    description: 'Container for leading content (icons, small avatars). Inherits size.',
    required: false,
  },
  {
    name: 'ItemContent',
    type: 'React.ReactNode',
    description: 'Main content area that grows to fill available space. Truncates by default.',
    required: false,
  },
  {
    name: 'ItemEnd',
    type: 'React.ReactNode',
    description: 'Container for trailing content (metadata, badges). Neutral text color.',
    required: false,
  },
  {
    name: 'ItemMedia',
    type: 'React.ReactNode',
    description: 'Container for larger media (avatars, images). Fixed dimensions per size.',
    required: false,
  },
  {
    name: 'ItemHeader',
    type: 'React.ReactNode',
    description: 'Header row with flex justify-between layout.',
    required: false,
  },
  {
    name: 'ItemTitle',
    type: 'React.ReactNode',
    description: 'Primary heading text. Renders as h3.',
    required: false,
  },
  {
    name: 'ItemDescription',
    type: 'React.ReactNode',
    description: 'Secondary text with muted color. Renders as p.',
    required: false,
  },
  {
    name: 'ItemActions',
    type: 'React.ReactNode',
    description: 'Container for action buttons or controls.',
    required: false,
  },
  {
    name: 'ItemFooter',
    type: 'React.ReactNode',
    description: 'Bottom content area. Supports bordered prop for separator.',
    required: false,
  },
  {
    name: 'ItemIcon',
    type: 'React.ReactNode',
    description: 'Icon container with size-responsive dimensions. Hides when loading.',
    required: false,
  },
];

export function UnstyledItemPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Typography level="h1">Item</Typography>
          <Badge variant="outlined" color="neutral" size="sm">Unstyled</Badge>
        </div>
        <Typography level="body-lg" className="text-neutral-600">
          Unstyled, accessible item component for building list items, menu items,
          and structured content layouts.
        </Typography>
        <div className="mt-4">
          <Link
            to="/styled/item"
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            Looking for the styled version? View Item in Styled &rarr;
          </Link>
        </div>
      </header>

      <Section title="Installation">
        <Sheet variant="outlined" color="neutral" className="font-mono text-sm">
          npm install @base-joy/ui-unstyled
        </Sheet>
      </Section>

      <Section title="Import">
        <Sheet variant="outlined" color="neutral" className="font-mono text-sm whitespace-pre">
{`import {
  Item,
  ItemStart,
  ItemContent,
  ItemEnd,
  ItemHeader,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemFooter,
  ItemMedia,
  ItemIcon,
} from '@base-joy/ui-unstyled';`}
        </Sheet>
      </Section>

      <Section title="Anatomy">
        <Typography level="body-md" className="mb-4">
          The Item component uses a slot-based architecture. Compose slots as needed:
        </Typography>
        <Sheet variant="outlined" color="neutral" className="font-mono text-sm whitespace-pre">
{`<Item>
  <ItemStart>{/* Icon or indicator */}</ItemStart>
  <ItemContent>
    <ItemHeader>
      <ItemTitle>{/* Primary text */}</ItemTitle>
      <ItemActions>{/* Action buttons */}</ItemActions>
    </ItemHeader>
    <ItemDescription>{/* Secondary text */}</ItemDescription>
  </ItemContent>
  <ItemEnd>{/* Trailing content */}</ItemEnd>
  <ItemFooter>{/* Bottom content */}</ItemFooter>
</Item>`}
        </Sheet>
      </Section>

      <Section title="Basic Usage">
        <Typography level="body-md" className="mb-4">
          The base Item provides layout structure without visual styling:
        </Typography>
        <div className="border border-neutral-200 rounded-lg overflow-hidden mb-4">
          <Item>
            <ItemStart>
              <span className="w-4 h-4 bg-neutral-400 rounded-full" />
            </ItemStart>
            <ItemContent>Basic item content</ItemContent>
            <ItemEnd>End</ItemEnd>
          </Item>
        </div>
        <Sheet variant="outlined" color="neutral" className="font-mono text-sm whitespace-pre">
{`<Item>
  <ItemStart>
    <span className="w-4 h-4 bg-neutral-400 rounded-full" />
  </ItemStart>
  <ItemContent>Basic item content</ItemContent>
  <ItemEnd>End</ItemEnd>
</Item>`}
        </Sheet>
      </Section>

      <Section title="Sizes">
        <Typography level="body-md" className="mb-4">
          The size prop controls padding and font sizes. All child slots inherit size via context:
        </Typography>
        <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200 overflow-hidden mb-4">
          <Item size="sm">
            <ItemStart>
              <span className="w-3 h-3 bg-neutral-400 rounded-full" />
            </ItemStart>
            <ItemContent>Small (sm)</ItemContent>
          </Item>
          <Item size="md">
            <ItemStart>
              <span className="w-4 h-4 bg-neutral-400 rounded-full" />
            </ItemStart>
            <ItemContent>Medium (md) - default</ItemContent>
          </Item>
          <Item size="lg">
            <ItemStart>
              <span className="w-5 h-5 bg-neutral-400 rounded-full" />
            </ItemStart>
            <ItemContent>Large (lg)</ItemContent>
          </Item>
        </div>
      </Section>

      <Section title="Interactive States">
        <Typography level="body-md" className="mb-4">
          Use <code className="bg-neutral-100 px-1 rounded">interactive</code>,{' '}
          <code className="bg-neutral-100 px-1 rounded">selected</code>, and{' '}
          <code className="bg-neutral-100 px-1 rounded">disabled</code> props for state management:
        </Typography>
        <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200 overflow-hidden mb-4">
          <Item interactive>
            <ItemContent>Interactive (hover me)</ItemContent>
          </Item>
          <Item interactive selected>
            <ItemContent>Selected</ItemContent>
          </Item>
          <Item disabled>
            <ItemContent>Disabled</ItemContent>
          </Item>
        </div>
      </Section>

      <Section title="Polymorphism">
        <Typography level="body-md" className="mb-4">
          Use the <code className="bg-neutral-100 px-1 rounded">render</code> prop to render as a different element:
        </Typography>
        <Sheet variant="outlined" color="neutral" className="font-mono text-sm whitespace-pre">
{`// Render as a link
<Item render={<a href="/page" />}>
  <ItemContent>Link item</ItemContent>
</Item>

// Render as a button
<Item render={<button type="button" />}>
  <ItemContent>Button item</ItemContent>
</Item>`}
        </Sheet>
      </Section>

      <Section title="Custom Styling">
        <Typography level="body-md" className="mb-4">
          The base Item provides no visual styling. Apply your own classes:
        </Typography>
        <Sheet variant="outlined" color="neutral" className="font-mono text-sm whitespace-pre">
{`// With Tailwind CSS
<Item className="bg-blue-50 border border-blue-200 rounded-lg">
  <ItemStart className="text-blue-500">
    <Icon />
  </ItemStart>
  <ItemContent className="text-blue-900">
    Custom styled item
  </ItemContent>
</Item>

// Or use CVA variants directly
import { itemVariants } from '@base-joy/ui-unstyled';

<div className={itemVariants({ size: 'lg', interactive: true })}>
  Using variants directly
</div>`}
        </Sheet>
      </Section>

      <Section title="API Reference">
        <Typography level="h3" className="mb-4">Item Props</Typography>
        <PropsTable props={baseItemProps} />
      </Section>

      <Section title="Slot Components">
        <Typography level="body-md" className="mb-4">
          All slot components accept standard HTML attributes and inherit{' '}
          <code className="bg-neutral-100 px-1 rounded">size</code> from the parent Item via context.
        </Typography>
        <PropsTable props={slotComponents} />
      </Section>

      <Section title="Context">
        <Typography level="body-md" className="mb-4">
          Item provides context for size inheritance. You can also use it directly:
        </Typography>
        <Sheet variant="outlined" color="neutral" className="font-mono text-sm whitespace-pre">
{`import { ItemContext, useItemContext } from '@base-joy/ui-unstyled';

// Read context in custom components
function MyCustomSlot() {
  const { size, loading } = useItemContext();
  // ... use size and loading state
}

// Provide context manually
<ItemContext.Provider value={{ size: 'lg', loading: false }}>
  <MyCustomSlot />
</ItemContext.Provider>`}
        </Sheet>
      </Section>
    </div>
  );
}
