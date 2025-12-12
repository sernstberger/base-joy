# CLAUDE.md

Project conventions and guidance for AI assistants.

## Project Purpose

**base-joy** is a design system that styles [Base UI](https://base-ui.com) components with Joy UI-inspired aesthetics. Base UI provides accessible, unstyled React components; this library adds the visual layer.

## Coding Style

- **No redundant comments**: Don't add comments stating the obvious. `const tableVariants` doesn't need a comment saying "Table variants".
- **Minimal JSDoc**: Only add JSDoc for public APIs that need usage examples or non-obvious behavior.
- **No over-commenting**: Code should be self-documenting through good naming.
- **Use Typography for all text**: Always use the Typography component instead of custom text styling. This ensures consistency across the design system and makes it easier to maintain.

### Typography Usage

Use the Typography component for all text content instead of raw HTML elements or custom Tailwind classes:

```tsx
// ✅ Good - Use Typography component
<Typography level="h1">Page Title</Typography>
<Typography level="body-sm" className="mb-4">
  Description text with additional spacing
</Typography>
<Typography level="body-xs" className="text-neutral-600">
  Supplementary text
</Typography>

// ❌ Bad - Don't use raw elements with custom styling
<h1 className="text-4xl font-bold">Page Title</h1>
<p className="text-sm text-gray-600 mb-4">Description text</p>
<span className="text-xs text-gray-500">Supplementary text</span>
```

**Typography levels:**
- **Headings**: `h1`, `h2`, `h3`, `h4`
- **Body text**: `body-lg`, `body-md` (default), `body-sm`, `body-xs`

**Typography props:**
- `level`: Semantic and visual level
- `weight`: `normal`, `medium`, `semibold`, `bold`
- `className`: Additional Tailwind classes for spacing, colors, etc.

**When to use additional classes:**
- Spacing: `mb-4`, `mt-2`, etc.
- Color overrides: `text-neutral-600`, `text-danger-700`, etc. (when not using default color)
- Alignment: `text-center`, `text-right`, etc.

**Exception:** Inline code snippets should use `<code className="font-mono text-sm">` for proper monospace styling.

## Component Architecture

Components are built on two foundations:

1. **Base UI (`@base-ui/react`)**: Use Base UI components for accessibility and behavior. Import from `@base-ui/react` (e.g., `Input`, `Checkbox`, `Select`, `Dialog`).

2. **Sheet/sheetVariants**: Use `sheetVariants` CVA function for visual styling (colors, backgrounds, borders).

### Composition Pattern (from Base UI)

Use Base UI's **render prop pattern** for polymorphism instead of `as` props:

```tsx
// Base UI render prop - preferred for polymorphism
<Menu.Trigger render={<MyButton size="md" />}>
  Open menu
</Menu.Trigger>

// For custom elements
<Menu.Item render={<a href="/page" />}>
  Link Item
</Menu.Item>
```

See: https://base-ui.com/react/handbook/composition

### Pattern for interactive components (Button, Input, etc.)

```tsx
import { Button as BaseButton } from '@base-ui/react/button';
import { sheetVariants } from '../Sheet';

// Use Base UI for accessibility, sheetVariants for visual styling
<BaseButton
  className={cn(
    sheetVariants({ variant, color }),
    buttonVariants({ size })
  )}
>
  Click me
</BaseButton>
```

### Pattern for container components (Card, Panel, etc.)

```tsx
<Sheet variant="outlined" color="neutral">
  {children}
</Sheet>
```

### Sheet Usage Patterns

**When to use Sheet:**
- Components representing styled surfaces (containers, form fields, badges, buttons)
- Components needing variant (solid/soft/outlined/plain) and color props

**When NOT to use Sheet:**
- Layout components (Grid, Stack, Container, Field) - pure layout utilities
- Text/link components (Typography, Link, Divider) - specialized text styling
- Components with specialized styling (CodeBlock, Table, Switch, Slider)

**Pattern A: Sheet Component (preferred for simple wrappers)**

Use the Sheet component directly when creating styled containers or form fields:

```tsx
<Sheet
  variant={variant}
  color={color}
  interactive  // Adds focus ring for clickable/focusable elements
  className={cn('p-0', customSizeVariants({ size }), className)}
>
  {children}
</Sheet>
```

Examples: Card (when clickable), Badge, Input, Textarea

Key points:
- Always override Sheet's padding with `p-0` if using custom sizing
- Use the `as` prop for polymorphism: `<Sheet as="span">` or `<Sheet as="textarea">`
- Set `interactive={true}` for clickable/focusable elements to add focus rings
- Sheet provides variant/color styling automatically

**Pattern B: sheetVariants Classes (for complex state management)**

Import and use `sheetVariants` directly when combining with Base UI components or adding complex state styling:

```tsx
<BaseUIComponent
  className={cn(
    sheetVariants({ variant, color, interactive: true }),
    customVariants({ size }),
    hoverVariants({ variant, color }),
    className
  )}
/>
```

Examples: Button, Toggle, Item, Checkbox, Radio

Key points:
- Use when you need hover, pressed, selected, or other interactive states
- Combine with Base UI components that manage their own rendering
- Pass `interactive: true` to sheetVariants for automatic focus ring styling
- Override padding with `p-0` in your custom variants if needed

**Interactive Behavior (Focus, Hover, Active):**

Sheet's `interactive` prop automatically adds consistent interactive states:

**Focus rings** - Two modes:
1. **`focus:`** - For elements that receive focus directly (default)
   - Used by: Button, Toggle, Checkbox, Radio, Select, Textarea, Item
   - Applies ring when the element itself is focused

2. **`focusWithin:`** - For containers with focusable children
   - Used by: Input, NumberField.Group, Combobox.Input, Autocomplete.Input
   - Applies ring when any child element is focused
   - Set both `interactive` and `focusWithin` props: `sheetVariants({ variant, color, interactive: true, focusWithin: true })`

Ring colors match the component's color palette:
- Solid variants: lighter shade (e.g., primary-300)
- Soft/outlined/plain: even lighter shade (e.g., primary-200)
- Includes `focus:outline-none` and `focus:ring-offset-2` for accessibility

**Hover and active states:**
When `interactive: true`, Sheet automatically applies color-aware hover and active states:
- **Solid variants**: Darken on hover (e.g., primary-500 → hover:primary-600 → active:primary-700)
- **Soft variants**: Slightly darken (e.g., primary-100 → hover:primary-200 → active:primary-300)
- **Outlined/Plain variants**: Add subtle background (e.g., transparent → hover:primary-50 → active:primary-100)

This eliminates the need for separate `hoverVariants` in components. All interactive styling (focus, hover, active) is centralized in Sheet.

**When to use `focusWithin`:**
Use `focusWithin: true` when the Sheet wraps a focusable child element (like an input) and you want the outer container to show the focus ring. This is common for form fields with decorators:

```tsx
// Input component - container with startDecorator, BaseInput, endDecorator
<Sheet interactive focusWithin variant={variant} color={color}>
  {startDecorator}
  <BaseInput />  {/* This receives focus, container shows ring */}
  {endDecorator}
</Sheet>

// Button component - the element itself is focused/hovered/clicked
<BaseButton className={cn(sheetVariants({ variant, color, interactive: true }))}>
  Click me  {/* Gets focus ring, hover, and active states from Sheet */}
</BaseButton>

// Item component - gets all interactive states from Sheet
<div className={cn(sheetVariants({ variant, color, interactive }), ...)}>
  {children}  {/* Hover/active/focus all from Sheet's interactive prop */}
</div>
```

**Components with special interactive behavior:**
- **Toggle**: Keeps `pressedVariants` for `data-[pressed]` state (when toggled on, soft/outlined/plain become solid)
- **Item**: Keeps `selected` state variants (darker background when selected + interactive)

Reference implementations:
- Badge: `/Users/stevo/src/base-joy/libs/ui/styled/src/Badge/Badge.tsx:75`
- Item: `/Users/stevo/src/base-joy/libs/ui/styled/src/Item/Item.tsx:270-273`
- Button: `/Users/stevo/src/base-joy/libs/ui/styled/src/Button/Button.tsx:130`
- Textarea: `/Users/stevo/src/base-joy/libs/ui/styled/src/Textarea/Textarea.tsx:123`

- **CVA for variants**: Use class-variance-authority for component variants.
- **forwardRef**: All components use forwardRef.
- **Context for inheritance**: Use React Context to pass props (size, variant) to child components.

## Tech Stack

- React 19
- **@base-ui/react** - Accessible unstyled components (CORE DEPENDENCY)
- React Router v7 (import from `react-router`, not `react-router-dom`)
- Tailwind CSS v4
- class-variance-authority (CVA)
- Yarn workspaces monorepo

## Testing

**All tests must pass. No failing tests are acceptable.**

- Jest + Testing Library
- jest-axe for accessibility testing
- Tests live next to components: `Component.test.tsx`
- TypeScript strict mode is enabled

### Running Tests

```bash
yarn test          # Run all tests
yarn test:watch    # Run tests in watch mode
yarn test:coverage # Run tests with coverage
```

### Test Requirements

Every component must have tests covering:
- Basic rendering
- Variants, colors, and sizes
- States (disabled, error, etc.)
- Accessibility (using jest-axe)
- Ref forwarding
- className merging

### Accessibility Testing Patterns

Base UI components use ARIA roles instead of native HTML elements. Use proper accessible names:

```tsx
// Toggle fields (Checkbox, Radio, Switch) - use aria-label on Root
<Checkbox.Root aria-label="Accept terms">
  <Checkbox.Indicator />
</Checkbox.Root>

// Form fields - use aria-label on Input element
<NumberField.Root>
  <NumberField.Input aria-label="Quantity" />
</NumberField.Root>

// Native elements (Input, Textarea) - use label element
<label>
  Username
  <Input />
</label>
```

### Testing ARIA Elements

Base UI ARIA components use `aria-disabled` instead of the native `disabled` attribute:

```tsx
// Wrong - ARIA elements don't support toBeDisabled()
expect(screen.getByRole('checkbox')).toBeDisabled();

// Correct - check aria-disabled attribute
expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true');
```

### Async Testing

For components with popups/animations, wait for visibility:

```tsx
await user.click(screen.getByRole('combobox'));
await waitFor(() => {
  expect(screen.getByText('Option B')).toBeVisible();
});
await user.click(screen.getByText('Option B'));
```

## File Structure

```
libs/ui/unstyled/src/       # Unstyled primitives (Item, etc.)
  ComponentName/
    ComponentName.tsx
    ComponentName.test.tsx
    index.ts

libs/ui/styled/src/         # Styled components (Button, Sheet, etc.)
  ComponentName/
    ComponentName.tsx
    ComponentName.test.tsx
    index.ts
```

## Commands

- `yarn test` - Run all tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage
- `yarn docs:dev` - Run docs dev server
- `yarn docs:build` - Build docs (includes props generation)
- `yarn props:generate` - Generate component props JSON for docs

## Docs Props Generation

Component API documentation is auto-generated from TypeScript interfaces using `react-docgen-typescript`.

**How it works:**
1. `yarn props:generate` extracts props from `libs/ui/unstyled/src/` and `libs/ui/styled/src/`
2. Writes JSON files to `apps/docs/src/props/ComponentName.json`
3. Generates `apps/docs/src/props/index.ts` with exports

**Usage in doc pages:**
```tsx
import { PropsTable } from '../../components/PropsTable';
import { componentProps } from '../../props';

<PropsTable props={componentProps.Button} />
```

**When to regenerate:**
- After adding/changing component props
- `yarn docs:build` runs it automatically
- Run `yarn props:generate` manually during development

**Note:** Typography page uses manual props since it exports multiple components (Heading, Text) from one file.

## Documentation Page Patterns

Documentation pages follow consistent patterns for maintainability and user experience.

### Page Structure

All component documentation pages use this structure:

1. **ComponentHeader** - Title, description, optional Base UI link
2. **Playground Section** - Interactive component tester
3. **Examples Section** - Visual demonstrations (multiple subsections)
4. **API Reference Section** - PropsTable with component props

Example structure:
```tsx
export function ComponentPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="ComponentName"
        description="Brief description..."
        baseUiUrl="https://base-ui.com/react/components/..."
      />

      <Section title="Playground" id="playground">
        <Playground controls={controls} codeTemplate={codeTemplate}>
          {(props) => <Component {...props} />}
        </Playground>
      </Section>

      <Section title="Examples" id="examples">
        {/* Example subsections */}
      </Section>

      <Section title="API Reference" id="api">
        <PropsTable props={componentProps.ComponentName} />
      </Section>
    </div>
  );
}
```

### Using ComponentHeader

Import and use ComponentHeader for consistent page headers:

```tsx
import { ComponentHeader } from '../../components/ComponentHeader';

<ComponentHeader
  title="Button"
  description="A versatile button component with variants, colors, sizes, and loading states."
  baseUiUrl="https://base-ui.com/react/components/button"
/>
```

The `baseUiUrl` prop is optional. When provided, it displays a "Base UI" button that links to the Base UI documentation for that component.

### Section Organization

Use Section component for all major sections and subsections:

```tsx
<Section title="Examples" id="examples">
  <div className="space-y-8">
    <Section title="Variants" titleLevel="h3" id="variants">
      {/* content */}
    </Section>
    <Section title="Colors" titleLevel="h3" id="colors">
      {/* content */}
    </Section>
  </div>
</Section>
```

Key points:
- Main sections use default h2 level
- Subsections use `titleLevel="h3"`
- Add `id` attributes for TableOfContents navigation
- Use `space-y-8` for spacing between subsections

### Playground Pattern

Define controls and code template outside the component:

```tsx
const controls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const codeTemplate = (props: Record<string, string>) =>
  `<Component variant="${props.variant}" color="${props.color}" size="${props.size}">
  Content
</Component>`;
```

Then use in JSX:

```tsx
<Playground controls={controls} codeTemplate={codeTemplate}>
  {(props) => (
    <Component
      variant={props.variant as Variant}
      color={props.color as ColorScale}
      size={props.size as Size}
    >
      Demo content
    </Component>
  )}
</Playground>
```

### Example Organization

Organize examples from basic to advanced:

1. **Variants** - Show all variant options (solid/soft/outlined/plain)
2. **Colors** - Demonstrate color palette for each variant
3. **Sizes** - Display size options (sm/md/lg)
4. **States** - Show disabled, error, loading, etc.
5. **Advanced Usage** - Composition, polymorphism, edge cases

Use consistent container classes:
```tsx
<div className="space-y-8">  {/* outer wrapper for all examples */}
  <Section title="Variants" titleLevel="h3" id="variants">
    <div className="flex flex-wrap gap-4">  {/* component grid */}
      <Component variant="solid">Solid</Component>
      <Component variant="soft">Soft</Component>
    </div>
  </Section>
</div>
```

Common patterns:
- `flex flex-wrap gap-4` - Horizontal grid that wraps
- `space-y-3` or `space-y-4` - Vertical stack
- `items-start` - Align items to top for size comparisons

### API Reference

Use PropsTable with auto-generated props:

```tsx
import { PropsTable } from '../../components/PropsTable';
import { componentProps } from '../../props';

<Section title="API Reference" id="api">
  <PropsTable props={componentProps.ComponentName} />
</Section>
```

The PropsTable displays:
- **Prop** - Property name with asterisk (*) for required props
- **Type** - TypeScript type signature
- **Required** - Yes/No indicator
- **Default** - Default value or dash (-)
- **Description** - Property description or dash (-)

### Table of Contents (for longer pages)

Add right sidebar navigation for pages with 5+ sections:

```tsx
import { TableOfContents } from '../../components/TableOfContents';

// Define sections array outside component
const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function ComponentPage() {
  return (
    <div className="flex gap-8 max-w-7xl">
      <div className="flex-1 max-w-4xl">
        {/* page content with id attributes */}
      </div>
      <TableOfContents sections={sections} />
    </div>
  );
}
```

Key points:
- `level: 3` for h3 subsections (indented in TOC)
- Sections array matches `id` attributes in JSX
- TableOfContents is hidden on mobile/tablet (lg+ only)
- Active section highlighted based on scroll position

### Typography in Examples

Use Typography component for labels and descriptions within examples:

```tsx
<Section title="Interactive" titleLevel="h3" id="interactive">
  <Typography level="body-sm" className="mb-4">
    The <code className="font-mono text-sm">interactive</code> prop
    adds focus rings and hover states.
  </Typography>
  <div className="flex flex-wrap gap-4">
    {/* examples */}
  </div>
</Section>
```

- Use `body-sm` for descriptions
- Use `body-xs` for supplementary text
- Use `<code className="font-mono text-sm">` for inline code
- Add `mb-4` for spacing before examples

### Common Imports

Typical imports for a doc page:

```tsx
import { ComponentName, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';
```

Reference pages:
- **Simple page**: Button (`/apps/docs/src/pages/styled/Button.tsx`)
- **With TOC**: Sheet (`/apps/docs/src/pages/styled/Sheet.tsx`)
- **Custom styling example**: ToggleGroup (`/apps/docs/src/pages/styled/ToggleGroup.tsx`)
