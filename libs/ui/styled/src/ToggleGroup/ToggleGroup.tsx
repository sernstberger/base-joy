import * as React from 'react';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { ToggleGroupContext, type ToggleGroupContextValue } from '../Toggle';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';

const toggleGroupVariants = cva('inline-flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    size: {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

export interface ToggleGroupRootProps
  extends Omit<React.ComponentProps<typeof BaseToggleGroup>, 'className'> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, ToggleGroupRootProps>(
  (
    {
      className,
      variant = 'outlined',
      color = 'primary',
      size: sizeProp,
      orientation = 'horizontal',
      children,
      ...props
    },
    ref
  ) => {
    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

    const contextValue: ToggleGroupContextValue = React.useMemo(
      () => ({ variant, color, size }),
      [variant, color, size]
    );

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        <BaseToggleGroup
          ref={ref}
          className={cn(toggleGroupVariants({ orientation, size }), className)}
          {...props}
        >
          {children}
        </BaseToggleGroup>
      </ToggleGroupContext.Provider>
    );
  }
);

Root.displayName = 'ToggleGroup.Root';

export const ToggleGroup = {
  Root,
};

export { toggleGroupVariants };
