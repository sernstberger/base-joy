import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import {
  Item,
  ItemStart,
  ItemContent,
  ItemEnd,
  ItemHeader,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemFooter,
  ItemMedia,
  ItemIcon,
} from './index';

describe('Item (Styled)', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Item>Content</Item>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Item ref={ref}>Content</Item>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders as different element using render prop', () => {
      render(<Item render={<button type="button" />}>Button</Item>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Button');
    });

    it('merges className from render prop', () => {
      render(<Item render={<a href="/test" className="custom-link" />}>Link</Item>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-link');
      expect(link).toHaveClass('flex', 'items-center');
    });
  });

  describe('variants', () => {
    it('applies soft variant by default', () => {
      render(<Item>Soft</Item>);
      expect(screen.getByText('Soft')).toHaveClass('bg-neutral-100');
    });

    it('applies solid variant', () => {
      render(<Item variant="solid" color="primary">Solid</Item>);
      expect(screen.getByText('Solid')).toHaveClass('bg-primary-500', 'text-white');
    });

    it('applies soft variant', () => {
      render(<Item variant="soft" color="primary">Soft</Item>);
      expect(screen.getByText('Soft')).toHaveClass('bg-primary-100', 'text-primary-900');
    });

    it('applies outlined variant', () => {
      render(<Item variant="outlined" color="primary">Outlined</Item>);
      expect(screen.getByText('Outlined')).toHaveClass('border', 'border-primary-500');
    });

    it('applies plain variant', () => {
      render(<Item variant="plain" color="primary">Plain</Item>);
      expect(screen.getByText('Plain')).toHaveClass('text-primary-700', 'bg-transparent');
    });
  });

  describe('colors', () => {
    it('applies neutral color by default', () => {
      render(<Item>Neutral</Item>);
      expect(screen.getByText('Neutral')).toHaveClass('bg-neutral-100');
    });

    it('applies primary color', () => {
      render(<Item color="primary">Primary</Item>);
      expect(screen.getByText('Primary')).toHaveClass('bg-primary-100');
    });

    it('applies success color', () => {
      render(<Item color="success">Success</Item>);
      expect(screen.getByText('Success')).toHaveClass('bg-success-100');
    });

    it('applies warning color', () => {
      render(<Item color="warning">Warning</Item>);
      expect(screen.getByText('Warning')).toHaveClass('bg-warning-100');
    });

    it('applies danger color', () => {
      render(<Item color="danger">Danger</Item>);
      expect(screen.getByText('Danger')).toHaveClass('bg-danger-100');
    });
  });

  describe('sizes', () => {
    it('applies size variants correctly', () => {
      const { rerender } = render(<Item size="sm">Small</Item>);
      expect(screen.getByText('Small')).toHaveClass('py-1.5', 'px-2', 'text-sm');

      rerender(<Item size="md">Medium</Item>);
      expect(screen.getByText('Medium')).toHaveClass('py-2', 'px-3', 'text-base');

      rerender(<Item size="lg">Large</Item>);
      expect(screen.getByText('Large')).toHaveClass('py-3', 'px-4', 'text-lg');
    });
  });

  describe('interactive state', () => {
    it('applies interactive classes', () => {
      render(<Item interactive>Interactive</Item>);
      expect(screen.getByText('Interactive')).toHaveClass('cursor-pointer', 'transition-colors');
    });

    it('applies color-aware hover for soft variant', () => {
      render(<Item interactive color="primary">Primary</Item>);
      expect(screen.getByText('Primary')).toHaveClass('hover:bg-primary-200', 'active:bg-primary-300');
    });

    it('applies color-aware hover for outlined variant', () => {
      render(<Item interactive variant="outlined" color="success">Success</Item>);
      expect(screen.getByText('Success')).toHaveClass('hover:bg-success-50', 'active:bg-success-100');
    });

    it('applies color-aware hover for solid variant', () => {
      render(<Item interactive variant="solid" color="danger">Danger</Item>);
      expect(screen.getByText('Danger')).toHaveClass('hover:bg-danger-600', 'active:bg-danger-700');
    });
  });

  describe('selected state', () => {
    it('applies selected background for soft variant', () => {
      render(<Item selected color="primary">Selected</Item>);
      expect(screen.getByText('Selected')).toHaveClass('bg-primary-200');
    });

    it('applies selected background for outlined variant', () => {
      render(<Item selected variant="outlined" color="success">Selected</Item>);
      expect(screen.getByText('Selected')).toHaveClass('bg-success-50');
    });

    it('applies selected + interactive compound hover', () => {
      render(<Item selected interactive color="primary">Selected</Item>);
      expect(screen.getByText('Selected')).toHaveClass('hover:bg-primary-300', 'active:bg-primary-400');
    });
  });

  describe('disabled state', () => {
    it('applies disabled classes', () => {
      render(<Item disabled>Disabled</Item>);
      const item = screen.getByText('Disabled');
      expect(item).toHaveClass('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
    });

    it('sets aria-disabled', () => {
      render(<Item disabled>Disabled</Item>);
      expect(screen.getByText('Disabled')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('className merging', () => {
    it('applies custom className', () => {
      render(<Item className="custom-class">Custom</Item>);
      expect(screen.getByText('Custom')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Item>
          <ItemStart>Icon</ItemStart>
          <ItemContent>Content</ItemContent>
          <ItemEnd>End</ItemEnd>
        </Item>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with complex composition', async () => {
      const { container } = render(
        <Item variant="outlined" color="primary">
          <ItemMedia>
            <span role="img" aria-label="User avatar">A</span>
          </ItemMedia>
          <ItemContent>
            <ItemHeader>
              <ItemTitle>John Doe</ItemTitle>
              <ItemActions>
                <button type="button">Follow</button>
              </ItemActions>
            </ItemHeader>
            <ItemDescription>Software Engineer</ItemDescription>
          </ItemContent>
          <ItemFooter bordered>Joined Dec 2024</ItemFooter>
        </Item>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('ItemDescription (Styled)', () => {
  it('inherits color from StyledItemContext', () => {
    render(
      <Item color="primary">
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description')).toHaveClass('text-primary-700');
  });

  it('applies color-aware text for neutral', () => {
    render(
      <Item color="neutral">
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description')).toHaveClass('text-neutral-600');
  });

  it('applies color-aware text for success', () => {
    render(
      <Item color="success">
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description')).toHaveClass('text-success-700');
  });

  it('applies opacity for solid variant', () => {
    render(
      <Item variant="solid" color="primary">
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description')).toHaveClass('text-inherit', 'opacity-80');
  });

  it('inherits size from Item context', () => {
    const { rerender } = render(
      <Item size="sm">
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description')).toHaveClass('text-xs');

    rerender(
      <Item size="md">
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description')).toHaveClass('text-sm');

    rerender(
      <Item size="lg">
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description')).toHaveClass('text-base');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(
      <Item>
        <ItemDescription ref={ref}>Description</ItemDescription>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

describe('ItemEnd (Styled)', () => {
  it('inherits color from StyledItemContext', () => {
    render(
      <Item color="primary">
        <ItemEnd>End</ItemEnd>
      </Item>
    );
    expect(screen.getByText('End')).toHaveClass('text-primary-600');
  });

  it('applies color-aware text for neutral', () => {
    render(
      <Item color="neutral">
        <ItemEnd>End</ItemEnd>
      </Item>
    );
    expect(screen.getByText('End')).toHaveClass('text-neutral-500');
  });

  it('applies color-aware text for success', () => {
    render(
      <Item color="success">
        <ItemEnd>End</ItemEnd>
      </Item>
    );
    expect(screen.getByText('End')).toHaveClass('text-success-600');
  });

  it('applies opacity for solid variant', () => {
    render(
      <Item variant="solid" color="primary">
        <ItemEnd>End</ItemEnd>
      </Item>
    );
    expect(screen.getByText('End')).toHaveClass('text-inherit', 'opacity-70');
  });

  it('inherits size from Item context', () => {
    const { rerender } = render(
      <Item size="sm">
        <ItemEnd>End</ItemEnd>
      </Item>
    );
    expect(screen.getByText('End')).toHaveClass('text-xs');

    rerender(
      <Item size="md">
        <ItemEnd>End</ItemEnd>
      </Item>
    );
    expect(screen.getByText('End')).toHaveClass('text-sm');

    rerender(
      <Item size="lg">
        <ItemEnd>End</ItemEnd>
      </Item>
    );
    expect(screen.getByText('End')).toHaveClass('text-base');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <Item>
        <ItemEnd ref={ref}>End</ItemEnd>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe('Item composition', () => {
  it('renders complex composition correctly', () => {
    render(
      <Item variant="outlined" color="primary">
        <ItemMedia>Avatar</ItemMedia>
        <ItemContent>
          <ItemHeader>
            <ItemTitle>John Doe</ItemTitle>
            <ItemActions>Follow</ItemActions>
          </ItemHeader>
          <ItemDescription>Software Engineer</ItemDescription>
        </ItemContent>
        <ItemFooter bordered>Joined Dec 2024</ItemFooter>
      </Item>
    );

    expect(screen.getByText('Avatar')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Follow')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Joined Dec 2024')).toBeInTheDocument();
  });

  it('re-exported base subcomponents work correctly', () => {
    render(
      <Item>
        <ItemStart>Start</ItemStart>
        <ItemContent>Content</ItemContent>
        <ItemIcon>Icon</ItemIcon>
      </Item>
    );

    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
