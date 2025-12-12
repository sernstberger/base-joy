import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { RadioGroup } from './RadioGroup';
import { Radio } from '../Radio';

describe('RadioGroup', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(
        <RadioGroup>
          <label>
            <Radio.Root value="a">
              <Radio.Indicator />
            </Radio.Root>
            Option A
          </label>
          <label>
            <Radio.Root value="b">
              <Radio.Indicator />
            </Radio.Root>
            Option B
          </label>
        </RadioGroup>
      );

      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByText('Option B')).toBeInTheDocument();
    });
  });

  describe('orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <RadioGroup orientation="horizontal" data-testid="group">
          <div>Item</div>
        </RadioGroup>
      );

      expect(screen.getByTestId('group')).toHaveClass('flex-row');
    });

    it('renders vertical orientation', () => {
      render(
        <RadioGroup orientation="vertical" data-testid="group">
          <div>Item</div>
        </RadioGroup>
      );

      expect(screen.getByTestId('group')).toHaveClass('flex-col');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <RadioGroup size={size} data-testid="group">
          <div>Item</div>
        </RadioGroup>
      );

      expect(screen.getByTestId('group')).toBeInTheDocument();
    });
  });

  describe('controlled value', () => {
    it('handles value changes', async () => {
      const onChange = jest.fn();
      render(
        <RadioGroup value="a" onValueChange={onChange}>
          <label>
            <Radio.Root value="a">
              <Radio.Indicator />
            </Radio.Root>
            Option A
          </label>
          <label>
            <Radio.Root value="b">
              <Radio.Indicator />
            </Radio.Root>
            Option B
          </label>
        </RadioGroup>
      );

      const user = userEvent.setup();
      const radios = screen.getAllByRole('radio');
      await user.click(radios[1]);

      expect(onChange).toHaveBeenCalledWith('b', expect.anything());
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <RadioGroup aria-label="Select option">
          <label>
            <Radio.Root value="a">
              <Radio.Indicator />
            </Radio.Root>
            Option A
          </label>
        </RadioGroup>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
