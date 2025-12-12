import { Fieldset, Radio, RadioGroup, Checkbox, CheckboxGroup, Field } from '@base-joy/ui-core';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';

export function FieldsetPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Fieldset</Heading>
        <Text variant="subtitle">
          A component for grouping related form fields with a legend.
        </Text>
      </header>

      <Section title="Basic Usage">
        <Fieldset.Root>
          <Fieldset.Legend>Personal Information</Fieldset.Legend>
          <div className="space-y-4 mt-4">
            <Field.Root>
              <Field.Label>First Name</Field.Label>
              <Field.Control>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                  placeholder="John"
                />
              </Field.Control>
            </Field.Root>
            <Field.Root>
              <Field.Label>Last Name</Field.Label>
              <Field.Control>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                  placeholder="Doe"
                />
              </Field.Control>
            </Field.Root>
          </div>
        </Fieldset.Root>
      </Section>

      <Section title="Outlined Variant">
        <Fieldset.Root variant="outlined">
          <Fieldset.Legend>Account Settings</Fieldset.Legend>
          <div className="space-y-4 mt-4">
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Field.Control>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                  placeholder="john@example.com"
                />
              </Field.Control>
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Field.Control>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                  placeholder="••••••••"
                />
              </Field.Control>
            </Field.Root>
          </div>
        </Fieldset.Root>
      </Section>

      <Section title="With Radio Group">
        <Fieldset.Root variant="outlined">
          <Fieldset.Legend>Subscription Plan</Fieldset.Legend>
          <RadioGroup defaultValue="pro" className="mt-4 space-y-2">
            <label className="flex items-center gap-3">
              <Radio.Root value="free">
                <Radio.Indicator />
              </Radio.Root>
              <div>
                <div className="font-medium">Free</div>
                <div className="text-sm text-neutral-500">Basic features, limited usage</div>
              </div>
            </label>
            <label className="flex items-center gap-3">
              <Radio.Root value="pro">
                <Radio.Indicator />
              </Radio.Root>
              <div>
                <div className="font-medium">Pro</div>
                <div className="text-sm text-neutral-500">All features, unlimited usage</div>
              </div>
            </label>
            <label className="flex items-center gap-3">
              <Radio.Root value="enterprise">
                <Radio.Indicator />
              </Radio.Root>
              <div>
                <div className="font-medium">Enterprise</div>
                <div className="text-sm text-neutral-500">Custom solutions, priority support</div>
              </div>
            </label>
          </RadioGroup>
        </Fieldset.Root>
      </Section>

      <Section title="With Checkbox Group">
        <Fieldset.Root variant="outlined">
          <Fieldset.Legend>Notification Preferences</Fieldset.Legend>
          <CheckboxGroup className="mt-4 space-y-2">
            <label className="flex items-center gap-3">
              <Checkbox.Root value="email" defaultChecked>
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Email notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <Checkbox.Root value="push">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Push notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <Checkbox.Root value="sms">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>SMS notifications</span>
            </label>
          </CheckboxGroup>
        </Fieldset.Root>
      </Section>

      <Section title="Nested Fieldsets">
        <Fieldset.Root variant="outlined">
          <Fieldset.Legend>Shipping Information</Fieldset.Legend>
          <div className="space-y-6 mt-4">
            <Fieldset.Root>
              <Fieldset.Legend>Address</Fieldset.Legend>
              <div className="space-y-4 mt-4">
                <Field.Root>
                  <Field.Label>Street</Field.Label>
                  <Field.Control>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                      placeholder="123 Main St"
                    />
                  </Field.Control>
                </Field.Root>
                <div className="grid grid-cols-2 gap-4">
                  <Field.Root>
                    <Field.Label>City</Field.Label>
                    <Field.Control>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                        placeholder="New York"
                      />
                    </Field.Control>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>ZIP Code</Field.Label>
                    <Field.Control>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                        placeholder="10001"
                      />
                    </Field.Control>
                  </Field.Root>
                </div>
              </div>
            </Fieldset.Root>

            <Fieldset.Root>
              <Fieldset.Legend>Delivery Options</Fieldset.Legend>
              <RadioGroup defaultValue="standard" className="mt-4 space-y-2">
                <label className="flex items-center gap-3">
                  <Radio.Root value="standard">
                    <Radio.Indicator />
                  </Radio.Root>
                  <span>Standard (5-7 business days)</span>
                </label>
                <label className="flex items-center gap-3">
                  <Radio.Root value="express">
                    <Radio.Indicator />
                  </Radio.Root>
                  <span>Express (2-3 business days)</span>
                </label>
                <label className="flex items-center gap-3">
                  <Radio.Root value="overnight">
                    <Radio.Indicator />
                  </Radio.Root>
                  <span>Overnight (1 business day)</span>
                </label>
              </RadioGroup>
            </Fieldset.Root>
          </div>
        </Fieldset.Root>
      </Section>

      <Section title="Disabled">
        <Fieldset.Root variant="outlined" disabled>
          <Fieldset.Legend>Disabled Fieldset</Fieldset.Legend>
          <div className="space-y-4 mt-4">
            <Field.Root>
              <Field.Label>Field 1</Field.Label>
              <Field.Control>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                  placeholder="Disabled input"
                />
              </Field.Control>
            </Field.Root>
            <Field.Root>
              <Field.Label>Field 2</Field.Label>
              <Field.Control>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                  placeholder="Disabled input"
                />
              </Field.Control>
            </Field.Root>
          </div>
        </Fieldset.Root>
      </Section>
    </div>
  );
}
