import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Sheet,
} from '@base-joy/ui-components';
import { CodeBadge } from '../CodeBadge';

export interface PropMeta {
  name: string;
  type: string;
  defaultValue?: string;
  description?: string;
  required: boolean;
}

interface PropsTableProps {
  props: PropMeta[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Prop</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Default</TableHeader>
            <TableHeader>Description</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name} interactive>
              <TableCell>
                <CodeBadge>{prop.name}</CodeBadge>
                {prop.required && (
                  <span className="ml-1 text-danger-500 text-xs">*</span>
                )}
              </TableCell>
              <TableCell>
                <CodeBadge color="neutral">{prop.type}</CodeBadge>
              </TableCell>
              <TableCell className="text-neutral-500">
                {prop.defaultValue ? (
                  <code className="font-mono text-xs">{prop.defaultValue}</code>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>{prop.description || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Sheet>
  );
}
