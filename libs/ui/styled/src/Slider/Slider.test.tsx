import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Slider } from './Slider';

describe('Slider', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(<Slider defaultValue={50} aria-label="Volume" />);

      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('renders with single value', () => {
      render(<Slider defaultValue={50} aria-label="Volume" />);

      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    it('renders with range values', () => {
      render(<Slider defaultValue={[25, 75]} aria-label="Price range" />);

      const sliders = screen.getAllByRole('slider');
      expect(sliders).toHaveLength(2);
      expect(sliders[0]).toHaveAttribute('aria-valuenow', '25');
      expect(sliders[1]).toHaveAttribute('aria-valuenow', '75');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<Slider size={size} defaultValue={50} data-testid="slider" aria-label="Volume" />);

      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });
  });

  describe('colors', () => {
    it.each(['primary', 'success', 'warning', 'danger', 'neutral'] as const)(
      'renders %s color',
      (color) => {
        render(
          <Slider color={color} defaultValue={50} data-testid="slider" aria-label="Volume" />
        );

        expect(screen.getByTestId('slider')).toBeInTheDocument();
      }
    );
  });

  describe('orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <Slider orientation="horizontal" defaultValue={50} data-testid="slider" aria-label="Volume" />
      );

      expect(screen.getByTestId('slider')).toHaveClass('items-center');
    });

    it('renders vertical orientation', () => {
      render(
        <Slider orientation="vertical" defaultValue={50} data-testid="slider" aria-label="Volume" />
      );

      expect(screen.getByTestId('slider')).toHaveClass('flex-col');
    });
  });

  describe('states', () => {
    it('renders disabled state', () => {
      render(<Slider disabled defaultValue={50} aria-label="Volume" />);

      expect(screen.getByRole('slider')).toBeDisabled();
    });

    it('respects min, max, and step props', () => {
      render(
        <Slider
          min={0}
          max={100}
          step={10}
          defaultValue={50}
          aria-label="Volume"
        />
      );

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('min', '0');
      expect(slider).toHaveAttribute('max', '100');
      expect(slider).toHaveAttribute('step', '10');
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <Slider defaultValue={50} className="custom-class" data-testid="slider" aria-label="Volume" />
      );

      expect(screen.getByTestId('slider')).toHaveClass('custom-class');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<Slider ref={ref} defaultValue={50} aria-label="Volume" />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Slider defaultValue={50} aria-label="Volume" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-label', () => {
      render(<Slider defaultValue={50} aria-label="Volume control" />);

      expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Volume control');
    });

    it('supports aria-labelledby', () => {
      render(
        <div>
          <label id="volume-label">Volume</label>
          <Slider defaultValue={50} aria-labelledby="volume-label" />
        </div>
      );

      expect(screen.getByRole('slider')).toHaveAttribute('aria-labelledby', 'volume-label');
    });
  });
});
