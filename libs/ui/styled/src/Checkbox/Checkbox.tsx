import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';

const checkboxRootVariants = cva(
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

interface CheckboxContextValue {
  size: Size;
}

const CheckboxContext = React.createContext<CheckboxContextValue>({
  size: 'md',
});

const useCheckboxContext = () => React.useContext(CheckboxContext);

export interface CheckboxRootProps
  extends Omit<React.ComponentProps<typeof BaseCheckbox.Root>, 'className'> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLButtonElement, CheckboxRootProps>(
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
      <CheckboxContext.Provider value={{ size }}>
        <BaseCheckbox.Root
          ref={ref}
          disabled={disabled}
          className={cn(
            sheetVariants({ variant, color }),
            checkboxRootVariants({ size, disabled }),
            'data-[checked]:bg-primary-500 data-[checked]:text-white data-[checked]:border-primary-500',
            className
          )}
          {...props}
        />
      </CheckboxContext.Provider>
    );
  }
);

Root.displayName = 'Checkbox.Root';

export interface CheckboxIndicatorProps
  extends Omit<React.ComponentProps<typeof BaseCheckbox.Indicator>, 'className'> {
  className?: string;
}

const Indicator = React.forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useCheckboxContext();

    return (
      <BaseCheckbox.Indicator
        ref={ref}
        className={cn(checkboxIndicatorVariants({ size }), className)}
        {...props}
      >
        {children ?? (
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
        )}
      </BaseCheckbox.Indicator>
    );
  }
);

Indicator.displayName = 'Checkbox.Indicator';

export const Checkbox = {
  Root,
  Indicator,
};

export { checkboxRootVariants, checkboxIndicatorVariants };
