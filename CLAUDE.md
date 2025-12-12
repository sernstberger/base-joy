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

- Jest + Testing Library
- jest-axe for accessibility
- Tests live next to components: `Component.test.tsx`

## File Structure

```
libs/ui/core/src/
  ComponentName/
    ComponentName.tsx
    ComponentName.test.tsx
    index.ts
```

## Commands

- `yarn build` - Build all packages
- `yarn test` - Run tests (or `yarn jest`)
- `yarn docs:dev` - Run docs dev server
- `yarn docs:build` - Build docs
