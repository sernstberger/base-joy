import * as React from 'react';
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';

const fieldsetRootVariants = cva('', {
  variants: {
    variant: {
      plain: '',
      outlined: 'border border-neutral-200 rounded-lg',
    },
    size: {
      sm: 'p-3 space-y-3',
      md: 'p-4 space-y-4',
      lg: 'p-6 space-y-5',
    },
  },
  compoundVariants: [
    { variant: 'plain', className: 'p-0' },
  ],
  defaultVariants: {
    variant: 'plain',
    size: 'md',
  },
});

const fieldsetLegendVariants = cva('font-semibold text-neutral-900', {
  variants: {
    size: {
      sm: 'text-sm mb-2',
      md: 'text-base mb-3',
      lg: 'text-lg mb-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface FieldsetContextValue {
  size: Size;
}

const FieldsetContext = React.createContext<FieldsetContextValue>({
  size: 'md',
});

const useFieldsetContext = () => React.useContext(FieldsetContext);

export interface FieldsetRootProps
  extends Omit<React.ComponentProps<typeof BaseFieldset.Root>, 'className'> {
  variant?: 'plain' | 'outlined';
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLFieldSetElement, FieldsetRootProps>(
  ({ className, variant = 'plain', size = 'md', ...props }, ref) => {
    return (
      <FieldsetContext.Provider value={{ size }}>
        <BaseFieldset.Root
          ref={ref}
          className={cn(fieldsetRootVariants({ variant, size }), className)}
          {...props}
        />
      </FieldsetContext.Provider>
    );
  }
);

Root.displayName = 'Fieldset.Root';

export interface FieldsetLegendProps
  extends Omit<React.ComponentProps<typeof BaseFieldset.Legend>, 'className'> {
  className?: string;
}

const Legend = React.forwardRef<HTMLLegendElement, FieldsetLegendProps>(
  ({ className, ...props }, ref) => {
    const { size } = useFieldsetContext();

    return (
      <BaseFieldset.Legend
        ref={ref}
        className={cn(fieldsetLegendVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Legend.displayName = 'Fieldset.Legend';

export const Fieldset = {
  Root,
  Legend,
};

export { fieldsetRootVariants, fieldsetLegendVariants };
