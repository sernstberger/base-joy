import { Grid, Sheet, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { GridColumns, GridGap } from '@base-joy/ui-styled';

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

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'basic-grid', title: 'Basic Grid', level: 3 },
  { id: 'spanning-items', title: 'Spanning Items', level: 3 },
  { id: 'full-width-item', title: 'Full Width Item', level: 3 },
  { id: 'different-columns', title: 'Different Column Counts', level: 3 },
  { id: 'gap-variations', title: 'Gap Variations', level: 3 },
  { id: 'card-layout', title: 'Card Layout', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function GridPage() {
  return (
    <div>
      <ComponentHeader
        title="Grid"
        description="A responsive grid layout system with configurable columns and gaps."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
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

      <Section title="Examples" id="examples">
        <div className="space-y-8">
          <Section
            title="Basic Grid"
            titleLevel="h3"
            id="basic-grid"
            code={`<Grid columns={3} gap={4}>
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
</Grid>`}
            codeLanguage="tsx"
          >
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
          </Section>

          <Section
            title="Spanning Items"
            titleLevel="h3"
            id="spanning-items"
            code={`<Grid columns={4} gap={4}>
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
</Grid>`}
            codeLanguage="tsx"
          >
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
          </Section>

          <Section
            title="Full Width Item"
            titleLevel="h3"
            id="full-width-item"
            code={`<Grid columns={3} gap={4}>
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
</Grid>`}
            codeLanguage="tsx"
          >
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
          </Section>

          <Section
            title="Different Column Counts"
            titleLevel="h3"
            id="different-columns"
            code={`// 2 Columns
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

// 6 Columns
<Grid columns={6} gap={2}>
  {Array.from({ length: 6 }, (_, i) => (
    <Grid.Item key={i}>
      <Sheet variant="outlined" color="neutral" className="p-3 text-center text-sm">
        {i + 1}
      </Sheet>
    </Grid.Item>
  ))}
</Grid>

// 12 Columns
<Grid columns={12} gap={1}>
  {Array.from({ length: 12 }, (_, i) => (
    <Grid.Item key={i}>
      <Sheet variant="outlined" color="neutral" className="p-2 text-center text-xs">
        {i + 1}
      </Sheet>
    </Grid.Item>
  ))}
</Grid>`}
            codeLanguage="tsx"
          >
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
          </Section>

          <Section
            title="Gap Variations"
            titleLevel="h3"
            id="gap-variations"
            code={`// No Gap
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

// Large Gap
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
</Grid>`}
            codeLanguage="tsx"
          >
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
          </Section>

          <Section
            title="Card Layout"
            titleLevel="h3"
            id="card-layout"
            code={`<Grid columns={3} gap={4}>
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
</Grid>`}
            codeLanguage="tsx"
          >
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
          </Section>
        </div>
      </Section>

      <Section title="API Reference" id="api">
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
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
