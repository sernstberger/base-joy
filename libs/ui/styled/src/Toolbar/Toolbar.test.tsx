import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Toolbar } from './Toolbar';

describe('Toolbar', () => {
  describe('Root', () => {
    it('renders correctly', () => {
      render(
        <Toolbar.Root aria-label="Text formatting">
          <Toolbar.Button>Bold</Toolbar.Button>
        </Toolbar.Root>
      );
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      render(
        <Toolbar.Root variant="solid" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar.className).toContain('bg-');
    });

    it('applies color classes', () => {
      render(
        <Toolbar.Root color="primary" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar.className).toContain('primary');
    });

    it('supports horizontal orientation', () => {
      render(
        <Toolbar.Root orientation="horizontal" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar.className).toContain('flex-row');
    });

    it('supports vertical orientation', () => {
      render(
        <Toolbar.Root orientation="vertical" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar.className).toContain('flex-col');
    });

    it('applies size classes', () => {
      const { rerender } = render(
        <Toolbar.Root size="sm" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      let toolbar = screen.getByRole('toolbar');
      expect(toolbar.className).toContain('gap-1');

      rerender(
        <Toolbar.Root size="md" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      toolbar = screen.getByRole('toolbar');
      expect(toolbar.className).toContain('gap-1.5');

      rerender(
        <Toolbar.Root size="lg" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      toolbar = screen.getByRole('toolbar');
      expect(toolbar.className).toContain('gap-2');
    });

    it('merges className prop', () => {
      render(
        <Toolbar.Root className="custom-class" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      expect(screen.getByRole('toolbar')).toHaveClass('custom-class');
    });

    it('forwards ref', () => {
      const ref = { current: null };
      render(
        <Toolbar.Root ref={ref} aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Button', () => {
    it('renders correctly', () => {
      render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Button>Click me</Toolbar.Button>
        </Toolbar.Root>
      );
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('inherits variant and color from toolbar context', () => {
      render(
        <Toolbar.Root variant="solid" color="primary" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('primary');
    });

    it('overrides variant and color from props', () => {
      render(
        <Toolbar.Root variant="outlined" color="neutral" aria-label="Actions">
          <Toolbar.Button variant="solid" color="danger">
            Delete
          </Toolbar.Button>
        </Toolbar.Root>
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('danger');
    });

    it('inherits size from toolbar context', () => {
      render(
        <Toolbar.Root size="lg" aria-label="Actions">
          <Toolbar.Button>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('h-12');
    });

    it('supports disabled state', () => {
      render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Button disabled>Disabled</Toolbar.Button>
        </Toolbar.Root>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('forwards ref', () => {
      const ref = { current: null };
      render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Button ref={ref}>Action</Toolbar.Button>
        </Toolbar.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Link', () => {
    it('renders correctly', () => {
      render(
        <Toolbar.Root aria-label="Navigation">
          <Toolbar.Link href="/home">Home</Toolbar.Link>
        </Toolbar.Root>
      );
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    });

    it('inherits variant and color from toolbar context', () => {
      render(
        <Toolbar.Root variant="soft" color="primary" aria-label="Navigation">
          <Toolbar.Link href="/home">Home</Toolbar.Link>
        </Toolbar.Root>
      );
      const link = screen.getByRole('link');
      expect(link.className).toContain('primary');
    });

    it('overrides variant and color from props', () => {
      render(
        <Toolbar.Root variant="outlined" color="neutral" aria-label="Navigation">
          <Toolbar.Link variant="solid" color="success" href="/home">
            Home
          </Toolbar.Link>
        </Toolbar.Root>
      );
      const link = screen.getByRole('link');
      expect(link.className).toContain('success');
    });

    it('forwards ref', () => {
      const ref = { current: null };
      render(
        <Toolbar.Root aria-label="Navigation">
          <Toolbar.Link ref={ref} href="/home">
            Home
          </Toolbar.Link>
        </Toolbar.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('Separator', () => {
    it('renders correctly', () => {
      const { container } = render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Button>Action 1</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button>Action 2</Toolbar.Button>
        </Toolbar.Root>
      );
      const separator = container.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
    });

    it('applies color classes', () => {
      const { container } = render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Button>Action 1</Toolbar.Button>
          <Toolbar.Separator color="primary" />
          <Toolbar.Button>Action 2</Toolbar.Button>
        </Toolbar.Root>
      );
      const separator = container.querySelector('[role="separator"]');
      expect(separator?.className).toContain('primary');
    });

    it('supports horizontal orientation', () => {
      const { container } = render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Button>Action 1</Toolbar.Button>
          <Toolbar.Separator orientation="horizontal" />
          <Toolbar.Button>Action 2</Toolbar.Button>
        </Toolbar.Root>
      );
      const separator = container.querySelector('[role="separator"]');
      expect(separator?.className).toContain('w-px');
    });

    it('supports vertical orientation', () => {
      const { container } = render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Button>Action 1</Toolbar.Button>
          <Toolbar.Separator orientation="vertical" />
          <Toolbar.Button>Action 2</Toolbar.Button>
        </Toolbar.Root>
      );
      const separator = container.querySelector('[role="separator"]');
      expect(separator?.className).toContain('h-px');
    });

    it('forwards ref', () => {
      const ref = { current: null };
      render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Button>Action 1</Toolbar.Button>
          <Toolbar.Separator ref={ref} />
          <Toolbar.Button>Action 2</Toolbar.Button>
        </Toolbar.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Group', () => {
    it('renders correctly', () => {
      render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Group>
            <Toolbar.Button>Action 1</Toolbar.Button>
            <Toolbar.Button>Action 2</Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Root>
      );
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('inherits variant and color from toolbar context', () => {
      render(
        <Toolbar.Root variant="solid" color="primary" aria-label="Actions">
          <Toolbar.Group>
            <Toolbar.Button>Action 1</Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Root>
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('primary');
    });

    it('overrides variant and color for children', () => {
      render(
        <Toolbar.Root variant="outlined" color="neutral" aria-label="Actions">
          <Toolbar.Group variant="solid" color="danger">
            <Toolbar.Button>Delete</Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Root>
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('danger');
    });

    it('supports horizontal orientation', () => {
      render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Group orientation="horizontal">
            <Toolbar.Button>Action 1</Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Root>
      );
      const group = screen.getByRole('group');
      expect(group.className).toContain('flex-row');
    });

    it('supports vertical orientation', () => {
      render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Group orientation="vertical">
            <Toolbar.Button>Action 1</Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Root>
      );
      const group = screen.getByRole('group');
      expect(group.className).toContain('flex-col');
    });

    it('forwards ref', () => {
      const ref = { current: null };
      render(
        <Toolbar.Root aria-label="Actions">
          <Toolbar.Group ref={ref}>
            <Toolbar.Button>Action 1</Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Root>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Toolbar.Root aria-label="Text formatting">
          <Toolbar.Button>Bold</Toolbar.Button>
          <Toolbar.Button>Italic</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Group>
            <Toolbar.Button>Left</Toolbar.Button>
            <Toolbar.Button>Center</Toolbar.Button>
            <Toolbar.Button>Right</Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Root>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
