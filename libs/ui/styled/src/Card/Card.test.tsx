import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
} from './Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders a basic card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies base classes from Sheet', () => {
      const { container } = render(
        <Card>
          <CardContent>Content</CardContent>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('overflow-hidden');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      (variant) => {
        const { container } = render(
          <Card variant={variant}>
            <CardContent>Content</CardContent>
          </Card>
        );
        expect(container.firstChild).toBeInTheDocument();
      }
    );

    it('applies outlined variant by default', () => {
      const { container } = render(
        <Card>
          <CardContent>Content</CardContent>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border');
    });
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      (color) => {
        const { container } = render(
          <Card color={color}>
            <CardContent>Content</CardContent>
          </Card>
        );
        expect(container.firstChild).toBeInTheDocument();
      }
    );

    it('applies neutral color by default', () => {
      const { container } = render(
        <Card>
          <CardContent>Content</CardContent>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border-neutral-300');
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'p-3'],
      ['md', 'p-4'],
      ['lg', 'p-6'],
    ] as const)('renders %s size with correct padding', (size, expectedPadding) => {
      render(
        <Card size={size}>
          <CardHeader data-testid="header">Header</CardHeader>
          <CardContent data-testid="content">Content</CardContent>
          <CardFooter data-testid="footer">Footer</CardFooter>
        </Card>
      );
      const header = screen.getByTestId('header');
      const content = screen.getByTestId('content');
      const footer = screen.getByTestId('footer');
      expect(header).toHaveClass(expectedPadding);
      expect(footer).toHaveClass(expectedPadding);
    });

    it('applies default md size', () => {
      render(
        <Card>
          <CardHeader data-testid="header">Header</CardHeader>
        </Card>
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('p-4');
    });
  });

  describe('context inheritance', () => {
    it('children inherit size from Card context', () => {
      render(
        <Card size="lg">
          <CardHeader data-testid="header">Header</CardHeader>
          <CardContent data-testid="content">Content</CardContent>
          <CardFooter data-testid="footer">Footer</CardFooter>
        </Card>
      );
      const header = screen.getByTestId('header');
      const content = screen.getByTestId('content');
      const footer = screen.getByTestId('footer');
      expect(header).toHaveClass('p-6');
      expect(content).toHaveClass('px-6', 'pb-6');
      expect(footer).toHaveClass('p-6');
    });

    it('CardMedia inherits size from Card context', () => {
      render(
        <Card size="lg">
          <CardMedia src="image.jpg" alt="Test" data-testid="media" />
        </Card>
      );
      const media = screen.getByTestId('media');
      expect(media).toHaveClass('max-h-64');
    });
  });

  describe('CardHeader', () => {
    it('renders header section', () => {
      render(
        <Card>
          <CardHeader data-testid="header">Header Content</CardHeader>
        </Card>
      );
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Header Content');
    });

    it('applies header padding', () => {
      render(
        <Card>
          <CardHeader data-testid="header">Header</CardHeader>
        </Card>
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('p-4');
    });
  });

  describe('CardTitle', () => {
    it('renders as h3 heading', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveTextContent('Test Title');
    });

    it('applies heading styles', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle data-testid="title">Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByTestId('title');
      expect(title).toHaveClass('font-bold');
      expect(title).toHaveClass('text-2xl');
    });
  });

  describe('CardDescription', () => {
    it('renders description text', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
        </Card>
      );
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('applies text styles', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription data-testid="description">Description</CardDescription>
          </CardHeader>
        </Card>
      );
      const description = screen.getByTestId('description');
      expect(description).toHaveClass('text-sm');
      expect(description).toHaveClass('mt-1');
    });
  });

  describe('CardContent', () => {
    it('renders content section', () => {
      render(
        <Card>
          <CardContent data-testid="content">Main Content</CardContent>
        </Card>
      );
      const content = screen.getByTestId('content');
      expect(content).toHaveTextContent('Main Content');
    });

    it('applies content padding', () => {
      render(
        <Card>
          <CardContent data-testid="content">Content</CardContent>
        </Card>
      );
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('px-4', 'pb-4');
    });
  });

  describe('CardFooter', () => {
    it('renders footer section', () => {
      render(
        <Card>
          <CardFooter data-testid="footer">Footer Content</CardFooter>
        </Card>
      );
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveTextContent('Footer Content');
    });

    it('applies footer padding and border', () => {
      render(
        <Card>
          <CardFooter data-testid="footer">Footer</CardFooter>
        </Card>
      );
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('p-4');
      expect(footer).toHaveClass('border-t');
      expect(footer).toHaveClass('border-neutral-200');
    });
  });

  describe('CardMedia', () => {
    it('renders image media', () => {
      render(
        <Card>
          <CardMedia src="test.jpg" alt="Test Image" />
        </Card>
      );
      const media = screen.getByRole('img');
      expect(media).toHaveAttribute('src', 'test.jpg');
      expect(media).toHaveAttribute('alt', 'Test Image');
    });

    it('applies media styles', () => {
      render(
        <Card>
          <CardMedia src="test.jpg" alt="Test" data-testid="media" />
        </Card>
      );
      const media = screen.getByTestId('media');
      expect(media).toHaveClass('w-full');
      expect(media).toHaveClass('object-cover');
      expect(media).toHaveClass('max-h-48');
    });

    it('renders as video when as="video"', () => {
      render(
        <Card>
          <CardMedia as="video" src="test.mp4" data-testid="media" />
        </Card>
      );
      const media = screen.getByTestId('media');
      expect(media.tagName).toBe('VIDEO');
    });
  });

  describe('composite usage', () => {
    it('renders complete card with all components', () => {
      render(
        <Card variant="outlined">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Body content here</CardContent>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Card Title');
      expect(screen.getByText('Card Description')).toBeInTheDocument();
      expect(screen.getByText('Body content here')).toBeInTheDocument();
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('renders card with media', () => {
      render(
        <Card>
          <CardMedia src="image.jpg" alt="Cover" />
          <CardHeader>
            <CardTitle>With Image</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      expect(screen.getByRole('img')).toHaveAttribute('src', 'image.jpg');
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('With Image');
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to Card element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card ref={ref}>
          <CardContent>Content</CardContent>
        </Card>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to CardHeader element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card>
          <CardHeader ref={ref}>Header</CardHeader>
        </Card>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to CardTitle element', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(
        <Card>
          <CardHeader>
            <CardTitle ref={ref}>Title</CardTitle>
          </CardHeader>
        </Card>
      );
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it('forwards ref to CardDescription element', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(
        <Card>
          <CardHeader>
            <CardDescription ref={ref}>Description</CardDescription>
          </CardHeader>
        </Card>
      );
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('forwards ref to CardContent element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card>
          <CardContent ref={ref}>Content</CardContent>
        </Card>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to CardFooter element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card>
          <CardFooter ref={ref}>Footer</CardFooter>
        </Card>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to CardMedia element', () => {
      const ref = React.createRef<HTMLImageElement>();
      render(
        <Card>
          <CardMedia ref={ref} src="test.jpg" alt="Test" />
        </Card>
      );
      expect(ref.current).toBeInstanceOf(HTMLImageElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className on Card', () => {
      const { container } = render(
        <Card className="custom-card">
          <CardContent>Content</CardContent>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-card');
      expect(card).toHaveClass('rounded-lg');
    });

    it('merges custom className on CardHeader', () => {
      render(
        <Card>
          <CardHeader className="custom-header" data-testid="header">
            Header
          </CardHeader>
        </Card>
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('custom-header');
      expect(header).toHaveClass('p-4');
    });

    it('merges custom className on CardContent', () => {
      render(
        <Card>
          <CardContent className="custom-content" data-testid="content">
            Content
          </CardContent>
        </Card>
      );
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('custom-content');
      expect(content).toHaveClass('px-4');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Card data-testid="test-card" id="my-card">
          <CardContent>Content</CardContent>
        </Card>
      );
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('id', 'my-card');
    });

    it('passes through aria attributes', () => {
      render(
        <Card aria-label="Product card" aria-describedby="card-description">
          <CardContent>Content</CardContent>
        </Card>
      );
      const card = screen.getByLabelText('Product card');
      expect(card).toHaveAttribute('aria-describedby', 'card-description');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with basic card', async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all components', async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Body content</CardContent>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with media', async () => {
      const { container } = render(
        <Card>
          <CardMedia src="image.jpg" alt="Cover image" />
          <CardHeader>
            <CardTitle>With Image</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with different variants', async () => {
      const { container } = render(
        <div>
          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined</CardTitle>
            </CardHeader>
          </Card>
          <Card variant="soft">
            <CardHeader>
              <CardTitle>Soft</CardTitle>
            </CardHeader>
          </Card>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
