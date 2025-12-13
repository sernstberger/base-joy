import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { List, ListItem, ListSubheader, useListContext } from './index';
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
