import {
  Fieldset,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Field,
  Typography,
} from '@base-joy/ui-styled';
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

const fieldsetControls: PlaygroundControl[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['plain', 'outlined'],
    defaultValue: 'outlined',
  },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const fieldsetCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Fieldset.Root variant="${props.variant}" size="${props.size}"${booleanPropsStr}>
  <Fieldset.Legend>Legend</Fieldset.Legend>
  <div className="space-y-4">
    <Field.Root>
      <Field.Label>Field Label</Field.Label>
      <Field.Control>
        <Input placeholder="Enter value" />
      </Field.Control>
    </Field.Root>
  </div>
</Fieldset.Root>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'basic-fieldset', title: 'Basic Fieldset', level: 3 },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'disabled-fieldset', title: 'Disabled Fieldset', level: 3 },
  { id: 'with-radio-group', title: 'With Radio Group', level: 3 },
  { id: 'with-checkbox-group', title: 'With Checkbox Group', level: 3 },
  { id: 'nested-fields', title: 'Nested Fields', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function FieldsetPage() {
  return (
    <div>
      <ComponentHeader
        title="Fieldset"
        description="A component for grouping related form fields with a legend."
        baseUiUrl="https://base-ui.com/react/components/fieldset"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={fieldsetControls}
              codeTemplate={fieldsetCodeTemplate}
            >
              {(props) => (
                <Fieldset.Root
                  variant={props.variant as 'plain' | 'outlined'}
                  size={props.size as Size}
                  disabled={props.disabled === 'true'}
                >
                  <Fieldset.Legend>Personal Information</Fieldset.Legend>
                  <div className="space-y-4">
                    <Field.Root>
                      <Field.Label>First Name</Field.Label>
                      <Field.Control>
                        <Input placeholder="John" />
                      </Field.Control>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Last Name</Field.Label>
                      <Field.Control>
                        <Input placeholder="Doe" />
                      </Field.Control>
                    </Field.Root>
                  </div>
                </Fieldset.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Basic Fieldset"
                titleLevel="h3"
                id="basic-fieldset"
                code={`<Fieldset.Root>
  <Fieldset.Legend>Personal Information</Fieldset.Legend>
  <div className="space-y-4">
    <Field.Root>
      <Field.Label>First Name</Field.Label>
      <Field.Control>
        <Input placeholder="John" />
      </Field.Control>
    </Field.Root>
    <Field.Root>
      <Field.Label>Last Name</Field.Label>
      <Field.Control>
        <Input placeholder="Doe" />
      </Field.Control>
    </Field.Root>
  </div>
</Fieldset.Root>`}
                codeLanguage="tsx"
              >
                <Fieldset.Root>
                  <Fieldset.Legend>Personal Information</Fieldset.Legend>
                  <div className="space-y-4">
                    <Field.Root>
                      <Field.Label>First Name</Field.Label>
                      <Field.Control>
                        <Input placeholder="John" />
                      </Field.Control>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Last Name</Field.Label>
                      <Field.Control>
                        <Input placeholder="Doe" />
                      </Field.Control>
                    </Field.Root>
                  </div>
                </Fieldset.Root>
              </Section>

              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Fieldset.Root variant="plain">
  <Fieldset.Legend>Plain Variant</Fieldset.Legend>
  <div className="space-y-4">
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Field.Control>
        <Input placeholder="john@example.com" />
      </Field.Control>
    </Field.Root>
  </div>
</Fieldset.Root>

<Fieldset.Root variant="outlined">
  <Fieldset.Legend>Outlined Variant</Fieldset.Legend>
  <div className="space-y-4">
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Field.Control>
        <Input placeholder="john@example.com" />
      </Field.Control>
    </Field.Root>
  </div>
</Fieldset.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-6">
                  <Fieldset.Root variant="plain">
                    <Fieldset.Legend>Plain Variant</Fieldset.Legend>
                    <div className="space-y-4">
                      <Field.Root>
                        <Field.Label>Email</Field.Label>
                        <Field.Control>
                          <Input placeholder="john@example.com" />
                        </Field.Control>
                      </Field.Root>
                    </div>
                  </Fieldset.Root>

                  <Fieldset.Root variant="outlined">
                    <Fieldset.Legend>Outlined Variant</Fieldset.Legend>
                    <div className="space-y-4">
                      <Field.Root>
                        <Field.Label>Email</Field.Label>
                        <Field.Control>
                          <Input placeholder="john@example.com" />
                        </Field.Control>
                      </Field.Root>
                    </div>
                  </Fieldset.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Fieldset.Root variant="outlined" size="sm">
  <Fieldset.Legend>Small Size</Fieldset.Legend>
  <div className="space-y-3">
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Field.Control>
        <Input placeholder="Small input" size="sm" />
      </Field.Control>
    </Field.Root>
  </div>
</Fieldset.Root>

<Fieldset.Root variant="outlined" size="md">
  <Fieldset.Legend>Medium Size</Fieldset.Legend>
  <div className="space-y-4">
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Field.Control>
        <Input placeholder="Medium input" size="md" />
      </Field.Control>
    </Field.Root>
  </div>
</Fieldset.Root>

<Fieldset.Root variant="outlined" size="lg">
  <Fieldset.Legend>Large Size</Fieldset.Legend>
  <div className="space-y-5">
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Field.Control>
        <Input placeholder="Large input" size="lg" />
      </Field.Control>
    </Field.Root>
  </div>
</Fieldset.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-6">
                  <Fieldset.Root variant="outlined" size="sm">
                    <Fieldset.Legend>Small Size</Fieldset.Legend>
                    <div className="space-y-3">
                      <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Field.Control>
                          <Input placeholder="Small input" size="sm" />
                        </Field.Control>
                      </Field.Root>
                    </div>
                  </Fieldset.Root>

                  <Fieldset.Root variant="outlined" size="md">
                    <Fieldset.Legend>Medium Size</Fieldset.Legend>
                    <div className="space-y-4">
                      <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Field.Control>
                          <Input placeholder="Medium input" size="md" />
                        </Field.Control>
                      </Field.Root>
                    </div>
                  </Fieldset.Root>

                  <Fieldset.Root variant="outlined" size="lg">
                    <Fieldset.Legend>Large Size</Fieldset.Legend>
                    <div className="space-y-5">
                      <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Field.Control>
                          <Input placeholder="Large input" size="lg" />
                        </Field.Control>
                      </Field.Root>
                    </div>
                  </Fieldset.Root>
                </div>
              </Section>

              <Section
                title="Disabled Fieldset"
                titleLevel="h3"
                id="disabled-fieldset"
                code={`<Fieldset.Root variant="outlined" disabled>
  <Fieldset.Legend>Disabled Fieldset</Fieldset.Legend>
  <div className="space-y-4">
    <Field.Root>
      <Field.Label>Field 1</Field.Label>
      <Field.Control>
        <Input placeholder="Disabled input" />
      </Field.Control>
    </Field.Root>
    <Field.Root>
      <Field.Label>Field 2</Field.Label>
      <Field.Control>
        <Input placeholder="Disabled input" />
      </Field.Control>
    </Field.Root>
  </div>
</Fieldset.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  The <code className="font-mono text-sm">disabled</code> prop
                  disables all form controls within the fieldset.
                </Typography>
                <Fieldset.Root variant="outlined" disabled>
                  <Fieldset.Legend>Disabled Fieldset</Fieldset.Legend>
                  <div className="space-y-4">
                    <Field.Root>
                      <Field.Label>Field 1</Field.Label>
                      <Field.Control>
                        <Input placeholder="Disabled input" />
                      </Field.Control>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Field 2</Field.Label>
                      <Field.Control>
                        <Input placeholder="Disabled input" />
                      </Field.Control>
                    </Field.Root>
                  </div>
                </Fieldset.Root>
              </Section>

              <Section
                title="With Radio Group"
                titleLevel="h3"
                id="with-radio-group"
                code={`<Fieldset.Root variant="outlined">
  <Fieldset.Legend>Subscription Plan</Fieldset.Legend>
  <RadioGroup defaultValue="pro" className="space-y-2">
    <label className="flex items-center gap-3">
      <Radio.Root value="free">
        <Radio.Indicator />
      </Radio.Root>
      <div>
        <Typography level="body-md" weight="medium">
          Free
        </Typography>
        <Typography level="body-sm" className="text-neutral-500">
          Basic features, limited usage
        </Typography>
      </div>
    </label>
    <label className="flex items-center gap-3">
      <Radio.Root value="pro">
        <Radio.Indicator />
      </Radio.Root>
      <div>
        <Typography level="body-md" weight="medium">
          Pro
        </Typography>
        <Typography level="body-sm" className="text-neutral-500">
          All features, unlimited usage
        </Typography>
      </div>
    </label>
    <label className="flex items-center gap-3">
      <Radio.Root value="enterprise">
        <Radio.Indicator />
      </Radio.Root>
      <div>
        <Typography level="body-md" weight="medium">
          Enterprise
        </Typography>
        <Typography level="body-sm" className="text-neutral-500">
          Custom solutions, priority support
        </Typography>
      </div>
    </label>
  </RadioGroup>
</Fieldset.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Fieldsets can group radio button options to help users select
                  one choice from multiple options.
                </Typography>
                <Fieldset.Root variant="outlined">
                  <Fieldset.Legend>Subscription Plan</Fieldset.Legend>
                  <RadioGroup defaultValue="pro" className="space-y-2">
                    <label className="flex items-center gap-3">
                      <Radio.Root value="free">
                        <Radio.Indicator />
                      </Radio.Root>
                      <div>
                        <Typography level="body-md" weight="medium">
                          Free
                        </Typography>
                        <Typography level="body-sm" className="text-neutral-500">
                          Basic features, limited usage
                        </Typography>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <Radio.Root value="pro">
                        <Radio.Indicator />
                      </Radio.Root>
                      <div>
                        <Typography level="body-md" weight="medium">
                          Pro
                        </Typography>
                        <Typography level="body-sm" className="text-neutral-500">
                          All features, unlimited usage
                        </Typography>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <Radio.Root value="enterprise">
                        <Radio.Indicator />
                      </Radio.Root>
                      <div>
                        <Typography level="body-md" weight="medium">
                          Enterprise
                        </Typography>
                        <Typography level="body-sm" className="text-neutral-500">
                          Custom solutions, priority support
                        </Typography>
                      </div>
                    </label>
                  </RadioGroup>
                </Fieldset.Root>
              </Section>

              <Section
                title="With Checkbox Group"
                titleLevel="h3"
                id="with-checkbox-group"
                code={`<Fieldset.Root variant="outlined">
  <Fieldset.Legend>Notification Preferences</Fieldset.Legend>
  <CheckboxGroup className="space-y-2">
    <label className="flex items-center gap-3">
      <Checkbox.Root value="email" defaultChecked>
        <Checkbox.Indicator />
      </Checkbox.Root>
      <Typography level="body-md">Email notifications</Typography>
    </label>
    <label className="flex items-center gap-3">
      <Checkbox.Root value="push">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <Typography level="body-md">Push notifications</Typography>
    </label>
    <label className="flex items-center gap-3">
      <Checkbox.Root value="sms">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <Typography level="body-md">SMS notifications</Typography>
    </label>
  </CheckboxGroup>
</Fieldset.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Fieldsets can group checkbox options for users to select
                  multiple choices.
                </Typography>
                <Fieldset.Root variant="outlined">
                  <Fieldset.Legend>Notification Preferences</Fieldset.Legend>
                  <CheckboxGroup className="space-y-2">
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="email" defaultChecked>
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <Typography level="body-md">
                        Email notifications
                      </Typography>
                    </label>
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="push">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <Typography level="body-md">
                        Push notifications
                      </Typography>
                    </label>
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="sms">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <Typography level="body-md">SMS notifications</Typography>
                    </label>
                  </CheckboxGroup>
                </Fieldset.Root>
              </Section>

              <Section
                title="Nested Fields"
                titleLevel="h3"
                id="nested-fields"
                code={`<Fieldset.Root variant="outlined">
  <Fieldset.Legend>Shipping Information</Fieldset.Legend>
  <div className="space-y-6">
    <Fieldset.Root>
      <Fieldset.Legend>Address</Fieldset.Legend>
      <div className="space-y-4">
        <Field.Root>
          <Field.Label>Street</Field.Label>
          <Field.Control>
            <Input placeholder="123 Main St" />
          </Field.Control>
        </Field.Root>
        <div className="grid grid-cols-2 gap-4">
          <Field.Root>
            <Field.Label>City</Field.Label>
            <Field.Control>
              <Input placeholder="New York" />
            </Field.Control>
          </Field.Root>
          <Field.Root>
            <Field.Label>ZIP Code</Field.Label>
            <Field.Control>
              <Input placeholder="10001" />
            </Field.Control>
          </Field.Root>
        </div>
      </div>
    </Fieldset.Root>

    <Fieldset.Root>
      <Fieldset.Legend>Delivery Options</Fieldset.Legend>
      <RadioGroup defaultValue="standard" className="space-y-2">
        <label className="flex items-center gap-3">
          <Radio.Root value="standard">
            <Radio.Indicator />
          </Radio.Root>
          <Typography level="body-md">
            Standard (5-7 business days)
          </Typography>
        </label>
        <label className="flex items-center gap-3">
          <Radio.Root value="express">
            <Radio.Indicator />
          </Radio.Root>
          <Typography level="body-md">
            Express (2-3 business days)
          </Typography>
        </label>
        <label className="flex items-center gap-3">
          <Radio.Root value="overnight">
            <Radio.Indicator />
          </Radio.Root>
          <Typography level="body-md">
            Overnight (1 business day)
          </Typography>
        </label>
      </RadioGroup>
    </Fieldset.Root>
  </div>
</Fieldset.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Complex forms can nest multiple fieldsets to organize related
                  groups of fields within a larger group.
                </Typography>
                <Fieldset.Root variant="outlined">
                  <Fieldset.Legend>Shipping Information</Fieldset.Legend>
                  <div className="space-y-6">
                    <Fieldset.Root>
                      <Fieldset.Legend>Address</Fieldset.Legend>
                      <div className="space-y-4">
                        <Field.Root>
                          <Field.Label>Street</Field.Label>
                          <Field.Control>
                            <Input placeholder="123 Main St" />
                          </Field.Control>
                        </Field.Root>
                        <div className="grid grid-cols-2 gap-4">
                          <Field.Root>
                            <Field.Label>City</Field.Label>
                            <Field.Control>
                              <Input placeholder="New York" />
                            </Field.Control>
                          </Field.Root>
                          <Field.Root>
                            <Field.Label>ZIP Code</Field.Label>
                            <Field.Control>
                              <Input placeholder="10001" />
                            </Field.Control>
                          </Field.Root>
                        </div>
                      </div>
                    </Fieldset.Root>

                    <Fieldset.Root>
                      <Fieldset.Legend>Delivery Options</Fieldset.Legend>
                      <RadioGroup defaultValue="standard" className="space-y-2">
                        <label className="flex items-center gap-3">
                          <Radio.Root value="standard">
                            <Radio.Indicator />
                          </Radio.Root>
                          <Typography level="body-md">
                            Standard (5-7 business days)
                          </Typography>
                        </label>
                        <label className="flex items-center gap-3">
                          <Radio.Root value="express">
                            <Radio.Indicator />
                          </Radio.Root>
                          <Typography level="body-md">
                            Express (2-3 business days)
                          </Typography>
                        </label>
                        <label className="flex items-center gap-3">
                          <Radio.Root value="overnight">
                            <Radio.Indicator />
                          </Radio.Root>
                          <Typography level="body-md">
                            Overnight (1 business day)
                          </Typography>
                        </label>
                      </RadioGroup>
                    </Fieldset.Root>
                  </div>
                </Fieldset.Root>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Fieldset} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
