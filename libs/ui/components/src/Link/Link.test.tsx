import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Link } from './Link';

describe('Link', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Link href="/test">Test Link</Link>);
      expect(screen.getByText('Test Link')).toBeInTheDocument();
    });

    it('renders as anchor tag by default', () => {
      const { container } = render(<Link href="/test">Link</Link>);
      expect(container.firstChild?.nodeName).toBe('A');
    });

    it('applies default color (primary)', () => {
      const { container } = render(<Link href="/test">Link</Link>);
      const link = container.firstChild as HTMLElement;
      expect(link).toHaveClass('text-primary-600');
    });

    it('applies default underline (hover)', () => {
      const { container } = render(<Link href="/test">Link</Link>);
      const link = container.firstChild as HTMLElement;
      expect(link).toHaveClass('no-underline');
      expect(link).toHaveClass('hover:underline');
    });

    it('applies base classes', () => {
      const { container } = render(<Link href="/test">Link</Link>);
      const link = container.firstChild as HTMLElement;
      expect(link).toHaveClass('inline-flex');
      expect(link).toHaveClass('items-center');
      expect(link).toHaveClass('transition-colors');
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'text-primary-600'],
      ['neutral', 'text-neutral-700'],
      ['success', 'text-success-600'],
      ['warning', 'text-warning-600'],
      ['danger', 'text-danger-600'],
    ] as const)('renders %s color', (color, expectedClass) => {
      const { container } = render(
        <Link href="/test" color={color}>
          Link
        </Link>
      );
      const link = container.firstChild as HTMLElement;
      expect(link).toHaveClass(expectedClass);
    });
  });

  describe('underline variants', () => {
    it('renders no underline', () => {
      const { container } = render(
        <Link href="/test" underline="none">
          Link
        </Link>
      );
      const link = container.firstChild as HTMLElement;
      expect(link).toHaveClass('no-underline');
      expect(link).not.toHaveClass('hover:underline');
    });

    it('renders hover underline', () => {
      const { container } = render(
        <Link href="/test" underline="hover">
          Link
        </Link>
      );
      const link = container.firstChild as HTMLElement;
      expect(link).toHaveClass('no-underline');
      expect(link).toHaveClass('hover:underline');
    });

    it('renders always underline', () => {
      const { container } = render(
        <Link href="/test" underline="always">
          Link
        </Link>
      );
      const link = container.firstChild as HTMLElement;
      expect(link).toHaveClass('underline');
    });
  });

  describe('external links', () => {
    it('adds target="_blank" when external is true', () => {
      render(
        <Link href="https://example.com" external>
          External
        </Link>
      );
      const link = screen.getByText('External');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('adds rel="noopener noreferrer" when external is true', () => {
      render(
        <Link href="https://example.com" external>
          External
        </Link>
      );
      const link = screen.getByText('External');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders external icon when external is true', () => {
      const { container } = render(
        <Link href="https://example.com" external>
          External
        </Link>
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not add target="_blank" when external is false', () => {
      render(<Link href="/internal">Internal</Link>);
      const link = screen.getByText('Internal');
      expect(link).not.toHaveAttribute('target');
    });

    it('allows custom target when external is true', () => {
      render(
        <Link href="https://example.com" external target="_self">
          External
        </Link>
      );
      const link = screen.getByText('External');
      expect(link).toHaveAttribute('target', '_self');
    });

    it('allows custom rel when external is true', () => {
      render(
        <Link href="https://example.com" external rel="nofollow">
          External
        </Link>
      );
      const link = screen.getByText('External');
      expect(link).toHaveAttribute('rel', 'nofollow');
    });
  });

  describe('disabled state', () => {
    it('applies disabled aria attribute', () => {
      render(
        <Link href="/test" disabled>
          Disabled
        </Link>
      );
      const link = screen.getByText('Disabled');
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('applies disabled classes', () => {
      const { container } = render(
        <Link href="/test" disabled>
          Disabled
        </Link>
      );
      const link = container.firstChild as HTMLElement;
      expect(link).toHaveClass('disabled:pointer-events-none');
      expect(link).toHaveClass('disabled:opacity-50');
    });
  });

  describe('polymorphic as prop', () => {
    it('renders as custom component', () => {
      const CustomLink = React.forwardRef<
        HTMLAnchorElement,
        React.AnchorHTMLAttributes<HTMLAnchorElement>
      >((props, ref) => <a ref={ref} {...props} data-custom="true" />);
      CustomLink.displayName = 'CustomLink';

      render(
        <Link as={CustomLink} href="/test">
          Custom
        </Link>
      );
      const link = screen.getByText('Custom');
      expect(link).toHaveAttribute('data-custom', 'true');
    });

    it('renders as button', () => {
      const { container } = render(
        <Link as="button" type="button">
          Button Link
        </Link>
      );
      expect(container.firstChild?.nodeName).toBe('BUTTON');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the anchor element', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Link ref={ref} href="/test">
          Link
        </Link>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <Link href="/test" className="custom-class">
          Link
        </Link>
      );
      const link = container.firstChild as HTMLElement;
      expect(link).toHaveClass('custom-class');
      expect(link).toHaveClass('text-primary-600');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Link href="/test" data-testid="test-link" id="my-link">
          Link
        </Link>
      );
      const link = screen.getByTestId('test-link');
      expect(link).toHaveAttribute('id', 'my-link');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('passes through aria attributes', () => {
      render(
        <Link href="/test" aria-label="Go to page">
          Link
        </Link>
      );
      const link = screen.getByLabelText('Go to page');
      expect(link).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Link href="/test">Accessible Link</Link>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all colors', async () => {
      const { container } = render(
        <div>
          <Link href="/test" color="primary">
            Primary
          </Link>
          <Link href="/test" color="neutral">
            Neutral
          </Link>
          <Link href="/test" color="success">
            Success
          </Link>
          <Link href="/test" color="warning">
            Warning
          </Link>
          <Link href="/test" color="danger">
            Danger
          </Link>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when external', async () => {
      const { container } = render(
        <Link href="https://example.com" external>
          External Link
        </Link>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(
        <Link href="/test" disabled>
          Disabled Link
        </Link>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
