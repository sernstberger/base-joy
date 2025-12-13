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

export interface ScrollAreaProps
  extends Omit<React.ComponentProps<typeof BaseScrollArea.Root>, 'className'> {
  /**
   * Which scrollbars to display.
   * @default 'vertical'
   */
  scrollbars?: 'vertical' | 'horizontal' | 'both' | 'none';
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
  /**
   * Additional class name for the root element.
   */
  className?: string;
  /**
   * Additional class name for the viewport element.
   */
  viewportClassName?: string;
  /**
   * The content to scroll.
   */
  children?: React.ReactNode;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      viewportClassName,
      scrollbars = 'vertical',
      color = 'neutral',
      size: sizeProp,
      children,
      ...props
    },
    ref
  ) => {
    const size = useResolvedSizeProps(sizeProp, 'md');

    const showVertical = scrollbars === 'vertical' || scrollbars === 'both';
    const showHorizontal = scrollbars === 'horizontal' || scrollbars === 'both';
    const showCorner = scrollbars === 'both';

    return (
      <BaseScrollArea.Root
        ref={ref}
        className={cn('overflow-hidden', className)}
        {...props}
      >
        <BaseScrollArea.Viewport
          className={cn('h-full w-full rounded-[inherit]', viewportClassName)}
        >
          {children}
        </BaseScrollArea.Viewport>

        {showVertical && (
          <BaseScrollArea.Scrollbar
            orientation="vertical"
            className={scrollbarVariants({ orientation: 'vertical', size })}
          >
            <BaseScrollArea.Thumb
              className={scrollbarThumbVariants({ color })}
            />
          </BaseScrollArea.Scrollbar>
        )}

        {showHorizontal && (
          <BaseScrollArea.Scrollbar
            orientation="horizontal"
            className={scrollbarVariants({ orientation: 'horizontal', size })}
          >
            <BaseScrollArea.Thumb
              className={scrollbarThumbVariants({ color })}
            />
          </BaseScrollArea.Scrollbar>
        )}

        {showCorner && (
          <BaseScrollArea.Corner className="bg-neutral-100" />
        )}
      </BaseScrollArea.Root>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

export { scrollbarVariants, scrollbarThumbVariants };
