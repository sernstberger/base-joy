import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { ColorScale } from '@base-joy/tokens';

const linkVariants = cva(
  'inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      color: {
        primary: 'text-primary-600 hover:text-primary-700 focus-visible:ring-primary-500',
        neutral: 'text-neutral-700 hover:text-neutral-900 focus-visible:ring-neutral-500',
        success: 'text-success-600 hover:text-success-700 focus-visible:ring-success-500',
        warning: 'text-warning-600 hover:text-warning-700 focus-visible:ring-warning-500',
        danger: 'text-danger-600 hover:text-danger-700 focus-visible:ring-danger-500',
      },
      underline: {
        none: 'no-underline',
        hover: 'no-underline hover:underline',
        always: 'underline',
      },
    },
    defaultVariants: {
      color: 'primary',
      underline: 'hover',
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /**
   * The color scheme of the link.
   * @default 'primary'
   */
  color?: ColorScale;

  /**
   * When to show the underline.
   * @default 'hover'
   */
  underline?: 'none' | 'hover' | 'always';

  /**
   * If true, opens link in new tab with security attributes.
   * @default false
   */
  external?: boolean;

  /**
   * If true, link is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The element type to render as (for use with router links).
   * @default 'a'
   */
  as?: React.ElementType;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      color,
      underline,
      external = false,
      disabled = false,
      as: Component = 'a',
      href,
      target,
      rel,
      children,
      ...props
    },
    ref
  ) => {
    const externalProps = external
      ? {
          target: target || '_blank',
          rel: rel || 'noopener noreferrer',
        }
      : {
          target,
          rel,
        };

    return (
      <Component
        ref={ref}
        className={cn(linkVariants({ color, underline }), className)}
        href={href}
        aria-disabled={disabled}
        {...externalProps}
        {...props}
      >
        {children}
        {external && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        )}
      </Component>
    );
  }
);

Link.displayName = 'Link';

export { linkVariants };
