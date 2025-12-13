import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Sheet,
  Typography,
} from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
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

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'default', title: 'Default', level: 3 },
  { id: 'striped', title: 'Striped', level: 3 },
  { id: 'sheet-container', title: 'With Sheet Container', level: 3 },
  { id: 'interactive', title: 'Interactive Rows', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function TablePage() {
  return (
    <div>
      <ComponentHeader
        title="Table"
        description="A styled table with variants for striped rows and interactive states. Wrap in Sheet for container styling."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
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

      <Section title="Examples" id="examples">
        <div className="space-y-8">
          <Section
            title="Default"
            titleLevel="h3"
            id="default"
            code={`<Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
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
</Sheet>`}
          >
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
          </Section>

          <Section
            title="Striped"
            titleLevel="h3"
            id="striped"
            code={`<Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
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
</Sheet>`}
          >
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
          </Section>

          <Section
            title="With Sheet Container"
            titleLevel="h3"
            id="sheet-container"
            code={`<Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
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
</Sheet>`}
          >
            <Typography level="body-sm" className="mb-3">
              Use Sheet to add borders and backgrounds. This keeps Table focused on structure.
            </Typography>
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
          </Section>

          <Section
            title="Interactive Rows"
            titleLevel="h3"
            id="interactive"
            code={`<Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
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
</Sheet>`}
          >
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
          </Section>

          <Section
            title="Sizes"
            titleLevel="h3"
            id="sizes"
            code={`<Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
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
</Sheet>`}
          >
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" className="mb-2">Small</Typography>
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
                <Typography level="body-sm" className="mb-2">Large</Typography>
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
          </Section>
        </div>
      </Section>

      <Section title="API Reference" id="api">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Table</Typography>
            <PropsTable props={tableProps} />
          </div>
          <div>
            <Typography level="h3">TableRow</Typography>
            <PropsTable props={rowProps} />
          </div>
          <div>
            <Typography level="h3">TableHeader</Typography>
            <PropsTable props={headerProps} />
          </div>
          <div>
            <Typography level="h3">TableCell</Typography>
            <PropsTable props={cellProps} />
          </div>
        </div>
      </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
