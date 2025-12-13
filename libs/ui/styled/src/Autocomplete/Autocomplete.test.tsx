import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Autocomplete } from './Autocomplete';
import type { AutocompleteOption } from './Autocomplete';

const fruits: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

describe('Autocomplete', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <Autocomplete
          options={fruits}
          placeholder="Search fruits..."
          aria-label="Search fruits"
        />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Autocomplete
          options={fruits}
          size={size}
          placeholder="Search..."
          aria-label="Search"
        />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <Autocomplete
            options={fruits}
            variant={variant}
            placeholder="Search..."
            aria-label="Search"
          />
        );

        expect(screen.getByRole('combobox')).toBeInTheDocument();
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      (color) => {
        render(
          <Autocomplete
            options={fruits}
            color={color}
            placeholder="Search..."
            aria-label="Search"
          />
        );

        expect(screen.getByRole('combobox')).toBeInTheDocument();
      }
    );
  });

  describe('filtering', () => {
    it('filters items as user types', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete
          options={fruits}
          placeholder="Search fruits..."
          aria-label="Search fruits"
        />
      );

      const input = screen.getByRole('combobox');
      await user.type(input, 'app');

      expect(input).toHaveValue('app');
    });
  });

  describe('empty state', () => {
    it('renders empty message', () => {
      render(
        <Autocomplete
          options={[]}
          placeholder="Search..."
          aria-label="Search"
          open
        />
      );

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('renders custom empty message', () => {
      render(
        <Autocomplete
          options={[]}
          placeholder="Search..."
          aria-label="Search"
          emptyMessage="Nothing here"
          open
        />
      );

      expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('renders disabled autocomplete', () => {
      render(
        <Autocomplete
          options={fruits}
          disabled
          placeholder="Disabled"
          aria-label="Disabled autocomplete"
        />
      );

      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('renders disabled options', () => {
      const optionsWithDisabled: AutocompleteOption[] = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana', disabled: true },
        { value: 'cherry', label: 'Cherry' },
      ];

      render(
        <Autocomplete
          options={optionsWithDisabled}
          placeholder="Search..."
          aria-label="Search"
          open
        />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('groups', () => {
    it('renders grouped options', () => {
      const groupedOptions: AutocompleteOption[] = [
        {
          group: 'Citrus',
          options: [
            { value: 'orange', label: 'Orange' },
            { value: 'lemon', label: 'Lemon' },
          ],
        },
        {
          group: 'Berries',
          options: [
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'blueberry', label: 'Blueberry' },
          ],
        },
      ];

      render(
        <Autocomplete
          options={groupedOptions}
          placeholder="Search..."
          aria-label="Search"
          open
        />
      );

      expect(screen.getByText('Citrus')).toBeInTheDocument();
      expect(screen.getByText('Berries')).toBeInTheDocument();
    });
  });

  describe('custom rendering', () => {
    it('renders custom option content', () => {
      render(
        <Autocomplete
          options={fruits}
          renderOption={(option) => `🍎 ${option.label}`}
          placeholder="Search..."
          aria-label="Search"
          open
        />
      );

      expect(screen.getByText(/🍎 Apple/)).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className on input', () => {
      render(
        <Autocomplete
          options={fruits}
          className="custom-class"
          placeholder="Search..."
          aria-label="Search"
        />
      );

      expect(screen.getByRole('combobox')).toHaveClass('custom-class');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = { current: null };
      render(
        <Autocomplete
          ref={ref}
          options={fruits}
          placeholder="Search..."
          aria-label="Search"
        />
      );

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Autocomplete
          options={fruits}
          aria-label="Search fruits"
          placeholder="Search..."
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-label', () => {
      render(
        <Autocomplete
          options={fruits}
          aria-label="Search fruits"
          placeholder="Search..."
        />
      );

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Search fruits');
    });

    it('supports aria-labelledby', () => {
      render(
        <div>
          <label id="fruit-label">Choose a fruit</label>
          <Autocomplete
            options={fruits}
            aria-labelledby="fruit-label"
            placeholder="Search..."
          />
        </div>
      );

      expect(screen.getByRole('combobox')).toHaveAttribute(
        'aria-labelledby',
        'fruit-label'
      );
    });
  });
});
