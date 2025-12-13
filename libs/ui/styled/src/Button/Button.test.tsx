import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Button } from './Button';
import { Sheet } from '../Sheet';

describe('Button', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('applies default variant classes (solid primary)', () => {
      const { container } = render(<Button>Content</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('bg-primary-500');
      expect(button).toHaveClass('text-white');
    });

    it('applies base classes', () => {
      const { container } = render(<Button>Content</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('inline-flex');
      expect(button).toHaveClass('items-center');
      expect(button).toHaveClass('justify-center');
      expect(button).toHaveClass('font-medium');
      expect(button).toHaveClass('transition-colors');
    });

    it('has type="button" by default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        const { container } = render(<Button variant={variant}>Content</Button>);
        expect(container.firstChild).toBeInTheDocument();
      }
    );

    it('applies solid variant classes', () => {
      const { container } = render(
        <Button variant="solid" color="primary">
          Content
        </Button>
      );
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('bg-primary-500');
      expect(button).toHaveClass('text-white');
    });

    it('applies soft variant classes', () => {
      const { container } = render(
        <Button variant="soft" color="primary">
          Content
        </Button>
      );
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('bg-primary-100');
      expect(button).toHaveClass('text-primary-900');
    });

    it('applies outlined variant classes', () => {
      const { container } = render(
        <Button variant="outlined" color="primary">
          Content
        </Button>
      );
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('border-primary-500');
      expect(button).toHaveClass('bg-transparent');
    });

    it('applies plain variant classes', () => {
      const { container } = render(
        <Button variant="plain" color="primary">
          Content
        </Button>
      );
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('text-primary-700');
      expect(button).toHaveClass('bg-transparent');
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
        <Button variant="solid" color={color}>
          Content
        </Button>
      );
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass(expectedClass);
    });

    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color with soft variant',
      (color) => {
        const { container } = render(
          <Button variant="soft" color={color}>
            Content
          </Button>
        );
        const button = container.firstChild as HTMLElement;
        expect(button).toHaveClass(`bg-${color}-100`);
        expect(button).toHaveClass(`text-${color}-900`);
      }
    );
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'h-8', 'px-3', 'text-sm'],
      ['md', 'h-10', 'px-4', 'text-base'],
      ['lg', 'h-12', 'px-6', 'text-lg'],
    ] as const)('renders %s size', (size, height, padding, text) => {
      const { container } = render(<Button size={size}>Content</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass(height);
      expect(button).toHaveClass(padding);
      expect(button).toHaveClass(text);
    });

    it('applies default md size', () => {
      const { container } = render(<Button>Content</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('h-10');
      expect(button).toHaveClass('px-4');
    });
  });

  describe('loading state', () => {
    it('shows spinner when loading', () => {
      const { container } = render(<Button loading>Content</Button>);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('disables button when loading', () => {
      render(<Button loading>Content</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('hides decorators when loading', () => {
      render(
        <Button loading startDecorator={<span data-testid="start">Start</span>}>
          Content
        </Button>
      );
      expect(screen.queryByTestId('start')).not.toBeInTheDocument();
    });

    it('shows spinner with correct size', () => {
      const { container } = render(
        <Button loading size="sm">
          Content
        </Button>
      );
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-3');
      expect(spinner).toHaveClass('w-3');
    });
  });

  describe('disabled state', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Content</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('applies disabled opacity class', () => {
      const { container } = render(<Button disabled>Content</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('disabled:opacity-50');
    });
  });

  describe('decorators', () => {
    it('renders startDecorator', () => {
      render(
        <Button startDecorator={<span data-testid="icon">Icon</span>}>Content</Button>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders endDecorator', () => {
      render(
        <Button endDecorator={<span data-testid="icon">Icon</span>}>Content</Button>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders both decorators', () => {
      render(
        <Button
          startDecorator={<span data-testid="start">Start</span>}
          endDecorator={<span data-testid="end">End</span>}
        >
          Content
        </Button>
      );
      expect(screen.getByTestId('start')).toBeInTheDocument();
      expect(screen.getByTestId('end')).toBeInTheDocument();
    });
  });

  describe('fullWidth', () => {
    it('applies fullWidth class when true', () => {
      const { container } = render(<Button fullWidth>Content</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('w-full');
    });

    it('does not apply fullWidth class by default', () => {
      const { container } = render(<Button>Content</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('polymorphic render prop', () => {
    it('renders as button by default', () => {
      const { container } = render(<Button>Content</Button>);
      expect(container.firstChild?.nodeName).toBe('BUTTON');
    });

    it('renders as anchor when using render prop', () => {
      const { container } = render(
        <Button render={<a href="/test" />}>Content</Button>
      );
      expect(container.firstChild?.nodeName).toBe('A');
      expect(container.firstChild).toHaveAttribute('href', '/test');
    });

    it('does not set type attribute when using render prop', () => {
      render(<Button render={<a href="/test" />}>Link</Button>);
      const link = screen.getByText('Link');
      expect(link).not.toHaveAttribute('type');
    });

    it('allows custom type for button element', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Content</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('forwards ref when using render prop', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Button ref={ref} render={<a href="/test" />}>
          Content
        </Button>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(<Button className="custom-class">Content</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('bg-primary-500');
    });

    it('allows className to override variant classes', () => {
      const { container } = render(<Button className="h-16">Content</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass('h-16');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through button attributes', () => {
      render(
        <Button data-testid="test-button" id="my-button">
          Content
        </Button>
      );
      const button = screen.getByTestId('test-button');
      expect(button).toHaveAttribute('id', 'my-button');
    });

    it('passes through aria attributes', () => {
      render(
        <Button aria-label="Close dialog" aria-pressed="true">
          Content
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Close dialog');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Button>Accessible button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with solid variant', async () => {
      const { container } = render(
        <Button variant="solid" color="primary">
          Solid button
        </Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const { container } = render(
        <div>
          <Button variant="solid" color="primary">
            Solid
          </Button>
          <Button variant="soft" color="success">
            Soft
          </Button>
          <Button variant="outlined" color="warning">
            Outlined
          </Button>
          <Button variant="plain" color="danger">
            Plain
          </Button>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when loading', async () => {
      const { container } = render(<Button loading>Loading button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations as link', async () => {
      const { container } = render(
        <Button render={<a href="/test" />}>Link button</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ColorContext integration', () => {
    it('inherits color from parent Sheet', () => {
      const { container } = render(
        <Sheet color="success">
          <Button>Inherited</Button>
        </Sheet>
      );
      const button = container.querySelector('button') as HTMLElement;
      // Button inherits success color from Sheet, uses default solid variant
      expect(button).toHaveClass('bg-success-500');
    });

    it('inverts to plain variant inside solid Sheet', () => {
      const { container } = render(
        <Sheet variant="solid" color="primary">
          <Button>Auto-adjusted</Button>
        </Sheet>
      );
      const button = container.querySelector('button') as HTMLElement;
      // Should have plain variant styles (white text on transparent bg)
      expect(button).toHaveClass('text-white');
      // Should NOT have solid background (that would be solid-on-solid)
      expect(button).not.toHaveClass('bg-primary-500');
    });

    it('applies solid container styles for plain variant inside solid Sheet', () => {
      const { container } = render(
        <Sheet variant="solid" color="primary">
          <Button>Auto-adjusted</Button>
        </Sheet>
      );
      const button = container.querySelector('button') as HTMLElement;
      // Should have solid container hover styles
      expect(button).toHaveClass('hover:bg-white/10');
    });

    it('allows explicit color override inside Sheet', () => {
      const { container } = render(
        <Sheet color="primary">
          <Button color="danger">Override</Button>
        </Sheet>
      );
      const button = container.querySelector('button') as HTMLElement;
      expect(button).toHaveClass('bg-danger-500');
    });

    it('allows explicit variant override inside solid Sheet', () => {
      const { container } = render(
        <Sheet variant="solid" color="primary">
          <Button variant="soft" color="success">Override</Button>
        </Sheet>
      );
      const button = container.querySelector('button') as HTMLElement;
      // Should use explicit soft success, not auto-inverted
      expect(button).toHaveClass('bg-success-100');
      expect(button).toHaveClass('text-success-900');
    });

    it('works without Sheet (uses defaults)', () => {
      const { container } = render(<Button>No Sheet</Button>);
      const button = container.firstChild as HTMLElement;
      // Should use default solid primary
      expect(button).toHaveClass('bg-primary-500');
      expect(button).toHaveClass('text-white');
    });

    it('has no accessibility violations inside solid Sheet', async () => {
      const { container } = render(
        <Sheet variant="solid" color="primary">
          <Button>Auto-adjusted button</Button>
        </Sheet>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
