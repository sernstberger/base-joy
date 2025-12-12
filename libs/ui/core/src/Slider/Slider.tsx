import * as React from 'react';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size, ColorScale } from '@base-joy/tokens';

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

interface SliderContextValue {
  size: Size;
  color: ColorScale;
  orientation: 'horizontal' | 'vertical';
}

const SliderContext = React.createContext<SliderContextValue>({
  size: 'md',
  color: 'primary',
  orientation: 'horizontal',
});

const useSliderContext = () => React.useContext(SliderContext);

export interface SliderRootProps
  extends Omit<React.ComponentProps<typeof BaseSlider.Root>, 'className'> {
  color?: ColorScale;
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, SliderRootProps>(
  (
    {
      className,
      color = 'primary',
      size = 'md',
      orientation = 'horizontal',
      ...props
    },
    ref
  ) => {
    return (
      <SliderContext.Provider value={{ size, color, orientation }}>
        <BaseSlider.Root
          ref={ref}
          orientation={orientation}
          className={cn(sliderRootVariants({ orientation }), className)}
          {...props}
        />
      </SliderContext.Provider>
    );
  }
);

Root.displayName = 'Slider.Root';

export interface SliderControlProps
  extends Omit<React.ComponentProps<typeof BaseSlider.Control>, 'className'> {
  className?: string;
}

const Control = React.forwardRef<HTMLDivElement, SliderControlProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useSliderContext();

    return (
      <BaseSlider.Control
        ref={ref}
        className={cn(sliderControlVariants({ orientation }), className)}
        {...props}
      />
    );
  }
);

Control.displayName = 'Slider.Control';

export interface SliderTrackProps
  extends Omit<React.ComponentProps<typeof BaseSlider.Track>, 'className'> {
  className?: string;
}

const Track = React.forwardRef<HTMLSpanElement, SliderTrackProps>(
  ({ className, ...props }, ref) => {
    const { size, orientation } = useSliderContext();

    return (
      <BaseSlider.Track
        ref={ref}
        className={cn(sliderTrackVariants({ size, orientation }), className)}
        {...props}
      />
    );
  }
);

Track.displayName = 'Slider.Track';

export interface SliderIndicatorProps
  extends Omit<React.ComponentProps<typeof BaseSlider.Indicator>, 'className'> {
  className?: string;
}

const Indicator = React.forwardRef<HTMLDivElement, SliderIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { color, orientation } = useSliderContext();

    return (
      <BaseSlider.Indicator
        ref={ref}
        className={cn(sliderIndicatorVariants({ color, orientation }), className)}
        {...props}
      />
    );
  }
);

Indicator.displayName = 'Slider.Indicator';

export interface SliderThumbProps
  extends Omit<React.ComponentProps<typeof BaseSlider.Thumb>, 'className'> {
  className?: string;
}

const Thumb = React.forwardRef<HTMLDivElement, SliderThumbProps>(
  ({ className, ...props }, ref) => {
    const { size, color } = useSliderContext();

    return (
      <BaseSlider.Thumb
        ref={ref}
        className={cn(sliderThumbVariants({ size, color }), className)}
        {...props}
      />
    );
  }
);

Thumb.displayName = 'Slider.Thumb';

export interface SliderValueProps
  extends Omit<React.ComponentProps<typeof BaseSlider.Value>, 'className'> {
  className?: string;
}

const Value = React.forwardRef<HTMLOutputElement, SliderValueProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSlider.Value
        ref={ref}
        className={cn('text-sm text-neutral-600', className)}
        {...props}
      />
    );
  }
);

Value.displayName = 'Slider.Value';

export const Slider = {
  Root,
  Control,
  Track,
  Indicator,
  Thumb,
  Value,
};

export {
  sliderRootVariants,
  sliderControlVariants,
  sliderTrackVariants,
  sliderIndicatorVariants,
  sliderThumbVariants,
};
