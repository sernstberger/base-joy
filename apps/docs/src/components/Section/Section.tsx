import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { Typography } from '@base-joy/ui-components';

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
   * @default 'h2'
   */
  titleLevel?: 'h1' | 'h2' | 'h3' | 'h4';

  /**
   * Bottom margin size.
   * @default 'md'
   */
  spacing?: 'sm' | 'md' | 'lg';
}

export function Section({
  className,
  title,
  titleLevel = 'h2',
  spacing = 'md',
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ spacing }), className)} {...props}>
      {title && <Typography level={titleLevel} className="mb-4">{title}</Typography>}
      {children}
    </section>
  );
}
