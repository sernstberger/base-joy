import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { AlertDialog } from './AlertDialog';

describe('AlertDialog', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
              <AlertDialog.Description>Are you sure you want to delete this item?</AlertDialog.Description>
              <AlertDialog.Close>Cancel</AlertDialog.Close>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
    });

    it('renders trigger button', () => {
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Delete Item</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Title</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(screen.getByRole('button', { name: 'Delete Item' })).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <AlertDialog.Root size={size} open>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup data-testid="popup">
              <AlertDialog.Title>Title</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(screen.getByTestId('popup')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <AlertDialog.Root variant={variant} open>
            <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Backdrop />
              <AlertDialog.Popup data-testid="popup">
                <AlertDialog.Title>Title</AlertDialog.Title>
              </AlertDialog.Popup>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        );

        expect(screen.getByTestId('popup')).toBeInTheDocument();
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      (color) => {
        render(
          <AlertDialog.Root color={color} open>
            <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Backdrop />
              <AlertDialog.Popup data-testid="popup">
                <AlertDialog.Title>Title</AlertDialog.Title>
              </AlertDialog.Popup>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        );

        expect(screen.getByTestId('popup')).toBeInTheDocument();
      }
    );
  });

  describe('interaction', () => {
    it('opens alert dialog on trigger click', async () => {
      const user = userEvent.setup();
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Delete Item</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
              <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
              <AlertDialog.Close>Cancel</AlertDialog.Close>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Delete Item' }));

      await waitFor(() => {
        expect(screen.getByText('Confirm Delete')).toBeVisible();
      });
    });

    it('closes alert dialog on close button click', async () => {
      const user = userEvent.setup();
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
              <AlertDialog.Close>Cancel</AlertDialog.Close>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      await waitFor(() => {
        expect(screen.getByText('Confirm Delete')).toBeVisible();
      });

      await user.click(screen.getByRole('button', { name: 'Cancel' }));

      await waitFor(() => {
        expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
      });
    });

    it('does not close on backdrop click by default', async () => {
      const user = userEvent.setup();
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop data-testid="backdrop" />
            <AlertDialog.Popup>
              <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      await waitFor(() => {
        expect(screen.getByText('Confirm Delete')).toBeVisible();
      });

      await user.click(screen.getByTestId('backdrop'));

      // Alert dialog should still be visible (doesn't close on backdrop click)
      expect(screen.getByText('Confirm Delete')).toBeVisible();
    });

    it('calls onOpenChange when alert dialog opens/closes', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <AlertDialog.Root onOpenChange={onOpenChange}>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
              <AlertDialog.Close>Cancel</AlertDialog.Close>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      await user.click(screen.getByRole('button', { name: 'Delete' }));
      expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());

      await waitFor(() => {
        expect(screen.getByText('Confirm Delete')).toBeVisible();
      });

      await user.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    });
  });

  describe('controlled mode', () => {
    it('works in controlled mode', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [open, setOpen] = React.useState(false);
        return (
          <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Backdrop />
              <AlertDialog.Popup>
                <AlertDialog.Title>Controlled Alert</AlertDialog.Title>
                <AlertDialog.Close>Cancel</AlertDialog.Close>
              </AlertDialog.Popup>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        );
      };

      render(<TestComponent />);

      expect(screen.queryByText('Controlled Alert')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Delete' }));

      await waitFor(() => {
        expect(screen.getByText('Controlled Alert')).toBeVisible();
      });
    });
  });

  describe('className merging', () => {
    it('merges custom className on popup', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup className="custom-class" data-testid="popup">
              <AlertDialog.Title>Title</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(screen.getByTestId('popup')).toHaveClass('custom-class');
    });

    it('merges custom className on backdrop', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop className="custom-backdrop" data-testid="backdrop" />
            <AlertDialog.Popup>
              <AlertDialog.Title>Title</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(screen.getByTestId('backdrop')).toHaveClass('custom-backdrop');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to popup', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <AlertDialog.Root open>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup ref={ref}>
              <AlertDialog.Title>Title</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to trigger', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger ref={ref}>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Title</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('forwards ref to close button', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <AlertDialog.Root open>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Title</AlertDialog.Title>
              <AlertDialog.Close ref={ref}>Cancel</AlertDialog.Close>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <AlertDialog.Root open>
          <AlertDialog.Trigger>Delete Item</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
              <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
              <AlertDialog.Close>Cancel</AlertDialog.Close>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('renders title as heading', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Alert Heading</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      expect(screen.getByRole('heading', { name: 'Alert Heading' })).toBeInTheDocument();
    });
  });

  describe('default props', () => {
    it('uses danger color by default', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup data-testid="popup">
              <AlertDialog.Title>Title</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      const popup = screen.getByTestId('popup');
      // Should have danger color classes
      expect(popup.className).toContain('danger');
    });

    it('uses outlined variant by default', () => {
      render(
        <AlertDialog.Root open>
          <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup data-testid="popup">
              <AlertDialog.Title>Title</AlertDialog.Title>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      );

      const popup = screen.getByTestId('popup');
      // Should have border class from outlined variant
      expect(popup.className).toContain('border');
    });
  });
});
