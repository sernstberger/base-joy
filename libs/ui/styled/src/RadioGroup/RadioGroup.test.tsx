import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { RadioGroup } from './RadioGroup';
import type { RadioOption } from './RadioGroup';

const basicOptions: RadioOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('RadioGroup', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(<RadioGroup options={basicOptions} aria-label="Select option" />);
      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByText('Option B')).toBeInTheDocument();
      expect(screen.getByText('Option C')).toBeInTheDocument();
    });

    it('renders all radio buttons', () => {
      render(<RadioGroup options={basicOptions} aria-label="Select option" />);
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3);
    });
  });

  describe('orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <RadioGroup
          options={basicOptions}
          orientation="horizontal"
          data-testid="group"
          aria-label="Select option"
        />
      );
      expect(screen.getByTestId('group')).toHaveClass('flex-row');
    });

    it('renders vertical orientation', () => {
      render(
        <RadioGroup
          options={basicOptions}
          orientation="vertical"
          data-testid="group"
          aria-label="Select option"
        />
      );
      expect(screen.getByTestId('group')).toHaveClass('flex-col');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <RadioGroup
          options={basicOptions}
          size={size}
          data-testid="group"
          aria-label="Select option"
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
          <RadioGroup
            options={basicOptions}
            variant={variant}
            aria-label="Select option"
          />
        );
        expect(screen.getAllByRole('radio')).toHaveLength(3);
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      (color) => {
        render(
          <RadioGroup
            options={basicOptions}
            color={color}
            aria-label="Select option"
          />
        );
        expect(screen.getAllByRole('radio')).toHaveLength(3);
      }
    );
  });

  describe('interaction', () => {
    it('handles value changes', async () => {
      const onChange = vi.fn();
      render(
        <RadioGroup
          options={basicOptions}
          value="a"
          onValueChange={onChange}
          aria-label="Select option"
        />
      );

      const user = userEvent.setup();
      const radios = screen.getAllByRole('radio');
      await user.click(radios[1]);

      expect(onChange).toHaveBeenCalledWith('b', expect.anything());
    });

    it('respects defaultValue', () => {
      render(
        <RadioGroup
          options={basicOptions}
          defaultValue="b"
          aria-label="Select option"
        />
      );

      const radios = screen.getAllByRole('radio');
      expect(radios[1]).toHaveAttribute('data-checked', '');
    });
  });

  describe('disabled options', () => {
    it('renders disabled options', () => {
      const optionsWithDisabled: RadioOption[] = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
        { value: 'c', label: 'Option C' },
      ];
      render(
        <RadioGroup
          options={optionsWithDisabled}
          aria-label="Select option"
        />
      );

      const radios = screen.getAllByRole('radio');
      expect(radios[1]).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not call onChange when clicking disabled option', async () => {
      const onChange = vi.fn();
      const optionsWithDisabled: RadioOption[] = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
      ];
      render(
        <RadioGroup
          options={optionsWithDisabled}
          onValueChange={onChange}
          aria-label="Select option"
        />
      );

      const user = userEvent.setup();
      const radios = screen.getAllByRole('radio');
      await user.click(radios[1]);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('disabled group', () => {
    it('disables all options when group is disabled', () => {
      render(
        <RadioGroup
          options={basicOptions}
          disabled
          aria-label="Select option"
        />
      );

      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  describe('className merging', () => {
    it('merges custom className on root', () => {
      render(
        <RadioGroup
          options={basicOptions}
          className="custom-class"
          data-testid="group"
          aria-label="Select option"
        />
      );
      expect(screen.getByTestId('group')).toHaveClass('custom-class');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <RadioGroup
          ref={ref}
          options={basicOptions}
          aria-label="Select option"
        />
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <RadioGroup
          options={basicOptions}
          aria-label="Select option"
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
