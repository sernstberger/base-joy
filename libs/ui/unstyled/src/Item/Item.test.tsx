import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
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
  ItemContext,
} from './Item';

describe('Item', () => {
  it('renders without crashing', () => {
    render(<Item>Content</Item>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Item ref={ref}>Content</Item>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Item size="sm">Small</Item>);
    expect(screen.getByText('Small')).toHaveClass('py-1.5', 'px-2', 'text-sm');

    rerender(<Item size="md">Medium</Item>);
    expect(screen.getByText('Medium')).toHaveClass('py-2', 'px-3', 'text-base');

    rerender(<Item size="lg">Large</Item>);
    expect(screen.getByText('Large')).toHaveClass('py-3', 'px-4', 'text-lg');
  });

  it('applies interactive state correctly', () => {
    render(<Item interactive>Interactive</Item>);
    expect(screen.getByText('Interactive')).toHaveClass('cursor-pointer', 'hover:bg-neutral-100');
  });

  it('applies selected state correctly', () => {
    render(<Item selected>Selected</Item>);
    expect(screen.getByText('Selected')).toHaveClass('bg-primary-50');
  });

  it('applies disabled state correctly', () => {
    render(<Item disabled>Disabled</Item>);
    const item = screen.getByText('Disabled');
    expect(item).toHaveClass('opacity-50', 'cursor-not-allowed');
    expect(item).toHaveAttribute('aria-disabled', 'true');
  });

  it('applies custom className', () => {
    render(<Item className="custom-class">Custom</Item>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
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
});

describe('ItemStart', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemStart>Start</ItemStart>
      </Item>
    );
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <Item>
        <ItemStart ref={ref}>Start</ItemStart>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('inherits size from Item context', () => {
    const { rerender } = render(
      <Item size="sm">
        <ItemStart>Start</ItemStart>
      </Item>
    );
    expect(screen.getByText('Start')).toHaveClass('w-4', 'h-4');

    rerender(
      <Item size="md">
        <ItemStart>Start</ItemStart>
      </Item>
    );
    expect(screen.getByText('Start')).toHaveClass('w-5', 'h-5');

    rerender(
      <Item size="lg">
        <ItemStart>Start</ItemStart>
      </Item>
    );
    expect(screen.getByText('Start')).toHaveClass('w-6', 'h-6');
  });

  it('allows size override', () => {
    render(
      <Item size="sm">
        <ItemStart size="lg">Start</ItemStart>
      </Item>
    );
    expect(screen.getByText('Start')).toHaveClass('w-6', 'h-6');
  });
});

describe('ItemContent', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemContent>Content</ItemContent>
      </Item>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Item>
        <ItemContent ref={ref}>Content</ItemContent>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('truncates by default', () => {
    render(
      <Item>
        <ItemContent>Content</ItemContent>
      </Item>
    );
    expect(screen.getByText('Content')).toHaveClass('truncate');
  });

  it('can disable truncation', () => {
    render(
      <Item>
        <ItemContent truncate={false}>Content</ItemContent>
      </Item>
    );
    expect(screen.getByText('Content')).not.toHaveClass('truncate');
  });
});

describe('ItemEnd', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemEnd>End</ItemEnd>
      </Item>
    );
    expect(screen.getByText('End')).toBeInTheDocument();
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

  it('applies neutral color', () => {
    render(
      <Item>
        <ItemEnd>End</ItemEnd>
      </Item>
    );
    expect(screen.getByText('End')).toHaveClass('text-neutral-500');
  });
});

describe('ItemHeader', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemHeader>Header</ItemHeader>
      </Item>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Item>
        <ItemHeader ref={ref}>Header</ItemHeader>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies flex layout with justify-between', () => {
    render(
      <Item>
        <ItemHeader>Header</ItemHeader>
      </Item>
    );
    expect(screen.getByText('Header')).toHaveClass('flex', 'items-center', 'justify-between');
  });

  it('inherits size from Item context', () => {
    const { rerender } = render(
      <Item size="sm">
        <ItemHeader>Header</ItemHeader>
      </Item>
    );
    expect(screen.getByText('Header')).toHaveClass('mb-1');

    rerender(
      <Item size="md">
        <ItemHeader>Header</ItemHeader>
      </Item>
    );
    expect(screen.getByText('Header')).toHaveClass('mb-1.5');

    rerender(
      <Item size="lg">
        <ItemHeader>Header</ItemHeader>
      </Item>
    );
    expect(screen.getByText('Header')).toHaveClass('mb-2');
  });
});

