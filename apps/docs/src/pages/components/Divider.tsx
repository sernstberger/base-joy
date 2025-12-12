import { Divider, Sheet } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';

const dividerControls: PlaygroundControl[] = [
  {
    name: 'color',
    type: 'color',
    defaultValue: 'neutral',
  },
];

const dividerCodeTemplate = (props: Record<string, string>) => {
  const color = props.color !== 'neutral' ? ` color="${props.color}"` : '';
  return `<Divider${color} />`;
};

const dividerProps: PropMeta[] = [
  {
    name: 'orientation',
    type: '"horizontal" | "vertical"',
    defaultValue: '"horizontal"',
    description: 'The orientation of the divider.',
    required: false,
  },
  {
    name: 'color',
    type: '"primary" | "neutral" | "success" | "warning" | "danger"',
    defaultValue: '"neutral"',
    description: 'The color scheme of the divider.',
    required: false,
  },
  {
    name: 'inset',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Adds margin on the ends of the divider.',
    required: false,
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Optional text content to display in the center of the divider.',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

export function DividerPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Divider</Heading>
        <Text variant="subtitle">
          A visual separator for content sections, available in horizontal and vertical orientations with optional centered text.
        </Text>
      </header>

      <Section title="Playground">
        <Playground controls={dividerControls} codeTemplate={dividerCodeTemplate}>
          {(props) => (
            <Sheet variant="outlined" color="neutral">
              <Text>Above</Text>
              <Divider color={props.color as any} />
              <Text>Below</Text>
            </Sheet>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Horizontal (default)</Heading>
            <Sheet variant="outlined" color="neutral">
              <Text>Section 1</Text>
              <Divider />
              <Text>Section 2</Text>
              <Divider />
              <Text>Section 3</Text>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Vertical</Heading>
            <Sheet variant="outlined" color="neutral">
              <div className="flex h-32">
                <div className="flex-1 flex items-center justify-center">
                  <Text>Column 1</Text>
                </div>
                <Divider orientation="vertical" />
                <div className="flex-1 flex items-center justify-center">
                  <Text>Column 2</Text>
                </div>
                <Divider orientation="vertical" />
                <div className="flex-1 flex items-center justify-center">
                  <Text>Column 3</Text>
                </div>
              </div>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>With Text</Heading>
            <Sheet variant="outlined" color="neutral">
              <Text>Sign in with your account</Text>
              <Divider>Or</Divider>
              <Text>Create a new account</Text>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Colors</Heading>
            <div className="space-y-4">
              <Sheet variant="outlined" color="neutral">
                <Text variant="muted" className="mb-2">Primary</Text>
                <Divider color="primary" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Text variant="muted" className="mb-2">Neutral (default)</Text>
                <Divider color="neutral" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Text variant="muted" className="mb-2">Success</Text>
                <Divider color="success" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Text variant="muted" className="mb-2">Warning</Text>
                <Divider color="warning" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Text variant="muted" className="mb-2">Danger</Text>
                <Divider color="danger" />
              </Sheet>
            </div>
          </div>

          <div>
            <Heading level={3}>Inset</Heading>
            <Text variant="muted" className="mb-3">
              Add margin on the ends of the divider.
            </Text>
            <div className="space-y-4">
              <Sheet variant="outlined" color="neutral">
                <Text>Without inset</Text>
                <Divider />
                <Text>Content touches edges</Text>
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Text>With inset</Text>
                <Divider inset />
                <Text>Content has margin</Text>
              </Sheet>
            </div>
          </div>

          <div>
            <Heading level={3}>Use Cases</Heading>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">List items</Text>
                <Sheet variant="outlined" color="neutral" className="p-0">
                  <div className="p-4">
                    <Text>First item</Text>
                  </div>
                  <Divider inset />
                  <div className="p-4">
                    <Text>Second item</Text>
                  </div>
                  <Divider inset />
                  <div className="p-4">
                    <Text>Third item</Text>
                  </div>
                </Sheet>
              </div>
              <div>
                <Text variant="muted" className="mb-2">Toolbar sections</Text>
                <Sheet variant="outlined" color="neutral">
                  <div className="flex items-center gap-3 h-12">
                    <button className="px-3 py-1 hover:bg-neutral-100 rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 hover:bg-neutral-100 rounded">
                      Save
                    </button>
                    <Divider orientation="vertical" />
                    <button className="px-3 py-1 hover:bg-neutral-100 rounded">
                      Share
                    </button>
                    <button className="px-3 py-1 hover:bg-neutral-100 rounded">
                      Export
                    </button>
                    <Divider orientation="vertical" />
                    <button className="px-3 py-1 hover:bg-neutral-100 rounded">
                      Settings
                    </button>
                  </div>
                </Sheet>
              </div>
              <div>
                <Text variant="muted" className="mb-2">Form sections with text</Text>
                <Sheet variant="outlined" color="neutral">
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <Divider className="my-4">Or continue with</Divider>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 border rounded hover:bg-neutral-50">
                      Sign in with Google
                    </button>
                    <button className="w-full px-3 py-2 border rounded hover:bg-neutral-50">
                      Sign in with GitHub
                    </button>
                  </div>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <div>
          <Heading level={3}>Divider</Heading>
          <PropsTable props={dividerProps} />
        </div>
      </Section>
    </div>
  );
}
