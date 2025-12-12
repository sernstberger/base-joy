import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import {
  ItemContext,
  useItemContext,
  itemEndVariants,
  itemDescriptionVariants,
  type ItemProps as BaseItemProps,
  type ItemEndProps as BaseItemEndProps,
  type ItemDescriptionProps as BaseItemDescriptionProps,
} from '@base-joy/ui-unstyled';
import { sheetVariants } from '../Sheet';

interface StyledItemContextValue {
  variant: Variant;
  color: ColorScale;
  size: Size;
}

const StyledItemContext = React.createContext<StyledItemContextValue>({
  variant: 'soft',
  color: 'neutral',
  size: 'md',
});

const useStyledItemContext = () => React.useContext(StyledItemContext);

const styledItemVariants = cva('', {
  variants: {
    interactive: {
      true: 'cursor-pointer transition-colors',
      false: '',
    },
    selected: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
      false: '',
    },
    variant: {
      solid: '',
      soft: '',
      outlined: '',
      plain: '',
    },
    color: {
      primary: '',
      neutral: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    // Interactive hover states for soft variant
    { interactive: true, variant: 'soft', color: 'primary', className: 'hover:bg-primary-200 active:bg-primary-300' },
    { interactive: true, variant: 'soft', color: 'neutral', className: 'hover:bg-neutral-200 active:bg-neutral-300' },
    { interactive: true, variant: 'soft', color: 'success', className: 'hover:bg-success-200 active:bg-success-300' },
    { interactive: true, variant: 'soft', color: 'warning', className: 'hover:bg-warning-200 active:bg-warning-300' },
    { interactive: true, variant: 'soft', color: 'danger', className: 'hover:bg-danger-200 active:bg-danger-300' },

    // Interactive hover states for outlined variant
    { interactive: true, variant: 'outlined', color: 'primary', className: 'hover:bg-primary-50 active:bg-primary-100' },
    { interactive: true, variant: 'outlined', color: 'neutral', className: 'hover:bg-neutral-50 active:bg-neutral-100' },
    { interactive: true, variant: 'outlined', color: 'success', className: 'hover:bg-success-50 active:bg-success-100' },
    { interactive: true, variant: 'outlined', color: 'warning', className: 'hover:bg-warning-50 active:bg-warning-100' },
    { interactive: true, variant: 'outlined', color: 'danger', className: 'hover:bg-danger-50 active:bg-danger-100' },

    // Interactive hover states for plain variant
    { interactive: true, variant: 'plain', color: 'primary', className: 'hover:bg-primary-50 active:bg-primary-100' },
    { interactive: true, variant: 'plain', color: 'neutral', className: 'hover:bg-neutral-50 active:bg-neutral-100' },
    { interactive: true, variant: 'plain', color: 'success', className: 'hover:bg-success-50 active:bg-success-100' },
    { interactive: true, variant: 'plain', color: 'warning', className: 'hover:bg-warning-50 active:bg-warning-100' },
    { interactive: true, variant: 'plain', color: 'danger', className: 'hover:bg-danger-50 active:bg-danger-100' },

    // Interactive hover states for solid variant
    { interactive: true, variant: 'solid', color: 'primary', className: 'hover:bg-primary-600 active:bg-primary-700' },
    { interactive: true, variant: 'solid', color: 'neutral', className: 'hover:bg-neutral-700 active:bg-neutral-600' },
    { interactive: true, variant: 'solid', color: 'success', className: 'hover:bg-success-600 active:bg-success-700' },
    { interactive: true, variant: 'solid', color: 'warning', className: 'hover:bg-warning-600 active:bg-warning-700' },
    { interactive: true, variant: 'solid', color: 'danger', className: 'hover:bg-danger-600 active:bg-danger-700' },

    // Selected states for soft variant
    { selected: true, variant: 'soft', color: 'primary', className: 'bg-primary-200' },
    { selected: true, variant: 'soft', color: 'neutral', className: 'bg-neutral-200' },
    { selected: true, variant: 'soft', color: 'success', className: 'bg-success-200' },
    { selected: true, variant: 'soft', color: 'warning', className: 'bg-warning-200' },
    { selected: true, variant: 'soft', color: 'danger', className: 'bg-danger-200' },

    // Selected states for outlined variant
    { selected: true, variant: 'outlined', color: 'primary', className: 'bg-primary-50' },
    { selected: true, variant: 'outlined', color: 'neutral', className: 'bg-neutral-50' },
    { selected: true, variant: 'outlined', color: 'success', className: 'bg-success-50' },
    { selected: true, variant: 'outlined', color: 'warning', className: 'bg-warning-50' },
    { selected: true, variant: 'outlined', color: 'danger', className: 'bg-danger-50' },

    // Selected states for plain variant
    { selected: true, variant: 'plain', color: 'primary', className: 'bg-primary-50' },
    { selected: true, variant: 'plain', color: 'neutral', className: 'bg-neutral-50' },
    { selected: true, variant: 'plain', color: 'success', className: 'bg-success-50' },
    { selected: true, variant: 'plain', color: 'warning', className: 'bg-warning-50' },
    { selected: true, variant: 'plain', color: 'danger', className: 'bg-danger-50' },

    // Selected + interactive compound hover states for soft
    { selected: true, interactive: true, variant: 'soft', color: 'primary', className: 'hover:bg-primary-300 active:bg-primary-400' },
    { selected: true, interactive: true, variant: 'soft', color: 'neutral', className: 'hover:bg-neutral-300 active:bg-neutral-400' },
    { selected: true, interactive: true, variant: 'soft', color: 'success', className: 'hover:bg-success-300 active:bg-success-400' },
    { selected: true, interactive: true, variant: 'soft', color: 'warning', className: 'hover:bg-warning-300 active:bg-warning-400' },
    { selected: true, interactive: true, variant: 'soft', color: 'danger', className: 'hover:bg-danger-300 active:bg-danger-400' },

    // Selected + interactive compound hover states for outlined
    { selected: true, interactive: true, variant: 'outlined', color: 'primary', className: 'hover:bg-primary-100 active:bg-primary-200' },
    { selected: true, interactive: true, variant: 'outlined', color: 'neutral', className: 'hover:bg-neutral-100 active:bg-neutral-200' },
    { selected: true, interactive: true, variant: 'outlined', color: 'success', className: 'hover:bg-success-100 active:bg-success-200' },
    { selected: true, interactive: true, variant: 'outlined', color: 'warning', className: 'hover:bg-warning-100 active:bg-warning-200' },
    { selected: true, interactive: true, variant: 'outlined', color: 'danger', className: 'hover:bg-danger-100 active:bg-danger-200' },

    // Selected + interactive compound hover states for plain
    { selected: true, interactive: true, variant: 'plain', color: 'primary', className: 'hover:bg-primary-100 active:bg-primary-200' },
    { selected: true, interactive: true, variant: 'plain', color: 'neutral', className: 'hover:bg-neutral-100 active:bg-neutral-200' },
    { selected: true, interactive: true, variant: 'plain', color: 'success', className: 'hover:bg-success-100 active:bg-success-200' },
    { selected: true, interactive: true, variant: 'plain', color: 'warning', className: 'hover:bg-warning-100 active:bg-warning-200' },
    { selected: true, interactive: true, variant: 'plain', color: 'danger', className: 'hover:bg-danger-100 active:bg-danger-200' },
  ],
  defaultVariants: {
    interactive: false,
    selected: false,
    disabled: false,
    variant: 'soft',
    color: 'neutral',
  },
});

