import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ScrollArea } from './ScrollArea';

describe('ScrollArea', () => {
  describe('rendering', () => {
    it('renders correctly with default vertical scrollbar', () => {
      render(
        <ScrollArea data-testid="scroll-area">
          <div>Scrollable content</div>
        </ScrollArea>
      );

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
    });

    it('renders with horizontal scrollbar', () => {
      render(
        <ScrollArea scrollbars="horizontal" data-testid="scroll-area">
          <div>Scrollable content</div>
        </ScrollArea>
      );

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
    });

    it('renders with both scrollbars', () => {
      render(
        <ScrollArea scrollbars="both" data-testid="scroll-area">
          <div>Scrollable content</div>
        </ScrollArea>
      );

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
    });

    it('renders with no scrollbars', () => {
      render(
        <ScrollArea scrollbars="none" data-testid="scroll-area">
          <div>Scrollable content</div>
        </ScrollArea>
      );

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <ScrollArea size={size} data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      );

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
    });
  });

  describe('colors', () => {
    it.each(['primary', 'neutral', 'success', 'warning', 'danger'] as const)(
      'renders %s color',
      (color) => {
        render(
          <ScrollArea color={color} data-testid="scroll-area">
            <div>Content</div>
          </ScrollArea>
        );

        expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
      }
    );
  });

  describe('className merging', () => {
    it('merges custom className on root', () => {
      render(
        <ScrollArea className="custom-root" data-testid="scroll-area">
          <div>Content</div>
        </ScrollArea>
      );

      expect(screen.getByTestId('scroll-area')).toHaveClass('custom-root');
    });

    it('merges custom viewportClassName', () => {
      const { container } = render(
        <ScrollArea viewportClassName="custom-viewport">
          <div>Content</div>
        </ScrollArea>
      );

      const viewport = container.querySelector('.custom-viewport');
      expect(viewport).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ScrollArea ref={ref}>
          <div>Content</div>
        </ScrollArea>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ScrollArea>
          <div>Scrollable content here</div>
        </ScrollArea>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
