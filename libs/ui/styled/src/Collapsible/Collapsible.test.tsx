import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Collapsible } from './index';

describe('Collapsible', () => {
  describe('Collapsible.Root', () => {
    it('renders children', () => {
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );
      expect(screen.getByText('Toggle')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Collapsible.Root ref={ref}>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        </Collapsible.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom className', () => {
      render(
        <Collapsible.Root className="custom-class" data-testid="root">
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        </Collapsible.Root>
      );
      expect(screen.getByTestId('root')).toHaveClass('custom-class');
    });

    it('respects defaultOpen prop', () => {
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Panel Content</Collapsible.Panel>
        </Collapsible.Root>
      );
      expect(screen.getByText('Panel Content')).toBeVisible();
    });
  });

  describe('Collapsible.Trigger', () => {
    it('renders as button', () => {
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Click me</Collapsible.Trigger>
        </Collapsible.Root>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Collapsible.Root>
          <Collapsible.Trigger ref={ref}>Toggle</Collapsible.Trigger>
        </Collapsible.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('applies custom className', () => {
      render(
        <Collapsible.Root>
          <Collapsible.Trigger className="custom-trigger">
            Toggle
          </Collapsible.Trigger>
        </Collapsible.Root>
      );
      expect(screen.getByRole('button')).toHaveClass('custom-trigger');
    });

    it('has data-panel-open attribute when panel is open', async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('data-panel-open');

      await user.click(button);
      expect(button).toHaveAttribute('data-panel-open');
    });
  });

  describe('Collapsible.Panel', () => {
    it('renders children when open', () => {
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Panel Content</Collapsible.Panel>
        </Collapsible.Root>
      );
      expect(screen.getByText('Panel Content')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel ref={ref}>Content</Collapsible.Panel>
        </Collapsible.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom className', () => {
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel className="custom-panel" data-testid="panel">
            Content
          </Collapsible.Panel>
        </Collapsible.Root>
      );
      expect(screen.getByTestId('panel')).toHaveClass('custom-panel');
    });

    it('applies overflow-hidden class', () => {
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel data-testid="panel">Content</Collapsible.Panel>
        </Collapsible.Root>
      );
      expect(screen.getByTestId('panel')).toHaveClass('overflow-hidden');
    });

    it('has data-open attribute when open', () => {
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel data-testid="panel">Content</Collapsible.Panel>
        </Collapsible.Root>
      );
      expect(screen.getByTestId('panel')).toHaveAttribute('data-open');
    });
  });

  describe('open/close behavior', () => {
    it('opens panel when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Panel Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      expect(screen.queryByText('Panel Content')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button'));

      expect(screen.getByText('Panel Content')).toBeVisible();
    });

    it('closes panel when trigger is clicked again', async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Panel Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      expect(screen.getByText('Panel Content')).toBeVisible();

      await user.click(screen.getByRole('button'));

      expect(screen.queryByText('Panel Content')).not.toBeInTheDocument();
    });
  });

  describe('controlled mode', () => {
    it('works in controlled mode', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      const { rerender } = render(
        <Collapsible.Root open={false} onOpenChange={onOpenChange}>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Panel Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      expect(screen.queryByText('Panel Content')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button'));
      expect(onOpenChange).toHaveBeenCalled();
      expect(onOpenChange.mock.calls[0][0]).toBe(true);

      rerender(
        <Collapsible.Root open={true} onOpenChange={onOpenChange}>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Panel Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      expect(screen.getByText('Panel Content')).toBeVisible();

      await user.click(screen.getByRole('button'));
      expect(onOpenChange).toHaveBeenCalledTimes(2);
      expect(onOpenChange.mock.calls[1][0]).toBe(false);
    });
  });

  describe('disabled state', () => {
    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(
        <Collapsible.Root disabled>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Panel Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      expect(screen.queryByText('Panel Content')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button'));

      expect(screen.queryByText('Panel Content')).not.toBeInTheDocument();
    });

    it('button has aria-disabled when disabled', () => {
      render(
        <Collapsible.Root disabled>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        </Collapsible.Root>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Collapsible.Root>
          <Collapsible.Trigger>Show details</Collapsible.Trigger>
          <Collapsible.Panel>Detailed information</Collapsible.Panel>
        </Collapsible.Root>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper aria attributes', () => {
      render(
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel data-testid="panel">Content</Collapsible.Panel>
        </Collapsible.Root>
      );

      const button = screen.getByRole('button');
      const panel = screen.getByTestId('panel');

      expect(button).toHaveAttribute('aria-controls');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(panel).toHaveAttribute('id');
    });
  });
});
