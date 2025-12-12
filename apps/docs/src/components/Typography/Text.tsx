import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';

const textVariants = cva('', {
  variants: {
    variant: {
      body: 'text-neutral-600',
      muted: 'text-sm text-neutral-500',
      subtitle: 'text-lg text-neutral-600',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  /**
   * The text style variant.
   * @default 'body'
   */
  variant?: 'body' | 'muted' | 'subtitle';

  /**
   * The element type to render.
   * @default 'p'
   */
  as?: 'p' | 'span' | 'div';
}

export function Text({
  className,
  variant = 'body',
  as: Component = 'p',
  children,
  ...props
}: TextProps) {
  return (
    <Component className={cn(textVariants({ variant }), className)} {...props}>
      {children}
    </Component>
  );
}
