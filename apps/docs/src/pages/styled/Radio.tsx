import { Radio, RadioGroup, Typography } from '@base-joy/ui-styled';
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

const radioControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const radioCodeTemplate = (props: Record<string, string | boolean>) => {
  const disabledProp = (props.disabled === 'true' || props.disabled === true) ? ' disabled' : '';
  return `<RadioGroup defaultValue="option1">
  <label className="flex items-center gap-2">
    <Radio.Root value="option1" variant="${props.variant}" color="${props.color}" size="${props.size}"${disabledProp}>
      <Radio.Indicator />
    </Radio.Root>
    <span>Option 1</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="option2" variant="${props.variant}" color="${props.color}" size="${props.size}"${disabledProp}>
      <Radio.Indicator />
    </Radio.Root>
    <span>Option 2</span>
  </label>
</RadioGroup>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'disabled-state', title: 'Disabled State', level: 3 },
  { id: 'horizontal-orientation', title: 'Horizontal Orientation', level: 3 },
  { id: 'card-selection', title: 'Card Selection', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function RadioPage() {
  return (
    <div>
      <ComponentHeader
        title="Radio"
        description="A radio button component for single selections within a group."
        baseUiUrl="https://base-ui.com/react/components/radio-group"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={radioControls}
              codeTemplate={radioCodeTemplate}
            >
              {(props) => (
                <RadioGroup defaultValue="option1">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <Radio.Root
                        value="option1"
                        variant={props.variant as Variant}
                        color={props.color as ColorScale}
                        size={props.size as Size}
                        disabled={props.disabled === 'true'}
                      >
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Option 1</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio.Root
                        value="option2"
                        variant={props.variant as Variant}
                        color={props.color as ColorScale}
                        size={props.size as Size}
                        disabled={props.disabled === 'true'}
                      >
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Option 2</span>
                    </label>
                  </div>
                </RadioGroup>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<RadioGroup defaultValue="solid">
  <label className="flex items-center gap-2">
    <Radio.Root value="solid" variant="solid">
      <Radio.Indicator />
    </Radio.Root>
    <span>Solid</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="soft" variant="soft">
      <Radio.Indicator />
    </Radio.Root>
    <span>Soft</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="outlined" variant="outlined">
      <Radio.Indicator />
    </Radio.Root>
    <span>Outlined</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="plain" variant="plain">
      <Radio.Indicator />
    </Radio.Root>
    <span>Plain</span>
  </label>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <RadioGroup defaultValue="solid">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <Radio.Root value="solid" variant="solid">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Solid</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio.Root value="soft" variant="soft">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Soft</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio.Root value="outlined" variant="outlined">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Outlined</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio.Root value="plain" variant="plain">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Plain</span>
                    </label>
                  </div>
                </RadioGroup>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<RadioGroup defaultValue="primary">
  <label className="flex items-center gap-2">
    <Radio.Root value="primary" color="primary">
      <Radio.Indicator />
    </Radio.Root>
    <span>Primary</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="neutral" color="neutral">
      <Radio.Indicator />
    </Radio.Root>
    <span>Neutral</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="success" color="success">
      <Radio.Indicator />
    </Radio.Root>
    <span>Success</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="warning" color="warning">
      <Radio.Indicator />
    </Radio.Root>
    <span>Warning</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="danger" color="danger">
      <Radio.Indicator />
    </Radio.Root>
    <span>Danger</span>
  </label>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <RadioGroup defaultValue="primary">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <Radio.Root value="primary" color="primary">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Primary</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio.Root value="neutral" color="neutral">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Neutral</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio.Root value="success" color="success">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Success</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio.Root value="warning" color="warning">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Warning</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio.Root value="danger" color="danger">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Danger</span>
                    </label>
                  </div>
                </RadioGroup>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<RadioGroup defaultValue="sm">
  <label className="flex items-center gap-2">
    <Radio.Root value="sm" size="sm">
      <Radio.Indicator />
    </Radio.Root>
    <Typography level="body-sm">Small radio</Typography>
  </label>
</RadioGroup>

<RadioGroup defaultValue="md">
  <label className="flex items-center gap-2">
    <Radio.Root value="md" size="md">
      <Radio.Indicator />
    </Radio.Root>
    <Typography level="body-md">Medium radio</Typography>
  </label>
</RadioGroup>

<RadioGroup defaultValue="lg">
  <label className="flex items-center gap-2">
    <Radio.Root value="lg" size="lg">
      <Radio.Indicator />
    </Radio.Root>
    <Typography level="body-lg">Large radio</Typography>
  </label>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <div className="space-y-6">
                  <RadioGroup defaultValue="sm">
                    <label className="flex items-center gap-2">
                      <Radio.Root value="sm" size="sm">
                        <Radio.Indicator />
                      </Radio.Root>
                      <Typography level="body-sm">Small radio</Typography>
                    </label>
                  </RadioGroup>

                  <RadioGroup defaultValue="md">
                    <label className="flex items-center gap-2">
                      <Radio.Root value="md" size="md">
                        <Radio.Indicator />
                      </Radio.Root>
                      <Typography level="body-md">Medium radio</Typography>
                    </label>
                  </RadioGroup>

                  <RadioGroup defaultValue="lg">
                    <label className="flex items-center gap-2">
                      <Radio.Root value="lg" size="lg">
                        <Radio.Indicator />
                      </Radio.Root>
                      <Typography level="body-lg">Large radio</Typography>
                    </label>
                  </RadioGroup>
                </div>
              </Section>

              <Section
                title="Disabled State"
                titleLevel="h3"
                id="disabled-state"
                code={`<RadioGroup defaultValue="enabled">
  <label className="flex items-center gap-2">
    <Radio.Root value="enabled">
      <Radio.Indicator />
    </Radio.Root>
    <span>Enabled option</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="disabled" disabled>
      <Radio.Indicator />
    </Radio.Root>
    <span className="opacity-50">Disabled option</span>
  </label>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <RadioGroup defaultValue="enabled">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <Radio.Root value="enabled">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Enabled option</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Radio.Root value="disabled" disabled>
                        <Radio.Indicator />
                      </Radio.Root>
                      <span className="opacity-50">Disabled option</span>
                    </label>
                  </div>
                </RadioGroup>
              </Section>

              <Section
                title="Horizontal Orientation"
                titleLevel="h3"
                id="horizontal-orientation"
                code={`<RadioGroup orientation="horizontal" defaultValue="left">
  <label className="flex items-center gap-2">
    <Radio.Root value="left">
      <Radio.Indicator />
    </Radio.Root>
    <span>Left</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="center">
      <Radio.Indicator />
    </Radio.Root>
    <span>Center</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="right">
      <Radio.Indicator />
    </Radio.Root>
    <span>Right</span>
  </label>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <RadioGroup orientation="horizontal" defaultValue="left">
                  <label className="flex items-center gap-2">
                    <Radio.Root value="left">
                      <Radio.Indicator />
                    </Radio.Root>
                    <span>Left</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Radio.Root value="center">
                      <Radio.Indicator />
                    </Radio.Root>
                    <span>Center</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Radio.Root value="right">
                      <Radio.Indicator />
                    </Radio.Root>
                    <span>Right</span>
                  </label>
                </RadioGroup>
              </Section>

              <Section
                title="Card Selection Example"
                titleLevel="h3"
                id="card-selection"
                code={`<RadioGroup defaultValue="starter">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[
      { value: 'starter', name: 'Starter', price: '$9/mo' },
      { value: 'pro', name: 'Pro', price: '$29/mo' },
      { value: 'enterprise', name: 'Enterprise', price: '$99/mo' },
    ].map((plan) => (
      <label
        key={plan.value}
        className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-neutral-50"
      >
        <Radio.Root value={plan.value}>
          <Radio.Indicator />
        </Radio.Root>
        <div>
          <Typography level="body-md" weight="medium">
            {plan.name}
          </Typography>
          <Typography level="body-sm" className="text-neutral-500">
            {plan.price}
          </Typography>
        </div>
      </label>
    ))}
  </div>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Radio buttons can be integrated with card-based layouts for
                  richer selection interfaces.
                </Typography>
                <RadioGroup defaultValue="starter">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'starter', name: 'Starter', price: '$9/mo' },
                      { value: 'pro', name: 'Pro', price: '$29/mo' },
                      {
                        value: 'enterprise',
                        name: 'Enterprise',
                        price: '$99/mo',
                      },
                    ].map((plan) => (
                      <label
                        key={plan.value}
                        className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-neutral-50"
                      >
                        <Radio.Root value={plan.value}>
                          <Radio.Indicator />
                        </Radio.Root>
                        <div>
                          <Typography level="body-md" weight="medium">
                            {plan.name}
                          </Typography>
                          <Typography level="body-sm" className="text-neutral-500">
                            {plan.price}
                          </Typography>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Radio} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
