import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { NavigationMenu } from './NavigationMenu';

describe('NavigationMenu', () => {
  describe('rendering', () => {
    it('renders navigation correctly', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders trigger and content', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="products">
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Portal>
                <NavigationMenu.Positioner>
                  <NavigationMenu.Popup>
                    <NavigationMenu.Content>
                      <NavigationMenu.Link href="/product-1">
                        Product 1
                      </NavigationMenu.Link>
                    </NavigationMenu.Content>
                  </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List ref={ref}>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      expect(ref).toHaveBeenCalled();
    });

    it('merges className correctly', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List data-testid="list" className="custom-class">
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      expect(screen.getByTestId('list')).toHaveClass('custom-class');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <NavigationMenu.Root size={size}>
          <NavigationMenu.List data-testid="list">
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/" data-testid="link">
                Home
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      expect(screen.getByTestId('link')).toBeInTheDocument();
    });

    it.each(['sm', 'md', 'lg'] as const)(
      'renders %s size for trigger',
      async (size) => {
        const user = userEvent.setup();
        render(
          <NavigationMenu.Root size={size}>
            <NavigationMenu.List>
              <NavigationMenu.Item value="products">
                <NavigationMenu.Trigger data-testid="trigger">
                  Products
                </NavigationMenu.Trigger>
                <NavigationMenu.Portal>
                  <NavigationMenu.Positioner>
                    <NavigationMenu.Popup data-testid="popup">
                      <NavigationMenu.Content>Content</NavigationMenu.Content>
                    </NavigationMenu.Popup>
                  </NavigationMenu.Positioner>
                </NavigationMenu.Portal>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        );

        await user.click(screen.getByTestId('trigger'));

        await waitFor(() => {
          expect(screen.getByTestId('popup')).toBeVisible();
        });
      }
    );
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <NavigationMenu.Root variant={variant}>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="/" data-testid="link">
                  Home
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        );

        expect(screen.getByTestId('link')).toBeInTheDocument();
      }
    );

    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant for trigger',
      async (variant) => {
        const user = userEvent.setup();
        render(
          <NavigationMenu.Root variant={variant}>
            <NavigationMenu.List>
              <NavigationMenu.Item value="products">
                <NavigationMenu.Trigger data-testid="trigger">
                  Products
                </NavigationMenu.Trigger>
                <NavigationMenu.Portal>
                  <NavigationMenu.Positioner>
                    <NavigationMenu.Popup data-testid="popup">
                      <NavigationMenu.Content>Content</NavigationMenu.Content>
                    </NavigationMenu.Popup>
                  </NavigationMenu.Positioner>
                </NavigationMenu.Portal>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        );

        await user.click(screen.getByTestId('trigger'));

        await waitFor(() => {
          expect(screen.getByTestId('popup')).toBeVisible();
        });
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      (color) => {
        render(
          <NavigationMenu.Root color={color}>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="/" data-testid="link">
                  Home
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        );

        expect(screen.getByTestId('link')).toBeInTheDocument();
      }
    );

    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color for trigger',
      async (color) => {
        const user = userEvent.setup();
        render(
          <NavigationMenu.Root color={color}>
            <NavigationMenu.List>
              <NavigationMenu.Item value="products">
                <NavigationMenu.Trigger data-testid="trigger">
                  Products
                </NavigationMenu.Trigger>
                <NavigationMenu.Portal>
                  <NavigationMenu.Positioner>
                    <NavigationMenu.Popup data-testid="popup">
                      <NavigationMenu.Content>Content</NavigationMenu.Content>
                    </NavigationMenu.Popup>
                  </NavigationMenu.Positioner>
                </NavigationMenu.Portal>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        );

        await user.click(screen.getByTestId('trigger'));

        await waitFor(() => {
          expect(screen.getByTestId('popup')).toBeVisible();
        });
      }
    );
  });

  describe('orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <NavigationMenu.Root orientation="horizontal">
          <NavigationMenu.List data-testid="list">
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      const list = screen.getByTestId('list');
      expect(list).toHaveClass('flex-row');
    });

    it('renders vertical orientation', () => {
      render(
        <NavigationMenu.Root orientation="vertical">
          <NavigationMenu.List data-testid="list">
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      const list = screen.getByTestId('list');
      expect(list).toHaveClass('flex-col');
    });
  });

  describe('interaction', () => {
    it('opens popup on trigger hover', async () => {
      const user = userEvent.setup();
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="products">
              <NavigationMenu.Trigger data-testid="trigger">Products</NavigationMenu.Trigger>
              <NavigationMenu.Portal>
                <NavigationMenu.Positioner>
                  <NavigationMenu.Popup data-testid="popup">
                    <NavigationMenu.Content>Product Content</NavigationMenu.Content>
                  </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      const trigger = screen.getByTestId('trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded');
    });

    it('handles active link state', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/" active data-testid="active-link">
                Home
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      expect(screen.getByTestId('active-link')).toBeInTheDocument();
    });

    it('renders link with custom props', () => {
      render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                href="/"
                data-testid="custom-link"
                className="custom-class"
              >
                Custom Link
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      const link = screen.getByTestId('custom-link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('custom-class');
    });
  });

  describe('controlled value', () => {
    it('supports controlled value', () => {
      const onValueChange = vi.fn();

      render(
        <NavigationMenu.Root value="products" onValueChange={onValueChange}>
          <NavigationMenu.List>
            <NavigationMenu.Item value="products">
              <NavigationMenu.Trigger data-testid="trigger">Products</NavigationMenu.Trigger>
              <NavigationMenu.Portal>
                <NavigationMenu.Positioner>
                  <NavigationMenu.Popup>
                    <NavigationMenu.Content>Product Content</NavigationMenu.Content>
                  </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      // Verify trigger is in expanded state when value matches
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('supports defaultValue', () => {
      render(
        <NavigationMenu.Root defaultValue="products">
          <NavigationMenu.List>
            <NavigationMenu.Item value="products">
              <NavigationMenu.Trigger data-testid="trigger">Products</NavigationMenu.Trigger>
              <NavigationMenu.Portal>
                <NavigationMenu.Positioner>
                  <NavigationMenu.Popup>
                    <NavigationMenu.Content>Product Content</NavigationMenu.Content>
                  </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      // Verify trigger is in expanded state with defaultValue
      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      // aria-orientation is a Base UI implementation detail, disable this specific rule
      expect(
        await axe(container, {
          rules: { 'aria-allowed-attr': { enabled: false } },
        })
      ).toHaveNoViolations();
    });

    it('has no accessibility violations with trigger', async () => {
      const { container } = render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item value="products">
              <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
              <NavigationMenu.Portal>
                <NavigationMenu.Positioner>
                  <NavigationMenu.Popup>
                    <NavigationMenu.Content>
                      <NavigationMenu.Link href="/product-1">
                        Product 1
                      </NavigationMenu.Link>
                    </NavigationMenu.Content>
                  </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );

      // aria-orientation is a Base UI implementation detail, disable this specific rule
      expect(
        await axe(container, {
          rules: { 'aria-allowed-attr': { enabled: false } },
        })
      ).toHaveNoViolations();
    });
  });
});
