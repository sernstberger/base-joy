import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Heading, Text } from './Typography';

describe('Heading', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Heading>Test heading</Heading>);
      expect(screen.getByText('Test heading')).toBeInTheDocument();
    });

    it('applies default level (h1) and color (neutral)', () => {
      const { container } = render(<Heading>Content</Heading>);
      expect(container.firstChild?.nodeName).toBe('H1');
      expect(container.firstChild).toHaveClass('text-neutral-900');
    });

    it('applies base font-bold class', () => {
      const { container } = render(<Heading>Content</Heading>);
      expect(container.firstChild).toHaveClass('font-bold');
    });
  });

  describe('levels', () => {
    it.each([
      [1, 'H1', 'text-4xl'],
      [2, 'H2', 'text-3xl'],
      [3, 'H3', 'text-2xl'],
      [4, 'H4', 'text-xl'],
      [5, 'H5', 'text-lg'],
      [6, 'H6', 'text-base'],
    ] as const)('renders level %s as %s with %s class', (level, tag, expectedClass) => {
      const { container } = render(<Heading level={level}>Content</Heading>);
      expect(container.firstChild?.nodeName).toBe(tag);
      expect(container.firstChild).toHaveClass(expectedClass);
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'text-primary-700'],
      ['neutral', 'text-neutral-900'],
      ['success', 'text-success-700'],
      ['warning', 'text-warning-700'],
      ['danger', 'text-danger-700'],
    ] as const)('renders %s color with %s class', (color, expectedClass) => {
      const { container } = render(<Heading color={color}>Content</Heading>);
      expect(container.firstChild).toHaveClass(expectedClass);
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the heading element', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<Heading ref={ref}>Content</Heading>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.nodeName).toBe('H1');
    });

    it('forwards ref to correct heading level', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<Heading ref={ref} level={3}>Content</Heading>);
      expect(ref.current?.nodeName).toBe('H3');
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <Heading className="custom-class">Content</Heading>
      );
      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass('font-bold');
    });

    it('allows className to override variant classes', () => {
      const { container } = render(
        <Heading className="text-5xl">Content</Heading>
      );
      expect(container.firstChild).toHaveClass('text-5xl');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Heading data-testid="test-heading" id="my-heading">
          Content
        </Heading>
      );
      const heading = screen.getByTestId('test-heading');
      expect(heading).toHaveAttribute('id', 'my-heading');
    });

    it('passes through aria attributes', () => {
      render(
        <Heading aria-describedby="description">
          Content
        </Heading>
      );
      const heading = screen.getByRole('heading');
      expect(heading).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Heading>Accessible heading</Heading>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all levels', async () => {
      const { container } = render(
        <div>
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Heading level={4}>Heading 4</Heading>
          <Heading level={5}>Heading 5</Heading>
          <Heading level={6}>Heading 6</Heading>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all colors', async () => {
      const { container } = render(
        <div>
          <Heading color="primary">Primary</Heading>
          <Heading color="neutral">Neutral</Heading>
          <Heading color="success">Success</Heading>
          <Heading color="warning">Warning</Heading>
          <Heading color="danger">Danger</Heading>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('Text', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Text>Test text</Text>);
      expect(screen.getByText('Test text')).toBeInTheDocument();
    });

    it('renders as p element by default', () => {
      const { container } = render(<Text>Content</Text>);
      expect(container.firstChild?.nodeName).toBe('P');
    });

    it('applies default size (md) and color (neutral)', () => {
      const { container } = render(<Text>Content</Text>);
      expect(container.firstChild).toHaveClass('text-base');
      expect(container.firstChild).toHaveClass('text-neutral-600');
    });
  });

  describe('sizes', () => {
    it.each([
      ['xs', 'text-xs'],
      ['sm', 'text-sm'],
      ['md', 'text-base'],
      ['lg', 'text-lg'],
      ['xl', 'text-xl'],
    ] as const)('renders %s size with %s class', (size, expectedClass) => {
      const { container } = render(<Text size={size}>Content</Text>);
      expect(container.firstChild).toHaveClass(expectedClass);
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'text-primary-700'],
      ['neutral', 'text-neutral-600'],
      ['success', 'text-success-700'],
      ['warning', 'text-warning-700'],
      ['danger', 'text-danger-700'],
    ] as const)('renders %s color with %s class', (color, expectedClass) => {
      const { container } = render(<Text color={color}>Content</Text>);
      expect(container.firstChild).toHaveClass(expectedClass);
    });
  });

  describe('weights', () => {
    it.each([
      ['normal', 'font-normal'],
      ['medium', 'font-medium'],
      ['semibold', 'font-semibold'],
      ['bold', 'font-bold'],
    ] as const)('renders %s weight with %s class', (weight, expectedClass) => {
      const { container } = render(<Text weight={weight}>Content</Text>);
      expect(container.firstChild).toHaveClass(expectedClass);
    });
  });

  describe('polymorphic as prop', () => {
    it('renders as p by default', () => {
      const { container } = render(<Text>Content</Text>);
      expect(container.firstChild?.nodeName).toBe('P');
    });

    it('renders as span when specified', () => {
      const { container } = render(<Text as="span">Content</Text>);
      expect(container.firstChild?.nodeName).toBe('SPAN');
    });

    it('renders as div when specified', () => {
      const { container } = render(<Text as="div">Content</Text>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('renders as label when specified', () => {
      const { container } = render(<Text as="label">Content</Text>);
      expect(container.firstChild?.nodeName).toBe('LABEL');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the paragraph element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Text ref={ref}>Content</Text>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('forwards ref when using as prop', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Text as="span" ref={ref}>Content</Text>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <Text className="custom-class">Content</Text>
      );
      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass('text-base');
    });

    it('allows className to override variant classes', () => {
      const { container } = render(
        <Text className="text-2xl">Content</Text>
      );
      expect(container.firstChild).toHaveClass('text-2xl');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Text data-testid="test-text" id="my-text">
          Content
        </Text>
      );
      const text = screen.getByTestId('test-text');
      expect(text).toHaveAttribute('id', 'my-text');
    });

    it('passes through aria attributes', () => {
      render(
        <Text aria-label="Description text" role="status">
          Content
        </Text>
      );
      const text = screen.getByRole('status');
      expect(text).toHaveAttribute('aria-label', 'Description text');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Text>Accessible text</Text>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all sizes', async () => {
      const { container } = render(
        <div>
          <Text size="xs">Extra small</Text>
          <Text size="sm">Small</Text>
          <Text size="md">Medium</Text>
          <Text size="lg">Large</Text>
          <Text size="xl">Extra large</Text>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with label for form', async () => {
      const { container } = render(
        <div>
          <Text as="label" id="email-label">Email address</Text>
          <input type="email" aria-labelledby="email-label" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
