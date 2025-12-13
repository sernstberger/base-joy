import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { CheckboxGroup } from './CheckboxGroup';
import type { CheckboxOption } from './CheckboxGroup';

const basicOptions: CheckboxOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('CheckboxGroup', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(<CheckboxGroup options={basicOptions} aria-label="Select options" />);
      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByText('Option B')).toBeInTheDocument();
      expect(screen.getByText('Option C')).toBeInTheDocument();
    });

    it('renders all checkboxes', () => {
      render(<CheckboxGroup options={basicOptions} aria-label="Select options" />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3);
    });
  });

  describe('orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <CheckboxGroup
          options={basicOptions}
          orientation="horizontal"
          data-testid="group"
          aria-label="Select options"
        />
      );
      expect(screen.getByTestId('group')).toHaveClass('flex-row');
    });

    it('renders vertical orientation', () => {
      render(
        <CheckboxGroup
          options={basicOptions}
          orientation="vertical"
          data-testid="group"
          aria-label="Select options"
        />
      );
      expect(screen.getByTestId('group')).toHaveClass('flex-col');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <CheckboxGroup
          options={basicOptions}
          size={size}
          data-testid="group"
          aria-label="Select options"
        />
      );
      expect(screen.getByTestId('group')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <CheckboxGroup
            options={basicOptions}
            variant={variant}
            aria-label="Select options"
          />
        );
        expect(screen.getAllByRole('checkbox')).toHaveLength(3);
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      (color) => {
        render(
          <CheckboxGroup
            options={basicOptions}
            color={color}
            aria-label="Select options"
          />
        );
        expect(screen.getAllByRole('checkbox')).toHaveLength(3);
      }
    );
  });

  describe('interaction', () => {
    it('handles value changes', async () => {
      const onChange = vi.fn();
      render(
        <CheckboxGroup
          options={basicOptions}
          value={['a']}
          onValueChange={onChange}
          aria-label="Select options"
        />
      );

      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);

      expect(onChange).toHaveBeenCalled();
    });

    it('respects defaultValue', () => {
      render(
        <CheckboxGroup
          options={basicOptions}
          defaultValue={['a', 'b']}
          aria-label="Select options"
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).toHaveAttribute('data-checked', '');
      expect(checkboxes[1]).toHaveAttribute('data-checked', '');
      expect(checkboxes[2]).not.toHaveAttribute('data-checked');
    });

    it('allows multiple selections', async () => {
      const onChange = vi.fn();
      render(
        <CheckboxGroup
          options={basicOptions}
          defaultValue={['a']}
          onValueChange={onChange}
          aria-label="Select options"
        />
      );

      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);

      expect(onChange).toHaveBeenCalledWith(['a', 'b'], expect.anything());
    });
  });

  describe('disabled options', () => {
    it('renders disabled options', () => {
      const optionsWithDisabled: CheckboxOption[] = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
        { value: 'c', label: 'Option C' },
      ];
      render(
        <CheckboxGroup
          options={optionsWithDisabled}
          aria-label="Select options"
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[1]).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not call onChange when clicking disabled option', async () => {
      const onChange = vi.fn();
      const optionsWithDisabled: CheckboxOption[] = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
      ];
      render(
        <CheckboxGroup
          options={optionsWithDisabled}
          onValueChange={onChange}
          aria-label="Select options"
        />
      );

      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('disabled group', () => {
    it('disables all options when group is disabled', () => {
      render(
        <CheckboxGroup
          options={basicOptions}
          disabled
          aria-label="Select options"
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  describe('className merging', () => {
    it('merges custom className on root', () => {
      render(
        <CheckboxGroup
          options={basicOptions}
          className="custom-class"
          data-testid="group"
          aria-label="Select options"
        />
      );
      expect(screen.getByTestId('group')).toHaveClass('custom-class');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CheckboxGroup
          ref={ref}
          options={basicOptions}
          aria-label="Select options"
        />
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <CheckboxGroup
          options={basicOptions}
          aria-label="Select options"
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
