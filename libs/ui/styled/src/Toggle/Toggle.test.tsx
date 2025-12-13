import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Toggle, ToggleGroupContext, type ToggleGroupContextValue } from './Toggle';

describe('Toggle', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(<Toggle aria-label="Toggle">Toggle</Toggle>);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Toggle')).toBeInTheDocument();
    });

    it('renders with default outlined variant', () => {
      render(
        <Toggle aria-label="Toggle" data-testid="toggle">
          Toggle
        </Toggle>
      );

      expect(screen.getByTestId('toggle')).toHaveClass('border');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <Toggle variant={variant} data-testid="toggle" aria-label="Toggle">
            Toggle
          </Toggle>
        );

        expect(screen.getByTestId('toggle')).toBeInTheDocument();
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      (color) => {
        render(
          <Toggle color={color} data-testid="toggle" aria-label="Toggle">
            Toggle
          </Toggle>
        );

        expect(screen.getByTestId('toggle')).toBeInTheDocument();
      }
    );
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Toggle size={size} data-testid="toggle" aria-label="Toggle">
          Toggle
        </Toggle>
      );

      expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });
  });

  describe('pressed state', () => {
    it('can be toggled via click', async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="Toggle">Toggle</Toggle>);

      const toggle = screen.getByRole('button');
      expect(toggle).not.toHaveAttribute('data-pressed');

      await user.click(toggle);
      expect(toggle).toHaveAttribute('data-pressed');

      await user.click(toggle);
      expect(toggle).not.toHaveAttribute('data-pressed');
    });

    it('supports controlled mode', async () => {
      const onPressedChange = vi.fn();
      render(
        <Toggle pressed={false} onPressedChange={onPressedChange} aria-label="Toggle">
          Toggle
        </Toggle>
      );

      const user = userEvent.setup();
      await user.click(screen.getByRole('button'));

      expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything());
    });

    it('supports uncontrolled mode with defaultPressed', () => {
      render(
        <Toggle defaultPressed aria-label="Toggle">
          Toggle
        </Toggle>
      );

      expect(screen.getByRole('button')).toHaveAttribute('data-pressed');
    });
  });

  describe('disabled state', () => {
    it('can be disabled', () => {
      render(
        <Toggle disabled aria-label="Toggle">
          Toggle
        </Toggle>
      );

      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = vi.fn();
      render(
        <Toggle ref={ref} aria-label="Toggle">
          Toggle
        </Toggle>
      );

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <Toggle className="custom-class" data-testid="toggle" aria-label="Toggle">
          Toggle
        </Toggle>
      );

      expect(screen.getByTestId('toggle')).toHaveClass('custom-class');
    });
  });

  describe('context inheritance', () => {
    it('inherits variant from ToggleGroupContext', () => {
      const contextValue: ToggleGroupContextValue = {
        variant: 'solid',
        color: 'primary',
        size: 'md',
      };

      render(
        <ToggleGroupContext.Provider value={contextValue}>
          <Toggle data-testid="toggle" aria-label="Toggle">
            Toggle
          </Toggle>
        </ToggleGroupContext.Provider>
      );

      expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });

    it('allows prop override of context values', () => {
      const contextValue: ToggleGroupContextValue = {
        variant: 'solid',
        color: 'primary',
        size: 'md',
      };

      render(
        <ToggleGroupContext.Provider value={contextValue}>
          <Toggle variant="outlined" data-testid="toggle" aria-label="Toggle">
            Toggle
          </Toggle>
        </ToggleGroupContext.Provider>
      );

      expect(screen.getByTestId('toggle')).toHaveClass('border');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Toggle aria-label="Toggle">Toggle</Toggle>);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when pressed', async () => {
      const { container } = render(
        <Toggle pressed aria-label="Toggle">
          Toggle
        </Toggle>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(
        <Toggle disabled aria-label="Toggle">
          Toggle
        </Toggle>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
