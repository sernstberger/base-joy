import { Combobox, Typography } from '@base-joy/ui-styled';
import type { ColorScale, Size, Variant } from '@base-joy/tokens';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { ComboboxOption } from '@base-joy/ui-styled';

const fruits: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'orange', label: 'Orange' },
  { value: 'peach', label: 'Peach' },
  { value: 'pear', label: 'Pear' },
  { value: 'strawberry', label: 'Strawberry' },
];

const groupedOptions: ComboboxOption[] = [
  {
    group: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
  {
    group: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
];

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'disabled', title: 'Disabled', level: 3 },
  { id: 'groups', title: 'With Groups', level: 3 },
  { id: 'api', title: 'API Reference' },
];

const controls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const codeTemplate = (props: Record<string, string | boolean>) =>
  `<Combobox
  options={fruits}
  placeholder="Search fruits..."
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"${props.disabled === 'true' || props.disabled === true ? '\n  disabled' : ''}
/>`;

export function ComboboxPage() {
  return (
    <div>
      <ComponentHeader
        title="Combobox"
        description="A searchable dropdown component that combines an input with a list of options."
        baseUiUrl="https://base-ui.com/react/components/combobox"
      />
      <Typography level="body-sm" className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <strong>Combobox vs Autocomplete:</strong> Use Combobox when selection must come from a
        predefined list. Use Autocomplete when you want search suggestions but also allow free-form
        text input.
      </Typography>
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={controls} codeTemplate={codeTemplate}>
              {(props) => (
                <div className="max-w-xs">
                  <Combobox
                    options={fruits}
                    placeholder="Search fruits..."
                    variant={props.variant as Variant}
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    disabled={props.disabled === 'true'}
                  />
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
                code={`<Combobox variant="solid" options={fruits} placeholder="Solid" />
<Combobox variant="soft" options={fruits} placeholder="Soft" />
<Combobox variant="outlined" options={fruits} placeholder="Outlined" />
<Combobox variant="plain" options={fruits} placeholder="Plain" />`}
              >
                <div className="space-y-4 max-w-xs">
                  <Combobox
                    options={fruits.slice(0, 3)}
                    variant="solid"
                    placeholder="Solid variant"
                  />
                  <Combobox
                    options={fruits.slice(0, 3)}
                    variant="soft"
                    placeholder="Soft variant"
                  />
                  <Combobox
                    options={fruits.slice(0, 3)}
                    variant="outlined"
                    placeholder="Outlined variant"
                  />
                  <Combobox
                    options={fruits.slice(0, 3)}
                    variant="plain"
                    placeholder="Plain variant"
                  />
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Combobox color="primary" options={fruits} placeholder="Primary" />
<Combobox color="neutral" options={fruits} placeholder="Neutral" />
<Combobox color="success" options={fruits} placeholder="Success" />
<Combobox color="warning" options={fruits} placeholder="Warning" />
<Combobox color="danger" options={fruits} placeholder="Danger" />`}
              >
                <div className="space-y-4 max-w-xs">
                  <Combobox
                    options={fruits.slice(0, 3)}
                    color="primary"
                    placeholder="Primary"
                  />
                  <Combobox
                    options={fruits.slice(0, 3)}
                    color="neutral"
                    placeholder="Neutral"
                  />
                  <Combobox
                    options={fruits.slice(0, 3)}
                    color="success"
                    placeholder="Success"
                  />
                  <Combobox
                    options={fruits.slice(0, 3)}
                    color="warning"
                    placeholder="Warning"
                  />
                  <Combobox
                    options={fruits.slice(0, 3)}
                    color="danger"
                    placeholder="Danger"
                  />
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Combobox size="sm" options={fruits} placeholder="Small" />
<Combobox size="md" options={fruits} placeholder="Medium" />
<Combobox size="lg" options={fruits} placeholder="Large" />`}
              >
                <div className="space-y-4 max-w-xs">
                  <Combobox
                    options={fruits.slice(0, 3)}
                    size="sm"
                    placeholder="Small combobox"
                  />
                  <Combobox
                    options={fruits.slice(0, 3)}
                    size="md"
                    placeholder="Medium combobox"
                  />
                  <Combobox
                    options={fruits.slice(0, 3)}
                    size="lg"
                    placeholder="Large combobox"
                  />
                </div>
              </Section>

              <Section
                title="Disabled"
                titleLevel="h3"
                id="disabled"
                code={`<Combobox disabled options={fruits} placeholder="Disabled combobox" />`}
              >
                <div className="max-w-xs">
                  <Combobox
                    options={fruits.slice(0, 3)}
                    disabled
                    placeholder="Disabled combobox"
                  />
                </div>
              </Section>

              <Section
                title="With Groups"
                titleLevel="h3"
                id="groups"
                code={`const groupedOptions = [
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

<Combobox options={groupedOptions} placeholder="Search foods..." />`}
              >
                <Typography level="body-sm" className="mb-4">
                  Use objects with a <code className="font-mono text-sm">group</code> property
                  to create option groups.
                </Typography>
                <div className="max-w-xs">
                  <Combobox
                    options={groupedOptions}
                    placeholder="Search foods..."
                  />
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Combobox} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
