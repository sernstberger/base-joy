import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Stack } from './Stack';

describe('Stack', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(
        <Stack>
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('applies base flex class', () => {
      const { container } = render(
        <Stack>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('flex');
    });

    it('applies default direction (column)', () => {
      const { container } = render(
        <Stack>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('flex-col');
    });

    it('applies default spacing (gap-2)', () => {
      const { container } = render(
        <Stack>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('gap-2');
    });

    it('applies default align (stretch)', () => {
      const { container } = render(
        <Stack>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('items-stretch');
    });

    it('applies default justify (start)', () => {
      const { container } = render(
        <Stack>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('justify-start');
    });
  });

  describe('direction prop', () => {
    it.each([
      ['column', 'flex-col'],
      ['row', 'flex-row'],
      ['column-reverse', 'flex-col-reverse'],
      ['row-reverse', 'flex-row-reverse'],
    ] as const)('renders %s direction with %s class', (direction, expectedClass) => {
      const { container } = render(
        <Stack direction={direction}>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass(expectedClass);
    });
  });

  describe('spacing prop', () => {
    it.each([
      [0, 'gap-0'],
      [1, 'gap-1'],
      [2, 'gap-2'],
      [4, 'gap-4'],
      [6, 'gap-6'],
      [8, 'gap-8'],
      [12, 'gap-12'],
    ] as const)('renders spacing %s with %s class', (spacing, expectedClass) => {
      const { container } = render(
        <Stack spacing={spacing}>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass(expectedClass);
    });
  });

  describe('align prop', () => {
    it.each([
      ['start', 'items-start'],
      ['center', 'items-center'],
      ['end', 'items-end'],
      ['stretch', 'items-stretch'],
      ['baseline', 'items-baseline'],
    ] as const)('renders align %s with %s class', (align, expectedClass) => {
      const { container } = render(
        <Stack align={align}>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass(expectedClass);
    });
  });

  describe('justify prop', () => {
    it.each([
      ['start', 'justify-start'],
      ['center', 'justify-center'],
      ['end', 'justify-end'],
      ['between', 'justify-between'],
      ['around', 'justify-around'],
      ['evenly', 'justify-evenly'],
    ] as const)('renders justify %s with %s class', (justify, expectedClass) => {
      const { container } = render(
        <Stack justify={justify}>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass(expectedClass);
    });
  });

  describe('wrap prop', () => {
    it('applies flex-wrap when wrap is true', () => {
      const { container } = render(
        <Stack wrap>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('flex-wrap');
    });

    it('applies flex-nowrap when wrap is false', () => {
      const { container } = render(
        <Stack wrap={false}>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('flex-nowrap');
    });

    it('applies flex-nowrap by default', () => {
      const { container } = render(
        <Stack>
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('flex-nowrap');
    });
  });

  describe('divider prop', () => {
    it('renders dividers between children', () => {
      render(
        <Stack divider={<hr data-testid="divider" />}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Stack>
      );
      const dividers = screen.getAllByTestId('divider');
      expect(dividers).toHaveLength(2);
    });

    it('does not render divider before first child', () => {
      const { container } = render(
        <Stack divider={<hr className="divider" />}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      const firstChild = stack.firstChild;
      expect(firstChild?.nodeName).toBe('DIV');
    });

    it('renders correctly with single child', () => {
      render(
        <Stack divider={<hr data-testid="divider" />}>
          <div>Only Item</div>
        </Stack>
      );
      expect(screen.queryByTestId('divider')).not.toBeInTheDocument();
    });

    it('does not render dividers when no children', () => {
      const { container } = render(<Stack divider={<hr className="divider" />} />);
      expect(container.querySelector('.divider')).not.toBeInTheDocument();
    });
  });

  describe('polymorphic as prop', () => {
    it('renders as div by default', () => {
      const { container } = render(
        <Stack>
          <div>Content</div>
        </Stack>
      );
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('renders as section when specified', () => {
      const { container } = render(
        <Stack as="section">
          <div>Content</div>
        </Stack>
      );
      expect(container.firstChild?.nodeName).toBe('SECTION');
    });

    it('renders as ul when specified', () => {
      const { container } = render(
        <Stack as="ul">
          <li>Item</li>
        </Stack>
      );
      expect(container.firstChild?.nodeName).toBe('UL');
    });

    it('renders as nav when specified', () => {
      const { container } = render(
        <Stack as="nav">
          <div>Content</div>
        </Stack>
      );
      expect(container.firstChild?.nodeName).toBe('NAV');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the DOM element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Stack ref={ref}>
          <div>Content</div>
        </Stack>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref when using as prop', () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Stack as="section" ref={ref}>
          <div>Content</div>
        </Stack>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.nodeName).toBe('SECTION');
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <Stack className="custom-class">
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('custom-class');
      expect(stack).toHaveClass('flex');
    });

    it('allows className to override variant classes', () => {
      const { container } = render(
        <Stack className="gap-8">
          <div>Content</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('gap-8');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Stack data-testid="test-stack" id="my-stack">
          <div>Content</div>
        </Stack>
      );
      const stack = screen.getByTestId('test-stack');
      expect(stack).toHaveAttribute('id', 'my-stack');
    });

    it('passes through aria attributes', () => {
      render(
        <Stack aria-label="Navigation items" role="navigation">
          <div>Content</div>
        </Stack>
      );
      const stack = screen.getByRole('navigation');
      expect(stack).toHaveAttribute('aria-label', 'Navigation items');
    });
  });

  describe('combined variants', () => {
    it('applies multiple variant props together', () => {
      const { container } = render(
        <Stack direction="row" spacing={4} align="center" justify="between" wrap>
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );
      const stack = container.firstChild as HTMLElement;
      expect(stack).toHaveClass('flex-row');
      expect(stack).toHaveClass('gap-4');
      expect(stack).toHaveClass('items-center');
      expect(stack).toHaveClass('justify-between');
      expect(stack).toHaveClass('flex-wrap');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(
        <Stack>
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with row direction', async () => {
      const { container } = render(
        <Stack direction="row">
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
        </Stack>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with dividers', async () => {
      const { container } = render(
        <Stack divider={<hr />}>
          <p>Section 1</p>
          <p>Section 2</p>
        </Stack>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations as semantic element', async () => {
      const { container } = render(
        <Stack as="nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
        </Stack>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
