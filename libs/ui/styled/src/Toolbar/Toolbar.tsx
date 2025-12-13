import * as React from 'react';
import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import { separatorVariants } from '../Separator';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { useResolvedColorProps, getSolidContainerStyles } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const {
  Root: BaseRoot,
  Button: BaseButton,
  Link: BaseLink,
  Separator: BaseSeparator,
  Group: BaseGroup,
} = BaseToolbar;

export interface ToolbarContextValue {
  variant: Variant;
  color: ColorScale;
  size: Size;
}

const ToolbarContext = React.createContext<ToolbarContextValue | undefined>(undefined);

const useToolbarContext = () => {
  const context = React.useContext(ToolbarContext);
  if (!context) {
    throw new Error('Toolbar components must be used within a Toolbar.Root');
  }
  return context;
};

const toolbarRootVariants = cva('inline-flex items-center gap-1', {
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

const toolbarButtonVariants = cva(
  'inline-flex items-center justify-center font-medium cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 py-1.5 text-sm gap-1.5',
        md: 'h-10 px-3 py-2 text-base gap-2',
        lg: 'h-12 px-4 py-3 text-lg gap-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const toolbarLinkVariants = cva(
  'inline-flex items-center justify-center font-medium cursor-pointer transition-colors no-underline hover:underline disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 py-1.5 text-sm gap-1.5',
        md: 'h-10 px-3 py-2 text-base gap-2',
        lg: 'h-12 px-4 py-3 text-lg gap-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const toolbarSeparatorVariants = cva('shrink-0', {
  variants: {
    orientation: {
      horizontal: 'h-full w-px',
      vertical: 'h-px w-full',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const toolbarGroupVariants = cva('inline-flex', {
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

export interface ToolbarRootProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseRoot>, 'className'> {
  /**
   * The visual style of the toolbar.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the toolbar.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the toolbar.
   * @default 'md'
   */
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, ToolbarRootProps>(
  (
    {
      className,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      orientation,
      children,
      ...props
    },
    ref
  ) => {
    const { color, variant } = useResolvedColorProps(
      colorProp,
      variantProp,
      'neutral',
      'outlined'
    );

    const size = useResolvedSizeProps(sizeProp, 'md');

    const contextValue: ToolbarContextValue = React.useMemo(
      () => ({ variant, color, size }),
      [variant, color, size]
    );

    return (
      <ToolbarContext.Provider value={contextValue}>
        <BaseRoot
          ref={ref}
          orientation={orientation}
          className={cn(
            sheetVariants({ variant, color }),
            toolbarRootVariants({ orientation, size }),
            className
          )}
          {...props}
        >
          {children}
        </BaseRoot>
      </ToolbarContext.Provider>
    );
  }
);

Root.displayName = 'Toolbar.Root';

export interface ToolbarButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /**
   * The visual style of the button.
   */
  variant?: Variant;
  /**
   * The color scheme of the button.
   */
  color?: ColorScale;
  /**
   * The size of the button.
   */
  size?: Size;
}

const Button = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    {
      className,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      ...props
    },
    ref
  ) => {
    const toolbarContext = useToolbarContext();

    const { color, variant, isInsideSolid } = useResolvedColorProps(
      colorProp ?? toolbarContext.color,
      variantProp ?? toolbarContext.variant,
      'neutral',
      'outlined'
    );

    const size = useResolvedSizeProps(sizeProp ?? toolbarContext.size, 'md');

    return (
      <BaseButton
        ref={ref}
        className={cn(
          sheetVariants({ variant, color, interactive: true }),
          toolbarButtonVariants({ size }),
          isInsideSolid && getSolidContainerStyles(variant, true),
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Toolbar.Button';

export interface ToolbarLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /**
   * The visual style of the link.
   */
  variant?: Variant;
  /**
   * The color scheme of the link.
   */
  color?: ColorScale;
  /**
   * The size of the link.
   */
  size?: Size;
}

const Link = React.forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  (
    {
      className,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      ...props
    },
    ref
  ) => {
    const toolbarContext = useToolbarContext();

    const { color, variant, isInsideSolid } = useResolvedColorProps(
      colorProp ?? toolbarContext.color,
      variantProp ?? toolbarContext.variant,
      'neutral',
      'outlined'
    );

    const size = useResolvedSizeProps(sizeProp ?? toolbarContext.size, 'md');

    return (
      <BaseLink
        ref={ref}
        className={cn(
          sheetVariants({ variant, color, interactive: true }),
          toolbarLinkVariants({ size }),
          isInsideSolid && getSolidContainerStyles(variant, true),
          className
        )}
        {...props}
      />
    );
  }
);

Link.displayName = 'Toolbar.Link';

export interface ToolbarSeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSeparator>, 'className' | 'children'> {
  /**
   * The color scheme of the separator.
   */
  color?: ColorScale;
  className?: string;
}

const Separator = React.forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  (
    {
      className,
      color: colorProp,
      orientation,
      ...props
    },
    ref
  ) => {
    const toolbarContext = useToolbarContext();

    const { color } = useResolvedColorProps(
      colorProp ?? toolbarContext.color,
      undefined,
      'neutral',
      undefined
    );

    return (
      <BaseSeparator
        ref={ref}
        orientation={orientation}
        className={cn(
          separatorVariants({ orientation, color }),
          toolbarSeparatorVariants({ orientation }),
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Toolbar.Separator';

export interface ToolbarGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseGroup>, 'className'> {
  /**
   * The visual style of the group.
   */
  variant?: Variant;
  /**
   * The color scheme of the group.
   */
  color?: ColorScale;
  /**
   * The size of the group.
   */
  size?: Size;
  /**
   * The orientation of the group layout.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Group = React.forwardRef<HTMLDivElement, ToolbarGroupProps>(
  (
    {
      className,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      orientation,
      children,
      ...props
    },
    ref
  ) => {
    const toolbarContext = useToolbarContext();

    const { color, variant } = useResolvedColorProps(
      colorProp ?? toolbarContext.color,
      variantProp ?? toolbarContext.variant,
      'neutral',
      'outlined'
    );

    const size = useResolvedSizeProps(sizeProp ?? toolbarContext.size, 'md');

    const contextValue: ToolbarContextValue = React.useMemo(
      () => ({ variant, color, size }),
      [variant, color, size]
    );

    return (
      <ToolbarContext.Provider value={contextValue}>
        <BaseGroup
          ref={ref}
          className={cn(toolbarGroupVariants({ orientation, size }), className)}
          {...props}
        >
          {children}
        </BaseGroup>
      </ToolbarContext.Provider>
    );
  }
);

Group.displayName = 'Toolbar.Group';

export const Toolbar = {
  Root,
  Button,
  Link,
  Separator,
  Group,
};

export {
  toolbarRootVariants,
  toolbarButtonVariants,
  toolbarLinkVariants,
  toolbarSeparatorVariants,
  toolbarGroupVariants,
};
