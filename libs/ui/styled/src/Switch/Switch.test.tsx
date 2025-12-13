import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(<Switch aria-label="Toggle" />);

      expect(screen.getByRole('switch')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<Switch size={size} aria-label="Toggle" data-testid="switch" />);

      expect(screen.getByTestId('switch')).toBeInTheDocument();
    });
  });

  describe('colors', () => {
    it.each(['primary', 'success', 'warning', 'danger', 'neutral'] as const)(
      'renders %s color',
      (color) => {
        render(<Switch color={color} aria-label="Toggle" data-testid="switch" />);

        expect(screen.getByTestId('switch')).toBeInTheDocument();
      }
    );
  });

  describe('states', () => {
    it('can be toggled', async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Toggle" />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl).not.toHaveAttribute('data-checked');

      await user.click(switchEl);
      expect(switchEl).toHaveAttribute('data-checked');
    });

    it('can be disabled', () => {
      render(<Switch disabled aria-label="Toggle" />);

      expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
    });

    it('can be controlled', async () => {
      const onChange = vi.fn();
      render(<Switch checked={false} onCheckedChange={onChange} aria-label="Toggle" />);

      const user = userEvent.setup();
      await user.click(screen.getByRole('switch'));

      expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    });

    it('supports defaultChecked', () => {
      render(<Switch defaultChecked aria-label="Toggle" />);

      expect(screen.getByRole('switch')).toHaveAttribute('data-checked');
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(<Switch className="custom-class" aria-label="Toggle" data-testid="switch" />);

      expect(screen.getByTestId('switch')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with aria-label', async () => {
      const { container } = render(<Switch aria-label="Enable notifications" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with aria-labelledby', async () => {
      const { container } = render(
        <div>
          <span id="switch-label">Enable notifications</span>
          <Switch aria-labelledby="switch-label" />
        </div>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the switch element', () => {
      const ref = vi.fn();
      render(<Switch ref={ref} aria-label="Toggle" />);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });
});
