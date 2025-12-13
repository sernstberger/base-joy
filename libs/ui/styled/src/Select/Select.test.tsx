import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Select } from './Select';

describe('Select', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="a">
                  <Select.ItemText>Option A</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Select.Root size={size}>
          <Select.Trigger data-testid="trigger">
            <Select.Value placeholder="Select..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="a">
                  <Select.ItemText>Option A</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      expect(screen.getByTestId('trigger')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <Select.Root variant={variant}>
            <Select.Trigger data-testid="trigger">
              <Select.Value placeholder="Select..." />
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <Select.Item value="a">
                    <Select.ItemText>Option A</Select.ItemText>
                  </Select.Item>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        );

        expect(screen.getByTestId('trigger')).toBeInTheDocument();
      }
    );
  });

  describe('interaction', () => {
    it('opens popup on trigger click', async () => {
      const user = userEvent.setup();
      render(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="a">
                  <Select.ItemText>Option A</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });

    it('selects item on click', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Select.Root onValueChange={onChange}>
          <Select.Trigger>
            <Select.Value placeholder="Select..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="a">
                  <Select.ItemText>Option A</Select.ItemText>
                </Select.Item>
                <Select.Item value="b">
                  <Select.ItemText>Option B</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Option B')).toBeVisible();
      });
      await user.click(screen.getByText('Option B'));

      expect(onChange).toHaveBeenCalledWith('b', expect.anything());
    });
  });

  describe('groups', () => {
    it('renders groups with labels', async () => {
      const user = userEvent.setup();
      render(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Group>
                  <Select.GroupLabel>Fruits</Select.GroupLabel>
                  <Select.Item value="apple">
                    <Select.ItemText>Apple</Select.ItemText>
                  </Select.Item>
                </Select.Group>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('Fruits')).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className on trigger', () => {
      render(
        <Select.Root>
          <Select.Trigger className="custom-class" data-testid="trigger">
            <Select.Value placeholder="Select..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="a">
                  <Select.ItemText>Option A</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      expect(screen.getByTestId('trigger')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Select.Root>
          <Select.Trigger aria-label="Select option">
            <Select.Value placeholder="Select..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner>
              <Select.Popup>
                <Select.Item value="a">
                  <Select.ItemText>Option A</Select.ItemText>
                </Select.Item>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
