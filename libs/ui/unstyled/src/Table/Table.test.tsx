import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from './Table';

describe('Table (unstyled)', () => {
  describe('rendering', () => {
    it('renders a basic table structure', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>John</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    it('applies base classes', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const table = container.firstChild as HTMLElement;
      expect(table).toHaveClass('w-full');
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'px-3', 'py-2', 'text-xs'],
      ['md', 'px-4', 'py-3', 'text-sm'],
      ['lg', 'px-5', 'py-4', 'text-base'],
    ] as const)(
      'renders %s size with correct padding classes',
      (size, expectedPx, expectedPy, expectedText) => {
        render(
          <Table size={size}>
            <TableHead>
              <TableRow>
                <TableHeader data-testid="header">Header</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell data-testid="cell">Cell</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
        const header = screen.getByTestId('header');
        const cell = screen.getByTestId('cell');
        expect(header).toHaveClass(expectedPx, expectedPy, expectedText);
        expect(cell).toHaveClass(expectedPx, expectedPy, expectedText);
      }
    );

    it('applies default md size', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="cell">Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId('cell');
      expect(cell).toHaveClass('px-4', 'py-3', 'text-sm');
    });
  });

  describe('context inheritance', () => {
    it('children inherit size from Table context', () => {
      render(
        <Table size="lg">
          <TableHead>
            <TableRow>
              <TableHeader data-testid="header">Header</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell data-testid="cell">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const header = screen.getByTestId('header');
      const cell = screen.getByTestId('cell');
      expect(header).toHaveClass('px-5', 'py-4', 'text-base');
      expect(cell).toHaveClass('px-5', 'py-4', 'text-base');
    });

    it('allows size override on individual cells', () => {
      render(
        <Table size="md">
          <TableBody>
            <TableRow>
              <TableCell data-testid="default-cell">Default</TableCell>
              <TableCell data-testid="override-cell" size="lg">
                Override
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const defaultCell = screen.getByTestId('default-cell');
      const overrideCell = screen.getByTestId('override-cell');
      expect(defaultCell).toHaveClass('px-4', 'py-3', 'text-sm');
      expect(overrideCell).toHaveClass('px-5', 'py-4', 'text-base');
    });
  });

  describe('TableRow', () => {
    it('applies interactive class when interactive prop is true', () => {
      render(
        <Table>
          <TableBody>
            <TableRow interactive data-testid="row">
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = screen.getByTestId('row');
      expect(row).toHaveClass('cursor-pointer');
    });

    it('does not apply interactive styles by default', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="row">
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = screen.getByTestId('row');
      expect(row).not.toHaveClass('cursor-pointer');
    });
  });

  describe('TableHeader', () => {
    it('applies scope="col" by default', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="header">Header</TableHeader>
            </TableRow>
          </TableHead>
        </Table>
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveAttribute('scope', 'col');
    });

    it('allows scope override', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader scope="row" data-testid="header">
                Row Header
              </TableHeader>
            </TableRow>
          </TableBody>
        </Table>
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveAttribute('scope', 'row');
    });

    it('applies header styling classes', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader data-testid="header">Header</TableHeader>
            </TableRow>
          </TableHead>
        </Table>
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('text-left');
      expect(header).toHaveClass('font-medium');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to Table element', () => {
      const ref = React.createRef<HTMLTableElement>();
      render(
        <Table ref={ref}>
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(ref.current).toBeInstanceOf(HTMLTableElement);
    });

    it('forwards ref to TableHead element', () => {
      const ref = React.createRef<HTMLTableSectionElement>();
      render(
        <Table>
          <TableHead ref={ref}>
            <TableRow>
              <TableHeader>Header</TableHeader>
            </TableRow>
          </TableHead>
        </Table>
      );
      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
      expect(ref.current?.nodeName).toBe('THEAD');
    });

    it('forwards ref to TableBody element', () => {
      const ref = React.createRef<HTMLTableSectionElement>();
      render(
        <Table>
          <TableBody ref={ref}>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
      expect(ref.current?.nodeName).toBe('TBODY');
    });

    it('forwards ref to TableRow element', () => {
      const ref = React.createRef<HTMLTableRowElement>();
      render(
        <Table>
          <TableBody>
            <TableRow ref={ref}>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
    });

    it('forwards ref to TableHeader element', () => {
      const ref = React.createRef<HTMLTableCellElement>();
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader ref={ref}>Header</TableHeader>
            </TableRow>
          </TableHead>
        </Table>
      );
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
      expect(ref.current?.nodeName).toBe('TH');
    });

    it('forwards ref to TableCell element', () => {
      const ref = React.createRef<HTMLTableCellElement>();
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell ref={ref}>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
      expect(ref.current?.nodeName).toBe('TD');
    });
  });

  describe('className merging', () => {
    it('merges custom className on Table', () => {
      const { container } = render(
        <Table className="custom-table">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const table = container.firstChild as HTMLElement;
      expect(table).toHaveClass('custom-table');
      expect(table).toHaveClass('w-full');
    });

    it('merges custom className on TableCell', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="custom-cell" data-testid="cell">
                Content
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId('cell');
      expect(cell).toHaveClass('custom-cell');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Table data-testid="test-table" id="my-table">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const table = screen.getByTestId('test-table');
      expect(table).toHaveAttribute('id', 'my-table');
    });

    it('passes through aria attributes', () => {
      render(
        <Table aria-label="Data table" aria-describedby="table-description">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('aria-label', 'Data table');
      expect(table).toHaveAttribute('aria-describedby', 'table-description');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with basic table', async () => {
      const { container } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Age</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>John</TableCell>
              <TableCell>25</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with row headers', async () => {
      const { container } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Value</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableHeader scope="row">Property</TableHeader>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with interactive rows', async () => {
      const { container } = render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow interactive>
              <TableCell>John</TableCell>
            </TableRow>
            <TableRow interactive selected>
              <TableCell>Jane</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
