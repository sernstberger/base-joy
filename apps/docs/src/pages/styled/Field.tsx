import {
  Field,
  Input,
  Textarea,
  NumberField,
  Select,
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

const fieldControls: PlaygroundControl[] = [
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'required', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'invalid', type: 'boolean', defaultValue: false },
];

const fieldCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.required === 'true' || props.required === true) booleanProps.push('required');
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  if (props.invalid === 'true' || props.invalid === true) booleanProps.push('invalid');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Field.Root name="field" size="${props.size}"${booleanPropsStr}>
  <Field.Label${props.required ? ' required' : ''}>Label</Field.Label>
  <Field.Control placeholder="Enter value"${props.required ? ' required' : ''}${props.disabled ? ' disabled' : ''} />
  <Field.Description>This is a helpful description.</Field.Description>
  ${props.invalid ? '<Field.Error match>This field has an error</Field.Error>' : ''}
</Field.Root>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'basic-usage', title: 'Basic Usage', level: 3 },
  { id: 'with-description', title: 'With Description', level: 3 },
  { id: 'with-error', title: 'With Error', level: 3 },
  { id: 'required-field', title: 'Required Field', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'different-inputs', title: 'Different Input Types', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function FieldPage() {
  return (
    <div>
      <ComponentHeader
        title="Field"
        description="A compound component for form fields with label, description, and error handling. Provides structure and accessibility for form inputs."
        baseUiUrl="https://base-ui.com/react/components/field"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={fieldControls}
              codeTemplate={fieldCodeTemplate}
            >
              {(props) => (
                <div className="max-w-md">
                  <Field.Root
                    name="playground-field"
                    size={props.size as Size}
                    disabled={props.disabled === 'true'}
                    invalid={props.invalid === 'true'}
                  >
                    <Field.Label required={props.required === 'true'}>
                      Label
                    </Field.Label>
                    <Field.Control
                      placeholder="Enter value"
                      required={props.required === 'true'}
                      disabled={props.disabled === 'true'}
                    />
                    <Field.Description>
                      This is a helpful description.
                    </Field.Description>
                    {props.invalid === 'true' && (
                      <Field.Error match>This field has an error</Field.Error>
                    )}
                  </Field.Root>
                </div>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Basic Usage"
                titleLevel="h3"
                id="basic-usage"
                code={`<Field.Root name="email">
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" placeholder="you@example.com" />
</Field.Root>`}
                codeLanguage="tsx"
              >
                <div className="max-w-md">
                  <Field.Root name="email">
                    <Field.Label>Email</Field.Label>
                    <Field.Control type="email" placeholder="you@example.com" />
                  </Field.Root>
                </div>
              </Section>

              <Section
                title="With Description"
                titleLevel="h3"
                id="with-description"
                code={`<Field.Root name="bio">
  <Field.Label>Bio</Field.Label>
  <Field.Control placeholder="Tell us about yourself" />
  <Field.Description>
    A brief description about yourself (max 200 characters).
  </Field.Description>
</Field.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">Field.Description</code>{' '}
                  to provide helpful hints or additional context for the input.
                </Typography>
                <div className="max-w-md">
                  <Field.Root name="bio">
                    <Field.Label>Bio</Field.Label>
                    <Field.Control placeholder="Tell us about yourself" />
                    <Field.Description>
                      A brief description about yourself (max 200 characters).
                    </Field.Description>
                  </Field.Root>
                </div>
              </Section>

              <Section
                title="With Error"
                titleLevel="h3"
                id="with-error"
                code={`<Field.Root name="email" invalid>
  <Field.Label required>Email</Field.Label>
  <Field.Control type="email" />
  <Field.Error match>Please enter a valid email</Field.Error>
</Field.Root>

<Field.Root name="password">
  <Field.Label required>Password</Field.Label>
  <Field.Control type="password" required minLength={8} />
  <Field.Error match="valueMissing">Password is required</Field.Error>
  <Field.Error match="tooShort">
    Password must be at least 8 characters
  </Field.Error>
</Field.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">Field.Error</code> with{' '}
                  <code className="font-mono text-sm">match</code> prop to show
                  validation errors. Set{' '}
                  <code className="font-mono text-sm">invalid</code> prop on the
                  Field.Root to manually trigger error state.
                </Typography>
                <div className="space-y-4 max-w-md">
                  <Field.Root name="email" invalid>
                    <Field.Label required>Email</Field.Label>
                    <Field.Control type="email" />
                    <Field.Error match>Please enter a valid email</Field.Error>
                  </Field.Root>

                  <Field.Root name="password">
                    <Field.Label required>Password</Field.Label>
                    <Field.Control type="password" required minLength={8} />
                    <Field.Error match="valueMissing">
                      Password is required
                    </Field.Error>
                    <Field.Error match="tooShort">
                      Password must be at least 8 characters
                    </Field.Error>
                  </Field.Root>
                </div>
              </Section>

              <Section
                title="Required Field"
                titleLevel="h3"
                id="required-field"
                code={`<Field.Root name="username">
  <Field.Label required>Username</Field.Label>
  <Field.Control required placeholder="Choose a username" />
  <Field.Error match="valueMissing">Username is required</Field.Error>
</Field.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Set <code className="font-mono text-sm">required</code> prop on
                  Field.Label to display an asterisk, and on Field.Control to enable
                  native validation.
                </Typography>
                <div className="max-w-md">
                  <Field.Root name="username">
                    <Field.Label required>Username</Field.Label>
                    <Field.Control required placeholder="Choose a username" />
                    <Field.Error match="valueMissing">
                      Username is required
                    </Field.Error>
                  </Field.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Field.Root name="small" size="sm">
  <Field.Label>Small Field</Field.Label>
  <Field.Control placeholder="Small size" />
  <Field.Description>This is a small field</Field.Description>
</Field.Root>

<Field.Root name="medium" size="md">
  <Field.Label>Medium Field</Field.Label>
  <Field.Control placeholder="Medium size" />
  <Field.Description>This is a medium field</Field.Description>
</Field.Root>

<Field.Root name="large" size="lg">
  <Field.Label>Large Field</Field.Label>
  <Field.Control placeholder="Large size" />
  <Field.Description>This is a large field</Field.Description>
</Field.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-6 max-w-md">
                  <Field.Root name="small" size="sm">
                    <Field.Label>Small Field</Field.Label>
                    <Field.Control placeholder="Small size" />
                    <Field.Description>This is a small field</Field.Description>
                  </Field.Root>

                  <Field.Root name="medium" size="md">
                    <Field.Label>Medium Field</Field.Label>
                    <Field.Control placeholder="Medium size" />
                    <Field.Description>This is a medium field</Field.Description>
                  </Field.Root>

                  <Field.Root name="large" size="lg">
                    <Field.Label>Large Field</Field.Label>
                    <Field.Control placeholder="Large size" />
                    <Field.Description>This is a large field</Field.Description>
                  </Field.Root>
                </div>
              </Section>

              <Section
                title="Different Input Types"
                titleLevel="h3"
                id="different-inputs"
                code={`// With styled Input component
<Field.Root name="styled">
  <Field.Label>Styled Input</Field.Label>
  <Input variant="outlined" placeholder="Using Input component" />
  <Field.Description>Using the styled Input component</Field.Description>
</Field.Root>

// With Textarea
<Field.Root name="message">
  <Field.Label>Message</Field.Label>
  <Textarea placeholder="Enter your message" rows={4} />
  <Field.Description>Share your thoughts with us</Field.Description>
</Field.Root>

// With NumberField
<Field.Root name="quantity">
  <Field.Label>Quantity</Field.Label>
  <NumberField.Root defaultValue={1}>
    <NumberField.Group>
      <NumberField.Decrement />
      <NumberField.Input />
      <NumberField.Increment />
    </NumberField.Group>
  </NumberField.Root>
  <Field.Description>Select the quantity you need</Field.Description>
</Field.Root>

// With Select
<Field.Root name="country">
  <Field.Label>Country</Field.Label>
  <Select.Root>
    <Select.Trigger>
      <Select.Value placeholder="Select a country" />
    </Select.Trigger>
    <Select.Portal>
      <Select.Positioner>
        <Select.Popup>
          <Select.Item value="us">
            <Select.ItemText>United States</Select.ItemText>
          </Select.Item>
          <Select.Item value="ca">
            <Select.ItemText>Canada</Select.ItemText>
          </Select.Item>
          <Select.Item value="uk">
            <Select.ItemText>United Kingdom</Select.ItemText>
          </Select.Item>
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  </Select.Root>
  <Field.Description>Choose your country</Field.Description>
</Field.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Field can be used with any form input component. Use
                  Field.Control for native inputs, or place styled components like
                  Input, Textarea, NumberField, or Select directly inside Field.Root.
                </Typography>
                <div className="space-y-4 max-w-md">
                  <Field.Root name="styled">
                    <Field.Label>Styled Input</Field.Label>
                    <Input variant="outlined" placeholder="Using Input component" />
                    <Field.Description>
                      Using the styled Input component
                    </Field.Description>
                  </Field.Root>

                  <Field.Root name="message">
                    <Field.Label>Message</Field.Label>
                    <Textarea placeholder="Enter your message" rows={4} />
                    <Field.Description>Share your thoughts with us</Field.Description>
                  </Field.Root>

                  <Field.Root name="quantity">
                    <Field.Label>Quantity</Field.Label>
                    <NumberField.Root defaultValue={1}>
                      <NumberField.Group>
                        <NumberField.Decrement />
                        <NumberField.Input />
                        <NumberField.Increment />
                      </NumberField.Group>
                    </NumberField.Root>
                    <Field.Description>
                      Select the quantity you need
                    </Field.Description>
                  </Field.Root>

                  <Field.Root name="country">
                    <Field.Label>Country</Field.Label>
                    <Select.Root>
                      <Select.Trigger>
                        <Select.Value placeholder="Select a country" />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Positioner>
                          <Select.Popup>
                            <Select.Item value="us">
                              <Select.ItemText>United States</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="ca">
                              <Select.ItemText>Canada</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="uk">
                              <Select.ItemText>United Kingdom</Select.ItemText>
                            </Select.Item>
                          </Select.Popup>
                        </Select.Positioner>
                      </Select.Portal>
                    </Select.Root>
                    <Field.Description>Choose your country</Field.Description>
                  </Field.Root>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Field} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
