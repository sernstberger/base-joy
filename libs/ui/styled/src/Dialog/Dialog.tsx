import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const dialogPopupVariants = cva(
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

const dialogBackdropVariants = cva(
  'fixed inset-0 z-40 bg-black/50 transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0'
);

const dialogTitleVariants = cva(
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

const dialogDescriptionVariants = cva(
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

const dialogCloseVariants = cva(
  'absolute top-4 right-4 inline-flex items-center justify-center rounded-lg transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-9 w-9',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface DialogContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const DialogContext = React.createContext<DialogContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'outlined',
});

const useDialogContext = () => React.useContext(DialogContext);

export interface DialogRootProps
  extends Omit<React.ComponentProps<typeof BaseDialog.Root>, 'className'> {
  /**
   * The visual style of the dialog.
   * @default 'outlined'
   */
  variant?: Variant;
  /**
   * The color scheme of the dialog.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the dialog.
   * @default 'md'
   */
  size?: Size;
}

const Root = ({ variant: variantProp, color: colorProp, size: sizeProp, ...props }: DialogRootProps) => {
  const { color, variant } = useResolvedColorProps(
    colorProp,
    variantProp,
    'neutral',
    'outlined'
  );

  const size = useResolvedSizeProps(sizeProp, 'md');

  return (
    <DialogContext.Provider value={{ size, color, variant }}>
      <BaseDialog.Root {...props} />
    </DialogContext.Provider>
  );
};

Root.displayName = 'Dialog.Root';

export interface DialogTriggerProps
  extends Omit<React.ComponentProps<typeof BaseDialog.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseDialog.Trigger
        ref={ref}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'Dialog.Trigger';

export interface DialogPortalProps
  extends React.ComponentProps<typeof BaseDialog.Portal> {}

const Portal = BaseDialog.Portal;
Portal.displayName = 'Dialog.Portal';

export interface DialogBackdropProps
  extends Omit<React.ComponentProps<typeof BaseDialog.Backdrop>, 'className'> {
  className?: string;
}

const Backdrop = React.forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseDialog.Backdrop
        ref={ref}
        className={cn(dialogBackdropVariants(), className)}
        {...props}
      />
    );
  }
);

Backdrop.displayName = 'Dialog.Backdrop';

export interface DialogPopupProps
  extends Omit<React.ComponentProps<typeof BaseDialog.Popup>, 'className'> {
  className?: string;
}

const Popup = React.forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ className, ...props }, ref) => {
    const { size, variant, color } = useDialogContext();

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <BaseDialog.Popup
          ref={ref}
          className={cn(
            sheetVariants({ variant, color }),
            dialogPopupVariants({ size }),
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Popup.displayName = 'Dialog.Popup';

export interface DialogTitleProps
  extends Omit<React.ComponentProps<typeof BaseDialog.Title>, 'className'> {
  className?: string;
}

const Title = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    const { size } = useDialogContext();

    return (
      <BaseDialog.Title
        ref={ref}
        className={cn(dialogTitleVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Title.displayName = 'Dialog.Title';

export interface DialogDescriptionProps
  extends Omit<React.ComponentProps<typeof BaseDialog.Description>, 'className'> {
  className?: string;
}

const Description = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = useDialogContext();

    return (
      <BaseDialog.Description
        ref={ref}
        className={cn(dialogDescriptionVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Description.displayName = 'Dialog.Description';

export interface DialogCloseProps
  extends Omit<React.ComponentProps<typeof BaseDialog.Close>, 'className'> {
  className?: string;
}

const Close = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useDialogContext();

    return (
      <BaseDialog.Close
        ref={ref}
        className={cn(dialogCloseVariants({ size }), className)}
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
      </BaseDialog.Close>
    );
  }
);

Close.displayName = 'Dialog.Close';

export const Dialog = {
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
  dialogPopupVariants,
  dialogBackdropVariants,
  dialogTitleVariants,
  dialogDescriptionVariants,
  dialogCloseVariants,
};
