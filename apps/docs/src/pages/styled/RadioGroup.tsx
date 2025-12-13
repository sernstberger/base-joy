import { Radio, RadioGroup } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Size } from '@base-joy/tokens';

const radioGroupControls: PlaygroundControl[] = [
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'orientation', type: 'select', defaultValue: 'vertical', options: ['vertical', 'horizontal'] },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const radioGroupCodeTemplate = (props: Record<string, string>) => {
  const booleanProps = [];
  if (props.disabled === 'true') booleanProps.push('disabled');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<RadioGroup defaultValue="option1" size="${props.size}" orientation="${props.orientation}"${booleanPropsStr}>
  <div className="space-y-2">
    <label className="flex items-center gap-3">
      <Radio.Root value="option1">
        <Radio.Indicator />
      </Radio.Root>
      <span>Option 1</span>
    </label>
    <label className="flex items-center gap-3">
      <Radio.Root value="option2">
        <Radio.Indicator />
      </Radio.Root>
      <span>Option 2</span>
    </label>
    <label className="flex items-center gap-3">
      <Radio.Root value="option3">
        <Radio.Indicator />
      </Radio.Root>
      <span>Option 3</span>
    </label>
  </div>
</RadioGroup>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'basic-usage', title: 'Basic Usage', level: 3 },
  { id: 'horizontal', title: 'Horizontal Layout', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'with-descriptions', title: 'With Descriptions', level: 3 },
  { id: 'disabled', title: 'Disabled', level: 3 },
  { id: 'card-style', title: 'Card Style', level: 3 },
  { id: 'survey-example', title: 'Survey Example', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function RadioGroupPage() {
  return (
    <div>
      <ComponentHeader
        title="RadioGroup"
        description="A container for grouping radio buttons for single-selection."
        baseUiUrl="https://base-ui.com/react/components/radio-group"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={radioGroupControls}
              codeTemplate={radioGroupCodeTemplate}
            >
              {(props) => {
                const disabled = props.disabled === 'true';

                return (
                  <RadioGroup
                    defaultValue="option1"
                    size={props.size as Size}
                    orientation={props.orientation as 'vertical' | 'horizontal'}
                    disabled={disabled}
                  >
                    <div className={props.orientation === 'horizontal' ? 'flex gap-6' : 'space-y-2'}>
                      <label className="flex items-center gap-3">
                        <Radio.Root value="option1">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span>Option 1</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <Radio.Root value="option2">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span>Option 2</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <Radio.Root value="option3">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span>Option 3</span>
                      </label>
                    </div>
                  </RadioGroup>
                );
              }}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">

              <Section
                title="Basic Usage"
                titleLevel="h3"
                id="basic-usage"
                code={`<RadioGroup defaultValue="option1">
  <div className="space-y-2">
    <label className="flex items-center gap-3">
      <Radio.Root value="option1">
        <Radio.Indicator />
      </Radio.Root>
      <span>Option 1</span>
    </label>
    <label className="flex items-center gap-3">
      <Radio.Root value="option2">
        <Radio.Indicator />
      </Radio.Root>
      <span>Option 2</span>
    </label>
    <label className="flex items-center gap-3">
      <Radio.Root value="option3">
        <Radio.Indicator />
      </Radio.Root>
      <span>Option 3</span>
    </label>
  </div>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <RadioGroup defaultValue="option1">
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <Radio.Root value="option1">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Option 1</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <Radio.Root value="option2">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Option 2</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <Radio.Root value="option3">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Option 3</span>
                    </label>
                  </div>
                </RadioGroup>
              </Section>

              <Section
                title="Horizontal Layout"
                titleLevel="h3"
                id="horizontal"
                code={`<RadioGroup defaultValue="monthly" orientation="horizontal">
  <label className="flex items-center gap-2">
    <Radio.Root value="monthly">
      <Radio.Indicator />
    </Radio.Root>
    <span>Monthly</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="quarterly">
      <Radio.Indicator />
    </Radio.Root>
    <span>Quarterly</span>
  </label>
  <label className="flex items-center gap-2">
    <Radio.Root value="yearly">
      <Radio.Indicator />
    </Radio.Root>
    <span>Yearly</span>
  </label>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <RadioGroup defaultValue="monthly" orientation="horizontal">
                  <label className="flex items-center gap-2">
                    <Radio.Root value="monthly">
                      <Radio.Indicator />
                    </Radio.Root>
                    <span>Monthly</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Radio.Root value="quarterly">
                      <Radio.Indicator />
                    </Radio.Root>
                    <span>Quarterly</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Radio.Root value="yearly">
                      <Radio.Indicator />
                    </Radio.Root>
                    <span>Yearly</span>
                  </label>
                </RadioGroup>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<RadioGroup defaultValue="option1" size="sm">
  <div className="space-y-2">
    <label className="flex items-center gap-2">
      <Radio.Root value="option1" size="sm">
        <Radio.Indicator />
      </Radio.Root>
      <span className="text-sm">Small (sm)</span>
    </label>
  </div>
</RadioGroup>

<RadioGroup defaultValue="option2" size="md">
  <div className="space-y-3">
    <label className="flex items-center gap-3">
      <Radio.Root value="option2" size="md">
        <Radio.Indicator />
      </Radio.Root>
      <span>Medium (md)</span>
    </label>
  </div>
</RadioGroup>

<RadioGroup defaultValue="option3" size="lg">
  <div className="space-y-4">
    <label className="flex items-center gap-3">
      <Radio.Root value="option3" size="lg">
        <Radio.Indicator />
      </Radio.Root>
      <span className="text-lg">Large (lg)</span>
    </label>
  </div>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <RadioGroup defaultValue="option1" size="sm">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <Radio.Root value="option1" size="sm">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span className="text-sm">Small (sm)</span>
                      </label>
                    </div>
                  </RadioGroup>

                  <RadioGroup defaultValue="option2" size="md">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <Radio.Root value="option2" size="md">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span>Medium (md)</span>
                      </label>
                    </div>
                  </RadioGroup>

                  <RadioGroup defaultValue="option3" size="lg">
                    <div className="space-y-4">
                      <label className="flex items-center gap-3">
                        <Radio.Root value="option3" size="lg">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span className="text-lg">Large (lg)</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </Section>

              <Section
                title="With Descriptions"
                titleLevel="h3"
                id="with-descriptions"
                code={`<RadioGroup defaultValue="standard">
  <div className="space-y-4">
    <label className="flex items-start gap-3">
      <Radio.Root value="standard" className="mt-0.5">
        <Radio.Indicator />
      </Radio.Root>
      <div>
        <div className="font-medium">Standard Shipping</div>
        <div className="text-sm text-neutral-500">
          5-7 business days - Free
        </div>
      </div>
    </label>
    <label className="flex items-start gap-3">
      <Radio.Root value="express" className="mt-0.5">
        <Radio.Indicator />
      </Radio.Root>
      <div>
        <div className="font-medium">Express Shipping</div>
        <div className="text-sm text-neutral-500">
          2-3 business days - $9.99
        </div>
      </div>
    </label>
    <label className="flex items-start gap-3">
      <Radio.Root value="overnight" className="mt-0.5">
        <Radio.Indicator />
      </Radio.Root>
      <div>
        <div className="font-medium">Overnight Shipping</div>
        <div className="text-sm text-neutral-500">
          Next business day - $24.99
        </div>
      </div>
    </label>
  </div>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <RadioGroup defaultValue="standard">
                  <div className="space-y-4">
                    <label className="flex items-start gap-3">
                      <Radio.Root value="standard" className="mt-0.5">
                        <Radio.Indicator />
                      </Radio.Root>
                      <div>
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-neutral-500">
                          5-7 business days - Free
                        </div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3">
                      <Radio.Root value="express" className="mt-0.5">
                        <Radio.Indicator />
                      </Radio.Root>
                      <div>
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-neutral-500">
                          2-3 business days - $9.99
                        </div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3">
                      <Radio.Root value="overnight" className="mt-0.5">
                        <Radio.Indicator />
                      </Radio.Root>
                      <div>
                        <div className="font-medium">Overnight Shipping</div>
                        <div className="text-sm text-neutral-500">
                          Next business day - $24.99
                        </div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </Section>

              <Section
                title="Disabled"
                titleLevel="h3"
                id="disabled"
                code={`<RadioGroup disabled defaultValue="option1">
  <div className="space-y-2">
    <label className="flex items-center gap-3 opacity-50">
      <Radio.Root value="option1">
        <Radio.Indicator />
      </Radio.Root>
      <span>Option 1 (selected)</span>
    </label>
    <label className="flex items-center gap-3 opacity-50">
      <Radio.Root value="option2">
        <Radio.Indicator />
      </Radio.Root>
      <span>Option 2</span>
    </label>
    <label className="flex items-center gap-3 opacity-50">
      <Radio.Root value="option3">
        <Radio.Indicator />
      </Radio.Root>
      <span>Option 3</span>
    </label>
  </div>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <RadioGroup disabled defaultValue="option1">
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 opacity-50">
                      <Radio.Root value="option1">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Option 1 (selected)</span>
                    </label>
                    <label className="flex items-center gap-3 opacity-50">
                      <Radio.Root value="option2">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Option 2</span>
                    </label>
                    <label className="flex items-center gap-3 opacity-50">
                      <Radio.Root value="option3">
                        <Radio.Indicator />
                      </Radio.Root>
                      <span>Option 3</span>
                    </label>
                  </div>
                </RadioGroup>
              </Section>

              <Section
                title="Card Style"
                titleLevel="h3"
                id="card-style"
                code={`<RadioGroup defaultValue="pro">
  <div className="grid grid-cols-3 gap-4 max-w-2xl">
    <label className="relative cursor-pointer">
      <Radio.Root value="free" className="sr-only peer">
        <Radio.Indicator />
      </Radio.Root>
      <div className="p-4 border-2 border-neutral-200 rounded-lg peer-data-[checked]:border-primary-500 peer-data-[checked]:bg-primary-50 transition-colors">
        <div className="font-medium">Free</div>
        <div className="text-2xl font-bold mt-1">$0</div>
        <div className="text-sm text-neutral-500 mt-2">Basic features</div>
      </div>
    </label>
    <label className="relative cursor-pointer">
      <Radio.Root value="pro" className="sr-only peer">
        <Radio.Indicator />
      </Radio.Root>
      <div className="p-4 border-2 border-neutral-200 rounded-lg peer-data-[checked]:border-primary-500 peer-data-[checked]:bg-primary-50 transition-colors">
        <div className="font-medium">Pro</div>
        <div className="text-2xl font-bold mt-1">$19</div>
        <div className="text-sm text-neutral-500 mt-2">All features</div>
      </div>
    </label>
    <label className="relative cursor-pointer">
      <Radio.Root value="enterprise" className="sr-only peer">
        <Radio.Indicator />
      </Radio.Root>
      <div className="p-4 border-2 border-neutral-200 rounded-lg peer-data-[checked]:border-primary-500 peer-data-[checked]:bg-primary-50 transition-colors">
        <div className="font-medium">Enterprise</div>
        <div className="text-2xl font-bold mt-1">Custom</div>
        <div className="text-sm text-neutral-500 mt-2">Contact sales</div>
      </div>
    </label>
  </div>
</RadioGroup>`}
                codeLanguage="tsx"
              >
                <RadioGroup defaultValue="pro">
                  <div className="grid grid-cols-3 gap-4 max-w-2xl">
                    <label className="relative cursor-pointer">
                      <Radio.Root value="free" className="sr-only peer">
                        <Radio.Indicator />
                      </Radio.Root>
                      <div className="p-4 border-2 border-neutral-200 rounded-lg peer-data-[checked]:border-primary-500 peer-data-[checked]:bg-primary-50 transition-colors">
                        <div className="font-medium">Free</div>
                        <div className="text-2xl font-bold mt-1">$0</div>
                        <div className="text-sm text-neutral-500 mt-2">Basic features</div>
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <Radio.Root value="pro" className="sr-only peer">
                        <Radio.Indicator />
                      </Radio.Root>
                      <div className="p-4 border-2 border-neutral-200 rounded-lg peer-data-[checked]:border-primary-500 peer-data-[checked]:bg-primary-50 transition-colors">
                        <div className="font-medium">Pro</div>
                        <div className="text-2xl font-bold mt-1">$19</div>
                        <div className="text-sm text-neutral-500 mt-2">All features</div>
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <Radio.Root value="enterprise" className="sr-only peer">
                        <Radio.Indicator />
                      </Radio.Root>
                      <div className="p-4 border-2 border-neutral-200 rounded-lg peer-data-[checked]:border-primary-500 peer-data-[checked]:bg-primary-50 transition-colors">
                        <div className="font-medium">Enterprise</div>
                        <div className="text-2xl font-bold mt-1">Custom</div>
                        <div className="text-sm text-neutral-500 mt-2">Contact sales</div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </Section>

              <Section
                title="Survey Example"
                titleLevel="h3"
                id="survey-example"
                code={`<div className="max-w-md p-6 bg-neutral-50 rounded-lg">
  <div className="font-medium mb-1">How satisfied are you with our service?</div>
  <div className="text-sm text-neutral-500 mb-4">Please select one option</div>
  <RadioGroup>
    <div className="space-y-2">
      <label className="flex items-center gap-3">
        <Radio.Root value="very-satisfied">
          <Radio.Indicator />
        </Radio.Root>
        <span>Very Satisfied</span>
      </label>
      <label className="flex items-center gap-3">
        <Radio.Root value="satisfied">
          <Radio.Indicator />
        </Radio.Root>
        <span>Satisfied</span>
      </label>
      <label className="flex items-center gap-3">
        <Radio.Root value="neutral">
          <Radio.Indicator />
        </Radio.Root>
        <span>Neutral</span>
      </label>
      <label className="flex items-center gap-3">
        <Radio.Root value="dissatisfied">
          <Radio.Indicator />
        </Radio.Root>
        <span>Dissatisfied</span>
      </label>
      <label className="flex items-center gap-3">
        <Radio.Root value="very-dissatisfied">
          <Radio.Indicator />
        </Radio.Root>
        <span>Very Dissatisfied</span>
      </label>
    </div>
  </RadioGroup>
</div>`}
                codeLanguage="tsx"
              >
                <div className="max-w-md p-6 bg-neutral-50 rounded-lg">
                  <div className="font-medium mb-1">How satisfied are you with our service?</div>
                  <div className="text-sm text-neutral-500 mb-4">Please select one option</div>
                  <RadioGroup>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3">
                        <Radio.Root value="very-satisfied">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span>Very Satisfied</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <Radio.Root value="satisfied">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span>Satisfied</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <Radio.Root value="neutral">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span>Neutral</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <Radio.Root value="dissatisfied">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span>Dissatisfied</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <Radio.Root value="very-dissatisfied">
                          <Radio.Indicator />
                        </Radio.Root>
                        <span>Very Dissatisfied</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.RadioGroup} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
