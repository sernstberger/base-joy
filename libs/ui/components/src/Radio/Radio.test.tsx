import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Radio } from './Radio';
import { RadioGroup } from '../RadioGroup';

describe('Radio', () => {
  describe('rendering', () => {
    it('renders correctly within RadioGroup', () => {
      render(
        <RadioGroup>
          <Radio.Root value="a">
            <Radio.Indicator />
          </Radio.Root>
        </RadioGroup>
      );

      expect(screen.getByRole('radio')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <RadioGroup>
          <Radio.Root value="a" size={size} data-testid="radio">
            <Radio.Indicator />
          </Radio.Root>
        </RadioGroup>
      );

      expect(screen.getByTestId('radio')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('can be selected', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <Radio.Root value="a">
            <Radio.Indicator />
          </Radio.Root>
          <Radio.Root value="b">
            <Radio.Indicator />
          </Radio.Root>
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');
      await user.click(radios[0]);

      expect(radios[0]).toBeChecked();
    });

    it('can be disabled', () => {
      render(
        <RadioGroup>
          <Radio.Root value="a" disabled>
            <Radio.Indicator />
          </Radio.Root>
        </RadioGroup>
      );

      expect(screen.getByRole('radio')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <RadioGroup>
          <Radio.Root value="a" className="custom-class" data-testid="radio">
            <Radio.Indicator />
          </Radio.Root>
        </RadioGroup>
      );

      expect(screen.getByTestId('radio')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <RadioGroup aria-label="Options">
          <Radio.Root value="a" aria-label="Option A">
            <Radio.Indicator />
          </Radio.Root>
          <Radio.Root value="b" aria-label="Option B">
            <Radio.Indicator />
          </Radio.Root>
        </RadioGroup>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
