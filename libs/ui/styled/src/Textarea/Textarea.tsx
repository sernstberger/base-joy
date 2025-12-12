import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { Sheet } from '../Sheet/Sheet';

const textareaSizeVariants = cva('', {
  variants: {
    size: {
      sm: 'p-2 text-sm',
      md: 'p-3 text-base',
      lg: 'p-4 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color' | 'size'> {
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
      size = 'md',
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
    const effectiveColor = error ? 'danger' : color;

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
      <Sheet
        ref={combinedRef as React.Ref<HTMLDivElement>}
        as="textarea"
        variant={variant}
        color={effectiveColor}
        interactive
        rows={rows}
        className={cn(
          'p-0 w-full resize-none disabled:cursor-not-allowed disabled:opacity-50',
          variant !== 'plain' && 'border',
          variant === 'plain' && 'border-0',
          textareaSizeVariants({ size }),
          error && 'border-danger-500 focus:border-danger-500',
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { textareaSizeVariants };
