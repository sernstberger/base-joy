# Generate Documentation Page: $ARGUMENTS

Create an individual documentation page for a base-joy component, following MUI Joy UI patterns.

## Component Name
Parse the component name from the arguments. It should be PascalCase (e.g., Sheet, Button, Card).

## Prerequisites
- The component must already exist in `libs/ui/styled/src/{ComponentName}/` (or `libs/ui/unstyled/src/{ComponentName}/` for primitives)
- The Playground components must exist in `apps/docs/src/components/Playground/`
- React Router must be set up in the docs app

## Implementation

### 1. Create the Page File

Create `apps/docs/src/pages/styled/{ComponentName}.tsx`:

```tsx
import { {ComponentName} } from '@base-joy/ui-styled';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const {componentName}Controls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const {componentName}CodeTemplate = (props: Record<string, string>) =>
  `<{ComponentName} variant="${props.variant}" color="${props.color}" size="${props.size}">\n  Content\n</{ComponentName}>`;

// Extract these props from the component's TypeScript interface
const {componentName}Props: PropMeta[] = [
  {
    name: 'variant',
    type: '"solid" | "soft" | "outlined" | "plain"',
    defaultValue: '"soft"',
    description: 'The visual variant of the component.',
    required: false,
  },
  {
    name: 'color',
    type: '"primary" | "neutral" | "success" | "warning" | "danger"',
    defaultValue: '"neutral"',
    description: 'The color scheme of the component.',
    required: false,
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: 'The size variant affecting padding and text size.',
    required: false,
  },
  {
    name: 'as',
    type: 'React.ElementType',
    defaultValue: '"div"',
    description: 'The component used for the root node.',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content of the component.',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

export function {ComponentName}Page() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">{ComponentName}</h1>
        <p className="text-lg text-neutral-600">
          [Component description from JSDoc]
        </p>
      </header>

      {/* Interactive Playground */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Playground</h2>
        <Playground controls={{componentName}Controls} codeTemplate={{componentName}CodeTemplate}>
          {(props) => (
            <{ComponentName}
              variant={props.variant as Variant}
              color={props.color as ColorScale}
              size={props.size as Size}
              className="min-w-50"
            >
              <p className="font-medium">{ComponentName}</p>
            </{ComponentName}>
          )}
        </Playground>
      </section>

      {/* Examples */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Examples</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <{ComponentName} variant="solid" color="primary">Solid</{ComponentName}>
              <{ComponentName} variant="soft" color="primary">Soft</{ComponentName}>
              <{ComponentName} variant="outlined" color="primary">Outlined</{ComponentName}>
              <{ComponentName} variant="plain" color="primary">Plain</{ComponentName}>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Colors</h3>
            <div className="flex flex-wrap gap-4">
              <{ComponentName} variant="soft" color="primary">Primary</{ComponentName}>
              <{ComponentName} variant="soft" color="neutral">Neutral</{ComponentName}>
              <{ComponentName} variant="soft" color="success">Success</{ComponentName}>
              <{ComponentName} variant="soft" color="warning">Warning</{ComponentName}>
              <{ComponentName} variant="soft" color="danger">Danger</{ComponentName}>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Sizes</h3>
            <div className="flex flex-wrap items-start gap-4">
              <{ComponentName} variant="outlined" color="neutral" size="sm">Small (sm)</{ComponentName}>
              <{ComponentName} variant="outlined" color="neutral" size="md">Medium (md)</{ComponentName}>
              <{ComponentName} variant="outlined" color="neutral" size="lg">Large (lg)</{ComponentName}>
            </div>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
        <PropsTable props={{componentName}Props} />
      </section>
    </div>
  );
}
```

### 2. Add Route to routes.tsx

Add import and route to `apps/docs/src/routes.tsx`:

```tsx
import { {ComponentName}Page } from './pages/styled/{ComponentName}';

// Add to children array:
{
  path: 'styled/{componentName}',
  element: <{ComponentName}Page />,
},
```

### 3. Add Navigation Entry to Sidenav

Update `apps/docs/src/components/Sidenav/Sidenav.tsx`:

Find the appropriate section in the `navigation` array and add:

```tsx
{ label: '{ComponentName}', path: '/styled/{componentName}' },
```

## Page Structure

Each component page includes:

1. **Header** - Component name and description (from JSDoc)
2. **Playground** - Interactive demo with controls
   - **Live Preview**: Centered component display
   - **Control Panel**: Variant chips, color circles, size chips
   - **Code Block**: Generated JSX with copy button
3. **Examples** - Static examples showing variants, colors, sizes
4. **API Reference** - PropsTable with all component props

## PropsTable Data

Extract prop information from the component's TypeScript interface:
- `name`: The prop name
- `type`: TypeScript type as a string
- `defaultValue`: Default value if any
- `description`: From JSDoc comment
- `required`: Whether the prop is required

## Customizing for Complex Components

For components with additional props or subcomponents:

1. Add extra controls to the playground
2. Add component-specific examples
3. Add multiple PropsTable sections for subcomponents (e.g., ItemStart, ItemContent, ItemEnd)

## Checklist

- [ ] Create page file in `apps/docs/src/pages/styled/`
- [ ] Add route to `apps/docs/src/routes.tsx`
- [ ] Add navigation entry to Sidenav
- [ ] Configure playground controls
- [ ] Add usage examples (variants, colors, sizes)
- [ ] Define props metadata for PropsTable
- [ ] Add component-specific examples if applicable
- [ ] Verify playground controls work correctly
- [ ] Build docs app: `yarn docs:build`
