import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  describe('rendering', () => {
    it('renders trigger correctly', () => {
      render(
        <Tooltip.Root>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('shows tooltip on hover', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip.Root>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });

    it('hides tooltip on unhover', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip.Root>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await user.hover(screen.getByText('Hover me'));
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });

      await user.unhover(screen.getByText('Hover me'));
      await waitFor(() => {
        expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
      });
    });

    it('renders with arrow', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip.Root>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
              <Tooltip.Arrow data-testid="arrow" />
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByTestId('arrow')).toBeInTheDocument();
      });
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft'] as const)('renders %s variant', async (variant) => {
      const user = userEvent.setup();
      render(
        <Tooltip.Root variant={variant}>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup data-testid="popup">Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByTestId('popup')).toBeInTheDocument();
      });
    });
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      async (color) => {
        const user = userEvent.setup();
        render(
          <Tooltip.Root color={color}>
            <Tooltip.Trigger>Hover me</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner>
                <Tooltip.Popup data-testid="popup">Tooltip content</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        );

        await user.hover(screen.getByText('Hover me'));

        await waitFor(() => {
          expect(screen.getByTestId('popup')).toBeInTheDocument();
        });
      }
    );
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', async (size) => {
      const user = userEvent.setup();
      render(
        <Tooltip.Root size={size}>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup data-testid="popup">Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByTestId('popup')).toBeInTheDocument();
      });
    });
  });

  describe('controlled state', () => {
    it('respects open prop', async () => {
      render(
        <Tooltip.Root open>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });

    it('respects defaultOpen prop', async () => {
      render(
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });

    it('calls onOpenChange callback', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Tooltip.Root onOpenChange={onOpenChange}>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
      });
    });
  });

  describe('positioning', () => {
    it('accepts side prop', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip.Root>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="bottom">
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });

    it('accepts align prop', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip.Root>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner align="start">
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });
  });

  describe('className merging', () => {
    it('merges custom className on trigger', () => {
      render(
        <Tooltip.Root>
          <Tooltip.Trigger className="custom-class">Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      expect(screen.getByText('Hover me')).toHaveClass('custom-class');
    });

    it('merges custom className on popup', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip.Root>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup className="custom-class" data-testid="popup">
                Tooltip content
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByTestId('popup')).toHaveClass('custom-class');
      });
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Tooltip.Root>
          <Tooltip.Trigger aria-label="Show tooltip">Hover me</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>Tooltip content</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
