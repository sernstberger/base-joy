import * as React from 'react';
import { NavLink, useMatch } from 'react-router';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';
import { List, ListItem, type ListProps } from '../List';
import { ItemStart, ItemContent, ItemEnd } from '../Item';
import { Accordion } from '../Accordion';
import { useResolvedSizeProps } from '../SizeContext';

// Context for NavList
interface NavListContextValue {
  size: Size;
}

const NavListContext = React.createContext<NavListContextValue>({
  size: 'md',
});

const useNavListContext = () => React.useContext(NavListContext);

// NavList - navigation list container
export interface NavListProps extends Omit<ListProps, 'variant' | 'color'> {
  /**
   * The size of navigation items.
   * @default 'md'
   */
  size?: Size;
}

export const NavList = React.forwardRef<HTMLUListElement, NavListProps>(
  ({ className, size: sizeProp, spacing = 'sm', children, ...props }, ref) => {
    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

    return (
      <NavListContext.Provider value={{ size }}>
        <List
          ref={ref}
          variant="plain"
          color="neutral"
          size={size}
          spacing={spacing}
          className={className}
          {...props}
        >
          {children}
        </List>
      </NavListContext.Provider>
    );
  }
);

NavList.displayName = 'NavList';

// NavListItem - always renders as a link with active state detection
export interface NavListItemProps {
  /**
   * The route path to navigate to.
   */
  to: string;
  /**
   * Optional icon displayed at the start.
   */
  icon?: React.ReactNode;
  /**
   * Optional badge/content displayed at the end.
   */
  badge?: React.ReactNode;
  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The label text for the navigation item.
   */
  children: React.ReactNode;
  /**
   * Additional class names.
   */
  className?: string;
}

export const NavListItem = React.forwardRef<HTMLLIElement, NavListItemProps>(
  ({ to, icon, badge, disabled = false, children, className }, ref) => {
    const { size } = useNavListContext();
    const isActive = !!useMatch(to);

    return (
      <ListItem
        ref={ref}
        render={disabled ? undefined : <NavLink to={to} />}
        interactive={!disabled}
        selected={isActive}
        disabled={disabled}
        color={isActive ? 'primary' : 'neutral'}
        variant="plain"
        size={size}
        className={className}
      >
        {icon && <ItemStart>{icon}</ItemStart>}
        <ItemContent>{children}</ItemContent>
        {badge && <ItemEnd>{badge}</ItemEnd>}
      </ListItem>
    );
  }
);

NavListItem.displayName = 'NavListItem';

// NavListGroup - collapsible section using Accordion
export interface NavListGroupProps {
  /**
   * Whether the group is open by default.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Unique value for the accordion item.
   */
  value?: string;
  children: React.ReactNode;
}

export const NavListGroup = React.forwardRef<HTMLDivElement, NavListGroupProps>(
  ({ defaultOpen = false, value = 'group', children }, ref) => {
    return (
      <Accordion.Root
        ref={ref}
        defaultValue={defaultOpen ? [value] : []}
        className="w-full"
      >
        <Accordion.Item value={value}>{children}</Accordion.Item>
      </Accordion.Root>
    );
  }
);

NavListGroup.displayName = 'NavListGroup';

// NavListGroupTrigger variants
export const navListGroupTriggerVariants = cva(
  'flex w-full items-center gap-2 text-left transition-colors cursor-pointer rounded-md',
  {
    variants: {
      size: {
        sm: 'py-1.5 px-2 text-xs font-semibold uppercase tracking-wider',
        md: 'py-2 px-3 text-sm font-semibold uppercase tracking-wider',
        lg: 'py-2.5 px-4 text-sm font-semibold uppercase tracking-wider',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// NavListGroupTrigger - expandable header
export interface NavListGroupTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Optional icon displayed at the start.
   */
  icon?: React.ReactNode;
  /**
   * The label text for the group.
   */
  children: React.ReactNode;
}

export const NavListGroupTrigger = React.forwardRef<
  HTMLButtonElement,
  NavListGroupTriggerProps
>(({ icon, children, className, ...props }, ref) => {
  const { size } = useNavListContext();

  return (
    <Accordion.Header>
      <Accordion.Trigger
        ref={ref}
        className={cn(
          navListGroupTriggerVariants({ size }),
          'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50',
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
      </Accordion.Trigger>
    </Accordion.Header>
  );
});

NavListGroupTrigger.displayName = 'NavListGroupTrigger';

// NavListGroupContent - nested items container
export interface NavListGroupContentProps {
  children: React.ReactNode;
  className?: string;
}

export const NavListGroupContent = React.forwardRef<
  HTMLDivElement,
  NavListGroupContentProps
>(({ children, className }, ref) => {
  const { size } = useNavListContext();

  return (
    <Accordion.Panel ref={ref} className={className}>
      <NavListContext.Provider value={{ size }}>
        <List variant="plain" color="neutral" size={size} spacing="sm">
          {children}
        </List>
      </NavListContext.Provider>
    </Accordion.Panel>
  );
});

NavListGroupContent.displayName = 'NavListGroupContent';

export { NavListContext, useNavListContext };
