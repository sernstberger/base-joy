import { Textarea, Sheet, Typography, Button } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const textareaControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const textareaCodeTemplate = (props: Record<string, string>) =>
  `<Textarea
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"
  placeholder="Enter description"
/>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'error-state', title: 'Error State', level: 3 },
  { id: 'disabled-state', title: 'Disabled State', level: 3 },
  { id: 'fixed-rows', title: 'Fixed Rows', level: 3 },
  { id: 'auto-resize', title: 'Auto-Resize', level: 3 },
  { id: 'controlled-mode', title: 'Controlled Mode', level: 3 },
  { id: 'uncontrolled-mode', title: 'Uncontrolled Mode', level: 3 },
  { id: 'in-context', title: 'In Context', level: 3 },
  { id: 'form-example', title: 'Form Example', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function TextareaPage() {
  return (
    <div>
      <ComponentHeader
        title="Textarea"
        description="A multi-line text input component with variants, colors, sizes, and auto-resize capabilities."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={textareaControls}
              codeTemplate={textareaCodeTemplate}
            >
              {(props) => (
                <Textarea
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  placeholder="Enter description"
                />
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Textarea variant="solid" placeholder="Solid variant" />
<Textarea variant="soft" placeholder="Soft variant (default)" />
<Textarea variant="outlined" placeholder="Outlined variant" />
<Textarea variant="plain" placeholder="Plain variant" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <Textarea variant="solid" placeholder="Solid variant" />
                  <Textarea variant="soft" placeholder="Soft variant (default)" />
                  <Textarea variant="outlined" placeholder="Outlined variant" />
                  <Textarea variant="plain" placeholder="Plain variant" />
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Textarea color="primary" placeholder="Primary color" />
<Textarea color="neutral" placeholder="Neutral color (default)" />
<Textarea color="success" placeholder="Success color" />
<Textarea color="warning" placeholder="Warning color" />
<Textarea color="danger" placeholder="Danger color" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <Textarea color="primary" placeholder="Primary color" />
                  <Textarea color="neutral" placeholder="Neutral color (default)" />
                  <Textarea color="success" placeholder="Success color" />
                  <Textarea color="warning" placeholder="Warning color" />
                  <Textarea color="danger" placeholder="Danger color" />
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Textarea size="sm" placeholder="Small size" />
<Textarea size="md" placeholder="Medium size (default)" />
<Textarea size="lg" placeholder="Large size" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <Textarea size="sm" placeholder="Small size" />
                  <Textarea size="md" placeholder="Medium size (default)" />
                  <Textarea size="lg" placeholder="Large size" />
                </div>
              </Section>

              <Section
                title="Error State"
                titleLevel="h3"
                id="error-state"
                code={`<Textarea error placeholder="This field has an error" />
