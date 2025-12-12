import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';

const selectTriggerVariants = cva(
  'inline-flex items-center justify-between gap-2 cursor-pointer transition-colors',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-sm min-w-[120px]',
        md: 'h-10 px-3 text-base min-w-[160px]',
        lg: 'h-12 px-4 text-lg min-w-[200px]',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
);

const selectPopupVariants = cva(
  'z-50 min-w-[8rem] overflow-hidden rounded-lg bg-white shadow-lg border border-neutral-200 p-1',
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

const selectItemVariants = cva(
  'relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 outline-none transition-colors data-[highlighted]:bg-neutral-100 data-[selected]:bg-primary-50 data-[selected]:text-primary-900 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
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

const selectGroupLabelVariants = cva(
  'px-2 py-1.5 font-semibold text-neutral-500',
  {
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
  }
);

interface SelectContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const SelectContext = React.createContext<SelectContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'outlined',
});

const useSelectContext = () => React.useContext(SelectContext);

export interface SelectRootProps
  extends Omit<React.ComponentProps<typeof BaseSelect.Root>, 'className'> {
  /**
   * The visual style of the select trigger.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the select.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the select.
   * @default 'md'
   */
  size?: Size;
}

const Root = ({ variant: variantProp, color: colorProp, size = 'md', ...props }: SelectRootProps) => {
  // Resolve color and variant from context (inherits from parent Sheet)
  const { color, variant } = useResolvedColorProps(
    colorProp,
    variantProp,
    'neutral', // defaultColor
    'outlined' // defaultVariant
  );

  return (
    <SelectContext.Provider value={{ size, color, variant }}>
      <BaseSelect.Root {...props} />
    </SelectContext.Provider>
  );
};

Root.displayName = 'Select.Root';

export interface SelectTriggerProps
  extends Omit<React.ComponentProps<typeof BaseSelect.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, disabled, ...props }, ref) => {
    const { size, variant, color } = useSelectContext();

    return (
      <BaseSelect.Trigger
        ref={ref}
        disabled={disabled}
        className={cn(
          'rounded-lg',
          variant === 'outlined' && 'border',
          sheetVariants({ variant, color, interactive: true }),
          selectTriggerVariants({ size, disabled }),
          className
        )}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'Select.Trigger';

export interface SelectValueProps
  extends Omit<React.ComponentProps<typeof BaseSelect.Value>, 'className' | 'children'> {
  className?: string;
  placeholder?: string;
  children?: React.ReactNode | ((value: unknown) => React.ReactNode);
}

const Value = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    return (
      <BaseSelect.Value
        ref={ref}
        className={cn('flex-1 text-left', className)}
        {...props}
      >
        {children ?? ((value: unknown) => (value != null ? String(value) : <span className="text-neutral-400">{placeholder}</span>))}
      </BaseSelect.Value>
    );
  }
);

Value.displayName = 'Select.Value';

export interface SelectIconProps
  extends Omit<React.ComponentProps<typeof BaseSelect.Icon>, 'className'> {
  className?: string;
}

const Icon = React.forwardRef<HTMLSpanElement, SelectIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseSelect.Icon
        ref={ref}
        className={cn('h-4 w-4 opacity-50', className)}
        {...props}
      >
        {children ?? (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </BaseSelect.Icon>
    );
  }
);

Icon.displayName = 'Select.Icon';

export interface SelectPortalProps
  extends React.ComponentProps<typeof BaseSelect.Portal> {}

const Portal = BaseSelect.Portal;
Portal.displayName = 'Select.Portal';

export interface SelectPositionerProps
  extends Omit<React.ComponentProps<typeof BaseSelect.Positioner>, 'className'> {
  className?: string;
}

const Positioner = React.forwardRef<HTMLDivElement, SelectPositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseSelect.Positioner
        ref={ref}
        className={cn('outline-none', className)}
        {...props}
      />
    );
  }
);

Positioner.displayName = 'Select.Positioner';

export interface SelectPopupProps
  extends Omit<React.ComponentProps<typeof BaseSelect.Popup>, 'className'> {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ className, ...props }, ref) => {
    const { size } = useSelectContext();

    return (
      <BaseSelect.Popup
        ref={ref}
        className={cn(selectPopupVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Popup.displayName = 'Select.Popup';

export interface SelectItemProps
  extends Omit<React.ComponentProps<typeof BaseSelect.Item>, 'className'> {
  className?: string;
}

const Item = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, ...props }, ref) => {
    const { size } = useSelectContext();

    return (
      <BaseSelect.Item
        ref={ref}
        className={cn(selectItemVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Item.displayName = 'Select.Item';

export interface SelectItemIndicatorProps
  extends Omit<React.ComponentProps<typeof BaseSelect.ItemIndicator>, 'className'> {
  className?: string;
}

const ItemIndicator = React.forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseSelect.ItemIndicator
        ref={ref}
        className={cn('absolute right-2 h-4 w-4', className)}
        {...props}
      >
        {children ?? (
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
        )}
      </BaseSelect.ItemIndicator>
    );
  }
);

ItemIndicator.displayName = 'Select.ItemIndicator';

export interface SelectItemTextProps
  extends Omit<React.ComponentProps<typeof BaseSelect.ItemText>, 'className'> {
  className?: string;
}

const ItemText = ({ className, ...props }: SelectItemTextProps) => {
  return <BaseSelect.ItemText className={cn(className)} {...props} />;
};

ItemText.displayName = 'Select.ItemText';

export interface SelectGroupProps
  extends Omit<React.ComponentProps<typeof BaseSelect.Group>, 'className'> {
  className?: string;
}

const Group = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => {
    return <BaseSelect.Group ref={ref} className={cn(className)} {...props} />;
  }
);

Group.displayName = 'Select.Group';

export interface SelectGroupLabelProps
  extends Omit<React.ComponentProps<typeof BaseSelect.GroupLabel>, 'className'> {
  className?: string;
}

const GroupLabel = React.forwardRef<HTMLDivElement, SelectGroupLabelProps>(
  ({ className, ...props }, ref) => {
    const { size } = useSelectContext();

    return (
      <BaseSelect.GroupLabel
        ref={ref}
        className={cn(selectGroupLabelVariants({ size }), className)}
        {...props}
      />
    );
  }
);

GroupLabel.displayName = 'Select.GroupLabel';

export const Select = {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Positioner,
  Popup,
  Item,
  ItemIndicator,
  ItemText,
  Group,
  GroupLabel,
};

export {
  selectTriggerVariants,
  selectPopupVariants,
  selectItemVariants,
  selectGroupLabelVariants,
};
