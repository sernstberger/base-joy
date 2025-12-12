import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';

const stackVariants = cva('flex', {
  variants: {
    direction: {
      column: 'flex-col',
      row: 'flex-row',
      'column-reverse': 'flex-col-reverse',
      'row-reverse': 'flex-row-reverse',
    },
    spacing: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      7: 'gap-7',
      8: 'gap-8',
      9: 'gap-9',
      10: 'gap-10',
      11: 'gap-11',
      12: 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'column',
    spacing: 2,
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
});

export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'>,
    VariantProps<typeof stackVariants> {
  /**
   * The flex direction.
   * @default 'column'
   */
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';

  /**
   * The spacing between children (maps to gap-0 through gap-12).
   * @default 2
   */
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /**
   * The alignment of children (align-items).
   * @default 'stretch'
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';

  /**
   * The justification of children (justify-content).
   * @default 'start'
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

  /**
   * Whether to wrap children.
   * @default false
   */
  wrap?: boolean;

  /**
   * The element type to render as.
   * @default 'div'
   */
  as?: React.ElementType;

  /**
   * Optional divider element to insert between children.
   */
  divider?: React.ReactNode;

  /**
   * Children elements.
   */
  children?: React.ReactNode;
}

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      className,
      direction,
      spacing,
      align,
      justify,
      wrap,
      as: Component = 'div',
      divider,
      children,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children);
    const hasChildren = childrenArray.length > 0;

    const content = divider && hasChildren
      ? childrenArray.reduce<React.ReactNode[]>((acc, child, index) => {
          if (index > 0) {
            acc.push(
              <React.Fragment key={`divider-${index}`}>{divider}</React.Fragment>
            );
          }
          acc.push(child);
          return acc;
        }, [])
      : children;

    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({ direction, spacing, align, justify, wrap }),
          className
        )}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';

export { stackVariants };
