import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Combobox } from './Combobox';
import type { ComboboxOption } from './Combobox';

const fruits: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const groupedOptions: ComboboxOption[] = [
  {
    group: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    group: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
    ],
  },
];

describe('Combobox', () => {
  describe('rendering', () => {
    it('renders correctly with options', () => {
      render(
        <Combobox
          options={fruits}
          placeholder="Search fruits..."
          aria-label="Fruit selector"
        />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search fruits...')).toBeInTheDocument();
    });

    it('renders placeholder text', () => {
      render(
        <Combobox
          options={fruits}
          placeholder="Select a fruit"
          aria-label="Fruit selector"
        />
      );

      expect(screen.getByPlaceholderText('Select a fruit')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Combobox
          options={fruits}
          size={size}
          aria-label="Fruit selector"
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
          <Combobox
            options={fruits}
            variant={variant}
            aria-label="Fruit selector"
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
          <Combobox
            options={fruits}
            color={color}
            aria-label="Fruit selector"
          />
        );

        expect(screen.getByRole('combobox')).toBeInTheDocument();
      }
    );
  });

  describe('interaction', () => {
    it('shows options when focused and typing', async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={fruits}
          placeholder="Search fruits..."
          aria-label="Fruit selector"
        />
      );

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeVisible();
      });
    });

    it('can type to filter', async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={fruits}
          placeholder="Search fruits..."
          aria-label="Fruit selector"
        />
      );

      await user.type(screen.getByRole('combobox'), 'app');
      expect(screen.getByRole('combobox')).toHaveValue('app');
    });
  });

  describe('groups', () => {
    it('renders grouped options with labels', async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={groupedOptions}
          placeholder="Search..."
          aria-label="Food selector"
        />
      );

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Fruits')).toBeVisible();
        expect(screen.getByText('Vegetables')).toBeVisible();
      });
    });
  });

  describe('disabled', () => {
    it('renders disabled state', () => {
      render(
        <Combobox
          options={fruits}
          disabled
          aria-label="Fruit selector"
        />
      );

      expect(screen.getByRole('combobox')).toHaveAttribute('disabled');
    });

    it('renders disabled option', async () => {
      const user = userEvent.setup();
      const optionsWithDisabled: ComboboxOption[] = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana', disabled: true },
      ];

      render(
        <Combobox
          options={optionsWithDisabled}
          placeholder="Search..."
          aria-label="Fruit selector"
        />
      );

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeVisible();
      });
    });
  });

  describe('empty state', () => {
    it('renders custom empty message', async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={fruits}
          emptyMessage="Nothing here"
          aria-label="Fruit selector"
        />
      );

      await user.type(screen.getByRole('combobox'), 'zzzzz');
      await waitFor(() => {
        expect(screen.getByText('Nothing here')).toBeVisible();
      });
    });
  });

  describe('custom rendering', () => {
    it('uses renderOption for custom item display', async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={fruits}
          renderOption={(option) => <span data-testid={`custom-${option.value}`}>{option.label} 🍎</span>}
          aria-label="Fruit selector"
        />
      );

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByTestId('custom-apple')).toBeInTheDocument();
      });
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <Combobox
          options={fruits}
          className="custom-class"
          aria-label="Fruit selector"
        />
      );

      expect(screen.getByRole('combobox')).toHaveClass('custom-class');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(
        <Combobox
          ref={ref}
          options={fruits}
          aria-label="Fruit selector"
        />
      );

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Combobox
          options={fruits}
          aria-label="Fruit selector"
          placeholder="Search fruits..."
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-label', () => {
      render(
        <Combobox
          options={fruits}
          aria-label="Select your favorite fruit"
        />
      );

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Select your favorite fruit');
    });
  });
});
