import * as React from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size, ColorScale, Variant } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';

// Context for passing props to children
interface AccordionContextValue {
  size: Size;
  color: ColorScale;
  variant: Variant;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  size: 'md',
  color: 'neutral',
  variant: 'plain',
});

const useAccordionContext = () => React.useContext(AccordionContext);

// CVA Variants
export const accordionRootVariants = cva('flex flex-col', {
  variants: {
    spacing: {
      none: 'gap-0',
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
    },
  },
  defaultVariants: {
    spacing: 'none',
  },
});

export const accordionItemVariants = cva('', {
  variants: {
    bordered: {
      true: 'border-b border-neutral-200 last:border-b-0',
      false: '',
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

export const accordionHeaderVariants = cva('flex', {
  variants: {},
  defaultVariants: {},
});

export const accordionTriggerVariants = cva(
  'flex w-full items-center justify-between text-left transition-colors cursor-pointer',
  {
    variants: {
      size: {
        sm: 'py-2 px-2 text-sm',
        md: 'py-3 px-3 text-base',
        lg: 'py-4 px-4 text-lg',
      },
      variant: {
        solid: '',
        soft: '',
        outlined: '',
        plain: 'hover:bg-neutral-50',
      },
    },
    compoundVariants: [
      { variant: 'soft', className: 'hover:bg-neutral-100' },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'plain',
    },
  }
);

export const accordionPanelVariants = cva(
  'overflow-hidden transition-all',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Root Component
export interface AccordionRootProps
  extends Omit<React.ComponentProps<typeof BaseAccordion.Root>, 'className'> {
  /**
   * The visual style of the accordion.
   * @default 'plain'
   */
  variant?: Variant;
  /**
   * The color scheme of the accordion.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the accordion items.
   * @default 'md'
   */
  size?: Size;
  /**
   * Spacing between accordion items.
   * @default 'none'
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  (
    {
      className,
      variant: variantProp,
      color: colorProp,
      size = 'md',
      spacing = 'none',
      ...props
    },
    ref
  ) => {
    const { color, variant } = useResolvedColorProps(
      colorProp,
      variantProp,
      'neutral',
      'plain'
    );

    return (
      <AccordionContext.Provider value={{ size, color, variant }}>
        <BaseAccordion.Root
          ref={ref}
          className={cn(accordionRootVariants({ spacing }), className)}
          {...props}
        />
      </AccordionContext.Provider>
    );
  }
);

Root.displayName = 'Accordion.Root';

// Item Component
export interface AccordionItemProps
  extends Omit<React.ComponentProps<typeof BaseAccordion.Item>, 'className'> {
  /**
   * Whether to show a bottom border.
   * @default false
   */
  bordered?: boolean;
  className?: string;
}

const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, bordered = false, ...props }, ref) => {
    return (
      <BaseAccordion.Item
        ref={ref}
        className={cn(accordionItemVariants({ bordered }), className)}
        {...props}
      />
    );
  }
);

Item.displayName = 'Accordion.Item';

// Header Component
export interface AccordionHeaderProps
  extends Omit<React.ComponentProps<typeof BaseAccordion.Header>, 'className'> {
  className?: string;
}

const Header = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseAccordion.Header
        ref={ref}
        className={cn(accordionHeaderVariants(), className)}
        {...props}
      />
    );
  }
);

Header.displayName = 'Accordion.Header';

// Trigger Component
export interface AccordionTriggerProps
  extends Omit<React.ComponentProps<typeof BaseAccordion.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { size, variant } = useAccordionContext();

    return (
      <BaseAccordion.Trigger
        ref={ref}
        className={cn(accordionTriggerVariants({ size, variant }), className)}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 data-[panel-open]:rotate-180" />
      </BaseAccordion.Trigger>
    );
  }
);

Trigger.displayName = 'Accordion.Trigger';

// Panel Component
export interface AccordionPanelProps
  extends Omit<React.ComponentProps<typeof BaseAccordion.Panel>, 'className'> {
  className?: string;
}

const Panel = React.forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ className, ...props }, ref) => {
    const { size } = useAccordionContext();

    return (
      <BaseAccordion.Panel
        ref={ref}
        className={cn(accordionPanelVariants({ size }), className)}
        {...props}
      />
    );
  }
);

Panel.displayName = 'Accordion.Panel';

// Export compound component
export const Accordion = {
  Root,
  Item,
  Header,
  Trigger,
  Panel,
};

export { AccordionContext, useAccordionContext };
