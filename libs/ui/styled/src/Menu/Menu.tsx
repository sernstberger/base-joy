import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';
import { useResolvedColorProps } from '../ColorContext';

const menuPopupVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-lg shadow-lg p-1',
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

const menuItemVariants = cva(
  'relative flex cursor-pointer select-none items-center rounded outline-none transition-colors data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
  {
    variants: {
      size: {
        sm: 'px-2 py-1.5 text-sm gap-2',
        md: 'px-3 py-2 text-base gap-2.5',
        lg: 'px-4 py-3 text-lg gap-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const menuSeparatorVariants = cva(
  'h-px bg-neutral-200',
  {
    variants: {
      size: {
        sm: 'my-1',
        md: 'my-1.5',
        lg: 'my-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const menuGroupLabelVariants = cva(
  'font-semibold text-neutral-500',
  {
    variants: {
      size: {
        sm: 'px-2 py-1.5 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface MenuContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const MenuContext = React.createContext<MenuContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'outlined',
});

const useMenuContext = () => React.useContext(MenuContext);

export interface MenuRootProps
  extends Omit<React.ComponentProps<typeof BaseMenu.Root>, 'className'> {
  /**
   * The visual style of the menu items.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the menu items.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the menu.
   * @default 'md'
   */
  size?: Size;
}

const Root = ({
  variant: variantProp,
  color: colorProp,
  size: sizeProp,
  ...props
}: MenuRootProps) => {
  // Resolve color and variant from context (inherits from parent Sheet)
  const { color, variant } = useResolvedColorProps(
    colorProp,
    variantProp,
    'neutral',
    'outlined'
  );

  // Resolve size from context (inherits from parent Sheet)
  const size = useResolvedSizeProps(sizeProp, 'md');

  return (
    <MenuContext.Provider value={{ size, color, variant }}>
      <BaseMenu.Root {...props} />
    </MenuContext.Provider>
  );
};

Root.displayName = 'Menu.Root';

export interface MenuTriggerProps
  extends Omit<React.ComponentProps<typeof BaseMenu.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ className, ...props }, ref) => {
    return <BaseMenu.Trigger ref={ref} className={cn(className)} {...props} />;
  }
);

Trigger.displayName = 'Menu.Trigger';

export interface MenuPortalProps
  extends React.ComponentProps<typeof BaseMenu.Portal> {}

const Portal = BaseMenu.Portal;
Portal.displayName = 'Menu.Portal';

export interface MenuPositionerProps
  extends Omit<React.ComponentProps<typeof BaseMenu.Positioner>, 'className'> {
  className?: string;
}

const Positioner = React.forwardRef<HTMLDivElement, MenuPositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseMenu.Positioner
        ref={ref}
        className={cn('outline-none', className)}
        {...props}
      />
    );
  }
);

Positioner.displayName = 'Menu.Positioner';

export interface MenuPopupProps
  extends Omit<React.ComponentProps<typeof BaseMenu.Popup>, 'className'> {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, MenuPopupProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = useMenuContext();

    return (
      <BaseMenu.Popup
        ref={ref}
        className={cn(
          menuPopupVariants({ size }),
          sheetVariants({ variant, color }),
          className
        )}
        {...props}
      />
    );
  }
);

Popup.displayName = 'Menu.Popup';

export interface MenuItemProps
  extends Omit<React.ComponentProps<typeof BaseMenu.Item>, 'className'> {
  className?: string;
}

const Item = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = useMenuContext();

    return (
      <BaseMenu.Item
        ref={ref}
        className={cn(
          menuItemVariants({ size }),
          sheetVariants({ variant, color, interactive: true }),
          'data-[highlighted]:brightness-95',
          className
        )}
        {...props}
      />
    );
  }
);

Item.displayName = 'Menu.Item';

export interface MenuSeparatorProps
  extends Omit<React.ComponentProps<typeof BaseMenu.Separator>, 'className'> {
  className?: string;
}

