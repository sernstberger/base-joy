# Generate Documentation Page: $ARGUMENTS

Create an interactive documentation page for a base-joy component, following MUI Joy UI patterns.

## Component Name
Parse the component name from the arguments. It should be PascalCase (e.g., Sheet, Button, Card).

## Prerequisites
- The component must already exist in `libs/ui/core/src/{ComponentName}/`
- The Playground components must exist in `apps/docs/src/components/Playground/`

## Implementation

### 1. Add Playground Configuration to App.tsx

Add above the App function in `apps/docs/src/App.tsx`:

```tsx
import type { Variant, ColorScale, Size } from '@base-joy/tokens';
import { Playground, type PlaygroundControl } from './components/Playground';
import { {ComponentName} } from '@base-joy/ui-core';

// {ComponentName} Playground Configuration
const {componentName}Controls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const {componentName}CodeTemplate = (props: Record<string, string>) =>
  `<{ComponentName} variant="${props.variant}" color="${props.color}" size="${props.size}">\n  Content\n</{ComponentName}>`;
```

### 2. Add Component Section to App.tsx

Add a new section in the `<main>` element:

```tsx
{/* {ComponentName} Component Demo */}
<section>
  <h2 className="text-2xl font-semibold mb-4">{ComponentName} Component</h2>
  <p className="text-neutral-600 mb-6">
    [Component description]
  </p>

  {/* Interactive Playground */}
  <div className="mb-8">
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
  </div>

  {/* Usage Examples */}
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
```

## Playground Features

The Playground component provides:

1. **Live Preview** (left side)
   - Centered component display
   - Updates in real-time as controls change

2. **Control Panel** (right side)
   - **Variant Chips**: solid, soft, outlined, plain
   - **Color Circles**: primary (blue), neutral (gray), success (green), warning (orange), danger (red)
   - **Size Chips**: sm, md, lg

3. **Code Block** (bottom)
   - Generated JSX code
   - Copy button with "Copied!" feedback

## Customizing Playground Controls

For components with additional props, extend the controls:

```tsx
const buttonControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'solid' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  // Add custom controls for component-specific props
];
```

## Checklist

- [ ] Import the component in App.tsx
- [ ] Add playground configuration (controls + code template)
- [ ] Add interactive playground section
- [ ] Add usage examples showing variants, colors, sizes
- [ ] Add component-specific examples if applicable
- [ ] Verify playground controls work correctly
- [ ] Verify code copy functionality works
- [ ] Build docs app: `yarn docs:build`
