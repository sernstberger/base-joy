import { Toolbar, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const toolbarControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const toolbarCodeTemplate = (props: Record<string, string>) =>
  `<Toolbar.Root variant="${props.variant}" color="${props.color}" size="${props.size}" aria-label="Actions">
  <Toolbar.Button>Bold</Toolbar.Button>
  <Toolbar.Button>Italic</Toolbar.Button>
  <Toolbar.Button>Underline</Toolbar.Button>
</Toolbar.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'with-separators', title: 'With Separators', level: 3 },
  { id: 'with-groups', title: 'With Groups', level: 3 },
  { id: 'with-links', title: 'With Links', level: 3 },
  { id: 'vertical-orientation', title: 'Vertical Orientation', level: 3 },
  { id: 'custom-styling', title: 'Custom Styling', level: 3 },
  { id: 'api', title: 'API Reference' },
];

// Manual props definitions since we have multiple components
const toolbarRootProps: PropMeta[] = [
  {
    name: 'variant',
    type: 'Variant',
    required: false,
    defaultValue: "'outlined'",
    description: 'The visual style of the toolbar.',
  },
  {
    name: 'color',
    type: 'ColorScale',
    required: false,
    defaultValue: "'neutral'",
    description: 'The color scheme of the toolbar.',
  },
  {
    name: 'size',
    type: 'Size',
    required: false,
    defaultValue: "'md'",
    description: 'The size of the toolbar.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    required: false,
    defaultValue: "'horizontal'",
    description: 'The orientation of the toolbar.',
  },
];

const toolbarButtonProps: PropMeta[] = [
  {
    name: 'variant',
    type: 'Variant',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The visual style of the button.',
  },
  {
    name: 'color',
    type: 'ColorScale',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The color scheme of the button.',
  },
  {
    name: 'size',
    type: 'Size',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The size of the button.',
  },
];

const toolbarLinkProps: PropMeta[] = [
  {
    name: 'variant',
    type: 'Variant',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The visual style of the link.',
  },
  {
    name: 'color',
    type: 'ColorScale',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The color scheme of the link.',
  },
  {
    name: 'size',
    type: 'Size',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The size of the link.',
  },
  {
    name: 'href',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'The URL for the link.',
  },
];

const toolbarSeparatorProps: PropMeta[] = [
  {
    name: 'color',
    type: 'ColorScale',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The color scheme of the separator.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    required: false,
    defaultValue: "'horizontal'",
    description: 'The orientation of the separator.',
  },
];

const toolbarGroupProps: PropMeta[] = [
  {
    name: 'variant',
    type: 'Variant',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The visual style for buttons in the group.',
  },
  {
    name: 'color',
    type: 'ColorScale',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The color scheme for buttons in the group.',
  },
  {
    name: 'size',
    type: 'Size',
    required: false,
    defaultValue: 'Inherited from Toolbar.Root',
    description: 'The size for buttons in the group.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    required: false,
    defaultValue: "'horizontal'",
    description: 'The orientation of the group.',
  },
];

export function ToolbarPage() {
  return (
    <div>
      <ComponentHeader
        title="Toolbar"
        description="A container for grouping a set of related controls, like buttons and links, in a horizontal or vertical layout. Built on Base UI's Toolbar component with Joy UI-inspired styling."
        baseUiUrl="https://base-ui.com/react/components/toolbar"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={toolbarControls}
              codeTemplate={toolbarCodeTemplate}
            >
              {(props) => (
                <Toolbar.Root
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  aria-label="Text formatting"
                >
                  <Toolbar.Button>Bold</Toolbar.Button>
                  <Toolbar.Button>Italic</Toolbar.Button>
                  <Toolbar.Button>Underline</Toolbar.Button>
                </Toolbar.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Toolbar.Root variant="solid" color="primary" aria-label="Actions">
  <Toolbar.Button>Action 1</Toolbar.Button>
  <Toolbar.Button>Action 2</Toolbar.Button>
  <Toolbar.Button>Action 3</Toolbar.Button>
</Toolbar.Root>

<Toolbar.Root variant="soft" color="primary" aria-label="Actions">
  <Toolbar.Button>Action 1</Toolbar.Button>
  <Toolbar.Button>Action 2</Toolbar.Button>
  <Toolbar.Button>Action 3</Toolbar.Button>
</Toolbar.Root>

<Toolbar.Root variant="outlined" color="primary" aria-label="Actions">
  <Toolbar.Button>Action 1</Toolbar.Button>
  <Toolbar.Button>Action 2</Toolbar.Button>
  <Toolbar.Button>Action 3</Toolbar.Button>
</Toolbar.Root>

<Toolbar.Root variant="plain" color="primary" aria-label="Actions">
  <Toolbar.Button>Action 1</Toolbar.Button>
  <Toolbar.Button>Action 2</Toolbar.Button>
  <Toolbar.Button>Action 3</Toolbar.Button>
</Toolbar.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Toolbar.Root variant="solid" color="primary" aria-label="Actions">
                    <Toolbar.Button>Action 1</Toolbar.Button>
                    <Toolbar.Button>Action 2</Toolbar.Button>
                    <Toolbar.Button>Action 3</Toolbar.Button>
                  </Toolbar.Root>
                  <Toolbar.Root variant="soft" color="primary" aria-label="Actions">
                    <Toolbar.Button>Action 1</Toolbar.Button>
                    <Toolbar.Button>Action 2</Toolbar.Button>
                    <Toolbar.Button>Action 3</Toolbar.Button>
                  </Toolbar.Root>
                  <Toolbar.Root variant="outlined" color="primary" aria-label="Actions">
                    <Toolbar.Button>Action 1</Toolbar.Button>
                    <Toolbar.Button>Action 2</Toolbar.Button>
                    <Toolbar.Button>Action 3</Toolbar.Button>
                  </Toolbar.Root>
                  <Toolbar.Root variant="plain" color="primary" aria-label="Actions">
                    <Toolbar.Button>Action 1</Toolbar.Button>
                    <Toolbar.Button>Action 2</Toolbar.Button>
                    <Toolbar.Button>Action 3</Toolbar.Button>
                  </Toolbar.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Toolbar.Root variant="soft" color="primary" aria-label="Actions">
  <Toolbar.Button>Primary</Toolbar.Button>
  <Toolbar.Button>Button</Toolbar.Button>
</Toolbar.Root>

<Toolbar.Root variant="soft" color="neutral" aria-label="Actions">
  <Toolbar.Button>Neutral</Toolbar.Button>
  <Toolbar.Button>Button</Toolbar.Button>
</Toolbar.Root>

<Toolbar.Root variant="soft" color="success" aria-label="Actions">
  <Toolbar.Button>Success</Toolbar.Button>
  <Toolbar.Button>Button</Toolbar.Button>
</Toolbar.Root>

<Toolbar.Root variant="soft" color="warning" aria-label="Actions">
  <Toolbar.Button>Warning</Toolbar.Button>
  <Toolbar.Button>Button</Toolbar.Button>
</Toolbar.Root>

<Toolbar.Root variant="soft" color="danger" aria-label="Actions">
  <Toolbar.Button>Danger</Toolbar.Button>
  <Toolbar.Button>Button</Toolbar.Button>
</Toolbar.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Toolbar.Root variant="soft" color="primary" aria-label="Actions">
                    <Toolbar.Button>Primary</Toolbar.Button>
                    <Toolbar.Button>Button</Toolbar.Button>
                  </Toolbar.Root>
                  <Toolbar.Root variant="soft" color="neutral" aria-label="Actions">
                    <Toolbar.Button>Neutral</Toolbar.Button>
                    <Toolbar.Button>Button</Toolbar.Button>
                  </Toolbar.Root>
                  <Toolbar.Root variant="soft" color="success" aria-label="Actions">
                    <Toolbar.Button>Success</Toolbar.Button>
                    <Toolbar.Button>Button</Toolbar.Button>
                  </Toolbar.Root>
                  <Toolbar.Root variant="soft" color="warning" aria-label="Actions">
                    <Toolbar.Button>Warning</Toolbar.Button>
                    <Toolbar.Button>Button</Toolbar.Button>
                  </Toolbar.Root>
                  <Toolbar.Root variant="soft" color="danger" aria-label="Actions">
                    <Toolbar.Button>Danger</Toolbar.Button>
                    <Toolbar.Button>Button</Toolbar.Button>
                  </Toolbar.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Toolbar.Root size="sm" aria-label="Small toolbar">
  <Toolbar.Button>Small</Toolbar.Button>
  <Toolbar.Button>Toolbar</Toolbar.Button>
</Toolbar.Root>

<Toolbar.Root size="md" aria-label="Medium toolbar">
  <Toolbar.Button>Medium</Toolbar.Button>
  <Toolbar.Button>Toolbar</Toolbar.Button>
</Toolbar.Root>

<Toolbar.Root size="lg" aria-label="Large toolbar">
  <Toolbar.Button>Large</Toolbar.Button>
  <Toolbar.Button>Toolbar</Toolbar.Button>
</Toolbar.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Toolbar.Root size="sm" aria-label="Small toolbar">
                    <Toolbar.Button>Small</Toolbar.Button>
                    <Toolbar.Button>Toolbar</Toolbar.Button>
                  </Toolbar.Root>
                  <Toolbar.Root size="md" aria-label="Medium toolbar">
                    <Toolbar.Button>Medium</Toolbar.Button>
                    <Toolbar.Button>Toolbar</Toolbar.Button>
                  </Toolbar.Root>
                  <Toolbar.Root size="lg" aria-label="Large toolbar">
                    <Toolbar.Button>Large</Toolbar.Button>
                    <Toolbar.Button>Toolbar</Toolbar.Button>
                  </Toolbar.Root>
                </div>
              </Section>

              <Section
                title="With Separators"
                titleLevel="h3"
                id="with-separators"
                code={`<Toolbar.Root variant="outlined" aria-label="Text formatting">
  <Toolbar.Button>Bold</Toolbar.Button>
  <Toolbar.Button>Italic</Toolbar.Button>
  <Toolbar.Button>Underline</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button>Left</Toolbar.Button>
  <Toolbar.Button>Center</Toolbar.Button>
  <Toolbar.Button>Right</Toolbar.Button>
</Toolbar.Root>`}
                codeLanguage="tsx"
              >
                <Toolbar.Root variant="outlined" aria-label="Text formatting">
                  <Toolbar.Button>Bold</Toolbar.Button>
                  <Toolbar.Button>Italic</Toolbar.Button>
                  <Toolbar.Button>Underline</Toolbar.Button>
                  <Toolbar.Separator />
                  <Toolbar.Button>Left</Toolbar.Button>
                  <Toolbar.Button>Center</Toolbar.Button>
                  <Toolbar.Button>Right</Toolbar.Button>
                </Toolbar.Root>
              </Section>

              <Section
                title="With Groups"
                titleLevel="h3"
                id="with-groups"
                code={`<Toolbar.Root variant="outlined" aria-label="Formatting toolbar">
  <Toolbar.Group>
    <Toolbar.Button>Bold</Toolbar.Button>
    <Toolbar.Button>Italic</Toolbar.Button>
    <Toolbar.Button>Underline</Toolbar.Button>
  </Toolbar.Group>
  <Toolbar.Separator />
  <Toolbar.Group variant="soft" color="primary">
    <Toolbar.Button>Left</Toolbar.Button>
    <Toolbar.Button>Center</Toolbar.Button>
    <Toolbar.Button>Right</Toolbar.Button>
  </Toolbar.Group>
</Toolbar.Root>`}
                codeLanguage="tsx"
              >
                <Toolbar.Root variant="outlined" aria-label="Formatting toolbar">
                  <Toolbar.Group>
                    <Toolbar.Button>Bold</Toolbar.Button>
                    <Toolbar.Button>Italic</Toolbar.Button>
                    <Toolbar.Button>Underline</Toolbar.Button>
                  </Toolbar.Group>
                  <Toolbar.Separator />
                  <Toolbar.Group variant="soft" color="primary">
                    <Toolbar.Button>Left</Toolbar.Button>
                    <Toolbar.Button>Center</Toolbar.Button>
                    <Toolbar.Button>Right</Toolbar.Button>
                  </Toolbar.Group>
                </Toolbar.Root>
              </Section>

              <Section
                title="With Links"
                titleLevel="h3"
                id="with-links"
                code={`<Toolbar.Root variant="outlined" aria-label="Navigation">
  <Toolbar.Link href="#home">Home</Toolbar.Link>
  <Toolbar.Link href="#about">About</Toolbar.Link>
  <Toolbar.Link href="#contact">Contact</Toolbar.Link>
  <Toolbar.Separator />
  <Toolbar.Button>Login</Toolbar.Button>
</Toolbar.Root>`}
                codeLanguage="tsx"
              >
                <Toolbar.Root variant="outlined" aria-label="Navigation">
                  <Toolbar.Link href="#home">Home</Toolbar.Link>
                  <Toolbar.Link href="#about">About</Toolbar.Link>
                  <Toolbar.Link href="#contact">Contact</Toolbar.Link>
                  <Toolbar.Separator />
                  <Toolbar.Button>Login</Toolbar.Button>
                </Toolbar.Root>
              </Section>

              <Section
                title="Vertical Orientation"
                titleLevel="h3"
                id="vertical-orientation"
                code={`<Toolbar.Root
  variant="outlined"
  orientation="vertical"
  aria-label="Vertical toolbar"
>
  <Toolbar.Button>Cut</Toolbar.Button>
  <Toolbar.Button>Copy</Toolbar.Button>
  <Toolbar.Button>Paste</Toolbar.Button>
  <Toolbar.Separator orientation="vertical" />
  <Toolbar.Button>Undo</Toolbar.Button>
  <Toolbar.Button>Redo</Toolbar.Button>
</Toolbar.Root>`}
                codeLanguage="tsx"
              >
                <Toolbar.Root
                  variant="outlined"
                  orientation="vertical"
                  aria-label="Vertical toolbar"
                >
                  <Toolbar.Button>Cut</Toolbar.Button>
                  <Toolbar.Button>Copy</Toolbar.Button>
                  <Toolbar.Button>Paste</Toolbar.Button>
                  <Toolbar.Separator orientation="vertical" />
                  <Toolbar.Button>Undo</Toolbar.Button>
                  <Toolbar.Button>Redo</Toolbar.Button>
                </Toolbar.Root>
              </Section>

              <Section
                title="Custom Styling"
                titleLevel="h3"
                id="custom-styling"
                code={`<Toolbar.Root variant="soft" color="primary" aria-label="Custom toolbar">
  <Toolbar.Button className="rounded-full">
    Round
  </Toolbar.Button>
  <Toolbar.Button variant="solid">
    Override
  </Toolbar.Button>
  <Toolbar.Separator color="danger" />
  <Toolbar.Button color="success">
    Green
  </Toolbar.Button>
</Toolbar.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Individual buttons can override the toolbar's variant and color, or add custom classes.
                </Typography>
                <Toolbar.Root variant="soft" color="primary" aria-label="Custom toolbar">
                  <Toolbar.Button className="rounded-full">
                    Round
                  </Toolbar.Button>
                  <Toolbar.Button variant="solid">
                    Override
                  </Toolbar.Button>
                  <Toolbar.Separator color="danger" />
                  <Toolbar.Button color="success">
                    Green
                  </Toolbar.Button>
                </Toolbar.Root>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h4" className="mb-4">
                  Toolbar.Root
                </Typography>
                <PropsTable props={toolbarRootProps} />
              </div>

              <div>
                <Typography level="h4" className="mb-4">
                  Toolbar.Button
                </Typography>
                <PropsTable props={toolbarButtonProps} />
              </div>

              <div>
                <Typography level="h4" className="mb-4">
                  Toolbar.Link
                </Typography>
                <PropsTable props={toolbarLinkProps} />
              </div>

              <div>
                <Typography level="h4" className="mb-4">
                  Toolbar.Separator
                </Typography>
                <PropsTable props={toolbarSeparatorProps} />
              </div>

              <div>
                <Typography level="h4" className="mb-4">
                  Toolbar.Group
                </Typography>
                <PropsTable props={toolbarGroupProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
