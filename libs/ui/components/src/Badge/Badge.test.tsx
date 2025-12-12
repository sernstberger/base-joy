import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('applies default variant classes (soft primary)', () => {
      const { container } = render(<Badge>New</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-primary-100');
      expect(badge).toHaveClass('text-primary-900');
    });

    it('applies base classes', () => {
      const { container } = render(<Badge>New</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('inline-flex');
      expect(badge).toHaveClass('items-center');
      expect(badge).toHaveClass('font-medium');
      expect(badge).toHaveClass('rounded-full');
    });

    it('renders as span element', () => {
      const { container } = render(<Badge>New</Badge>);
      expect(container.firstChild?.nodeName).toBe('SPAN');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        const { container } = render(<Badge variant={variant}>Content</Badge>);
        expect(container.firstChild).toBeInTheDocument();
      }
    );

    it('applies solid variant classes', () => {
      const { container } = render(
        <Badge variant="solid" color="primary">
          New
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-primary-500');
      expect(badge).toHaveClass('text-white');
    });

    it('applies soft variant classes', () => {
      const { container } = render(
        <Badge variant="soft" color="success">
          Active
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-success-100');
      expect(badge).toHaveClass('text-success-900');
    });

    it('applies outlined variant classes', () => {
      const { container } = render(
        <Badge variant="outlined" color="warning">
          Pending
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('border');
      expect(badge).toHaveClass('border-warning-500');
      expect(badge).toHaveClass('text-warning-700');
      expect(badge).toHaveClass('bg-transparent');
    });

    it('applies plain variant classes', () => {
      const { container } = render(
        <Badge variant="plain" color="danger">
          Error
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('text-danger-700');
      expect(badge).toHaveClass('bg-transparent');
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'bg-primary-500'],
      ['neutral', 'bg-neutral-800'],
      ['success', 'bg-success-500'],
      ['warning', 'bg-warning-500'],
      ['danger', 'bg-danger-500'],
    ] as const)(
      'renders %s color with solid variant',
      (color, expectedClass) => {
        const { container } = render(
          <Badge variant="solid" color={color}>
            Badge
          </Badge>
        );
        const badge = container.firstChild as HTMLElement;
        expect(badge).toHaveClass(expectedClass);
        expect(badge).toHaveClass('text-white');
      }
    );

    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color with soft variant',
      (color) => {
        const { container } = render(
          <Badge variant="soft" color={color}>
            Badge
          </Badge>
        );
        const badge = container.firstChild as HTMLElement;
        expect(badge).toHaveClass(`bg-${color}-100`);
        expect(badge).toHaveClass(`text-${color}-900`);
      }
    );
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'px-2', 'py-0.5', 'text-xs', 'gap-1'],
      ['md', 'px-2.5', 'py-0.5', 'text-sm', 'gap-1.5'],
      ['lg', 'px-3', 'py-1', 'text-base', 'gap-2'],
    ] as const)(
      'renders %s size with correct classes',
      (size, px, py, textSize, gap) => {
        const { container } = render(<Badge size={size}>Badge</Badge>);
        const badge = container.firstChild as HTMLElement;
        expect(badge).toHaveClass(px);
        expect(badge).toHaveClass(py);
        expect(badge).toHaveClass(textSize);
        expect(badge).toHaveClass(gap);
      }
    );

    it('applies default md size', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-2.5');
      expect(badge).toHaveClass('text-sm');
    });
  });

  describe('decorators', () => {
    it('renders startDecorator', () => {
      render(
        <Badge startDecorator={<span data-testid="start-icon">★</span>}>
          Badge
        </Badge>
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByText('★')).toBeInTheDocument();
    });

    it('renders endDecorator', () => {
      render(
        <Badge endDecorator={<span data-testid="end-icon">✕</span>}>
          Badge
        </Badge>
      );
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
      expect(screen.getByText('✕')).toBeInTheDocument();
    });

    it('renders both decorators', () => {
      render(
        <Badge
          startDecorator={<span data-testid="start">←</span>}
          endDecorator={<span data-testid="end">→</span>}
        >
          Badge
        </Badge>
      );
      expect(screen.getByTestId('start')).toBeInTheDocument();
      expect(screen.getByTestId('end')).toBeInTheDocument();
    });

    it('orders content correctly with decorators', () => {
      const { container } = render(
        <Badge
          startDecorator={<span>Start</span>}
          endDecorator={<span>End</span>}
        >
          Middle
        </Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge.textContent).toBe('StartMiddleEnd');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the DOM element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Badge</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('ref has correct text content', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Test Badge</Badge>);
      expect(ref.current?.textContent).toBe('Test Badge');
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <Badge className="custom-class">Badge</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-class');
      expect(badge).toHaveClass('rounded-full');
    });

    it('allows className to override variant classes', () => {
      const { container } = render(
        <Badge className="px-8">Badge</Badge>
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('px-8');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Badge data-testid="test-badge" id="my-badge">
          Badge
        </Badge>
      );
      const badge = screen.getByTestId('test-badge');
      expect(badge).toHaveAttribute('id', 'my-badge');
    });

    it('passes through aria attributes', () => {
      render(
        <Badge aria-label="Status badge" role="status">
          New
        </Badge>
      );
      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('aria-label', 'Status badge');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Badge>New</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with solid variant', async () => {
      const { container } = render(
        <Badge variant="solid" color="primary">
          Active
        </Badge>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const { container } = render(
        <div>
          <Badge variant="solid" color="primary">
            Solid
          </Badge>
          <Badge variant="soft" color="success">
            Soft
          </Badge>
          <Badge variant="outlined" color="warning">
            Outlined
          </Badge>
          <Badge variant="plain" color="danger">
            Plain
          </Badge>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with decorators', async () => {
      const { container } = render(
        <Badge
          startDecorator={<span aria-hidden="true">★</span>}
          endDecorator={<span aria-hidden="true">✕</span>}
        >
          Badge
        </Badge>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
