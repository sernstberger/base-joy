import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { PreviewCard } from './PreviewCard';

describe('PreviewCard', () => {
  describe('rendering', () => {
    it('renders correctly', async () => {
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover me</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>
                Preview content
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Preview content')).toBeInTheDocument();
      });
    });

    it('renders trigger element', () => {
      render(
        <PreviewCard.Root>
          <PreviewCard.Trigger>Hover me</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>Content</PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('renders with arrow', async () => {
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>Content</PreviewCard.Popup>
              <PreviewCard.Arrow data-testid="arrow" />
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(screen.getByTestId('arrow')).toBeInTheDocument();
      });
    });

    it('renders with backdrop', async () => {
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Backdrop data-testid="backdrop" />
            <PreviewCard.Positioner>
              <PreviewCard.Popup>Content</PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(screen.getByTestId('backdrop')).toBeInTheDocument();
      });
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', async (size) => {
      render(
        <PreviewCard.Root size={size} open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup data-testid="popup">
                Content
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(screen.getByTestId('popup')).toBeInTheDocument();
      });
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      async (variant) => {
        render(
          <PreviewCard.Root variant={variant} open>
            <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
            <PreviewCard.Portal>
              <PreviewCard.Positioner>
                <PreviewCard.Popup data-testid="popup">
                  Content
                </PreviewCard.Popup>
              </PreviewCard.Positioner>
            </PreviewCard.Portal>
          </PreviewCard.Root>
        );

        await waitFor(() => {
          expect(screen.getByTestId('popup')).toBeInTheDocument();
        });
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      async (color) => {
        render(
          <PreviewCard.Root color={color} open>
            <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
            <PreviewCard.Portal>
              <PreviewCard.Positioner>
                <PreviewCard.Popup data-testid="popup">
                  Content
                </PreviewCard.Popup>
              </PreviewCard.Positioner>
            </PreviewCard.Portal>
          </PreviewCard.Root>
        );

        await waitFor(() => {
          expect(screen.getByTestId('popup')).toBeInTheDocument();
        });
      }
    );
  });

  describe('interaction', () => {
    it('opens preview card on hover', async () => {
      const user = userEvent.setup();
      render(
        <PreviewCard.Root>
          <PreviewCard.Trigger>Hover me</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>
                Preview content
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      expect(screen.queryByText('Preview content')).not.toBeInTheDocument();

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('Preview content')).toBeVisible();
      });
    });

    it('closes preview card when hover ends', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Outside</button>
          <PreviewCard.Root>
            <PreviewCard.Trigger>Hover me</PreviewCard.Trigger>
            <PreviewCard.Portal>
              <PreviewCard.Positioner>
                <PreviewCard.Popup>
                  Preview content
                </PreviewCard.Popup>
              </PreviewCard.Positioner>
            </PreviewCard.Portal>
          </PreviewCard.Root>
        </div>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('Preview content')).toBeVisible();
      });

      await user.unhover(screen.getByText('Hover me'));
      await user.hover(screen.getByRole('button', { name: 'Outside' }));

      await waitFor(() => {
        expect(screen.queryByText('Preview content')).not.toBeInTheDocument();
      });
    });

    it('calls onOpenChange when preview card opens/closes', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      render(
        <div>
          <button>Outside</button>
          <PreviewCard.Root onOpenChange={onOpenChange}>
            <PreviewCard.Trigger>Hover me</PreviewCard.Trigger>
            <PreviewCard.Portal>
              <PreviewCard.Positioner>
                <PreviewCard.Popup>
                  Preview content
                </PreviewCard.Popup>
              </PreviewCard.Positioner>
            </PreviewCard.Portal>
          </PreviewCard.Root>
        </div>
      );

      await user.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
      });

      await user.unhover(screen.getByText('Hover me'));
      await user.hover(screen.getByRole('button', { name: 'Outside' }));

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
      });
    });
  });

  describe('controlled mode', () => {
    it('works in controlled mode', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [open, setOpen] = React.useState(false);
        return (
          <div>
            <button onClick={() => setOpen(true)}>Open</button>
            <PreviewCard.Root open={open} onOpenChange={setOpen}>
              <PreviewCard.Trigger>Trigger</PreviewCard.Trigger>
              <PreviewCard.Portal>
                <PreviewCard.Positioner>
                  <PreviewCard.Popup>
                    Controlled preview
                  </PreviewCard.Popup>
                </PreviewCard.Positioner>
              </PreviewCard.Portal>
            </PreviewCard.Root>
          </div>
        );
      };

      render(<TestComponent />);

      expect(screen.queryByText('Controlled preview')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Open' }));

      await waitFor(() => {
        expect(screen.getByText('Controlled preview')).toBeVisible();
      });
    });
  });

  describe('positioning', () => {
    it('accepts side prop', async () => {
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner side="bottom">
              <PreviewCard.Popup>Content</PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });

    it('accepts align prop', async () => {
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner align="start">
              <PreviewCard.Popup>Content</PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });
  });

  describe('className merging', () => {
    it('merges custom className on trigger', () => {
      render(
        <PreviewCard.Root>
          <PreviewCard.Trigger className="custom-class">Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>Content</PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      expect(screen.getByText('Hover')).toHaveClass('custom-class');
    });

    it('merges custom className on popup', async () => {
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup className="custom-class" data-testid="popup">
                Content
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(screen.getByTestId('popup')).toHaveClass('custom-class');
      });
    });

    it('merges custom className on backdrop', async () => {
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Backdrop className="custom-backdrop" data-testid="backdrop" />
            <PreviewCard.Positioner>
              <PreviewCard.Popup>Content</PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(screen.getByTestId('backdrop')).toHaveClass('custom-backdrop');
      });
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to popup', async () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup ref={ref}>
                Content
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });

    it('forwards ref to trigger', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <PreviewCard.Root>
          <PreviewCard.Trigger ref={ref}>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>Content</PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it('forwards ref to backdrop', async () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Backdrop ref={ref} />
            <PreviewCard.Positioner>
              <PreviewCard.Popup>Content</PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });

    it('forwards ref to arrow', async () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>Content</PreviewCard.Popup>
              <PreviewCard.Arrow ref={ref} />
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <PreviewCard.Root open>
          <PreviewCard.Trigger>Hover for preview</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>
                Preview card content with additional information.
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      const results = await axe(container, {
        rules: {
          'aria-command-name': { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('default open', () => {
    it('renders open by default when defaultOpen is true', async () => {
      render(
        <PreviewCard.Root defaultOpen>
          <PreviewCard.Trigger>Hover</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>
                Default open content
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      );

      await waitFor(() => {
        expect(screen.getByText('Default open content')).toBeVisible();
      });
    });
  });
});
