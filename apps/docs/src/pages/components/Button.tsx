import { Button, Sheet, Typography } from '@base-joy/ui-components';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const buttonControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'solid' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const buttonCodeTemplate = (props: Record<string, string>) =>
  `<Button variant="${props.variant}" color="${props.color}" size="${props.size}">
  Click me
</Button>`;

export function ButtonPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Button"
        description="A versatile button component with variants, colors, sizes, and loading states."
        baseUiUrl="https://base-ui.com/react/components/button"
      />

      <Section title="Playground">
        <Playground controls={buttonControls} codeTemplate={buttonCodeTemplate}>
          {(props) => (
            <Button
              variant={props.variant as Variant}
              color={props.color as ColorScale}
              size={props.size as Size}
            >
              Click me
            </Button>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Variants</Typography>
            <div className="flex flex-wrap gap-3">
              <Button variant="solid">Solid</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="plain">Plain</Button>
            </div>
          </div>

          <div>
            <Typography level="h3">Colors</Typography>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <Button color="primary">Primary</Button>
                <Button color="neutral">Neutral</Button>
                <Button color="success">Success</Button>
                <Button color="warning">Warning</Button>
                <Button color="danger">Danger</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="soft" color="primary">
                  Primary
                </Button>
                <Button variant="soft" color="neutral">
                  Neutral
                </Button>
                <Button variant="soft" color="success">
                  Success
                </Button>
                <Button variant="soft" color="warning">
                  Warning
                </Button>
                <Button variant="soft" color="danger">
                  Danger
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outlined" color="primary">
                  Primary
                </Button>
                <Button variant="outlined" color="neutral">
                  Neutral
                </Button>
                <Button variant="outlined" color="success">
                  Success
                </Button>
                <Button variant="outlined" color="warning">
                  Warning
                </Button>
                <Button variant="outlined" color="danger">
                  Danger
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Typography level="h3">Sizes</Typography>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <Typography level="h3">With Decorators</Typography>
            <div className="flex flex-wrap gap-3">
              <Button
                startDecorator={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 3.5v9M3.5 8h9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              >
                Add Item
              </Button>
              <Button
                endDecorator={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Next
              </Button>
              <Button
                variant="soft"
                startDecorator={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 5v3l2 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              >
                Schedule
              </Button>
            </div>
          </div>

          <div>
            <Typography level="h3">Loading State</Typography>
            <div className="flex flex-wrap gap-3">
              <Button loading>Loading</Button>
              <Button variant="soft" loading>
                Loading
              </Button>
              <Button variant="outlined" loading>
                Loading
              </Button>
              <Button size="sm" loading>
                Small Loading
              </Button>
              <Button size="lg" loading>
                Large Loading
              </Button>
            </div>
          </div>

          <div>
            <Typography level="h3">Disabled State</Typography>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="soft" disabled>
                Disabled
              </Button>
              <Button variant="outlined" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <div>
            <Typography level="h3">Full Width</Typography>
            <div className="max-w-md">
              <Button fullWidth>Full Width Button</Button>
            </div>
          </div>

          <div>
            <Typography level="h3">As Link</Typography>
            <Typography level="body-sm" className="mb-3">
              Use the <code>render</code> prop to render the button as an anchor
              tag (Base UI pattern).
            </Typography>
            <div className="flex flex-wrap gap-3">
              <Button render={<a href="#" />}>Link Button</Button>
              <Button render={<a href="#" />} variant="outlined">
                Outlined Link
              </Button>
            </div>
          </div>

          <div>
            <Typography level="h3">Button Groups</Typography>
            <div className="flex gap-0">
              <Button className="rounded-r-none border-r-0">First</Button>
              <Button className="rounded-none border-r-0">Second</Button>
              <Button className="rounded-l-none">Third</Button>
            </div>
          </div>

          <div>
            <Typography level="h3">In Context</Typography>
            <Typography level="body-sm" className="mb-3">
              Buttons work well within other components like Sheet.
            </Typography>
            <Sheet variant="outlined" color="neutral">
              <div className="space-y-4">
                <div>
                  <Typography level="h4">Confirm Action</Typography>
                  <Typography>
                    Are you sure you want to proceed with this action?
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <Button variant="outlined" color="neutral">
                    Cancel
                  </Button>
                  <Button color="primary">Confirm</Button>
                </div>
              </div>
            </Sheet>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={componentProps.Button} />
      </Section>
    </div>
  );
}
