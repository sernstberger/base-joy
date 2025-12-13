import * as React from 'react';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const previewCardPopupVariants = cva(
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

const previewCardArrowVariants = cva('', {
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

interface PreviewCardContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const PreviewCardContext = React.createContext<PreviewCardContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'outlined',
});

const usePreviewCardContext = () => React.useContext(PreviewCardContext);

export interface PreviewCardRootProps
  extends Omit<React.ComponentProps<typeof BasePreviewCard.Root>, 'className'> {
  /**
   * The visual style of the preview card.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the preview card.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the preview card.
   * @default 'md'
   */
  size?: Size;
}

const Root = ({ variant: variantProp, color: colorProp, size: sizeProp, ...props }: PreviewCardRootProps) => {
  const { color, variant } = useResolvedColorProps(
    colorProp,
    variantProp,
    'neutral',
    'outlined'
  );

  const size = useResolvedSizeProps(sizeProp, 'md');

  return (
    <PreviewCardContext.Provider value={{ size, color, variant }}>
      <BasePreviewCard.Root {...props} />
    </PreviewCardContext.Provider>
  );
};

Root.displayName = 'PreviewCard.Root';

export interface PreviewCardTriggerProps
  extends Omit<React.ComponentProps<typeof BasePreviewCard.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLAnchorElement, PreviewCardTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BasePreviewCard.Trigger
        ref={ref}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'PreviewCard.Trigger';

export interface PreviewCardPortalProps
  extends React.ComponentProps<typeof BasePreviewCard.Portal> {}

const Portal = BasePreviewCard.Portal;
Portal.displayName = 'PreviewCard.Portal';

export interface PreviewCardBackdropProps
  extends Omit<React.ComponentProps<typeof BasePreviewCard.Backdrop>, 'className'> {
  className?: string;
}

const Backdrop = React.forwardRef<HTMLDivElement, PreviewCardBackdropProps>(
  ({ className, ...props }, ref) => {
    return (
      <BasePreviewCard.Backdrop
        ref={ref}
        className={cn('bg-black/30 fixed inset-0 z-40', className)}
        {...props}
      />
    );
  }
);

Backdrop.displayName = 'PreviewCard.Backdrop';

export interface PreviewCardPositionerProps
  extends Omit<React.ComponentProps<typeof BasePreviewCard.Positioner>, 'className'> {
  className?: string;
}

const Positioner = React.forwardRef<HTMLDivElement, PreviewCardPositionerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BasePreviewCard.Positioner
        ref={ref}
        className={cn('z-50', className)}
        {...props}
      />
    );
  }
);

Positioner.displayName = 'PreviewCard.Positioner';

export interface PreviewCardPopupProps
  extends Omit<React.ComponentProps<typeof BasePreviewCard.Popup>, 'className'> {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, PreviewCardPopupProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = usePreviewCardContext();

    return (
      <BasePreviewCard.Popup
        ref={ref}
        className={cn(
          sheetVariants({ variant, color }),
          previewCardPopupVariants({ size }),
          className
        )}
        {...props}
      />
    );
  }
);

Popup.displayName = 'PreviewCard.Popup';

export interface PreviewCardArrowProps
  extends Omit<React.ComponentProps<typeof BasePreviewCard.Arrow>, 'className'> {
  className?: string;
}

const Arrow = React.forwardRef<HTMLDivElement, PreviewCardArrowProps>(
  ({ className, ...props }, ref) => {
    const { variant, color } = usePreviewCardContext();

    return (
      <BasePreviewCard.Arrow
        ref={ref}
        className={cn(
          previewCardArrowVariants({ variant, color }),
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

Arrow.displayName = 'PreviewCard.Arrow';

export const PreviewCard = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Positioner,
  Popup,
  Arrow,
};

export {
  previewCardPopupVariants,
  previewCardArrowVariants,
};
