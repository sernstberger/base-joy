import * as React from 'react';
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size, ColorScale } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';

const scrollbarVariants = cva('flex select-none touch-none bg-neutral-100 transition-colors', {
  variants: {
    orientation: {
      horizontal: 'h-2.5 flex-col',
      vertical: 'w-2.5',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'sm', className: 'h-1.5' },
    { orientation: 'horizontal', size: 'md', className: 'h-2.5' },
    { orientation: 'horizontal', size: 'lg', className: 'h-3.5' },
    { orientation: 'vertical', size: 'sm', className: 'w-1.5' },
    { orientation: 'vertical', size: 'md', className: 'w-2.5' },
    { orientation: 'vertical', size: 'lg', className: 'w-3.5' },
  ],
  defaultVariants: {
    orientation: 'vertical',
    size: 'md',
  },
});

const scrollbarThumbVariants = cva(
  'relative flex-1 rounded-full transition-colors before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]',
  {
    variants: {
      color: {
        primary: 'bg-primary-400 hover:bg-primary-500',
        neutral: 'bg-neutral-400 hover:bg-neutral-500',
        success: 'bg-success-400 hover:bg-success-500',
        warning: 'bg-warning-400 hover:bg-warning-500',
        danger: 'bg-danger-400 hover:bg-danger-500',
      },
    },
    defaultVariants: {
      color: 'neutral',
    },
  }
);

interface ScrollAreaContextValue {
  size: Size;
  color: ColorScale;
}

const ScrollAreaContext = React.createContext<ScrollAreaContextValue>({
  size: 'md',
  color: 'neutral',
});

const useScrollAreaContext = () => React.useContext(ScrollAreaContext);

export interface ScrollAreaRootProps
  extends Omit<React.ComponentProps<typeof BaseScrollArea.Root>, 'className'> {
  /**
   * The color scheme for scrollbar thumbs.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the scrollbars.
   * @default 'md'
   */
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, ScrollAreaRootProps>(
  ({ className, color = 'neutral', size: sizeProp, ...props }, ref) => {
    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

    return (
      <ScrollAreaContext.Provider value={{ size, color }}>
        <BaseScrollArea.Root
          ref={ref}
          className={cn('overflow-hidden', className)}
          {...props}
        />
      </ScrollAreaContext.Provider>
    );
  }
);

Root.displayName = 'ScrollArea.Root';

export interface ScrollAreaViewportProps
  extends Omit<React.ComponentProps<typeof BaseScrollArea.Viewport>, 'className'> {
  className?: string;
}

const Viewport = React.forwardRef<HTMLDivElement, ScrollAreaViewportProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseScrollArea.Viewport
        ref={ref}
        className={cn('h-full w-full rounded-[inherit]', className)}
        {...props}
      />
    );
  }
);

Viewport.displayName = 'ScrollArea.Viewport';

export interface ScrollAreaScrollbarProps
  extends Omit<React.ComponentProps<typeof BaseScrollArea.Scrollbar>, 'className'> {
  className?: string;
}

const Scrollbar = React.forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
  ({ className, ...props }, ref) => {
    const { size } = useScrollAreaContext();
    const orientation = props.orientation || 'vertical';

    return (
      <BaseScrollArea.Scrollbar
        ref={ref}
        className={cn(scrollbarVariants({ orientation, size }), className)}
        {...props}
      />
    );
  }
);

Scrollbar.displayName = 'ScrollArea.Scrollbar';

export interface ScrollAreaThumbProps
  extends Omit<React.ComponentProps<typeof BaseScrollArea.Thumb>, 'className'> {
  className?: string;
}

const Thumb = React.forwardRef<HTMLDivElement, ScrollAreaThumbProps>(
  ({ className, ...props }, ref) => {
    const { color } = useScrollAreaContext();

    return (
      <BaseScrollArea.Thumb
        ref={ref}
        className={cn(scrollbarThumbVariants({ color }), className)}
        {...props}
      />
    );
  }
);

Thumb.displayName = 'ScrollArea.Thumb';

export interface ScrollAreaCornerProps
  extends Omit<React.ComponentProps<typeof BaseScrollArea.Corner>, 'className'> {
  className?: string;
}

const Corner = React.forwardRef<HTMLDivElement, ScrollAreaCornerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseScrollArea.Corner
        ref={ref}
        className={cn('bg-neutral-100', className)}
        {...props}
      />
    );
  }
);

Corner.displayName = 'ScrollArea.Corner';

export const ScrollArea = {
  Root,
  Viewport,
  Scrollbar,
  Thumb,
  Corner,
};

export {
  scrollbarVariants,
  scrollbarThumbVariants,
};
