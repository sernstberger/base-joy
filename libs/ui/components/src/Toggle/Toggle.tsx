import * as React from 'react';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const toggleVariants = cva(
  'inline-flex items-center justify-center font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 py-1.5 text-sm gap-1.5',
        md: 'h-10 px-4 py-2 text-base gap-2',
        lg: 'h-12 px-6 py-3 text-lg gap-2.5',
      },
      color: {
        primary: 'focus-visible:ring-primary-500',
        neutral: 'focus-visible:ring-neutral-500',
        success: 'focus-visible:ring-success-500',
        warning: 'focus-visible:ring-warning-500',
        danger: 'focus-visible:ring-danger-500',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
);

const hoverVariants = cva('', {
  variants: {
    variant: {
      solid: '',
      soft: '',
      outlined: '',
      plain: '',
    },
    color: {
      primary: '',
      neutral: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    { variant: 'solid', color: 'primary', className: 'hover:bg-primary-600' },
    { variant: 'solid', color: 'neutral', className: 'hover:bg-neutral-900' },
    { variant: 'solid', color: 'success', className: 'hover:bg-success-600' },
    { variant: 'solid', color: 'warning', className: 'hover:bg-warning-600' },
    { variant: 'solid', color: 'danger', className: 'hover:bg-danger-600' },
    { variant: 'soft', color: 'primary', className: 'hover:bg-primary-200' },
    { variant: 'soft', color: 'neutral', className: 'hover:bg-neutral-200' },
    { variant: 'soft', color: 'success', className: 'hover:bg-success-200' },
    { variant: 'soft', color: 'warning', className: 'hover:bg-warning-200' },
    { variant: 'soft', color: 'danger', className: 'hover:bg-danger-200' },
    { variant: 'outlined', color: 'primary', className: 'hover:bg-primary-50' },
    { variant: 'outlined', color: 'neutral', className: 'hover:bg-neutral-50' },
    { variant: 'outlined', color: 'success', className: 'hover:bg-success-50' },
    { variant: 'outlined', color: 'warning', className: 'hover:bg-warning-50' },
    { variant: 'outlined', color: 'danger', className: 'hover:bg-danger-50' },
    { variant: 'plain', color: 'primary', className: 'hover:bg-primary-50' },
    { variant: 'plain', color: 'neutral', className: 'hover:bg-neutral-100' },
    { variant: 'plain', color: 'success', className: 'hover:bg-success-50' },
    { variant: 'plain', color: 'warning', className: 'hover:bg-warning-50' },
    { variant: 'plain', color: 'danger', className: 'hover:bg-danger-50' },
  ],
});

const pressedVariants = cva('', {
  variants: {
    variant: {
      solid: '',
      soft: '',
      outlined: '',
      plain: '',
    },
    color: {
      primary: '',
      neutral: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    // When pressed, outlined/soft/plain become solid
    { variant: 'outlined', color: 'primary', className: 'data-[pressed]:bg-primary-500 data-[pressed]:text-white data-[pressed]:border-primary-500' },
    { variant: 'outlined', color: 'neutral', className: 'data-[pressed]:bg-neutral-800 data-[pressed]:text-white data-[pressed]:border-neutral-800' },
    { variant: 'outlined', color: 'success', className: 'data-[pressed]:bg-success-500 data-[pressed]:text-white data-[pressed]:border-success-500' },
    { variant: 'outlined', color: 'warning', className: 'data-[pressed]:bg-warning-500 data-[pressed]:text-white data-[pressed]:border-warning-500' },
    { variant: 'outlined', color: 'danger', className: 'data-[pressed]:bg-danger-500 data-[pressed]:text-white data-[pressed]:border-danger-500' },
    { variant: 'soft', color: 'primary', className: 'data-[pressed]:bg-primary-500 data-[pressed]:text-white' },
    { variant: 'soft', color: 'neutral', className: 'data-[pressed]:bg-neutral-800 data-[pressed]:text-white' },
    { variant: 'soft', color: 'success', className: 'data-[pressed]:bg-success-500 data-[pressed]:text-white' },
    { variant: 'soft', color: 'warning', className: 'data-[pressed]:bg-warning-500 data-[pressed]:text-white' },
    { variant: 'soft', color: 'danger', className: 'data-[pressed]:bg-danger-500 data-[pressed]:text-white' },
    { variant: 'plain', color: 'primary', className: 'data-[pressed]:bg-primary-500 data-[pressed]:text-white' },
    { variant: 'plain', color: 'neutral', className: 'data-[pressed]:bg-neutral-800 data-[pressed]:text-white' },
    { variant: 'plain', color: 'success', className: 'data-[pressed]:bg-success-500 data-[pressed]:text-white' },
    { variant: 'plain', color: 'warning', className: 'data-[pressed]:bg-warning-500 data-[pressed]:text-white' },
    { variant: 'plain', color: 'danger', className: 'data-[pressed]:bg-danger-500 data-[pressed]:text-white' },
    // Solid variants get darker when pressed
    { variant: 'solid', color: 'primary', className: 'data-[pressed]:bg-primary-600' },
    { variant: 'solid', color: 'neutral', className: 'data-[pressed]:bg-neutral-900' },
    { variant: 'solid', color: 'success', className: 'data-[pressed]:bg-success-600' },
    { variant: 'solid', color: 'warning', className: 'data-[pressed]:bg-warning-600' },
    { variant: 'solid', color: 'danger', className: 'data-[pressed]:bg-danger-600' },
  ],
});

export interface ToggleGroupContextValue {
  variant: Variant;
  color: ColorScale;
  size: Size;
}

export const ToggleGroupContext =
  React.createContext<ToggleGroupContextValue | null>(null);

export const useToggleGroupContext = () => React.useContext(ToggleGroupContext);

export interface ToggleProps
  extends Omit<React.ComponentProps<typeof BaseToggle>, 'className'> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  className?: string;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, color, size, ...props }, ref) => {
    const groupContext = useToggleGroupContext();

    const resolvedVariant = variant ?? groupContext?.variant ?? 'outlined';
    const resolvedColor = color ?? groupContext?.color ?? 'primary';
    const resolvedSize = size ?? groupContext?.size ?? 'md';

    return (
      <BaseToggle
        ref={ref}
        className={cn(
          sheetVariants({ variant: resolvedVariant, color: resolvedColor }),
          toggleVariants({ size: resolvedSize, color: resolvedColor }),
          hoverVariants({ variant: resolvedVariant, color: resolvedColor }),
          pressedVariants({ variant: resolvedVariant, color: resolvedColor }),
          className
        )}
        {...props}
      />
    );
  }
);

Toggle.displayName = 'Toggle';

export { toggleVariants };
