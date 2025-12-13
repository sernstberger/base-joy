---
name: component-generator
description: Generate new styled components following base-joy patterns. Use when creating a new component, scaffolding a component, adding a new UI component, or building a component from scratch.
---

# Component Generator

Generate new styled components for the base-joy design system with correct patterns.

## File Structure

Create components in `libs/ui/styled/src/ComponentName/`:
```
ComponentName/
├── ComponentName.tsx       # Main implementation
├── ComponentName.test.tsx  # Comprehensive tests
└── index.ts               # Exports
```

## Component Template

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { useResolvedColorProps, getSolidContainerStyles } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

// Define size/custom variants with CVA
const componentVariants = cva(
  'base-tailwind-classes', // e.g., 'inline-flex items-center'
  {
    variants: {
      size: {
        sm: 'size-sm-classes',
        md: 'size-md-classes',
        lg: 'size-lg-classes',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface ComponentNameProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof componentVariants> {
  /**
   * The visual style of the component.
   * @default 'solid'
   */
  variant?: Variant;
  /**
   * The color scheme of the component.
   * @default 'primary'
   */
  color?: ColorScale;
  /**
   * The size of the component.
   * @default 'md'
   */
  size?: Size;
}

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  (
    {
      className,
      // CRITICAL: Do NOT use destructuring defaults (e.g., variant = 'solid')
      // This breaks ColorContext inheritance - hooks need undefined to detect "not explicitly set"
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      children,
      ...props
    },
    ref
  ) => {
    // Resolve color and variant from context (inherits from parent Sheet)
    const { color, variant, isInsideSolid } = useResolvedColorProps(
      colorProp,
      variantProp,
      'primary', // defaultColor
      'solid'    // defaultVariant
    );

    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          sheetVariants({ variant, color, interactive: true }),
          componentVariants({ size }),
          isInsideSolid && getSolidContainerStyles(variant, true),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';

export { componentVariants };
```

## Critical Patterns

### 1. ColorContext Props (NEVER destructure defaults)

```tsx
// WRONG - Breaks context inheritance
const Component = ({ variant = 'solid', color = 'primary' }) => { ... }

// CORRECT - Allows context inheritance
const Component = ({ variant: variantProp, color: colorProp }) => {
  const { color, variant } = useResolvedColorProps(colorProp, variantProp, 'primary', 'solid');
  ...
}
```

### 2. JSDoc @default Tags (Required for props generation)

```tsx
export interface ComponentProps {
  /**
   * Description of the prop.
   * @default 'solid'
   */
  variant?: Variant;
}
```

### 3. Interactive States

Use `interactive: true` in sheetVariants for clickable/focusable elements:
```tsx
sheetVariants({ variant, color, interactive: true })
```

For containers with focusable children (like Input), add `focusWithin: true`:
```tsx
sheetVariants({ variant, color, interactive: true, focusWithin: true })
```

### 4. Solid Container Styles

When inside a solid Sheet, apply special hover/focus styles:
```tsx
isInsideSolid && getSolidContainerStyles(variant, true)
```

## Index File

```tsx
export { ComponentName, type ComponentNameProps, componentVariants } from './ComponentName';
```

## Add to Main Exports

Add to `libs/ui/styled/src/index.ts`:
```tsx
export * from './ComponentName';
```

## Reference Implementations

Read these files for patterns:
- `libs/ui/styled/src/Button/Button.tsx` - Base UI integration, decorators, loading state
- `libs/ui/styled/src/Badge/Badge.tsx` - Simple Sheet wrapper component
- `libs/ui/styled/src/Input/Input.tsx` - Form field with focusWithin pattern

## When Using Base UI Components

```tsx
import { Component as BaseComponent } from '@base-ui/react/component';

// Use Base UI's render prop pattern for polymorphism
<BaseComponent
  render={render}
  className={cn(sheetVariants({ variant, color, interactive: true }), className)}
  {...props}
>
  {children}
</BaseComponent>
```

## Checklist

- [ ] File structure: `ComponentName/ComponentName.tsx`, `index.ts`
- [ ] forwardRef with proper generic types
- [ ] Props interface with JSDoc @default tags
- [ ] ColorContext: `variantProp`/`colorProp` naming (NO destructuring defaults)
- [ ] `useResolvedColorProps` hook
- [ ] `useResolvedSizeProps` hook
- [ ] `sheetVariants` for visual styling
- [ ] CVA for size/custom variants
- [ ] `getSolidContainerStyles` for solid container support
- [ ] displayName set
- [ ] Exported from index.ts
- [ ] Added to main index.ts exports