<Textarea variant="outlined" error placeholder="Outlined with error" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <Textarea error placeholder="This field has an error" />
                  <Textarea variant="outlined" error placeholder="Outlined with error" />
                </div>
              </Section>

              <Section
                title="Disabled State"
                titleLevel="h3"
                id="disabled-state"
                code={`<Textarea disabled placeholder="Disabled textarea" />
<Textarea variant="outlined" disabled defaultValue="Disabled with value" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <Textarea disabled placeholder="Disabled textarea" />
                  <Textarea variant="outlined" disabled defaultValue="Disabled with value" />
                </div>
              </Section>

              <div>
                <Typography level="h3" className="mb-2" id="fixed-rows">
                  Fixed Rows
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">rows</code> prop to set a fixed number of visible rows.
                </Typography>
                <Section
                  code={`<Textarea rows={2} placeholder="2 rows" />
<Textarea rows={4} placeholder="4 rows" />
<Textarea rows={6} placeholder="6 rows" />`}
                  codeLanguage="tsx"
                >
                  <div className="space-y-3">
                    <Textarea rows={2} placeholder="2 rows" />
                    <Textarea rows={4} placeholder="4 rows" />
                    <Textarea rows={6} placeholder="6 rows" />
                  </div>
                </Section>
              </div>

              <div>
                <Typography level="h3" className="mb-2" id="auto-resize">
                  Auto-Resize with Min/Max Rows
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">minRows</code> and{' '}
                  <code className="font-mono text-sm">maxRows</code> to create a textarea that grows with content.
                </Typography>
                <Section
                  code={`<Textarea
  minRows={2}
  maxRows={6}
  placeholder="Start typing... This textarea will grow from 2 to 6 rows"
/>
<Textarea
  minRows={3}
  placeholder="This textarea starts at 3 rows and grows without limit"
/>`}
                  codeLanguage="tsx"
                >
                  <div className="space-y-3">
                    <div>
                      <Typography level="body-sm" className="mb-2 block">
                        Min 2 rows, max 6 rows:
                      </Typography>
                      <Textarea
                        minRows={2}
                        maxRows={6}
                        placeholder="Start typing... This textarea will grow from 2 to 6 rows"
                      />
                    </div>
                    <div>
                      <Typography level="body-sm" className="mb-2 block">
                        Min 3 rows, no max:
                      </Typography>
                      <Textarea
                        minRows={3}
                        placeholder="This textarea starts at 3 rows and grows without limit"
                      />
                    </div>
                  </div>
                </Section>
              </div>

              <div>
                <Typography level="h3" className="mb-2" id="controlled-mode">
                  Controlled Mode
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Control the textarea value through state.
                </Typography>
                <Section
                  code={`<Textarea
  value="This is a controlled textarea. Edit me!"
  onChange={(e) => console.log(e.target.value)}
  rows={3}
/>`}
                  codeLanguage="tsx"
                >
                  <Textarea
                    value="This is a controlled textarea. Edit me!"
                    onChange={(e) => console.log(e.target.value)}
                    rows={3}
                  />
                </Section>
              </div>

              <div>
                <Typography level="h3" className="mb-2" id="uncontrolled-mode">
                  Uncontrolled Mode
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">defaultValue</code> for uncontrolled mode.
                </Typography>
                <Section
                  code={`<Textarea
  defaultValue="This is an uncontrolled textarea with default value."
  rows={3}
/>`}
                  codeLanguage="tsx"
                >
                  <Textarea
                    defaultValue="This is an uncontrolled textarea with default value."
                    rows={3}
                  />
                </Section>
              </div>

              <div>
                <Typography level="h3" className="mb-2" id="in-context">
                  In Context
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Textarea works well within other components like Sheet.
                </Typography>
                <Section
                  code={`<Sheet variant="outlined" color="neutral">
  <div className="space-y-4">
    <div>
      <Typography level="body-sm" weight="medium" className="mb-2 block">
        Feedback
      </Typography>
      <Textarea
        placeholder="Tell us what you think..."
        minRows={3}
        maxRows={8}
      />
    </div>
    <div className="flex gap-2">
      <Button variant="soft" color="neutral">
        Cancel
      </Button>
      <Button variant="solid" color="primary">
        Submit
      </Button>
    </div>
  </div>
</Sheet>`}
                  codeLanguage="tsx"
                >
                  <Sheet variant="outlined" color="neutral">
                    <div className="space-y-4">
                      <div>
                        <Typography level="body-sm" weight="medium" className="mb-2 block">
                          Feedback
                        </Typography>
                        <Textarea
                          placeholder="Tell us what you think..."
                          minRows={3}
                          maxRows={8}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="soft" color="neutral">
                          Cancel
                        </Button>
                        <Button variant="solid" color="primary">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Sheet>
                </Section>
              </div>

              <div>
                <Typography level="h3" className="mb-2" id="form-example">
                  Form Example
                </Typography>
                <Section
                  code={`<Sheet variant="outlined" color="neutral">
  <form className="space-y-4">
    <div>
      <Typography level="body-sm" weight="medium" className="mb-2 block">
        Title
      </Typography>
      <input
        type="text"
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
        placeholder="Enter title"
      />
    </div>
    <div>
      <Typography level="body-sm" weight="medium" className="mb-2 block">
        Description
      </Typography>
      <Textarea
        placeholder="Enter description"
        minRows={2}
        maxRows={6}
      />
    </div>
    <div>
      <Typography level="body-sm" weight="medium" className="mb-2 block">
        Additional Notes
      </Typography>
      <Textarea
        variant="outlined"
        placeholder="Optional notes"
        rows={4}
      />
    </div>
  </form>
</Sheet>`}
                  codeLanguage="tsx"
                >
                  <Sheet variant="outlined" color="neutral">
                    <form className="space-y-4">
                      <div>
                        <Typography level="body-sm" weight="medium" className="mb-2 block">
                          Title
                        </Typography>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                          placeholder="Enter title"
                        />
                      </div>
                      <div>
                        <Typography level="body-sm" weight="medium" className="mb-2 block">
                          Description
                        </Typography>
                        <Textarea
                          placeholder="Enter description"
                          minRows={2}
                          maxRows={6}
                        />
                      </div>
                      <div>
                        <Typography level="body-sm" weight="medium" className="mb-2 block">
                          Additional Notes
                        </Typography>
                        <Textarea
                          variant="outlined"
                          placeholder="Optional notes"
                          rows={4}
                        />
                      </div>
                    </form>
                  </Sheet>
                </Section>
              </div>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Textarea} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
