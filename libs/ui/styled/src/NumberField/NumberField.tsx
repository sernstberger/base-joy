import * as React from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';

const numberFieldRootVariants = cva('inline-flex flex-col', {
  variants: {
    size: {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const numberFieldGroupVariants = cva('flex', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const numberFieldInputVariants = cva(
  'flex-1 bg-transparent outline-none text-center',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
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

const numberFieldButtonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors hover:bg-neutral-100 active:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface NumberFieldContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const NumberFieldContext = React.createContext<NumberFieldContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'outlined',
});

const useNumberFieldContext = () => React.useContext(NumberFieldContext);

export interface NumberFieldRootProps
  extends Omit<React.ComponentProps<typeof BaseNumberField.Root>, 'className'> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, NumberFieldRootProps>(
  (
    {
      className,
      variant = 'outlined',
      color = 'neutral',
      size = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <NumberFieldContext.Provider value={{ size, color, variant }}>
        <BaseNumberField.Root
          ref={ref}
          className={cn(numberFieldRootVariants({ size }), className)}
          {...props}
        />
      </NumberFieldContext.Provider>
    );
  }
);

Root.displayName = 'NumberField.Root';

export interface NumberFieldGroupProps
  extends Omit<React.ComponentProps<typeof BaseNumberField.Group>, 'className'> {
  className?: string;
}

const Group = React.forwardRef<HTMLDivElement, NumberFieldGroupProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = useNumberFieldContext();

    return (
      <BaseNumberField.Group
        ref={ref}
        className={cn(
          'rounded-lg overflow-hidden',
          variant === 'outlined' && 'border',
          sheetVariants({ variant, color, interactive: true, focusWithin: true }),
          numberFieldGroupVariants({ size }),
          className
        )}
        {...props}
      />
    );
  }
);

Group.displayName = 'NumberField.Group';

export interface NumberFieldInputProps
  extends Omit<React.ComponentProps<typeof BaseNumberField.Input>, 'className'> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, NumberFieldInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const { size } = useNumberFieldContext();

    return (
      <BaseNumberField.Input
        ref={ref}
        disabled={disabled}
        className={cn(numberFieldInputVariants({ size, disabled }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'NumberField.Input';

export interface NumberFieldIncrementProps
  extends Omit<React.ComponentProps<typeof BaseNumberField.Increment>, 'className'> {
  className?: string;
}

const Increment = React.forwardRef<HTMLButtonElement, NumberFieldIncrementProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useNumberFieldContext();

    return (
      <BaseNumberField.Increment
        ref={ref}
        className={cn(
          numberFieldButtonVariants({ size }),
          'border-l border-neutral-200',
          className
        )}
        {...props}
      >
        {children ?? (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M6 2.5V9.5M2.5 6H9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </BaseNumberField.Increment>
    );
  }
);

Increment.displayName = 'NumberField.Increment';

export interface NumberFieldDecrementProps
  extends Omit<React.ComponentProps<typeof BaseNumberField.Decrement>, 'className'> {
  className?: string;
}

const Decrement = React.forwardRef<HTMLButtonElement, NumberFieldDecrementProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useNumberFieldContext();

    return (
      <BaseNumberField.Decrement
        ref={ref}
        className={cn(
          numberFieldButtonVariants({ size }),
          'border-r border-neutral-200',
          className
        )}
        {...props}
      >
        {children ?? (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M2.5 6H9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </BaseNumberField.Decrement>
    );
  }
);

Decrement.displayName = 'NumberField.Decrement';

export const NumberField = {
  Root,
  Group,
  Input,
  Increment,
  Decrement,
};

export {
  numberFieldRootVariants,
  numberFieldGroupVariants,
  numberFieldInputVariants,
  numberFieldButtonVariants,
};
