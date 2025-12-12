# Generate Component: $ARGUMENTS

Create a new base-joy component following established patterns from Sheet and Item components.

## Component Name
Parse the component name from the arguments. It should be PascalCase (e.g., Button, Card, Alert).

## Files to Create

### 1. Component File
**Path:** `libs/ui/components/src/{ComponentName}/{ComponentName}.tsx`

Follow the pattern from `libs/ui/components/src/Sheet/Sheet.tsx`:

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

/**
 * {ComponentName} component - [Brief description]
 *
 * [Extended description of what this component does]
 */

const {componentName}Variants = cva(
  // Base styles
  'rounded-lg transition-colors',
  {
    variants: {
      variant: {
        solid: '',
        soft: '',
        outlined: 'border',
        plain: '',
      },
      color: {
        primary: '',
        neutral: '',
        success: '',
        warning: '',
        danger: '',
      },
      size: {
        sm: 'p-2 text-sm',
        md: 'p-4 text-base',
        lg: 'p-6 text-lg',
      },
    },
    compoundVariants: [
      // Solid variants
      { variant: 'solid', color: 'primary', className: 'bg-primary-500 text-white' },
      { variant: 'solid', color: 'neutral', className: 'bg-neutral-800 text-white' },
      { variant: 'solid', color: 'success', className: 'bg-success-500 text-white' },
      { variant: 'solid', color: 'warning', className: 'bg-warning-500 text-white' },
      { variant: 'solid', color: 'danger', className: 'bg-danger-500 text-white' },
      // Soft variants
      { variant: 'soft', color: 'primary', className: 'bg-primary-100 text-primary-900' },
      { variant: 'soft', color: 'neutral', className: 'bg-neutral-100 text-neutral-900' },
      { variant: 'soft', color: 'success', className: 'bg-success-100 text-success-900' },
      { variant: 'soft', color: 'warning', className: 'bg-warning-100 text-warning-900' },
      { variant: 'soft', color: 'danger', className: 'bg-danger-100 text-danger-900' },
      // Outlined variants
      { variant: 'outlined', color: 'primary', className: 'border-primary-500 text-primary-700 bg-transparent' },
      { variant: 'outlined', color: 'neutral', className: 'border-neutral-300 text-neutral-700 bg-transparent' },
      { variant: 'outlined', color: 'success', className: 'border-success-500 text-success-700 bg-transparent' },
      { variant: 'outlined', color: 'warning', className: 'border-warning-500 text-warning-700 bg-transparent' },
      { variant: 'outlined', color: 'danger', className: 'border-danger-500 text-danger-700 bg-transparent' },
      // Plain variants
      { variant: 'plain', color: 'primary', className: 'text-primary-700 bg-transparent' },
      { variant: 'plain', color: 'neutral', className: 'text-neutral-700 bg-transparent' },
      { variant: 'plain', color: 'success', className: 'text-success-700 bg-transparent' },
      { variant: 'plain', color: 'warning', className: 'text-warning-700 bg-transparent' },
      { variant: 'plain', color: 'danger', className: 'text-danger-700 bg-transparent' },
    ],
    defaultVariants: {
      variant: 'soft',
      color: 'neutral',
      size: 'md',
    },
  }
);

export interface {ComponentName}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof {componentName}Variants> {
  /** The visual style of the component. @default 'soft' */
  variant?: Variant;
  /** The color scheme of the component. @default 'neutral' */
  color?: ColorScale;
  /** The size of the component. @default 'md' */
  size?: Size;
  /** The element type to render as. @default 'div' */
  as?: React.ElementType;
}

export const {ComponentName} = React.forwardRef<HTMLDivElement, {ComponentName}Props>(
  ({ className, variant, color, size, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn({componentName}Variants({ variant, color, size }), className)}
        {...props}
      />
    );
  }
);

{ComponentName}.displayName = '{ComponentName}';

export { {componentName}Variants };
```

### 2. Barrel Export
**Path:** `libs/ui/components/src/{ComponentName}/index.ts`

```typescript
export { {ComponentName}, {componentName}Variants, type {ComponentName}Props } from './{ComponentName}';
```

### 3. Test File
**Path:** `libs/ui/components/src/{ComponentName}/{ComponentName}.test.tsx`

Use the `/testing` command to generate tests following Kent C. Dodds methodology with jest-axe.

### 4. Update Main Index
**Path:** `libs/ui/components/src/index.ts`

Add export:
```typescript
export { {ComponentName}, {componentName}Variants, type {ComponentName}Props } from './{ComponentName}';
```

### 5. Update Package Exports
**Path:** `libs/ui/components/package.json`

Add to exports:
```json
"./{ComponentName}": {
  "import": "./src/{ComponentName}/index.ts",
  "types": "./src/{ComponentName}/index.ts"
}
```

## Completion Checklist

After generating the component, verify:

- [ ] Component renders with all 4 variants (solid, soft, outlined, plain)
- [ ] Component renders with all 5 colors (primary, neutral, success, warning, danger)
- [ ] Component renders with all 3 sizes (sm, md, lg)
- [ ] Polymorphic `as` prop works
- [ ] Ref forwarding works
- [ ] className merging works via `cn()`
- [ ] TypeScript types are complete with JSDoc
- [ ] Tests pass with `yarn test`
- [ ] Add component-specific props if needed (e.g., disabled, loading)
- [ ] Add component-specific accessibility attributes
- [ ] Run `/doc-page {ComponentName}` to create documentation
- [ ] Add to docs app demo if not using doc-page skill
