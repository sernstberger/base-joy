import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';

const headingVariants = cva('font-bold text-neutral-900', {
  variants: {
    level: {
      1: 'text-3xl mb-2',
      2: 'text-xl font-semibold mb-4',
      3: 'text-lg font-medium mb-3',
      4: 'text-base font-medium mb-2',
    },
  },
  defaultVariants: {
    level: 1,
  },
});

type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /**
   * The heading level (1-4).
   * @default 1
   */
  level?: HeadingLevel;
}

const headingTags: Record<HeadingLevel, 'h1' | 'h2' | 'h3' | 'h4'> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
};

export function Heading({ className, level = 1, children, ...props }: HeadingProps) {
  const Tag = headingTags[level];

  return (
    <Tag className={cn(headingVariants({ level }), className)} {...props}>
      {children}
    </Tag>
  );
}
