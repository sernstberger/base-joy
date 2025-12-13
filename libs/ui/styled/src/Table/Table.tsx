import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';
import { useResolvedSizeProps } from '../SizeContext';
import {
  TableContext,
  useTableContext,
  tableRowVariants as unstyledTableRowVariants,
  type TableProps as BaseTableProps,
  type TableHeadProps as BaseTableHeadProps,
  type TableBodyProps as BaseTableBodyProps,
  type TableRowProps as BaseTableRowProps,
  type TableHeaderProps as BaseTableHeaderProps,
  type TableCellProps as BaseTableCellProps,
} from '@base-joy/ui-unstyled';

const tableHeadVariants = cva('bg-neutral-50 border-b border-neutral-200', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const tableBodyVariants = cva('divide-y divide-neutral-200', {
  variants: {
    variant: {
      default: '',
      striped: '[&>tr:nth-child(even)]:bg-neutral-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tableRowVariants = cva('transition-colors', {
  variants: {
    interactive: {
      true: 'hover:bg-neutral-100',
      false: '',
    },
    selected: {
      true: 'bg-primary-50',
      false: '',
    },
  },
  compoundVariants: [
    {
      interactive: true,
      selected: true,
      className: 'hover:bg-primary-100',
    },
  ],
  defaultVariants: {
    interactive: false,
    selected: false,
  },
});

const tableHeaderVariants = cva('text-neutral-700', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const tableCellVariants = cva('text-neutral-600', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type TableVariant = 'default' | 'striped';

interface StyledTableContextValue {
  variant: TableVariant;
}

const StyledTableContext = React.createContext<StyledTableContextValue>({
  variant: 'default',
});

const useStyledTableContext = () => React.useContext(StyledTableContext);

export interface TableProps extends BaseTableProps {
  variant?: TableVariant;
  size?: Size;
}

export interface TableHeadProps extends BaseTableHeadProps {}

export interface TableBodyProps extends BaseTableBodyProps {}

export interface TableRowProps extends BaseTableRowProps {}

export interface TableHeaderProps extends BaseTableHeaderProps {}

export interface TableCellProps extends BaseTableCellProps {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', size: sizeProp, children, ...props }, ref) => {
    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

    return (
      <StyledTableContext.Provider value={{ variant }}>
        <TableContext.Provider value={{ size }}>
          <table
            ref={ref}
            className={cn('w-full text-sm', className)}
            {...props}
          >
            {children}
          </table>
        </TableContext.Provider>
      </StyledTableContext.Provider>
    );
  }
);

Table.displayName = 'Table';

export const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, ...props }, ref) => {
    const { size } = useTableContext();

    return (
      <thead ref={ref} className={cn(tableHeadVariants({ size }), className)} {...props} />
    );
  }
);

TableHead.displayName = 'TableHead';

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useStyledTableContext();

    return (
      <tbody ref={ref} className={cn(tableBodyVariants({ variant }), className)} {...props} />
    );
  }
);

TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, interactive, selected, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          unstyledTableRowVariants({ interactive, selected }),
          tableRowVariants({ interactive, selected }),
          className
        )}
        {...props}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

export const TableHeader = React.forwardRef<HTMLTableCellElement, TableHeaderProps>(
  ({ className, size: sizeProp, scope = 'col', ...props }, ref) => {
    const { size: contextSize } = useTableContext();
    const size = sizeProp ?? contextSize;

    return (
      <th
        ref={ref}
        scope={scope}
        className={cn(
          'text-left font-medium',
          size === 'sm' && 'px-3 py-2 text-xs',
          size === 'md' && 'px-4 py-3 text-sm',
          size === 'lg' && 'px-5 py-4 text-base',
          tableHeaderVariants({ size }),
          className
        )}
        {...props}
      />
    );
  }
);

TableHeader.displayName = 'TableHeader';

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size: sizeProp, ...props }, ref) => {
    const { size: contextSize } = useTableContext();
    const size = sizeProp ?? contextSize;

    return (
      <td
        ref={ref}
        className={cn(
          size === 'sm' && 'px-3 py-2 text-xs',
          size === 'md' && 'px-4 py-3 text-sm',
          size === 'lg' && 'px-5 py-4 text-base',
          tableCellVariants({ size }),
          className
        )}
        {...props}
      />
    );
  }
);

TableCell.displayName = 'TableCell';

export {
  tableHeadVariants,
  tableBodyVariants,
  tableRowVariants,
  tableHeaderVariants,
  tableCellVariants,
};

// Re-export tableVariants from unstyled for convenience
export { tableVariants } from '@base-joy/ui-unstyled';
