import { Form, Field, Button, Typography, Textarea } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';

const sections = [
  { id: 'examples', title: 'Examples' },
  { id: 'basic-form', title: 'Basic Form', level: 3 },
  { id: 'login-form', title: 'Login Form', level: 3 },
  { id: 'contact-form', title: 'Contact Form', level: 3 },
  { id: 'validation-modes', title: 'Validation Modes', level: 3 },
  { id: 'form-validation', title: 'Form Validation', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function FormPage() {
  return (
    <div>
      <ComponentHeader
        title="Form"
        description="A form container with validation support, wrapping Base UI Form for accessible, type-safe form handling."
        baseUiUrl="https://base-ui.com/react/components/form"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Basic Form"
                titleLevel="h3"
                id="basic-form"
                code={`<Form
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
    <Field.Error match="valueMissing">Password is required</Field.Error>
  </Field.Root>

  <Button type="submit">Submit</Button>
</Form>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">onFormSubmit</code> to
                  handle form submission with automatic{' '}
                  <code className="font-mono text-sm">preventDefault</code>.
                </Typography>
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
                    <Field.Error match="valueMissing">Password is required</Field.Error>
                  </Field.Root>

                  <Button type="submit">Submit</Button>
                </Form>
              </Section>

              <Section
                title="Login Form"
                titleLevel="h3"
                id="login-form"
                code={`<Form
  validationMode="onSubmit"
  onFormSubmit={(values) => {
    console.log('Login attempt:', values);
  }}
  className="space-y-4 max-w-md"
>
  <Field.Root name="username">
    <Field.Label required>Username</Field.Label>
    <Field.Control required placeholder="Enter username" />
    <Field.Error match="valueMissing">Username is required</Field.Error>
  </Field.Root>

  <Field.Root name="password">
    <Field.Label required>Password</Field.Label>
    <Field.Control type="password" required placeholder="Enter password" />
    <Field.Error match="valueMissing">Password is required</Field.Error>
  </Field.Root>

  <div className="flex items-center gap-2">
    <Button type="submit">Sign In</Button>
    <Button variant="plain" color="neutral" type="button">
      Forgot password?
    </Button>
  </div>
</Form>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  A typical login form with username and password fields.
                </Typography>
                <Form
                  validationMode="onSubmit"
                  onFormSubmit={(values) => {
                    console.log('Login attempt:', values);
                  }}
                  className="space-y-4 max-w-md"
                >
                  <Field.Root name="username">
                    <Field.Label required>Username</Field.Label>
                    <Field.Control required placeholder="Enter username" />
                    <Field.Error match="valueMissing">Username is required</Field.Error>
                  </Field.Root>

                  <Field.Root name="password">
                    <Field.Label required>Password</Field.Label>
                    <Field.Control type="password" required placeholder="Enter password" />
                    <Field.Error match="valueMissing">Password is required</Field.Error>
                  </Field.Root>

                  <div className="flex items-center gap-2">
                    <Button type="submit">Sign In</Button>
                    <Button variant="plain" color="neutral" type="button">
                      Forgot password?
                    </Button>
                  </div>
                </Form>
              </Section>

              <Section
                title="Contact Form"
                titleLevel="h3"
                id="contact-form"
                code={`<Form
  onFormSubmit={(values) => console.log('Contact form:', values)}
  className="space-y-4 max-w-md"
>
  <Field.Root name="name">
    <Field.Label required>Name</Field.Label>
    <Field.Control required placeholder="Your name" />
    <Field.Error match="valueMissing">Name is required</Field.Error>
  </Field.Root>

  <Field.Root name="email">
    <Field.Label required>Email</Field.Label>
    <Field.Control type="email" required placeholder="you@example.com" />
    <Field.Error match="valueMissing">Email is required</Field.Error>
    <Field.Error match="typeMismatch">
      Please enter a valid email address
    </Field.Error>
  </Field.Root>

  <Field.Root name="message">
    <Field.Label required>Message</Field.Label>
    <Textarea
      required
      placeholder="Your message here..."
      rows={4}
      name="message"
    />
    <Field.Error match="valueMissing">Message is required</Field.Error>
  </Field.Root>

  <Button type="submit">Send Message</Button>
</Form>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  A contact form with name, email, and message fields.
                </Typography>
                <Form
                  onFormSubmit={(values) => console.log('Contact form:', values)}
                  className="space-y-4 max-w-md"
                >
                  <Field.Root name="name">
                    <Field.Label required>Name</Field.Label>
                    <Field.Control required placeholder="Your name" />
                    <Field.Error match="valueMissing">Name is required</Field.Error>
                  </Field.Root>

                  <Field.Root name="email">
                    <Field.Label required>Email</Field.Label>
                    <Field.Control type="email" required placeholder="you@example.com" />
                    <Field.Error match="valueMissing">Email is required</Field.Error>
                    <Field.Error match="typeMismatch">
                      Please enter a valid email address
                    </Field.Error>
                  </Field.Root>

                  <Field.Root name="message">
                    <Field.Label required>Message</Field.Label>
                    <Textarea
                      required
                      placeholder="Your message here..."
                      rows={4}
                      name="message"
                    />
                    <Field.Error match="valueMissing">Message is required</Field.Error>
                  </Field.Root>

                  <Button type="submit">Send Message</Button>
                </Form>
              </Section>

              <Section
                title="Validation Modes"
                titleLevel="h3"
                id="validation-modes"
                code={`// onSubmit (default) - validates on form submission
<Form validationMode="onSubmit">
  <Field.Root name="name">
    <Field.Label>Name</Field.Label>
    <Field.Control required placeholder="Your name" />
    <Field.Error match="valueMissing">Name is required</Field.Error>
  </Field.Root>
</Form>

// onBlur - validates when field loses focus
<Form validationMode="onBlur">
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Field.Control type="email" required placeholder="you@example.com" />
    <Field.Error match="valueMissing">Email is required</Field.Error>
    <Field.Error match="typeMismatch">Invalid email format</Field.Error>
  </Field.Root>
</Form>

// onChange - validates on every change
<Form validationMode="onChange">
  <Field.Root name="username">
    <Field.Label>Username</Field.Label>
    <Field.Control required minLength={3} placeholder="min 3 characters" />
    <Field.Error match="valueMissing">Username is required</Field.Error>
    <Field.Error match="tooShort">
      Username must be at least 3 characters
    </Field.Error>
  </Field.Root>
</Form>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Control when validation occurs with the{' '}
                  <code className="font-mono text-sm">validationMode</code> prop.
                </Typography>
                <div className="space-y-6">
                  <div>
                    <Typography level="body-sm" weight="medium" className="mb-2">
                      onSubmit (default)
                    </Typography>
                    <Typography level="body-sm" className="mb-3">
                      Validates when form is submitted.
                    </Typography>
                    <Form validationMode="onSubmit" className="max-w-md">
                      <Field.Root name="name">
                        <Field.Label>Name</Field.Label>
                        <Field.Control required placeholder="Your name" />
                        <Field.Error match="valueMissing">Name is required</Field.Error>
                      </Field.Root>
                    </Form>
                  </div>

                  <div>
                    <Typography level="body-sm" weight="medium" className="mb-2">
                      onBlur
                    </Typography>
                    <Typography level="body-sm" className="mb-3">
                      Validates when field loses focus.
                    </Typography>
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
                    <Typography level="body-sm" weight="medium" className="mb-2">
                      onChange
                    </Typography>
                    <Typography level="body-sm" className="mb-3">
                      Validates on every change.
                    </Typography>
                    <Form validationMode="onChange" className="max-w-md">
                      <Field.Root name="username">
                        <Field.Label>Username</Field.Label>
                        <Field.Control required minLength={3} placeholder="min 3 characters" />
                        <Field.Error match="valueMissing">Username is required</Field.Error>
                        <Field.Error match="tooShort">
                          Username must be at least 3 characters
                        </Field.Error>
                      </Field.Root>
                    </Form>
                  </div>
                </div>
              </Section>

              <Section
                title="Form Validation"
                titleLevel="h3"
                id="form-validation"
                code={`<Form
  validationMode="onBlur"
  onFormSubmit={(values) => console.log('Valid form:', values)}
  className="space-y-4 max-w-md"
>
  <Field.Root name="email">
    <Field.Label required>Email</Field.Label>
    <Field.Control type="email" required placeholder="you@example.com" />
    <Field.Error match="valueMissing">Email is required</Field.Error>
    <Field.Error match="typeMismatch">
      Please enter a valid email address
    </Field.Error>
    <Field.Description>
      Enter your email address to receive updates
    </Field.Description>
  </Field.Root>

  <Field.Root name="age">
    <Field.Label required>Age</Field.Label>
    <Field.Control type="number" required min={18} max={120} placeholder="18" />
    <Field.Error match="valueMissing">Age is required</Field.Error>
    <Field.Error match="rangeUnderflow">
      You must be at least 18 years old
    </Field.Error>
    <Field.Error match="rangeOverflow">
      Please enter a valid age
    </Field.Error>
  </Field.Root>

  <Field.Root name="website">
    <Field.Label>Website</Field.Label>
    <Field.Control type="url" placeholder="https://example.com" />
    <Field.Error match="typeMismatch">
      Please enter a valid URL (e.g., https://example.com)
    </Field.Error>
  </Field.Root>

  <Button type="submit">Submit</Button>
</Form>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Demonstrate various validation patterns including required fields,
                  type validation, and range constraints.
                </Typography>
                <Form
                  validationMode="onBlur"
                  onFormSubmit={(values) => console.log('Valid form:', values)}
                  className="space-y-4 max-w-md"
                >
                  <Field.Root name="email">
                    <Field.Label required>Email</Field.Label>
                    <Field.Control type="email" required placeholder="you@example.com" />
                    <Field.Error match="valueMissing">Email is required</Field.Error>
                    <Field.Error match="typeMismatch">
                      Please enter a valid email address
                    </Field.Error>
                    <Field.Description>
                      Enter your email address to receive updates
                    </Field.Description>
                  </Field.Root>

                  <Field.Root name="age">
                    <Field.Label required>Age</Field.Label>
                    <Field.Control type="number" required min={18} max={120} placeholder="18" />
                    <Field.Error match="valueMissing">Age is required</Field.Error>
                    <Field.Error match="rangeUnderflow">
                      You must be at least 18 years old
                    </Field.Error>
                    <Field.Error match="rangeOverflow">
                      Please enter a valid age
                    </Field.Error>
                  </Field.Root>

                  <Field.Root name="website">
                    <Field.Label>Website</Field.Label>
                    <Field.Control type="url" placeholder="https://example.com" />
                    <Field.Error match="typeMismatch">
                      Please enter a valid URL (e.g., https://example.com)
                    </Field.Error>
                  </Field.Root>

                  <Button type="submit">Submit</Button>
                </Form>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Form} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
