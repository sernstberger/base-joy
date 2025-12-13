import {
  Typography,
  List,
  ListItem,
  ListSubheader,
  ItemContent,
  ItemStart,
  ItemEnd,
  Badge,
  type Marker,
} from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import type { Size, Variant, ColorScale } from '@base-joy/tokens';

const listControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'plain' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  {
    name: 'marker',
    type: 'select',
    options: ['none', 'disc', 'circle', 'decimal'],
    defaultValue: 'none',
  },
];

const listCodeTemplate = (props: Record<string, string>) =>
  `<List variant="${props.variant}" color="${props.color}" size="${props.size}" marker="${props.marker}" spacing="sm">
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</List>`;

const listProps: PropMeta[] = [
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    defaultValue: "'plain'",
    description: 'The visual style applied to child ListItems.',
    required: false,
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    defaultValue: "'neutral'",
    description: 'The color scheme applied to child ListItems.',
    required: false,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'The size applied to child ListItems.',
    required: false,
  },
  {
    name: 'spacing',
    type: "'none' | 'sm' | 'md' | 'lg'",
    defaultValue: "'none'",
    description: 'The spacing between list items.',
    required: false,
  },
  {
    name: 'marker',
    type: "'none' | 'disc' | 'circle' | 'decimal'",
    defaultValue: "'none'",
    description:
      "The marker style for list items. When set to 'decimal', renders as an ordered list (<ol>).",
    required: false,
  },
];

const listItemProps: PropMeta[] = [
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    description: 'The visual style. Inherits from List if not specified.',
    required: false,
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    description: 'The color scheme. Inherits from List if not specified.',
    required: false,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    description: 'The size. Inherits from List if not specified.',
    required: false,
  },
  {
    name: 'interactive',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the item is interactive (hoverable/clickable).',
    required: false,
  },
  {
    name: 'selected',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the item is selected.',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the item is disabled.',
    required: false,
  },
  {
    name: 'render',
    type: 'React.ReactElement',
    description: 'Render prop for polymorphism (e.g., render as a link).',
    required: false,
  },
];

const listSubheaderProps: PropMeta[] = [
  {
    name: 'sticky',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the subheader sticks to the top when scrolling.',
    required: false,
  },
];

