import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Size } from '@base-joy/tokens';

const tableVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const tableHeadVariants = cva('', {
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

const tableBodyVariants = cva('', {
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

const tableRowVariants = cva('', {
  variants: {
    interactive: {
      true: 'cursor-pointer',
      false: '',
    },
    selected: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    interactive: false,
    selected: false,
  },
});

const tableHeaderVariants = cva('text-left font-medium', {
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

const tableCellVariants = cva('', {
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

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  size?: Size;
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {
  interactive?: boolean;
  selected?: boolean;
}

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  size?: Size;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  size?: Size;
}

interface TableContextValue {
  size: Size;
}

export const TableContext = React.createContext<TableContextValue>({
  size: 'md',
});

export const useTableContext = () => React.useContext(TableContext);

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    return (
      <TableContext.Provider value={{ size }}>
        <table
          ref={ref}
          className={cn(tableVariants({ size }), className)}
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
    return (
      <tbody ref={ref} className={cn(tableBodyVariants({}), className)} {...props} />
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
