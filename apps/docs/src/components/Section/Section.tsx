import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { Heading } from '../Typography';

const sectionVariants = cva('', {
  variants: {
    spacing: {
      sm: 'mb-6',
      md: 'mb-12',
      lg: 'mb-16',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Section title.
   */
  title?: string;

  /**
   * Title level for the heading.
   * @default 2
   */
  titleLevel?: 1 | 2 | 3 | 4;

  /**
   * Bottom margin size.
   * @default 'md'
   */
  spacing?: 'sm' | 'md' | 'lg';
}

export function Section({
  className,
  title,
  titleLevel = 2,
  spacing = 'md',
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ spacing }), className)} {...props}>
      {title && <Heading level={titleLevel}>{title}</Heading>}
      {children}
    </section>
  );
}
