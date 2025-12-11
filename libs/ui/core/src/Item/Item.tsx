import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';

/**
 * Item component - A structured content component with slots.
 *
 * The Item component provides a consistent layout pattern for list items,
 * menu items, and other structured content with start/content/end slots.
 */

const itemVariants = cva('flex items-center gap-3 w-full', {
  variants: {
    size: {
      sm: 'py-1.5 px-2 text-sm',
      md: 'py-2 px-3 text-base',
      lg: 'py-3 px-4 text-lg',
    },
    interactive: {
      true: 'cursor-pointer transition-colors hover:bg-neutral-100 active:bg-neutral-200',
      false: '',
    },
    selected: {
      true: 'bg-primary-50',
      false: '',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
      false: '',
    },
  },
  compoundVariants: [
    {
      interactive: true,
      selected: true,
      className: 'hover:bg-primary-100 active:bg-primary-200',
    },
  ],
  defaultVariants: {
    size: 'md',
    interactive: false,
    selected: false,
    disabled: false,
  },
});

const itemStartVariants = cva('flex-shrink-0 flex items-center justify-center', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const itemContentVariants = cva('flex-1 min-w-0', {
  variants: {
    truncate: {
      true: 'truncate',
      false: '',
    },
  },
  defaultVariants: {
    truncate: true,
  },
});

const itemEndVariants = cva('flex-shrink-0 flex items-center justify-center', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface ItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof itemVariants> {
  /**
   * The size of the item.
   * @default 'md'
   */
  size?: Size;

  /**
   * Whether the item is interactive (hoverable/clickable).
   * @default false
   */
  interactive?: boolean;

  /**
   * Whether the item is selected.
   * @default false
   */
  selected?: boolean;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The element type to render as.
   * @default 'div'
   */
  as?: React.ElementType;
}

export interface ItemStartProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: Size;
}

export interface ItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to truncate overflowing text.
   * @default true
   */
  truncate?: boolean;
}

export interface ItemEndProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: Size;
}

// Context to pass size down to sub-components
const ItemContext = React.createContext<{ size: Size }>({ size: 'md' });

const useItemContext = () => React.useContext(ItemContext);

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      className,
      size = 'md',
      interactive,
      selected,
      disabled,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <ItemContext.Provider value={{ size }}>
        <Component
          ref={ref}
          className={cn(itemVariants({ size, interactive, selected, disabled }), className)}
          aria-disabled={disabled || undefined}
          {...props}
        >
          {children}
        </Component>
      </ItemContext.Provider>
    );
  }
);

Item.displayName = 'Item';

export const ItemStart = React.forwardRef<HTMLSpanElement, ItemStartProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const size = sizeProp ?? contextSize;

    return <span ref={ref} className={cn(itemStartVariants({ size }), className)} {...props} />;
  }
);

ItemStart.displayName = 'ItemStart';

export const ItemContent = React.forwardRef<HTMLDivElement, ItemContentProps>(
  ({ className, truncate, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(itemContentVariants({ truncate }), className)} {...props} />
    );
  }
);

ItemContent.displayName = 'ItemContent';

export const ItemEnd = React.forwardRef<HTMLSpanElement, ItemEndProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const size = sizeProp ?? contextSize;

    return (
      <span
        ref={ref}
        className={cn(itemEndVariants({ size }), 'text-neutral-500', className)}
        {...props}
      />
    );
  }
);

ItemEnd.displayName = 'ItemEnd';

export { itemVariants, itemStartVariants, itemContentVariants, itemEndVariants };
