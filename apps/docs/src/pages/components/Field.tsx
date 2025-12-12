import { Field, Input, Typography } from '@base-joy/ui-components';
import { Section } from '../../components/Section';

export function FieldPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Field</Typography>
        <Typography level="body-lg">
          A compound component for form fields with label, description, and error handling.
        </Typography>
      </header>

      <Section title="Basic Usage">
        <div className="space-y-4 max-w-md">
          <Field.Root name="email">
            <Field.Label>Email</Field.Label>
            <Field.Control type="email" placeholder="you@example.com" />
          </Field.Root>
        </div>
      </Section>

      <Section title="With Description">
        <div className="space-y-4 max-w-md">
          <Field.Root name="bio">
            <Field.Label>Bio</Field.Label>
            <Field.Control placeholder="Tell us about yourself" />
            <Field.Description>
              A brief description about yourself (max 200 characters).
            </Field.Description>
          </Field.Root>
        </div>
      </Section>

      <Section title="Required Fields">
        <div className="space-y-4 max-w-md">
          <Field.Root name="username">
            <Field.Label required>Username</Field.Label>
            <Field.Control required placeholder="Choose a username" />
            <Field.Error match="valueMissing">Username is required</Field.Error>
          </Field.Root>
        </div>
      </Section>

      <Section title="Error States">
        <div className="space-y-4 max-w-md">
          <Field.Root name="email" invalid>
            <Field.Label required>Email</Field.Label>
            <Field.Control type="email" />
            <Field.Error match>Please enter a valid email</Field.Error>
          </Field.Root>

          <Field.Root name="password">
            <Field.Label required>Password</Field.Label>
            <Field.Control type="password" required minLength={8} />
            <Field.Error match="valueMissing">Password is required</Field.Error>
            <Field.Error match="tooShort">Password must be at least 8 characters</Field.Error>
          </Field.Root>
        </div>
      </Section>

      <Section title="Sizes">
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

      <Section title="With Custom Input">
        <div className="space-y-4 max-w-md">
          <Field.Root name="styled">
            <Field.Label>Styled Input</Field.Label>
            <Input variant="outlined" placeholder="Using Input component" />
            <Field.Description>Using the styled Input component</Field.Description>
          </Field.Root>
        </div>
      </Section>

      <Section title="Custom Validation">
        <div className="space-y-4 max-w-md">
          <Field.Root
            name="custom"
            validate={(value) => {
              if (typeof value === 'string' && value.length < 5) {
                return 'Must be at least 5 characters';
              }
              return null;
            }}
          >
            <Field.Label>Custom Validated</Field.Label>
            <Field.Control placeholder="Type at least 5 characters" />
            <Field.Error match>Validation error</Field.Error>
          </Field.Root>
        </div>
      </Section>
    </div>
  );
}
