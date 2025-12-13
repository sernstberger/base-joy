import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <Switch.Root>
          <Switch.Thumb />
        </Switch.Root>
      );

      expect(screen.getByRole('switch')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Switch.Root size={size} data-testid="switch">
          <Switch.Thumb />
        </Switch.Root>
      );

      expect(screen.getByTestId('switch')).toBeInTheDocument();
    });
  });

  describe('colors', () => {
    it.each(['primary', 'success', 'warning', 'danger', 'neutral'] as const)(
      'renders %s color',
      (color) => {
        render(
          <Switch.Root color={color} data-testid="switch">
            <Switch.Thumb />
          </Switch.Root>
        );

        expect(screen.getByTestId('switch')).toBeInTheDocument();
      }
    );
  });

  describe('states', () => {
    it('can be toggled', async () => {
      const user = userEvent.setup();
      render(
        <Switch.Root>
          <Switch.Thumb />
        </Switch.Root>
      );

      const switchEl = screen.getByRole('switch');
      expect(switchEl).not.toHaveAttribute('data-checked');

      await user.click(switchEl);
      expect(switchEl).toHaveAttribute('data-checked');
    });

    it('can be disabled', () => {
      render(
        <Switch.Root disabled>
          <Switch.Thumb />
        </Switch.Root>
      );

      expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
    });

    it('can be controlled', async () => {
      const onChange = vi.fn();
      render(
        <Switch.Root checked={false} onCheckedChange={onChange}>
          <Switch.Thumb />
        </Switch.Root>
      );

      const user = userEvent.setup();
      await user.click(screen.getByRole('switch'));

      expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <Switch.Root className="custom-class" data-testid="switch">
          <Switch.Thumb className="thumb-class" />
        </Switch.Root>
      );

      expect(screen.getByTestId('switch')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Switch.Root aria-label="Enable notifications">
          <Switch.Thumb />
        </Switch.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
