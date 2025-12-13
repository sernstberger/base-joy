import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const popoverPopupVariants = cva(
  'z-50 rounded-lg shadow-lg focus:outline-none',
  {
    variants: {
      size: {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-5 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const popoverArrowVariants = cva('', {
  variants: {
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
    // Solid arrow variants
    { variant: 'solid', color: 'primary', className: '[--arrow-bg:theme(colors.primary.500)]' },
    { variant: 'solid', color: 'neutral', className: '[--arrow-bg:theme(colors.neutral.800)]' },
    { variant: 'solid', color: 'success', className: '[--arrow-bg:theme(colors.success.500)]' },
    { variant: 'solid', color: 'warning', className: '[--arrow-bg:theme(colors.warning.600)]' },
    { variant: 'solid', color: 'danger', className: '[--arrow-bg:theme(colors.danger.500)]' },

    // Soft arrow variants
    { variant: 'soft', color: 'primary', className: '[--arrow-bg:theme(colors.primary.100)] [--arrow-border:theme(colors.primary.500)]' },
    { variant: 'soft', color: 'neutral', className: '[--arrow-bg:theme(colors.neutral.100)] [--arrow-border:theme(colors.neutral.300)]' },
    { variant: 'soft', color: 'success', className: '[--arrow-bg:theme(colors.success.100)] [--arrow-border:theme(colors.success.500)]' },
    { variant: 'soft', color: 'warning', className: '[--arrow-bg:theme(colors.warning.100)] [--arrow-border:theme(colors.warning.500)]' },
    { variant: 'soft', color: 'danger', className: '[--arrow-bg:theme(colors.danger.100)] [--arrow-border:theme(colors.danger.500)]' },

    // Outlined arrow variants
    { variant: 'outlined', color: 'primary', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.primary.500)]' },
    { variant: 'outlined', color: 'neutral', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.neutral.300)]' },
    { variant: 'outlined', color: 'success', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.success.500)]' },
    { variant: 'outlined', color: 'warning', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.warning.500)]' },
    { variant: 'outlined', color: 'danger', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.danger.500)]' },

    // Plain arrow variants
    { variant: 'plain', color: 'primary', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.primary.500)]' },
    { variant: 'plain', color: 'neutral', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.neutral.300)]' },
    { variant: 'plain', color: 'success', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.success.500)]' },
    { variant: 'plain', color: 'warning', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.warning.500)]' },
    { variant: 'plain', color: 'danger', className: '[--arrow-bg:theme(colors.white)] [--arrow-border:theme(colors.danger.500)]' },
  ],
  defaultVariants: {
    variant: 'outlined',
    color: 'neutral',
  },
});

const popoverTitleVariants = cva(
  'font-semibold',
  {
    variants: {
      size: {
        sm: 'text-base mb-2',
        md: 'text-lg mb-2',
        lg: 'text-xl mb-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const popoverDescriptionVariants = cva(
  'text-neutral-600',
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

const popoverCloseVariants = cva(
  'absolute inline-flex items-center justify-center rounded-lg transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'top-2 right-2 h-6 w-6',
        md: 'top-3 right-3 h-7 w-7',
        lg: 'top-4 right-4 h-8 w-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface PopoverContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const PopoverContext = React.createContext<PopoverContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'outlined',
});

const usePopoverContext = () => React.useContext(PopoverContext);

export interface PopoverRootProps
  extends Omit<React.ComponentProps<typeof BasePopover.Root>, 'className'> {
  /**
   * The visual style of the popover.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the popover.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the popover.
   * @default 'md'
   */
  size?: Size;
}

const Root = ({ variant: variantProp, color: colorProp, size: sizeProp, ...props }: PopoverRootProps) => {
  const { color, variant } = useResolvedColorProps(
    colorProp,
    variantProp,
    'neutral',
    'outlined'
  );

  const size = useResolvedSizeProps(sizeProp, 'md');

  return (
    <PopoverContext.Provider value={{ size, color, variant }}>
      <BasePopover.Root {...props} />
    </PopoverContext.Provider>
  );
};

Root.displayName = 'Popover.Root';

export interface PopoverTriggerProps
  extends Omit<React.ComponentProps<typeof BasePopover.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BasePopover.Trigger
        ref={ref}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'Popover.Trigger';

export interface PopoverPortalProps
  extends React.ComponentProps<typeof BasePopover.Portal> {}

const Portal = BasePopover.Portal;
Portal.displayName = 'Popover.Portal';

export interface PopoverPositionerProps
  extends Omit<React.ComponentProps<typeof BasePopover.Positioner>, 'className'> {
  className?: string;
}

const Positioner = React.forwardRef<HTMLDivElement, PopoverPositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BasePopover.Positioner
        ref={ref}
        className={cn('z-50', className)}
        {...props}
      />
    );
  }
);

Positioner.displayName = 'Popover.Positioner';

export interface PopoverPopupProps
  extends Omit<React.ComponentProps<typeof BasePopover.Popup>, 'className'> {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, PopoverPopupProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = usePopoverContext();

    return (
      <BasePopover.Popup
        ref={ref}
        className={cn(
          sheetVariants({ variant, color }),
          popoverPopupVariants({ size }),
          className
        )}
        {...props}
      />
    );
  }
);

Popup.displayName = 'Popover.Popup';

export interface PopoverArrowProps
  extends Omit<React.ComponentProps<typeof BasePopover.Arrow>, 'className'> {
  className?: string;
}

const Arrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ className, ...props }, ref) => {
    const { variant, color } = usePopoverContext();

    return (
      <BasePopover.Arrow
        ref={ref}
        className={cn(
          popoverArrowVariants({ variant, color }),
          'data-[side=top]:bottom-0 data-[side=right]:left-0 data-[side=bottom]:top-0 data-[side=left]:right-0',
          'after:content-[""] after:block after:w-[10px] after:h-[10px] after:rotate-45',
          'after:bg-[var(--arrow-bg)]',
          (variant === 'soft' || variant === 'outlined' || variant === 'plain') && 'after:border after:border-[var(--arrow-border)]',
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

Arrow.displayName = 'Popover.Arrow';

export interface PopoverTitleProps
  extends Omit<React.ComponentProps<typeof BasePopover.Title>, 'className'> {
  className?: string;
}

const Title = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ className, ...props }, ref) => {
    const { size } = usePopoverContext();

    return (
      <BasePopover.Title
        ref={ref}
        className={cn(popoverTitleVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Title.displayName = 'Popover.Title';

export interface PopoverDescriptionProps
  extends Omit<React.ComponentProps<typeof BasePopover.Description>, 'className'> {
  className?: string;
}

const Description = React.forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = usePopoverContext();

    return (
      <BasePopover.Description
        ref={ref}
        className={cn(popoverDescriptionVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Description.displayName = 'Popover.Description';

export interface PopoverCloseProps
  extends Omit<React.ComponentProps<typeof BasePopover.Close>, 'className'> {
  className?: string;
}

const Close = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = usePopoverContext();

    return (
      <BasePopover.Close
        ref={ref}
        className={cn(popoverCloseVariants({ size }), className)}
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
      </BasePopover.Close>
    );
  }
);

Close.displayName = 'Popover.Close';

export const Popover = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
  Title,
  Description,
  Close,
};

export {
  popoverPopupVariants,
  popoverArrowVariants,
  popoverTitleVariants,
  popoverDescriptionVariants,
  popoverCloseVariants,
};
