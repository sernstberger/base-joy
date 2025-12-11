---
name: Component Request
about: Request a new component for base-joy
title: "Component: "
labels: enhancement
assignees: ''
---

## Component Name
<!-- e.g., DatePicker, DataGrid, Carousel -->

## Category
- [ ] Foundation (Sheet, Item)
- [ ] Inputs (Button, Input, Select, etc.)
- [ ] Data Display (Card, Avatar, Badge, etc.)
- [ ] Feedback (Alert, Toast, Progress, etc.)
- [ ] Navigation (Link, Menu, Breadcrumbs, etc.)
- [ ] Layout (Container, Stack, Grid, etc.)
- [ ] Complex (DataGrid, DatePicker, Carousel)
- [ ] Pattern (composed patterns)

## Priority
- [ ] P0 - Critical (blocks current demo)
- [ ] P1 - High (needed for next demo)
- [ ] P2 - Medium (nice to have)
- [ ] P3 - Low (future consideration)

## Related Demo(s)
Which demo app(s) need this component?
- [ ] Blog
- [ ] Airbnb
- [ ] Netflix
- [ ] YouTube
- [ ] Amazon
- [ ] Other: _______

## Description
What does this component do? What problem does it solve?

## Base UI Mapping
Which Base UI component(s) does this wrap (if any)?
- [ ] None (custom component)
- [ ] Base UI: _______

## Reference Implementations
Links to similar components in other libraries:
- Joy UI:
- shadcn/ui:
- Material UI:

## API Design (rough)
```tsx
<ComponentName
  variant="solid" | "soft" | "outlined" | "plain"
  color="primary" | "neutral" | "success" | "warning" | "danger"
  size="sm" | "md" | "lg"
  // component-specific props
/>
```

## Acceptance Criteria
- [ ] Component follows Sheet/Item patterns
- [ ] CVA variants implemented
- [ ] TypeScript types complete
- [ ] ~100% test coverage
- [ ] Accessible (WAI-ARIA compliant)
- [ ] Documented in docs app
- [ ] Used in at least one demo