const styledItemDescriptionVariants = cva('', {
  variants: {
    variant: {
      solid: 'text-inherit opacity-80',
      soft: '',
      outlined: '',
      plain: '',
    },
    color: {
      primary: '',
      neutral: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    // Soft variant - use color-aware muted text
    { variant: 'soft', color: 'primary', className: 'text-primary-700' },
    { variant: 'soft', color: 'neutral', className: 'text-neutral-600' },
    { variant: 'soft', color: 'success', className: 'text-success-700' },
    { variant: 'soft', color: 'warning', className: 'text-warning-700' },
    { variant: 'soft', color: 'danger', className: 'text-danger-700' },

    // Outlined variant - use color-aware muted text
    { variant: 'outlined', color: 'primary', className: 'text-primary-600' },
    { variant: 'outlined', color: 'neutral', className: 'text-neutral-600' },
    { variant: 'outlined', color: 'success', className: 'text-success-600' },
    { variant: 'outlined', color: 'warning', className: 'text-warning-600' },
    { variant: 'outlined', color: 'danger', className: 'text-danger-600' },

    // Plain variant - use color-aware muted text
    { variant: 'plain', color: 'primary', className: 'text-primary-600' },
    { variant: 'plain', color: 'neutral', className: 'text-neutral-600' },
    { variant: 'plain', color: 'success', className: 'text-success-600' },
    { variant: 'plain', color: 'warning', className: 'text-warning-600' },
    { variant: 'plain', color: 'danger', className: 'text-danger-600' },
  ],
  defaultVariants: {
    variant: 'soft',
    color: 'neutral',
  },
});

const styledItemEndVariants = cva('', {
  variants: {
    variant: {
      solid: 'text-inherit opacity-70',
      soft: '',
      outlined: '',
      plain: '',
    },
    color: {
      primary: '',
      neutral: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    // Soft variant - use color-aware muted text
    { variant: 'soft', color: 'primary', className: 'text-primary-600' },
    { variant: 'soft', color: 'neutral', className: 'text-neutral-500' },
    { variant: 'soft', color: 'success', className: 'text-success-600' },
    { variant: 'soft', color: 'warning', className: 'text-warning-600' },
    { variant: 'soft', color: 'danger', className: 'text-danger-600' },

    // Outlined variant - use color-aware muted text
    { variant: 'outlined', color: 'primary', className: 'text-primary-500' },
    { variant: 'outlined', color: 'neutral', className: 'text-neutral-500' },
    { variant: 'outlined', color: 'success', className: 'text-success-500' },
    { variant: 'outlined', color: 'warning', className: 'text-warning-500' },
    { variant: 'outlined', color: 'danger', className: 'text-danger-500' },

    // Plain variant - use color-aware muted text
    { variant: 'plain', color: 'primary', className: 'text-primary-500' },
    { variant: 'plain', color: 'neutral', className: 'text-neutral-500' },
    { variant: 'plain', color: 'success', className: 'text-success-500' },
    { variant: 'plain', color: 'warning', className: 'text-warning-500' },
    { variant: 'plain', color: 'danger', className: 'text-danger-500' },
  ],
  defaultVariants: {
    variant: 'soft',
    color: 'neutral',
  },
});

export interface ItemProps extends Omit<BaseItemProps, 'interactive' | 'selected' | 'disabled'> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  interactive?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export interface ItemEndProps extends BaseItemEndProps {}

export interface ItemDescriptionProps extends BaseItemDescriptionProps {}

const sizeVariants = cva('', {
  variants: {
    size: {
      sm: 'py-1.5 px-2 text-sm',
      md: 'py-2 px-3 text-base',
      lg: 'py-3 px-4 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      className,
      variant = 'soft',
      color = 'neutral',
      size = 'md',
      interactive = false,
      selected = false,
      disabled = false,
      render,
      children,
      ...props
    },
    ref
  ) => {
    const itemClassName = cn(
      'flex items-center gap-3 w-full rounded-lg transition-colors',
      sheetVariants({ variant, color }),
      // Override Sheet padding since we handle it with size
      'p-0',
      sizeVariants({ size }),
      styledItemVariants({ interactive, selected, disabled, variant, color }),
      className
    );

    const content = (
      <StyledItemContext.Provider value={{ variant, color, size }}>
        <ItemContext.Provider value={{ size }}>
          {children}
        </ItemContext.Provider>
      </StyledItemContext.Provider>
    );

    if (render) {
      const renderProps = render.props as { className?: string };
      return React.cloneElement(render, {
        ref,
        className: cn(itemClassName, renderProps.className),
        'aria-disabled': disabled || undefined,
        ...props,
        children: content,
      } as React.HTMLAttributes<HTMLElement>);
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

export const ItemEnd = React.forwardRef<HTMLSpanElement, ItemEndProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const { variant, color } = useStyledItemContext();
    const size = sizeProp ?? contextSize;

    return (
      <span
        ref={ref}
        className={cn(
          itemEndVariants({ size }),
          styledItemEndVariants({ variant, color }),
          className
        )}
        {...props}
      />
    );
  }
);

ItemEnd.displayName = 'ItemEnd';

export const ItemDescription = React.forwardRef<HTMLParagraphElement, ItemDescriptionProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useItemContext();
    const { variant, color } = useStyledItemContext();
    const size = sizeProp ?? contextSize;

    return (
      <p
        ref={ref}
        className={cn(
          itemDescriptionVariants({ size }),
          styledItemDescriptionVariants({ variant, color }),
          className
        )}
        {...props}
      />
    );
  }
);

ItemDescription.displayName = 'ItemDescription';

export {
  styledItemVariants,
  styledItemDescriptionVariants,
  styledItemEndVariants,
  StyledItemContext,
  useStyledItemContext,
};
