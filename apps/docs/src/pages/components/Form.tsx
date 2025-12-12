import { Form, Field, Fieldset, Button } from '@base-joy/ui-core';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';

export function FormPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Form</Heading>
        <Text variant="subtitle">
          A form container with validation support, wrapping Base UI Form.
        </Text>
      </header>

      <Section title="Basic Usage">
        <Form
          onFormSubmit={(values) => console.log('Form submitted:', values)}
          className="space-y-4 max-w-md"
        >
          <Field.Root name="email">
            <Field.Label required>Email</Field.Label>
            <Field.Control type="email" placeholder="you@example.com" />
            <Field.Error match="valueMissing">Email is required</Field.Error>
          </Field.Root>

          <Field.Root name="password">
            <Field.Label required>Password</Field.Label>
            <Field.Control type="password" placeholder="••••••••" />
          </Field.Root>

          <Button type="submit">Submit</Button>
        </Form>
      </Section>

      <Section title="Validation Modes">
        <div className="space-y-8">
          <div>
            <Heading level={3}>onSubmit (default)</Heading>
            <Text variant="muted" className="mb-4">
              Validates when form is submitted.
            </Text>
            <Form validationMode="onSubmit" className="max-w-md">
              <Field.Root name="name">
                <Field.Label>Name</Field.Label>
                <Field.Control required placeholder="Your name" />
                <Field.Error match="valueMissing">Name is required</Field.Error>
              </Field.Root>
            </Form>
          </div>

          <div>
            <Heading level={3}>onBlur</Heading>
            <Text variant="muted" className="mb-4">
              Validates when field loses focus.
            </Text>
            <Form validationMode="onBlur" className="max-w-md">
              <Field.Root name="email">
                <Field.Label>Email</Field.Label>
                <Field.Control type="email" required placeholder="you@example.com" />
                <Field.Error match="valueMissing">Email is required</Field.Error>
                <Field.Error match="typeMismatch">Invalid email format</Field.Error>
              </Field.Root>
            </Form>
          </div>

          <div>
            <Heading level={3}>onChange</Heading>
            <Text variant="muted" className="mb-4">
              Validates on every change.
            </Text>
            <Form validationMode="onChange" className="max-w-md">
              <Field.Root name="username">
                <Field.Label>Username</Field.Label>
                <Field.Control required minLength={3} placeholder="min 3 characters" />
                <Field.Error match="valueMissing">Username is required</Field.Error>
                <Field.Error match="tooShort">Username must be at least 3 characters</Field.Error>
              </Field.Root>
            </Form>
          </div>
        </div>
      </Section>

      <Section title="With Fieldset">
        <Form className="max-w-lg">
          <Fieldset.Root variant="outlined">
            <Fieldset.Legend>Account Information</Fieldset.Legend>

            <div className="space-y-4">
              <Field.Root name="firstName">
                <Field.Label>First Name</Field.Label>
                <Field.Control placeholder="John" />
              </Field.Root>

              <Field.Root name="lastName">
                <Field.Label>Last Name</Field.Label>
                <Field.Control placeholder="Doe" />
              </Field.Root>

              <Field.Root name="email">
                <Field.Label required>Email</Field.Label>
                <Field.Control type="email" placeholder="john@example.com" />
                <Field.Description>We'll never share your email.</Field.Description>
              </Field.Root>
            </div>
          </Fieldset.Root>

          <div className="mt-4">
            <Button type="submit">Create Account</Button>
          </div>
        </Form>
      </Section>
    </div>
  );
}
