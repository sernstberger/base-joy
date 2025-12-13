import { Typography, Accordion } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { Size, Variant, ColorScale } from '@base-joy/tokens';

const accordionControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'plain' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const accordionCodeTemplate = (props: Record<string, string>) =>
  `<Accordion.Root variant="${props.variant}" color="${props.color}" size="${props.size}">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Section 1</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content for section 1</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`;

const rootProps: PropMeta[] = [
  {
    name: 'defaultValue',
    type: 'string[]',
    description: 'The values of initially expanded items (uncontrolled).',
    required: false,
  },
  {
    name: 'value',
    type: 'string[]',
    description: 'The values of expanded items (controlled).',
    required: false,
  },
  {
    name: 'onValueChange',
    type: '(value: string[]) => void',
    description: 'Callback when expanded items change.',
    required: false,
  },
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    defaultValue: "'plain'",
    description: 'The visual style of the accordion.',
    required: false,
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    defaultValue: "'neutral'",
    description: 'The color scheme of the accordion.',
    required: false,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'The size of accordion items.',
    required: false,
  },
  {
    name: 'spacing',
    type: "'none' | 'sm' | 'md' | 'lg'",
    defaultValue: "'none'",
    description: 'The spacing between accordion items.',
    required: false,
  },
];

const itemProps: PropMeta[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Unique identifier for the accordion item.',
    required: true,
  },
  {
    name: 'bordered',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether to show a bottom border.',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the item is disabled.',
    required: false,
  },
];

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'default-expanded', title: 'Default Expanded', level: 3 },
  { id: 'bordered', title: 'With Borders', level: 3 },
  { id: 'spacing', title: 'Spacing', level: 3 },
  { id: 'disabled', title: 'Disabled Items', level: 3 },
  { id: 'faq', title: 'FAQ Example', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function AccordionPage() {
  return (
    <div>
      <ComponentHeader
        title="Accordion"
        description="A vertically stacked set of interactive headings that reveal or hide associated sections of content."
        baseUiUrl="https://base-ui.com/react/components/accordion"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={accordionControls} codeTemplate={accordionCodeTemplate}>
              {(props) => (
                <div className="w-full max-w-md">
                  <Accordion.Root
                    variant={props.variant as Variant}
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    defaultValue={['item-1']}
                  >
                    <Accordion.Item value="item-1">
                      <Accordion.Header>
                        <Accordion.Trigger>What is Base Joy?</Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Panel>
                        <div className="pb-4 pt-0 px-3">
                          Base Joy is a design system that styles Base UI components with Joy
                          UI-inspired aesthetics.
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="item-2">
                      <Accordion.Header>
                        <Accordion.Trigger>How do I get started?</Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Panel>
                        <div className="pb-4 pt-0 px-3">
                          Install the package with npm or yarn and import the components you
                          need.
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="item-3">
                      <Accordion.Header>
                        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Panel>
                        <div className="pb-4 pt-0 px-3">
                          Yes! Base Joy is built on Base UI which provides fully accessible
                          components following WAI-ARIA guidelines.
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion.Root>
                </div>
              )}
            </Playground>
          </Section>

      <Section title="Examples" id="examples">
        <div className="space-y-8">
          <Section
            title="Variants"
            titleLevel="h3"
            id="variants"
            code={`<Accordion.Root variant="solid" color="primary">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Solid</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Solid variant content</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>

<Accordion.Root variant="soft" color="primary">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Soft</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Soft variant content</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>

<Accordion.Root variant="outlined" color="primary">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Outlined</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Outlined variant content</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>

<Accordion.Root variant="plain" color="primary">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Plain</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Plain variant content</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`}
            codeLanguage="tsx"
          >
            <div className="space-y-4">
              <div className="max-w-md">
                <Accordion.Root variant="solid" color="primary" defaultValue={['item-1']}>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>Solid</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">Solid variant content</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="max-w-md">
                <Accordion.Root variant="soft" color="primary" defaultValue={['item-1']}>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>Soft</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">Soft variant content</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="max-w-md">
                <Accordion.Root variant="outlined" color="primary" defaultValue={['item-1']}>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>Outlined</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">Outlined variant content</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="max-w-md">
                <Accordion.Root variant="plain" color="primary" defaultValue={['item-1']}>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>Plain</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">Plain variant content</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            </div>
          </Section>

          <Section
            title="Colors"
            titleLevel="h3"
            id="colors"
            code={`<Accordion.Root variant="soft" color="primary">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Primary</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Primary color content</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>

<Accordion.Root variant="soft" color="neutral">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Neutral</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Neutral color content</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>

<Accordion.Root variant="soft" color="success">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Success</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Success color content</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>

<Accordion.Root variant="soft" color="warning">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Warning</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Warning color content</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>

<Accordion.Root variant="soft" color="danger">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Danger</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Danger color content</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`}
            codeLanguage="tsx"
          >
            <div className="space-y-4">
              <div className="max-w-md">
                <Accordion.Root variant="soft" color="primary" defaultValue={['item-1']}>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>Primary</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">Primary color content</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="max-w-md">
                <Accordion.Root variant="soft" color="neutral" defaultValue={['item-1']}>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>Neutral</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">Neutral color content</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="max-w-md">
                <Accordion.Root variant="soft" color="success" defaultValue={['item-1']}>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>Success</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">Success color content</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="max-w-md">
                <Accordion.Root variant="soft" color="warning" defaultValue={['item-1']}>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>Warning</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">Warning color content</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="max-w-md">
                <Accordion.Root variant="soft" color="danger" defaultValue={['item-1']}>
                  <Accordion.Item value="item-1">
                    <Accordion.Header>
                      <Accordion.Trigger>Danger</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">Danger color content</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            </div>
          </Section>

          <Section
            title="Sizes"
            titleLevel="h3"
            id="sizes"
            code={`<Accordion.Root size="sm" defaultValue={['sm']}>
  <Accordion.Item value="sm" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Small accordion</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-3 pt-0 px-2">
        Content with small text size.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>

<Accordion.Root size="md" defaultValue={['md']}>
  <Accordion.Item value="md" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Medium accordion</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">
        Content with medium text size.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>

<Accordion.Root size="lg" defaultValue={['lg']}>
  <Accordion.Item value="lg" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Large accordion</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-5 pt-0 px-4">
        Content with large text size.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`}
            codeLanguage="tsx"
          >
            <div className="space-y-6">
              <div className="max-w-md">
                <Typography level="body-sm" className="mb-2">
                  Small
                </Typography>
                <Accordion.Root size="sm" defaultValue={['sm']}>
                  <Accordion.Item value="sm" bordered>
                    <Accordion.Header>
                      <Accordion.Trigger>Small accordion</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-3 pt-0 px-2">
                        Content with small text size.
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="max-w-md">
                <Typography level="body-sm" className="mb-2">
                  Medium (default)
                </Typography>
                <Accordion.Root size="md" defaultValue={['md']}>
                  <Accordion.Item value="md" bordered>
                    <Accordion.Header>
                      <Accordion.Trigger>Medium accordion</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-4 pt-0 px-3">
                        Content with medium text size.
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="max-w-md">
                <Typography level="body-sm" className="mb-2">
                  Large
                </Typography>
                <Accordion.Root size="lg" defaultValue={['lg']}>
                  <Accordion.Item value="lg" bordered>
                    <Accordion.Header>
                      <Accordion.Trigger>Large accordion</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <div className="pb-5 pt-0 px-4">
                        Content with large text size.
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            </div>
          </Section>

          <Section
            title="Default Expanded"
            titleLevel="h3"
            id="default-expanded"
            code={`<Accordion.Root defaultValue={['faq-1', 'faq-2']}>
  <Accordion.Item value="faq-1" bordered>
    <Accordion.Header>
      <Accordion.Trigger>First question (expanded)</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">
        This panel is expanded by default.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="faq-2" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Second question (expanded)</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">
        This panel is also expanded by default.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="faq-3" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Third question (collapsed)</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">
        This panel starts collapsed.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`}
            codeLanguage="tsx"
          >
            <Typography level="body-sm" className="mb-4">
              Use <code className="font-mono text-sm">defaultValue</code> to set
              initially expanded items.
            </Typography>
            <div className="max-w-md">
              <Accordion.Root defaultValue={['faq-1', 'faq-2']}>
                <Accordion.Item value="faq-1" bordered>
                  <Accordion.Header>
                    <Accordion.Trigger>First question (expanded)</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">
                      This panel is expanded by default.
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="faq-2" bordered>
                  <Accordion.Header>
                    <Accordion.Trigger>Second question (expanded)</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">
                      This panel is also expanded by default.
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="faq-3" bordered>
                  <Accordion.Header>
                    <Accordion.Trigger>Third question (collapsed)</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">
                      This panel starts collapsed.
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </Section>

          <Section
            title="With Borders"
            titleLevel="h3"
            id="bordered"
            code={`<Accordion.Root>
  <Accordion.Item value="item-1" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Account Settings</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">
        Manage your account settings and preferences.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-2" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Privacy & Security</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">
        Control your privacy settings and security options.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-3" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Notifications</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">
        Configure how and when you receive notifications.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`}
            codeLanguage="tsx"
          >
            <div className="max-w-md">
              <Accordion.Root>
                <Accordion.Item value="item-1" bordered>
                  <Accordion.Header>
                    <Accordion.Trigger>Account Settings</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">
                      Manage your account settings and preferences.
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item-2" bordered>
                  <Accordion.Header>
                    <Accordion.Trigger>Privacy & Security</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">
                      Control your privacy settings and security options.
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item-3" bordered>
                  <Accordion.Header>
                    <Accordion.Trigger>Notifications</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">
                      Configure how and when you receive notifications.
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </Section>

          <Section
            title="Spacing"
            titleLevel="h3"
            id="spacing"
            code={`<Accordion.Root spacing="sm">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Item 1</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Content for item 1</div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Header>
      <Accordion.Trigger>Item 2</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Content for item 2</div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Header>
      <Accordion.Trigger>Item 3</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">Content for item 3</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`}
            codeLanguage="tsx"
          >
            <Typography level="body-sm" className="mb-4">
              Use the <code className="font-mono text-sm">spacing</code> prop to add
              gaps between accordion items.
            </Typography>
            <div className="max-w-md">
              <Accordion.Root spacing="sm">
                <Accordion.Item value="item-1">
                  <Accordion.Header>
                    <Accordion.Trigger>Item 1</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">Content for item 1</div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                  <Accordion.Header>
                    <Accordion.Trigger>Item 2</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">Content for item 2</div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item-3">
                  <Accordion.Header>
                    <Accordion.Trigger>Item 3</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">Content for item 3</div>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </Section>

          <Section
            title="Disabled Items"
            titleLevel="h3"
            id="disabled"
            code={`<Accordion.Root>
  <Accordion.Item value="item-1" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Enabled Item</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">This item is enabled</div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-2" disabled bordered>
    <Accordion.Header>
      <Accordion.Trigger>Disabled Item</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">This item is disabled</div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-3" bordered>
    <Accordion.Header>
      <Accordion.Trigger>Another Enabled Item</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3">This item is also enabled</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`}
            codeLanguage="tsx"
          >
            <Typography level="body-sm" className="mb-4">
              Use the <code className="font-mono text-sm">disabled</code> prop on
              Accordion.Item to prevent user interaction.
            </Typography>
            <div className="max-w-md">
              <Accordion.Root>
                <Accordion.Item value="item-1" bordered>
                  <Accordion.Header>
                    <Accordion.Trigger>Enabled Item</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">This item is enabled</div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item-2" disabled bordered>
                  <Accordion.Header>
                    <Accordion.Trigger>Disabled Item</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">This item is disabled</div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item-3" bordered>
                  <Accordion.Header>
                    <Accordion.Trigger>Another Enabled Item</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3">This item is also enabled</div>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </Section>

          <Section
            title="FAQ Example"
            titleLevel="h3"
            id="faq"
            code={`<Accordion.Root spacing="sm">
  <Accordion.Item value="faq-1">
    <Accordion.Header>
      <Accordion.Trigger>How do I cancel my subscription?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3 text-neutral-600">
        You can cancel your subscription at any time from your account
        settings. Navigate to Settings → Subscription → Cancel Plan.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="faq-2">
    <Accordion.Header>
      <Accordion.Trigger>Can I get a refund?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3 text-neutral-600">
        We offer a 30-day money-back guarantee. If you're not satisfied,
        contact our support team for a full refund.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="faq-3">
    <Accordion.Header>
      <Accordion.Trigger>Do you offer team plans?</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>
      <div className="pb-4 pt-0 px-3 text-neutral-600">
        Yes! We have team plans starting at 5 seats. Contact sales for
        custom enterprise pricing.
      </div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`}
            codeLanguage="tsx"
          >
            <div className="max-w-md">
              <Accordion.Root spacing="sm">
                <Accordion.Item value="faq-1">
                  <Accordion.Header>
                    <Accordion.Trigger>How do I cancel my subscription?</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3 text-neutral-600">
                      You can cancel your subscription at any time from your account
                      settings. Navigate to Settings → Subscription → Cancel Plan.
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="faq-2">
                  <Accordion.Header>
                    <Accordion.Trigger>Can I get a refund?</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3 text-neutral-600">
                      We offer a 30-day money-back guarantee. If you're not satisfied,
                      contact our support team for a full refund.
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="faq-3">
                  <Accordion.Header>
                    <Accordion.Trigger>Do you offer team plans?</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div className="pb-4 pt-0 px-3 text-neutral-600">
                      Yes! We have team plans starting at 5 seats. Contact sales for
                      custom enterprise pricing.
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </Section>
        </div>
      </Section>

      <Section title="API Reference" id="api">
        <div className="space-y-8">
          <div>
            <Typography level="h3" className="mb-4">
              Accordion.Root
            </Typography>
            <PropsTable props={rootProps} />
          </div>
          <div>
            <Typography level="h3" className="mb-4">
              Accordion.Item
            </Typography>
            <PropsTable props={itemProps} />
          </div>
        </div>
      </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
