import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { ColorScale } from '@base-joy/tokens';

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

interface TooltipContextValue {
  variant: TooltipVariant;
  color: ColorScale;
  size: TooltipSize;
}

const TooltipContext = React.createContext<TooltipContextValue>({
  variant: 'solid',
  color: 'neutral',
  size: 'sm',
});

const useTooltipContext = () => React.useContext(TooltipContext);

export interface TooltipRootProps
  extends Omit<React.ComponentProps<typeof BaseTooltip.Root>, 'className'> {
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
}

const Root = ({ variant = 'solid', color = 'neutral', size = 'sm', ...props }: TooltipRootProps) => {
  return (
    <TooltipContext.Provider value={{ variant, color, size }}>
      <BaseTooltip.Root {...props} />
    </TooltipContext.Provider>
  );
};

Root.displayName = 'Tooltip.Root';

export interface TooltipTriggerProps
  extends Omit<React.ComponentProps<typeof BaseTooltip.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTooltip.Trigger ref={ref} className={cn(className)} {...props} />
    );
  }
);

Trigger.displayName = 'Tooltip.Trigger';

export interface TooltipPortalProps
  extends React.ComponentProps<typeof BaseTooltip.Portal> {}

const Portal = BaseTooltip.Portal;
Portal.displayName = 'Tooltip.Portal';

export interface TooltipPositionerProps
  extends Omit<React.ComponentProps<typeof BaseTooltip.Positioner>, 'className'> {
  className?: string;
}

const Positioner = React.forwardRef<HTMLDivElement, TooltipPositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseTooltip.Positioner
        ref={ref}
        className={cn('z-50', className)}
        {...props}
      />
    );
  }
);

Positioner.displayName = 'Tooltip.Positioner';

export interface TooltipPopupProps
  extends Omit<React.ComponentProps<typeof BaseTooltip.Popup>, 'className'> {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, TooltipPopupProps>(
  ({ className, ...props }, ref) => {
    const { variant, color, size } = useTooltipContext();

    return (
      <BaseTooltip.Popup
        ref={ref}
        className={cn(
          sheetVariants({ variant, color }),
          tooltipPopupVariants({ size }),
          className
        )}
        {...props}
      />
    );
  }
);

Popup.displayName = 'Tooltip.Popup';

export interface TooltipArrowProps
  extends Omit<React.ComponentProps<typeof BaseTooltip.Arrow>, 'className'> {
  className?: string;
}

const Arrow = React.forwardRef<HTMLDivElement, TooltipArrowProps>(
  ({ className, ...props }, ref) => {
    const { variant, color } = useTooltipContext();

    return (
      <BaseTooltip.Arrow
        ref={ref}
        className={cn(
          tooltipArrowVariants({ variant, color }),
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
          'data-[side=left]:after:translate-x-1/2',
          className
        )}
        {...props}
      />
    );
  }
);

Arrow.displayName = 'Tooltip.Arrow';

export interface TooltipProviderProps
  extends React.ComponentProps<typeof BaseTooltip.Provider> {}

const Provider = BaseTooltip.Provider;
Provider.displayName = 'Tooltip.Provider';

export const Tooltip = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
  Provider,
};

export {
  tooltipPopupVariants,
  tooltipArrowVariants,
};
