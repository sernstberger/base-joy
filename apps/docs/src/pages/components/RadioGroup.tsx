import { Radio, RadioGroup, Typography } from '@base-joy/ui-components';
import { Section } from '../../components/Section';

export function RadioGroupPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">RadioGroup</Typography>
        <Typography level="body-lg">
          A container for grouping radio buttons for single-selection.
        </Typography>
      </header>

      <Section title="Basic Usage">
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

      <Section title="Horizontal Layout">
        <RadioGroup defaultValue="monthly">
          <div className="flex gap-6">
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
          </div>
        </RadioGroup>
      </Section>

      <Section title="With Descriptions">
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

      <Section title="Card Style">
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

      <Section title="Disabled Group">
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

      <Section title="Survey Example">
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
  );
}
