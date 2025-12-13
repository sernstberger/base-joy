import * as React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar', () => {
  describe('rendering', () => {
    beforeAll(() => {
      global.Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        src = '';
        constructor() {
          setTimeout(() => {
            act(() => {
              if (this.src && !this.src.includes('invalid')) {
                this.onload?.();
              } else if (this.src.includes('invalid')) {
                this.onerror?.();
              }
            });
          }, 0);
        }
      } as any;
    });

    it('renders with image when src is provided', async () => {
      render(<Avatar src="test.jpg" alt="Test User" />);
      const img = await screen.findByRole('img');
      expect(img).toHaveAttribute('src', 'test.jpg');
      expect(img).toHaveAttribute('alt', 'Test User');
    });

    it('renders fallback children when no src is provided', () => {
      render(<Avatar>JD</Avatar>);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders fallback when image fails to load', async () => {
      render(
        <Avatar src="invalid.jpg" alt="Test User">
          JD
        </Avatar>
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('applies default variant classes (soft neutral)', () => {
      const { container } = render(<Avatar>JD</Avatar>);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass('bg-neutral-100');
      expect(avatar).toHaveClass('text-neutral-900');
    });

    it('applies base classes', () => {
      const { container } = render(<Avatar>JD</Avatar>);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass('rounded-full');
      expect(avatar).toHaveClass('inline-flex');
      expect(avatar).toHaveClass('items-center');
      expect(avatar).toHaveClass('justify-center');
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined'] as const)('renders %s variant', (variant) => {
      const { container } = render(<Avatar variant={variant}>JD</Avatar>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies solid variant classes', () => {
      const { container } = render(
        <Avatar variant="solid" color="primary">
          JD
        </Avatar>
      );
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass('bg-primary-500');
      expect(avatar).toHaveClass('text-white');
    });

    it('applies soft variant classes', () => {
      const { container } = render(
        <Avatar variant="soft" color="success">
          JD
        </Avatar>
      );
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass('bg-success-100');
      expect(avatar).toHaveClass('text-success-900');
    });

    it('applies outlined variant classes', () => {
      const { container } = render(
        <Avatar variant="outlined" color="danger">
          JD
        </Avatar>
      );
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass('border-2');
      expect(avatar).toHaveClass('border-danger-500');
      expect(avatar).toHaveClass('bg-transparent');
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
        <Avatar variant="solid" color={color}>
          JD
        </Avatar>
      );
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass(expectedClass);
    });

    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color with soft variant',
      (color) => {
        const { container } = render(
          <Avatar variant="soft" color={color}>
            JD
          </Avatar>
        );
        const avatar = container.firstChild as HTMLElement;
        expect(avatar).toHaveClass(`bg-${color}-100`);
        expect(avatar).toHaveClass(`text-${color}-900`);
      }
    );
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'h-8', 'w-8', 'text-xs'],
      ['md', 'h-10', 'w-10', 'text-sm'],
      ['lg', 'h-12', 'w-12', 'text-base'],
    ] as const)('renders %s size with correct classes', (size, height, width, fontSize) => {
      const { container } = render(<Avatar size={size}>JD</Avatar>);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass(height);
      expect(avatar).toHaveClass(width);
      expect(avatar).toHaveClass(fontSize);
    });

    it('applies default md size', () => {
      const { container } = render(<Avatar>JD</Avatar>);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass('h-10');
      expect(avatar).toHaveClass('w-10');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the DOM element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Avatar ref={ref}>JD</Avatar>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className with variant classes', () => {
      const { container } = render(<Avatar className="custom-class">JD</Avatar>);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass('custom-class');
      expect(avatar).toHaveClass('rounded-full');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with image', async () => {
      const { container } = render(<Avatar src="test.jpg" alt="Test User" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with fallback', async () => {
      const { container } = render(<Avatar>JD</Avatar>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const { container } = render(
        <div>
          <Avatar variant="solid" color="primary">
            JD
          </Avatar>
          <Avatar variant="soft" color="success">
            AB
          </Avatar>
          <Avatar variant="outlined" color="warning">
            CD
          </Avatar>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('AvatarGroup', () => {
  describe('rendering', () => {
    it('renders all children when max is not specified', () => {
      render(
        <AvatarGroup>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </AvatarGroup>
      );
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('renders only max children when max is specified', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
        </AvatarGroup>
      );
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.queryByText('C')).not.toBeInTheDocument();
      expect(screen.queryByText('D')).not.toBeInTheDocument();
    });

    it('shows +N indicator for extra avatars', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
        </AvatarGroup>
      );
      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('does not show +N indicator when all avatars are displayed', () => {
      render(
        <AvatarGroup max={3}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </AvatarGroup>
      );
      expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
    });

    it('applies negative margin for overlap', () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
        </AvatarGroup>
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveClass('-space-x-3');
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', '-space-x-2'],
      ['md', '-space-x-3'],
      ['lg', '-space-x-4'],
    ] as const)('renders %s size with correct spacing', (size, expectedClass) => {
      const { container } = render(
        <AvatarGroup size={size}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
        </AvatarGroup>
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveClass(expectedClass);
    });

    it('passes size to children via context', () => {
      const { container } = render(
        <AvatarGroup size="lg">
          <Avatar>A</Avatar>
        </AvatarGroup>
      );
      const avatar = container.querySelector('[class*="h-12"]');
      expect(avatar).toBeInTheDocument();
    });

    it('applies default md size', () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar>A</Avatar>
        </AvatarGroup>
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveClass('-space-x-3');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the DOM element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <AvatarGroup ref={ref}>
          <Avatar>A</Avatar>
        </AvatarGroup>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className with base classes', () => {
      const { container } = render(
        <AvatarGroup className="custom-class">
          <Avatar>A</Avatar>
        </AvatarGroup>
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveClass('custom-class');
      expect(group).toHaveClass('flex');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar src="user1.jpg" alt="User 1" />
          <Avatar src="user2.jpg" alt="User 2" />
          <Avatar>AB</Avatar>
        </AvatarGroup>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with max prop', async () => {
      const { container } = render(
        <AvatarGroup max={2}>
          <Avatar src="user1.jpg" alt="User 1" />
          <Avatar src="user2.jpg" alt="User 2" />
          <Avatar>AB</Avatar>
          <Avatar>CD</Avatar>
        </AvatarGroup>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
