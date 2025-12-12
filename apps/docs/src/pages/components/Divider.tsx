import { Divider, Sheet, Typography } from '@base-joy/ui-components';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';

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

export function DividerPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Divider</Typography>
        <Typography level="body-lg">
          A visual separator for content sections, available in horizontal and vertical orientations with optional centered text.
        </Typography>
      </header>

      <Section title="Playground">
        <Playground controls={dividerControls} codeTemplate={dividerCodeTemplate}>
          {(props) => (
            <Sheet variant="outlined" color="neutral">
              <Typography>Above</Typography>
              <Divider color={props.color as any} />
              <Typography>Below</Typography>
            </Sheet>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Horizontal (default)</Typography>
            <Sheet variant="outlined" color="neutral">
              <Typography>Section 1</Typography>
              <Divider />
              <Typography>Section 2</Typography>
              <Divider />
              <Typography>Section 3</Typography>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Vertical</Typography>
            <Sheet variant="outlined" color="neutral">
              <div className="flex h-32">
                <div className="flex-1 flex items-center justify-center">
                  <Typography>Column 1</Typography>
                </div>
                <Divider orientation="vertical" />
                <div className="flex-1 flex items-center justify-center">
                  <Typography>Column 2</Typography>
                </div>
                <Divider orientation="vertical" />
                <div className="flex-1 flex items-center justify-center">
                  <Typography>Column 3</Typography>
                </div>
              </div>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">With Text</Typography>
            <Sheet variant="outlined" color="neutral">
              <Typography>Sign in with your account</Typography>
              <Divider>Or</Divider>
              <Typography>Create a new account</Typography>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Colors</Typography>
            <div className="space-y-4">
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Primary</Typography>
                <Divider color="primary" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Neutral (default)</Typography>
                <Divider color="neutral" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Success</Typography>
                <Divider color="success" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Warning</Typography>
                <Divider color="warning" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Danger</Typography>
                <Divider color="danger" />
              </Sheet>
            </div>
          </div>

          <div>
            <Typography level="h3">Inset</Typography>
            <Typography level="body-sm" className="mb-3">
              Add margin on the ends of the divider.
            </Typography>
            <div className="space-y-4">
              <Sheet variant="outlined" color="neutral">
                <Typography>Without inset</Typography>
                <Divider />
                <Typography>Content touches edges</Typography>
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography>With inset</Typography>
                <Divider inset />
                <Typography>Content has margin</Typography>
              </Sheet>
            </div>
          </div>

          <div>
            <Typography level="h3">Use Cases</Typography>
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" className="mb-2">List items</Typography>
                <Sheet variant="outlined" color="neutral" className="p-0">
                  <div className="p-4">
                    <Typography>First item</Typography>
                  </div>
                  <Divider inset />
                  <div className="p-4">
                    <Typography>Second item</Typography>
                  </div>
                  <Divider inset />
                  <div className="p-4">
                    <Typography>Third item</Typography>
                  </div>
                </Sheet>
              </div>
              <div>
                <Typography level="body-sm" className="mb-2">Toolbar sections</Typography>
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
                <Typography level="body-sm" className="mb-2">Form sections with text</Typography>
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
          <Typography level="h3">Divider</Typography>
          <PropsTable props={componentProps.Divider} />
        </div>
      </Section>
    </div>
  );
}
