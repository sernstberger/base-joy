import * as React from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps, getSolidContainerStyles } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const radioGroupVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    size: 'md',
  },
});

const radioVariants = cva(
  'inline-flex items-center justify-center rounded-full cursor-pointer transition-colors',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
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

const radioIndicatorVariants = cva('rounded-full bg-current', {
  variants: {
    size: {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const labelVariants = cva('flex items-center cursor-pointer', {
  variants: {
    size: {
      sm: 'gap-2 text-sm',
      md: 'gap-3 text-base',
      lg: 'gap-3 text-lg',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.ComponentProps<typeof BaseRadioGroup>, 'className' | 'children'> {
  /**
   * The options to display as radio buttons.
   */
  options: RadioOption[];
  /**
   * The layout orientation of the radio group.
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The visual style of the radio buttons.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the radio buttons.
   * @default 'primary'
   */
  color?: ColorScale;
  /**
   * The size of the radio buttons.
   * @default 'md'
   */
  size?: Size;
  /**
   * Additional CSS classes for the root element.
   */
  className?: string;
  /**
   * Accessible label for the radio group.
   */
  'aria-label'?: string;
  /**
   * ID of the element that labels this radio group.
   */
  'aria-labelledby'?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      className,
      orientation = 'vertical',
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      disabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const { color, variant, isInsideSolid } = useResolvedColorProps(
      colorProp,
      variantProp,
      'primary',
      'outlined'
    );
    const size = useResolvedSizeProps(sizeProp, 'md');

    return (
      <BaseRadioGroup
        ref={ref}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={cn(radioGroupVariants({ orientation, size }), className)}
        {...props}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={labelVariants({
              size,
              disabled: disabled || option.disabled,
            })}
          >
            <BaseRadio.Root
              value={option.value}
              disabled={option.disabled}
              aria-label={option.label}
              className={cn(
                sheetVariants({ variant, color, interactive: true }),
                radioVariants({ size, disabled: disabled || option.disabled }),
                `data-[checked]:bg-${color}-500 data-[checked]:text-white data-[checked]:border-${color}-500`,
                isInsideSolid && getSolidContainerStyles(variant, true)
              )}
            >
              <BaseRadio.Indicator
                className={radioIndicatorVariants({ size })}
              />
            </BaseRadio.Root>
            <span>{option.label}</span>
          </label>
        ))}
      </BaseRadioGroup>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export {
  radioGroupVariants,
  radioVariants,
  radioIndicatorVariants,
  labelVariants,
};
