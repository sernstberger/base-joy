import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Separator } from './Separator';

describe('Separator', () => {
  describe('rendering', () => {
    it('renders without children', () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector('hr');
      expect(separator).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<Separator>Or</Separator>);
      expect(screen.getByText('Or')).toBeInTheDocument();
    });

    it('applies default classes (horizontal neutral)', () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveClass('h-px');
      expect(separator).toHaveClass('w-full');
      expect(separator).toHaveClass('bg-neutral-300');
    });

    it('applies base classes', () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveClass('shrink-0');
    });
  });

  describe('orientation', () => {
    it('renders horizontal orientation by default', () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveClass('h-px');
      expect(separator).toHaveClass('w-full');
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders vertical orientation', () => {
      const { container } = render(<Separator orientation="vertical" />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveClass('h-full');
      expect(separator).toHaveClass('w-px');
      expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('renders horizontal orientation with children', () => {
      const { container } = render(<Separator orientation="horizontal">Text</Separator>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('w-full');
      expect(wrapper).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders vertical orientation with children', () => {
      const { container } = render(<Separator orientation="vertical">Text</Separator>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('h-full');
      expect(wrapper).toHaveClass('flex-col');
      expect(wrapper).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'bg-primary-300'],
      ['neutral', 'bg-neutral-300'],
      ['success', 'bg-success-300'],
      ['warning', 'bg-warning-300'],
      ['danger', 'bg-danger-300'],
    ] as const)('renders %s color', (color, expectedClass) => {
      const { container } = render(<Separator color={color} />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveClass(expectedClass);
    });

    it('applies default neutral color', () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveClass('bg-neutral-300');
    });
  });

  describe('inset', () => {
    it('does not apply inset by default', () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector('hr');
      expect(separator).not.toHaveClass('mx-4');
      expect(separator).not.toHaveClass('my-4');
    });

    it('applies horizontal inset margin', () => {
      const { container } = render(<Separator inset orientation="horizontal" />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveClass('mx-4');
    });

    it('applies vertical inset margin', () => {
      const { container } = render(<Separator inset orientation="vertical" />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveClass('my-4');
    });

    it('applies inset to wrapper when children present', () => {
      const { container } = render(<Separator inset>Text</Separator>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('mx-4');
    });

    it('applies vertical inset to wrapper when children present', () => {
      const { container } = render(<Separator inset orientation="vertical">Text</Separator>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('my-4');
    });
  });

  describe('children content', () => {
    it('renders text content in center', () => {
      render(<Separator>Or</Separator>);
      const text = screen.getByText('Or');
      expect(text).toHaveClass('text-sm');
      expect(text).toHaveClass('text-neutral-600');
    });

    it('renders with separator lines on both sides', () => {
      const { container } = render(<Separator>Or</Separator>);
      const separators = container.querySelectorAll('hr');
      expect(separators).toHaveLength(2);
      separators.forEach((separator) => {
        expect(separator).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('renders as flex container with children', () => {
      const { container } = render(<Separator>Text</Separator>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex');
      expect(wrapper).toHaveClass('items-center');
      expect(wrapper).toHaveClass('gap-3');
    });

    it('applies color to separator lines with children', () => {
      const { container } = render(<Separator color="primary">Text</Separator>);
      const separators = container.querySelectorAll('hr');
      separators.forEach((separator) => {
        expect(separator).toHaveClass('bg-primary-300');
      });
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to hr element', () => {
      const ref = React.createRef<HTMLHRElement>();
      render(<Separator ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLHRElement);
    });

    it('does not forward ref when children present', () => {
      const ref = React.createRef<HTMLHRElement>();
      render(<Separator ref={ref}>Text</Separator>);
      // Ref is not forwarded to wrapper div, only to hr element without children
      expect(ref.current).toBeNull();
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(<Separator className="custom-class" />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveClass('custom-class');
      expect(separator).toHaveClass('bg-neutral-300');
    });

    it('merges custom className with children wrapper', () => {
      const { container } = render(<Separator className="custom-class">Text</Separator>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
      expect(wrapper).toHaveClass('flex');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      const { container } = render(
        <Separator data-testid="test-separator" id="my-separator" />
      );
      const separator = container.querySelector('hr');
      expect(separator).toHaveAttribute('id', 'my-separator');
      expect(separator).toHaveAttribute('data-testid', 'test-separator');
    });
  });

  describe('accessibility', () => {
    it('has role="separator" attribute', () => {
      const { container } = render(<Separator />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveAttribute('role', 'separator');
    });

    it('has role="separator" on wrapper when children present', () => {
      const { container } = render(<Separator>Or</Separator>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute('role', 'separator');
    });

    it('has aria-orientation attribute', () => {
      const { container } = render(<Separator orientation="vertical" />);
      const separator = container.querySelector('hr');
      expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Separator />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with children', async () => {
      const { container } = render(<Separator>Or</Separator>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with vertical orientation', async () => {
      const { container } = render(<Separator orientation="vertical" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all colors', async () => {
      const { container } = render(
        <div>
          <Separator color="primary" />
          <Separator color="neutral" />
          <Separator color="success" />
          <Separator color="warning" />
          <Separator color="danger" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
