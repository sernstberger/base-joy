import { Textarea, Sheet, Typography } from '@base-joy/ui-components';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

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

export function TextareaPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Textarea</Typography>
        <Typography level="body-lg">
          A multi-line text input component with variants, colors, sizes, and auto-resize capabilities.
        </Typography>
      </header>

      <Section title="Playground">
        <Playground controls={textareaControls} codeTemplate={textareaCodeTemplate}>
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

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Variants</Typography>
            <div className="space-y-3">
              <Textarea variant="solid" placeholder="Solid variant" />
              <Textarea variant="soft" placeholder="Soft variant (default)" />
              <Textarea variant="outlined" placeholder="Outlined variant" />
              <Textarea variant="plain" placeholder="Plain variant" />
            </div>
          </div>

          <div>
            <Typography level="h3">Colors</Typography>
            <div className="space-y-3">
              <Textarea color="primary" placeholder="Primary color" />
              <Textarea color="neutral" placeholder="Neutral color (default)" />
              <Textarea color="success" placeholder="Success color" />
              <Textarea color="warning" placeholder="Warning color" />
              <Textarea color="danger" placeholder="Danger color" />
            </div>
          </div>

          <div>
            <Typography level="h3">Sizes</Typography>
            <div className="space-y-3">
              <Textarea size="sm" placeholder="Small size" />
              <Textarea size="md" placeholder="Medium size (default)" />
              <Textarea size="lg" placeholder="Large size" />
            </div>
          </div>

          <div>
            <Typography level="h3">Error State</Typography>
            <div className="space-y-3">
              <Textarea error placeholder="This field has an error" />
              <Textarea variant="outlined" error placeholder="Outlined with error" />
            </div>
          </div>

          <div>
            <Typography level="h3">Disabled State</Typography>
            <div className="space-y-3">
              <Textarea disabled placeholder="Disabled textarea" />
              <Textarea variant="outlined" disabled defaultValue="Disabled with value" />
            </div>
          </div>

          <div>
            <Typography level="h3">Fixed Rows</Typography>
            <Typography level="body-sm" className="mb-3">
              Use the <code>rows</code> prop to set a fixed number of visible rows.
            </Typography>
            <div className="space-y-3">
              <Textarea rows={2} placeholder="2 rows" />
              <Textarea rows={4} placeholder="4 rows" />
              <Textarea rows={6} placeholder="6 rows" />
            </div>
          </div>

          <div>
            <Typography level="h3">Auto-Resize with Min/Max Rows</Typography>
            <Typography level="body-sm" className="mb-3">
              Use <code>minRows</code> and <code>maxRows</code> to create a textarea that grows with content.
            </Typography>
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
          </div>

          <div>
            <Typography level="h3">Controlled Mode</Typography>
            <Typography level="body-sm" className="mb-3">
              Control the textarea value through state.
            </Typography>
            <Textarea
              value="This is a controlled textarea. Edit me!"
              onChange={(e) => console.log(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Typography level="h3">Uncontrolled Mode</Typography>
            <Typography level="body-sm" className="mb-3">
              Use <code>defaultValue</code> for uncontrolled mode.
            </Typography>
            <Textarea
              defaultValue="This is an uncontrolled textarea with default value."
              rows={3}
            />
          </div>

          <div>
            <Typography level="h3">In Context</Typography>
            <Typography level="body-sm" className="mb-3">
              Textarea works well within other components like Sheet.
            </Typography>
            <Sheet variant="outlined" color="neutral">
              <div className="space-y-4">
                <div>
                  <label htmlFor="feedback" className="block mb-2 font-medium">
                    Feedback
                  </label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what you think..."
                    minRows={3}
                    maxRows={8}
                  />
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-neutral-200 rounded-lg hover:bg-neutral-300">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    Submit
                  </button>
                </div>
              </div>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Form Example</Typography>
            <Sheet variant="outlined" color="neutral">
              <form className="space-y-4">
                <div>
                  <label htmlFor="title" className="block mb-2 font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2 font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    minRows={2}
                    maxRows={6}
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block mb-2 font-medium">
                    Additional Notes
                  </label>
                  <Textarea
                    id="notes"
                    variant="outlined"
                    placeholder="Optional notes"
                    rows={4}
                  />
                </div>
              </form>
            </Sheet>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={componentProps.Textarea} />
      </Section>
    </div>
  );
}
