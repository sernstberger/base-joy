import { Button, Sheet } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';
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

const buttonProps: PropMeta[] = [
  {
    name: 'variant',
    type: '"solid" | "soft" | "outlined" | "plain"',
    defaultValue: '"solid"',
    description: 'The visual style of the button.',
    required: false,
  },
  {
    name: 'color',
    type: '"primary" | "neutral" | "success" | "warning" | "danger"',
    defaultValue: '"primary"',
    description: 'The color scheme of the button.',
    required: false,
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: 'The size of the button.',
    required: false,
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows a loading spinner and disables the button.',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables the button.',
    required: false,
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Makes the button take full width of its container.',
    required: false,
  },
  {
    name: 'startDecorator',
    type: 'React.ReactNode',
    description: 'Element to display before the button text (typically an icon).',
    required: false,
  },
  {
    name: 'endDecorator',
    type: 'React.ReactNode',
    description: 'Element to display after the button text (typically an icon).',
    required: false,
  },
  {
    name: 'as',
    type: 'React.ElementType',
    defaultValue: '"button"',
    description: 'The element type to render as (e.g., "a" for links).',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

export function ButtonPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Button</Heading>
        <Text variant="subtitle">
          A versatile button component with variants, colors, sizes, and loading states.
        </Text>
      </header>

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
            <Heading level={3}>Variants</Heading>
            <div className="flex flex-wrap gap-3">
              <Button variant="solid">Solid</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="plain">Plain</Button>
            </div>
          </div>

          <div>
            <Heading level={3}>Colors</Heading>
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
            <Heading level={3}>Sizes</Heading>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <Heading level={3}>With Decorators</Heading>
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
            <Heading level={3}>Loading State</Heading>
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
            <Heading level={3}>Disabled State</Heading>
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
            <Heading level={3}>Full Width</Heading>
            <div className="max-w-md">
              <Button fullWidth>Full Width Button</Button>
            </div>
          </div>

          <div>
            <Heading level={3}>As Link</Heading>
            <Text variant="muted" className="mb-3">
              Use the <code>render</code> prop to render the button as an anchor tag (Base UI
              pattern).
            </Text>
            <div className="flex flex-wrap gap-3">
              <Button render={<a href="#" />}>Link Button</Button>
              <Button render={<a href="#" />} variant="outlined">
                Outlined Link
              </Button>
            </div>
          </div>

          <div>
            <Heading level={3}>Button Groups</Heading>
            <div className="flex gap-0">
              <Button className="rounded-r-none border-r-0">First</Button>
              <Button className="rounded-none border-r-0">Second</Button>
              <Button className="rounded-l-none">Third</Button>
            </div>
          </div>

          <div>
            <Heading level={3}>In Context</Heading>
            <Text variant="muted" className="mb-3">
              Buttons work well within other components like Sheet.
            </Text>
            <Sheet variant="outlined" color="neutral">
              <div className="space-y-4">
                <div>
                  <Heading level={4}>Confirm Action</Heading>
                  <Text>Are you sure you want to proceed with this action?</Text>
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
        <PropsTable props={buttonProps} />
      </Section>
    </div>
  );
}
