import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';

const containerVariants = cva(
  'w-full px-4 sm:px-6 lg:px-8',
  {
    variants: {
      maxWidth: {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full',
      },
      centered: {
        true: 'mx-auto',
        false: '',
      },
    },
    defaultVariants: {
      maxWidth: 'lg',
      centered: true,
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /**
   * The maximum width of the container.
   * @default 'lg'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * Whether to center the container with mx-auto.
   * @default true
   */
  centered?: boolean;

  /**
   * The element type to render as.
   * @default 'div'
   */
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, centered, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ maxWidth, centered }), className)}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export { containerVariants };
