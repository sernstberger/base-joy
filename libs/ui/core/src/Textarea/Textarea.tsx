import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const textareaVariants = cva(
  'w-full resize-none rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border',
  {
    variants: {
      variant: {
        solid: '',
        soft: '',
        outlined: '',
        plain: 'border-0',
      },
      color: {
        primary: '',
        neutral: '',
        success: '',
        warning: '',
        danger: '',
      },
      size: {
        sm: 'p-2 text-sm',
        md: 'p-3 text-base',
        lg: 'p-4 text-lg',
      },
      error: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Override Sheet's solid variants with form-appropriate colors
      { variant: 'solid', color: 'primary', className: 'bg-primary-100 border-primary-100 text-primary-900 focus:border-primary-500 focus:ring-primary-200' },
      { variant: 'solid', color: 'neutral', className: 'bg-neutral-100 border-neutral-100 text-neutral-900 focus:border-neutral-500 focus:ring-neutral-200' },
      { variant: 'solid', color: 'success', className: 'bg-success-100 border-success-100 text-success-900 focus:border-success-500 focus:ring-success-200' },
      { variant: 'solid', color: 'warning', className: 'bg-warning-100 border-warning-100 text-warning-900 focus:border-warning-500 focus:ring-warning-200' },
      { variant: 'solid', color: 'danger', className: 'bg-danger-100 border-danger-100 text-danger-900 focus:border-danger-500 focus:ring-danger-200' },

      // Override Sheet's soft variants with form-appropriate colors
      { variant: 'soft', color: 'primary', className: 'bg-primary-50 border-primary-200 text-primary-900 focus:border-primary-500 focus:ring-primary-200' },
      { variant: 'soft', color: 'neutral', className: 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-neutral-500 focus:ring-neutral-200' },
      { variant: 'soft', color: 'success', className: 'bg-success-50 border-success-200 text-success-900 focus:border-success-500 focus:ring-success-200' },
      { variant: 'soft', color: 'warning', className: 'bg-warning-50 border-warning-200 text-warning-900 focus:border-warning-500 focus:ring-warning-200' },
      { variant: 'soft', color: 'danger', className: 'bg-danger-50 border-danger-200 text-danger-900 focus:border-danger-500 focus:ring-danger-200' },

      // Override Sheet's outlined variants with form-appropriate colors
      { variant: 'outlined', color: 'primary', className: 'bg-transparent border-primary-300 text-primary-900 focus:border-primary-500 focus:ring-primary-200' },
      { variant: 'outlined', color: 'neutral', className: 'bg-transparent border-neutral-300 text-neutral-900 focus:border-neutral-500 focus:ring-neutral-200' },
      { variant: 'outlined', color: 'success', className: 'bg-transparent border-success-300 text-success-900 focus:border-success-500 focus:ring-success-200' },
      { variant: 'outlined', color: 'warning', className: 'bg-transparent border-warning-300 text-warning-900 focus:border-warning-500 focus:ring-warning-200' },
      { variant: 'outlined', color: 'danger', className: 'bg-transparent border-danger-300 text-danger-900 focus:border-danger-500 focus:ring-danger-200' },

      // Override Sheet's plain variants with form-appropriate colors
      { variant: 'plain', color: 'primary', className: 'bg-transparent text-primary-900 focus:ring-primary-200' },
      { variant: 'plain', color: 'neutral', className: 'bg-transparent text-neutral-900 focus:ring-neutral-200' },
      { variant: 'plain', color: 'success', className: 'bg-transparent text-success-900 focus:ring-success-200' },
      { variant: 'plain', color: 'warning', className: 'bg-transparent text-warning-900 focus:ring-warning-200' },
      { variant: 'plain', color: 'danger', className: 'bg-transparent text-danger-900 focus:ring-danger-200' },

      // Error state overrides - stronger border for error state
      { error: true, variant: 'soft', className: 'border-danger-500 focus:border-danger-500' },
      { error: true, variant: 'solid', className: 'border-danger-500 focus:border-danger-500' },
      { error: true, variant: 'outlined', className: 'border-danger-500 focus:border-danger-500' },
    ],
    defaultVariants: {
      variant: 'soft',
      color: 'neutral',
      size: 'md',
      error: false,
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color' | 'size'>,
    VariantProps<typeof textareaVariants> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  error?: boolean;
  fullWidth?: boolean;
  minRows?: number;
  maxRows?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = 'outlined',
      color = 'neutral',
      size,
      error,
      fullWidth = true,
      rows,
      minRows,
      maxRows,
      style,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const combinedRef = (ref as any) || textareaRef;

    React.useEffect(() => {
      const textarea = combinedRef.current;
      if (!textarea || (!minRows && !maxRows)) return;

      const adjustHeight = () => {
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);

        if (minRows) {
          const minHeight = lineHeight * minRows;
          textarea.style.minHeight = `${minHeight}px`;
        }

        if (maxRows) {
          const maxHeight = lineHeight * maxRows;
          if (scrollHeight > maxHeight) {
            textarea.style.height = `${maxHeight}px`;
            textarea.style.overflowY = 'auto';
          } else {
            textarea.style.height = `${scrollHeight}px`;
            textarea.style.overflowY = 'hidden';
          }
        } else {
          textarea.style.height = `${scrollHeight}px`;
          textarea.style.overflowY = 'hidden';
        }
      };

      adjustHeight();
      textarea.addEventListener('input', adjustHeight);

      return () => {
        textarea.removeEventListener('input', adjustHeight);
      };
    }, [minRows, maxRows, combinedRef]);

    return (
      <textarea
        ref={combinedRef}
        rows={rows}
        className={cn(
          textareaVariants({ variant, size, color: error ? 'danger' : color, error }),
          fullWidth ? 'w-full' : '',
          error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-200',
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { textareaVariants };
