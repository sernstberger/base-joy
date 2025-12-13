import * as React from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { cn } from '@base-joy/utils';

export interface CollapsibleRootProps
  extends Omit<React.ComponentProps<typeof BaseCollapsible.Root>, 'className'> {
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, CollapsibleRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseCollapsible.Root
        ref={ref}
        className={cn('', className)}
        {...props}
      />
    );
  }
);

Root.displayName = 'Collapsible.Root';

export interface CollapsibleTriggerProps
  extends Omit<React.ComponentProps<typeof BaseCollapsible.Trigger>, 'className'> {
  className?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseCollapsible.Trigger
        ref={ref}
        className={cn('', className)}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'Collapsible.Trigger';

export interface CollapsiblePanelProps
  extends Omit<React.ComponentProps<typeof BaseCollapsible.Panel>, 'className'> {
  className?: string;
}

const Panel = React.forwardRef<HTMLDivElement, CollapsiblePanelProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseCollapsible.Panel
        ref={ref}
        className={cn(
          'overflow-hidden',
          'data-[starting-style]:animate-in data-[starting-style]:fade-in',
          'data-[ending-style]:animate-out data-[ending-style]:fade-out',
          className
        )}
        {...props}
      />
    );
  }
);

Panel.displayName = 'Collapsible.Panel';

export const Collapsible = {
  Root,
  Trigger,
  Panel,
};
