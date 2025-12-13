import * as React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const alertDialogPopupVariants = cva(
  'relative z-50 max-h-[85vh] overflow-y-auto focus:outline-none',
  {
    variants: {
      size: {
        sm: 'w-full max-w-md',
        md: 'w-full max-w-lg',
        lg: 'w-full max-w-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const alertDialogBackdropVariants = cva(
  'fixed inset-0 z-40 bg-black/50 transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0'
);

const alertDialogTitleVariants = cva(
  'font-semibold',
  {
    variants: {
      size: {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const alertDialogDescriptionVariants = cva(
  'text-neutral-600 mt-2',
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

interface AlertDialogContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue>({
  size: 'md',
  color: 'danger',
  variant: 'outlined',
});

const useAlertDialogContext = () => React.useContext(AlertDialogContext);

export interface AlertDialogRootProps
  extends Omit<React.ComponentProps<typeof BaseAlertDialog.Root>, 'className'> {
  /**
   * The visual style of the alert dialog.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the alert dialog.
   * @default 'danger'
   */
  color?: ColorScale;
  /**
   * The size of the alert dialog.
   * @default 'md'
   */
  size?: Size;
}

const Root = ({ variant: variantProp, color: colorProp, size: sizeProp, ...props }: AlertDialogRootProps) => {
  const { color, variant } = useResolvedColorProps(
    colorProp,
    variantProp,
    'danger',
    'outlined'
  );

  const size = useResolvedSizeProps(sizeProp, 'md');

  return (
    <AlertDialogContext.Provider value={{ size, color, variant }}>
      <BaseAlertDialog.Root {...props} />
    </AlertDialogContext.Provider>
  );
};

Root.displayName = 'AlertDialog.Root';

export interface AlertDialogTriggerProps
  extends Omit<React.ComponentProps<typeof BaseAlertDialog.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAlertDialog.Trigger
        ref={ref}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'AlertDialog.Trigger';

export interface AlertDialogPortalProps
  extends React.ComponentProps<typeof BaseAlertDialog.Portal> {}

const Portal = BaseAlertDialog.Portal;
Portal.displayName = 'AlertDialog.Portal';

export interface AlertDialogBackdropProps
  extends Omit<React.ComponentProps<typeof BaseAlertDialog.Backdrop>, 'className'> {
  className?: string;
}

const Backdrop = React.forwardRef<HTMLDivElement, AlertDialogBackdropProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAlertDialog.Backdrop
        ref={ref}
        className={cn(alertDialogBackdropVariants(), className)}
        {...props}
      />
    );
  }
);

Backdrop.displayName = 'AlertDialog.Backdrop';

export interface AlertDialogPopupProps
  extends Omit<React.ComponentProps<typeof BaseAlertDialog.Popup>, 'className'> {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, AlertDialogPopupProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = useAlertDialogContext();

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <BaseAlertDialog.Popup
          ref={ref}
          className={cn(
            sheetVariants({ variant, color }),
            alertDialogPopupVariants({ size }),
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Popup.displayName = 'AlertDialog.Popup';

export interface AlertDialogTitleProps
  extends Omit<React.ComponentProps<typeof BaseAlertDialog.Title>, 'className'> {
  className?: string;
}

const Title = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => {
    const { size } = useAlertDialogContext();

    return (
      <BaseAlertDialog.Title
        ref={ref}
        className={cn(alertDialogTitleVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Title.displayName = 'AlertDialog.Title';

export interface AlertDialogDescriptionProps
  extends Omit<React.ComponentProps<typeof BaseAlertDialog.Description>, 'className'> {
  className?: string;
}

const Description = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = useAlertDialogContext();

    return (
      <BaseAlertDialog.Description
        ref={ref}
        className={cn(alertDialogDescriptionVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Description.displayName = 'AlertDialog.Description';

export interface AlertDialogCloseProps
  extends Omit<React.ComponentProps<typeof BaseAlertDialog.Close>, 'className'> {
  className?: string;
}

const Close = React.forwardRef<HTMLButtonElement, AlertDialogCloseProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAlertDialog.Close
        ref={ref}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Close.displayName = 'AlertDialog.Close';

export const AlertDialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Title,
  Description,
  Close,
};

export {
  alertDialogPopupVariants,
  alertDialogBackdropVariants,
  alertDialogTitleVariants,
  alertDialogDescriptionVariants,
};
