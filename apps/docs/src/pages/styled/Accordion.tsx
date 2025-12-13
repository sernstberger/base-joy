import { Typography, Accordion } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import type { Size } from '@base-joy/tokens';

const accordionControls: PlaygroundControl[] = [
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const accordionCodeTemplate = (props: Record<string, string>) =>
  `<Accordion.Root size="${props.size}">
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

export function AccordionPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Accordion"
        description="A vertically stacked set of interactive headings that reveal or hide associated sections of content."
        baseUiUrl="https://base-ui.com/react/components/accordion"
      />

      <Section title="Playground" id="playground">
        <Playground controls={accordionControls} codeTemplate={accordionCodeTemplate}>
          {(props) => (
            <div className="w-full max-w-md">
              <Accordion.Root size={props.size as Size} defaultValue={['item-1']}>
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
          <Section title="Default Expanded" titleLevel="h3" id="default-expanded">
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

          <Section title="With Borders" titleLevel="h3" id="bordered">
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

          <Section title="Sizes" titleLevel="h3" id="sizes">
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

          <Section title="FAQ Example" titleLevel="h3" id="faq">
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
  );
}
