import { RadioGroup, Typography } from '@base-joy/ui-styled';
import type { RadioOption } from '@base-joy/ui-styled';
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

const basicOptions: RadioOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const billingOptions: RadioOption[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
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
  `<RadioGroup
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"
  orientation="${props.orientation}"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
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

const radioGroupProps: PropMeta[] = [
  {
    name: 'options',
    type: 'RadioOption[]',
    required: true,
    defaultValue: '-',
    description: 'The options to display. Each option has value, label, and optional disabled.',
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'The controlled value of the radio group.',
  },
  {
    name: 'defaultValue',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'The default value for uncontrolled usage.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    required: false,
    defaultValue: '-',
    description: 'Callback fired when the value changes.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    required: false,
    defaultValue: "'vertical'",
    description: 'The layout orientation of the radio group.',
  },
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    required: false,
    defaultValue: "'outlined'",
    description: 'The visual style of the radio buttons.',
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    required: false,
    defaultValue: "'primary'",
    description: 'The color scheme of the radio buttons.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    required: false,
    defaultValue: "'md'",
    description: 'The size of the radio buttons.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'Whether the entire radio group is disabled.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes for the root element.',
  },
];

export function RadioGroupPage() {
  return (
    <div>
      <ComponentHeader
        title="RadioGroup"
        description="A group of radio buttons for single-selection from a list of options."
        baseUiUrl="https://base-ui.com/react/components/radio-group"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={controls} codeTemplate={codeTemplate}>
              {(props) => (
                <RadioGroup
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  orientation={props.orientation as 'horizontal' | 'vertical'}
                  defaultValue="option1"
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
                code={`<RadioGroup variant="solid" color="primary" options={options} />
<RadioGroup variant="soft" color="primary" options={options} />
<RadioGroup variant="outlined" color="primary" options={options} />
<RadioGroup variant="plain" color="primary" options={options} />`}
                codeLanguage="tsx"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography level="body-sm" className="mb-2">Solid</Typography>
                    <RadioGroup
                      variant="solid"
                      color="primary"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Soft</Typography>
                    <RadioGroup
                      variant="soft"
                      color="primary"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Outlined</Typography>
                    <RadioGroup
                      variant="outlined"
                      color="primary"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Plain</Typography>
                    <RadioGroup
                      variant="plain"
                      color="primary"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<RadioGroup color="primary" options={options} />
<RadioGroup color="neutral" options={options} />
<RadioGroup color="success" options={options} />
<RadioGroup color="warning" options={options} />
<RadioGroup color="danger" options={options} />`}
                codeLanguage="tsx"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Typography level="body-sm" className="mb-2">Primary</Typography>
                    <RadioGroup
                      color="primary"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Neutral</Typography>
                    <RadioGroup
                      color="neutral"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Success</Typography>
                    <RadioGroup
                      color="success"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Warning</Typography>
                    <RadioGroup
                      color="warning"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Danger</Typography>
                    <RadioGroup
                      color="danger"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<RadioGroup size="sm" options={options} />
<RadioGroup size="md" options={options} />
<RadioGroup size="lg" options={options} />`}
                codeLanguage="tsx"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Typography level="body-sm" className="mb-2">Small</Typography>
                    <RadioGroup
                      size="sm"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Medium</Typography>
                    <RadioGroup
                      size="md"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Large</Typography>
                    <RadioGroup
                      size="lg"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                </div>
              </Section>

              <Section
                title="Horizontal Layout"
                titleLevel="h3"
                id="horizontal"
                code={`<RadioGroup
  orientation="horizontal"
  options={[
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ]}
/>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">orientation="horizontal"</code> for inline layouts.
                </Typography>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue="monthly"
                  options={billingOptions}
                />
              </Section>

              <Section
                title="Disabled Items"
                titleLevel="h3"
                id="disabled-items"
                code={`<RadioGroup
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
                <RadioGroup
                  defaultValue="available"
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
            <PropsTable props={radioGroupProps} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