describe('ItemTitle', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemTitle>Title</ItemTitle>
      </Item>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(
      <Item>
        <ItemTitle ref={ref}>Title</ItemTitle>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });

  it('renders as h3 element', () => {
    render(
      <Item>
        <ItemTitle>Title</ItemTitle>
      </Item>
    );
    expect(screen.getByText('Title').tagName).toBe('H3');
  });

  it('applies font-medium', () => {
    render(
      <Item>
        <ItemTitle>Title</ItemTitle>
      </Item>
    );
    expect(screen.getByText('Title')).toHaveClass('font-medium');
  });

  it('inherits size from Item context', () => {
    const { rerender } = render(
      <Item size="sm">
        <ItemTitle>Title</ItemTitle>
      </Item>
    );
    expect(screen.getByText('Title')).toHaveClass('text-sm');

    rerender(
      <Item size="md">
        <ItemTitle>Title</ItemTitle>
      </Item>
    );
    expect(screen.getByText('Title')).toHaveClass('text-base');

    rerender(
      <Item size="lg">
        <ItemTitle>Title</ItemTitle>
      </Item>
    );
    expect(screen.getByText('Title')).toHaveClass('text-lg');
  });
});

describe('ItemDescription', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description')).toBeInTheDocument();
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

  it('renders as p element', () => {
    render(
      <Item>
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description').tagName).toBe('P');
  });

  it('applies neutral color', () => {
    render(
      <Item>
        <ItemDescription>Description</ItemDescription>
      </Item>
    );
    expect(screen.getByText('Description')).toHaveClass('text-neutral-600');
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
});

describe('ItemActions', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemActions>Actions</ItemActions>
      </Item>
    );
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Item>
        <ItemActions ref={ref}>Actions</ItemActions>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies flex layout with gap', () => {
    render(
      <Item>
        <ItemActions>Actions</ItemActions>
      </Item>
    );
    expect(screen.getByText('Actions')).toHaveClass('flex', 'items-center');
  });

  it('inherits size from Item context', () => {
    const { rerender } = render(
      <Item size="sm">
        <ItemActions>Actions</ItemActions>
      </Item>
    );
    expect(screen.getByText('Actions')).toHaveClass('gap-1');

    rerender(
      <Item size="md">
        <ItemActions>Actions</ItemActions>
      </Item>
    );
    expect(screen.getByText('Actions')).toHaveClass('gap-2');

    rerender(
      <Item size="lg">
        <ItemActions>Actions</ItemActions>
      </Item>
    );
    expect(screen.getByText('Actions')).toHaveClass('gap-2');
  });
});

describe('ItemFooter', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemFooter>Footer</ItemFooter>
      </Item>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Item>
        <ItemFooter ref={ref}>Footer</ItemFooter>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies no border by default', () => {
    render(
      <Item>
        <ItemFooter>Footer</ItemFooter>
      </Item>
    );
    expect(screen.getByText('Footer')).not.toHaveClass('border-t');
  });

  it('applies border when bordered is true', () => {
    render(
      <Item>
        <ItemFooter bordered>Footer</ItemFooter>
      </Item>
    );
    expect(screen.getByText('Footer')).toHaveClass('border-t', 'border-neutral-200');
  });

  it('inherits size from Item context', () => {
    const { rerender } = render(
      <Item size="sm">
        <ItemFooter>Footer</ItemFooter>
      </Item>
    );
    expect(screen.getByText('Footer')).toHaveClass('mt-1', 'pt-1');

    rerender(
      <Item size="md">
        <ItemFooter>Footer</ItemFooter>
      </Item>
    );
    expect(screen.getByText('Footer')).toHaveClass('mt-1.5', 'pt-1.5');

    rerender(
      <Item size="lg">
        <ItemFooter>Footer</ItemFooter>
      </Item>
    );
    expect(screen.getByText('Footer')).toHaveClass('mt-2', 'pt-2');
  });
});

