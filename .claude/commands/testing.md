# Generate Tests: $ARGUMENTS

Create comprehensive tests for a base-joy component following Kent C. Dodds' Testing Library methodology and vitest-axe for accessibility testing.

## Component Name
Parse the component name from the arguments. It should be PascalCase (e.g., Sheet, Button, Card).

## Testing Philosophy (Kent C. Dodds)

1. **Test user behavior, not implementation details**
   - Query by role, label, text - what users see
   - Avoid testing internal state or implementation
   - "The more your tests resemble the way your software is used, the more confidence they can give you"

2. **Accessibility-first queries**
   - Prefer: `getByRole`, `getByLabelText`, `getByText`
   - Avoid: `getByTestId` (use as last resort)
   - This ensures components are accessible

3. **Test what matters to users**
   - Does it render correctly?
   - Does it respond to user interactions?
   - Is it accessible?

## Test File Template

**Path:** `libs/ui/components/src/{ComponentName}/{ComponentName}.test.tsx`

```tsx
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { {ComponentName} } from './{ComponentName}';

describe('{ComponentName}', () => {
  // ===========================================
  // RENDERING TESTS
  // ===========================================
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<{ComponentName}>Test content</{ComponentName}>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies default variant classes', () => {
      const { container } = render(<{ComponentName}>Content</{ComponentName}>);
      const element = container.firstChild as HTMLElement;
      // Verify default soft neutral styles
      expect(element).toHaveClass('bg-neutral-100');
      expect(element).toHaveClass('text-neutral-900');
    });

    it('applies base classes', () => {
      const { container } = render(<{ComponentName}>Content</{ComponentName}>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('rounded-lg');
      expect(element).toHaveClass('transition-colors');
    });
  });

  // ===========================================
  // VARIANT TESTS
  // ===========================================
  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        const { container } = render(
          <{ComponentName} variant={variant}>Content</{ComponentName}>
        );
        expect(container.firstChild).toBeInTheDocument();
      }
    );

    it('applies solid variant classes', () => {
      const { container } = render(
        <{ComponentName} variant="solid" color="primary">Content</{ComponentName}>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('bg-primary-500');
      expect(element).toHaveClass('text-white');
    });

    it('applies soft variant classes', () => {
      const { container } = render(
        <{ComponentName} variant="soft" color="primary">Content</{ComponentName}>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('bg-primary-100');
      expect(element).toHaveClass('text-primary-900');
    });

    it('applies outlined variant classes', () => {
      const { container } = render(
        <{ComponentName} variant="outlined" color="primary">Content</{ComponentName}>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('border');
      expect(element).toHaveClass('border-primary-500');
      expect(element).toHaveClass('bg-transparent');
    });

    it('applies plain variant classes', () => {
      const { container } = render(
        <{ComponentName} variant="plain" color="primary">Content</{ComponentName}>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-primary-700');
      expect(element).toHaveClass('bg-transparent');
    });
  });

  // ===========================================
  // COLOR TESTS
  // ===========================================
  describe('colors', () => {
    it.each([
      ['primary', 'bg-primary-500'],
      ['neutral', 'bg-neutral-800'], // neutral uses 800 for contrast
      ['success', 'bg-success-500'],
      ['warning', 'bg-warning-500'],
      ['danger', 'bg-danger-500'],
    ] as const)(
      'renders %s color with solid variant',
      (color, expectedClass) => {
        const { container } = render(
          <{ComponentName} variant="solid" color={color}>Content</{ComponentName}>
        );
        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(expectedClass);
      }
    );

    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color with soft variant',
      (color) => {
        const { container } = render(
          <{ComponentName} variant="soft" color={color}>Content</{ComponentName}>
        );
        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(`bg-${color}-100`);
        expect(element).toHaveClass(`text-${color}-900`);
      }
    );
  });

  // ===========================================
  // SIZE TESTS
  // ===========================================
  describe('sizes', () => {
    it.each([
      ['sm', 'p-2'],
      ['md', 'p-4'],
      ['lg', 'p-6'],
    ] as const)('renders %s size with %s padding class', (size, expectedClass) => {
      const { container } = render(<{ComponentName} size={size}>Content</{ComponentName}>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(expectedClass);
    });

    it('applies default md size', () => {
      const { container } = render(<{ComponentName}>Content</{ComponentName}>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('p-4');
    });
  });

  // ===========================================
  // POLYMORPHIC AS PROP TESTS
  // ===========================================
  describe('polymorphic as prop', () => {
    it('renders as div by default', () => {
      const { container } = render(<{ComponentName}>Content</{ComponentName}>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('renders as section when specified', () => {
      const { container } = render(<{ComponentName} as="section">Content</{ComponentName}>);
      expect(container.firstChild?.nodeName).toBe('SECTION');
    });

    it('renders as article when specified', () => {
      const { container } = render(<{ComponentName} as="article">Content</{ComponentName}>);
      expect(container.firstChild?.nodeName).toBe('ARTICLE');
    });

    it('renders as button when specified', () => {
      render(<{ComponentName} as="button">Content</{ComponentName}>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // ===========================================
  // REF FORWARDING TESTS
  // ===========================================
  describe('ref forwarding', () => {
    it('forwards ref to the DOM element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<{ComponentName} ref={ref}>Content</{ComponentName}>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref when using as prop', () => {
      const ref = React.createRef<HTMLElement>();
      render(<{ComponentName} as="section" ref={ref}>Content</{ComponentName}>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.nodeName).toBe('SECTION');
    });
  });

  // ===========================================
  // CLASS NAME MERGING TESTS
  // ===========================================
  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <{ComponentName} className="custom-class">Content</{ComponentName}>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass('rounded-lg');
    });

    it('allows className to override variant classes via tailwind-merge', () => {
      const { container } = render(
        <{ComponentName} className="p-8">Content</{ComponentName}>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('p-8');
    });
  });

  // ===========================================
  // HTML ATTRIBUTES TESTS
  // ===========================================
  describe('HTML attributes', () => {
    it('passes through data attributes', () => {
      render(<{ComponentName} data-testid="test-{componentName}">Content</{ComponentName}>);
      expect(screen.getByTestId('test-{componentName}')).toBeInTheDocument();
    });

    it('passes through aria attributes', () => {
      render(
        <{ComponentName} aria-label="Info panel" role="region">Content</{ComponentName}>
      );
      const element = screen.getByRole('region');
      expect(element).toHaveAttribute('aria-label', 'Info panel');
    });

    it('passes through id attribute', () => {
      render(<{ComponentName} id="my-{componentName}">Content</{ComponentName}>);
      const element = document.getElementById('my-{componentName}');
      expect(element).toBeInTheDocument();
    });
  });

  // ===========================================
  // ACCESSIBILITY TESTS (vitest-axe)
  // ===========================================
  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(
        <{ComponentName}>
          <p>Accessible content</p>
        </{ComponentName}>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with solid variant', async () => {
      const { container } = render(
        <{ComponentName} variant="solid" color="primary">
          <p>Solid content</p>
        </{ComponentName}>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations across all variants', async () => {
      const { container } = render(
        <div>
          <{ComponentName} variant="solid" color="primary">Solid</{ComponentName}>
          <{ComponentName} variant="soft" color="success">Soft</{ComponentName}>
          <{ComponentName} variant="outlined" color="warning">Outlined</{ComponentName}>
          <{ComponentName} variant="plain" color="danger">Plain</{ComponentName}>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations as semantic element', async () => {
      const { container } = render(
        <{ComponentName} as="section" aria-label="Main content">
          <h2>Section Title</h2>
          <p>Section content</p>
        </{ComponentName}>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ===========================================
  // COMPONENT-SPECIFIC TESTS
  // Add tests specific to this component's behavior
  // ===========================================
  // describe('component-specific behavior', () => {
  //   // Add tests for interactive behavior, event handlers, etc.
  // });
});
```

## Running Tests

```bash
# Run all tests
yarn test

# Run tests for specific component
yarn test {ComponentName}

# Run with coverage
yarn test:coverage

# Run in watch mode
yarn test:watch
```

## Testing Best Practices

### DO:
- Use `screen` queries (they're automatically bound to document.body)
- Use `userEvent` for user interactions (more realistic than `fireEvent`)
- Test accessibility with vitest-axe
- Test edge cases and error states
- Use `it.each` for parameterized tests

### DON'T:
- Don't test implementation details (internal state, private methods)
- Don't use `getByTestId` as first choice
- Don't test styling specifics unless critical to functionality
- Don't mock what you don't need to mock

## Checklist

- [ ] All rendering tests pass
- [ ] All variant tests pass
- [ ] All color tests pass
- [ ] All size tests pass
- [ ] Polymorphic `as` prop tests pass
- [ ] Ref forwarding tests pass
- [ ] className merging tests pass
- [ ] HTML attributes pass-through tests pass
- [ ] All vitest-axe accessibility tests pass
- [ ] Add component-specific tests if needed
- [ ] Run `yarn test` to verify all tests pass
