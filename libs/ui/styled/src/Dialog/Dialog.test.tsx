import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Dialog Description</Dialog.Description>
              <Dialog.Close />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(screen.getByText('Dialog Title')).toBeInTheDocument();
      expect(screen.getByText('Dialog Description')).toBeInTheDocument();
    });

    it('renders trigger button', () => {
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Title</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Dialog.Root size={size} open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup data-testid="popup">
              <Dialog.Title>Title</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(screen.getByTestId('popup')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <Dialog.Root variant={variant} open>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup data-testid="popup">
                <Dialog.Title>Title</Dialog.Title>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
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
          <Dialog.Root color={color} open>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup data-testid="popup">
                <Dialog.Title>Title</Dialog.Title>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        );

        expect(screen.getByTestId('popup')).toBeInTheDocument();
      }
    );
  });

  describe('interaction', () => {
    it('opens dialog on trigger click', async () => {
      const user = userEvent.setup();
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Dialog content here</Dialog.Description>
              <Dialog.Close />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeVisible();
      });
    });

    it('closes dialog on close button click', async () => {
      const user = userEvent.setup();
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Close aria-label="Close dialog" />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeVisible();
      });

      await user.click(screen.getByRole('button', { name: 'Close dialog' }));

      await waitFor(() => {
        expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
      });
    });

    it('closes dialog on backdrop click by default', async () => {
      const user = userEvent.setup();
      render(
        <Dialog.Root>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop data-testid="backdrop" />
            <Dialog.Popup>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeVisible();
      });

      await user.click(screen.getByTestId('backdrop'));

      await waitFor(() => {
        expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
      });
    });

    it('calls onOpenChange when dialog opens/closes', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Dialog.Root onOpenChange={onOpenChange}>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Close aria-label="Close" />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
      expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());

      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeVisible();
      });

      await user.click(screen.getByRole('button', { name: 'Close' }));
      expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    });
  });

  describe('controlled mode', () => {
    it('works in controlled mode', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [open, setOpen] = React.useState(false);
        return (
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>Open Dialog</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <Dialog.Title>Controlled Dialog</Dialog.Title>
                <Dialog.Close />
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        );
      };

      render(<TestComponent />);

      expect(screen.queryByText('Controlled Dialog')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }));

      await waitFor(() => {
        expect(screen.getByText('Controlled Dialog')).toBeVisible();
      });
    });
  });

  describe('className merging', () => {
    it('merges custom className on popup', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup className="custom-class" data-testid="popup">
              <Dialog.Title>Title</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(screen.getByTestId('popup')).toHaveClass('custom-class');
    });

    it('merges custom className on backdrop', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="custom-backdrop" data-testid="backdrop" />
            <Dialog.Popup>
              <Dialog.Title>Title</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(screen.getByTestId('backdrop')).toHaveClass('custom-backdrop');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to popup', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup ref={ref}>
              <Dialog.Title>Title</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to trigger', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Dialog.Root>
          <Dialog.Trigger ref={ref}>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Title</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('forwards ref to close button', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Close ref={ref} />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Dialog.Root open>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Accessible Dialog</Dialog.Title>
              <Dialog.Description>This is an accessible dialog description.</Dialog.Description>
              <Dialog.Close aria-label="Close dialog" />
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('renders title as heading', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Dialog Heading</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(screen.getByRole('heading', { name: 'Dialog Heading' })).toBeInTheDocument();
    });
  });

  describe('custom close button content', () => {
    it('renders custom close button content', () => {
      render(
        <Dialog.Root open>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Close>Custom Close</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      );

      expect(screen.getByRole('button', { name: 'Custom Close' })).toBeInTheDocument();
    });
  });
});
