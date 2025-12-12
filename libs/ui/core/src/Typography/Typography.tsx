import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { ColorScale } from '@base-joy/tokens';

const typographyVariants = cva('', {
  variants: {
    level: {
      h1: 'text-4xl leading-tight font-bold',
      h2: 'text-3xl leading-tight font-bold',
      h3: 'text-2xl leading-snug font-bold',
      h4: 'text-xl leading-snug font-bold',
      h5: 'text-lg leading-normal font-bold',
      h6: 'text-base leading-normal font-bold',
      'body-xs': 'text-xs leading-tight',
      'body-sm': 'text-sm leading-normal',
      'body-md': 'text-base leading-normal',
      'body-lg': 'text-lg leading-relaxed',
      'body-xl': 'text-xl leading-relaxed',
    },
    color: {
      primary: 'text-primary-700',
      neutral: '',
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
    level: 'body-md',
    color: 'neutral',
  },
});

type TypographyLevel =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-xs'
  | 'body-sm'
  | 'body-md'
  | 'body-lg'
  | 'body-xl';

type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label';

const defaultElements: Record<TypographyLevel, TypographyElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-xs': 'p',
  'body-sm': 'p',
  'body-md': 'p',
  'body-lg': 'p',
  'body-xl': 'p',
};

const isHeadingLevel = (level: TypographyLevel): boolean =>
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(level);

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    Omit<VariantProps<typeof typographyVariants>, 'level' | 'color' | 'weight'> {
  /** The typography level determining size, weight, and default element */
  level?: TypographyLevel;
  /** The color of the text */
  color?: ColorScale;
  /** The font weight (only applies to body levels, headings are always bold) */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Override the HTML element rendered */
  component?: TypographyElement;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      level = 'body-md',
      color = 'neutral',
      weight,
      component,
      children,
      ...props
    },
    ref
  ) => {
    const Component = (component ?? defaultElements[level]) as React.ElementType;
    const isHeading = isHeadingLevel(level);

    const neutralClass = color === 'neutral'
      ? (isHeading ? 'text-neutral-900' : 'text-neutral-600')
      : '';

    const effectiveWeight = isHeading ? undefined : weight;

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({ level, color, weight: effectiveWeight }),
          neutralClass,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export { typographyVariants };
