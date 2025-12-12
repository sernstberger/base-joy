import * as React from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';

const fieldRootVariants = cva('flex flex-col', {
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

const fieldLabelVariants = cva('block font-medium text-neutral-900', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
    },
    disabled: {
      true: 'opacity-50',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
});

const fieldDescriptionVariants = cva('text-neutral-600', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const fieldErrorVariants = cva('text-danger-600', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface FieldContextValue {
  size: Size;
}

const FieldContext = React.createContext<FieldContextValue>({
  size: 'md',
});

const useFieldContext = () => React.useContext(FieldContext);

export interface FieldRootProps
  extends Omit<React.ComponentProps<typeof BaseField.Root>, 'className'> {
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, FieldRootProps>(
  ({ className, size = 'md', ...props }, ref) => {
    return (
      <FieldContext.Provider value={{ size }}>
        <BaseField.Root
          ref={ref}
          className={cn(fieldRootVariants({ size }), className)}
          {...props}
        />
      </FieldContext.Provider>
    );
  }
);

Root.displayName = 'Field.Root';

export interface FieldLabelProps
  extends Omit<React.ComponentProps<typeof BaseField.Label>, 'className'> {
  required?: boolean;
  className?: string;
}

const Label = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const { size } = useFieldContext();

    return (
      <BaseField.Label
        ref={ref}
        className={cn(fieldLabelVariants({ size }), className)}
        {...props}
      >
        {children}
        {required && <span className="text-danger-500 ml-0.5">*</span>}
      </BaseField.Label>
    );
  }
);

Label.displayName = 'Field.Label';

export interface FieldControlProps
  extends Omit<React.ComponentProps<typeof BaseField.Control>, 'className'> {
  className?: string;
}

const Control = React.forwardRef<HTMLInputElement, FieldControlProps>(
  ({ className, ...props }, ref) => {
    return <BaseField.Control ref={ref} className={className} {...props} />;
  }
);

Control.displayName = 'Field.Control';

export interface FieldDescriptionProps
  extends Omit<React.ComponentProps<typeof BaseField.Description>, 'className'> {
  className?: string;
}

const Description = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = useFieldContext();

    return (
      <BaseField.Description
        ref={ref}
        className={cn(fieldDescriptionVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Description.displayName = 'Field.Description';

export interface FieldErrorProps
  extends Omit<React.ComponentProps<typeof BaseField.Error>, 'className'> {
  className?: string;
}

const Error = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, ...props }, ref) => {
    const { size } = useFieldContext();

    return (
      <BaseField.Error
        ref={ref}
        className={cn(fieldErrorVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Error.displayName = 'Field.Error';

export const Field = {
  Root,
  Label,
  Control,
  Description,
  Error,
};

export {
  fieldRootVariants,
  fieldLabelVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
};
