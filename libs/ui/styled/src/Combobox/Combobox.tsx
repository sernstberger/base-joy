import * as React from 'react';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const comboboxInputVariants = cva(
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

const comboboxGroupLabelVariants = cva(
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

export interface ComboboxOptionItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxOptionGroup {
  group: string;
  options: ComboboxOptionItem[];
}

export type ComboboxOption = ComboboxOptionItem | ComboboxOptionGroup;

function isOptionGroup(option: ComboboxOption): option is ComboboxOptionGroup {
  return 'group' in option;
}

export interface ComboboxProps
  extends Omit<React.ComponentProps<typeof BaseCombobox.Root>, 'className' | 'children'> {
  /**
   * The options to display in the combobox.
   */
  options: ComboboxOption[];
  /**
   * Placeholder text when no value is entered.
   */
  placeholder?: string;
  /**
   * The visual style of the combobox input.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the combobox.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the combobox.
   * @default 'md'
   */
  size?: Size;
  /**
   * Whether the combobox is disabled.
   */
  disabled?: boolean;
  /**
   * Additional class name for the input element.
   */
  className?: string;
  /**
   * Custom render function for option items.
   */
  renderOption?: (option: ComboboxOptionItem) => React.ReactNode;
  /**
   * Accessible label for the combobox input.
   */
  'aria-label'?: string;
  /**
   * ID of the element that labels this combobox.
   */
  'aria-labelledby'?: string;
  /**
   * Message to display when no options match the input.
   * @default 'No results found'
   */
  emptyMessage?: string;
}

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
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

    const renderOptionContent = (option: ComboboxOptionItem) => {
      if (renderOption) {
        return renderOption(option);
      }
      return option.label;
    };

    const renderOptions = (opts: ComboboxOption[]) => {
      return opts.map((option, index) => {
        if (isOptionGroup(option)) {
          return (
            <BaseCombobox.Group key={`group-${option.group}-${index}`}>
              <BaseCombobox.GroupLabel
                className={comboboxGroupLabelVariants({ size })}
              >
                {option.group}
              </BaseCombobox.GroupLabel>
              {option.options.map((item) => (
                <BaseCombobox.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className={comboboxItemVariants({ size })}
                >
                  {renderOptionContent(item)}
                  <BaseCombobox.ItemIndicator className="absolute right-2 h-4 w-4">
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
                  </BaseCombobox.ItemIndicator>
                </BaseCombobox.Item>
              ))}
            </BaseCombobox.Group>
          );
        }

        return (
          <BaseCombobox.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={comboboxItemVariants({ size })}
          >
            {renderOptionContent(option)}
            <BaseCombobox.ItemIndicator className="absolute right-2 h-4 w-4">
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
            </BaseCombobox.ItemIndicator>
          </BaseCombobox.Item>
        );
      });
    };

    return (
      <BaseCombobox.Root disabled={disabled} {...props}>
        <div
          className={cn(
            'inline-flex items-center rounded-lg',
            variant === 'outlined' && 'border',
            variant === 'plain' && 'border-0',
            sheetVariants({ variant, color, interactive: true, focusWithin: true })
          )}
        >
          <BaseCombobox.Input
            ref={ref}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            placeholder={placeholder}
            className={cn(comboboxInputVariants({ size, disabled, variant }), className)}
          />
          <BaseCombobox.Trigger aria-label="Toggle options" className="inline-flex items-center justify-center h-full px-2 opacity-50 hover:opacity-100 transition-opacity">
            <svg
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </BaseCombobox.Trigger>
        </div>

        <BaseCombobox.Portal>
          <BaseCombobox.Positioner className="outline-none">
            <BaseCombobox.Popup className={comboboxPopupVariants({ size })}>
              <BaseCombobox.List className="max-h-[300px] overflow-auto">
                {renderOptions(options)}
              </BaseCombobox.List>
              <BaseCombobox.Empty className="py-6 text-center text-sm text-neutral-500">
                {emptyMessage}
              </BaseCombobox.Empty>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    );
  }
);

Combobox.displayName = 'Combobox';

export {
  comboboxInputVariants,
  comboboxPopupVariants,
  comboboxItemVariants,
  comboboxGroupLabelVariants,
};
