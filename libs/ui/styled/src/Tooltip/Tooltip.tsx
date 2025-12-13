import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { ColorScale } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

type TooltipVariant = 'solid' | 'soft';
type TooltipSize = 'sm' | 'md' | 'lg';

const tooltipPopupVariants = cva('rounded-lg shadow-lg', {
  variants: {
    size: {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

const tooltipArrowVariants = cva('', {
  variants: {
    variant: {
      solid: '',
      soft: '',
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
    // Solid arrow variants
    { variant: 'solid', color: 'primary', className: '[--arrow-bg:theme(colors.primary.500)]' },
    { variant: 'solid', color: 'neutral', className: '[--arrow-bg:theme(colors.neutral.800)]' },
    { variant: 'solid', color: 'success', className: '[--arrow-bg:theme(colors.success.500)]' },
    { variant: 'solid', color: 'warning', className: '[--arrow-bg:theme(colors.warning.600)]' },
    { variant: 'solid', color: 'danger', className: '[--arrow-bg:theme(colors.danger.500)]' },

    // Soft arrow variants (with border)
    { variant: 'soft', color: 'primary', className: '[--arrow-bg:theme(colors.primary.100)] [--arrow-border:theme(colors.primary.500)]' },
    { variant: 'soft', color: 'neutral', className: '[--arrow-bg:theme(colors.neutral.100)] [--arrow-border:theme(colors.neutral.300)]' },
    { variant: 'soft', color: 'success', className: '[--arrow-bg:theme(colors.success.100)] [--arrow-border:theme(colors.success.500)]' },
    { variant: 'soft', color: 'warning', className: '[--arrow-bg:theme(colors.warning.100)] [--arrow-border:theme(colors.warning.500)]' },
    { variant: 'soft', color: 'danger', className: '[--arrow-bg:theme(colors.danger.100)] [--arrow-border:theme(colors.danger.500)]' },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'neutral',
  },
});

export interface TooltipProps
  extends Omit<React.ComponentProps<typeof BaseTooltip.Root>, 'className' | 'children'> {
  /**
   * The tooltip content to display.
   */
  content: React.ReactNode;
  /**
   * The element that triggers the tooltip.
   */
  children: React.ReactNode;
  /**
   * The visual style of the tooltip.
   * @default 'solid'
   */
  variant?: TooltipVariant;
  /**
   * The color scheme of the tooltip.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the tooltip.
   * @default 'sm'
   */
  size?: TooltipSize;
  /**
   * The side of the trigger where the tooltip appears.
   * @default 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * The offset in pixels from the trigger.
   * @default 8
   */
  sideOffset?: number;
  /**
   * Whether to show an arrow pointing to the trigger.
   * @default true
   */
  showArrow?: boolean;
  /**
   * Additional class name for the trigger element.
   */
  triggerClassName?: string;
  /**
   * Additional class name for the popup element.
   */
  popupClassName?: string;
}

export const Tooltip = React.forwardRef<HTMLButtonElement, TooltipProps>(
  (
    {
      content,
      children,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      side = 'top',
      sideOffset = 8,
      showArrow = true,
      triggerClassName,
      popupClassName,
      ...props
    },
    ref
  ) => {
    const { color, variant } = useResolvedColorProps(
      colorProp,
      variantProp,
      'neutral',
      'solid'
    );
    const size = useResolvedSizeProps(sizeProp, 'sm');

    return (
      <BaseTooltip.Root {...props}>
        <BaseTooltip.Trigger ref={ref} className={cn(triggerClassName)}>
          {children}
        </BaseTooltip.Trigger>
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side={side} sideOffset={sideOffset} className="z-50">
            <BaseTooltip.Popup
              className={cn(
                sheetVariants({ variant, color }),
                tooltipPopupVariants({ size }),
                popupClassName
              )}
            >
              {content}
              {showArrow && (
                <BaseTooltip.Arrow
                  className={cn(
                    tooltipArrowVariants({ variant: variant as TooltipVariant, color }),
                    // Arrow styling using CSS custom properties
                    'data-[side=top]:bottom-0 data-[side=right]:left-0 data-[side=bottom]:top-0 data-[side=left]:right-0',
                    // Apply background color
                    'after:content-[""] after:block after:w-[10px] after:h-[10px] after:rotate-45',
                    'after:bg-[var(--arrow-bg)]',
                    // Apply border for soft variant
                    variant === 'soft' && 'after:border after:border-[var(--arrow-border)]',
                    // Position adjustments to align with popup
                    'data-[side=top]:after:translate-y-1/2',
                    'data-[side=right]:after:-translate-x-1/2',
                    'data-[side=bottom]:after:-translate-y-1/2',
                    'data-[side=left]:after:translate-x-1/2'
                  )}
                />
              )}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export const TooltipProvider = BaseTooltip.Provider;

export type TooltipProviderProps = React.ComponentProps<typeof BaseTooltip.Provider>;

export {
  tooltipPopupVariants,
  tooltipArrowVariants,
};
