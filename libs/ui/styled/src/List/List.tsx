import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { Item, type ItemProps } from '../Item';

/**
 * The marker style for list items.
 */
export type Marker = 'none' | 'disc' | 'circle' | 'decimal';

// List Context for prop inheritance
export interface ListContextValue {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  marker?: Marker;
}

export const ListContext = React.createContext<ListContextValue | null>(null);

export const useListContext = () => React.useContext(ListContext);

// Nested List Context - indicates we're inside a nested ListItem
const NestedListContext = React.createContext(false);

const useNestedListContext = () => React.useContext(NestedListContext);

// List variants
export const listVariants = cva('flex flex-col m-0 p-0', {
  variants: {
    spacing: {
      none: 'gap-0',
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
    },
    marker: {
      none: 'list-none',
      disc: 'list-disc list-inside',
      circle: 'list-[circle] list-inside',
      decimal: 'list-decimal list-inside',
    },
  },
  defaultVariants: {
    spacing: 'none',
    marker: 'none',
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
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
  /**
   * The marker style for list items.
   * When set to 'decimal', renders as an ordered list (<ol>).
   * @default 'none'
   */
  marker?: Marker;
}

export const List = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  ListProps
>(
  (
    {
      className,
      variant = 'plain',
      color = 'neutral',
      size = 'md',
      spacing = 'none',
      marker = 'none',
      children,
      ...props
    },
    ref
  ) => {
    const contextValue = React.useMemo<ListContextValue>(
      () => ({ variant, color, size, marker }),
      [variant, color, size, marker]
    );

    // Render as <ol> for decimal markers (ordered list)
    const Component = marker === 'decimal' ? 'ol' : 'ul';

    return (
      <ListContext.Provider value={contextValue}>
        <Component
          ref={ref as React.Ref<HTMLUListElement> & React.Ref<HTMLOListElement>}
          className={cn(listVariants({ spacing, marker }), className)}
          {...props}
        >
          {children}
        </Component>
      </ListContext.Provider>
    );
  }
);

List.displayName = 'List';

// ListItem - wraps Item component with li element
export interface ListItemProps extends Omit<ItemProps, 'as'> {
  /**
   * If true, the ListItem acts as a container for nested Lists and ListSubheaders.
   * Children are rendered directly without the Item wrapper.
   * @default false
   */
  nested?: boolean;
}

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
      nested = false,
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
    const marker = listContext?.marker ?? 'none';

    // Nested ListItem - renders children directly as a container for nested Lists
    if (nested) {
      return (
        <NestedListContext.Provider value={true}>
          <li ref={ref} className={cn('list-none', className)}>
            {children}
          </li>
        </NestedListContext.Provider>
      );
    }

    // When markers are shown, render children directly for proper alignment
    // (Item is a flex container which breaks list-inside marker positioning)
    if (marker !== 'none') {
      return (
        <li ref={ref} className={cn('py-1', className)}>
          {children}
        </li>
      );
    }

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
  'list-none px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500',
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
  extends React.HTMLAttributes<HTMLLIElement | HTMLDivElement>,
    VariantProps<typeof listSubheaderVariants> {}

export const ListSubheader = React.forwardRef<
  HTMLLIElement | HTMLDivElement,
  ListSubheaderProps
>(({ className, sticky = false, children, ...props }, ref) => {
  const isNested = useNestedListContext();

  // Inside a nested ListItem, render as div to avoid li > li nesting
  if (isNested) {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(listSubheaderVariants({ sticky }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <li
      ref={ref as React.Ref<HTMLLIElement>}
      className={cn(listSubheaderVariants({ sticky }), className)}
      {...props}
    >
      {children}
    </li>
  );
});

ListSubheader.displayName = 'ListSubheader';
