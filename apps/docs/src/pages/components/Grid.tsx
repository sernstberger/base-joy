import { Grid, Sheet } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { GridColumns, GridGap } from '@base-joy/ui-core';

const gridControls: PlaygroundControl[] = [
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const gridCodeTemplate = (props: Record<string, string>) =>
  `<Grid columns={${props.columns}} gap={${props.gap}}>\n  <Grid.Item>1</Grid.Item>\n  <Grid.Item>2</Grid.Item>\n  <Grid.Item span={2}>Wide item</Grid.Item>\n</Grid>`;

const gridItemProps: PropMeta[] = [
  {
    name: 'span',
    type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full"',
    defaultValue: '1',
    description: 'Number of columns this item should span.',
    required: false,
  },
  {
    name: 'as',
    type: 'React.ElementType',
    defaultValue: '"div"',
    description: 'The element type to render as.',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

export function GridPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Grid</Heading>
        <Text variant="subtitle">
          A responsive grid layout system with configurable columns and gaps.
        </Text>
      </header>

      <Section title="Playground">
        <Playground controls={gridControls} codeTemplate={gridCodeTemplate}>
          {(props) => (
            <Grid
              columns={
                props.columns === 'auto'
                  ? 'auto'
                  : (Number(props.columns) as GridColumns)
              }
              gap={Number(props.gap) as GridGap}
            >
              <Grid.Item>
                <Sheet variant="soft" color="primary" className="p-4 text-center">
                  1
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="soft" color="primary" className="p-4 text-center">
                  2
                </Sheet>
              </Grid.Item>
              <Grid.Item span={2}>
                <Sheet variant="soft" color="success" className="p-4 text-center">
                  Wide item (span 2)
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="soft" color="primary" className="p-4 text-center">
                  3
                </Sheet>
              </Grid.Item>
            </Grid>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Basic Grid</Heading>
            <Text variant="muted" className="mb-3">
              A simple 3-column grid with gap spacing.
            </Text>
            <Grid columns={3} gap={4}>
              <Grid.Item>
                <Sheet variant="outlined" color="neutral" className="p-4 text-center">
                  Item 1
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="outlined" color="neutral" className="p-4 text-center">
                  Item 2
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="outlined" color="neutral" className="p-4 text-center">
                  Item 3
                </Sheet>
              </Grid.Item>
            </Grid>
          </div>

          <div>
            <Heading level={3}>Spanning Items</Heading>
            <Text variant="muted" className="mb-3">
              Grid items can span multiple columns.
            </Text>
            <Grid columns={4} gap={4}>
              <Grid.Item>
                <Sheet variant="soft" color="neutral" className="p-4 text-center">
                  1
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="soft" color="neutral" className="p-4 text-center">
                  2
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="soft" color="neutral" className="p-4 text-center">
                  3
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="soft" color="neutral" className="p-4 text-center">
                  4
                </Sheet>
              </Grid.Item>
              <Grid.Item span={2}>
                <Sheet variant="soft" color="primary" className="p-4 text-center">
                  Span 2
                </Sheet>
              </Grid.Item>
              <Grid.Item span={2}>
                <Sheet variant="soft" color="success" className="p-4 text-center">
                  Span 2
                </Sheet>
              </Grid.Item>
              <Grid.Item span={3}>
                <Sheet variant="soft" color="warning" className="p-4 text-center">
                  Span 3
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="soft" color="neutral" className="p-4 text-center">
                  1
                </Sheet>
              </Grid.Item>
            </Grid>
          </div>

          <div>
            <Heading level={3}>Full Width Item</Heading>
            <Text variant="muted" className="mb-3">
              Use span="full" to make an item span all columns.
            </Text>
            <Grid columns={3} gap={4}>
              <Grid.Item>
                <Sheet variant="soft" color="neutral" className="p-4 text-center">
                  1
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="soft" color="neutral" className="p-4 text-center">
                  2
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="soft" color="neutral" className="p-4 text-center">
                  3
                </Sheet>
              </Grid.Item>
              <Grid.Item span="full">
                <Sheet variant="soft" color="danger" className="p-4 text-center">
                  Full Width
                </Sheet>
              </Grid.Item>
            </Grid>
          </div>

          <div>
            <Heading level={3}>Different Column Counts</Heading>
            <Text variant="muted" className="mb-3">
              Grids support 1-12 columns or auto.
            </Text>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">
                  2 Columns
                </Text>
                <Grid columns={2} gap={3}>
                  <Grid.Item>
                    <Sheet variant="outlined" color="neutral" className="p-3 text-center text-sm">
                      Item 1
                    </Sheet>
                  </Grid.Item>
                  <Grid.Item>
                    <Sheet variant="outlined" color="neutral" className="p-3 text-center text-sm">
                      Item 2
                    </Sheet>
                  </Grid.Item>
                </Grid>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  6 Columns
                </Text>
                <Grid columns={6} gap={2}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <Grid.Item key={i}>
                      <Sheet
                        variant="outlined"
                        color="neutral"
                        className="p-3 text-center text-sm"
                      >
                        {i + 1}
                      </Sheet>
                    </Grid.Item>
                  ))}
                </Grid>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  12 Columns
                </Text>
                <Grid columns={12} gap={1}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <Grid.Item key={i}>
                      <Sheet
                        variant="outlined"
                        color="neutral"
                        className="p-2 text-center text-xs"
                      >
                        {i + 1}
                      </Sheet>
                    </Grid.Item>
                  ))}
                </Grid>
              </div>
            </div>
          </div>

          <div>
            <Heading level={3}>Gap Variations</Heading>
            <Text variant="muted" className="mb-3">
              Control spacing between grid items.
            </Text>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">
                  No Gap (gap=0)
                </Text>
                <Grid columns={3} gap={0}>
                  <Grid.Item>
                    <Sheet variant="outlined" color="neutral" className="p-4 text-center">
                      1
                    </Sheet>
                  </Grid.Item>
                  <Grid.Item>
                    <Sheet variant="outlined" color="neutral" className="p-4 text-center">
                      2
                    </Sheet>
                  </Grid.Item>
                  <Grid.Item>
                    <Sheet variant="outlined" color="neutral" className="p-4 text-center">
                      3
                    </Sheet>
                  </Grid.Item>
                </Grid>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  Large Gap (gap=8)
                </Text>
                <Grid columns={3} gap={8}>
                  <Grid.Item>
                    <Sheet variant="outlined" color="neutral" className="p-4 text-center">
                      1
                    </Sheet>
                  </Grid.Item>
                  <Grid.Item>
                    <Sheet variant="outlined" color="neutral" className="p-4 text-center">
                      2
                    </Sheet>
                  </Grid.Item>
                  <Grid.Item>
                    <Sheet variant="outlined" color="neutral" className="p-4 text-center">
                      3
                    </Sheet>
                  </Grid.Item>
                </Grid>
              </div>
            </div>
          </div>

          <div>
            <Heading level={3}>Card Layout</Heading>
            <Text variant="muted" className="mb-3">
              Use Grid for card-based layouts.
            </Text>
            <Grid columns={3} gap={4}>
              <Grid.Item>
                <Sheet variant="outlined" color="neutral">
                  <div className="p-4">
                    <Heading level={4}>Card Title</Heading>
                    <Text variant="muted">Card content goes here.</Text>
                  </div>
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="outlined" color="neutral">
                  <div className="p-4">
                    <Heading level={4}>Card Title</Heading>
                    <Text variant="muted">Card content goes here.</Text>
                  </div>
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="outlined" color="neutral">
                  <div className="p-4">
                    <Heading level={4}>Card Title</Heading>
                    <Text variant="muted">Card content goes here.</Text>
                  </div>
                </Sheet>
              </Grid.Item>
              <Grid.Item span={3}>
                <Sheet variant="outlined" color="neutral">
                  <div className="p-4">
                    <Heading level={4}>Featured Card</Heading>
                    <Text variant="muted">
                      This card spans the full width of the grid.
                    </Text>
                  </div>
                </Sheet>
              </Grid.Item>
            </Grid>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Grid</Heading>
            <PropsTable props={componentProps.Grid} />
          </div>
          <div>
            <Heading level={3}>Grid.Item</Heading>
            <PropsTable props={gridItemProps} />
          </div>
        </div>
      </Section>
    </div>
  );
}
