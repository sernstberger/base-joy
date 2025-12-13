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
import { componentProps } from '../../props';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const basicOptions: RadioOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const radioControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const radioCodeTemplate = (props: Record<string, string | boolean>) => {
  const disabledProp = (props.disabled === 'true' || props.disabled === true) ? '\n  disabled' : '';
  return `<RadioGroup
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"${disabledProp}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  defaultValue="option1"
/>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'disabled-state', title: 'Disabled State', level: 3 },
  { id: 'horizontal-orientation', title: 'Horizontal Orientation', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function RadioPage() {
  return (
    <div>
      <ComponentHeader
        title="Radio"
        description="A radio button component for selecting one option from a set. Use RadioGroup with the options prop for grouped radio buttons."
        baseUiUrl="https://base-ui.com/react/components/radio"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={radioControls} codeTemplate={radioCodeTemplate}>
              {(props) => (
                <RadioGroup
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  disabled={String(props.disabled) === 'true'}
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                  defaultValue="option1"
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
                code={`<RadioGroup variant="solid" options={options} />
<RadioGroup variant="soft" options={options} />
<RadioGroup variant="outlined" options={options} />
<RadioGroup variant="plain" options={options} />`}
                codeLanguage="tsx"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography level="body-sm" className="mb-2">Solid</Typography>
                    <RadioGroup
                      variant="solid"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Soft</Typography>
                    <RadioGroup
                      variant="soft"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Outlined</Typography>
                    <RadioGroup
                      variant="outlined"
                      defaultValue="option1"
                      options={basicOptions}
                    />
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">Plain</Typography>
                    <RadioGroup
                      variant="plain"
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
                title="Disabled State"
                titleLevel="h3"
                id="disabled-state"
                code={`<RadioGroup
  options={[
    { value: 'enabled', label: 'Enabled option' },
    { value: 'disabled', label: 'Disabled option', disabled: true },
  ]}
/>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Individual options can be disabled with the <code className="font-mono text-sm">disabled</code> property.
                </Typography>
                <RadioGroup
                  defaultValue="enabled"
                  options={[
                    { value: 'enabled', label: 'Enabled option' },
                    { value: 'disabled', label: 'Disabled option', disabled: true },
                    { value: 'another', label: 'Another enabled option' },
                  ]}
                />
              </Section>

              <Section
                title="Horizontal Orientation"
                titleLevel="h3"
                id="horizontal-orientation"
                code={`<RadioGroup
  orientation="horizontal"
  options={[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ]}
/>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">orientation="horizontal"</code> for inline layouts.
                </Typography>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue="center"
                  options={[
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' },
                  ]}
                />
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <Typography level="body-sm" className="mb-4">
              For radio button groups, use the <code className="font-mono text-sm">RadioGroup</code> component with the <code className="font-mono text-sm">options</code> prop.
              See the <a href="/styled/RadioGroup" className="text-primary-500 hover:underline">RadioGroup documentation</a> for full API reference.
            </Typography>
            <PropsTable props={componentProps.RadioGroup ?? []} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
