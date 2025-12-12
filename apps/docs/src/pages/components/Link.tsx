import { Link, Sheet } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';
import type { ColorScale } from '@base-joy/tokens';

const linkControls: PlaygroundControl[] = [
  { name: 'color', type: 'color', defaultValue: 'primary' },
];

const linkCodeTemplate = (props: Record<string, string>) =>
  `<Link href="/page" color="${props.color}" underline="${props.underline}">Click here</Link>`;

const linkProps: PropMeta[] = [
  {
    name: 'color',
    type: '"primary" | "neutral" | "success" | "warning" | "danger"',
    defaultValue: '"primary"',
    description: 'The color scheme of the link.',
    required: false,
  },
  {
    name: 'underline',
    type: '"none" | "hover" | "always"',
    defaultValue: '"hover"',
    description: 'When to show the underline.',
    required: false,
  },
  {
    name: 'external',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If true, opens link in new tab with security attributes.',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'If true, link is disabled.',
    required: false,
  },
  {
    name: 'as',
    type: 'React.ElementType',
    defaultValue: '"a"',
    description: 'The element type to render as (for use with router links).',
    required: false,
  },
  {
    name: 'href',
    type: 'string',
    description: 'The URL to navigate to.',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

export function LinkPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Link</Heading>
        <Text variant="subtitle">
          A styled link component with color variants, underline options, and external link support.
        </Text>
      </header>

      <Section title="Playground">
        <Playground controls={linkControls} codeTemplate={linkCodeTemplate}>
          {(props) => (
            <Sheet variant="outlined" color="neutral" className="p-6">
              <Link
                href="#"
                color={props.color as ColorScale}
                underline={props.underline as 'none' | 'hover' | 'always'}
              >
                Click here to navigate
              </Link>
            </Sheet>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Colors</Heading>
            <Sheet variant="outlined" color="neutral" className="p-6">
              <div className="flex flex-col gap-3">
                <Link href="#" color="primary">
                  Primary Link
                </Link>
                <Link href="#" color="neutral">
                  Neutral Link
                </Link>
                <Link href="#" color="success">
                  Success Link
                </Link>
                <Link href="#" color="warning">
                  Warning Link
                </Link>
                <Link href="#" color="danger">
                  Danger Link
                </Link>
              </div>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Underline Variants</Heading>
            <Sheet variant="outlined" color="neutral" className="p-6">
              <div className="flex flex-col gap-3">
                <div>
                  <Text variant="muted" className="text-sm mb-1">
                    No underline
                  </Text>
                  <Link href="#" underline="none">
                    Link without underline
                  </Link>
                </div>
                <div>
                  <Text variant="muted" className="text-sm mb-1">
                    Hover underline (default)
                  </Text>
                  <Link href="#" underline="hover">
                    Link with underline on hover
                  </Link>
                </div>
                <div>
                  <Text variant="muted" className="text-sm mb-1">
                    Always underline
                  </Text>
                  <Link href="#" underline="always">
                    Link with permanent underline
                  </Link>
                </div>
              </div>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>External Links</Heading>
            <Text variant="muted" className="mb-3">
              External links automatically add target="_blank" and rel="noopener noreferrer" for security,
              and display an external icon.
            </Text>
            <Sheet variant="outlined" color="neutral" className="p-6">
              <div className="flex flex-col gap-3">
                <Link href="https://example.com" external>
                  Visit external site
                </Link>
                <Link href="https://github.com" external color="neutral">
                  GitHub Repository
                </Link>
                <Link href="https://docs.example.com" external color="primary">
                  View Documentation
                </Link>
              </div>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Disabled State</Heading>
            <Sheet variant="outlined" color="neutral" className="p-6">
              <div className="flex flex-col gap-3">
                <Link href="#" disabled>
                  Disabled Primary Link
                </Link>
                <Link href="#" color="success" disabled>
                  Disabled Success Link
                </Link>
                <Link href="https://example.com" external disabled>
                  Disabled External Link
                </Link>
              </div>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>In Context</Heading>
            <Text variant="muted" className="mb-3">
              Links work naturally within text content.
            </Text>
            <Sheet variant="outlined" color="neutral" className="p-6">
              <Text>
                This is a paragraph with an{' '}
                <Link href="#" color="primary">
                  inline link
                </Link>{' '}
                that flows naturally with the text. You can also visit our{' '}
                <Link href="https://docs.example.com" external>
                  documentation
                </Link>{' '}
                for more information.
              </Text>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Polymorphic Usage</Heading>
            <Text variant="muted" className="mb-3">
              Use the `as` prop to render Link with a custom component like React Router's Link.
            </Text>
            <Sheet variant="outlined" color="neutral" className="p-6">
              <div className="space-y-2">
                <pre className="text-sm bg-neutral-100 p-3 rounded">
                  {`import { Link as RouterLink } from 'react-router';

<Link as={RouterLink} to="/dashboard" color="primary">
  Go to Dashboard
</Link>`}
                </pre>
              </div>
            </Sheet>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={linkProps} />
      </Section>
    </div>
  );
}
