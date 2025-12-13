import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Combobox } from './Combobox';

describe('Combobox', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <Combobox.Root>
          <Combobox.Input placeholder="Search..." />
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.Popup>
                <Combobox.List>
                  <Combobox.Item value="a">
                    <Combobox.ItemText>Option A</Combobox.ItemText>
                  </Combobox.Item>
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Combobox.Root size={size}>
          <Combobox.Input placeholder="Search..." data-testid="input" />
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.Popup>
                <Combobox.List>
                  <Combobox.Item value="a">
                    <Combobox.ItemText>Option A</Combobox.ItemText>
                  </Combobox.Item>
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      );

      expect(screen.getByTestId('input')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <Combobox.Root variant={variant}>
            <Combobox.Input placeholder="Search..." data-testid="input" />
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup>
                  <Combobox.List>
                    <Combobox.Item value="a">
                      <Combobox.ItemText>Option A</Combobox.ItemText>
                    </Combobox.Item>
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        );

        expect(screen.getByTestId('input')).toBeInTheDocument();
      }
    );
  });

  describe('interaction', () => {
    it('shows options on focus', async () => {
      const user = userEvent.setup();
      render(
        <Combobox.Root>
          <Combobox.Input placeholder="Search..." />
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.Popup>
                <Combobox.List>
                  <Combobox.Item value="apple">
                    <Combobox.ItemText>Apple</Combobox.ItemText>
                  </Combobox.Item>
                  <Combobox.Item value="banana">
                    <Combobox.ItemText>Banana</Combobox.ItemText>
                  </Combobox.Item>
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('can type to filter', async () => {
      const user = userEvent.setup();
      render(
        <Combobox.Root>
          <Combobox.Input placeholder="Search..." />
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.Popup>
                <Combobox.List>
                  <Combobox.Item value="apple">
                    <Combobox.ItemText>Apple</Combobox.ItemText>
                  </Combobox.Item>
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      );

      await user.type(screen.getByRole('combobox'), 'app');
      expect(screen.getByRole('combobox')).toHaveValue('app');
    });
  });

  describe('empty state', () => {
    it('renders empty component when no matches', () => {
      render(
        <Combobox.Root open>
          <Combobox.Input placeholder="Search..." />
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.Popup>
                <Combobox.List>
                  <Combobox.Empty>No results found</Combobox.Empty>
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      );

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className on input', () => {
      render(
        <Combobox.Root>
          <Combobox.Input className="custom-class" data-testid="input" />
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.Popup>
                <Combobox.List>
                  <Combobox.Item value="a">
                    <Combobox.ItemText>Option A</Combobox.ItemText>
                  </Combobox.Item>
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      );

      expect(screen.getByTestId('input')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Combobox.Root>
          <Combobox.Input aria-label="Search fruits" placeholder="Search..." />
          <Combobox.Portal>
            <Combobox.Positioner>
              <Combobox.Popup>
                <Combobox.List>
                  <Combobox.Item value="a">
                    <Combobox.ItemText>Option A</Combobox.ItemText>
                  </Combobox.Item>
                </Combobox.List>
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
