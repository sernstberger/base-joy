import * as React from 'react';
import { Meter as BaseMeter } from '@base-ui/react/meter';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { ColorScale, Variant, Size } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

interface MeterContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const MeterContext = React.createContext<MeterContextValue>({
  size: 'md',
  color: 'primary',
  variant: 'solid',
});

const useMeterContext = () => React.useContext(MeterContext);

export const meterRootVariants = cva('w-full', {
  variants: {},
  defaultVariants: {},
});

export const meterTrackVariants = cva('overflow-hidden rounded-full bg-neutral-200', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const meterIndicatorVariants = cva(
  'h-full transition-all duration-300 ease-in-out rounded-full',
  {
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
      // Solid variants
      { variant: 'solid', color: 'primary', className: 'bg-primary-500' },
      { variant: 'solid', color: 'neutral', className: 'bg-neutral-800' },
      { variant: 'solid', color: 'success', className: 'bg-success-500' },
      { variant: 'solid', color: 'warning', className: 'bg-warning-600' },
      { variant: 'solid', color: 'danger', className: 'bg-danger-500' },

      // Soft variants
      { variant: 'soft', color: 'primary', className: 'bg-primary-400' },
      { variant: 'soft', color: 'neutral', className: 'bg-neutral-600' },
      { variant: 'soft', color: 'success', className: 'bg-success-400' },
      { variant: 'soft', color: 'warning', className: 'bg-warning-500' },
      { variant: 'soft', color: 'danger', className: 'bg-danger-400' },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
    },
  }
);

export interface MeterRootProps
  extends Omit<React.ComponentProps<typeof BaseMeter.Root>, 'className'> {
  /**
   * The visual style of the meter indicator.
   * @default 'solid'
   */
  variant?: 'solid' | 'soft';
  /**
   * The color scheme of the meter indicator.
   * @default 'primary'
   */
  color?: ColorScale;
  /**
   * The size of the meter bar.
   * @default 'md'
   */
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, MeterRootProps>(
  (
    {
      className,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      ...props
    },
    ref
  ) => {
    const { color, variant } = useResolvedColorProps(
      colorProp,
      variantProp,
      'primary',
      'solid'
    );

    const size = useResolvedSizeProps(sizeProp, 'md');

    // Normalize variant to only 'solid' or 'soft'
    const normalizedVariant = (variant === 'outlined' || variant === 'plain' ? 'soft' : variant) as 'solid' | 'soft';

    return (
      <MeterContext.Provider value={{ size, color, variant: normalizedVariant }}>
        <BaseMeter.Root
          ref={ref}
          className={cn(meterRootVariants(), className)}
          {...props}
        />
      </MeterContext.Provider>
    );
  }
);

Root.displayName = 'Meter.Root';

export interface MeterTrackProps
  extends Omit<React.ComponentProps<typeof BaseMeter.Track>, 'className'> {
  className?: string;
}

const Track = React.forwardRef<HTMLDivElement, MeterTrackProps>(
  ({ className, ...props }, ref) => {
    const { size } = useMeterContext();

    return (
      <BaseMeter.Track
        ref={ref}
        className={cn(meterTrackVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Track.displayName = 'Meter.Track';

export interface MeterIndicatorProps
  extends Omit<React.ComponentProps<typeof BaseMeter.Indicator>, 'className'> {
  className?: string;
}

const Indicator = React.forwardRef<HTMLDivElement, MeterIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { variant, color } = useMeterContext();

    return (
      <BaseMeter.Indicator
        ref={ref}
        className={cn(meterIndicatorVariants({ variant, color }), className)}
        {...props}
      />
    );
  }
);

Indicator.displayName = 'Meter.Indicator';

export const Meter = {
  Root,
  Track,
  Indicator,
};

export { MeterContext, useMeterContext };
