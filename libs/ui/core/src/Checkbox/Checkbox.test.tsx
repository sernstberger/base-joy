import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <Checkbox.Root>
          <Checkbox.Indicator />
        </Checkbox.Root>
      );

      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with custom indicator', () => {
      render(
        <Checkbox.Root>
          <Checkbox.Indicator>✓</Checkbox.Indicator>
        </Checkbox.Root>
      );

      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Checkbox.Root size={size} data-testid="checkbox">
          <Checkbox.Indicator />
        </Checkbox.Root>
      );

      expect(screen.getByTestId('checkbox')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('can be checked', async () => {
      const user = userEvent.setup();
      render(
        <Checkbox.Root>
          <Checkbox.Indicator />
        </Checkbox.Root>
      );

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(checkbox).toHaveAttribute('data-checked');
    });

    it('can be disabled', () => {
      render(
        <Checkbox.Root disabled>
          <Checkbox.Indicator />
        </Checkbox.Root>
      );

      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('can be controlled', async () => {
      const onChange = jest.fn();
      render(
        <Checkbox.Root checked={false} onCheckedChange={onChange}>
          <Checkbox.Indicator />
        </Checkbox.Root>
      );

      const user = userEvent.setup();
      await user.click(screen.getByRole('checkbox'));

      expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <Checkbox.Root className="custom-class" data-testid="checkbox">
          <Checkbox.Indicator className="indicator-class" />
        </Checkbox.Root>
      );

      expect(screen.getByTestId('checkbox')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <label>
          <Checkbox.Root>
            <Checkbox.Indicator />
          </Checkbox.Root>
          Accept terms
        </label>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
