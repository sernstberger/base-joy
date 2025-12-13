import * as React from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size, ColorScale } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const switchRootVariants = cva(
  'relative inline-flex items-center shrink-0 cursor-pointer rounded-full transition-colors bg-neutral-300',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
);

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-white shadow-sm transition-transform',
  {
    variants: {
      size: {
        // Track w-9 (36px), thumb w-4 (16px): 2px margin each side → left=2px, right=36-16-2=18px
        sm: 'h-4 w-4 translate-x-0.5 data-[checked]:translate-x-[18px]',
        // Track w-11 (44px), thumb w-5 (20px): 2px margin each side → left=2px, right=44-20-2=22px
        md: 'h-5 w-5 translate-x-0.5 data-[checked]:translate-x-[22px]',
        // Track w-14 (56px), thumb w-6 (24px): 2px margin each side → left=2px, right=56-24-2=30px
        lg: 'h-6 w-6 translate-x-0.5 data-[checked]:translate-x-[30px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SwitchProps
  extends Omit<React.ComponentProps<typeof BaseSwitch.Root>, 'className'> {
  /**
   * The color scheme of the switch.
   * @default 'primary'
   */
  color?: ColorScale;
  /**
   * The size of the switch.
   * @default 'md'
   */
  size?: Size;
  /**
   * Additional CSS classes for the root element.
   */
  className?: string;
  /**
   * Accessible label for the switch.
   */
  'aria-label'?: string;
  /**
   * ID of the element that labels this switch.
   */
  'aria-labelledby'?: string;
}

export const Switch = React.forwardRef<HTMLElement, SwitchProps>(
  (
    {
      className,
      color: colorProp,
      size: sizeProp,
      disabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const { color } = useResolvedColorProps(colorProp, undefined, 'primary', 'solid');
    const size = useResolvedSizeProps(sizeProp, 'md');

    const colorClass =
      color === 'primary'
        ? 'data-[checked]:bg-primary-500'
        : color === 'success'
          ? 'data-[checked]:bg-success-500'
          : color === 'warning'
            ? 'data-[checked]:bg-warning-500'
            : color === 'danger'
              ? 'data-[checked]:bg-danger-500'
              : 'data-[checked]:bg-neutral-500';

    return (
      <BaseSwitch.Root
        ref={ref}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={cn(
          switchRootVariants({ size, disabled }),
          colorClass,
          className
        )}
        {...props}
      >
        <BaseSwitch.Thumb className={switchThumbVariants({ size })} />
      </BaseSwitch.Root>
    );
  }
);

Switch.displayName = 'Switch';

export { switchRootVariants, switchThumbVariants };
