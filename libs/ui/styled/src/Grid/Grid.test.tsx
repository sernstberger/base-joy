import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Grid, GridItem } from './Grid';

describe('Grid', () => {
  describe('rendering', () => {
    it('renders a basic grid', () => {
      render(
        <Grid data-testid="grid">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
        </Grid>
      );
      expect(screen.getByTestId('grid')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('applies base grid class', () => {
      const { container } = render(
        <Grid>
          <GridItem>Content</GridItem>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid');
    });
  });

  describe('columns', () => {
    it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const)(
      'renders %s columns',
      (columns) => {
        const { container } = render(
          <Grid columns={columns}>
            <GridItem>Content</GridItem>
          </Grid>
        );
        const grid = container.firstChild as HTMLElement;
        expect(grid).toHaveClass(`grid-cols-${columns}`);
      }
    );

    it('renders auto columns', () => {
      const { container } = render(
        <Grid columns="auto">
          <GridItem>Content</GridItem>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-none');
    });

    it('applies default 1 column', () => {
      const { container } = render(
        <Grid>
          <GridItem>Content</GridItem>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-1');
    });
  });

  describe('gap', () => {
    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const)(
      'renders gap-%s',
      (gap) => {
        const { container } = render(
          <Grid gap={gap}>
            <GridItem>Content</GridItem>
          </Grid>
        );
        const grid = container.firstChild as HTMLElement;
        expect(grid).toHaveClass(`gap-${gap}`);
      }
    );

    it('applies default gap-0', () => {
      const { container } = render(
        <Grid>
          <GridItem>Content</GridItem>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('gap-0');
    });
  });

  describe('GridItem', () => {
    describe('span', () => {
      it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const)(
        'renders col-span-%s',
        (span) => {
          render(
            <Grid>
              <GridItem span={span} data-testid="item">
                Content
              </GridItem>
            </Grid>
          );
          const item = screen.getByTestId('item');
          expect(item).toHaveClass(`col-span-${span}`);
        }
      );

      it('renders col-span-full', () => {
        render(
          <Grid>
            <GridItem span="full" data-testid="item">
              Content
            </GridItem>
          </Grid>
        );
        const item = screen.getByTestId('item');
        expect(item).toHaveClass('col-span-full');
      });

      it('applies default col-span-1', () => {
        render(
          <Grid>
            <GridItem data-testid="item">Content</GridItem>
          </Grid>
        );
        const item = screen.getByTestId('item');
        expect(item).toHaveClass('col-span-1');
      });
    });

    it('can be used via Grid.Item', () => {
      render(
        <Grid>
          <Grid.Item data-testid="item">Content</Grid.Item>
        </Grid>
      );
      expect(screen.getByTestId('item')).toBeInTheDocument();
    });
  });

  describe('polymorphic as prop', () => {
    it('renders Grid as different element', () => {
      const { container } = render(
        <Grid as="section">
          <GridItem>Content</GridItem>
        </Grid>
      );
      expect(container.firstChild?.nodeName).toBe('SECTION');
    });

    it('renders GridItem as different element', () => {
      render(
        <Grid>
          <GridItem as="article" data-testid="item">
            Content
          </GridItem>
        </Grid>
      );
      const item = screen.getByTestId('item');
      expect(item.nodeName).toBe('ARTICLE');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to Grid element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Grid ref={ref}>
          <GridItem>Content</GridItem>
        </Grid>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to GridItem element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Grid>
          <GridItem ref={ref}>Content</GridItem>
        </Grid>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className on Grid', () => {
      const { container } = render(
        <Grid className="custom-grid">
          <GridItem>Content</GridItem>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('custom-grid');
      expect(grid).toHaveClass('grid');
    });

    it('merges custom className on GridItem', () => {
      render(
        <Grid>
          <GridItem className="custom-item" data-testid="item">
            Content
          </GridItem>
        </Grid>
      );
      const item = screen.getByTestId('item');
      expect(item).toHaveClass('custom-item');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes to Grid', () => {
      render(
        <Grid data-testid="test-grid" id="my-grid">
          <GridItem>Content</GridItem>
        </Grid>
      );
      const grid = screen.getByTestId('test-grid');
      expect(grid).toHaveAttribute('id', 'my-grid');
    });

    it('passes through HTML attributes to GridItem', () => {
      render(
        <Grid>
          <GridItem data-testid="test-item" id="my-item">
            Content
          </GridItem>
        </Grid>
      );
      const item = screen.getByTestId('test-item');
      expect(item).toHaveAttribute('id', 'my-item');
    });

    it('passes through aria attributes', () => {
      render(
        <Grid aria-label="Grid layout" aria-describedby="grid-description">
          <GridItem>Content</GridItem>
        </Grid>
      );
      const grid = screen.getByLabelText('Grid layout');
      expect(grid).toHaveAttribute('aria-describedby', 'grid-description');
    });
  });

  describe('examples', () => {
    it('renders 3-column grid with gap', () => {
      const { container } = render(
        <Grid columns={3} gap={4}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem span={2}>Wide item</GridItem>
        </Grid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid).toHaveClass('grid-cols-3');
      expect(grid).toHaveClass('gap-4');
    });

    it('renders responsive layout example', () => {
      render(
        <Grid columns={4} gap={6}>
          <GridItem data-testid="item1">Item 1</GridItem>
          <GridItem data-testid="item2">Item 2</GridItem>
          <GridItem span={2} data-testid="item3">
            Spanning 2 columns
          </GridItem>
          <GridItem span="full" data-testid="item4">
            Full width
          </GridItem>
        </Grid>
      );
      expect(screen.getByTestId('item1')).toHaveClass('col-span-1');
      expect(screen.getByTestId('item2')).toHaveClass('col-span-1');
      expect(screen.getByTestId('item3')).toHaveClass('col-span-2');
      expect(screen.getByTestId('item4')).toHaveClass('col-span-full');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with basic grid', async () => {
      const { container } = render(
        <Grid columns={3} gap={4}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
        </Grid>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with spanning items', async () => {
      const { container } = render(
        <Grid columns={4} gap={2}>
          <GridItem>Item 1</GridItem>
          <GridItem span={2}>Spanning item</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem span="full">Full width item</GridItem>
        </Grid>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with polymorphic elements', async () => {
      const { container } = render(
        <Grid as="section" columns={2} gap={4}>
          <GridItem as="article">Article 1</GridItem>
          <GridItem as="article">Article 2</GridItem>
        </Grid>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
