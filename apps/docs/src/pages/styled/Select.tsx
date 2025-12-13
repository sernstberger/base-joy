import { Select, Typography } from '@base-joy/ui-styled';
import type { SelectOption } from '@base-joy/ui-styled';
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

const fruitOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const groupedOptions: SelectOption[] = [
  {
    group: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    group: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
    ],
  },
];

const selectControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const selectCodeTemplate = (props: Record<string, string>) =>
  `<Select
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"
  placeholder="Select a fruit..."
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ]}
/>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'groups', title: 'With Groups', level: 3 },
  { id: 'disabled-items', title: 'Disabled Items', level: 3 },
  { id: 'custom-rendering', title: 'Custom Rendering', level: 3 },
  { id: 'api', title: 'API Reference' },
];

const selectProps: PropMeta[] = [
  {
    name: 'options',
    type: 'SelectOption[]',
    required: true,
    defaultValue: '-',
    description: 'The options to display. Each option has value and label, or can be a group with nested options.',
  },
  {
    name: 'placeholder',
    type: 'string',
    required: false,
    defaultValue: "'Select...'",
    description: 'Placeholder text when no value is selected.',
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'The controlled value of the select.',
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
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    required: false,
    defaultValue: "'outlined'",
    description: 'The visual style of the select trigger.',
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    required: false,
    defaultValue: "'neutral'",
    description: 'The color scheme of the select.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    required: false,
    defaultValue: "'md'",
    description: 'The size of the select.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'Whether the select is disabled.',
  },
  {
    name: 'renderOption',
    type: '(option: SelectOptionItem) => ReactNode',
    required: false,
    defaultValue: '-',
    description: 'Custom render function for option items.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes for the trigger element.',
  },
];

export function SelectPage() {
  return (
    <div>
      <ComponentHeader
        title="Select"
        description="A dropdown select component for choosing from a list of options."
        baseUiUrl="https://base-ui.com/react/components/select"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={selectControls}
              codeTemplate={selectCodeTemplate}
            >
              {(props) => (
                <Select
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  placeholder="Select a fruit..."
                  options={fruitOptions}
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
                code={`<Select variant="solid" color="primary" options={options} placeholder="Solid" />
<Select variant="soft" color="primary" options={options} placeholder="Soft" />
<Select variant="outlined" color="primary" options={options} placeholder="Outlined" />
<Select variant="plain" color="primary" options={options} placeholder="Plain" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Select variant="solid" color="primary" options={fruitOptions} placeholder="Solid" />
                  <Select variant="soft" color="primary" options={fruitOptions} placeholder="Soft" />
                  <Select variant="outlined" color="primary" options={fruitOptions} placeholder="Outlined" />
                  <Select variant="plain" color="primary" options={fruitOptions} placeholder="Plain" />
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Select variant="soft" color="primary" options={options} placeholder="Primary" />
<Select variant="soft" color="neutral" options={options} placeholder="Neutral" />
<Select variant="soft" color="success" options={options} placeholder="Success" />
<Select variant="soft" color="warning" options={options} placeholder="Warning" />
<Select variant="soft" color="danger" options={options} placeholder="Danger" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Select variant="soft" color="primary" options={fruitOptions} placeholder="Primary" />
                  <Select variant="soft" color="neutral" options={fruitOptions} placeholder="Neutral" />
                  <Select variant="soft" color="success" options={fruitOptions} placeholder="Success" />
                  <Select variant="soft" color="warning" options={fruitOptions} placeholder="Warning" />
                  <Select variant="soft" color="danger" options={fruitOptions} placeholder="Danger" />
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Select size="sm" options={options} placeholder="Small select" />
<Select size="md" options={options} placeholder="Medium select" />
<Select size="lg" options={options} placeholder="Large select" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Select size="sm" options={fruitOptions} placeholder="Small select" />
                  <Select size="md" options={fruitOptions} placeholder="Medium select" />
                  <Select size="lg" options={fruitOptions} placeholder="Large select" />
                </div>
              </Section>

              <Section
                title="With Groups"
                titleLevel="h3"
                id="groups"
                code={`<Select
  placeholder="Select a food..."
  options={[
    {
      group: 'Fruits',
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
      ],
    },
    {
      group: 'Vegetables',
      options: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'broccoli', label: 'Broccoli' },
      ],
    },
  ]}
/>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use objects with a <code className="font-mono text-sm">group</code> property to create option groups.
                </Typography>
                <Select placeholder="Select a food..." options={groupedOptions} />
              </Section>

              <Section
                title="Disabled Items"
                titleLevel="h3"
                id="disabled-items"
                code={`<Select
  placeholder="Select an option..."
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
                <Select
                  placeholder="Select an option..."
                  options={[
                    { value: 'available', label: 'Available' },
                    { value: 'unavailable', label: 'Unavailable', disabled: true },
                    { value: 'coming-soon', label: 'Coming Soon', disabled: true },
                  ]}
                />
              </Section>

              <Section
                title="Custom Rendering"
                titleLevel="h3"
                id="custom-rendering"
                code={`<Select
  placeholder="Select a status..."
  options={[
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'inactive', label: 'Inactive' },
  ]}
  renderOption={(option) => (
    <div className="flex items-center gap-2">
      <span className={\`h-2 w-2 rounded-full \${
        option.value === 'active' ? 'bg-success-500' :
        option.value === 'pending' ? 'bg-warning-500' : 'bg-danger-500'
      }\`} />
      {option.label}
    </div>
  )}
/>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">renderOption</code> prop for custom item rendering.
                </Typography>
                <Select
                  placeholder="Select a status..."
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                  renderOption={(option) => (
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${
                        option.value === 'active' ? 'bg-success-500' :
                        option.value === 'pending' ? 'bg-warning-500' : 'bg-danger-500'
                      }`} />
                      {option.label}
                    </div>
                  )}
                />
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={selectProps} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
