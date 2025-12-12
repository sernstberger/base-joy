import * as React from 'react';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';

const radioRootVariants = cva(
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

interface RadioContextValue {
  size: Size;
}

const RadioContext = React.createContext<RadioContextValue>({
  size: 'md',
});

const useRadioContext = () => React.useContext(RadioContext);

export interface RadioRootProps
  extends Omit<React.ComponentProps<typeof BaseRadio.Root>, 'className'> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLButtonElement, RadioRootProps>(
  (
    {
      className,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <RadioContext.Provider value={{ size }}>
        <BaseRadio.Root
          ref={ref}
          disabled={disabled}
          className={cn(
            sheetVariants({ variant, color }),
            radioRootVariants({ size, disabled }),
            'data-[checked]:bg-primary-500 data-[checked]:text-white data-[checked]:border-primary-500',
            className
          )}
          {...props}
        />
      </RadioContext.Provider>
    );
  }
);

Root.displayName = 'Radio.Root';

export interface RadioIndicatorProps
  extends Omit<React.ComponentProps<typeof BaseRadio.Indicator>, 'className'> {
  className?: string;
}

const Indicator = React.forwardRef<HTMLSpanElement, RadioIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { size } = useRadioContext();

    return (
      <BaseRadio.Indicator
        ref={ref}
        className={cn(radioIndicatorVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Indicator.displayName = 'Radio.Indicator';

export const Radio = {
  Root,
  Indicator,
};

export { radioRootVariants, radioIndicatorVariants };
