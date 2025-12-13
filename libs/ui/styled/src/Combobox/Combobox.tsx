import * as React from 'react';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';

const comboboxInputVariants = cva(
  'flex-1 bg-transparent outline-none placeholder:text-neutral-400',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
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

const comboboxTriggerVariants = cva(
  'inline-flex items-center justify-center transition-colors hover:bg-neutral-100',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const comboboxPopupVariants = cva(
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

const comboboxItemVariants = cva(
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

interface ComboboxContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const ComboboxContext = React.createContext<ComboboxContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'outlined',
});

const useComboboxContext = () => React.useContext(ComboboxContext);

export interface ComboboxRootProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Root>, 'className'> {
  variant?: Variant;
  color?: ColorScale;
  /**
   * The size of the combobox.
   * @default 'md'
   */
  size?: Size;
}

const Root = ({
  variant = 'outlined',
  color = 'neutral',
  size: sizeProp,
  ...props
}: ComboboxRootProps) => {
  // Resolve size from context (inherits from parent Sheet)
  const size = useResolvedSizeProps(sizeProp, 'md');

  return (
    <ComboboxContext.Provider value={{ size, color, variant }}>
      <BaseCombobox.Root {...props} />
    </ComboboxContext.Provider>
  );
};

Root.displayName = 'Combobox.Root';

export interface ComboboxInputProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Input>, 'className'> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const { size, variant, color } = useComboboxContext();

    return (
      <div
        className={cn(
          'inline-flex items-center rounded-lg',
          variant === 'outlined' && 'border',
          sheetVariants({ variant, color, interactive: true, focusWithin: true })
        )}
      >
        <BaseCombobox.Input
          ref={ref}
          disabled={disabled}
          className={cn(comboboxInputVariants({ size, disabled }), className)}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Combobox.Input';

export interface ComboboxTriggerProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useComboboxContext();

    return (
      <BaseCombobox.Trigger
        ref={ref}
        className={cn(comboboxTriggerVariants({ size }), className)}
        {...props}
      >
        {children ?? (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-50"
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
      </BaseCombobox.Trigger>
    );
  }
);

Trigger.displayName = 'Combobox.Trigger';

export interface ComboboxPortalProps
  extends React.ComponentProps<typeof BaseCombobox.Portal> {}

const Portal = BaseCombobox.Portal;
Portal.displayName = 'Combobox.Portal';

export interface ComboboxPositionerProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Positioner>, 'className'> {
  className?: string;
}

const Positioner = React.forwardRef<HTMLDivElement, ComboboxPositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseCombobox.Positioner
        ref={ref}
        className={cn('outline-none', className)}
        {...props}
      />
    );
  }
);

Positioner.displayName = 'Combobox.Positioner';

export interface ComboboxPopupProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Popup>, 'className'> {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, ComboboxPopupProps>(
  ({ className, ...props }, ref) => {
    const { size } = useComboboxContext();

    return (
      <BaseCombobox.Popup
        ref={ref}
        className={cn(comboboxPopupVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Popup.displayName = 'Combobox.Popup';

export interface ComboboxListProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.List>, 'className'> {
  className?: string;
}

const List = React.forwardRef<HTMLDivElement, ComboboxListProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseCombobox.List
        ref={ref}
        className={cn('max-h-[300px] overflow-auto', className)}
        {...props}
      />
    );
  }
);

List.displayName = 'Combobox.List';

export interface ComboboxItemProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Item>, 'className'> {
  className?: string;
}

const Item = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  ({ className, ...props }, ref) => {
    const { size } = useComboboxContext();

    return (
      <BaseCombobox.Item
        ref={ref}
        className={cn(comboboxItemVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Item.displayName = 'Combobox.Item';

export interface ComboboxItemIndicatorProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.ItemIndicator>, 'className'> {
  className?: string;
}

const ItemIndicator = React.forwardRef<HTMLSpanElement, ComboboxItemIndicatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseCombobox.ItemIndicator
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
      </BaseCombobox.ItemIndicator>
    );
  }
);

ItemIndicator.displayName = 'Combobox.ItemIndicator';

export interface ComboboxItemTextProps {
  children?: React.ReactNode;
  className?: string;
}

const ItemText = ({ className, children }: ComboboxItemTextProps) => {
  return <span className={cn(className)}>{children}</span>;
};

ItemText.displayName = 'Combobox.ItemText';

export interface ComboboxEmptyProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Empty>, 'className'> {
  className?: string;
}

const Empty = React.forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseCombobox.Empty
        ref={ref}
        className={cn('py-6 text-center text-sm text-neutral-500', className)}
        {...props}
      />
    );
  }
);

Empty.displayName = 'Combobox.Empty';

export interface ComboboxGroupProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Group>, 'className'> {
  className?: string;
}

const Group = React.forwardRef<HTMLDivElement, ComboboxGroupProps>(
  ({ className, ...props }, ref) => {
    return <BaseCombobox.Group ref={ref} className={cn(className)} {...props} />;
  }
);

Group.displayName = 'Combobox.Group';

export interface ComboboxGroupLabelProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.GroupLabel>, 'className'> {
  className?: string;
}

const GroupLabel = React.forwardRef<HTMLDivElement, ComboboxGroupLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseCombobox.GroupLabel
        ref={ref}
        className={cn('px-2 py-1.5 text-sm font-semibold text-neutral-500', className)}
        {...props}
      />
    );
  }
);

GroupLabel.displayName = 'Combobox.GroupLabel';

export interface ComboboxClearProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Clear>, 'className'> {
  className?: string;
}

const Clear = React.forwardRef<HTMLButtonElement, ComboboxClearProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseCombobox.Clear
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded p-1 opacity-70 hover:opacity-100 transition-opacity',
          className
        )}
        {...props}
      >
        {children ?? (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </BaseCombobox.Clear>
    );
  }
);

Clear.displayName = 'Combobox.Clear';

export const Combobox = {
  Root,
  Input,
  Trigger,
  Portal,
  Positioner,
  Popup,
  List,
  Item,
  ItemIndicator,
  ItemText,
  Empty,
  Group,
  GroupLabel,
  Clear,
};

export {
  comboboxInputVariants,
  comboboxTriggerVariants,
  comboboxPopupVariants,
  comboboxItemVariants,
};
