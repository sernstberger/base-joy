import * as React from 'react';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps, getSolidContainerStyles } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const checkboxGroupVariants = cva('flex', {
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

const checkboxVariants = cva(
  'inline-flex items-center justify-center rounded cursor-pointer transition-colors',
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

const checkboxIndicatorVariants = cva(
  'flex items-center justify-center text-current',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-3.5 w-3.5',
        lg: 'h-4 w-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

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

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends Omit<React.ComponentProps<typeof BaseCheckboxGroup>, 'className' | 'children'> {
  /**
   * The options to display as checkboxes.
   */
  options: CheckboxOption[];
  /**
   * The layout orientation of the checkbox group.
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The visual style of the checkboxes.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the checkboxes.
   * @default 'primary'
   */
  color?: ColorScale;
  /**
   * The size of the checkboxes.
   * @default 'md'
   */
  size?: Size;
  /**
   * Additional CSS classes for the root element.
   */
  className?: string;
  /**
   * Accessible label for the checkbox group.
   */
  'aria-label'?: string;
  /**
   * ID of the element that labels this checkbox group.
   */
  'aria-labelledby'?: string;
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
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
      <BaseCheckboxGroup
        ref={ref}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={cn(checkboxGroupVariants({ orientation, size }), className)}
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
            <BaseCheckbox.Root
              name={option.value}
              disabled={option.disabled}
              aria-label={option.label}
              className={cn(
                sheetVariants({ variant, color, interactive: true }),
                checkboxVariants({ size, disabled: disabled || option.disabled }),
                `data-[checked]:bg-${color}-500 data-[checked]:text-white data-[checked]:border-${color}-500`,
                isInsideSolid && getSolidContainerStyles(variant, true)
              )}
            >
              <BaseCheckbox.Indicator
                className={checkboxIndicatorVariants({ size })}
              >
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </BaseCheckbox.Indicator>
            </BaseCheckbox.Root>
            <span>{option.label}</span>
          </label>
        ))}
      </BaseCheckboxGroup>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

export {
  checkboxGroupVariants,
  checkboxVariants,
  checkboxIndicatorVariants,
  labelVariants,
};
