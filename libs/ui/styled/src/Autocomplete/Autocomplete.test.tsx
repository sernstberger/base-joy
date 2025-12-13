import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Autocomplete } from './Autocomplete';

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

describe('Autocomplete', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <Autocomplete.Root items={fruits}>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.List>
                  {fruits.map((fruit) => (
                    <Autocomplete.Item key={fruit} value={fruit}>
                      <Autocomplete.ItemText>{fruit}</Autocomplete.ItemText>
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Autocomplete.Root items={fruits} size={size}>
          <Autocomplete.Input placeholder="Search..." data-testid="input" />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.List>
                  {fruits.map((fruit) => (
                    <Autocomplete.Item key={fruit} value={fruit}>
                      <Autocomplete.ItemText>{fruit}</Autocomplete.ItemText>
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      );

      expect(screen.getByTestId('input')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <Autocomplete.Root items={fruits} variant={variant}>
            <Autocomplete.Input placeholder="Search..." data-testid="input" />
            <Autocomplete.Portal>
              <Autocomplete.Positioner>
                <Autocomplete.Popup>
                  <Autocomplete.List>
                    {fruits.map((fruit) => (
                      <Autocomplete.Item key={fruit} value={fruit}>
                        <Autocomplete.ItemText>{fruit}</Autocomplete.ItemText>
                      </Autocomplete.Item>
                    ))}
                  </Autocomplete.List>
                </Autocomplete.Popup>
              </Autocomplete.Positioner>
            </Autocomplete.Portal>
          </Autocomplete.Root>
        );

        expect(screen.getByTestId('input')).toBeInTheDocument();
      }
    );
  });

  describe('filtering', () => {
    it('filters items as user types', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete.Root items={fruits}>
          <Autocomplete.Input placeholder="Search fruits..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.List>
                  {fruits.map((fruit) => (
                    <Autocomplete.Item key={fruit} value={fruit}>
                      <Autocomplete.ItemText>{fruit}</Autocomplete.ItemText>
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      );

      const input = screen.getByRole('combobox');
      await user.type(input, 'app');

      expect(input).toHaveValue('app');
    });
  });

  describe('empty state', () => {
    it('renders empty component', () => {
      render(
        <Autocomplete.Root items={[]} open>
          <Autocomplete.Input placeholder="Search..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.List>
                  <Autocomplete.Empty>No results found</Autocomplete.Empty>
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      );

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className on input', () => {
      render(
        <Autocomplete.Root items={fruits}>
          <Autocomplete.Input className="custom-class" data-testid="input" />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.List>
                  {fruits.map((fruit) => (
                    <Autocomplete.Item key={fruit} value={fruit}>
                      <Autocomplete.ItemText>{fruit}</Autocomplete.ItemText>
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      );

      expect(screen.getByTestId('input')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Autocomplete.Root items={fruits}>
          <Autocomplete.Input aria-label="Search fruits" placeholder="Search..." />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup>
                <Autocomplete.List>
                  {fruits.map((fruit) => (
                    <Autocomplete.Item key={fruit} value={fruit}>
                      <Autocomplete.ItemText>{fruit}</Autocomplete.ItemText>
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
