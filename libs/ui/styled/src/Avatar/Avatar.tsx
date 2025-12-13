import * as React from 'react';
import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size, ColorScale } from '@base-joy/tokens';
import { sheetVariants } from '../Sheet';
import { useResolvedSizeProps } from '../SizeContext';

const avatarVariants = cva('', {
  variants: {
    size: {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    Omit<VariantProps<typeof avatarVariants>, 'variant' | 'color' | 'size'> {
  /**
   * The visual style of the avatar.
   * @default 'soft'
   */
  variant?: 'solid' | 'soft' | 'outlined';

  /**
   * The color scheme of the avatar.
   * @default 'neutral'
   */
  color?: ColorScale;

  /**
   * The size of the avatar.
   * @default 'md'
   */
  size?: Size;

  /**
   * Image source URL.
   */
  src?: string;

  /**
   * Alt text for the image.
   */
  alt?: string;

  /**
   * Fallback content (typically initials) displayed when no src is provided or image fails to load.
   */
  children?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { className, variant = 'soft', color = 'neutral', size: sizeProp, src, alt, children, ...props },
    ref
  ) => {
    // Get size from AvatarGroup context (takes priority over SizeContext)
    const avatarGroupContext = useAvatarGroupContext();
    // Resolve size: explicit prop > AvatarGroup context > SizeContext > default
    const size = useResolvedSizeProps(sizeProp ?? avatarGroupContext?.size, 'md');

    return (
      <BaseAvatar.Root
        ref={ref}
        className={cn(
          sheetVariants({ variant, color }),
          'inline-flex items-center justify-center rounded-full overflow-hidden font-medium shrink-0 p-0',
          variant === 'outlined' && 'border-2',
          avatarVariants({ size }),
          className
        )}
        {...props}
      >
        {src && (
          <BaseAvatar.Image
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        )}
        <BaseAvatar.Fallback className="flex items-center justify-center h-full w-full">
          {children}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
    );
  }
);

Avatar.displayName = 'Avatar';

const avatarGroupVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: '-space-x-2',
      md: '-space-x-3',
      lg: '-space-x-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to display. Remaining avatars are hidden.
   */
  max?: number;

  /**
   * The size of avatars in the group.
   * @default 'md'
   */
  size?: Size;

  /**
   * Avatar components to display.
   */
  children: React.ReactNode;
}

interface AvatarGroupContextValue {
  size: Size;
}

const AvatarGroupContext = React.createContext<AvatarGroupContextValue | null>(null);

const useAvatarGroupContext = () => React.useContext(AvatarGroupContext);

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size: sizeProp, children, ...props }, ref) => {
    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');
    const childArray = React.Children.toArray(children);
    const displayChildren = max ? childArray.slice(0, max) : childArray;
    const extraCount = max && childArray.length > max ? childArray.length - max : 0;

    return (
      <AvatarGroupContext.Provider value={{ size }}>
        <div ref={ref} className={cn(avatarGroupVariants({ size }), className)} {...props}>
          {displayChildren}
          {extraCount > 0 && (
            <Avatar variant="soft" color="neutral" size={size}>
              +{extraCount}
            </Avatar>
          )}
        </div>
      </AvatarGroupContext.Provider>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { avatarVariants, avatarGroupVariants };
