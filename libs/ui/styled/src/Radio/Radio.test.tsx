import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { RadioGroup } from '../RadioGroup';

describe('Radio', () => {
  const basicOptions = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ];

  describe('rendering', () => {
    it('renders correctly within RadioGroup', () => {
      render(<RadioGroup options={basicOptions} />);

      expect(screen.getAllByRole('radio')).toHaveLength(2);
    });

    it('renders labels for each option', () => {
      render(<RadioGroup options={basicOptions} />);

      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByText('Option B')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<RadioGroup options={basicOptions} size={size} />);

      expect(screen.getAllByRole('radio')).toHaveLength(2);
    });
  });

  describe('states', () => {
    it('can be selected', async () => {
      const user = userEvent.setup();
      render(<RadioGroup options={basicOptions} />);

      const radios = screen.getAllByRole('radio');
      await user.click(radios[0]);

      expect(radios[0]).toBeChecked();
    });

    it('supports default value', () => {
      render(<RadioGroup options={basicOptions} defaultValue="b" />);

      const radios = screen.getAllByRole('radio');
      expect(radios[1]).toBeChecked();
    });

    it('can disable entire group', () => {
      render(<RadioGroup options={basicOptions} disabled />);

      const radios = screen.getAllByRole('radio');
      expect(radios[0]).toHaveAttribute('aria-disabled', 'true');
      expect(radios[1]).toHaveAttribute('aria-disabled', 'true');
    });

    it('can disable individual option', () => {
      render(
        <RadioGroup
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B', disabled: true },
          ]}
        />
      );

      const radios = screen.getAllByRole('radio');
      expect(radios[0]).not.toHaveAttribute('aria-disabled', 'true');
      expect(radios[1]).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('className merging', () => {
    it('merges custom className on group', () => {
      render(
        <RadioGroup
          options={basicOptions}
          className="custom-class"
          data-testid="radio-group"
        />
      );

      expect(screen.getByTestId('radio-group')).toHaveClass('custom-class');
    });
  });

  describe('orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <RadioGroup
          options={basicOptions}
          orientation="horizontal"
          data-testid="radio-group"
        />
      );

      expect(screen.getByTestId('radio-group')).toHaveClass('flex-row');
    });

    it('renders vertical orientation by default', () => {
      render(<RadioGroup options={basicOptions} data-testid="radio-group" />);

      expect(screen.getByTestId('radio-group')).toHaveClass('flex-col');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <RadioGroup aria-label="Options" options={basicOptions} />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-labelledby', () => {
      render(
        <>
          <span id="group-label">Choose an option</span>
          <RadioGroup
            aria-labelledby="group-label"
            options={basicOptions}
            data-testid="radio-group"
          />
        </>
      );

      expect(screen.getByTestId('radio-group')).toHaveAttribute(
        'aria-labelledby',
        'group-label'
      );
    });
  });
});
