import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Sheet } from './Sheet';
import { useColorContext } from '../ColorContext';

describe('Sheet', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Sheet>Test content</Sheet>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies default variant classes (soft neutral)', () => {
      const { container } = render(<Sheet>Content</Sheet>);
      const sheet = container.firstChild as HTMLElement;
      expect(sheet).toHaveClass('bg-neutral-100');
      expect(sheet).toHaveClass('text-neutral-900');
    });

    it('applies base classes', () => {
      const { container } = render(<Sheet>Content</Sheet>);
      const sheet = container.firstChild as HTMLElement;
      expect(sheet).toHaveClass('rounded-lg');
      expect(sheet).toHaveClass('transition-colors');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        const { container } = render(
          <Sheet variant={variant}>Content</Sheet>
        );
        expect(container.firstChild).toBeInTheDocument();
      }
    );

    it('applies solid variant classes', () => {
      const { container } = render(
        <Sheet variant="solid" color="primary">
          Content
        </Sheet>
      );
      const sheet = container.firstChild as HTMLElement;
      expect(sheet).toHaveClass('bg-primary-500');
      expect(sheet).toHaveClass('text-white');
    });

    it('applies soft variant classes', () => {
      const { container } = render(
        <Sheet variant="soft" color="primary">
          Content
        </Sheet>
      );
      const sheet = container.firstChild as HTMLElement;
      expect(sheet).toHaveClass('bg-primary-100');
      expect(sheet).toHaveClass('text-primary-900');
    });

    it('applies outlined variant classes', () => {
      const { container } = render(
        <Sheet variant="outlined" color="primary">
          Content
        </Sheet>
      );
      const sheet = container.firstChild as HTMLElement;
      expect(sheet).toHaveClass('border');
      expect(sheet).toHaveClass('border-primary-500');
      expect(sheet).toHaveClass('bg-transparent');
    });

    it('applies plain variant classes', () => {
      const { container } = render(
        <Sheet variant="plain" color="primary">
          Content
        </Sheet>
      );
      const sheet = container.firstChild as HTMLElement;
      expect(sheet).toHaveClass('text-primary-700');
      expect(sheet).toHaveClass('bg-transparent');
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'bg-primary-500'],
      ['neutral', 'bg-neutral-800'], // neutral uses 800 for better contrast
      ['success', 'bg-success-500'],
      ['warning', 'bg-warning-600'], // warning uses 600 for WCAG AAA compliance
      ['danger', 'bg-danger-500'],
    ] as const)(
      'renders %s color with solid variant',
      (color, expectedClass) => {
        const { container } = render(
          <Sheet variant="solid" color={color}>
            Content
          </Sheet>
        );
        const sheet = container.firstChild as HTMLElement;
        expect(sheet).toHaveClass(expectedClass);
      }
    );

    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color with soft variant',
      (color) => {
        const { container } = render(
          <Sheet variant="soft" color={color}>
            Content
          </Sheet>
        );
        const sheet = container.firstChild as HTMLElement;
        expect(sheet).toHaveClass(`bg-${color}-100`);
        expect(sheet).toHaveClass(`text-${color}-900`);
      }
    );
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'p-2'],
      ['md', 'p-4'],
      ['lg', 'p-6'],
    ] as const)('renders %s size with %s padding class', (size, expectedClass) => {
      const { container } = render(<Sheet size={size}>Content</Sheet>);
      const sheet = container.firstChild as HTMLElement;
      expect(sheet).toHaveClass(expectedClass);
    });

    it('applies default md size', () => {
      const { container } = render(<Sheet>Content</Sheet>);
      const sheet = container.firstChild as HTMLElement;
      expect(sheet).toHaveClass('p-4');
    });
  });

  describe('polymorphic as prop', () => {
    it('renders as div by default', () => {
      const { container } = render(<Sheet>Content</Sheet>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('renders as section when specified', () => {
      const { container } = render(<Sheet as="section">Content</Sheet>);
      expect(container.firstChild?.nodeName).toBe('SECTION');
    });

    it('renders as article when specified', () => {
      const { container } = render(<Sheet as="article">Content</Sheet>);
      expect(container.firstChild?.nodeName).toBe('ARTICLE');
    });

    it('renders as aside when specified', () => {
      const { container } = render(<Sheet as="aside">Content</Sheet>);
      expect(container.firstChild?.nodeName).toBe('ASIDE');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the DOM element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Sheet ref={ref}>Content</Sheet>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref when using as prop', () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Sheet as="section" ref={ref}>
          Content
        </Sheet>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.nodeName).toBe('SECTION');
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <Sheet className="custom-class">Content</Sheet>
      );
      const sheet = container.firstChild as HTMLElement;
      expect(sheet).toHaveClass('custom-class');
      expect(sheet).toHaveClass('rounded-lg');
    });

    it('allows className to override variant classes', () => {
      const { container } = render(
        <Sheet className="p-8">Content</Sheet>
      );
      const sheet = container.firstChild as HTMLElement;
      // The custom p-8 should override the default p-4 via tailwind-merge
      expect(sheet).toHaveClass('p-8');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Sheet data-testid="test-sheet" id="my-sheet">
          Content
        </Sheet>
      );
      const sheet = screen.getByTestId('test-sheet');
      expect(sheet).toHaveAttribute('id', 'my-sheet');
    });

    it('passes through aria attributes', () => {
      render(
        <Sheet aria-label="Info panel" role="region">
          Content
        </Sheet>
      );
      const sheet = screen.getByRole('region');
      expect(sheet).toHaveAttribute('aria-label', 'Info panel');
    });
  });

  describe('WCAG text color compliance', () => {
    describe('interactive text colors on active states', () => {
      it('applies darker text on soft warning active state', () => {
        const { container } = render(
          <Sheet variant="soft" color="warning" interactive>
            Test
          </Sheet>
        );
        const sheet = container.firstChild as HTMLElement;
        expect(sheet).toHaveClass('active:text-warning-950');
      });

      it('applies darker text on soft danger active state', () => {
        const { container } = render(
          <Sheet variant="soft" color="danger" interactive>
            Test
          </Sheet>
        );
        const sheet = container.firstChild as HTMLElement;
        expect(sheet).toHaveClass('active:text-danger-950');
      });

      it('applies darker text on outlined variant active states', () => {
        const colors = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;
        colors.forEach((color) => {
          const { container } = render(
            <Sheet variant="outlined" color={color} interactive>
              Test
            </Sheet>
          );
          const sheet = container.firstChild as HTMLElement;
          expect(sheet).toHaveClass(`active:text-${color}-800`);
        });
      });

      it('applies darker text on plain variant active states', () => {
        const colors = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;
        colors.forEach((color) => {
          const { container } = render(
            <Sheet variant="plain" color={color} interactive>
              Test
            </Sheet>
          );
          const sheet = container.firstChild as HTMLElement;
          expect(sheet).toHaveClass(`active:text-${color}-800`);
        });
      });

      it('does not apply active text colors when not interactive', () => {
        const { container } = render(
          <Sheet variant="outlined" color="primary" interactive={false}>
            Test
          </Sheet>
        );
        const sheet = container.firstChild as HTMLElement;
        expect(sheet).not.toHaveClass('active:text-primary-800');
      });
    });
  });

  describe('warnings', () => {
    it('warns when focusWithin is used without interactive', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <Sheet focusWithin interactive={false}>
          Content
        </Sheet>
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('focusWithin prop only works when interactive is true')
      );

      consoleErrorSpy.mockRestore();
    });

    it('does not warn when focusWithin is used with interactive', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <Sheet focusWithin interactive>
          Content
        </Sheet>
      );

      expect(consoleErrorSpy).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('does not warn when focusWithin is false', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <Sheet focusWithin={false} interactive={false}>
          Content
        </Sheet>
      );

      expect(consoleErrorSpy).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(
        <Sheet>
          <p>Accessible content</p>
        </Sheet>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with solid variant', async () => {
      const { container } = render(
        <Sheet variant="solid" color="primary">
          <p>Solid content</p>
        </Sheet>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const { container } = render(
        <div>
          <Sheet variant="solid" color="primary">
            Solid
          </Sheet>
          <Sheet variant="soft" color="success">
            Soft
          </Sheet>
          <Sheet variant="outlined" color="warning">
            Outlined
          </Sheet>
          <Sheet variant="plain" color="danger">
            Plain
          </Sheet>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations as semantic element', async () => {
      const { container } = render(
        <Sheet as="section" aria-label="Main content">
          <h2>Section Title</h2>
          <p>Section content</p>
        </Sheet>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ColorContext integration', () => {
    const ColorContextConsumer = () => {
      const ctx = useColorContext();
      return (
        <span data-testid="context">
          {ctx ? JSON.stringify(ctx) : 'null'}
        </span>
      );
    };

    it('provides color context to children', () => {
      render(
        <Sheet variant="solid" color="primary">
          <ColorContextConsumer />
        </Sheet>
      );

      const context = JSON.parse(screen.getByTestId('context').textContent!);
      expect(context.color).toBe('primary');
      expect(context.isInsideSolid).toBe(true);
      expect(context.parentVariant).toBe('solid');
    });

    it('provides isInsideSolid=false for non-solid variants', () => {
      render(
        <Sheet variant="soft" color="danger">
          <ColorContextConsumer />
        </Sheet>
      );

      const context = JSON.parse(screen.getByTestId('context').textContent!);
      expect(context.color).toBe('danger');
      expect(context.isInsideSolid).toBe(false);
      expect(context.parentVariant).toBe('soft');
    });

    it('provides default values when using default props', () => {
      render(
        <Sheet>
          <ColorContextConsumer />
        </Sheet>
      );

      const context = JSON.parse(screen.getByTestId('context').textContent!);
      expect(context.color).toBe('neutral');
      expect(context.isInsideSolid).toBe(false);
      expect(context.parentVariant).toBe('soft');
    });

    it('nested Sheets override parent context', () => {
      render(
        <Sheet variant="solid" color="primary">
          <Sheet variant="outlined" color="success">
            <ColorContextConsumer />
          </Sheet>
        </Sheet>
      );

      const context = JSON.parse(screen.getByTestId('context').textContent!);
      expect(context.color).toBe('success');
      expect(context.isInsideSolid).toBe(false);
      expect(context.parentVariant).toBe('outlined');
    });
  });
});
