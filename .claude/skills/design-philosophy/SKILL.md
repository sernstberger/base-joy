---
name: design-philosophy
description: Design system philosophy combining Joy UI aesthetics with Base UI accessibility. Use when making design decisions, choosing component patterns, discussing visual hierarchy, or ensuring consistency with the design system.
allowed-tools: Read, Grep, Glob
---

# Design Philosophy: Joy UI + Base UI

base-joy combines **Joy UI's visual aesthetic** with **Base UI's accessible, unstyled foundation**.

## Core Principles

### 1. Accessibility First (from Base UI)
- Every component is built on Base UI's accessible primitives
- ARIA patterns are handled by Base UI, not reinvented
- Keyboard navigation, focus management, and screen reader support are inherited
- Test with vitest-axe to ensure no violations

### 2. Developer Flexibility (from Joy UI)
- CSS variables enable runtime theming without rebuilding
- Tailwind classes provide escape hatches for one-off customization
- Components accept className for complete override capability
- No locked-in styling decisions

### 3. Composition Over Configuration (from Base UI)
- Components are built from composable parts, not monolithic blocks
- Use Base UI's render prop pattern for polymorphism
- Compound components (Dialog.Root, Dialog.Trigger, etc.) over prop drilling

## The Four Variants

Joy UI's global variant system provides consistent visual hierarchy:

| Variant | Use Case | Visual Weight |
|---------|----------|---------------|
| **solid** | Primary actions, high emphasis | Highest - filled background |
| **soft** | Secondary actions, selections | Medium - muted background |
| **outlined** | Tertiary actions, form fields | Medium - border only |
| **plain** | Minimal emphasis, text buttons | Lowest - text only |

### Variant Philosophy
- Variants communicate **importance hierarchy**, not just aesthetics
- All variants work across all colors (primary, neutral, success, warning, danger)
- Hover/active states darken or intensify the base style
- Inside solid containers, child components auto-invert to maintain contrast

## The Five Colors

| Color | Semantic Meaning |
|-------|------------------|
| **primary** | Brand actions, main CTAs |
| **neutral** | Default, non-semantic UI |
| **success** | Positive outcomes, confirmations |
| **warning** | Caution, attention needed |
| **danger** | Destructive actions, errors |

### Color Philosophy
- Colors convey **meaning**, not decoration
- Use neutral for most UI; reserve semantic colors for specific purposes
- ColorContext enables automatic inheritance from parent containers
- Never hardcode colors - always use the color prop system

## Size Scale

| Size | Use Case |
|------|----------|
| **sm** | Dense UIs, secondary controls |
| **md** | Default, most contexts |
| **lg** | Touch targets, emphasis |

### Size Philosophy
- Consistent sizing across all components (8px base unit)
- SizeContext enables automatic inheritance
- Touch targets meet accessibility minimums (44px)

## Component Architecture Pattern

```tsx
// 1. Base UI provides behavior + accessibility
import { Button as BaseButton } from '@base-ui/react/button';

// 2. Sheet/sheetVariants provides Joy-style visuals
import { sheetVariants } from '../Sheet';

// 3. CVA handles size/custom variants
const buttonVariants = cva('...', { variants: { size: {...} } });

// 4. ColorContext enables intelligent inheritance
const { color, variant } = useResolvedColorProps(colorProp, variantProp, ...);
```

## Interactive States

### Focus Rings
- Visible focus indicators for keyboard navigation
- Color-matched to component's color palette
- 2px offset ring for clear visibility

### Hover & Active
- **Solid**: Darkens (500 → 600 → 700)
- **Soft**: Slightly intensifies (100 → 200 → 300)
- **Outlined/Plain**: Adds subtle background (transparent → 50 → 100)

### Disabled
- 50% opacity
- No pointer events
- Maintains visual structure

## Context Inheritance

### ColorContext
- Children inherit color from parent Sheet
- Solid containers trigger variant inversion (solid → plain)
- Explicit props always override inheritance

### SizeContext
- Children inherit size from parent
- Consistent sizing in compound components
- Explicit props always override inheritance

## When to Use What

### Use Sheet directly when:
- Creating styled containers or surfaces
- Building simple wrapper components (Badge, Card)
- Need variant/color with minimal customization

### Use sheetVariants when:
- Combining with Base UI components
- Need fine-grained control over interactive states
- Building complex components with multiple states

### Use Base UI directly when:
- Behavior matters more than appearance
- Building highly custom UI patterns
- Need full control over markup

## Typography Hierarchy

Always use the Typography component:
- `h1-h4`: Headings with semantic meaning
- `body-lg/md/sm/xs`: Body text at different sizes
- Never use raw HTML elements with custom text styles

## Design Decisions Reference

When uncertain about design choices, ask:
1. Does this follow Joy UI's variant system?
2. Is the color semantically appropriate?
3. Does the visual weight match the importance?
4. Is accessibility maintained?
5. Does it compose well with other components?

## Detailed References

For deeper dives into specific topics:

- [JOY_UI.md](JOY_UI.md) - Complete Joy UI design system reference (variants, colors, typography, spacing)
- [BASE_UI.md](BASE_UI.md) - Base UI patterns and accessibility (render props, composition, ARIA, state)

## External Resources

- Joy UI: https://mui.com/joy-ui/getting-started/
- Base UI: https://base-ui.com
- CLAUDE.md: Project-specific conventions
