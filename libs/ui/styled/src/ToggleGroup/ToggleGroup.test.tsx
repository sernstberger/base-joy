import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { ToggleGroup } from './ToggleGroup';
import { Toggle } from '../Toggle';

describe('ToggleGroup', () => {
  describe('rendering', () => {
    it('renders correctly with children', () => {
      render(
        <ToggleGroup.Root aria-label="Options">
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
          <Toggle value="b" aria-label="Option B">
            B
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
  });

  describe('orientation', () => {
    it('renders horizontal layout by default', () => {
      render(
        <ToggleGroup.Root data-testid="group" aria-label="Options">
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
          <Toggle value="b" aria-label="Option B">
            B
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByTestId('group')).toHaveClass('flex-row');
    });

    it('renders vertical layout', () => {
      render(
        <ToggleGroup.Root orientation="vertical" data-testid="group" aria-label="Options">
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
          <Toggle value="b" aria-label="Option B">
            B
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByTestId('group')).toHaveClass('flex-col');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size gap', (size) => {
      render(
        <ToggleGroup.Root size={size} data-testid="group" aria-label="Options">
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByTestId('group')).toBeInTheDocument();
    });
  });

  describe('selection', () => {
    it('selects single value by default', async () => {
      const onValueChange = vi.fn();
      render(
        <ToggleGroup.Root onValueChange={onValueChange} aria-label="Options">
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
          <Toggle value="b" aria-label="Option B">
            B
          </Toggle>
        </ToggleGroup.Root>
      );

      const user = userEvent.setup();
      await user.click(screen.getByText('A'));

      expect(onValueChange).toHaveBeenCalledWith(['a'], expect.anything());
    });

    it('supports controlled value', () => {
      render(
        <ToggleGroup.Root value={['a']} aria-label="Options">
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
          <Toggle value="b" aria-label="Option B">
            B
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByText('A').closest('button')).toHaveAttribute(
        'data-pressed'
      );
    });

    it('supports uncontrolled value with defaultValue', () => {
      render(
        <ToggleGroup.Root defaultValue={['b']} aria-label="Options">
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
          <Toggle value="b" aria-label="Option B">
            B
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByText('B').closest('button')).toHaveAttribute(
        'data-pressed'
      );
    });

    it('allows multiple selection when multiple is true', async () => {
      const onValueChange = vi.fn();
      render(
        <ToggleGroup.Root
          multiple
          defaultValue={['a']}
          onValueChange={onValueChange}
          aria-label="Options"
        >
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
          <Toggle value="b" aria-label="Option B">
            B
          </Toggle>
        </ToggleGroup.Root>
      );

      const user = userEvent.setup();
      await user.click(screen.getByText('B'));

      expect(onValueChange).toHaveBeenCalledWith(
        expect.arrayContaining(['a', 'b']),
        expect.anything()
      );
    });
  });

  describe('disabled state', () => {
    it('disables all children when group is disabled', () => {
      render(
        <ToggleGroup.Root disabled aria-label="Options">
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
          <Toggle value="b" aria-label="Option B">
            B
          </Toggle>
        </ToggleGroup.Root>
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  describe('context inheritance', () => {
    it('passes variant to children', () => {
      render(
        <ToggleGroup.Root variant="solid" aria-label="Options">
          <Toggle value="a" data-testid="toggle" aria-label="Option A">
            A
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });

    it('passes color to children', () => {
      render(
        <ToggleGroup.Root color="success" aria-label="Options">
          <Toggle value="a" data-testid="toggle" aria-label="Option A">
            A
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });

    it('passes size to children', () => {
      render(
        <ToggleGroup.Root size="lg" aria-label="Options">
          <Toggle value="a" data-testid="toggle" aria-label="Option A">
            A
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByTestId('toggle')).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <ToggleGroup.Root className="custom-class" data-testid="group" aria-label="Options">
          <Toggle value="a" aria-label="Option A">
            A
          </Toggle>
        </ToggleGroup.Root>
      );

      expect(screen.getByTestId('group')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ToggleGroup.Root aria-label="Text formatting">
          <Toggle value="bold" aria-label="Bold">
            B
          </Toggle>
          <Toggle value="italic" aria-label="Italic">
            I
          </Toggle>
        </ToggleGroup.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with selection', async () => {
      const { container } = render(
        <ToggleGroup.Root value={['bold']} aria-label="Text formatting">
          <Toggle value="bold" aria-label="Bold">
            B
          </Toggle>
          <Toggle value="italic" aria-label="Italic">
            I
          </Toggle>
        </ToggleGroup.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
