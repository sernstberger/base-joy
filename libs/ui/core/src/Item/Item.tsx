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

const itemHeaderVariants = cva('flex items-center justify-between w-full gap-3', {
  variants: {
    size: {
      sm: 'mb-1',
      md: 'mb-1.5',
      lg: 'mb-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const itemTitleVariants = cva('font-medium', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const itemDescriptionVariants = cva('text-neutral-600', {
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

const itemActionsVariants = cva('flex-shrink-0 flex items-center gap-2', {
  variants: {
    size: {
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const itemFooterVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'mt-1 pt-1',
      md: 'mt-1.5 pt-1.5',
      lg: 'mt-2 pt-2',
    },
    bordered: {
      true: 'border-t border-neutral-200',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    bordered: false,
  },
});

const itemMediaVariants = cva('flex-shrink-0 flex items-center justify-center', {
  variants: {
    size: {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const itemIconVariants = cva('flex-shrink-0 flex items-center justify-center', {
  variants: {
    size: {
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
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
   * Replaces the item element with a different tag or component.
   * Use Base UI's render prop pattern for polymorphism.
   * @example <Item render={<a href="/page" />}>Link Item</Item>
   */
  render?: React.ReactElement;
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

export interface ItemHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

export interface ItemTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: Size;
}

export interface ItemDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: Size;
}

export interface ItemActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

export interface ItemFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
  bordered?: boolean;
}

export interface ItemMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

export interface ItemIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: Size;
}

// Context to pass size and loading state down to sub-components
export const ItemContext = React.createContext<{ size: Size; loading?: boolean }>({
  size: 'md',
  loading: false,
});

export const useItemContext = () => React.useContext(ItemContext);

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      className,
      size = 'md',
      interactive,
      selected,
      disabled,
      render,
      children,
      ...props
    },
    ref
  ) => {
    const itemClassName = cn(itemVariants({ size, interactive, selected, disabled }), className);

    const content = (
      <ItemContext.Provider value={{ size }}>
        {children}
      </ItemContext.Provider>
    );

    if (render) {
      return React.cloneElement(render, {
        ref,
        className: cn(itemClassName, render.props.className),
        'aria-disabled': disabled || undefined,
        ...props,
        children: content,
      });
    }

    return (
      <div
        ref={ref}
        className={itemClassName}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {content}
      </div>
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

export const ItemHeader = React.forwardRef<HTMLDivElement, ItemHeaderProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const size = sizeProp ?? contextSize;

    return <div ref={ref} className={cn(itemHeaderVariants({ size }), className)} {...props} />;
  }
);

ItemHeader.displayName = 'ItemHeader';

export const ItemTitle = React.forwardRef<HTMLHeadingElement, ItemTitleProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const size = sizeProp ?? contextSize;

    return <h3 ref={ref} className={cn(itemTitleVariants({ size }), className)} {...props} />;
  }
);

ItemTitle.displayName = 'ItemTitle';

export const ItemDescription = React.forwardRef<HTMLParagraphElement, ItemDescriptionProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const size = sizeProp ?? contextSize;

    return <p ref={ref} className={cn(itemDescriptionVariants({ size }), className)} {...props} />;
  }
);

ItemDescription.displayName = 'ItemDescription';

export const ItemActions = React.forwardRef<HTMLDivElement, ItemActionsProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const size = sizeProp ?? contextSize;

    return <div ref={ref} className={cn(itemActionsVariants({ size }), className)} {...props} />;
  }
);

ItemActions.displayName = 'ItemActions';

export const ItemFooter = React.forwardRef<HTMLDivElement, ItemFooterProps>(
  ({ className, size: sizeProp, bordered, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const size = sizeProp ?? contextSize;

    return (
      <div ref={ref} className={cn(itemFooterVariants({ size, bordered }), className)} {...props} />
    );
  }
);

ItemFooter.displayName = 'ItemFooter';

export const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const size = sizeProp ?? contextSize;

    return <div ref={ref} className={cn(itemMediaVariants({ size }), className)} {...props} />;
  }
);

ItemMedia.displayName = 'ItemMedia';

export const ItemIcon = React.forwardRef<HTMLSpanElement, ItemIconProps>(
  ({ className, size: sizeProp, children, ...props }, ref) => {
    const { size: contextSize, loading } = useItemContext();
    const size = sizeProp ?? contextSize;

    if (loading) return null;

    return (
      <span ref={ref} className={cn(itemIconVariants({ size }), className)} {...props}>
        {children}
      </span>
    );
  }
);

ItemIcon.displayName = 'ItemIcon';

export {
  itemVariants,
  itemStartVariants,
  itemContentVariants,
  itemEndVariants,
  itemHeaderVariants,
  itemTitleVariants,
  itemDescriptionVariants,
  itemActionsVariants,
  itemFooterVariants,
  itemMediaVariants,
  itemIconVariants,
};
