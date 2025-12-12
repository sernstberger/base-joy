import { Radio, RadioGroup } from '@base-joy/ui-core';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';

export function RadioPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Radio</Heading>
        <Text variant="subtitle">
          A radio button component for single selections within a group.
        </Text>
      </header>

      <Section title="Basic Usage">
        <RadioGroup defaultValue="option1">
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <Radio.Root value="option1">
                <Radio.Indicator />
              </Radio.Root>
              <span>Option 1</span>
            </label>

            <label className="flex items-center gap-2">
              <Radio.Root value="option2">
                <Radio.Indicator />
              </Radio.Root>
              <span>Option 2</span>
            </label>

            <label className="flex items-center gap-2">
              <Radio.Root value="option3">
                <Radio.Indicator />
              </Radio.Root>
              <span>Option 3</span>
            </label>
          </div>
        </RadioGroup>
      </Section>

      <Section title="Sizes">
        <div className="space-y-6">
          <RadioGroup defaultValue="sm">
            <label className="flex items-center gap-2">
              <Radio.Root value="sm" size="sm">
                <Radio.Indicator />
              </Radio.Root>
              <span className="text-sm">Small radio</span>
            </label>
          </RadioGroup>

          <RadioGroup defaultValue="md">
            <label className="flex items-center gap-2">
              <Radio.Root value="md" size="md">
                <Radio.Indicator />
              </Radio.Root>
              <span>Medium radio</span>
            </label>
          </RadioGroup>

          <RadioGroup defaultValue="lg">
            <label className="flex items-center gap-2">
              <Radio.Root value="lg" size="lg">
                <Radio.Indicator />
              </Radio.Root>
              <span className="text-lg">Large radio</span>
            </label>
          </RadioGroup>
        </div>
      </Section>

      <Section title="Colors">
        <div className="space-y-4">
          <RadioGroup defaultValue="primary">
            <label className="flex items-center gap-2">
              <Radio.Root value="primary" color="primary">
                <Radio.Indicator />
              </Radio.Root>
              <span>Primary</span>
            </label>
          </RadioGroup>

          <RadioGroup defaultValue="success">
            <label className="flex items-center gap-2">
              <Radio.Root value="success" color="success">
                <Radio.Indicator />
              </Radio.Root>
              <span>Success</span>
            </label>
          </RadioGroup>

          <RadioGroup defaultValue="warning">
            <label className="flex items-center gap-2">
              <Radio.Root value="warning" color="warning">
                <Radio.Indicator />
              </Radio.Root>
              <span>Warning</span>
            </label>
          </RadioGroup>

          <RadioGroup defaultValue="danger">
            <label className="flex items-center gap-2">
              <Radio.Root value="danger" color="danger">
                <Radio.Indicator />
              </Radio.Root>
              <span>Danger</span>
            </label>
          </RadioGroup>
        </div>
      </Section>

      <Section title="Disabled State">
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

      <Section title="Horizontal Orientation">
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

      <Section title="Card Selection Example">
        <RadioGroup defaultValue="starter">
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
                  <div className="font-medium">{plan.name}</div>
                  <div className="text-sm text-neutral-500">{plan.price}</div>
                </div>
              </label>
            ))}
          </div>
        </RadioGroup>
      </Section>
    </div>
  );
}
