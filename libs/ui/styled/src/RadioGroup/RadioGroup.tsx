import * as React from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';

const radioGroupVariants = cva('flex', {
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

export interface RadioGroupProps
  extends Omit<React.ComponentProps<typeof BaseRadioGroup>, 'className'> {
  orientation?: 'horizontal' | 'vertical';
  /**
   * The size of the radio buttons.
   * @default 'md'
   */
  size?: Size;
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, orientation = 'vertical', size: sizeProp, ...props }, ref) => {
    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

    return (
      <BaseRadioGroup
        ref={ref}
        className={cn(radioGroupVariants({ orientation, size }), className)}
        {...props}
      />
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { radioGroupVariants };
