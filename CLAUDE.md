# CLAUDE.md

Project conventions and guidance for AI assistants.

## Coding Style

- **No redundant comments**: Don't add comments stating the obvious. `const tableVariants` doesn't need a comment saying "Table variants".
- **Minimal JSDoc**: Only add JSDoc for public APIs that need usage examples or non-obvious behavior.
- **No over-commenting**: Code should be self-documenting through good naming.

## Component Architecture

- **Sheet as base**: Components should use Sheet as the foundational surface component for container styling (borders, backgrounds, colors). Components focus on their specific behavior, not surface styling.
- **Pattern**: Wrap components in `<Sheet variant="outlined" color="neutral">` for container styling.
- **CVA for variants**: Use class-variance-authority for component variants.
- **forwardRef**: All components use forwardRef.
- **Context for inheritance**: Use React Context to pass props (size, variant) to child components.

## Tech Stack

- React 19
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
