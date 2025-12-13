import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Fieldset } from './Fieldset';

describe('Fieldset', () => {
  describe('rendering', () => {
    it('renders root and legend correctly', () => {
      render(
        <Fieldset.Root>
          <Fieldset.Legend>Account Info</Fieldset.Legend>
          <div>Field content</div>
        </Fieldset.Root>
      );

      expect(screen.getByText('Account Info')).toBeInTheDocument();
      expect(screen.getByText('Field content')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders plain variant without border', () => {
      render(
        <Fieldset.Root variant="plain" data-testid="fieldset">
          <Fieldset.Legend>Legend</Fieldset.Legend>
        </Fieldset.Root>
      );

      const fieldset = screen.getByTestId('fieldset');
      expect(fieldset).not.toHaveClass('border');
    });

    it('renders outlined variant with border', () => {
      render(
        <Fieldset.Root variant="outlined" data-testid="fieldset">
          <Fieldset.Legend>Legend</Fieldset.Legend>
        </Fieldset.Root>
      );

      const fieldset = screen.getByTestId('fieldset');
      expect(fieldset).toHaveClass('border');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Fieldset.Root size={size} data-testid="fieldset">
          <Fieldset.Legend>Legend</Fieldset.Legend>
        </Fieldset.Root>
      );

      expect(screen.getByTestId('fieldset')).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <Fieldset.Root className="custom-class" data-testid="fieldset">
          <Fieldset.Legend className="legend-class">Legend</Fieldset.Legend>
        </Fieldset.Root>
      );

      expect(screen.getByTestId('fieldset')).toHaveClass('custom-class');
      expect(screen.getByText('Legend')).toHaveClass('legend-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Fieldset.Root>
          <Fieldset.Legend>User Information</Fieldset.Legend>
          <input type="text" aria-label="Name" />
        </Fieldset.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
