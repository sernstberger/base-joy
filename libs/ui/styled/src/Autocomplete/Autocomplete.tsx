import * as React from 'react';
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const autocompleteInputVariants = cva(
  'flex-1 bg-transparent outline-none',
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
      variant: {
        solid: 'placeholder:text-white/60',
        soft: 'placeholder:text-neutral-400',
        outlined: 'placeholder:text-neutral-400',
        plain: 'placeholder:text-neutral-400',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
      variant: 'outlined',
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

const autocompleteGroupLabelVariants = cva(
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

export interface AutocompleteOptionItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AutocompleteOptionGroup {
  group: string;
  options: AutocompleteOptionItem[];
}

export type AutocompleteOption = AutocompleteOptionItem | AutocompleteOptionGroup;

function isOptionGroup(option: AutocompleteOption): option is AutocompleteOptionGroup {
  return 'group' in option;
}

export interface AutocompleteProps
  extends Omit<React.ComponentProps<typeof BaseAutocomplete.Root>, 'className' | 'children'> {
  /**
   * The options to display in the autocomplete.
   */
  options: AutocompleteOption[];
  /**
   * Placeholder text when no value is entered.
   */
  placeholder?: string;
  /**
   * The visual style of the autocomplete input.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the autocomplete.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the autocomplete.
   * @default 'md'
   */
  size?: Size;
  /**
   * Whether the autocomplete is disabled.
   */
  disabled?: boolean;
  /**
   * Additional class name for the input element.
   */
  className?: string;
  /**
   * Custom render function for option items.
   */
  renderOption?: (option: AutocompleteOptionItem) => React.ReactNode;
  /**
   * Accessible label for the autocomplete input.
   */
  'aria-label'?: string;
  /**
   * ID of the element that labels this autocomplete.
   */
  'aria-labelledby'?: string;
  /**
   * Message to display when no options match the input.
   * @default 'No results found'
   */
  emptyMessage?: string;
}

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      placeholder,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      disabled,
      className,
      renderOption,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      emptyMessage = 'No results found',
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

    const renderOptionContent = (option: AutocompleteOptionItem) => {
      if (renderOption) {
        return renderOption(option);
      }
      return option.label;
    };

    const renderOptions = (opts: AutocompleteOption[]) => {
      return opts.map((option, index) => {
        if (isOptionGroup(option)) {
          return (
            <BaseAutocomplete.Group key={`group-${option.group}-${index}`}>
              <BaseAutocomplete.GroupLabel
                className={autocompleteGroupLabelVariants({ size })}
              >
                {option.group}
              </BaseAutocomplete.GroupLabel>
              {option.options.map((item) => (
                <BaseAutocomplete.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className={autocompleteItemVariants({ size })}
                >
                  {renderOptionContent(item)}
                  <span className="absolute right-2 h-4 w-4 data-[selected]:inline hidden">
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
                  </span>
                </BaseAutocomplete.Item>
              ))}
            </BaseAutocomplete.Group>
          );
        }

        return (
          <BaseAutocomplete.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={autocompleteItemVariants({ size })}
          >
            {renderOptionContent(option)}
            <span className="absolute right-2 h-4 w-4 data-[selected]:inline hidden">
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
            </span>
          </BaseAutocomplete.Item>
        );
      });
    };

    return (
      <BaseAutocomplete.Root disabled={disabled} {...props}>
        <div
          className={cn(
            'inline-flex items-center rounded-lg',
            variant === 'outlined' && 'border',
            variant === 'plain' && 'border-0',
            sheetVariants({ variant, color, interactive: true, focusWithin: true })
          )}
        >
          <BaseAutocomplete.Input
            ref={ref}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            placeholder={placeholder}
            className={cn(autocompleteInputVariants({ size, disabled, variant }), className)}
          />
        </div>

        <BaseAutocomplete.Portal>
          <BaseAutocomplete.Positioner className="outline-none">
            <BaseAutocomplete.Popup className={autocompletePopupVariants({ size })}>
              <BaseAutocomplete.List className="max-h-[300px] overflow-auto">
                {renderOptions(options)}
              </BaseAutocomplete.List>
              <BaseAutocomplete.Empty className="py-6 text-center text-sm text-neutral-500">
                {emptyMessage}
              </BaseAutocomplete.Empty>
            </BaseAutocomplete.Popup>
          </BaseAutocomplete.Positioner>
        </BaseAutocomplete.Portal>
      </BaseAutocomplete.Root>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';

export {
  autocompleteInputVariants,
  autocompletePopupVariants,
  autocompleteItemVariants,
  autocompleteGroupLabelVariants,
};
