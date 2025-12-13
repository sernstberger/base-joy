import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Select } from './Select';
import type { SelectOption } from './Select';

const basicOptions: SelectOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

const groupedOptions: SelectOption[] = [
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
    ],
  },
];

describe('Select', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(<Select options={basicOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Select options={basicOptions} placeholder="Choose one..." />);
      expect(screen.getByText('Choose one...')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<Select options={basicOptions} size={size} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(<Select options={basicOptions} variant={variant} />);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      }
    );
  });

  describe('interaction', () => {
    it('opens popup on trigger click', async () => {
      const user = userEvent.setup();
      render(<Select options={basicOptions} />);

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });

    it('selects item on click', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Select options={basicOptions} onValueChange={onChange} />);

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
      render(<Select options={groupedOptions} />);

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Carrot')).toBeInTheDocument();
    });
  });

  describe('disabled options', () => {
    it('renders disabled options', async () => {
      const user = userEvent.setup();
      const optionsWithDisabled: SelectOption[] = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
      ];
      render(<Select options={optionsWithDisabled} />);

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('Option B')).toBeInTheDocument();
    });
  });

  describe('custom rendering', () => {
    it('supports renderOption prop', async () => {
      const user = userEvent.setup();
      render(
        <Select
          options={basicOptions}
          renderOption={(option) => (
            <span data-testid={`custom-${option.value}`}>{option.label} (custom)</span>
          )}
        />
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByTestId('custom-a')).toBeInTheDocument();
      expect(screen.getByText('Option A (custom)')).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className on trigger', () => {
      render(<Select options={basicOptions} className="custom-class" />);
      expect(screen.getByRole('combobox')).toHaveClass('custom-class');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to trigger element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Select ref={ref} options={basicOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Select options={basicOptions} aria-label="Select option" />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
