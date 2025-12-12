import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';

const codeBadgeVariants = cva('font-mono text-xs px-1.5 py-0.5 rounded', {
  variants: {
    color: {
      primary: 'text-primary-600 bg-primary-50',
      neutral: 'text-neutral-600 bg-neutral-100',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export interface CodeBadgeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeBadgeVariants> {
  color?: 'primary' | 'neutral';
}

export function CodeBadge({
  className,
  color = 'primary',
  children,
  ...props
}: CodeBadgeProps) {
  return (
    <code className={cn(codeBadgeVariants({ color }), className)} {...props}>
      {children}
    </code>
  );
}
