---
name: test-generator
description: Generate comprehensive test suites for components. Use when writing tests, adding tests, creating test suites, testing a component, or adding test coverage.
---

# Test Suite Generator

Generate comprehensive test files for base-joy components following established patterns.

## File Location

Create test files at: `libs/ui/styled/src/ComponentName/ComponentName.test.tsx`

## Test Template

```tsx
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ComponentName } from './ComponentName';
import { Sheet } from '../Sheet';

describe('ComponentName', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<ComponentName>Content</ComponentName>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies default variant classes (solid primary)', () => {
      const { container } = render(<ComponentName>Content</ComponentName>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('bg-primary-500');
      expect(element).toHaveClass('text-white');
    });

    it('applies base classes', () => {
      const { container } = render(<ComponentName>Content</ComponentName>);
      const element = container.firstChild as HTMLElement;
      // Check component-specific base classes
      expect(element).toHaveClass('inline-flex');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        const { container } = render(
          <ComponentName variant={variant}>Content</ComponentName>
        );
        expect(container.firstChild).toBeInTheDocument();
      }
    );

    it('applies solid variant classes', () => {
      const { container } = render(
        <ComponentName variant="solid" color="primary">Content</ComponentName>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('bg-primary-500');
      expect(element).toHaveClass('text-white');
    });

    it('applies soft variant classes', () => {
      const { container } = render(
        <ComponentName variant="soft" color="primary">Content</ComponentName>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('bg-primary-100');
      expect(element).toHaveClass('text-primary-900');
    });

    it('applies outlined variant classes', () => {
      const { container } = render(
        <ComponentName variant="outlined" color="primary">Content</ComponentName>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('border');
      expect(element).toHaveClass('border-primary-500');
    });

    it('applies plain variant classes', () => {
      const { container } = render(
        <ComponentName variant="plain" color="primary">Content</ComponentName>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('text-primary-700');
      expect(element).toHaveClass('bg-transparent');
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'bg-primary-500'],
      ['neutral', 'bg-neutral-800'],
      ['success', 'bg-success-500'],
      ['warning', 'bg-warning-600'],
      ['danger', 'bg-danger-500'],
    ] as const)('renders %s color with solid variant', (color, expectedClass) => {
      const { container } = render(
        <ComponentName variant="solid" color={color}>Content</ComponentName>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(expectedClass);
    });

    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color with soft variant',
      (color) => {
        const { container } = render(
          <ComponentName variant="soft" color={color}>Content</ComponentName>
        );
        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(`bg-${color}-100`);
        expect(element).toHaveClass(`text-${color}-900`);
      }
    );
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'expected-sm-class'],
      ['md', 'expected-md-class'],
      ['lg', 'expected-lg-class'],
    ] as const)('renders %s size', (size, expectedClass) => {
      const { container } = render(
        <ComponentName size={size}>Content</ComponentName>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass(expectedClass);
    });

    it('applies default md size', () => {
      const { container } = render(<ComponentName>Content</ComponentName>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('expected-md-class');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ComponentName ref={ref}>Content</ComponentName>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(
        <ComponentName className="custom-class">Content</ComponentName>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass('bg-primary-500'); // Default variant
    });

    it('allows className to override variant classes', () => {
      const { container } = render(
        <ComponentName className="bg-red-500">Content</ComponentName>
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('bg-red-500');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through data attributes', () => {
      render(<ComponentName data-testid="test-component">Content</ComponentName>);
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('passes through aria attributes', () => {
      render(<ComponentName aria-label="Test label">Content</ComponentName>);
      expect(screen.getByLabelText('Test label')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = render(<ComponentName>Accessible content</ComponentName>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const { container } = render(
        <div>
          <ComponentName variant="solid">Solid</ComponentName>
          <ComponentName variant="soft">Soft</ComponentName>
          <ComponentName variant="outlined">Outlined</ComponentName>
          <ComponentName variant="plain">Plain</ComponentName>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ColorContext integration', () => {
    it('inherits color from parent Sheet', () => {
      const { container } = render(
        <Sheet color="success">
          <ComponentName>Inherited</ComponentName>
        </Sheet>
      );
      const element = container.querySelector('[class*="success"]');
      expect(element).toBeInTheDocument();
    });

    it('inverts to plain variant inside solid Sheet', () => {
      const { container } = render(
        <Sheet variant="solid" color="primary">
          <ComponentName>Auto-adjusted</ComponentName>
        </Sheet>
      );
      // Should have plain variant (text-white, no solid background)
      const inner = container.querySelector('div > div') as HTMLElement;
      expect(inner).toHaveClass('text-white');
      expect(inner).not.toHaveClass('bg-primary-500');
    });

    it('allows explicit color override inside Sheet', () => {
      const { container } = render(
        <Sheet color="primary">
          <ComponentName color="danger">Override</ComponentName>
        </Sheet>
      );
      const element = container.querySelector('[class*="danger"]');
      expect(element).toBeInTheDocument();
    });

    it('works without Sheet (uses defaults)', () => {
      const { container } = render(<ComponentName>No Sheet</ComponentName>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('bg-primary-500');
    });
  });
});
```

