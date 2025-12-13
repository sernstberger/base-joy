import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Popover } from './Popover';

describe('Popover', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <Popover.Root open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Popover Title</Popover.Title>
                <Popover.Description>Popover Description</Popover.Description>
                <Popover.Close />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(screen.getByText('Popover Title')).toBeInTheDocument();
      expect(screen.getByText('Popover Description')).toBeInTheDocument();
    });

    it('renders trigger button', () => {
      render(
        <Popover.Root>
          <Popover.Trigger>Open Popover</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Title</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(screen.getByRole('button', { name: 'Open Popover' })).toBeInTheDocument();
    });

    it('renders with arrow', async () => {
      render(
        <Popover.Root open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>Content</Popover.Popup>
              <Popover.Arrow data-testid="arrow" />
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await waitFor(() => {
        expect(screen.getByTestId('arrow')).toBeInTheDocument();
      });
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Popover.Root size={size} open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup data-testid="popup">
                <Popover.Title>Title</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(screen.getByTestId('popup')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <Popover.Root variant={variant} open>
            <Popover.Trigger>Open</Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner>
                <Popover.Popup data-testid="popup">
                  <Popover.Title>Title</Popover.Title>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
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
          <Popover.Root color={color} open>
            <Popover.Trigger>Open</Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner>
                <Popover.Popup data-testid="popup">
                  <Popover.Title>Title</Popover.Title>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        );

        expect(screen.getByTestId('popup')).toBeInTheDocument();
      }
    );
  });

  describe('interaction', () => {
    it('opens popover on trigger click', async () => {
      const user = userEvent.setup();
      render(
        <Popover.Root>
          <Popover.Trigger>Open Popover</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Popover Title</Popover.Title>
                <Popover.Description>Popover content here</Popover.Description>
                <Popover.Close />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(screen.queryByText('Popover Title')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Open Popover' }));

      await waitFor(() => {
        expect(screen.getByText('Popover Title')).toBeVisible();
      });
    });

    it('closes popover on close button click', async () => {
      const user = userEvent.setup();
      render(
        <Popover.Root>
          <Popover.Trigger>Open Popover</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Popover Title</Popover.Title>
                <Popover.Close aria-label="Close popover" />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole('button', { name: 'Open Popover' }));

      await waitFor(() => {
        expect(screen.getByText('Popover Title')).toBeVisible();
      });

      await user.click(screen.getByRole('button', { name: 'Close popover' }));

      await waitFor(() => {
        expect(screen.queryByText('Popover Title')).not.toBeInTheDocument();
      });
    });

    it('calls onOpenChange when popover opens/closes', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Popover.Root onOpenChange={onOpenChange}>
          <Popover.Trigger>Open Popover</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Popover Title</Popover.Title>
                <Popover.Close aria-label="Close" />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await user.click(screen.getByRole('button', { name: 'Open Popover' }));
      expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());

      await waitFor(() => {
        expect(screen.getByText('Popover Title')).toBeVisible();
      });

      await user.click(screen.getByRole('button', { name: 'Close' }));
      expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    });

    it('closes popover on outside click by default', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Outside</button>
          <Popover.Root>
            <Popover.Trigger>Open Popover</Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner>
                <Popover.Popup>
                  <Popover.Title>Popover Title</Popover.Title>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        </div>
      );

      await user.click(screen.getByRole('button', { name: 'Open Popover' }));

      await waitFor(() => {
        expect(screen.getByText('Popover Title')).toBeVisible();
      });

      await user.click(screen.getByRole('button', { name: 'Outside' }));

      await waitFor(() => {
        expect(screen.queryByText('Popover Title')).not.toBeInTheDocument();
      });
    });
  });

  describe('controlled mode', () => {
    it('works in controlled mode', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [open, setOpen] = React.useState(false);
        return (
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger>Open Popover</Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner>
                <Popover.Popup>
                  <Popover.Title>Controlled Popover</Popover.Title>
                  <Popover.Close />
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        );
      };

      render(<TestComponent />);

      expect(screen.queryByText('Controlled Popover')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Open Popover' }));

      await waitFor(() => {
        expect(screen.getByText('Controlled Popover')).toBeVisible();
      });
    });
  });

  describe('positioning', () => {
    it('accepts side prop', async () => {
      render(
        <Popover.Root open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner side="bottom">
              <Popover.Popup>Content</Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });

    it('accepts align prop', async () => {
      render(
        <Popover.Root open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner align="start">
              <Popover.Popup>Content</Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });
  });

  describe('className merging', () => {
    it('merges custom className on trigger', () => {
      render(
        <Popover.Root>
          <Popover.Trigger className="custom-class">Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>Content</Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(screen.getByText('Open')).toHaveClass('custom-class');
    });

    it('merges custom className on popup', () => {
      render(
        <Popover.Root open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup className="custom-class" data-testid="popup">
                Content
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(screen.getByTestId('popup')).toHaveClass('custom-class');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to popup', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Popover.Root open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup ref={ref}>
                <Popover.Title>Title</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to trigger', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Popover.Root>
          <Popover.Trigger ref={ref}>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Title</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('forwards ref to close button', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Popover.Root open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Title</Popover.Title>
                <Popover.Close ref={ref} />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Popover.Root open>
          <Popover.Trigger>Open Popover</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Accessible Popover</Popover.Title>
                <Popover.Description>This is an accessible popover description.</Popover.Description>
                <Popover.Close aria-label="Close popover" />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      const results = await axe(container, {
        rules: {
          'aria-command-name': { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('renders title as heading', () => {
      render(
        <Popover.Root open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Popover Heading</Popover.Title>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(screen.getByRole('heading', { name: 'Popover Heading' })).toBeInTheDocument();
    });
  });

  describe('custom close button content', () => {
    it('renders custom close button content', () => {
      render(
        <Popover.Root open>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner>
              <Popover.Popup>
                <Popover.Title>Title</Popover.Title>
                <Popover.Close>Custom Close</Popover.Close>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      );

      expect(screen.getByRole('button', { name: 'Custom Close' })).toBeInTheDocument();
    });
  });
});
