import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';

/**
 * For container styling, wrap in Sheet:
 * ```tsx
 * <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
 *   <Table>...</Table>
 * </Sheet>
 * ```
 */

const tableVariants = cva('w-full text-sm', {
  variants: {
    variant: {
      default: '',
      striped: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

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
      true: 'hover:bg-neutral-100 cursor-pointer',
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

const tableHeaderVariants = cva('text-left font-medium text-neutral-700', {
  variants: {
    size: {
      sm: 'px-3 py-2 text-xs',
      md: 'px-4 py-3 text-sm',
      lg: 'px-5 py-4 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const tableCellVariants = cva('text-neutral-600', {
  variants: {
    size: {
      sm: 'px-3 py-2 text-xs',
      md: 'px-4 py-3 text-sm',
      lg: 'px-5 py-4 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type TableVariant = 'default' | 'striped';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  /**
   * The visual variant of the table.
   * @default 'default'
   */
  variant?: TableVariant;

  /**
   * The size of the table cells.
   * @default 'md'
   */
  size?: Size;
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {
  /**
   * Whether the row is interactive (hoverable/clickable).
   * @default false
   */
  interactive?: boolean;

  /**
   * Whether the row is selected.
   * @default false
   */
  selected?: boolean;
}

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * The size of the header cell.
   * Inherits from Table context if not specified.
   */
  size?: Size;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * The size of the cell.
   * Inherits from Table context if not specified.
   */
  size?: Size;
}

interface TableContextValue {
  size: Size;
  variant: TableVariant;
}

const TableContext = React.createContext<TableContextValue>({
  size: 'md',
  variant: 'default',
});

const useTableContext = () => React.useContext(TableContext);

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    return (
      <TableContext.Provider value={{ size, variant }}>
        <table
          ref={ref}
          className={cn(tableVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </table>
      </TableContext.Provider>
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
    const { variant } = useTableContext();

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
        className={cn(tableRowVariants({ interactive, selected }), className)}
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
        className={cn(tableHeaderVariants({ size }), className)}
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
      <td ref={ref} className={cn(tableCellVariants({ size }), className)} {...props} />
    );
  }
);

TableCell.displayName = 'TableCell';

export {
  tableVariants,
  tableHeadVariants,
  tableBodyVariants,
  tableRowVariants,
  tableHeaderVariants,
  tableCellVariants,
};
