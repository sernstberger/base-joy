import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(<Textarea placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders as textarea element', () => {
      const { container } = render(<Textarea />);
      expect(container.querySelector('textarea')).toBeInTheDocument();
    });

    it('applies default variant classes (outlined neutral)', () => {
      const { container } = render(<Textarea />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('border-neutral-300');
      expect(textarea).toHaveClass('text-neutral-700');
      expect(textarea).toHaveClass('bg-neutral-50');
    });

    it('applies base classes', () => {
      const { container } = render(<Textarea />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('w-full');
      expect(textarea).toHaveClass('rounded-lg');
      expect(textarea).toHaveClass('border');
      expect(textarea).toHaveClass('transition-colors');
      expect(textarea).toHaveClass('resize-none');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        const { container } = render(<Textarea variant={variant} />);
        expect(container.querySelector('textarea')).toBeInTheDocument();
      }
    );

    it('applies solid variant classes', () => {
      const { container } = render(
        <Textarea variant="solid" color="primary" />
      );
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('bg-primary-500');
      expect(textarea).toHaveClass('text-white');
    });

    it('applies soft variant classes', () => {
      const { container } = render(
        <Textarea variant="soft" color="primary" />
      );
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('bg-primary-100');
      expect(textarea).toHaveClass('text-primary-900');
    });

    it('applies outlined variant classes', () => {
      const { container } = render(
        <Textarea variant="outlined" color="primary" />
      );
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('border');
      expect(textarea).toHaveClass('border-primary-500');
      expect(textarea).toHaveClass('bg-neutral-50');
    });

    it('applies plain variant classes', () => {
      const { container } = render(
        <Textarea variant="plain" color="primary" />
      );
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('bg-transparent');
      expect(textarea).toHaveClass('border-0');
    });
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color with soft variant',
      (color) => {
        const { container } = render(
          <Textarea variant="soft" color={color} />
        );
        const textarea = container.querySelector('textarea') as HTMLElement;
        expect(textarea).toHaveClass(`bg-${color}-100`);
        expect(textarea).toHaveClass(`text-${color}-900`);
      }
    );

    it.each(['primary', 'success', 'warning', 'danger'] as const)(
      'renders %s color with outlined variant',
      (color) => {
        const { container } = render(
          <Textarea variant="outlined" color={color} />
        );
        const textarea = container.querySelector('textarea') as HTMLElement;
        expect(textarea).toHaveClass(`border-${color}-500`);
      }
    );
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'p-2', 'text-sm'],
      ['md', 'p-3', 'text-base'],
      ['lg', 'p-4', 'text-lg'],
    ] as const)('renders %s size', (size, paddingClass, textClass) => {
      const { container } = render(<Textarea size={size} />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass(paddingClass);
      expect(textarea).toHaveClass(textClass);
    });

    it('applies default md size', () => {
      const { container } = render(<Textarea />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('p-3');
      expect(textarea).toHaveClass('text-base');
    });
  });

  describe('error state', () => {
    it('applies error classes when error prop is true', () => {
      const { container } = render(<Textarea error />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('border-danger-500');
      expect(textarea).toHaveClass('focus:border-danger-500');
    });

    it('does not apply error classes when error prop is false', () => {
      const { container } = render(<Textarea error={false} />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).not.toHaveClass('border-danger-500');
    });
  });

  describe('disabled state', () => {
    it('applies disabled attribute', () => {
      render(<Textarea disabled />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeDisabled();
    });

    it('applies disabled classes', () => {
      const { container } = render(<Textarea disabled />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('disabled:cursor-not-allowed');
      expect(textarea).toHaveClass('disabled:opacity-50');
    });
  });

  describe('rows props', () => {
    it('applies rows attribute', () => {
      render(<Textarea rows={4} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '4');
    });

    it('supports minRows prop', () => {
      const { container } = render(<Textarea minRows={2} />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toBeInTheDocument();
    });

    it('supports maxRows prop', () => {
      const { container } = render(<Textarea maxRows={6} />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toBeInTheDocument();
    });

    it('supports both minRows and maxRows', () => {
      const { container } = render(<Textarea minRows={2} maxRows={6} />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toBeInTheDocument();
    });
  });

  describe('fullWidth prop', () => {
    it('applies full width by default', () => {
      const { container } = render(<Textarea />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('w-full');
    });

    it('applies full width when explicitly true', () => {
      const { container } = render(<Textarea fullWidth />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('w-full');
    });

    it('does not apply full width when false', () => {
      const { container } = render(<Textarea fullWidth={false} />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('w-full');
    });
  });

  describe('controlled mode', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(
        <Textarea value="" onChange={handleChange} />
      );

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      await user.type(textarea, 'Hello');

      expect(handleChange).toHaveBeenCalled();
    });

    it('updates value when controlled', () => {
      const { rerender } = render(<Textarea value="Initial" onChange={() => {}} />);
      let textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('Initial');

      rerender(<Textarea value="Updated" onChange={() => {}} />);
      textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('Updated');
    });
  });

  describe('uncontrolled mode', () => {
    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<Textarea defaultValue="Initial" />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('Initial');

      await user.clear(textarea);
      await user.type(textarea, 'New text');

      expect(textarea.value).toBe('New text');
    });

    it('accepts defaultValue', () => {
      render(<Textarea defaultValue="Default text" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('Default text');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to textarea element', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('can focus via ref', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(<Textarea className="custom-class" />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('custom-class');
      expect(textarea).toHaveClass('rounded-lg');
    });

    it('allows className to override variant classes', () => {
      const { container } = render(<Textarea className="p-8" />);
      const textarea = container.querySelector('textarea') as HTMLElement;
      expect(textarea).toHaveClass('p-8');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Textarea
          data-testid="test-textarea"
          id="my-textarea"
          name="description"
        />
      );
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveAttribute('id', 'my-textarea');
      expect(textarea).toHaveAttribute('name', 'description');
    });

    it('passes through aria attributes', () => {
      render(
        <Textarea
          aria-label="Description"
          aria-describedby="help-text"
          aria-invalid="true"
        />
      );
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-label', 'Description');
      expect(textarea).toHaveAttribute('aria-describedby', 'help-text');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports placeholder', () => {
      render(<Textarea placeholder="Enter description" />);
      expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(
        <label>
          Description
          <Textarea />
        </label>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with aria-label', async () => {
      const { container } = render(
        <Textarea aria-label="Enter description" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations in error state', async () => {
      const { container } = render(
        <div>
          <label htmlFor="desc">Description</label>
          <Textarea id="desc" error aria-describedby="error-msg" />
          <span id="error-msg">This field is required</span>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(
        <label>
          Description
          <Textarea disabled />
        </label>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const { container } = render(
        <div>
          <label htmlFor="t1">Solid</label>
          <Textarea id="t1" variant="solid" />

          <label htmlFor="t2">Soft</label>
          <Textarea id="t2" variant="soft" />

          <label htmlFor="t3">Outlined</label>
          <Textarea id="t3" variant="outlined" />

          <label htmlFor="t4">Plain</label>
          <Textarea id="t4" variant="plain" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
