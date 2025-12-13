import { Separator, Sheet, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { ColorScale } from '@base-joy/tokens';

const separatorControls: PlaygroundControl[] = [
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  {
    name: 'orientation',
    type: 'select',
    options: ['horizontal', 'vertical'],
    defaultValue: 'horizontal',
  },
  { name: 'inset', type: 'boolean', defaultValue: false },
];

const separatorCodeTemplate = (props: Record<string, string>) => {
  const parts = [];
  if (props.color !== 'neutral') parts.push(`color="${props.color}"`);
  if (props.orientation !== 'horizontal')
    parts.push(`orientation="${props.orientation}"`);
  if (props.inset === 'true') parts.push('inset');
  const propsStr = parts.length > 0 ? ' ' + parts.join(' ') : '';
  return `<Separator${propsStr} />`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'orientation', title: 'Orientation', level: 3 },
  { id: 'with-text', title: 'With Text', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'inset', title: 'Inset', level: 3 },
  { id: 'use-cases', title: 'Use Cases', level: 3 },
  { id: 'color-context', title: 'Color Context' },
  { id: 'color-inheritance', title: 'Color Inheritance', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function SeparatorPage() {
  return (
    <div>
      <ComponentHeader
        title="Separator"
        description="A visual separator for content sections, available in horizontal and vertical orientations with optional centered text."
        baseUiUrl="https://base-ui.com/react/components/separator"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={separatorControls}
              codeTemplate={separatorCodeTemplate}
            >
              {(props) => (
                <Sheet variant="outlined" color="neutral" className="min-w-80">
                  {props.orientation === 'vertical' ? (
                    <div className="flex h-32">
                      <div className="flex-1 flex items-center justify-center">
                        <Typography>Left</Typography>
                      </div>
                      <Separator
                        color={props.color as ColorScale}
                        orientation="vertical"
                        inset={props.inset === 'true'}
                      />
                      <div className="flex-1 flex items-center justify-center">
                        <Typography>Right</Typography>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Typography>Above</Typography>
                      <Separator
                        color={props.color as ColorScale}
                        orientation="horizontal"
                        inset={props.inset === 'true'}
                      />
                      <Typography>Below</Typography>
                    </>
                  )}
                </Sheet>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Orientation"
                titleLevel="h3"
                id="orientation"
                code={`// Horizontal (default)
<Separator />

// Vertical
<div className="flex h-32">
  <div className="flex-1">Column 1</div>
  <Separator orientation="vertical" />
  <div className="flex-1">Column 2</div>
</div>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Horizontal (default)
                    </Typography>
                    <Sheet variant="outlined" color="neutral">
                      <Typography>Section 1</Typography>
                      <Separator />
                      <Typography>Section 2</Typography>
                      <Separator />
                      <Typography>Section 3</Typography>
                    </Sheet>
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Vertical
                    </Typography>
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
                </div>
              </Section>

              <Section
                title="With Text"
                titleLevel="h3"
                id="with-text"
                code={`<Separator>Or</Separator>

<Separator>Or continue with</Separator>

<Separator color="primary">Section</Separator>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Pass children to display centered text within the separator.
                  The text color matches the separator's color.
                </Typography>
                <div className="space-y-4">
                  <Sheet variant="outlined" color="neutral">
                    <Typography>Sign in with your account</Typography>
                    <Separator>Or</Separator>
                    <Typography>Create a new account</Typography>
                  </Sheet>
                  <Sheet variant="outlined" color="neutral">
                    <Typography>Enter your email and password</Typography>
                    <Separator color="primary">Or continue with</Separator>
                    <Typography>Social login options</Typography>
                  </Sheet>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Separator color="primary" />
<Separator color="neutral" />
<Separator color="success" />
<Separator color="warning" />
<Separator color="danger" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Sheet variant="outlined" color="neutral">
                    <Typography level="body-sm" className="mb-2">
                      Primary
                    </Typography>
                    <Separator color="primary" />
                  </Sheet>
                  <Sheet variant="outlined" color="neutral">
                    <Typography level="body-sm" className="mb-2">
                      Neutral (default)
                    </Typography>
                    <Separator color="neutral" />
                  </Sheet>
                  <Sheet variant="outlined" color="neutral">
                    <Typography level="body-sm" className="mb-2">
                      Success
                    </Typography>
                    <Separator color="success" />
                  </Sheet>
                  <Sheet variant="outlined" color="neutral">
                    <Typography level="body-sm" className="mb-2">
                      Warning
                    </Typography>
                    <Separator color="warning" />
                  </Sheet>
                  <Sheet variant="outlined" color="neutral">
                    <Typography level="body-sm" className="mb-2">
                      Danger
                    </Typography>
                    <Separator color="danger" />
                  </Sheet>
                </div>
              </Section>

              <Section
                title="Inset"
                titleLevel="h3"
                id="inset"
                code={`// Without inset
<Separator />

// With inset (adds margin on ends)
<Separator inset />`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  The <code className="font-mono text-sm">inset</code> prop adds
                  margin on the ends of the separator, useful for list items.
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
              </Section>

              <Section
                title="Use Cases"
                titleLevel="h3"
                id="use-cases"
                code={`// List items with inset separators
<Sheet className="p-0">
  <div className="p-4">First item</div>
  <Separator inset />
  <div className="p-4">Second item</div>
</Sheet>

// Toolbar sections
<div className="flex items-center gap-3">
  <button>Edit</button>
  <button>Save</button>
  <Separator orientation="vertical" />
  <button>Share</button>
</div>

// Form sections with text
<Separator>Or continue with</Separator>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      List items
                    </Typography>
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
                    <Typography level="body-sm" className="mb-2">
                      Toolbar sections
                    </Typography>
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
                    <Typography level="body-sm" className="mb-2">
                      Form sections with text
                    </Typography>
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
              </Section>
            </div>
          </Section>

          <Section title="Color Context" id="color-context">
            <Typography level="body-sm" className="mb-4">
              Separator automatically inherits color from parent Sheet
              components via ColorContext. This means separators inside colored
              containers will match the container's color scheme.
            </Typography>
            <div className="space-y-8">
              <Section
                title="Color Inheritance"
                titleLevel="h3"
                id="color-inheritance"
                code={`// Separator inherits color from parent Sheet
<Sheet variant="soft" color="primary">
  <Typography>Content above</Typography>
  <Separator />  {/* Inherits primary color */}
  <Typography>Content below</Typography>
</Sheet>

// Explicit color overrides inherited color
<Sheet variant="soft" color="success">
  <Separator color="danger" />  {/* Uses danger, not success */}
</Sheet>`}
                codeLanguage="tsx"
              >
                <Typography level="body-xs" className="text-neutral-600 mb-4">
                  Child separators automatically inherit the parent Sheet's color,
                  eliminating the need to pass color props.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Sheet variant="soft" color="primary" className="flex-1 min-w-60">
                    <Typography level="body-sm" weight="medium">
                      Primary Sheet
                    </Typography>
                    <Separator className="my-2" />
                    <Typography level="body-xs">
                      Separator inherits primary color
                    </Typography>
                  </Sheet>
                  <Sheet variant="soft" color="success" className="flex-1 min-w-60">
                    <Typography level="body-sm" weight="medium">
                      Success Sheet
                    </Typography>
                    <Separator className="my-2" />
                    <Typography level="body-xs">
                      Separator inherits success color
                    </Typography>
                  </Sheet>
                  <Sheet variant="soft" color="danger" className="flex-1 min-w-60">
                    <Typography level="body-sm" weight="medium">
                      Danger Sheet
                    </Typography>
                    <Separator className="my-2" />
                    <Typography level="body-xs">
                      Separator inherits danger color
                    </Typography>
                  </Sheet>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Separator} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
