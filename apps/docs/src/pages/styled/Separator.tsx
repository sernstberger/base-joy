import { Separator, Sheet, Typography } from '@base-joy/ui-styled';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';

const separatorControls: PlaygroundControl[] = [
  {
    name: 'color',
    type: 'color',
    defaultValue: 'neutral',
  },
];

const separatorCodeTemplate = (props: Record<string, string>) => {
  const color = props.color !== 'neutral' ? ` color="${props.color}"` : '';
  return `<Separator${color} />`;
};

export function SeparatorPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Separator</Typography>
        <Typography level="body-lg">
          A visual separator for content sections, available in horizontal and vertical orientations with optional centered text.
        </Typography>
      </header>

      <Section title="Playground">
        <Playground controls={separatorControls} codeTemplate={separatorCodeTemplate}>
          {(props) => (
            <Sheet variant="outlined" color="neutral">
              <Typography>Above</Typography>
              <Separator color={props.color as any} />
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
              <Separator />
              <Typography>Section 2</Typography>
              <Separator />
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
                <Separator orientation="vertical" />
                <div className="flex-1 flex items-center justify-center">
                  <Typography>Column 2</Typography>
                </div>
                <Separator orientation="vertical" />
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
              <Separator>Or</Separator>
              <Typography>Create a new account</Typography>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Colors</Typography>
            <div className="space-y-4">
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Primary</Typography>
                <Separator color="primary" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Neutral (default)</Typography>
                <Separator color="neutral" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Success</Typography>
                <Separator color="success" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Warning</Typography>
                <Separator color="warning" />
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography level="body-sm" className="mb-2">Danger</Typography>
                <Separator color="danger" />
              </Sheet>
            </div>
          </div>

          <div>
            <Typography level="h3">Inset</Typography>
            <Typography level="body-sm" className="mb-3">
              Add margin on the ends of the separator.
            </Typography>
            <div className="space-y-4">
              <Sheet variant="outlined" color="neutral">
                <Typography>Without inset</Typography>
                <Separator />
                <Typography>Content touches edges</Typography>
              </Sheet>
              <Sheet variant="outlined" color="neutral">
                <Typography>With inset</Typography>
                <Separator inset />
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
                  <Separator inset />
                  <div className="p-4">
                    <Typography>Second item</Typography>
                  </div>
                  <Separator inset />
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
                    <Separator orientation="vertical" />
                    <button className="px-3 py-1 hover:bg-neutral-100 rounded">
                      Share
                    </button>
                    <button className="px-3 py-1 hover:bg-neutral-100 rounded">
                      Export
                    </button>
                    <Separator orientation="vertical" />
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
                  <Separator className="my-4">Or continue with</Separator>
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
          <Typography level="h3">Separator</Typography>
          <PropsTable props={componentProps.Separator} />
        </div>
      </Section>
    </div>
  );
}