describe('ItemMedia', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemMedia>Media</ItemMedia>
      </Item>
    );
    expect(screen.getByText('Media')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Item>
        <ItemMedia ref={ref}>Media</ItemMedia>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies flex layout', () => {
    render(
      <Item>
        <ItemMedia>Media</ItemMedia>
      </Item>
    );
    expect(screen.getByText('Media')).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('inherits size from Item context', () => {
    const { rerender } = render(
      <Item size="sm">
        <ItemMedia>Media</ItemMedia>
      </Item>
    );
    expect(screen.getByText('Media')).toHaveClass('w-8', 'h-8');

    rerender(
      <Item size="md">
        <ItemMedia>Media</ItemMedia>
      </Item>
    );
    expect(screen.getByText('Media')).toHaveClass('w-10', 'h-10');

    rerender(
      <Item size="lg">
        <ItemMedia>Media</ItemMedia>
      </Item>
    );
    expect(screen.getByText('Media')).toHaveClass('w-12', 'h-12');
  });
});

describe('Item composition', () => {
  it('renders complex composition correctly', () => {
    render(
      <Item>
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

  it('has no accessibility violations with complex composition', async () => {
    const { container } = render(
      <Item>
        <ItemMedia>
          <span role="img" aria-label="User avatar">
            A
          </span>
        </ItemMedia>
        <ItemContent>
          <ItemHeader>
            <ItemTitle>John Doe</ItemTitle>
            <ItemActions>
              <button type="button">Follow</button>
            </ItemActions>
          </ItemHeader>
          <ItemDescription>Software Engineer at Acme Corp</ItemDescription>
        </ItemContent>
        <ItemFooter bordered>Joined Dec 2024</ItemFooter>
      </Item>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('ItemIcon', () => {
  it('renders without crashing', () => {
    render(
      <Item>
        <ItemIcon>Icon</ItemIcon>
      </Item>
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <Item>
        <ItemIcon ref={ref}>Icon</ItemIcon>
      </Item>
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies flex layout', () => {
    render(
      <Item>
        <ItemIcon>Icon</ItemIcon>
      </Item>
    );
    expect(screen.getByText('Icon')).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('inherits size from Item context', () => {
    const { rerender } = render(
      <Item size="sm">
        <ItemIcon>Icon</ItemIcon>
      </Item>
    );
    expect(screen.getByText('Icon')).toHaveClass('w-3.5', 'h-3.5');

    rerender(
      <Item size="md">
        <ItemIcon>Icon</ItemIcon>
      </Item>
    );
    expect(screen.getByText('Icon')).toHaveClass('w-4', 'h-4');

    rerender(
      <Item size="lg">
        <ItemIcon>Icon</ItemIcon>
      </Item>
    );
    expect(screen.getByText('Icon')).toHaveClass('w-5', 'h-5');
  });

  it('allows size override', () => {
    render(
      <Item size="sm">
        <ItemIcon size="lg">Icon</ItemIcon>
      </Item>
    );
    expect(screen.getByText('Icon')).toHaveClass('w-5', 'h-5');
  });

  it('hides when loading is true in context', () => {
    render(
      <ItemContext.Provider value={{ size: 'md', loading: true }}>
        <ItemIcon data-testid="icon">Icon</ItemIcon>
      </ItemContext.Provider>
    );
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('shows when loading is false in context', () => {
    render(
      <ItemContext.Provider value={{ size: 'md', loading: false }}>
        <ItemIcon data-testid="icon">Icon</ItemIcon>
      </ItemContext.Provider>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Item>
        <ItemIcon className="custom-icon">Icon</ItemIcon>
      </Item>
    );
    expect(screen.getByText('Icon')).toHaveClass('custom-icon');
  });
});
