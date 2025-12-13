import * as React from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size, ColorScale } from '@base-joy/tokens';
import { useColorContext } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

const switchRootVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors bg-neutral-300 data-[checked]:bg-primary-500',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
);

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-white shadow-sm transition-transform',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 translate-x-0.5 data-[checked]:translate-x-4',
        md: 'h-5 w-5 translate-x-0.5 data-[checked]:translate-x-5',
        lg: 'h-6 w-6 translate-x-0.5 data-[checked]:translate-x-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface SwitchContextValue {
  size: Size;
}

const SwitchContext = React.createContext<SwitchContextValue>({
  size: 'md',
});

const useSwitchContext = () => React.useContext(SwitchContext);

export interface SwitchRootProps
  extends Omit<React.ComponentProps<typeof BaseSwitch.Root>, 'className'> {
  color?: ColorScale;
  /**
   * The size of the switch.
   * @default 'md'
   */
  size?: Size;
  className?: string;
}

const Root = React.forwardRef<HTMLButtonElement, SwitchRootProps>(
  ({ className, color: colorProp, size: sizeProp, disabled, ...props }, ref) => {
    const colorContext = useColorContext();

    // Resolve color: explicit prop > context > default
    const color = colorProp ?? colorContext?.color ?? 'primary';

    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

    const colorClass =
      color === 'primary'
        ? 'data-[checked]:bg-primary-500'
        : color === 'success'
          ? 'data-[checked]:bg-success-500'
          : color === 'warning'
            ? 'data-[checked]:bg-warning-500'
            : color === 'danger'
              ? 'data-[checked]:bg-danger-500'
              : 'data-[checked]:bg-neutral-500';

    return (
      <SwitchContext.Provider value={{ size }}>
        <BaseSwitch.Root
          ref={ref}
          disabled={disabled}
          className={cn(
            switchRootVariants({ size, disabled }),
            colorClass,
            className
          )}
          {...props}
        />
      </SwitchContext.Provider>
    );
  }
);

Root.displayName = 'Switch.Root';

export interface SwitchThumbProps
  extends Omit<React.ComponentProps<typeof BaseSwitch.Thumb>, 'className'> {
  className?: string;
}

const Thumb = React.forwardRef<HTMLSpanElement, SwitchThumbProps>(
  ({ className, ...props }, ref) => {
    const { size } = useSwitchContext();

    return (
      <BaseSwitch.Thumb
        ref={ref}
        className={cn(switchThumbVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Thumb.displayName = 'Switch.Thumb';

export const Switch = {
  Root,
  Thumb,
};

export { switchRootVariants, switchThumbVariants };
