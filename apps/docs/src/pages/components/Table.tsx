import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Sheet,
} from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { Size } from '@base-joy/tokens';

const tableProps = componentProps.Table;

const tableControls: PlaygroundControl[] = [
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const tableCodeTemplate = (props: Record<string, string>) =>
  `<Table size="${props.size}">\n  <TableHead>\n    <TableRow>\n      <TableHeader>Name</TableHeader>\n      <TableHeader>Value</TableHeader>\n    </TableRow>\n  </TableHead>\n  <TableBody>\n    <TableRow>\n      <TableCell>Row 1</TableCell>\n      <TableCell>Value 1</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`;

const rowProps: PropMeta[] = [
  {
    name: 'interactive',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the row has hover states.',
    required: false,
  },
  {
    name: 'selected',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the row is selected.',
    required: false,
  },
];

const cellProps: PropMeta[] = [
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    description: 'Override the size inherited from Table.',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

const headerProps: PropMeta[] = [
  {
    name: 'scope',
    type: '"col" | "row"',
    defaultValue: '"col"',
    description: 'The scope of the header for accessibility.',
    required: false,
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    description: 'Override the size inherited from Table.',
    required: false,
  },
];

export function TablePage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Table</Heading>
        <Text variant="subtitle">
          A styled table with variants for striped rows and interactive states. Wrap in Sheet for container styling.
        </Text>
      </header>

      <Section title="Playground">
        <Playground controls={tableControls} codeTemplate={tableCodeTemplate}>
          {(props) => (
            <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
              <Table size={props.size as Size}>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Sheet</TableCell>
                    <TableCell>Component</TableCell>
                    <TableCell>Stable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Component</TableCell>
                    <TableCell>Stable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Table</TableCell>
                    <TableCell>Component</TableCell>
                    <TableCell>New</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Sheet>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Default</Heading>
            <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Value</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Row 1</TableCell>
                    <TableCell>Value 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Row 2</TableCell>
                    <TableCell>Value 2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Striped</Heading>
            <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
              <Table variant="striped">
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Value</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Row 1</TableCell>
                    <TableCell>Value 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Row 2</TableCell>
                    <TableCell>Value 2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Row 3</TableCell>
                    <TableCell>Value 3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Row 4</TableCell>
                    <TableCell>Value 4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>With Sheet Container</Heading>
            <Text variant="muted" className="mb-3">
              Use Sheet to add borders and backgrounds. This keeps Table focused on structure.
            </Text>
            <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Value</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Row 1</TableCell>
                    <TableCell>Value 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Row 2</TableCell>
                    <TableCell>Value 2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Interactive Rows</Heading>
            <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow interactive>
                    <TableCell>Hoverable row</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow interactive selected>
                    <TableCell>Selected row</TableCell>
                    <TableCell>Selected</TableCell>
                  </TableRow>
                  <TableRow interactive>
                    <TableCell>Another row</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Sizes</Heading>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">Small</Text>
                <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
                  <Table size="sm">
                    <TableHead>
                      <TableRow>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Value</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Compact</TableCell>
                        <TableCell>Data</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Sheet>
              </div>
              <div>
                <Text variant="muted" className="mb-2">Large</Text>
                <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
                  <Table size="lg">
                    <TableHead>
                      <TableRow>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Value</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Spacious</TableCell>
                        <TableCell>Data</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Table</Heading>
            <PropsTable props={tableProps} />
          </div>
          <div>
            <Heading level={3}>TableRow</Heading>
            <PropsTable props={rowProps} />
          </div>
          <div>
            <Heading level={3}>TableHeader</Heading>
            <PropsTable props={headerProps} />
          </div>
          <div>
            <Heading level={3}>TableCell</Heading>
            <PropsTable props={cellProps} />
          </div>
        </div>
      </Section>
    </div>
  );
}
