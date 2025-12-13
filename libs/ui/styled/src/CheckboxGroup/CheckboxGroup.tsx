import * as React from 'react';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';

const checkboxGroupVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    size: 'md',
  },
});

export interface CheckboxGroupProps
  extends Omit<React.ComponentProps<typeof BaseCheckboxGroup>, 'className'> {
  orientation?: 'horizontal' | 'vertical';
  size?: Size;
  className?: string;
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, orientation = 'vertical', size: sizeProp, ...props }, ref) => {
    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

    return (
      <BaseCheckboxGroup
        ref={ref}
        className={cn(checkboxGroupVariants({ orientation, size }), className)}
        {...props}
      />
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

export { checkboxGroupVariants };