export function ListPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="List"
        description="A container for rendering semantic lists with ListItem and ListSubheader components. ListItem wraps the Item component for consistent styling."
      />

      <Section title="Playground" id="playground">
        <Playground controls={listControls} codeTemplate={listCodeTemplate}>
          {(props) => {
            const marker = props.marker as Marker;
            const hasMarker = marker !== 'none';
            return (
              <div className="w-full max-w-md">
                <List
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  marker={marker}
                  spacing="sm"
                >
                  {hasMarker ? (
                    <>
                      <ListItem>First item</ListItem>
                      <ListItem>Second item</ListItem>
                      <ListItem>Third item</ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem interactive>
                        <ItemContent>First item</ItemContent>
                      </ListItem>
                      <ListItem interactive>
                        <ItemContent>Second item</ItemContent>
                      </ListItem>
                      <ListItem interactive>
                        <ItemContent>Third item</ItemContent>
                      </ListItem>
                    </>
                  )}
                </List>
              </div>
            );
          }}
        </Playground>
      </Section>

      <Section title="Examples" id="examples">
        <div className="space-y-8">
          <Section title="Basic List" titleLevel="h3" id="basic">
            <div className="max-w-md">
              <List spacing="sm">
                <ListItem>
                  <ItemContent>Apple</ItemContent>
                </ListItem>
                <ListItem>
                  <ItemContent>Banana</ItemContent>
                </ListItem>
                <ListItem>
                  <ItemContent>Cherry</ItemContent>
                </ListItem>
              </List>
            </div>
          </Section>

          <Section title="With Subheader" titleLevel="h3" id="subheader">
            <div className="max-w-md">
              <List spacing="sm">
                <ListSubheader>Fruits</ListSubheader>
                <ListItem>
                  <ItemContent>Apple</ItemContent>
                </ListItem>
                <ListItem>
                  <ItemContent>Banana</ItemContent>
                </ListItem>
                <ListSubheader>Vegetables</ListSubheader>
                <ListItem>
                  <ItemContent>Carrot</ItemContent>
                </ListItem>
                <ListItem>
                  <ItemContent>Broccoli</ItemContent>
                </ListItem>
              </List>
            </div>
          </Section>

          <Section title="Interactive Items" titleLevel="h3" id="interactive">
            <div className="max-w-md">
              <List spacing="sm" variant="soft" color="primary">
                <ListItem interactive>
                  <ItemStart>📁</ItemStart>
                  <ItemContent>Documents</ItemContent>
                  <ItemEnd>→</ItemEnd>
                </ListItem>
                <ListItem interactive>
                  <ItemStart>🖼️</ItemStart>
                  <ItemContent>Pictures</ItemContent>
                  <ItemEnd>→</ItemEnd>
                </ListItem>
                <ListItem interactive selected>
                  <ItemStart>🎵</ItemStart>
                  <ItemContent>Music (Selected)</ItemContent>
                  <ItemEnd>✓</ItemEnd>
                </ListItem>
                <ListItem interactive disabled>
                  <ItemStart>🔒</ItemStart>
                  <ItemContent>Private (Disabled)</ItemContent>
                </ListItem>
              </List>
            </div>
          </Section>

          <Section title="With Badges" titleLevel="h3" id="badges">
            <div className="max-w-md">
              <List spacing="sm">
                <ListItem interactive>
                  <ItemContent>Inbox</ItemContent>
                  <ItemEnd>
                    <Badge variant="solid" color="primary" size="sm">
                      12
                    </Badge>
                  </ItemEnd>
                </ListItem>
                <ListItem interactive>
                  <ItemContent>Drafts</ItemContent>
                  <ItemEnd>
                    <Badge variant="soft" color="neutral" size="sm">
                      3
                    </Badge>
                  </ItemEnd>
                </ListItem>
                <ListItem interactive>
                  <ItemContent>Sent</ItemContent>
                </ListItem>
                <ListItem interactive disabled>
                  <ItemContent>Spam</ItemContent>
                  <ItemEnd>
                    <Badge variant="soft" color="danger" size="sm">
                      99+
                    </Badge>
                  </ItemEnd>
                </ListItem>
              </List>
            </div>
          </Section>

          <Section title="Render as Link" titleLevel="h3" id="links">
            <Typography level="body-sm" className="mb-4">
              Use the <code className="font-mono text-sm">render</code> prop to
              render ListItems as links or other elements.
            </Typography>
            <div className="max-w-md">
              <List spacing="sm">
                <ListItem interactive render={<a href="#home" />}>
                  <ItemContent>Home</ItemContent>
                </ListItem>
                <ListItem interactive render={<a href="#about" />}>
                  <ItemContent>About</ItemContent>
                </ListItem>
                <ListItem interactive render={<a href="#contact" />}>
                  <ItemContent>Contact</ItemContent>
                </ListItem>
              </List>
            </div>
          </Section>

          <Section title="Sizes" titleLevel="h3" id="sizes">
            <div className="space-y-4">
              <div className="max-w-md">
                <Typography level="body-sm" className="mb-2">
                  Small
                </Typography>
                <List size="sm" spacing="sm" variant="outlined">
                  <ListItem>
                    <ItemContent>Small item</ItemContent>
                  </ListItem>
                </List>
              </div>
              <div className="max-w-md">
                <Typography level="body-sm" className="mb-2">
                  Medium (default)
                </Typography>
                <List size="md" spacing="sm" variant="outlined">
                  <ListItem>
                    <ItemContent>Medium item</ItemContent>
                  </ListItem>
                </List>
              </div>
              <div className="max-w-md">
                <Typography level="body-sm" className="mb-2">
                  Large
                </Typography>
                <List size="lg" spacing="sm" variant="outlined">
                  <ListItem>
                    <ItemContent>Large item</ItemContent>
                  </ListItem>
                </List>
              </div>
            </div>
          </Section>

          <Section
            title="Markers"
            titleLevel="h3"
            id="markers"
            code={`{/* Bullet list (disc) */}
<List marker="disc" spacing="sm">
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
</List>

{/* Circle markers */}
<List marker="circle" spacing="sm">
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
</List>

{/* Numbered list (renders as <ol>) */}
<List marker="decimal" spacing="sm">
  <ListItem>First step</ListItem>
  <ListItem>Second step</ListItem>
</List>`}
          >
            <Typography level="body-sm" className="mb-4">
              Use the <code className="font-mono text-sm">marker</code> prop to
              display list markers. When set to{' '}
              <code className="font-mono text-sm">decimal</code>, the List
              renders as an ordered list (<code className="font-mono text-sm">&lt;ol&gt;</code>).
              Marker lists render children directly (without Item wrapper) for proper alignment.
            </Typography>
            <div className="space-y-6">
              <div className="max-w-md">
                <Typography level="body-sm" weight="medium" className="mb-2">
                  Disc (bullet points)
                </Typography>
                <List marker="disc" spacing="sm">
                  <ListItem>Customize color scales</ListItem>
                  <ListItem>Adjust typography tokens</ListItem>
                  <ListItem>Switch themes at runtime</ListItem>
                </List>
              </div>
              <div className="max-w-md">
                <Typography level="body-sm" weight="medium" className="mb-2">
                  Circle
                </Typography>
                <List marker="circle" spacing="sm">
                  <ListItem>First option</ListItem>
                  <ListItem>Second option</ListItem>
                </List>
              </div>
              <div className="max-w-md">
                <Typography level="body-sm" weight="medium" className="mb-2">
                  Decimal (ordered list)
                </Typography>
                <List marker="decimal" spacing="sm">
                  <ListItem>Set up the ThemeProvider</ListItem>
                  <ListItem>Customize your color palette</ListItem>
                  <ListItem>Apply the theme to your app</ListItem>
                </List>
              </div>
            </div>
          </Section>
        </div>
      </Section>

      <Section title="API Reference" id="api">
        <div className="space-y-8">
          <div>
            <Typography level="h3" className="mb-4">
              List
            </Typography>
            <PropsTable props={listProps} />
          </div>
          <div>
            <Typography level="h3" className="mb-4">
              ListItem
            </Typography>
            <PropsTable props={listItemProps} />
          </div>
          <div>
            <Typography level="h3" className="mb-4">
              ListSubheader
            </Typography>
            <PropsTable props={listSubheaderProps} />
          </div>
        </div>
      </Section>
    </div>
  );
}
