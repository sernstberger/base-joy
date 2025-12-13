import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { List, ListItem, ListSubheader, ListSeparator, useListContext } from './index';
import { ItemContent } from '../Item';

describe('List', () => {
  describe('rendering', () => {
    it('renders as ul element', () => {
      render(<List data-testid="list">Content</List>);
      const list = screen.getByTestId('list');
      expect(list.tagName).toBe('UL');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLUListElement>();
      render(<List ref={ref}>Content</List>);
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it('applies custom className', () => {
      render(<List className="custom-class" data-testid="list">Content</List>);
      expect(screen.getByTestId('list')).toHaveClass('custom-class');
    });

    it('renders children', () => {
      render(
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  describe('spacing variants', () => {
    it('applies no spacing by default', () => {
      render(<List data-testid="list">Content</List>);
      expect(screen.getByTestId('list')).toHaveClass('gap-0');
    });

    it('applies sm spacing', () => {
      render(<List spacing="sm" data-testid="list">Content</List>);
      expect(screen.getByTestId('list')).toHaveClass('gap-1');
    });

    it('applies md spacing', () => {
      render(<List spacing="md" data-testid="list">Content</List>);
      expect(screen.getByTestId('list')).toHaveClass('gap-2');
    });

    it('applies lg spacing', () => {
      render(<List spacing="lg" data-testid="list">Content</List>);
      expect(screen.getByTestId('list')).toHaveClass('gap-3');
    });
  });

  describe('context', () => {
    it('provides variant to children via context', () => {
      const ContextConsumer = () => {
        const context = useListContext();
        return <div data-testid="context">{context?.variant}</div>;
      };

      render(
        <List variant="soft">
          <ContextConsumer />
        </List>
      );
      expect(screen.getByTestId('context')).toHaveTextContent('soft');
    });

    it('provides color to children via context', () => {
      const ContextConsumer = () => {
        const context = useListContext();
        return <div data-testid="context">{context?.color}</div>;
      };

      render(
        <List color="primary">
          <ContextConsumer />
        </List>
      );
      expect(screen.getByTestId('context')).toHaveTextContent('primary');
    });

    it('provides size to children via context', () => {
      const ContextConsumer = () => {
        const context = useListContext();
        return <div data-testid="context">{context?.size}</div>;
      };

      render(
        <List size="lg">
          <ContextConsumer />
        </List>
      );
      expect(screen.getByTestId('context')).toHaveTextContent('lg');
    });

    it('provides marker to children via context', () => {
      const ContextConsumer = () => {
        const context = useListContext();
        return <div data-testid="context">{context?.marker}</div>;
      };

      render(
        <List marker="disc">
          <ContextConsumer />
        </List>
      );
      expect(screen.getByTestId('context')).toHaveTextContent('disc');
    });
  });

  describe('marker variants', () => {
    it('applies list-none by default', () => {
      render(<List data-testid="list">Content</List>);
      expect(screen.getByTestId('list')).toHaveClass('list-none');
    });

    it('applies disc marker classes', () => {
      render(
        <List marker="disc" data-testid="list">
          Content
        </List>
      );
      const list = screen.getByTestId('list');
      expect(list).toHaveClass('list-disc', 'list-inside');
      expect(list).not.toHaveClass('list-none');
    });

    it('applies circle marker classes', () => {
      render(
        <List marker="circle" data-testid="list">
          Content
        </List>
      );
      const list = screen.getByTestId('list');
      expect(list).toHaveClass('list-inside');
      expect(list).not.toHaveClass('list-none');
    });

    it('renders as ol with decimal marker', () => {
      render(
        <List marker="decimal" data-testid="list">
          Content
        </List>
      );
      const list = screen.getByTestId('list');
      expect(list.tagName).toBe('OL');
      expect(list).toHaveClass('list-decimal', 'list-inside');
    });

    it('has no accessibility violations with decimal marker', async () => {
      const { container } = render(
        <List marker="decimal" aria-label="Ordered list">
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
        </List>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <List aria-label="Test list">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('ListItem', () => {
  describe('rendering', () => {
    it('renders li element wrapping Item', () => {
      render(
        <List>
          <ListItem>Content</ListItem>
        </List>
      );
      const list = screen.getByRole('list');
      const listItems = list.querySelectorAll('li');
      expect(listItems).toHaveLength(1);
    });

    it('forwards ref to li element', () => {
      const ref = React.createRef<HTMLLIElement>();
      render(<ListItem ref={ref}>Content</ListItem>);
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it('passes children to Item', () => {
      render(<ListItem>Test Content</ListItem>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('context inheritance', () => {
    it('inherits variant from List context', () => {
      render(
        <List variant="soft" color="primary">
          <ListItem data-testid="item">Content</ListItem>
        </List>
      );
      // Item should have soft primary styling
      const item = screen.getByText('Content');
      expect(item).toHaveClass('bg-primary-100');
    });

    it('inherits size from List context', () => {
      render(
        <List size="sm">
          <ListItem data-testid="item">Content</ListItem>
        </List>
      );
      const item = screen.getByText('Content');
      expect(item).toHaveClass('text-sm');
    });

    it('explicit props override context', () => {
      render(
        <List variant="soft" color="neutral">
          <ListItem variant="soft" color="primary" data-testid="item">
            Content
          </ListItem>
        </List>
      );
      const item = screen.getByText('Content');
      expect(item).toHaveClass('bg-primary-100');
    });
  });

  describe('render prop', () => {
    it('renders custom element using render prop', () => {
      render(<ListItem render={<a href="/test" />}>Link Item</ListItem>);
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveTextContent('Link Item');
    });

    it('merges className from render prop', () => {
      render(
        <ListItem render={<a href="/test" className="custom-link" />}>
          Link
        </ListItem>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-link');
    });
  });

  describe('states', () => {
    it('applies interactive state', () => {
      render(<ListItem interactive>Interactive</ListItem>);
      expect(screen.getByText('Interactive')).toHaveClass('cursor-pointer');
    });

    it('applies selected state', () => {
      render(
        <ListItem selected color="primary">
          Selected
        </ListItem>
      );
      expect(screen.getByText('Selected')).toHaveClass('bg-primary-50');
    });

    it('applies disabled state', () => {
      render(<ListItem disabled>Disabled</ListItem>);
      const item = screen.getByText('Disabled');
      expect(item).toHaveClass('opacity-50', 'cursor-not-allowed');
      expect(item).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('marker behavior', () => {
    it('renders with Item wrapper when no markers (no List context)', () => {
      render(<ListItem data-testid="item">Content</ListItem>);
      const li = screen.getByTestId('item').closest('li');
      expect(li).toHaveClass('list-none');
      // Item component should be rendered
      expect(screen.getByText('Content').closest('[class*="flex"]')).toBeInTheDocument();
    });

    it('renders with Item wrapper when marker="none"', () => {
      render(
        <List marker="none">
          <ListItem data-testid="item">Content</ListItem>
        </List>
      );
      const li = screen.getByTestId('item').closest('li');
      expect(li).toHaveClass('list-none');
    });

    it('renders children directly when marker="disc"', () => {
      render(
        <List marker="disc">
          <ListItem>Content</ListItem>
        </List>
      );
      // Children rendered directly in li, not wrapped in Item
      const li = screen.getByText('Content').closest('li');
      expect(li).not.toHaveClass('list-none');
      expect(li).toHaveClass('py-1');
    });

    it('renders children directly when marker="decimal"', () => {
      render(
        <List marker="decimal">
          <ListItem>Content</ListItem>
        </List>
      );
      const li = screen.getByText('Content').closest('li');
      expect(li).not.toHaveClass('list-none');
      expect(li).toHaveClass('py-1');
    });
  });

  describe('nested prop', () => {
    it('renders as simple li container when nested', () => {
      render(
        <List>
          <ListItem nested>
            <div data-testid="child">Child content</div>
          </ListItem>
        </List>
      );
      const child = screen.getByTestId('child');
      const li = child.closest('li');
      expect(li).not.toBeNull();
      expect(li).toHaveClass('list-none');
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('allows nested List inside', () => {
      render(
        <List>
          <ListItem nested>
            <List data-testid="nested-list">
              <ListItem>Nested item</ListItem>
            </List>
          </ListItem>
        </List>
      );
      const nestedList = screen.getByTestId('nested-list');
      expect(nestedList.tagName).toBe('UL');
      expect(screen.getByText('Nested item')).toBeInTheDocument();
    });

    it('ListSubheader renders as div when inside nested ListItem', () => {
      render(
        <List>
          <ListItem nested>
            <ListSubheader data-testid="subheader">Section</ListSubheader>
            <List>
              <ListItem>Item</ListItem>
            </List>
          </ListItem>
        </List>
      );
      const subheader = screen.getByTestId('subheader');
      expect(subheader.tagName).toBe('DIV');
    });

    it('applies custom className when nested', () => {
      render(
        <List>
          <ListItem nested className="custom-nested">
            <span data-testid="child">Content</span>
          </ListItem>
        </List>
      );
      const child = screen.getByTestId('child');
      const li = child.closest('li');
      expect(li).toHaveClass('custom-nested');
    });

    it('has no accessibility violations with nested structure', async () => {
      const { container } = render(
        <List aria-label="Main list">
          <ListItem nested>
            <ListSubheader>Category</ListSubheader>
            <List aria-label="Nested list">
              <ListItem>Nested item 1</ListItem>
              <ListItem>Nested item 2</ListItem>
            </List>
          </ListItem>
        </List>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <List aria-label="Test list">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('ListSubheader', () => {
  describe('rendering', () => {
    it('renders as li element', () => {
      render(<ListSubheader data-testid="subheader">Section</ListSubheader>);
      const subheader = screen.getByTestId('subheader');
      expect(subheader.tagName).toBe('LI');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLLIElement>();
      render(<ListSubheader ref={ref}>Section</ListSubheader>);
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it('applies custom className', () => {
      render(
        <ListSubheader className="custom-class" data-testid="subheader">
          Section
        </ListSubheader>
      );
      expect(screen.getByTestId('subheader')).toHaveClass('custom-class');
    });

    it('renders text content', () => {
      render(<ListSubheader>Section Header</ListSubheader>);
      expect(screen.getByText('Section Header')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('applies default styling', () => {
      render(<ListSubheader data-testid="subheader">Section</ListSubheader>);
      const subheader = screen.getByTestId('subheader');
      expect(subheader).toHaveClass('text-xs', 'font-semibold', 'uppercase');
    });

    it('applies sticky variant', () => {
      render(
        <ListSubheader sticky data-testid="subheader">
          Section
        </ListSubheader>
      );
      expect(screen.getByTestId('subheader')).toHaveClass('sticky', 'top-0');
    });

    it('always hides markers regardless of List marker prop', () => {
      render(
        <List marker="disc">
          <ListSubheader data-testid="subheader">Section</ListSubheader>
        </List>
      );
      expect(screen.getByTestId('subheader')).toHaveClass('list-none');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <List aria-label="Test list">
          <ListSubheader>Section</ListSubheader>
          <ListItem>Item 1</ListItem>
        </List>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('ListSeparator', () => {
  describe('rendering', () => {
    it('renders as li element', () => {
      render(
        <List>
          <ListSeparator data-testid="separator" />
        </List>
      );
      const separator = screen.getByTestId('separator');
      expect(separator.tagName).toBe('LI');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <List>
          <ListSeparator ref={ref} />
        </List>
      );
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it('renders hr element inside li', () => {
      render(
        <List>
          <ListSeparator data-testid="separator" />
        </List>
      );
      const separator = screen.getByTestId('separator');
      const hr = separator.querySelector('hr');
      expect(hr).toBeInTheDocument();
    });
  });

  describe('inset variants', () => {
    it('applies context inset by default (no margins)', () => {
      render(
        <List>
          <ListSeparator data-testid="separator" />
        </List>
      );
      const hr = screen.getByTestId('separator').querySelector('hr');
      expect(hr).not.toHaveClass('ml-2');
      expect(hr).not.toHaveClass('ml-3');
    });

    it('applies gutter inset for md size', () => {
      render(
        <List size="md">
          <ListSeparator inset="gutter" data-testid="separator" />
        </List>
      );
      const hr = screen.getByTestId('separator').querySelector('hr');
      expect(hr).toHaveClass('ml-3', 'mr-3');
    });

    it('applies startDecorator inset for md size', () => {
      render(
        <List size="md">
          <ListSeparator inset="startDecorator" data-testid="separator" />
        </List>
      );
      const hr = screen.getByTestId('separator').querySelector('hr');
      expect(hr).toHaveClass('ml-3');
    });

    it('applies startContent inset for md size', () => {
      render(
        <List size="md">
          <ListSeparator inset="startContent" data-testid="separator" />
        </List>
      );
      const hr = screen.getByTestId('separator').querySelector('hr');
      expect(hr).toHaveClass('ml-11');
    });

    it('applies custom string inset as style', () => {
      render(
        <List>
          <ListSeparator inset="20px" data-testid="separator" />
        </List>
      );
      const hr = screen.getByTestId('separator').querySelector('hr');
      expect(hr).toHaveStyle({ marginLeft: '20px' });
    });
  });

  describe('color', () => {
    it('inherits color from List context', () => {
      render(
        <List color="primary">
          <ListSeparator data-testid="separator" />
        </List>
      );
      const hr = screen.getByTestId('separator').querySelector('hr');
      expect(hr).toHaveClass('bg-primary-300');
    });

    it('explicit color overrides context', () => {
      render(
        <List color="neutral">
          <ListSeparator color="danger" data-testid="separator" />
        </List>
      );
      const hr = screen.getByTestId('separator').querySelector('hr');
      expect(hr).toHaveClass('bg-danger-300');
    });

    it('applies neutral color by default', () => {
      render(
        <List>
          <ListSeparator data-testid="separator" />
        </List>
      );
      const hr = screen.getByTestId('separator').querySelector('hr');
      expect(hr).toHaveClass('bg-neutral-300');
    });
  });

  describe('nested context', () => {
    it('renders as div when inside nested ListItem', () => {
      render(
        <List>
          <ListItem nested>
            <ListSeparator data-testid="separator" />
          </ListItem>
        </List>
      );
      const separator = screen.getByTestId('separator');
      expect(separator.tagName).toBe('DIV');
    });
  });

  describe('accessibility', () => {
    it('has hr marked as aria-hidden', () => {
      render(
        <List>
          <ListSeparator data-testid="separator" />
        </List>
      );
      const hr = screen.getByTestId('separator').querySelector('hr');
      expect(hr).toHaveAttribute('aria-hidden', 'true');
    });

    it('has no accessibility violations', async () => {
      const { container } = render(
        <List aria-label="Test list">
          <ListItem>Item 1</ListItem>
          <ListSeparator />
          <ListItem>Item 2</ListItem>
        </List>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with different insets', async () => {
      const { container } = render(
        <List aria-label="Test list" size="md">
          <ListItem>Item 1</ListItem>
          <ListSeparator inset="gutter" />
          <ListItem>Item 2</ListItem>
          <ListSeparator inset="startContent" />
          <ListItem>Item 3</ListItem>
        </List>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
