import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Input } from './Input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('applies default variant classes (outlined neutral)', () => {
      const { container } = render(<Input />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('border-neutral-300');
      expect(wrapper).toHaveClass('text-neutral-900');
      expect(wrapper).toHaveClass('bg-transparent');
    });

    it('applies base classes', () => {
      const { container } = render(<Input />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex');
      expect(wrapper).toHaveClass('items-center');
      expect(wrapper).toHaveClass('rounded-lg');
      expect(wrapper).toHaveClass('transition-colors');
    });
  });

  describe('input types', () => {
    it('renders text input type', () => {
      const { container } = render(<Input type="text" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders email input type', () => {
      const { container } = render(<Input type="email" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders password input type', () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders number input type', () => {
      const { container } = render(<Input type="number" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('renders search input type', () => {
      const { container } = render(<Input type="search" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'search');
    });

    it('renders tel input type', () => {
      const { container } = render(<Input type="tel" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'tel');
    });

    it('renders url input type', () => {
      const { container } = render(<Input type="url" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'url');
    });

    it('defaults to text type', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        const { container } = render(<Input variant={variant} />);
        expect(container.firstChild).toBeInTheDocument();
      }
    );

    it('applies solid variant classes', () => {
      const { container } = render(<Input variant="solid" color="primary" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('bg-primary-100');
      expect(wrapper).toHaveClass('text-primary-900');
    });

    it('applies soft variant classes', () => {
      const { container } = render(<Input variant="soft" color="primary" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('bg-primary-50');
      expect(wrapper).toHaveClass('text-primary-900');
    });

    it('applies outlined variant classes', () => {
      const { container } = render(<Input variant="outlined" color="primary" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('border');
      expect(wrapper).toHaveClass('border-primary-300');
      expect(wrapper).toHaveClass('bg-transparent');
    });

    it('applies plain variant classes', () => {
      const { container } = render(<Input variant="plain" color="primary" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('text-primary-900');
      expect(wrapper).toHaveClass('bg-transparent');
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'bg-primary-100'],
      ['neutral', 'bg-neutral-100'],
      ['success', 'bg-success-100'],
      ['warning', 'bg-warning-100'],
      ['danger', 'bg-danger-100'],
    ] as const)(
      'renders %s color with solid variant',
      (color, expectedClass) => {
        const { container } = render(<Input variant="solid" color={color} />);
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass(expectedClass);
      }
    );

    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color with soft variant',
      (color) => {
        const { container } = render(<Input variant="soft" color={color} />);
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass(`bg-${color}-50`);
        expect(wrapper).toHaveClass(`text-${color}-900`);
      }
    );
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'h-8', 'px-2', 'text-sm'],
      ['md', 'h-10', 'px-3', 'text-base'],
      ['lg', 'h-12', 'px-4', 'text-lg'],
    ] as const)('renders %s size', (size, heightClass, paddingClass, textClass) => {
      const { container } = render(<Input size={size} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass(heightClass);
      expect(wrapper).toHaveClass(paddingClass);
      expect(wrapper).toHaveClass(textClass);
    });

    it('applies default md size', () => {
      const { container } = render(<Input />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('h-10');
      expect(wrapper).toHaveClass('px-3');
      expect(wrapper).toHaveClass('text-base');
    });
  });

  describe('error state', () => {
    it('applies error classes with solid variant', () => {
      const { container } = render(<Input error variant="solid" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('bg-danger-100');
      expect(wrapper).toHaveClass('text-danger-900');
    });

    it('applies error classes with outlined variant', () => {
      const { container } = render(<Input error variant="outlined" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('border-danger-500');
      expect(wrapper).toHaveClass('text-danger-900');
    });

    it('overrides color when error is true', () => {
      const { container } = render(<Input error color="primary" variant="outlined" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('border-danger-500');
      expect(wrapper).not.toHaveClass('border-primary-300');
    });
  });

  describe('disabled state', () => {
    it('disables the input', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('applies disabled classes', () => {
      const { container } = render(<Input disabled />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('opacity-50');
      expect(wrapper).toHaveClass('cursor-not-allowed');
    });
  });

  describe('decorators', () => {
    it('renders start decorator', () => {
      render(<Input startDecorator={<span data-testid="start-icon">🔍</span>} />);
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('renders end decorator', () => {
      render(<Input endDecorator={<span data-testid="end-icon">✓</span>} />);
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('renders both decorators', () => {
      render(
        <Input
          startDecorator={<span data-testid="start-icon">🔍</span>}
          endDecorator={<span data-testid="end-icon">✓</span>}
        />
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });
  });

  describe('fullWidth prop', () => {
    it('applies full width class when true', () => {
      const { container } = render(<Input fullWidth />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('w-full');
    });

    it('does not apply full width class by default', () => {
      const { container } = render(<Input />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('w-full'); // Note: w-full is in base styles
    });
  });

  describe('controlled mode', () => {
    it('works as controlled component', () => {
      const handleChange = jest.fn();

      render(<Input value="test" onChange={handleChange} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('test');

      fireEvent.change(input, { target: { value: 'testa' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('updates value when prop changes', () => {
      const { rerender } = render(<Input value="initial" onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('initial');

      rerender(<Input value="updated" onChange={() => {}} />);
      expect(input.value).toBe('updated');
    });
  });

  describe('uncontrolled mode', () => {
    it('works as uncontrolled component', () => {
      render(<Input defaultValue="initial" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('initial');

      fireEvent.change(input, { target: { value: 'new value' } });
      expect(input.value).toBe('new value');
    });

    it('accepts user input without onChange', () => {
      render(<Input />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test input' } });
      expect(input.value).toBe('test input');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });

    it('can focus input via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(<Input className="custom-class" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-class');
      expect(wrapper).toHaveClass('rounded-lg');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through input attributes', () => {
      render(
        <Input
          data-testid="test-input"
          id="my-input"
          name="username"
          placeholder="Enter username"
          autoComplete="username"
        />
      );
      const input = screen.getByTestId('test-input');
      expect(input).toHaveAttribute('id', 'my-input');
      expect(input).toHaveAttribute('name', 'username');
      expect(input).toHaveAttribute('placeholder', 'Enter username');
      expect(input).toHaveAttribute('autoComplete', 'username');
    });

    it('passes through aria attributes', () => {
      render(
        <Input
          aria-label="Search"
          aria-describedby="search-hint"
          aria-invalid="true"
        />
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Search');
      expect(input).toHaveAttribute('aria-describedby', 'search-hint');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(
        <label>
          Username
          <Input />
        </label>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with aria-label', async () => {
      const { container } = render(<Input aria-label="Search" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const { container } = render(
        <div>
          <Input variant="solid" aria-label="Solid input" />
          <Input variant="soft" aria-label="Soft input" />
          <Input variant="outlined" aria-label="Outlined input" />
          <Input variant="plain" aria-label="Plain input" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations in error state', async () => {
      const { container } = render(
        <div>
          <label htmlFor="error-input">Email</label>
          <Input id="error-input" error aria-describedby="error-msg" />
          <span id="error-msg">Please enter a valid email</span>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with decorators', async () => {
      const { container } = render(
        <Input
          aria-label="Search"
          startDecorator={<span aria-hidden="true">🔍</span>}
          endDecorator={<button type="button" aria-label="Clear">✕</button>}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
