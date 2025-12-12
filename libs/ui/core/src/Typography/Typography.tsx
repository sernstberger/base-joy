import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { ColorScale } from '@base-joy/tokens';

// Heading Component

const headingVariants = cva('font-bold', {
  variants: {
    level: {
      1: 'text-4xl leading-tight',
      2: 'text-3xl leading-tight',
      3: 'text-2xl leading-snug',
      4: 'text-xl leading-snug',
      5: 'text-lg leading-normal',
      6: 'text-base leading-normal',
    },
    color: {
      primary: 'text-primary-700',
      neutral: 'text-neutral-900',
      success: 'text-success-700',
      warning: 'text-warning-700',
      danger: 'text-danger-700',
    },
  },
  defaultVariants: {
    level: 1,
    color: 'neutral',
  },
});

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingTags: Record<HeadingLevel, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    Omit<VariantProps<typeof headingVariants>, 'level' | 'color'> {
  level?: HeadingLevel;
  color?: ColorScale;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, color, children, ...props }, ref) => {
    const Tag = headingTags[level];

    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ level, color }), className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';

// Text Component

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs leading-tight',
      sm: 'text-sm leading-normal',
      md: 'text-base leading-normal',
      lg: 'text-lg leading-relaxed',
      xl: 'text-xl leading-relaxed',
    },
    color: {
      primary: 'text-primary-700',
      neutral: 'text-neutral-600',
      success: 'text-success-700',
      warning: 'text-warning-700',
      danger: 'text-danger-700',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'neutral',
    weight: 'normal',
  },
});

type TextElement = 'p' | 'span' | 'div' | 'label';

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    Omit<VariantProps<typeof textVariants>, 'size' | 'color' | 'weight'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: ColorScale;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  as?: TextElement;
}

export const Text = React.forwardRef(
  (
    { className, size, color, weight, as = 'p', children, ...props }: TextProps,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const Component = as as React.ElementType;
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, color, weight }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { headingVariants, textVariants };
