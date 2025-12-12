import { Checkbox, CheckboxGroup, Typography } from '@base-joy/ui-components';
import { Section } from '../../components/Section';

export function CheckboxGroupPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">CheckboxGroup</Typography>
        <Typography level="body-lg">
          A container for grouping multiple checkbox options together.
        </Typography>
      </header>

      <Section title="Basic Usage">
        <CheckboxGroup defaultValue={['email']}>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <Checkbox.Root value="email">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Email</span>
            </label>
            <label className="flex items-center gap-3">
              <Checkbox.Root value="sms">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>SMS</span>
            </label>
            <label className="flex items-center gap-3">
              <Checkbox.Root value="push">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Push Notifications</span>
            </label>
          </div>
        </CheckboxGroup>
      </Section>

      <Section title="All Selected">
        <CheckboxGroup allValues={['option1', 'option2', 'option3']}>
          <div className="space-y-2">
            <label className="flex items-center gap-3 font-medium">
              <Checkbox.Root parent>
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Select All</span>
            </label>
            <div className="ml-6 space-y-2">
              <label className="flex items-center gap-3">
                <Checkbox.Root value="option1">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span>Option 1</span>
              </label>
              <label className="flex items-center gap-3">
                <Checkbox.Root value="option2">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span>Option 2</span>
              </label>
              <label className="flex items-center gap-3">
                <Checkbox.Root value="option3">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span>Option 3</span>
              </label>
            </div>
          </div>
        </CheckboxGroup>
      </Section>

      <Section title="Horizontal Layout">
        <CheckboxGroup>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <Checkbox.Root value="small">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Small</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox.Root value="medium">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Medium</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox.Root value="large">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Large</span>
            </label>
          </div>
        </CheckboxGroup>
      </Section>

      <Section title="With Descriptions">
        <CheckboxGroup>
          <div className="space-y-4">
            <label className="flex items-start gap-3">
              <Checkbox.Root value="analytics" className="mt-0.5">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <div>
                <div className="font-medium">Analytics</div>
                <div className="text-sm text-neutral-500">
                  Allow us to collect anonymous usage data to improve the product
                </div>
              </div>
            </label>
            <label className="flex items-start gap-3">
              <Checkbox.Root value="marketing" className="mt-0.5">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <div>
                <div className="font-medium">Marketing</div>
                <div className="text-sm text-neutral-500">
                  Receive marketing emails about new features and offers
                </div>
              </div>
            </label>
            <label className="flex items-start gap-3">
              <Checkbox.Root value="updates" className="mt-0.5">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <div>
                <div className="font-medium">Product Updates</div>
                <div className="text-sm text-neutral-500">
                  Get notified about new features and product updates
                </div>
              </div>
            </label>
          </div>
        </CheckboxGroup>
      </Section>

      <Section title="Disabled Group">
        <CheckboxGroup disabled defaultValue={['option1']}>
          <div className="space-y-2">
            <label className="flex items-center gap-3 opacity-50">
              <Checkbox.Root value="option1">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Option 1 (checked)</span>
            </label>
            <label className="flex items-center gap-3 opacity-50">
              <Checkbox.Root value="option2">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Option 2</span>
            </label>
            <label className="flex items-center gap-3 opacity-50">
              <Checkbox.Root value="option3">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Option 3</span>
            </label>
          </div>
        </CheckboxGroup>
      </Section>

      <Section title="Filter Example">
        <div className="max-w-xs p-4 bg-neutral-50 rounded-lg">
          <div className="font-medium mb-3">Filter by Category</div>
          <CheckboxGroup defaultValue={['electronics', 'books']}>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <Checkbox.Root value="electronics">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span>Electronics</span>
                <span className="ml-auto text-sm text-neutral-400">42</span>
              </label>
              <label className="flex items-center gap-3">
                <Checkbox.Root value="clothing">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span>Clothing</span>
                <span className="ml-auto text-sm text-neutral-400">18</span>
              </label>
              <label className="flex items-center gap-3">
                <Checkbox.Root value="books">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span>Books</span>
                <span className="ml-auto text-sm text-neutral-400">156</span>
              </label>
              <label className="flex items-center gap-3">
                <Checkbox.Root value="home">
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <span>Home & Garden</span>
                <span className="ml-auto text-sm text-neutral-400">73</span>
              </label>
            </div>
          </CheckboxGroup>
        </div>
      </Section>
    </div>
  );
}
