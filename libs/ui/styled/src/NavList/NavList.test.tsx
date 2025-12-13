import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { axe } from 'vitest-axe';
import {
  NavList,
  NavListItem,
  NavListGroup,
  NavListGroupTrigger,
  NavListGroupContent,
  useNavListContext,
} from './index';

// Helper to wrap components with MemoryRouter
const renderWithRouter = (
  ui: React.ReactElement,
  { initialEntries = ['/'] } = {}
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('NavList', () => {
  describe('rendering', () => {
    it('renders as ul element', () => {
      renderWithRouter(<NavList data-testid="navlist">Content</NavList>);
      const list = screen.getByTestId('navlist');
      expect(list.tagName).toBe('UL');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLUListElement>();
      renderWithRouter(<NavList ref={ref}>Content</NavList>);
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it('applies custom className', () => {
      renderWithRouter(
        <NavList className="custom-class" data-testid="navlist">
          Content
        </NavList>
      );
      expect(screen.getByTestId('navlist')).toHaveClass('custom-class');
    });

    it('renders children', () => {
      renderWithRouter(
        <NavList>
          <NavListItem to="/home">Home</NavListItem>
          <NavListItem to="/about">About</NavListItem>
        </NavList>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });

  describe('context', () => {
    it('provides size to children via context', () => {
      const ContextConsumer = () => {
        const context = useNavListContext();
        return <div data-testid="context">{context.size}</div>;
      };

      renderWithRouter(
        <NavList size="lg">
          <ContextConsumer />
        </NavList>
      );
      expect(screen.getByTestId('context')).toHaveTextContent('lg');
    });
  });
});

describe('NavListItem', () => {
  describe('rendering', () => {
    it('renders as link', () => {
      renderWithRouter(<NavListItem to="/test">Test Link</NavListItem>);
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
    });

    it('renders children as content', () => {
      renderWithRouter(<NavListItem to="/test">Navigation Item</NavListItem>);
      expect(screen.getByText('Navigation Item')).toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      renderWithRouter(
        <NavListItem to="/test" icon={<span data-testid="icon">📁</span>}>
          With Icon
        </NavListItem>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders badge when provided', () => {
      renderWithRouter(
        <NavListItem to="/test" badge={<span data-testid="badge">New</span>}>
          With Badge
        </NavListItem>
      );
      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });
  });

  describe('active state', () => {
    it('applies selected state when route matches', () => {
      renderWithRouter(
        <NavList>
          <NavListItem to="/active">Active Item</NavListItem>
          <NavListItem to="/other">Other Item</NavListItem>
        </NavList>,
        { initialEntries: ['/active'] }
      );

      const activeItem = screen.getByRole('link', { name: 'Active Item' });
      // Selected state applies primary color
      expect(activeItem).toHaveClass('bg-primary-50');
    });

    it('does not apply selected state when route does not match', () => {
      renderWithRouter(
        <NavList>
          <NavListItem to="/active">Active Item</NavListItem>
          <NavListItem to="/other">Other Item</NavListItem>
        </NavList>,
        { initialEntries: ['/other'] }
      );

      const inactiveItem = screen.getByRole('link', { name: 'Active Item' });
      // Should not have selected primary styling
      expect(inactiveItem).not.toHaveClass('bg-primary-50');
    });
  });

  describe('disabled state', () => {
    it('does not render as link when disabled', () => {
      renderWithRouter(
        <NavListItem to="/test" disabled>
          Disabled Item
        </NavListItem>
      );
      // Should not have href when disabled
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('applies disabled styling', () => {
      renderWithRouter(
        <NavListItem to="/test" disabled>
          Disabled Item
        </NavListItem>
      );
      const item = screen.getByText('Disabled Item');
      expect(item).toHaveClass('opacity-50');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = renderWithRouter(
        <nav aria-label="Main navigation">
          <NavList>
            <NavListItem to="/home">Home</NavListItem>
            <NavListItem to="/about">About</NavListItem>
          </NavList>
        </nav>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('NavListGroup', () => {
  describe('rendering', () => {
    it('renders trigger and content', () => {
      renderWithRouter(
        <NavList>
          <NavListGroup>
            <NavListGroupTrigger>Section</NavListGroupTrigger>
            <NavListGroupContent>
              <NavListItem to="/item">Item</NavListItem>
            </NavListGroupContent>
          </NavListGroup>
        </NavList>
      );
      expect(screen.getByText('Section')).toBeInTheDocument();
    });

    it('content is collapsed by default', () => {
      renderWithRouter(
        <NavList>
          <NavListGroup>
            <NavListGroupTrigger>Section</NavListGroupTrigger>
            <NavListGroupContent>
              <NavListItem to="/item">Hidden Item</NavListItem>
            </NavListGroupContent>
          </NavListGroup>
        </NavList>
      );
      expect(screen.queryByText('Hidden Item')).not.toBeVisible();
    });

    it('content is expanded when defaultOpen is true', () => {
      renderWithRouter(
        <NavList>
          <NavListGroup defaultOpen>
            <NavListGroupTrigger>Section</NavListGroupTrigger>
            <NavListGroupContent>
              <NavListItem to="/item">Visible Item</NavListItem>
            </NavListGroupContent>
          </NavListGroup>
        </NavList>
      );
      expect(screen.getByText('Visible Item')).toBeVisible();
    });
  });

  describe('expand/collapse', () => {
    it('expands when trigger is clicked', async () => {
      const user = userEvent.setup();
      renderWithRouter(
        <NavList>
          <NavListGroup>
            <NavListGroupTrigger>Section</NavListGroupTrigger>
            <NavListGroupContent>
              <NavListItem to="/item">Item</NavListItem>
            </NavListGroupContent>
          </NavListGroup>
        </NavList>
      );

      // Initially collapsed
      expect(screen.queryByText('Item')).not.toBeVisible();

      // Click to expand
      await user.click(screen.getByRole('button', { name: /section/i }));

      // Should be visible
      await waitFor(() => {
        expect(screen.getByText('Item')).toBeVisible();
      });
    });

    it('collapses when trigger is clicked again', async () => {
      const user = userEvent.setup();
      renderWithRouter(
        <NavList>
          <NavListGroup defaultOpen>
            <NavListGroupTrigger>Section</NavListGroupTrigger>
            <NavListGroupContent>
              <NavListItem to="/item">Item</NavListItem>
            </NavListGroupContent>
          </NavListGroup>
        </NavList>
      );

      // Initially expanded
      expect(screen.getByText('Item')).toBeVisible();

      // Click to collapse
      await user.click(screen.getByRole('button', { name: /section/i }));

      // Should be hidden
      await waitFor(() => {
        expect(screen.queryByText('Item')).not.toBeVisible();
      });
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = renderWithRouter(
        <nav aria-label="Main navigation">
          <NavList>
            <NavListGroup defaultOpen>
              <NavListGroupTrigger>Section</NavListGroupTrigger>
              <NavListGroupContent>
                <NavListItem to="/item1">Item 1</NavListItem>
                <NavListItem to="/item2">Item 2</NavListItem>
              </NavListGroupContent>
            </NavListGroup>
          </NavList>
        </nav>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('NavListGroupTrigger', () => {
  describe('rendering', () => {
    it('renders as button', () => {
      renderWithRouter(
        <NavList>
          <NavListGroup>
            <NavListGroupTrigger>Trigger</NavListGroupTrigger>
            <NavListGroupContent>
              <NavListItem to="/item">Item</NavListItem>
            </NavListGroupContent>
          </NavListGroup>
        </NavList>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      renderWithRouter(
        <NavList>
          <NavListGroup>
            <NavListGroupTrigger icon={<span data-testid="icon">📁</span>}>
              With Icon
            </NavListGroupTrigger>
            <NavListGroupContent>
              <NavListItem to="/item">Item</NavListItem>
            </NavListGroupContent>
          </NavListGroup>
        </NavList>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithRouter(
        <NavList>
          <NavListGroup>
            <NavListGroupTrigger className="custom-trigger">
              Trigger
            </NavListGroupTrigger>
            <NavListGroupContent>
              <NavListItem to="/item">Item</NavListItem>
            </NavListGroupContent>
          </NavListGroup>
        </NavList>
      );
      expect(screen.getByRole('button')).toHaveClass('custom-trigger');
    });
  });
});
