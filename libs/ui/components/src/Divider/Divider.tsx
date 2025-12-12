import * as React from 'react';
import { Separator } from '@base-ui/react/separator';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { ColorScale } from '@base-joy/tokens';

const dividerVariants = cva('shrink-0', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
    color: {
      primary: 'bg-primary-300',
      neutral: 'bg-neutral-300',
      success: 'bg-success-300',
      warning: 'bg-warning-300',
      danger: 'bg-danger-300',
    },
    inset: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', inset: true, className: 'mx-4' },
    { orientation: 'vertical', inset: true, className: 'my-4' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    color: 'neutral',
    inset: false,
  },
});

export interface DividerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Separator>, 'children'>,
    VariantProps<typeof dividerVariants> {
  /**
   * The orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * The color scheme of the divider.
   * @default 'neutral'
   */
  color?: ColorScale;

  /**
   * Adds margin on the ends of the divider.
   * @default false
   */
  inset?: boolean;

  /**
   * Optional text content to display in the center of the divider.
   */
  children?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', color, inset, children, ...props }, ref) => {
    if (children) {
      return (
        <div
          role="separator"
          aria-orientation={orientation}
          className={cn(
            'flex items-center gap-3',
            orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
            inset && (orientation === 'horizontal' ? 'mx-4' : 'my-4'),
            className
          )}
        >
          <Separator
            orientation={orientation}
            className={cn(
              dividerVariants({ orientation, color }),
              orientation === 'horizontal' ? 'flex-1' : 'flex-1'
            )}
            aria-hidden="true"
            render={<hr />}
          />
          <span className="text-sm text-neutral-600 shrink-0">{children}</span>
          <Separator
            orientation={orientation}
            className={cn(
              dividerVariants({ orientation, color }),
              orientation === 'horizontal' ? 'flex-1' : 'flex-1'
            )}
            aria-hidden="true"
            render={<hr />}
          />
        </div>
      );
    }

    return (
      <Separator
        ref={ref}
        orientation={orientation}
        className={cn(dividerVariants({ orientation, color, inset }), className)}
        render={<hr />}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { dividerVariants };
