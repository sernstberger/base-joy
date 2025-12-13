import { CheckboxGroup, Typography } from '@base-joy/ui-styled';
import type { CheckboxOption } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';
import type { PropMeta } from '../../components/PropsTable';

const basicOptions: CheckboxOption[] = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: 'Push Notifications' },
];

const controls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  {
    name: 'orientation',
    type: 'select',
    options: ['vertical', 'horizontal'],
    defaultValue: 'vertical',
  },
];

const codeTemplate = (props: Record<string, string>) =>
  `<CheckboxGroup
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"
  orientation="${props.orientation}"
  options={[
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notifications' },
  ]}
/>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'horizontal', title: 'Horizontal Layout', level: 3 },
  { id: 'disabled-items', title: 'Disabled Items', level: 3 },
  { id: 'api', title: 'API Reference' },
];

const checkboxGroupProps: PropMeta[] = [
  {
    name: 'options',
    type: 'CheckboxOption[]',
    required: true,
    defaultValue: '-',
    description: 'The options to display. Each option has value, label, and optional disabled.',
  },
  {
    name: 'value',
    type: 'string[]',
    required: false,
    defaultValue: '-',
    description: 'The controlled values of the checkbox group.',
  },
  {
    name: 'defaultValue',
    type: 'string[]',
    required: false,
    defaultValue: '-',
    description: 'The default values for uncontrolled usage.',
  },
  {
    name: 'onValueChange',
    type: '(values: string[]) => void',
    required: false,
    defaultValue: '-',
    description: 'Callback fired when the values change.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    required: false,
    defaultValue: "'vertical'",
    description: 'The layout orientation of the checkbox group.',
  },
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    required: false,
    defaultValue: "'outlined'",
    description: 'The visual style of the checkboxes.',
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    required: false,
    defaultValue: "'primary'",
    description: 'The color scheme of the checkboxes.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    required: false,
    defaultValue: "'md'",
    description: 'The size of the checkboxes.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'Whether the entire checkbox group is disabled.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes for the root element.',
  },
];

export function CheckboxGroupPage() {
  return (
    <div>
      <ComponentHeader
        title="CheckboxGroup"
        description="A group of checkboxes for multi-selection from a list of options."
        baseUiUrl="https://base-ui.com/react/components/checkbox-group"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={controls} codeTemplate={codeTemplate}>
              {(props) => (
                <CheckboxGroup
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  orientation={props.orientation as 'horizontal' | 'vertical'}
                  defaultValue={['email']}
                  options={basicOptions}
                />
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<CheckboxGroup variant="solid" color="primary" options={options} />
<CheckboxGroup variant="soft" color="primary" options={options} />
<CheckboxGroup variant="outlined" color="primary" options={options} />
<CheckboxGroup variant="plain" color="primary" options={options} />`}
                codeLanguage="tsx"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography level="body-sm" className="mb-2">Solid</Typography>
                    <CheckboxGroup
                      variant="solid"
                      color="primary"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Soft</Typography>
                    <CheckboxGroup
                      variant="soft"
                      color="primary"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Outlined</Typography>
                    <CheckboxGroup
                      variant="outlined"
                      color="primary"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Plain</Typography>
                    <CheckboxGroup
                      variant="plain"
                      color="primary"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<CheckboxGroup color="primary" options={options} />
<CheckboxGroup color="neutral" options={options} />
<CheckboxGroup color="success" options={options} />
<CheckboxGroup color="warning" options={options} />
<CheckboxGroup color="danger" options={options} />`}
                codeLanguage="tsx"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Typography level="body-sm" className="mb-2">Primary</Typography>
                    <CheckboxGroup
                      color="primary"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Neutral</Typography>
                    <CheckboxGroup
                      color="neutral"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Success</Typography>
                    <CheckboxGroup
                      color="success"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Warning</Typography>
                    <CheckboxGroup
                      color="warning"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Danger</Typography>
                    <CheckboxGroup
                      color="danger"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<CheckboxGroup size="sm" options={options} />
<CheckboxGroup size="md" options={options} />
<CheckboxGroup size="lg" options={options} />`}
                codeLanguage="tsx"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Typography level="body-sm" className="mb-2">Small</Typography>
                    <CheckboxGroup
                      size="sm"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Medium</Typography>
                    <CheckboxGroup
                      size="md"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Large</Typography>
                    <CheckboxGroup
                      size="lg"
                      defaultValue={['email']}
                      options={basicOptions}
                    />
                  </div>
                </div>
              </Section>

              <Section
                title="Horizontal Layout"
                titleLevel="h3"
                id="horizontal"
                code={`<CheckboxGroup
  orientation="horizontal"
  options={[
    { value: 'mon', label: 'Mon' },
    { value: 'tue', label: 'Tue' },
    { value: 'wed', label: 'Wed' },
    { value: 'thu', label: 'Thu' },
    { value: 'fri', label: 'Fri' },
  ]}
/>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">orientation="horizontal"</code> for inline layouts.
                </Typography>
                <CheckboxGroup
                  orientation="horizontal"
                  defaultValue={['mon', 'wed', 'fri']}
                  options={[
                    { value: 'mon', label: 'Mon' },
                    { value: 'tue', label: 'Tue' },
                    { value: 'wed', label: 'Wed' },
                    { value: 'thu', label: 'Thu' },
                    { value: 'fri', label: 'Fri' },
                  ]}
                />
              </Section>

              <Section
                title="Disabled Items"
                titleLevel="h3"
                id="disabled-items"
                code={`<CheckboxGroup
  options={[
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Unavailable', disabled: true },
    { value: 'coming-soon', label: 'Coming Soon', disabled: true },
  ]}
/>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Add <code className="font-mono text-sm">disabled: true</code> to individual options.
                </Typography>
                <CheckboxGroup
                  defaultValue={['available']}
                  options={[
                    { value: 'available', label: 'Available' },
                    { value: 'unavailable', label: 'Unavailable', disabled: true },
                    { value: 'coming-soon', label: 'Coming Soon', disabled: true },
                  ]}
                />
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={checkboxGroupProps} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
