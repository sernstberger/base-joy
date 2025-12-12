import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { Sheet } from '../Sheet';
import { Typography } from '../Typography';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const cardHeaderVariants = cva('', {
  variants: {
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardContentVariants = cva('', {
  variants: {
    size: {
      sm: 'px-3 pb-3',
      md: 'px-4 pb-4',
      lg: 'px-6 pb-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardFooterVariants = cva('border-t border-neutral-200', {
  variants: {
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardMediaVariants = cva('w-full object-cover', {
  variants: {
    size: {
      sm: 'max-h-40',
      md: 'max-h-48',
      lg: 'max-h-64',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export type CardMediaProps = (
  | React.ImgHTMLAttributes<HTMLImageElement>
  | (React.VideoHTMLAttributes<HTMLVideoElement> & { as: 'video' })
) & {
  as?: 'img' | 'video';
};

interface CardContextValue {
  variant: Variant;
  color: ColorScale;
  size: Size;
}

const CardContext = React.createContext<CardContextValue>({
  variant: 'outlined',
  color: 'neutral',
  size: 'md',
});

const useCardContext = () => React.useContext(CardContext);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'outlined', color = 'neutral', size = 'md', children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ variant, color, size }}>
        <Sheet
          ref={ref}
          variant={variant}
          color={color}
          size="md"
          className={cn('p-0 overflow-hidden', className)}
          {...props}
        >
          {children}
        </Sheet>
      </CardContext.Provider>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    const { size } = useCardContext();

    return (
      <div ref={ref} className={cn(cardHeaderVariants({ size }), className)} {...props} />
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Typography
        ref={ref as React.Ref<HTMLElement>}
        level="h3"
        className={cn('mb-0', className)}
        {...(props as any)}
      >
        {children}
      </Typography>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Typography
        ref={ref as React.Ref<HTMLElement>}
        level="body-sm"
        className={cn('mt-1', className)}
        {...(props as any)}
      >
        {children}
      </Typography>
    );
  }
);

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    const { size } = useCardContext();

    return (
      <div ref={ref} className={cn(cardContentVariants({ size }), className)} {...props} />
    );
  }
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    const { size } = useCardContext();

    return (
      <div ref={ref} className={cn(cardFooterVariants({ size }), className)} {...props} />
    );
  }
);

CardFooter.displayName = 'CardFooter';

export const CardMedia = React.forwardRef<HTMLImageElement | HTMLVideoElement, CardMediaProps>(
  ({ className, as: Component = 'img', ...props }, ref) => {
    const { size } = useCardContext();

    return (
      <Component
        ref={ref as any}
        className={cn(cardMediaVariants({ size }), className)}
        {...(props as any)}
      />
    );
  }
);

CardMedia.displayName = 'CardMedia';

export {
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
  cardMediaVariants,
};
