import * as React from 'react';
import { Toast as BaseToast } from '@base-ui/react/toast';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';

const toastViewportVariants = cva(
  'fixed z-50 flex flex-col gap-2 p-4 max-h-screen overflow-hidden',
  {
    variants: {
      position: {
        'top-right': 'top-0 right-0',
        'top-left': 'top-0 left-0',
        'top-center': 'top-0 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
      },
    },
    defaultVariants: {
      position: 'bottom-right',
    },
  }
);

const toastRootVariants = cva(
  'pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg p-4 shadow-lg transition-all',
  {
    variants: {
      size: {
        sm: 'min-w-[280px] max-w-[320px]',
        md: 'min-w-[320px] max-w-[400px]',
        lg: 'min-w-[360px] max-w-[480px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const toastTitleVariants = cva('font-semibold', {
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
});

const toastDescriptionVariants = cva('opacity-90', {
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
});

interface ToastContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const ToastContext = React.createContext<ToastContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'solid',
});

const useToastContext = () => React.useContext(ToastContext);

export interface ToastProviderProps
  extends React.ComponentProps<typeof BaseToast.Provider> {}

const Provider = BaseToast.Provider;
Provider.displayName = 'Toast.Provider';

export interface ToastViewportProps
  extends Omit<React.ComponentProps<typeof BaseToast.Viewport>, 'className'> {
  position?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center';
  className?: string;
}

const Viewport = React.forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ className, position = 'bottom-right', ...props }, ref) => {
    return (
      <BaseToast.Viewport
        ref={ref}
        className={cn(toastViewportVariants({ position }), className)}
        {...props}
      />
    );
  }
);

Viewport.displayName = 'Toast.Viewport';

export interface ToastRootProps
  extends Omit<React.ComponentProps<typeof BaseToast.Root>, 'className'> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, ToastRootProps>(
  (
    {
      className,
      variant = 'solid',
      color = 'neutral',
      size: sizeProp,
      ...props
    },
    ref
  ) => {
    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

    return (
      <ToastContext.Provider value={{ size, color, variant }}>
        <BaseToast.Root
          ref={ref}
          className={cn(
            sheetVariants({ variant, color }),
            toastRootVariants({ size }),
            className
          )}
          {...props}
        />
      </ToastContext.Provider>
    );
  }
);

Root.displayName = 'Toast.Root';

export interface ToastTitleProps
  extends Omit<React.ComponentProps<typeof BaseToast.Title>, 'className'> {
  className?: string;
}

const Title = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ className, ...props }, ref) => {
    const { size } = useToastContext();

    return (
      <BaseToast.Title
        ref={ref}
        className={cn(toastTitleVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Title.displayName = 'Toast.Title';

export interface ToastDescriptionProps
  extends Omit<React.ComponentProps<typeof BaseToast.Description>, 'className'> {
  className?: string;
}

const Description = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { size } = useToastContext();

    return (
      <BaseToast.Description
        ref={ref}
        className={cn(toastDescriptionVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Description.displayName = 'Toast.Description';

export interface ToastActionProps
  extends Omit<React.ComponentProps<typeof BaseToast.Action>, 'className'> {
  className?: string;
}

const Action = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseToast.Action
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors hover:bg-black/10 focus:outline-none focus-visible:ring-2',
          className
        )}
        {...props}
      />
    );
  }
);

Action.displayName = 'Toast.Action';

export interface ToastCloseProps
  extends Omit<React.ComponentProps<typeof BaseToast.Close>, 'className'> {
  className?: string;
}

const Close = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseToast.Close
        ref={ref}
        className={cn(
          'absolute top-2 right-2 rounded p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2',
          className
        )}
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
      </BaseToast.Close>
    );
  }
);

Close.displayName = 'Toast.Close';

export const Toast = {
  Provider,
  Viewport,
  Root,
  Title,
  Description,
  Action,
  Close,
};

const useToastManager = BaseToast.useToastManager;

export { toastViewportVariants, toastRootVariants, toastTitleVariants, toastDescriptionVariants, useToastManager };