const Separator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { size } = useMenuContext();

    return (
      <BaseMenu.Separator
        ref={ref}
        className={cn(menuSeparatorVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Menu.Separator';

export interface MenuGroupProps
  extends Omit<React.ComponentProps<typeof BaseMenu.Group>, 'className'> {
  className?: string;
}

const Group = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ className, ...props }, ref) => {
    return <BaseMenu.Group ref={ref} className={cn(className)} {...props} />;
  }
);

Group.displayName = 'Menu.Group';

export interface MenuGroupLabelProps
  extends Omit<React.ComponentProps<typeof BaseMenu.GroupLabel>, 'className'> {
  className?: string;
}

const GroupLabel = React.forwardRef<HTMLDivElement, MenuGroupLabelProps>(
  ({ className, ...props }, ref) => {
    const { size } = useMenuContext();

    return (
      <BaseMenu.GroupLabel
        ref={ref}
        className={cn(menuGroupLabelVariants({ size }), className)}
        {...props}
      />
    );
  }
);

GroupLabel.displayName = 'Menu.GroupLabel';

export interface MenuRadioGroupProps
  extends Omit<React.ComponentProps<typeof BaseMenu.RadioGroup>, 'className'> {
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  ({ className, ...props }, ref) => {
    return <BaseMenu.RadioGroup ref={ref} className={cn(className)} {...props} />;
  }
);

RadioGroup.displayName = 'Menu.RadioGroup';

export interface MenuRadioItemProps
  extends Omit<React.ComponentProps<typeof BaseMenu.RadioItem>, 'className'> {
  className?: string;
}

const RadioItem = React.forwardRef<HTMLDivElement, MenuRadioItemProps>(
  ({ className, children, ...props }, ref) => {
    const { size, variant, color } = useMenuContext();

    return (
      <BaseMenu.RadioItem
        ref={ref}
        className={cn(
          menuItemVariants({ size }),
          sheetVariants({ variant, color, interactive: true }),
          'data-[highlighted]:brightness-95',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 w-full">
          <BaseMenu.RadioItemIndicator className="w-4 h-4 flex items-center justify-center">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <circle cx="6" cy="6" r="3" fill="currentColor" />
            </svg>
          </BaseMenu.RadioItemIndicator>
          {children}
        </div>
      </BaseMenu.RadioItem>
    );
  }
);

RadioItem.displayName = 'Menu.RadioItem';

export interface MenuCheckboxItemProps
  extends Omit<React.ComponentProps<typeof BaseMenu.CheckboxItem>, 'className'> {
  className?: string;
}

const CheckboxItem = React.forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  ({ className, children, ...props }, ref) => {
    const { size, variant, color } = useMenuContext();

    return (
      <BaseMenu.CheckboxItem
        ref={ref}
        className={cn(
          menuItemVariants({ size }),
          sheetVariants({ variant, color, interactive: true }),
          'data-[highlighted]:brightness-95',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 w-full">
          <BaseMenu.CheckboxItemIndicator className="w-4 h-4 flex items-center justify-center">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </BaseMenu.CheckboxItemIndicator>
          {children}
        </div>
      </BaseMenu.CheckboxItem>
    );
  }
);

CheckboxItem.displayName = 'Menu.CheckboxItem';

export interface MenuSubmenuTriggerProps
  extends Omit<React.ComponentProps<typeof BaseMenu.SubmenuTrigger>, 'className'> {
  className?: string;
}

const SubmenuTrigger = React.forwardRef<HTMLDivElement, MenuSubmenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { size, variant, color } = useMenuContext();

    return (
      <BaseMenu.SubmenuTrigger
        ref={ref}
        className={cn(
          menuItemVariants({ size }),
          sheetVariants({ variant, color, interactive: true }),
          'data-[highlighted]:brightness-95',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between w-full">
          {children}
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-auto"
          >
            <path
              d="M4.5 3L7.5 6L4.5 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </BaseMenu.SubmenuTrigger>
    );
  }
);

SubmenuTrigger.displayName = 'Menu.SubmenuTrigger';

export const Menu = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  Separator,
  Group,
  GroupLabel,
  RadioGroup,
  RadioItem,
  CheckboxItem,
  SubmenuTrigger,
};

export {
  menuPopupVariants,
  menuItemVariants,
  menuSeparatorVariants,
  menuGroupLabelVariants,
};
