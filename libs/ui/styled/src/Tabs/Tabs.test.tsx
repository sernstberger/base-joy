import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tabs } from './Tabs';

describe('Tabs', () => {
  const renderTabs = (props = {}) => {
    return render(
      <Tabs.Root defaultValue="tab1" {...props}>
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="tab1">Panel 1 content</Tabs.Panel>
        <Tabs.Panel value="tab2">Panel 2 content</Tabs.Panel>
        <Tabs.Panel value="tab3">Panel 3 content</Tabs.Panel>
      </Tabs.Root>
    );
  };

  describe('Basic rendering', () => {
    it('should render tabs and panels', () => {
      renderTabs();

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
      expect(screen.getByText('Panel 1 content')).toBeInTheDocument();
    });

    it('should show the default active tab', () => {
      renderTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Panel 1 content')).toBeVisible();
    });

    it('should hide inactive panels', () => {
      renderTabs();

      // Panel 1 should be visible
      expect(screen.getByText('Panel 1 content')).toBeVisible();

      // Only one visible panel at a time
      const visiblePanel = screen.getByRole('tabpanel');
      expect(visiblePanel).toHaveTextContent('Panel 1 content');
    });

    it('should forward ref to root element', () => {
      const ref = { current: null };
      render(
        <Tabs.Root ref={ref} defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
        </Tabs.Root>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Tab switching', () => {
    it('should switch tabs on click', async () => {
      const user = userEvent.setup();
      renderTabs();

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      await waitFor(() => {
        expect(tab2).toHaveAttribute('aria-selected', 'true');
      });

      expect(screen.getByText('Panel 2 content')).toBeVisible();
    });

    it('should support controlled mode', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <Tabs.Root value="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Panel 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      // Should not switch because it's controlled
      expect(screen.getByText('Panel 1')).toBeVisible();

      // Rerender with new value
      rerender(
        <Tabs.Root value="tab2">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Panel 2</Tabs.Panel>
        </Tabs.Root>
      );

      expect(screen.getByText('Panel 2')).toBeVisible();
    });
  });

  describe('Keyboard navigation', () => {
    it('should navigate with arrow keys (horizontal)', async () => {
      const user = userEvent.setup();
      renderTabs({ orientation: 'horizontal' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab1.focus();
      expect(tab1).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(tab2).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(tab1).toHaveFocus();
    });

    it('should navigate with arrow keys (vertical)', async () => {
      const user = userEvent.setup();
      renderTabs({ orientation: 'vertical' });

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab1.focus();
      expect(tab1).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(tab2).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(tab1).toHaveFocus();
    });

    it('should support Home and End keys', async () => {
      const user = userEvent.setup();
      renderTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

      tab1.focus();
      await user.keyboard('{End}');
      expect(tab3).toHaveFocus();

      await user.keyboard('{Home}');
      expect(tab1).toHaveFocus();
    });
  });

  describe('Variants', () => {
    it('should render solid variant', () => {
      renderTabs({ variant: 'solid' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });

    it('should render soft variant', () => {
      renderTabs({ variant: 'soft' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });

    it('should render outlined variant', () => {
      renderTabs({ variant: 'outlined' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });

    it('should render plain variant', () => {
      renderTabs({ variant: 'plain' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });
  });

  describe('Colors', () => {
    it('should render primary color', () => {
      renderTabs({ color: 'primary' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });

    it('should render neutral color', () => {
      renderTabs({ color: 'neutral' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });

    it('should render success color', () => {
      renderTabs({ color: 'success' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });

    it('should render warning color', () => {
      renderTabs({ color: 'warning' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });

    it('should render danger color', () => {
      renderTabs({ color: 'danger' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      renderTabs({ size: 'sm' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });

    it('should render medium size', () => {
      renderTabs({ size: 'md' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });

    it('should render large size', () => {
      renderTabs({ size: 'lg' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toBeInTheDocument();
    });
  });

  describe('Disabled state', () => {
    it('should disable individual tabs', async () => {
      const user = userEvent.setup();
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2" disabled>
              Tab 2
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Panel 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      expect(tab2).toHaveAttribute('aria-disabled', 'true');

      await user.click(tab2);
      expect(screen.getByText('Panel 1')).toBeVisible();
    });
  });

  describe('Orientation', () => {
    it('should support horizontal orientation', () => {
      renderTabs({ orientation: 'horizontal' });
      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });

    it('should support vertical orientation', () => {
      renderTabs({ orientation: 'vertical' });
      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should merge custom className on Root', () => {
      render(
        <Tabs.Root defaultValue="tab1" className="custom-root">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
        </Tabs.Root>
      );

      const root = screen.getByRole('tablist').parentElement;
      expect(root).toHaveClass('custom-root');
    });

    it('should merge custom className on List', () => {
      renderTabs();
      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });

    it('should merge custom className on Tab', () => {
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1" className="custom-tab">
              Tab 1
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
        </Tabs.Root>
      );

      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toHaveClass('custom-tab');
    });

    it('should merge custom className on Panel', () => {
      render(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1" className="custom-panel">
            Panel 1
          </Tabs.Panel>
        </Tabs.Root>
      );

      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveClass('custom-panel');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderTabs();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA roles', () => {
      renderTabs();

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('should link tabs and panels with aria-controls and aria-labelledby', () => {
      renderTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const panel1 = screen.getByRole('tabpanel');

      const tabId = tab1.id;
      const panelId = panel1.id;

      expect(tab1).toHaveAttribute('aria-controls', panelId);
      expect(panel1).toHaveAttribute('aria-labelledby', tabId);
    });

    it('should have proper aria-selected attribute', () => {
      renderTabs();

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Value change callback', () => {
    it('should call onValueChange when tab is clicked', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Tabs.Root defaultValue="tab1" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Panel 2</Tabs.Panel>
        </Tabs.Root>
      );

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(onValueChange).toHaveBeenCalled();
      expect(onValueChange.mock.calls[0][0]).toBe('tab2');
    });
  });

  describe('Indicator', () => {
    it('should render indicator', () => {
      renderTabs();
      const tablist = screen.getByRole('tablist');
      const indicator = tablist.querySelector('[data-active]');
      expect(indicator).toBeInTheDocument();
    });
  });
});
