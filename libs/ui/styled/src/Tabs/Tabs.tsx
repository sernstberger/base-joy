import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

interface TabsContextValue {
  variant: Variant;
  color: ColorScale;
  size: Size;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs.Root');
  }
  return context;
};

const tabListVariants = cva(
  'inline-flex items-center gap-1 p-1 rounded-lg border border-neutral-200 bg-neutral-50',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      size: {
        sm: 'gap-0.5 p-0.5',
        md: 'gap-1 p-1',
        lg: 'gap-1.5 p-1.5',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

const tabVariants = cva(
  'relative inline-flex items-center justify-center font-medium transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none data-[active]:z-10',
  {
    variants: {
      size: {
        sm: 'h-7 px-3 text-sm gap-1.5',
        md: 'h-9 px-4 text-base gap-2',
        lg: 'h-11 px-5 text-lg gap-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const tabIndicatorVariants = cva(
  'absolute transition-all duration-200 ease-out rounded-md pointer-events-none',
  {
    variants: {
      orientation: {
        horizontal:
          'top-0 h-full left-[var(--active-tab-left)] w-[var(--active-tab-width)]',
        vertical:
          'left-0 w-full top-[var(--active-tab-top)] h-[var(--active-tab-height)]',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const tabPanelVariants = cva('outline-none', {
  variants: {
    size: {
      sm: 'mt-3',
      md: 'mt-4',
      lg: 'mt-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface TabsRootProps
  extends Omit<React.ComponentProps<typeof BaseTabs.Root>, 'className'> {
  /**
   * The visual style of the tabs.
   * @default 'soft'
   */
  variant?: Variant;
  /**
   * The color scheme of the tabs.
   * @default 'primary'
   */
  color?: ColorScale;
  /**
   * The size of the tabs.
   * @default 'md'
   */
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, TabsRootProps>(
  (
    {
      className,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      children,
      ...props
    },
    ref
  ) => {
    const { color, variant } = useResolvedColorProps(
      colorProp,
      variantProp,
      'primary',
      'soft'
    );

    const size = useResolvedSizeProps(sizeProp, 'md');

    const contextValue: TabsContextValue = React.useMemo(
      () => ({ variant, color, size }),
      [variant, color, size]
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <BaseTabs.Root ref={ref} className={cn(className)} {...props}>
          {children}
        </BaseTabs.Root>
      </TabsContext.Provider>
    );
  }
);

Root.displayName = 'Tabs.Root';

export interface TabsListProps
  extends Omit<React.ComponentProps<typeof BaseTabs.List>, 'className'> {
  className?: string;
}

const List = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useTabsContext();

    return (
      <BaseTabs.List
        ref={ref}
        className={cn(tabListVariants({ size }), className)}
        {...props}
      >
        {children}
      </BaseTabs.List>
    );
  }
);

List.displayName = 'Tabs.List';

export interface TabsTabProps
  extends Omit<React.ComponentProps<typeof BaseTabs.Tab>, 'className'> {
  className?: string;
}

const Tab = React.forwardRef<HTMLButtonElement, TabsTabProps>(
  ({ className, children, ...props }, ref) => {
    const { variant, color, size } = useTabsContext();

    return (
      <BaseTabs.Tab
        ref={ref}
        className={cn(
          sheetVariants({ variant, color, interactive: true }),
          tabVariants({ size }),
          className
        )}
        {...props}
      >
        {children}
      </BaseTabs.Tab>
    );
  }
);

Tab.displayName = 'Tabs.Tab';

export interface TabsIndicatorProps
  extends Omit<React.ComponentProps<typeof BaseTabs.Indicator>, 'className'> {
  className?: string;
}

const Indicator = React.forwardRef<HTMLSpanElement, TabsIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { variant, color } = useTabsContext();

    return (
      <BaseTabs.Indicator
        ref={ref}
        className={cn(
          tabIndicatorVariants(),
          sheetVariants({ variant, color }),
          className
        )}
        {...props}
      />
    );
  }
);

Indicator.displayName = 'Tabs.Indicator';

export interface TabsPanelProps
  extends Omit<React.ComponentProps<typeof BaseTabs.Panel>, 'className'> {
  className?: string;
}

const Panel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useTabsContext();

    return (
      <BaseTabs.Panel
        ref={ref}
        className={cn(tabPanelVariants({ size }), className)}
        {...props}
      >
        {children}
      </BaseTabs.Panel>
    );
  }
);

Panel.displayName = 'Tabs.Panel';

export const Tabs = {
  Root,
  List,
  Tab,
  Indicator,
  Panel,
};

export {
  tabListVariants,
  tabVariants,
  tabIndicatorVariants,
  tabPanelVariants,
};
