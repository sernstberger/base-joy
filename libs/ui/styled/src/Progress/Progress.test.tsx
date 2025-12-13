import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Progress } from './Progress';
import { Sheet } from '../Sheet';

describe('Progress', () => {
  describe('rendering', () => {
    it('renders progress bar correctly', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });

    it('applies default variant classes (solid primary)', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
      expect(indicator).toHaveClass('bg-primary-500');
    });

    it('renders with value 0', () => {
      render(
        <Progress.Root value={0} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    });

    it('renders with value 100', () => {
      render(
        <Progress.Root value={100} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    });

    it('renders indeterminate progress (value null)', () => {
      render(
        <Progress.Root value={null} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).not.toHaveAttribute('aria-valuenow');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft'] as const)('renders %s variant', (variant) => {
      const { container } = render(
        <Progress.Root variant={variant} value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument();
    });

    it('applies solid variant classes', () => {
      const { container } = render(
        <Progress.Root variant="solid" color="primary" value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
      expect(indicator).toHaveClass('bg-primary-500');
    });

    it('applies soft variant classes', () => {
      const { container } = render(
        <Progress.Root variant="soft" color="primary" value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
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
        <Progress.Root variant="solid" color={color} value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
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
        <Progress.Root variant="soft" color={color} value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
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
        <Progress.Root size={size} value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const track = container.querySelector('[role="progressbar"] > div');
      expect(track).toHaveClass(height);
    });

    it('applies default md size', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const track = container.querySelector('[role="progressbar"] > div');
      expect(track).toHaveClass('h-2');
    });
  });

  describe('value prop', () => {
    it('updates aria-valuenow when value changes', () => {
      const { rerender } = render(
        <Progress.Root value={25} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '25');

      rerender(
        <Progress.Root value={75} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    });

    it('respects min and max values', () => {
      render(
        <Progress.Root value={50} min={0} max={200} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '200');
    });
  });

  describe('track styling', () => {
    it('applies rounded-full class to track', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const track = container.querySelector('[role="progressbar"] > div');
      expect(track).toHaveClass('rounded-full');
    });

    it('applies neutral background to track', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const track = container.querySelector('[role="progressbar"] > div');
      expect(track).toHaveClass('bg-neutral-200');
    });
  });

  describe('indicator styling', () => {
    it('applies transition classes to indicator', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
      expect(indicator).toHaveClass('transition-all');
      expect(indicator).toHaveClass('duration-300');
      expect(indicator).toHaveClass('ease-in-out');
    });

    it('applies rounded-full class to indicator', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
      expect(indicator).toHaveClass('rounded-full');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to Root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Progress.Root ref={ref} value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Track element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track ref={ref}>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Indicator element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator ref={ref} />
          </Progress.Track>
        </Progress.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className with Root', () => {
      const { container } = render(
        <Progress.Root className="custom-root" value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const root = container.querySelector('[role="progressbar"]');
      expect(root).toHaveClass('custom-root');
      expect(root).toHaveClass('w-full');
    });

    it('merges custom className with Track', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track className="custom-track">
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const track = container.querySelector('[role="progressbar"] > div');
      expect(track).toHaveClass('custom-track');
      expect(track).toHaveClass('rounded-full');
    });

    it('merges custom className with Indicator', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator className="custom-indicator" />
          </Progress.Track>
        </Progress.Root>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
      expect(indicator).toHaveClass('custom-indicator');
      expect(indicator).toHaveClass('transition-all');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading progress">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with solid variant', async () => {
      const { container } = render(
        <Progress.Root variant="solid" color="primary" value={50} aria-label="Upload progress">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const { container } = render(
        <div>
          <Progress.Root variant="solid" color="primary" value={30} aria-label="Solid progress">
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
          <Progress.Root variant="soft" color="success" value={60} aria-label="Soft progress">
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with indeterminate progress', async () => {
      const { container } = render(
        <Progress.Root value={null} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-valuetext for custom value description', () => {
      render(
        <Progress.Root value={50} aria-label="Upload" aria-valuetext="50 percent uploaded">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuetext', '50 percent uploaded');
    });
  });

  describe('ColorContext integration', () => {
    it('inherits color from parent Sheet', () => {
      const { container } = render(
        <Sheet color="success">
          <Progress.Root value={50} aria-label="Loading">
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </Sheet>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
      expect(indicator).toHaveClass('bg-success-500');
    });

    it('allows explicit color override inside Sheet', () => {
      const { container } = render(
        <Sheet color="primary">
          <Progress.Root color="danger" value={50} aria-label="Loading">
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </Sheet>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
      expect(indicator).toHaveClass('bg-danger-500');
    });

    it('works without Sheet (uses defaults)', () => {
      const { container } = render(
        <Progress.Root value={50} aria-label="Loading">
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      );
      const indicator = container.querySelector('[role="progressbar"] > div > div');
      expect(indicator).toHaveClass('bg-primary-500');
    });

    it('has no accessibility violations inside Sheet', async () => {
      const { container } = render(
        <Sheet color="primary">
          <Progress.Root value={50} aria-label="Loading">
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
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
          <Progress.Root value={50} aria-label="Loading">
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </Sheet>
      );
      const track = container.querySelector('[role="progressbar"] > div');
      expect(track).toHaveClass('h-3');
    });

    it('allows explicit size override inside Sheet', () => {
      const { container } = render(
        <Sheet size="lg">
          <Progress.Root size="sm" value={50} aria-label="Loading">
            <Progress.Track>
              <Progress.Indicator />
            </Progress.Track>
          </Progress.Root>
        </Sheet>
      );
      const track = container.querySelector('[role="progressbar"] > div');
      expect(track).toHaveClass('h-1');
    });
  });
});
