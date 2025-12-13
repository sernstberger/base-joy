import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ScrollArea } from './ScrollArea';

describe('ScrollArea', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <ScrollArea.Root data-testid="scroll-area">
          <ScrollArea.Viewport>
            <div>Scrollable content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
    });

    it('renders with horizontal scrollbar', () => {
      render(
        <ScrollArea.Root data-testid="scroll-area">
          <ScrollArea.Viewport>
            <div>Scrollable content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal" data-testid="scrollbar">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      expect(screen.getByTestId('scrollbar')).toBeInTheDocument();
    });

    it('renders with both scrollbars', () => {
      render(
        <ScrollArea.Root data-testid="scroll-area">
          <ScrollArea.Viewport>
            <div>Scrollable content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar orientation="horizontal">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      );

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <ScrollArea.Root size={size} data-testid="scroll-area">
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" data-testid="scrollbar">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
      expect(screen.getByTestId('scrollbar')).toBeInTheDocument();
    });
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      (color) => {
        render(
          <ScrollArea.Root color={color} data-testid="scroll-area">
            <ScrollArea.Viewport>
              <div>Content</div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
              <ScrollArea.Thumb data-testid="thumb" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        );

        expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
        expect(screen.getByTestId('thumb')).toBeInTheDocument();
      }
    );
  });

  describe('orientation', () => {
    it('renders vertical scrollbar', () => {
      render(
        <ScrollArea.Root data-testid="scroll-area">
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" data-testid="scrollbar">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      const scrollbar = screen.getByTestId('scrollbar');
      expect(scrollbar).toBeInTheDocument();
    });

    it('renders horizontal scrollbar', () => {
      render(
        <ScrollArea.Root data-testid="scroll-area">
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal" data-testid="scrollbar">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      const scrollbar = screen.getByTestId('scrollbar');
      expect(scrollbar).toHaveClass('flex-col');
    });
  });

  describe('className merging', () => {
    it('merges custom className on Root', () => {
      render(
        <ScrollArea.Root className="custom-root" data-testid="scroll-area">
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      );

      expect(screen.getByTestId('scroll-area')).toHaveClass('custom-root');
    });

    it('merges custom className on Viewport', () => {
      render(
        <ScrollArea.Root>
          <ScrollArea.Viewport className="custom-viewport" data-testid="viewport">
            <div>Content</div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      );

      expect(screen.getByTestId('viewport')).toHaveClass('custom-viewport');
    });

    it('merges custom className on Scrollbar', () => {
      render(
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="custom-scrollbar"
            data-testid="scrollbar"
          >
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      expect(screen.getByTestId('scrollbar')).toHaveClass('custom-scrollbar');
    });

    it('merges custom className on Thumb', () => {
      render(
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb className="custom-thumb" data-testid="thumb" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      expect(screen.getByTestId('thumb')).toHaveClass('custom-thumb');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to Root', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ScrollArea.Root ref={ref}>
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Viewport', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ScrollArea.Root>
          <ScrollArea.Viewport ref={ref}>
            <div>Content</div>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Scrollbar', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" ref={ref}>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to Thumb', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <div>Content</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb ref={ref} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <div>Scrollable content here</div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
