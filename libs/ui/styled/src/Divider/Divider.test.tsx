import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Divider } from './Divider';

describe('Divider', () => {
  describe('rendering', () => {
    it('renders without children', () => {
      const { container } = render(<Divider />);
      const divider = container.querySelector('hr');
      expect(divider).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<Divider>Or</Divider>);
      expect(screen.getByText('Or')).toBeInTheDocument();
    });

    it('applies default classes (horizontal neutral)', () => {
      const { container } = render(<Divider />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveClass('h-px');
      expect(divider).toHaveClass('w-full');
      expect(divider).toHaveClass('bg-neutral-300');
    });

    it('applies base classes', () => {
      const { container } = render(<Divider />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveClass('shrink-0');
    });
  });

  describe('orientation', () => {
    it('renders horizontal orientation by default', () => {
      const { container } = render(<Divider />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveClass('h-px');
      expect(divider).toHaveClass('w-full');
      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders vertical orientation', () => {
      const { container } = render(<Divider orientation="vertical" />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveClass('h-full');
      expect(divider).toHaveClass('w-px');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('renders horizontal orientation with children', () => {
      const { container } = render(<Divider orientation="horizontal">Text</Divider>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('w-full');
      expect(wrapper).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders vertical orientation with children', () => {
      const { container } = render(<Divider orientation="vertical">Text</Divider>);
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
      const { container } = render(<Divider color={color} />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveClass(expectedClass);
    });

    it('applies default neutral color', () => {
      const { container } = render(<Divider />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveClass('bg-neutral-300');
    });
  });

  describe('inset', () => {
    it('does not apply inset by default', () => {
      const { container } = render(<Divider />);
      const divider = container.querySelector('hr');
      expect(divider).not.toHaveClass('mx-4');
      expect(divider).not.toHaveClass('my-4');
    });

    it('applies horizontal inset margin', () => {
      const { container } = render(<Divider inset orientation="horizontal" />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveClass('mx-4');
    });

    it('applies vertical inset margin', () => {
      const { container } = render(<Divider inset orientation="vertical" />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveClass('my-4');
    });

    it('applies inset to wrapper when children present', () => {
      const { container } = render(<Divider inset>Text</Divider>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('mx-4');
    });

    it('applies vertical inset to wrapper when children present', () => {
      const { container } = render(<Divider inset orientation="vertical">Text</Divider>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('my-4');
    });
  });

  describe('children content', () => {
    it('renders text content in center', () => {
      render(<Divider>Or</Divider>);
      const text = screen.getByText('Or');
      expect(text).toHaveClass('text-sm');
      expect(text).toHaveClass('text-neutral-600');
    });

    it('renders with divider lines on both sides', () => {
      const { container } = render(<Divider>Or</Divider>);
      const dividers = container.querySelectorAll('hr');
      expect(dividers).toHaveLength(2);
      dividers.forEach((divider) => {
        expect(divider).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('renders as flex container with children', () => {
      const { container } = render(<Divider>Text</Divider>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex');
      expect(wrapper).toHaveClass('items-center');
      expect(wrapper).toHaveClass('gap-3');
    });

    it('applies color to divider lines with children', () => {
      const { container } = render(<Divider color="primary">Text</Divider>);
      const dividers = container.querySelectorAll('hr');
      dividers.forEach((divider) => {
        expect(divider).toHaveClass('bg-primary-300');
      });
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to hr element', () => {
      const ref = React.createRef<HTMLHRElement>();
      render(<Divider ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLHRElement);
    });

    it('does not forward ref when children present', () => {
      const ref = React.createRef<HTMLHRElement>();
      render(<Divider ref={ref}>Text</Divider>);
      // Ref is not forwarded to wrapper div, only to hr element without children
      expect(ref.current).toBeNull();
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(<Divider className="custom-class" />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveClass('custom-class');
      expect(divider).toHaveClass('bg-neutral-300');
    });

    it('merges custom className with children wrapper', () => {
      const { container } = render(<Divider className="custom-class">Text</Divider>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
      expect(wrapper).toHaveClass('flex');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      const { container } = render(
        <Divider data-testid="test-divider" id="my-divider" />
      );
      const divider = container.querySelector('hr');
      expect(divider).toHaveAttribute('id', 'my-divider');
      expect(divider).toHaveAttribute('data-testid', 'test-divider');
    });
  });

  describe('accessibility', () => {
    it('has role="separator" attribute', () => {
      const { container } = render(<Divider />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveAttribute('role', 'separator');
    });

    it('has role="separator" on wrapper when children present', () => {
      const { container } = render(<Divider>Or</Divider>);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute('role', 'separator');
    });

    it('has aria-orientation attribute', () => {
      const { container } = render(<Divider orientation="vertical" />);
      const divider = container.querySelector('hr');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('has no accessibility violations with default props', async () => {
      const { container } = render(<Divider />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with children', async () => {
      const { container } = render(<Divider>Or</Divider>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with vertical orientation', async () => {
      const { container } = render(<Divider orientation="vertical" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all colors', async () => {
      const { container } = render(
        <div>
          <Divider color="primary" />
          <Divider color="neutral" />
          <Divider color="success" />
          <Divider color="warning" />
          <Divider color="danger" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
