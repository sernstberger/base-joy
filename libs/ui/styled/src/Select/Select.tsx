import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

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

export interface SelectOptionItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  group: string;
  options: SelectOptionItem[];
}

export type SelectOption = SelectOptionItem | SelectOptionGroup;

function isOptionGroup(option: SelectOption): option is SelectOptionGroup {
  return 'group' in option;
}

export interface SelectProps
  extends Omit<React.ComponentProps<typeof BaseSelect.Root>, 'className' | 'children'> {
  /**
   * The options to display in the select.
   */
  options: SelectOption[];
  /**
   * Placeholder text when no value is selected.
   */
  placeholder?: string;
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
  /**
   * Whether the select is disabled.
   */
  disabled?: boolean;
  /**
   * Additional class name for the trigger element.
   */
  className?: string;
  /**
   * Custom render function for option items.
   */
  renderOption?: (option: SelectOptionItem) => React.ReactNode;
  /**
   * Accessible label for the select trigger.
   */
  'aria-label'?: string;
  /**
   * ID of the element that labels this select.
   */
  'aria-labelledby'?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      placeholder = 'Select...',
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      disabled,
      className,
      renderOption,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
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

    const renderOptionContent = (option: SelectOptionItem) => {
      if (renderOption) {
        return renderOption(option);
      }
      return option.label;
    };

    const renderOptions = (opts: SelectOption[]) => {
      return opts.map((option, index) => {
        if (isOptionGroup(option)) {
          return (
            <BaseSelect.Group key={`group-${option.group}-${index}`}>
              <BaseSelect.GroupLabel
                className={selectGroupLabelVariants({ size })}
              >
                {option.group}
              </BaseSelect.GroupLabel>
              {option.options.map((item) => (
                <BaseSelect.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className={selectItemVariants({ size })}
                >
                  <BaseSelect.ItemText>
                    {renderOptionContent(item)}
                  </BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="absolute right-2 h-4 w-4">
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
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.Group>
          );
        }

        return (
          <BaseSelect.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={selectItemVariants({ size })}
          >
            <BaseSelect.ItemText>
              {renderOptionContent(option)}
            </BaseSelect.ItemText>
            <BaseSelect.ItemIndicator className="absolute right-2 h-4 w-4">
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
            </BaseSelect.ItemIndicator>
          </BaseSelect.Item>
        );
      });
    };

    return (
      <BaseSelect.Root disabled={disabled} {...props}>
        <BaseSelect.Trigger
          ref={ref}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          className={cn(
            'rounded-lg',
            variant === 'outlined' && 'border',
            sheetVariants({ variant, color, interactive: true }),
            selectTriggerVariants({ size, disabled }),
            className
          )}
        >
          <BaseSelect.Value className="flex-1 text-left">
            {(value: unknown) =>
              value != null ? (
                String(value)
              ) : (
                <span className="text-neutral-400">{placeholder}</span>
              )
            }
          </BaseSelect.Value>
          <BaseSelect.Icon className="h-4 w-4 opacity-50">
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
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner className="outline-none">
            <BaseSelect.Popup className={selectPopupVariants({ size })}>
              {renderOptions(options)}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    );
  }
);

Select.displayName = 'Select';

export {
  selectTriggerVariants,
  selectPopupVariants,
  selectItemVariants,
  selectGroupLabelVariants,
};
