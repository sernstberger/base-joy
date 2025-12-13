import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { Sheet } from '../Sheet';
import { Typography } from '../Typography';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';
import {
  CardContext,
  useCardContext,
  cardFooterVariants as unstyledCardFooterVariants,
  type CardProps as BaseCardProps,
  type CardHeaderProps as BaseCardHeaderProps,
  type CardTitleProps as BaseCardTitleProps,
  type CardDescriptionProps as BaseCardDescriptionProps,
  type CardContentProps as BaseCardContentProps,
  type CardFooterProps as BaseCardFooterProps,
  type CardMediaProps as BaseCardMediaProps,
} from '@base-joy/ui-unstyled';

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

const cardFooterVariants = cva('border-neutral-200', {
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

export interface CardProps extends Omit<BaseCardProps, 'size'> {
  variant?: Variant;
  color?: ColorScale;
  /**
   * The size (padding) of the card.
   * @default 'md'
   */
  size?: Size;
}

export interface CardHeaderProps extends BaseCardHeaderProps {}

export interface CardTitleProps extends BaseCardTitleProps {}

export interface CardDescriptionProps extends BaseCardDescriptionProps {}

export interface CardContentProps extends BaseCardContentProps {}

export interface CardFooterProps extends BaseCardFooterProps {}

export type CardMediaProps = BaseCardMediaProps;

interface StyledCardContextValue {
  variant: Variant;
  color: ColorScale;
}

const StyledCardContext = React.createContext<StyledCardContextValue>({
  variant: 'outlined',
  color: 'neutral',
});

export const useStyledCardContext = () => React.useContext(StyledCardContext);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'outlined', color = 'neutral', size: sizeProp, children, ...props }, ref) => {
    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');
    return (
      <StyledCardContext.Provider value={{ variant, color }}>
        <CardContext.Provider value={{ size }}>
          <Sheet
            ref={ref}
            variant={variant}
            color={color}
            className={cn('overflow-hidden', className)}
            {...props}
          >
            {children}
          </Sheet>
        </CardContext.Provider>
      </StyledCardContext.Provider>
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
      <div
        ref={ref}
        className={cn(
          unstyledCardFooterVariants({ size }),
          cardFooterVariants({ size }),
          className
        )}
        {...props}
      />
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

// Re-export variants from unstyled for convenience
export { cardVariants, cardTitleVariants, cardDescriptionVariants } from '@base-joy/ui-unstyled';
