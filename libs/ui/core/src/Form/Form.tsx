import * as React from 'react';
import { Form as BaseForm } from '@base-ui/react/form';
import { cn } from '@base-joy/utils';

export interface FormProps
  extends Omit<React.ComponentProps<typeof BaseForm>, 'className'> {
  className?: string;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return <BaseForm ref={ref} className={cn(className)} {...props} />;
  }
);

Form.displayName = 'Form';
