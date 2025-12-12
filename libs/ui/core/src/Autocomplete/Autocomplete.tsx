import * as React from 'react';
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';

const autocompleteInputVariants = cva(
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

const autocompletePopupVariants = cva(
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

const autocompleteItemVariants = cva(
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

interface AutocompleteContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const AutocompleteContext = React.createContext<AutocompleteContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'outlined',
});

const useAutocompleteContext = () => React.useContext(AutocompleteContext);

export interface AutocompleteRootProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.Root>, 'className'> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
}

const Root = ({
  variant = 'outlined',
  color = 'neutral',
  size = 'md',
  ...props
}: AutocompleteRootProps) => {
  return (
    <AutocompleteContext.Provider value={{ size, color, variant }}>
      <BaseAutocomplete.Root {...props} />
    </AutocompleteContext.Provider>
  );
};

Root.displayName = 'Autocomplete.Root';

export interface AutocompleteInputProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.Input>, 'className'> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const { size, variant, color } = useAutocompleteContext();

    return (
      <div
        className={cn(
          'inline-flex items-center rounded-lg',
          variant === 'outlined' && 'border',
          sheetVariants({ variant, color })
        )}
      >
        <BaseAutocomplete.Input
          ref={ref}
          disabled={disabled}
          className={cn(autocompleteInputVariants({ size, disabled }), className)}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Autocomplete.Input';

export interface AutocompletePortalProps
  extends React.ComponentProps<typeof BaseAutocomplete.Portal> {}

const Portal = BaseAutocomplete.Portal;
Portal.displayName = 'Autocomplete.Portal';

export interface AutocompletePositionerProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.Positioner>, 'className'> {
  className?: string;
}

const Positioner = React.forwardRef<HTMLDivElement, AutocompletePositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAutocomplete.Positioner
        ref={ref}
        className={cn('outline-none', className)}
        {...props}
      />
    );
  }
);

Positioner.displayName = 'Autocomplete.Positioner';

export interface AutocompletePopupProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.Popup>, 'className'> {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, AutocompletePopupProps>(
  ({ className, ...props }, ref) => {
    const { size } = useAutocompleteContext();

    return (
      <BaseAutocomplete.Popup
        ref={ref}
        className={cn(autocompletePopupVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Popup.displayName = 'Autocomplete.Popup';

export interface AutocompleteListProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.List>, 'className'> {
  className?: string;
}

const List = React.forwardRef<HTMLDivElement, AutocompleteListProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAutocomplete.List
        ref={ref}
        className={cn('max-h-[300px] overflow-auto', className)}
        {...props}
      />
    );
  }
);

List.displayName = 'Autocomplete.List';

export interface AutocompleteItemProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.Item>, 'className'> {
  className?: string;
}

const Item = React.forwardRef<HTMLDivElement, AutocompleteItemProps>(
  ({ className, ...props }, ref) => {
    const { size } = useAutocompleteContext();

    return (
      <BaseAutocomplete.Item
        ref={ref}
        className={cn(autocompleteItemVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Item.displayName = 'Autocomplete.Item';

export interface AutocompleteItemIndicatorProps {
  children?: React.ReactNode;
  className?: string;
}

const ItemIndicator = React.forwardRef<HTMLSpanElement, AutocompleteItemIndicatorProps>(
  ({ className, children }, ref) => {
    return (
      <span ref={ref} className={cn('absolute right-2 h-4 w-4', className)}>
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
      </span>
    );
  }
);

ItemIndicator.displayName = 'Autocomplete.ItemIndicator';

export interface AutocompleteItemTextProps {
  children?: React.ReactNode;
  className?: string;
}

const ItemText = ({ className, children }: AutocompleteItemTextProps) => {
  return <span className={cn(className)}>{children}</span>;
};

ItemText.displayName = 'Autocomplete.ItemText';

export interface AutocompleteEmptyProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.Empty>, 'className'> {
  className?: string;
}

const Empty = React.forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAutocomplete.Empty
        ref={ref}
        className={cn('py-6 text-center text-sm text-neutral-500', className)}
        {...props}
      />
    );
  }
);

Empty.displayName = 'Autocomplete.Empty';

export interface AutocompleteGroupProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.Group>, 'className'> {
  className?: string;
}

const Group = React.forwardRef<HTMLDivElement, AutocompleteGroupProps>(
  ({ className, ...props }, ref) => {
    return <BaseAutocomplete.Group ref={ref} className={cn(className)} {...props} />;
  }
);

Group.displayName = 'Autocomplete.Group';

export interface AutocompleteGroupLabelProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.GroupLabel>, 'className'> {
  className?: string;
}

const GroupLabel = React.forwardRef<HTMLDivElement, AutocompleteGroupLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAutocomplete.GroupLabel
        ref={ref}
        className={cn('px-2 py-1.5 text-sm font-semibold text-neutral-500', className)}
        {...props}
      />
    );
  }
);

GroupLabel.displayName = 'Autocomplete.GroupLabel';

export const Autocomplete = {
  Root,
  Input,
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
};

export {
  autocompleteInputVariants,
  autocompletePopupVariants,
  autocompleteItemVariants,
};
