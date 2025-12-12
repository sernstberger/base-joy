import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';

const cardVariants = cva('overflow-hidden', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

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

const cardTitleVariants = cva('font-semibold', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardDescriptionVariants = cva('text-sm mt-1', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
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

const cardFooterVariants = cva('border-t', {
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
  size?: Size;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: Size;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: Size;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export type CardMediaProps =
  | (React.ImgHTMLAttributes<HTMLImageElement> & { as?: 'img' })
  | (React.VideoHTMLAttributes<HTMLVideoElement> & { as: 'video' });

interface CardContextValue {
  size: Size;
}

export const CardContext = React.createContext<CardContextValue>({
  size: 'md',
});

export const useCardContext = () => React.useContext(CardContext);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ size }}>
        <div
          ref={ref}
          className={cn(cardVariants({ size }), className)}
          {...props}
        >
          {children}
        </div>
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
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useCardContext();
    const size = sizeProp ?? contextSize;

    return <h3 ref={ref} className={cn(cardTitleVariants({ size }), className)} {...props} />;
  }
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useCardContext();
    const size = sizeProp ?? contextSize;

    return <p ref={ref} className={cn(cardDescriptionVariants({ size }), className)} {...props} />;
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
  cardVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardContentVariants,
  cardFooterVariants,
  cardMediaVariants,
};
