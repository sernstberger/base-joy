import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Accordion, useAccordionContext } from './index';

describe('Accordion', () => {
  describe('Accordion.Root', () => {
    it('renders children', () => {
      render(
        <Accordion.Root>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Content</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Accordion.Root ref={ref}>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom className', () => {
      render(
        <Accordion.Root className="custom-class" data-testid="root">
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(screen.getByTestId('root')).toHaveClass('custom-class');
    });

    it('applies spacing variants', () => {
      render(
        <Accordion.Root spacing="md" data-testid="root">
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(screen.getByTestId('root')).toHaveClass('gap-2');
    });
  });

  describe('Accordion.Item', () => {
    it('renders children', () => {
      render(
        <Accordion.Root>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Panel Content</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('applies bordered variant', () => {
      render(
        <Accordion.Root>
          <Accordion.Item value="item-1" bordered data-testid="item">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(screen.getByTestId('item')).toHaveClass('border-b');
    });
  });

  describe('Accordion.Trigger', () => {
    it('renders as button', () => {
      render(
        <Accordion.Root>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Click me</Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('renders chevron icon', () => {
      render(
        <Accordion.Root>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
      );
      // ChevronDown from lucide-react renders as svg
      const button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('applies size variants', () => {
      render(
        <Accordion.Root size="sm">
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(screen.getByRole('button')).toHaveClass('text-sm');
    });

    it('applies custom className', () => {
      render(
        <Accordion.Root>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger className="custom-trigger">
                Trigger
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(screen.getByRole('button')).toHaveClass('custom-trigger');
    });
  });

  describe('expand/collapse behavior', () => {
    it('expands panel when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Accordion.Root>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Panel Content</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      );

      // Initially panel is not in DOM (Base UI removes collapsed panels)
      expect(screen.queryByText('Panel Content')).not.toBeInTheDocument();

      // Click to expand
      await user.click(screen.getByRole('button'));

      // Panel should be visible
      expect(screen.getByText('Panel Content')).toBeVisible();
    });

    it('collapses panel when trigger is clicked again', async () => {
      const user = userEvent.setup();
      render(
        <Accordion.Root defaultValue={['item-1']}>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Panel Content</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      );

      // Initially expanded
      expect(screen.getByText('Panel Content')).toBeVisible();

      // Click to collapse
      await user.click(screen.getByRole('button'));

      // Panel should be removed from DOM
      expect(screen.queryByText('Panel Content')).not.toBeInTheDocument();
    });

    it('respects defaultValue for initially expanded items', () => {
      render(
        <Accordion.Root defaultValue={['item-1']}>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Content 1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Trigger 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Content 2</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      );

      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });
  });

  describe('context', () => {
    it('provides size/color/variant to children via context', () => {
      const ContextConsumer = () => {
        const context = useAccordionContext();
        return (
          <div data-testid="context">
            {context.size}-{context.color}-{context.variant}
          </div>
        );
      };

      render(
        <Accordion.Root size="lg" color="primary" variant="soft">
          <Accordion.Item value="item-1">
            <ContextConsumer />
          </Accordion.Item>
        </Accordion.Root>
      );
      expect(screen.getByTestId('context')).toHaveTextContent('lg-primary-soft');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Accordion.Root>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Section 1</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Content 1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Section 2</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Content 2</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
