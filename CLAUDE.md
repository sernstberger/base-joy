# CLAUDE.md

Project conventions and guidance for AI assistants.

## Project Purpose

**base-joy** is a design system that styles [Base UI](https://base-ui.com) components with Joy UI-inspired aesthetics. Base UI provides accessible, unstyled React components; this library adds the visual layer.

## Coding Style

- **No redundant comments**: Don't add comments stating the obvious. `const tableVariants` doesn't need a comment saying "Table variants".
- **Minimal JSDoc**: Only add JSDoc for public APIs that need usage examples or non-obvious behavior.
- **No over-commenting**: Code should be self-documenting through good naming.

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

**Focus Ring Behavior:**

Sheet's `interactive` prop automatically adds consistent focus rings using two modes:

1. **`focus:`** - For elements that receive focus directly (default)
   - Used by: Button, Toggle, Checkbox, Radio, Select, Textarea
   - Applies ring when the element itself is focused

2. **`focusWithin:`** - For containers with focusable children
   - Used by: Input, NumberField.Group, Combobox.Input, Autocomplete.Input
   - Applies ring when any child element is focused
   - Set both `interactive` and `focusWithin` props: `sheetVariants({ variant, color, interactive: true, focusWithin: true })`

Ring colors match the component's color palette:
- Solid variants: lighter shade (e.g., primary-300)
- Soft/outlined/plain: even lighter shade (e.g., primary-200)
- Includes `focus:outline-none` and `focus:ring-offset-2` for accessibility

**When to use `focusWithin`:**
Use `focusWithin: true` when the Sheet wraps a focusable child element (like an input) and you want the outer container to show the focus ring. This is common for form fields with decorators:

```tsx
// Input component - container with startDecorator, BaseInput, endDecorator
<Sheet interactive focusWithin variant={variant} color={color}>
  {startDecorator}
  <BaseInput />  {/* This receives focus, container shows ring */}
  {endDecorator}
</Sheet>

// Button component - the element itself receives focus
<BaseButton className={cn(sheetVariants({ variant, color, interactive: true }))}>
  Click me  {/* Button itself is focused */}
</BaseButton>
```

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
