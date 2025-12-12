import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Typography } from './Typography';

describe('Typography', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Typography>Test text</Typography>);
      expect(screen.getByText('Test text')).toBeInTheDocument();
    });

    it('renders as p element by default (body-md level)', () => {
      const { container } = render(<Typography>Content</Typography>);
      expect(container.firstChild?.nodeName).toBe('P');
    });

    it('applies default body-md styling', () => {
      const { container } = render(<Typography>Content</Typography>);
      expect(container.firstChild).toHaveClass('text-base', 'text-neutral-600');
    });
  });

  describe('heading levels', () => {
    it.each([
      ['h1', 'H1', 'text-4xl'],
      ['h2', 'H2', 'text-3xl'],
      ['h3', 'H3', 'text-2xl'],
      ['h4', 'H4', 'text-xl'],
      ['h5', 'H5', 'text-lg'],
      ['h6', 'H6', 'text-base'],
    ] as const)('renders level %s as %s with %s class', (level, tag, expectedClass) => {
      const { container } = render(<Typography level={level}>Content</Typography>);
      expect(container.firstChild?.nodeName).toBe(tag);
      expect(container.firstChild).toHaveClass(expectedClass, 'font-bold');
    });

    it('uses neutral-900 color for headings', () => {
      const { container } = render(<Typography level="h1">Content</Typography>);
      expect(container.firstChild).toHaveClass('text-neutral-900');
    });
  });

  describe('body levels', () => {
    it.each([
      ['body-xs', 'text-xs'],
      ['body-sm', 'text-sm'],
      ['body-md', 'text-base'],
      ['body-lg', 'text-lg'],
      ['body-xl', 'text-xl'],
    ] as const)('renders level %s with %s class', (level, expectedClass) => {
      const { container } = render(<Typography level={level}>Content</Typography>);
      expect(container.firstChild?.nodeName).toBe('P');
      expect(container.firstChild).toHaveClass(expectedClass);
    });

    it('uses neutral-600 color for body text', () => {
      const { container } = render(<Typography level="body-md">Content</Typography>);
      expect(container.firstChild).toHaveClass('text-neutral-600');
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'text-primary-700'],
      ['success', 'text-success-700'],
      ['warning', 'text-warning-700'],
      ['danger', 'text-danger-700'],
    ] as const)('renders %s color with %s class', (color, expectedClass) => {
      const { container } = render(<Typography color={color}>Content</Typography>);
      expect(container.firstChild).toHaveClass(expectedClass);
    });
  });

  describe('weights', () => {
    it.each([
      ['normal', 'font-normal'],
      ['medium', 'font-medium'],
      ['semibold', 'font-semibold'],
      ['bold', 'font-bold'],
    ] as const)('renders %s weight with %s class for body text', (weight, expectedClass) => {
      const { container } = render(<Typography weight={weight}>Content</Typography>);
      expect(container.firstChild).toHaveClass(expectedClass);
    });

    it('ignores weight prop for heading levels (always bold)', () => {
      const { container } = render(
        <Typography level="h1" weight="normal">Content</Typography>
      );
      expect(container.firstChild).toHaveClass('font-bold');
      expect(container.firstChild).not.toHaveClass('font-normal');
    });
  });

  describe('component prop', () => {
    it('allows overriding the element for body text', () => {
      const { container } = render(<Typography component="span">Content</Typography>);
      expect(container.firstChild?.nodeName).toBe('SPAN');
    });

    it('allows overriding the element for headings', () => {
      const { container } = render(<Typography level="h1" component="div">Content</Typography>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('renders as label when specified', () => {
      const { container } = render(<Typography component="label">Content</Typography>);
      expect(container.firstChild?.nodeName).toBe('LABEL');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Typography ref={ref}>Content</Typography>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('forwards ref to heading element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Typography ref={ref} level="h2">Content</Typography>);
      expect(ref.current?.nodeName).toBe('H2');
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <Typography className="custom-class">Content</Typography>
      );
      expect(container.firstChild).toHaveClass('custom-class', 'text-base');
    });

    it('allows className to override variant classes', () => {
      const { container } = render(
        <Typography className="text-2xl">Content</Typography>
      );
      expect(container.firstChild).toHaveClass('text-2xl');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Typography data-testid="test-text" id="my-text">
          Content
        </Typography>
      );
      const text = screen.getByTestId('test-text');
      expect(text).toHaveAttribute('id', 'my-text');
    });

    it('passes through aria attributes', () => {
      render(
        <Typography aria-label="Description" role="status">
          Content
        </Typography>
      );
      const text = screen.getByRole('status');
      expect(text).toHaveAttribute('aria-label', 'Description');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Typography>Accessible text</Typography>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all heading levels', async () => {
      const { container } = render(
        <div>
          <Typography level="h1">Heading 1</Typography>
          <Typography level="h2">Heading 2</Typography>
          <Typography level="h3">Heading 3</Typography>
          <Typography level="h4">Heading 4</Typography>
          <Typography level="h5">Heading 5</Typography>
          <Typography level="h6">Heading 6</Typography>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all body levels', async () => {
      const { container } = render(
        <div>
          <Typography level="body-xs">Extra small</Typography>
          <Typography level="body-sm">Small</Typography>
          <Typography level="body-md">Medium</Typography>
          <Typography level="body-lg">Large</Typography>
          <Typography level="body-xl">Extra large</Typography>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with label for form', async () => {
      const { container } = render(
        <div>
          <Typography component="label" id="email-label">Email address</Typography>
          <input type="email" aria-labelledby="email-label" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
