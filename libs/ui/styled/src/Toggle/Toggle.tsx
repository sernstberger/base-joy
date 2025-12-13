import * as React from 'react';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { useColorContext, getSolidContainerStyles } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const toggleVariants = cva(
  'inline-flex items-center justify-center font-medium cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 py-1.5 text-sm gap-1.5',
        md: 'h-10 px-4 py-2 text-base gap-2',
        lg: 'h-12 px-6 py-3 text-lg gap-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

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
  /**
   * The size of the toggle button.
   * @default 'md'
   */
  size?: Size;
  className?: string;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, color, size: sizeProp, ...props }, ref) => {
    const groupContext = useToggleGroupContext();
    const colorContext = useColorContext();

    // Resolution order: explicit prop > ToggleGroupContext > ColorContext > default
    const resolvedVariant = variant ?? groupContext?.variant ?? 'outlined';
    const resolvedColor = color ?? groupContext?.color ?? colorContext?.color ?? 'primary';
    // Resolve size: explicit prop > ToggleGroupContext > SizeContext > default
    const resolvedSize = useResolvedSizeProps(sizeProp ?? groupContext?.size, 'md');

    // Check if we're inside a solid container (for styling purposes)
    const isInsideSolid = colorContext?.isInsideSolid ?? false;

    return (
      <BaseToggle
        ref={ref}
        className={cn(
          sheetVariants({ variant: resolvedVariant, color: resolvedColor, interactive: true }),
          toggleVariants({ size: resolvedSize }),
          pressedVariants({ variant: resolvedVariant, color: resolvedColor }),
          isInsideSolid && getSolidContainerStyles(resolvedVariant, true),
          className
        )}
        {...props}
      />
    );
  }
);

Toggle.displayName = 'Toggle';

export { toggleVariants };
