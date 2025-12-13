import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Meter } from './Meter';
import { Sheet } from '../Sheet';

describe('Meter', () => {
  describe('rendering', () => {
    it('renders meter correctly', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const meter = screen.getByRole('meter');
      expect(meter).toBeInTheDocument();
      expect(meter).toHaveAttribute('aria-valuenow', '50');
    });

    it('applies default variant classes (solid primary)', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass('bg-primary-500');
    });

    it('renders with value 0', () => {
      render(
        <Meter.Root value={0} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-valuenow', '0');
    });

    it('renders with value 100', () => {
      render(
        <Meter.Root value={100} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft'] as const)('renders %s variant', (variant) => {
      const { container } = render(
        <Meter.Root variant={variant} value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      expect(container.querySelector('[role="meter"]')).toBeInTheDocument();
    });

    it('applies solid variant classes', () => {
      const { container } = render(
        <Meter.Root variant="solid" color="primary" value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass('bg-primary-500');
    });

    it('applies soft variant classes', () => {
      const { container } = render(
        <Meter.Root variant="soft" color="primary" value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass('bg-primary-400');
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'bg-primary-500'],
      ['neutral', 'bg-neutral-800'],
      ['success', 'bg-success-500'],
      ['warning', 'bg-warning-600'],
      ['danger', 'bg-danger-500'],
    ] as const)('renders %s color with solid variant', (color, expectedClass) => {
      const { container } = render(
        <Meter.Root variant="solid" color={color} value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass(expectedClass);
    });

    it.each([
      ['primary', 'bg-primary-400'],
      ['neutral', 'bg-neutral-600'],
      ['success', 'bg-success-400'],
      ['warning', 'bg-warning-500'],
      ['danger', 'bg-danger-400'],
    ] as const)('renders %s color with soft variant', (color, expectedClass) => {
      const { container } = render(
        <Meter.Root variant="soft" color={color} value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass(expectedClass);
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'h-1'],
      ['md', 'h-2'],
      ['lg', 'h-3'],
    ] as const)('renders %s size', (size, height) => {
      const { container } = render(
        <Meter.Root size={size} value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const track = container.querySelector('[role="meter"] > div');
      expect(track).toHaveClass(height);
    });

    it('applies default md size', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const track = container.querySelector('[role="meter"] > div');
      expect(track).toHaveClass('h-2');
    });
  });

  describe('value prop', () => {
    it('updates aria-valuenow when value changes', () => {
      const { rerender } = render(
        <Meter.Root value={25} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-valuenow', '25');

      rerender(
        <Meter.Root value={75} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      expect(meter).toHaveAttribute('aria-valuenow', '75');
    });

    it('respects min and max values', () => {
      render(
        <Meter.Root value={50} min={0} max={200} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-valuenow', '50');
      expect(meter).toHaveAttribute('aria-valuemin', '0');
      expect(meter).toHaveAttribute('aria-valuemax', '200');
    });

    it('supports optimum value', () => {
      render(
        <Meter.Root value={50} min={0} max={100} optimum={80} aria-label="Performance">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-valuenow', '50');
    });

    it('supports low and high thresholds', () => {
      render(
        <Meter.Root value={50} min={0} max={100} low={30} high={70} aria-label="Temperature">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-valuenow', '50');
    });
  });

  describe('track styling', () => {
    it('applies rounded-full class to track', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const track = container.querySelector('[role="meter"] > div');
      expect(track).toHaveClass('rounded-full');
    });

    it('applies neutral background to track', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const track = container.querySelector('[role="meter"] > div');
      expect(track).toHaveClass('bg-neutral-200');
    });
  });

  describe('indicator styling', () => {
    it('applies transition classes to indicator', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass('transition-all');
      expect(indicator).toHaveClass('duration-300');
      expect(indicator).toHaveClass('ease-in-out');
    });

    it('applies rounded-full class to indicator', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass('rounded-full');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to Root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Meter.Root ref={ref} value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Track element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track ref={ref}>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Indicator element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator ref={ref} />
          </Meter.Track>
        </Meter.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className with Root', () => {
      const { container } = render(
        <Meter.Root className="custom-root" value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const root = container.querySelector('[role="meter"]');
      expect(root).toHaveClass('custom-root');
      expect(root).toHaveClass('w-full');
    });

    it('merges custom className with Track', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track className="custom-track">
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const track = container.querySelector('[role="meter"] > div');
      expect(track).toHaveClass('custom-track');
      expect(track).toHaveClass('rounded-full');
    });

    it('merges custom className with Indicator', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator className="custom-indicator" />
          </Meter.Track>
        </Meter.Root>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass('custom-indicator');
      expect(indicator).toHaveClass('transition-all');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with solid variant', async () => {
      const { container } = render(
        <Meter.Root variant="solid" color="primary" value={50} aria-label="Storage capacity">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const { container } = render(
        <div>
          <Meter.Root variant="solid" color="primary" value={30} aria-label="Solid meter">
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
          <Meter.Root variant="soft" color="success" value={60} aria-label="Soft meter">
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-valuetext for custom value description', () => {
      render(
        <Meter.Root value={50} aria-label="Storage" aria-valuetext="50 GB of 100 GB used">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const meter = screen.getByRole('meter');
      expect(meter).toHaveAttribute('aria-valuetext', '50 GB of 100 GB used');
    });
  });

  describe('ColorContext integration', () => {
    it('inherits color from parent Sheet', () => {
      const { container } = render(
        <Sheet color="success">
          <Meter.Root value={50} aria-label="Disk usage">
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </Sheet>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass('bg-success-500');
    });

    it('allows explicit color override inside Sheet', () => {
      const { container } = render(
        <Sheet color="primary">
          <Meter.Root color="danger" value={50} aria-label="Disk usage">
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </Sheet>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass('bg-danger-500');
    });

    it('works without Sheet (uses defaults)', () => {
      const { container } = render(
        <Meter.Root value={50} aria-label="Disk usage">
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      );
      const indicator = container.querySelector('[role="meter"] > div > div');
      expect(indicator).toHaveClass('bg-primary-500');
    });

    it('has no accessibility violations inside Sheet', async () => {
      const { container } = render(
        <Sheet color="primary">
          <Meter.Root value={50} aria-label="Disk usage">
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </Sheet>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('SizeContext integration', () => {
    it('inherits size from parent Sheet', () => {
      const { container } = render(
        <Sheet size="lg">
          <Meter.Root value={50} aria-label="Disk usage">
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </Sheet>
      );
      const track = container.querySelector('[role="meter"] > div');
      expect(track).toHaveClass('h-3');
    });

    it('allows explicit size override inside Sheet', () => {
      const { container } = render(
        <Sheet size="lg">
          <Meter.Root size="sm" value={50} aria-label="Disk usage">
            <Meter.Track>
              <Meter.Indicator />
            </Meter.Track>
          </Meter.Root>
        </Sheet>
      );
      const track = container.querySelector('[role="meter"] > div');
      expect(track).toHaveClass('h-1');
    });
  });
});
