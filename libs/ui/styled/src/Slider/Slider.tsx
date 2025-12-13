import * as React from 'react';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';
import { useResolvedColorProps } from '../ColorContext';

const sliderRootVariants = cva('relative flex touch-none select-none', {
  variants: {
    orientation: {
      horizontal: 'w-full items-center',
      vertical: 'h-full flex-col justify-center',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const sliderControlVariants = cva('relative flex items-center', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const sliderTrackVariants = cva('relative grow rounded-full bg-neutral-200', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'w-full',
    },
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

const sliderIndicatorVariants = cva('absolute rounded-full', {
  variants: {
    color: {
      primary: 'bg-primary-500',
      neutral: 'bg-neutral-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      danger: 'bg-danger-500',
    },
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    },
  },
  defaultVariants: {
    color: 'primary',
    orientation: 'horizontal',
  },
});

const sliderThumbVariants = cva(
  'block rounded-full bg-white border-2 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      color: {
        primary: 'border-primary-500 focus-visible:ring-primary-500',
        neutral: 'border-neutral-500 focus-visible:ring-neutral-500',
        success: 'border-success-500 focus-visible:ring-success-500',
        warning: 'border-warning-500 focus-visible:ring-warning-500',
        danger: 'border-danger-500 focus-visible:ring-danger-500',
      },
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
      color: 'primary',
      size: 'md',
      disabled: false,
    },
  }
);

export interface SliderProps
  extends Omit<
    React.ComponentProps<typeof BaseSlider.Root>,
    'className' | 'children'
  > {
  /**
   * The color scheme of the slider.
   * @default 'primary'
   */
  color?: ColorScale;
  /**
   * The variant style of the slider.
   * Note: Currently only affects color inheritance from ColorContext.
   * @default 'solid'
   */
  variant?: Variant;
  /**
   * The size of the slider.
   * @default 'md'
   */
  size?: Size;
  /**
   * Additional class name for the root element.
   */
  className?: string;
  /**
   * Accessible label for the slider.
   */
  'aria-label'?: string;
  /**
   * ID of element that labels the slider.
   */
  'aria-labelledby'?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      color: colorProp,
      variant: variantProp,
      size: sizeProp,
      orientation = 'horizontal',
      disabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const size = useResolvedSizeProps(sizeProp, 'md');
    const { color } = useResolvedColorProps(
      colorProp,
      variantProp,
      'primary',
      'solid'
    );

    // Determine number of thumbs from defaultValue or value
    const value = props.value ?? props.defaultValue;
    const thumbCount = Array.isArray(value) ? value.length : 1;

    return (
      <BaseSlider.Root
        ref={ref}
        orientation={orientation}
        disabled={disabled}
        className={cn(sliderRootVariants({ orientation }), className)}
        {...props}
      >
        <BaseSlider.Control
          className={sliderControlVariants({ orientation })}
        >
          <BaseSlider.Track
            className={sliderTrackVariants({ size, orientation })}
          >
            <BaseSlider.Indicator
              className={sliderIndicatorVariants({ color, orientation })}
            />
          </BaseSlider.Track>
          {Array.from({ length: thumbCount }).map((_, index) => (
            <BaseSlider.Thumb
              key={index}
              className={sliderThumbVariants({ size, color, disabled })}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
            />
          ))}
        </BaseSlider.Control>
      </BaseSlider.Root>
    );
  }
);

Slider.displayName = 'Slider';

export {
  sliderRootVariants,
  sliderControlVariants,
  sliderTrackVariants,
  sliderIndicatorVariants,
  sliderThumbVariants,
};
