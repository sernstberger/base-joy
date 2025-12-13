import * as React from 'react';
import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';
import { useResolvedColorProps } from '../ColorContext';

const navigationMenuListVariants = cva('flex gap-1', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const navigationMenuItemVariants = cva('relative', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const navigationMenuTriggerVariants = cva(
  'flex items-center justify-center cursor-pointer select-none outline-none transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-base gap-2',
        lg: 'px-5 py-2.5 text-lg gap-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const navigationMenuLinkVariants = cva(
  'flex items-center cursor-pointer select-none outline-none transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-base gap-2',
        lg: 'px-5 py-2.5 text-lg gap-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const navigationMenuPopupVariants = cva(
  'z-50 min-w-[12rem] overflow-hidden rounded-lg shadow-lg p-2',
  {
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
  }
);

const navigationMenuViewportVariants = cva(
  'overflow-hidden rounded-lg shadow-lg transition-all duration-200',
  {
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
  }
);

const navigationMenuContentVariants = cva('p-2', {
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

interface NavigationMenuContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
  orientation: 'horizontal' | 'vertical';
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'plain',
  orientation: 'horizontal',
});

const useNavigationMenuContext = () => React.useContext(NavigationMenuContext);

export interface NavigationMenuRootProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Root>,
    'className'
  > {
  /**
   * The visual style of the navigation menu items.
   * @default 'plain'
   */
  variant?: Variant;
  /**
   * The color scheme of the navigation menu items.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the navigation menu.
   * @default 'md'
   */
  size?: Size;
  className?: string;
}

const Root = ({
  variant: variantProp,
  color: colorProp,
  size: sizeProp,
  className,
  orientation = 'horizontal',
  ...props
}: NavigationMenuRootProps) => {
  const { color, variant } = useResolvedColorProps(
    colorProp,
    variantProp,
    'neutral',
    'plain'
  );

  const size = useResolvedSizeProps(sizeProp, 'md');

  return (
    <NavigationMenuContext.Provider value={{ size, color, variant, orientation }}>
      <BaseNavigationMenu.Root
        className={cn(className)}
        orientation={orientation}
        {...props}
      />
    </NavigationMenuContext.Provider>
  );
};

Root.displayName = 'NavigationMenu.Root';

export interface NavigationMenuListProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.List>,
    'className'
  > {
  className?: string;
}

const List = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useNavigationMenuContext();

    return (
      <BaseNavigationMenu.List
        ref={ref}
        className={cn(navigationMenuListVariants({ orientation }), className)}
        {...props}
      />
    );
  }
);

List.displayName = 'NavigationMenu.List';

export interface NavigationMenuItemProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Item>,
    'className'
  > {
  className?: string;
}

const Item = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ className, ...props }, ref) => {
    const { size } = useNavigationMenuContext();

    return (
      <BaseNavigationMenu.Item
        ref={ref}
        className={cn(navigationMenuItemVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Item.displayName = 'NavigationMenu.Item';

export interface NavigationMenuTriggerProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Trigger>,
    'className'
  > {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = useNavigationMenuContext();

    return (
      <BaseNavigationMenu.Trigger
        ref={ref}
        className={cn(
          navigationMenuTriggerVariants({ size }),
          sheetVariants({ variant, color, interactive: true }),
          'data-[state=open]:brightness-95',
          className
        )}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'NavigationMenu.Trigger';

export interface NavigationMenuLinkProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Link>,
    'className'
  > {
  className?: string;
}

const Link = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = useNavigationMenuContext();

    return (
      <BaseNavigationMenu.Link
        ref={ref}
        className={cn(
          navigationMenuLinkVariants({ size }),
          sheetVariants({ variant, color, interactive: true }),
          'data-[active]:brightness-90',
          className
        )}
        {...props}
      />
    );
  }
);

Link.displayName = 'NavigationMenu.Link';

export interface NavigationMenuPortalProps
  extends React.ComponentProps<typeof BaseNavigationMenu.Portal> {}

const Portal = BaseNavigationMenu.Portal;
Portal.displayName = 'NavigationMenu.Portal';

export interface NavigationMenuPositionerProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Positioner>,
    'className'
  > {
  className?: string;
}

const Positioner = React.forwardRef<
  HTMLDivElement,
  NavigationMenuPositionerProps
>(({ className, ...props }, ref) => {
  return (
    <BaseNavigationMenu.Positioner
      ref={ref}
      className={cn('outline-none', className)}
      {...props}
    />
  );
});

Positioner.displayName = 'NavigationMenu.Positioner';

export interface NavigationMenuPopupProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Popup>,
    'className'
  > {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, NavigationMenuPopupProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = useNavigationMenuContext();

    return (
      <BaseNavigationMenu.Popup
        ref={ref}
        className={cn(
          navigationMenuPopupVariants({ size }),
          sheetVariants({ variant: variant === 'plain' ? 'outlined' : variant, color }),
          className
        )}
        {...props}
      />
    );
  }
);

Popup.displayName = 'NavigationMenu.Popup';

export interface NavigationMenuViewportProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Viewport>,
    'className'
  > {
  className?: string;
}

const Viewport = React.forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = useNavigationMenuContext();

    return (
      <BaseNavigationMenu.Viewport
        ref={ref}
        className={cn(
          navigationMenuViewportVariants({ size }),
          sheetVariants({ variant: variant === 'plain' ? 'outlined' : variant, color }),
          className
        )}
        {...props}
      />
    );
  }
);

Viewport.displayName = 'NavigationMenu.Viewport';

export interface NavigationMenuContentProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Content>,
    'className'
  > {
  className?: string;
}

const Content = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ className, ...props }, ref) => {
    const { size } = useNavigationMenuContext();

    return (
      <BaseNavigationMenu.Content
        ref={ref}
        className={cn(navigationMenuContentVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Content.displayName = 'NavigationMenu.Content';

export interface NavigationMenuBackdropProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Backdrop>,
    'className'
  > {
  className?: string;
}

const Backdrop = React.forwardRef<HTMLDivElement, NavigationMenuBackdropProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseNavigationMenu.Backdrop
        ref={ref}
        className={cn('fixed inset-0 bg-black/20 z-40', className)}
        {...props}
      />
    );
  }
);

Backdrop.displayName = 'NavigationMenu.Backdrop';

export interface NavigationMenuArrowProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Arrow>,
    'className'
  > {
  className?: string;
}

const Arrow = React.forwardRef<HTMLDivElement, NavigationMenuArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseNavigationMenu.Arrow
        ref={ref}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Arrow.displayName = 'NavigationMenu.Arrow';

export interface NavigationMenuIconProps
  extends Omit<
    React.ComponentProps<typeof BaseNavigationMenu.Icon>,
    'className'
  > {
  className?: string;
}

const Icon = React.forwardRef<HTMLSpanElement, NavigationMenuIconProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseNavigationMenu.Icon
        ref={ref}
        className={cn('transition-transform duration-200', className)}
        {...props}
      />
    );
  }
);

Icon.displayName = 'NavigationMenu.Icon';

export const NavigationMenu = {
  Root,
  List,
  Item,
  Trigger,
  Link,
  Portal,
  Positioner,
  Popup,
  Viewport,
  Content,
  Backdrop,
  Arrow,
  Icon,
};

export {
  navigationMenuListVariants,
  navigationMenuItemVariants,
  navigationMenuTriggerVariants,
  navigationMenuLinkVariants,
  navigationMenuPopupVariants,
  navigationMenuViewportVariants,
  navigationMenuContentVariants,
};
