---
name: consistency-checker
description: Check components for pattern consistency and violations. Use when reviewing code, auditing components, checking for pattern violations, or validating component implementations.
allowed-tools: Read, Grep, Glob
---

# Consistency Checker

Validates that components follow base-joy patterns correctly.

## Critical Pattern Checks

### 1. ColorContext Props (CRITICAL)

**Check for destructuring defaults on variant/color:**

```tsx
// VIOLATION - breaks ColorContext inheritance
({ variant = 'solid', color = 'primary' }) => ...

// CORRECT
({ variant: variantProp, color: colorProp }) => {
  const { color, variant } = useResolvedColorProps(colorProp, variantProp, ...);
}
```

**How to check:**
```bash
# Find potential violations - destructuring with defaults
grep -n "variant\s*=\s*['\"]" libs/ui/styled/src/**/*.tsx
grep -n "color\s*=\s*['\"]" libs/ui/styled/src/**/*.tsx
```

### 2. JSDoc @default Tags

**Every variant/color/size prop needs @default for props generation:**

```tsx
// REQUIRED
/**
 * @default 'solid'
 */
variant?: Variant;
```

**How to check:**
- Read the props interface
- Verify each optional prop with a default has `@default` JSDoc tag

### 3. forwardRef Usage

**All components must use forwardRef:**

```tsx
// CORRECT
export const Component = React.forwardRef<HTMLElement, Props>((props, ref) => ...);
Component.displayName = 'Component';
```

**Check:**
- Component uses `React.forwardRef`
- `displayName` is set

### 4. Export Pattern

**index.ts must export component, props type, and variants:**

```tsx
export { Component, type ComponentProps, componentVariants } from './Component';
```

**main index.ts must include the export:**

```tsx
export { Component, componentVariants, type ComponentProps } from './Component';
```

### 5. Test Coverage

**Required test categories:**
- `describe('rendering')`
- `describe('variants')` with it.each
- `describe('colors')` with it.each
- `describe('sizes')` with it.each
- `describe('ref forwarding')`
- `describe('className merging')`
- `describe('accessibility')` with axe
- `describe('ColorContext integration')`

### 6. Typography Usage

**No raw text elements with custom styling:**

```tsx
// VIOLATION
<h1 className="text-2xl font-bold">Title</h1>
<p className="text-sm text-gray-600">Text</p>

// CORRECT
<Typography level="h1">Title</Typography>
<Typography level="body-sm">Text</Typography>
```

### 7. Sheet vs sheetVariants

**Pattern A (Sheet component) for simple wrappers:**
```tsx
<Sheet variant={variant} color={color} interactive>
  {children}
</Sheet>
```

**Pattern B (sheetVariants) for Base UI integration:**
```tsx
<BaseComponent className={cn(sheetVariants({ variant, color, interactive: true }), ...)} />
```

## Audit Checklist

Run through for each component:

- [ ] No destructuring defaults on variant/color props
- [ ] Uses `useResolvedColorProps` hook
- [ ] Uses `useResolvedSizeProps` hook (if has size)
- [ ] Props interface has `@default` JSDoc tags
- [ ] Uses `forwardRef` with correct element type
- [ ] Has `displayName` set
- [ ] Exported from component's index.ts
- [ ] Exported from main index.ts
- [ ] Test file exists with all required categories
- [ ] Tests pass (`yarn test ComponentName`)
- [ ] No Typography violations in component or docs
- [ ] Props JSON generated (`yarn props:generate`)

## Quick Validation Commands

```bash
# Check all styled components for ColorContext pattern violations
grep -rn "variant\s*=\s*['\"]solid" libs/ui/styled/src/
grep -rn "color\s*=\s*['\"]primary" libs/ui/styled/src/

# Find components without displayName
grep -L "displayName" libs/ui/styled/src/**/*.tsx

# Find components without forwardRef
grep -L "forwardRef" libs/ui/styled/src/**/*.tsx

# Check for raw typography violations in docs
grep -rn "<h[1-6]" apps/docs/src/pages/
grep -rn "<p className" apps/docs/src/pages/

# Run all tests
yarn test

# Generate props
yarn props:generate
```

## Common Issues

### Issue: ColorContext not working
**Cause:** Destructuring default on variant or color prop
**Fix:** Use `variantProp`/`colorProp` naming without defaults

### Issue: Props not showing in docs
**Cause:** Missing `@default` JSDoc tag
**Fix:** Add `/** @default 'value' */` above prop

### Issue: Ref not working
**Cause:** Missing forwardRef or wrong element type
**Fix:** Add `React.forwardRef<ElementType, Props>`

### Issue: Tests failing on axe
**Cause:** Missing accessible name
**Fix:** Add aria-label or associated label element
