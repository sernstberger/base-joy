import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { NumberField } from './NumberField';

describe('NumberField', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <NumberField.Root>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <NumberField.Root size={size} data-testid="numberfield">
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      );

      expect(screen.getByTestId('numberfield')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <NumberField.Root variant={variant} data-testid="numberfield">
            <NumberField.Group>
              <NumberField.Decrement />
              <NumberField.Input />
              <NumberField.Increment />
            </NumberField.Group>
          </NumberField.Root>
        );

        expect(screen.getByTestId('numberfield')).toBeInTheDocument();
      }
    );
  });

  describe('interaction', () => {
    it('increments value when clicking increment button', async () => {
      const user = userEvent.setup();
      render(
        <NumberField.Root defaultValue={5}>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      );

      const incrementBtn = screen.getAllByRole('button')[1];
      await user.click(incrementBtn);

      expect(screen.getByRole('textbox')).toHaveValue('6');
    });

    it('decrements value when clicking decrement button', async () => {
      const user = userEvent.setup();
      render(
        <NumberField.Root defaultValue={5}>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      );

      const decrementBtn = screen.getAllByRole('button')[0];
      await user.click(decrementBtn);

      expect(screen.getByRole('textbox')).toHaveValue('4');
    });
  });

  describe('constraints', () => {
    it('respects min value', async () => {
      const user = userEvent.setup();
      render(
        <NumberField.Root defaultValue={0} min={0}>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      );

      const decrementBtn = screen.getAllByRole('button')[0];
      await user.click(decrementBtn);

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('respects max value', async () => {
      const user = userEvent.setup();
      render(
        <NumberField.Root defaultValue={10} max={10}>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      );

      const incrementBtn = screen.getAllByRole('button')[1];
      await user.click(incrementBtn);

      expect(screen.getByRole('textbox')).toHaveValue('10');
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <NumberField.Root className="custom-class" data-testid="numberfield">
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      );

      expect(screen.getByTestId('numberfield')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <NumberField.Root>
          <NumberField.Group>
            <NumberField.Decrement aria-label="Decrease" />
            <NumberField.Input aria-label="Quantity" />
            <NumberField.Increment aria-label="Increase" />
          </NumberField.Group>
        </NumberField.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