## Required Test Categories

### 1. Rendering
- Children render correctly
- Default variant classes applied
- Base classes applied

### 2. Variants
- `it.each` for all variants: solid, soft, outlined, plain
- Specific class tests for each variant

### 3. Colors
- `it.each` for all colors: primary, neutral, success, warning, danger
- Test with both solid and soft variants

### 4. Sizes
- `it.each` for all sizes: sm, md, lg
- Default size test

### 5. Ref Forwarding
- Ref forwards to correct element type

### 6. ClassName Merging
- Custom className merges with variant classes
- Custom className can override defaults

### 7. HTML Attributes
- data-* attributes pass through
- aria-* attributes pass through

### 8. Accessibility (vitest-axe)
- Default props have no violations
- All variants have no violations
- Disabled state has no violations (if applicable)

### 9. ColorContext Integration
- Inherits color from parent Sheet
- Variant inversion inside solid Sheet
- Explicit override inside Sheet
- Works without Sheet

## Component-Specific Tests

Add based on component features:

### States (disabled, loading, error)
```tsx
describe('disabled state', () => {
  it('applies disabled styles', () => {
    const { container } = render(<Component disabled>Content</Component>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('disabled:opacity-50');
  });

  // For ARIA components (Base UI)
  it('sets aria-disabled attribute', () => {
    render(<Component disabled>Content</Component>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  // For native elements
  it('is disabled', () => {
    render(<Component disabled>Content</Component>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Decorators
```tsx
describe('decorators', () => {
  it('renders startDecorator', () => {
    render(<Component startDecorator={<span data-testid="icon">Icon</span>}>Content</Component>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders endDecorator', () => {
    render(<Component endDecorator={<span data-testid="icon">Icon</span>}>Content</Component>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
```

### Polymorphic Render
```tsx
describe('polymorphic render prop', () => {
  it('renders default element type', () => {
    const { container } = render(<Component>Content</Component>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  it('renders custom element via render prop', () => {
    const { container } = render(<Component render={<a href="/test" />}>Content</Component>);
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '/test');
  });
});
```

### Form Controls (Input, Checkbox, etc.)
```tsx
describe('form control behavior', () => {
  it('supports controlled value', () => {
    const onChange = vi.fn();
    render(<Input value="test" onChange={onChange} aria-label="Test" />);
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });
});
```

### Async Components (Select, Dialog, etc.)
```tsx
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('opens on click', async () => {
  const user = userEvent.setup();
  render(<Select aria-label="Test"><Option value="a">A</Option></Select>);

  await user.click(screen.getByRole('combobox'));
  await waitFor(() => {
    expect(screen.getByText('A')).toBeVisible();
  });
});
```

## Testing Patterns

### ARIA vs Native Disabled
```tsx
// Base UI ARIA components use aria-disabled
expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true');

// Native elements use disabled attribute
expect(screen.getByRole('button')).toBeDisabled();
```

### Proper Labels for Accessibility
```tsx
// Toggle fields (Checkbox, Radio, Switch) - aria-label on Root
<Checkbox.Root aria-label="Accept terms">

// Form fields (Input, NumberField) - aria-label on Input or label element
<label>Username<Input /></label>
// or
<Input aria-label="Username" />
```

### Waiting for Async
```tsx
await waitFor(() => {
  expect(screen.getByText('Option')).toBeVisible();
});
```

## Reference Implementations

Read these test files for patterns:
- `libs/ui/styled/src/Button/Button.test.tsx` - Comprehensive button tests
- `libs/ui/styled/src/Checkbox/Checkbox.test.tsx` - Toggle component with ARIA
- `libs/ui/styled/src/Input/Input.test.tsx` - Form field tests
- `libs/ui/styled/src/Select/Select.test.tsx` - Async popup tests

## Checklist

- [ ] File at `ComponentName/ComponentName.test.tsx`
- [ ] `describe('rendering')` with children, default classes, base classes
- [ ] `describe('variants')` with it.each and specific tests
- [ ] `describe('colors')` with it.each for solid and soft
- [ ] `describe('sizes')` with it.each and default test
- [ ] `describe('ref forwarding')` with correct element type
- [ ] `describe('className merging')` with merge and override tests
- [ ] `describe('additional HTML attributes')` with data-* and aria-*
- [ ] `describe('accessibility')` with axe checks
- [ ] `describe('ColorContext integration')` with Sheet tests
- [ ] Component-specific tests (states, decorators, etc.)
- [ ] All tests pass: `yarn test ComponentName`
