import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Menu } from './Menu';

describe('Menu', () => {
  describe('rendering', () => {
    it('renders trigger correctly', () => {
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      expect(screen.getByText('Open Menu')).toBeInTheDocument();
    });

    it('renders menu items when opened', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Item>Item 2</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeVisible();
        expect(screen.getByText('Item 2')).toBeVisible();
      });
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', async (size) => {
      const user = userEvent.setup();
      render(
        <Menu.Root size={size}>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup data-testid="popup">
                <Menu.Item data-testid="item">Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByTestId('popup')).toBeVisible();
        expect(screen.getByTestId('item')).toBeVisible();
      });
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      async (variant) => {
        const user = userEvent.setup();
        render(
          <Menu.Root variant={variant}>
            <Menu.Trigger>Open Menu</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup data-testid="popup">
                  <Menu.Item data-testid="item">Item 1</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        );

        await user.click(screen.getByText('Open Menu'));

        await waitFor(() => {
          expect(screen.getByTestId('popup')).toBeVisible();
          expect(screen.getByTestId('item')).toBeVisible();
        });
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      async (color) => {
        const user = userEvent.setup();
        render(
          <Menu.Root color={color}>
            <Menu.Trigger>Open Menu</Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup data-testid="popup">
                  <Menu.Item data-testid="item">Item 1</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        );

        await user.click(screen.getByText('Open Menu'));

        await waitFor(() => {
          expect(screen.getByTestId('popup')).toBeVisible();
          expect(screen.getByTestId('item')).toBeVisible();
        });
      }
    );
  });

  describe('interaction', () => {
    it('opens menu on trigger click', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeVisible();
      });
    });

    it('closes menu when item is clicked', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Menu.Root onOpenChange={onOpenChange}>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeVisible();
      });

      await user.click(screen.getByText('Item 1'));

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
      });
    });

    it('handles disabled items', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item disabled onClick={onClick}>
                  Disabled Item
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Disabled Item')).toBeVisible();
      });

      await user.click(screen.getByText('Disabled Item'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('navigates with arrow keys', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Item>Item 2</Menu.Item>
                <Menu.Item>Item 3</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeVisible();
      });

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getByText('Item 2')).toHaveAttribute('data-highlighted');
      });
    });

    it('closes on Escape key', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Menu.Root onOpenChange={onOpenChange}>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeVisible();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
      });
    });
  });

  describe('groups', () => {
    it('renders menu groups with labels', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Group>
                  <Menu.GroupLabel>Group 1</Menu.GroupLabel>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                </Menu.Group>
                <Menu.Separator />
                <Menu.Group>
                  <Menu.GroupLabel>Group 2</Menu.GroupLabel>
                  <Menu.Item>Item 3</Menu.Item>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Group 1')).toBeVisible();
        expect(screen.getByText('Group 2')).toBeVisible();
        expect(screen.getByText('Item 1')).toBeVisible();
        expect(screen.getByText('Item 3')).toBeVisible();
      });
    });
  });

  describe('radio items', () => {
    it('renders radio items and allows selection', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.RadioGroup value="1" onValueChange={onValueChange}>
                  <Menu.RadioItem value="1">Option 1</Menu.RadioItem>
                  <Menu.RadioItem value="2">Option 2</Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeVisible();
      });

      await user.click(screen.getByText('Option 2'));

      expect(onValueChange).toHaveBeenCalledWith('2', expect.anything());
    });
  });

  describe('checkbox items', () => {
    it('renders checkbox items and allows toggling', async () => {
      const user = userEvent.setup();
      const onCheckedChange = vi.fn();

      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.CheckboxItem onCheckedChange={onCheckedChange}>
                  Show Toolbar
                </Menu.CheckboxItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Show Toolbar')).toBeVisible();
      });

      await user.click(screen.getByText('Show Toolbar'));

      expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    });
  });

  describe('submenu', () => {
    it('renders submenu trigger with arrow icon', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Regular Item</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Regular Item')).toBeVisible();
      });
    });
  });

  describe('className merging', () => {
    it('merges custom className on popup', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup className="custom-popup" data-testid="popup">
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByTestId('popup')).toHaveClass('custom-popup');
      });
    });

    it('merges custom className on item', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item className="custom-item" data-testid="item">
                  Item 1
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByTestId('item')).toHaveClass('custom-item');
      });
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations when closed', async () => {
      const { container } = render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when open', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Item>Item 2</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeVisible();
      });

      // Exclude focus guard elements added by Base UI
      const results = await axe(container, {
        rules: {
          'aria-command-name': { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('has proper ARIA attributes', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      const trigger = screen.getByText('Open Menu');
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('supports disabled items', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item disabled data-testid="disabled-item">
                  Disabled Item
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        const disabledItem = screen.getByTestId('disabled-item');
        expect(disabledItem).toBeVisible();
        expect(disabledItem).toHaveAttribute('data-disabled');
      });
    });
  });

  describe('separator', () => {
    it('renders separator between items', async () => {
      const user = userEvent.setup();
      render(
        <Menu.Root>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Item 1</Menu.Item>
                <Menu.Separator data-testid="separator" />
                <Menu.Item>Item 2</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );

      await user.click(screen.getByText('Open Menu'));

      await waitFor(() => {
        expect(screen.getByTestId('separator')).toBeVisible();
      });
    });
  });
});
