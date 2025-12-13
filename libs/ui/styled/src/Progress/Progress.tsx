import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { ColorScale, Variant, Size } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

interface ProgressContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const ProgressContext = React.createContext<ProgressContextValue>({
  size: 'md',
  color: 'primary',
  variant: 'solid',
});

const useProgressContext = () => React.useContext(ProgressContext);

export const progressRootVariants = cva('w-full', {
  variants: {},
  defaultVariants: {},
});

export const progressTrackVariants = cva('overflow-hidden rounded-full bg-neutral-200', {
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

export const progressIndicatorVariants = cva(
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

export interface ProgressRootProps
  extends Omit<React.ComponentProps<typeof BaseProgress.Root>, 'className'> {
  /**
   * The visual style of the progress indicator.
   * @default 'solid'
   */
  variant?: 'solid' | 'soft';
  /**
   * The color scheme of the progress indicator.
   * @default 'primary'
   */
  color?: ColorScale;
  /**
   * The size of the progress bar.
   * @default 'md'
   */
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, ProgressRootProps>(
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
      <ProgressContext.Provider value={{ size, color, variant: normalizedVariant }}>
        <BaseProgress.Root
          ref={ref}
          className={cn(progressRootVariants(), className)}
          {...props}
        />
      </ProgressContext.Provider>
    );
  }
);

Root.displayName = 'Progress.Root';

export interface ProgressTrackProps
  extends Omit<React.ComponentProps<typeof BaseProgress.Track>, 'className'> {
  className?: string;
}

const Track = React.forwardRef<HTMLDivElement, ProgressTrackProps>(
  ({ className, ...props }, ref) => {
    const { size } = useProgressContext();

    return (
      <BaseProgress.Track
        ref={ref}
        className={cn(progressTrackVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Track.displayName = 'Progress.Track';

export interface ProgressIndicatorProps
  extends Omit<React.ComponentProps<typeof BaseProgress.Indicator>, 'className'> {
  className?: string;
}

const Indicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { variant, color } = useProgressContext();

    return (
      <BaseProgress.Indicator
        ref={ref}
        className={cn(progressIndicatorVariants({ variant, color }), className)}
        {...props}
      />
    );
  }
);

Indicator.displayName = 'Progress.Indicator';

export const Progress = {
  Root,
  Track,
  Indicator,
};

export { ProgressContext, useProgressContext };
