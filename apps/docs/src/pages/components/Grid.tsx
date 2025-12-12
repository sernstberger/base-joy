import { Grid, Sheet, Typography } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
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
        <Typography level="h1">Grid</Typography>
        <Typography level="body-lg">
          A responsive grid layout system with configurable columns and gaps.
        </Typography>
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
            <Typography level="h3">Basic Grid</Typography>
            <Typography level="body-sm" className="mb-3">
              A simple 3-column grid with gap spacing.
            </Typography>
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
            <Typography level="h3">Spanning Items</Typography>
            <Typography level="body-sm" className="mb-3">
              Grid items can span multiple columns.
            </Typography>
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
            <Typography level="h3">Full Width Item</Typography>
            <Typography level="body-sm" className="mb-3">
              Use span="full" to make an item span all columns.
            </Typography>
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
            <Typography level="h3">Different Column Counts</Typography>
            <Typography level="body-sm" className="mb-3">
              Grids support 1-12 columns or auto.
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" className="mb-2">
                  2 Columns
                </Typography>
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
                <Typography level="body-sm" className="mb-2">
                  6 Columns
                </Typography>
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
                <Typography level="body-sm" className="mb-2">
                  12 Columns
                </Typography>
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
            <Typography level="h3">Gap Variations</Typography>
            <Typography level="body-sm" className="mb-3">
              Control spacing between grid items.
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" className="mb-2">
                  No Gap (gap=0)
                </Typography>
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
                <Typography level="body-sm" className="mb-2">
                  Large Gap (gap=8)
                </Typography>
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
            <Typography level="h3">Card Layout</Typography>
            <Typography level="body-sm" className="mb-3">
              Use Grid for card-based layouts.
            </Typography>
            <Grid columns={3} gap={4}>
              <Grid.Item>
                <Sheet variant="outlined" color="neutral">
                  <div className="p-4">
                    <Typography level="h4">Card Title</Typography>
                    <Typography level="body-sm">Card content goes here.</Typography>
                  </div>
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="outlined" color="neutral">
                  <div className="p-4">
                    <Typography level="h4">Card Title</Typography>
                    <Typography level="body-sm">Card content goes here.</Typography>
                  </div>
                </Sheet>
              </Grid.Item>
              <Grid.Item>
                <Sheet variant="outlined" color="neutral">
                  <div className="p-4">
                    <Typography level="h4">Card Title</Typography>
                    <Typography level="body-sm">Card content goes here.</Typography>
                  </div>
                </Sheet>
              </Grid.Item>
              <Grid.Item span={3}>
                <Sheet variant="outlined" color="neutral">
                  <div className="p-4">
                    <Typography level="h4">Featured Card</Typography>
                    <Typography level="body-sm">
                      This card spans the full width of the grid.
                    </Typography>
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
            <Typography level="h3">Grid</Typography>
            <PropsTable props={componentProps.Grid} />
          </div>
          <div>
            <Typography level="h3">Grid.Item</Typography>
            <PropsTable props={gridItemProps} />
          </div>
        </div>
      </Section>
    </div>
  );
}
