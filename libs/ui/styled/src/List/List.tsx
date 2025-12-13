import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { Item, type ItemProps } from '../Item';

// List Context for prop inheritance
export interface ListContextValue {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
}

export const ListContext = React.createContext<ListContextValue | null>(null);

export const useListContext = () => React.useContext(ListContext);

// List variants
export const listVariants = cva('flex flex-col list-none m-0 p-0', {
  variants: {
    spacing: {
      none: 'gap-0',
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
    },
  },
  defaultVariants: {
    spacing: 'none',
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {
  /**
   * The visual style applied to child ListItems.
   * @default 'plain'
   */
  variant?: Variant;
  /**
   * The color scheme applied to child ListItems.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size applied to child ListItems.
   * @default 'md'
   */
  size?: Size;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      variant = 'plain',
      color = 'neutral',
      size = 'md',
      spacing = 'none',
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo<ListContextValue>(
      () => ({ variant, color, size }),
      [variant, color, size]
    );

    return (
      <ListContext.Provider value={contextValue}>
        <ul
          ref={ref}
          className={cn(listVariants({ spacing }), className)}
          {...props}
        >
          {children}
        </ul>
      </ListContext.Provider>
    );
  }
);

List.displayName = 'List';

// ListItem - wraps Item component with li element
export interface ListItemProps extends Omit<ItemProps, 'as'> {}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      className,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      interactive = false,
      selected = false,
      disabled = false,
      render,
      children,
      ...props
    },
    ref
  ) => {
    const listContext = useListContext();

    // Resolve props: explicit > context > defaults
    const variant = variantProp ?? listContext?.variant ?? 'plain';
    const color = colorProp ?? listContext?.color ?? 'neutral';
    const size = sizeProp ?? listContext?.size ?? 'md';

    return (
      <li ref={ref} className="list-none">
        <Item
          variant={variant}
          color={color}
          size={size}
          interactive={interactive}
          selected={selected}
          disabled={disabled}
          render={render}
          className={className}
          {...props}
        >
          {children}
        </Item>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

// ListSubheader variants
export const listSubheaderVariants = cva(
  'px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500',
  {
    variants: {
      sticky: {
        true: 'sticky top-0 bg-white z-10',
        false: '',
      },
    },
    defaultVariants: {
      sticky: false,
    },
  }
);

export interface ListSubheaderProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listSubheaderVariants> {}

export const ListSubheader = React.forwardRef<HTMLLIElement, ListSubheaderProps>(
  ({ className, sticky = false, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(listSubheaderVariants({ sticky }), className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);

ListSubheader.displayName = 'ListSubheader';
