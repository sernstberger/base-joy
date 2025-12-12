import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Container } from './Container';

describe('Container', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Container>Test content</Container>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies default variant classes (lg centered)', () => {
      const { container } = render(<Container>Content</Container>);
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).toHaveClass('max-w-lg');
      expect(containerEl).toHaveClass('mx-auto');
    });

    it('applies base classes', () => {
      const { container } = render(<Container>Content</Container>);
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).toHaveClass('w-full');
      expect(containerEl).toHaveClass('px-4');
      expect(containerEl).toHaveClass('sm:px-6');
      expect(containerEl).toHaveClass('lg:px-8');
    });
  });

  describe('maxWidth variants', () => {
    it.each([
      ['xs', 'max-w-xs'],
      ['sm', 'max-w-sm'],
      ['md', 'max-w-md'],
      ['lg', 'max-w-lg'],
      ['xl', 'max-w-xl'],
      ['2xl', 'max-w-2xl'],
      ['full', 'max-w-full'],
    ] as const)('renders %s maxWidth with %s class', (maxWidth, expectedClass) => {
      const { container } = render(<Container maxWidth={maxWidth}>Content</Container>);
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).toHaveClass(expectedClass);
    });

    it('applies default lg maxWidth', () => {
      const { container } = render(<Container>Content</Container>);
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).toHaveClass('max-w-lg');
    });
  });

  describe('centered prop', () => {
    it('applies mx-auto when centered is true', () => {
      const { container } = render(<Container centered={true}>Content</Container>);
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).toHaveClass('mx-auto');
    });

    it('does not apply mx-auto when centered is false', () => {
      const { container } = render(<Container centered={false}>Content</Container>);
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).not.toHaveClass('mx-auto');
    });

    it('applies mx-auto by default', () => {
      const { container } = render(<Container>Content</Container>);
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).toHaveClass('mx-auto');
    });
  });

  describe('polymorphic as prop', () => {
    it('renders as div by default', () => {
      const { container } = render(<Container>Content</Container>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('renders as section when specified', () => {
      const { container } = render(<Container as="section">Content</Container>);
      expect(container.firstChild?.nodeName).toBe('SECTION');
    });

    it('renders as article when specified', () => {
      const { container } = render(<Container as="article">Content</Container>);
      expect(container.firstChild?.nodeName).toBe('ARTICLE');
    });

    it('renders as main when specified', () => {
      const { container } = render(<Container as="main">Content</Container>);
      expect(container.firstChild?.nodeName).toBe('MAIN');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the DOM element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref when using as prop', () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Container as="section" ref={ref}>
          Content
        </Container>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.nodeName).toBe('SECTION');
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <Container className="custom-class">Content</Container>
      );
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).toHaveClass('custom-class');
      expect(containerEl).toHaveClass('max-w-lg');
    });

    it('allows className to override variant classes', () => {
      const { container } = render(
        <Container className="max-w-xs">Content</Container>
      );
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).toHaveClass('max-w-xs');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Container data-testid="test-container" id="my-container">
          Content
        </Container>
      );
      const containerEl = screen.getByTestId('test-container');
      expect(containerEl).toHaveAttribute('id', 'my-container');
    });

    it('passes through aria attributes', () => {
      render(
        <Container aria-label="Main content" role="main">
          Content
        </Container>
      );
      const containerEl = screen.getByRole('main');
      expect(containerEl).toHaveAttribute('aria-label', 'Main content');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(
        <Container>
          <p>Accessible content</p>
        </Container>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with different maxWidth values', async () => {
      const { container } = render(
        <div>
          <Container maxWidth="xs">
            <p>Extra small</p>
          </Container>
          <Container maxWidth="sm">
            <p>Small</p>
          </Container>
          <Container maxWidth="md">
            <p>Medium</p>
          </Container>
          <Container maxWidth="lg">
            <p>Large</p>
          </Container>
          <Container maxWidth="xl">
            <p>Extra large</p>
          </Container>
          <Container maxWidth="2xl">
            <p>2X large</p>
          </Container>
          <Container maxWidth="full">
            <p>Full width</p>
          </Container>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with centered=false', async () => {
      const { container } = render(
        <Container centered={false}>
          <p>Non-centered content</p>
        </Container>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations as semantic element', async () => {
      const { container } = render(
        <Container as="main" aria-label="Main content">
          <h1>Page Title</h1>
          <p>Page content</p>
        </Container>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
