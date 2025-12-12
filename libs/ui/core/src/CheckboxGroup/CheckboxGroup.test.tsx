import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from '../Checkbox';

describe('CheckboxGroup', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(
        <CheckboxGroup>
          <label>
            <Checkbox.Root value="a">
              <Checkbox.Indicator />
            </Checkbox.Root>
            Option A
          </label>
          <label>
            <Checkbox.Root value="b">
              <Checkbox.Indicator />
            </Checkbox.Root>
            Option B
          </label>
        </CheckboxGroup>
      );

      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByText('Option B')).toBeInTheDocument();
    });
  });

  describe('orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <CheckboxGroup orientation="horizontal" data-testid="group">
          <div>Item</div>
        </CheckboxGroup>
      );

      expect(screen.getByTestId('group')).toHaveClass('flex-row');
    });

    it('renders vertical orientation', () => {
      render(
        <CheckboxGroup orientation="vertical" data-testid="group">
          <div>Item</div>
        </CheckboxGroup>
      );

      expect(screen.getByTestId('group')).toHaveClass('flex-col');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <CheckboxGroup size={size} data-testid="group">
          <div>Item</div>
        </CheckboxGroup>
      );

      expect(screen.getByTestId('group')).toBeInTheDocument();
    });
  });

  describe('controlled value', () => {
    it('handles value changes', async () => {
      const onChange = jest.fn();
      render(
        <CheckboxGroup value={['a']} onValueChange={onChange}>
          <label>
            <Checkbox.Root value="a">
              <Checkbox.Indicator />
            </Checkbox.Root>
            Option A
          </label>
          <label>
            <Checkbox.Root value="b">
              <Checkbox.Indicator />
            </Checkbox.Root>
            Option B
          </label>
        </CheckboxGroup>
      );

      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <CheckboxGroup aria-label="Options">
          <Checkbox.Root value="a" aria-label="Option A">
            <Checkbox.Indicator />
          </Checkbox.Root>
        </CheckboxGroup>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
