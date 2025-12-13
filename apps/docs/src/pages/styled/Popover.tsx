import { useState } from 'react';
import { Popover, Button, Typography, Input } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const rootProps: PropMeta[] = [
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    defaultValue: "'outlined'",
    description: 'The visual style of the popover.',
    required: false,
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    defaultValue: "'neutral'",
    description: 'The color scheme of the popover.',
    required: false,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'The size of the popover.',
    required: false,
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'Whether the popover is open. Use for controlled mode.',
    required: false,
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the popover is open by default. Use for uncontrolled mode.',
    required: false,
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Callback fired when the open state changes.',
    required: false,
  },
];

const triggerProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class for the trigger.',
    required: false,
  },
  {
    name: 'render',
    type: 'React.ReactElement',
    description: 'Render prop for custom trigger element (Base UI pattern).',
    required: false,
  },
];

const positionerProps: PropMeta[] = [
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    defaultValue: "'bottom'",
    description: 'The side of the trigger where the popover appears.',
    required: false,
  },
  {
    name: 'alignment',
    type: "'start' | 'center' | 'end'",
    defaultValue: "'center'",
    description: 'The alignment of the popover relative to the trigger.',
    required: false,
  },
  {
    name: 'sideOffset',
    type: 'number',
    defaultValue: '0',
    description: 'The distance in pixels from the trigger.',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class for the positioner.',
    required: false,
  },
];

const popupProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class for the popup.',
    required: false,
  },
];

const arrowProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class for the arrow.',
    required: false,
  },
];

const titleProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class for the title.',
    required: false,
  },
];

const descriptionProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class for the description.',
    required: false,
  },
];

const closeProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class for the close button.',
    required: false,
  },
];

const popoverControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const popoverCodeTemplate = (props: Record<string, string>) =>
  `<Popover.Root variant="${props.variant}" color="${props.color}" size="${props.size}">
  <Popover.Trigger>
    <Button>Open Popover</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Popover Title</Popover.Title>
        <Popover.Description>
          This is a popover description with more information.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'positions', title: 'Positions', level: 3 },
  { id: 'with-form', title: 'With Form', level: 3 },
  { id: 'api', title: 'API Reference' },
  { id: 'api-root', title: 'Popover.Root', level: 3 },
  { id: 'api-trigger', title: 'Popover.Trigger', level: 3 },
  { id: 'api-positioner', title: 'Popover.Positioner', level: 3 },
  { id: 'api-popup', title: 'Popover.Popup', level: 3 },
  { id: 'api-arrow', title: 'Popover.Arrow', level: 3 },
  { id: 'api-title', title: 'Popover.Title', level: 3 },
  { id: 'api-description', title: 'Popover.Description', level: 3 },
  { id: 'api-close', title: 'Popover.Close', level: 3 },
];

export function PopoverPage() {
  return (
    <div>
      <ComponentHeader
        title="Popover"
        description="A popover component for displaying rich content in a floating panel. Built on Base UI's Popover with support for variants, colors, and positioning."
        baseUiUrl="https://base-ui.com/react/components/popover"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={popoverControls}
              codeTemplate={popoverCodeTemplate}
            >
              {(props) => (
                <Popover.Root
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  <Popover.Trigger>
                    <Button>Open Popover</Button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Positioner>
                      <Popover.Popup>
                        <Popover.Arrow />
                        <Popover.Title>Popover Title</Popover.Title>
                        <Popover.Description>
                          This is a popover description with more information.
                        </Popover.Description>
                        <Popover.Close />
                      </Popover.Popup>
                    </Popover.Positioner>
                  </Popover.Portal>
                </Popover.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Popover.Root variant="solid" color="primary">
  <Popover.Trigger>
    <Button>Solid</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Solid Variant</Popover.Title>
        <Popover.Description>
          This popover uses the solid variant.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root variant="soft" color="primary">
  <Popover.Trigger>
    <Button>Soft</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Soft Variant</Popover.Title>
        <Popover.Description>
          This popover uses the soft variant.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root variant="outlined" color="primary">
  <Popover.Trigger>
    <Button>Outlined</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Outlined Variant</Popover.Title>
        <Popover.Description>
          This popover uses the outlined variant.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Popover.Root variant="solid" color="primary">
                    <Popover.Trigger>
                      <Button>Solid</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Solid Variant</Popover.Title>
                          <Popover.Description>
                            This popover uses the solid variant.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root variant="soft" color="primary">
                    <Popover.Trigger>
                      <Button>Soft</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Soft Variant</Popover.Title>
                          <Popover.Description>
                            This popover uses the soft variant.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root variant="outlined" color="primary">
                    <Popover.Trigger>
                      <Button>Outlined</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Outlined Variant</Popover.Title>
                          <Popover.Description>
                            This popover uses the outlined variant.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Popover.Root variant="soft" color="primary">
  <Popover.Trigger>
    <Button variant="soft" color="primary">Primary</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Primary Color</Popover.Title>
        <Popover.Description>
          This popover uses the primary color.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root variant="soft" color="success">
  <Popover.Trigger>
    <Button variant="soft" color="success">Success</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Success Color</Popover.Title>
        <Popover.Description>
          This popover uses the success color.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root variant="soft" color="warning">
  <Popover.Trigger>
    <Button variant="soft" color="warning">Warning</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Warning Color</Popover.Title>
        <Popover.Description>
          This popover uses the warning color.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root variant="soft" color="danger">
  <Popover.Trigger>
    <Button variant="soft" color="danger">Danger</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Danger Color</Popover.Title>
        <Popover.Description>
          This popover uses the danger color.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Popover.Root variant="soft" color="primary">
                    <Popover.Trigger>
                      <Button variant="soft" color="primary">Primary</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Primary Color</Popover.Title>
                          <Popover.Description>
                            This popover uses the primary color.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root variant="soft" color="success">
                    <Popover.Trigger>
                      <Button variant="soft" color="success">Success</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Success Color</Popover.Title>
                          <Popover.Description>
                            This popover uses the success color.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root variant="soft" color="warning">
                    <Popover.Trigger>
                      <Button variant="soft" color="warning">Warning</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Warning Color</Popover.Title>
                          <Popover.Description>
                            This popover uses the warning color.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root variant="soft" color="danger">
                    <Popover.Trigger>
                      <Button variant="soft" color="danger">Danger</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Danger Color</Popover.Title>
                          <Popover.Description>
                            This popover uses the danger color.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Popover.Root size="sm">
  <Popover.Trigger>
    <Button size="sm">Small</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Small Size</Popover.Title>
        <Popover.Description>
          This is a small popover.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root size="md">
  <Popover.Trigger>
    <Button size="md">Medium</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Medium Size</Popover.Title>
        <Popover.Description>
          This is a medium popover.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root size="lg">
  <Popover.Trigger>
    <Button size="lg">Large</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Large Size</Popover.Title>
        <Popover.Description>
          This is a large popover.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <Popover.Root size="sm">
                    <Popover.Trigger>
                      <Button size="sm">Small</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Small Size</Popover.Title>
                          <Popover.Description>
                            This is a small popover.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root size="md">
                    <Popover.Trigger>
                      <Button size="md">Medium</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Medium Size</Popover.Title>
                          <Popover.Description>
                            This is a medium popover.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root size="lg">
                    <Popover.Trigger>
                      <Button size="lg">Large</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner>
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Large Size</Popover.Title>
                          <Popover.Description>
                            This is a large popover.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
              </Section>

              <Section
                title="Positions"
                titleLevel="h3"
                id="positions"
                code={`<Popover.Root>
  <Popover.Trigger>
    <Button>Top</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner side="top">
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Top Position</Popover.Title>
        <Popover.Description>
          This popover appears above the trigger.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root>
  <Popover.Trigger>
    <Button>Right</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner side="right">
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Right Position</Popover.Title>
        <Popover.Description>
          This popover appears to the right.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root>
  <Popover.Trigger>
    <Button>Bottom</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner side="bottom">
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Bottom Position</Popover.Title>
        <Popover.Description>
          This popover appears below the trigger.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>

<Popover.Root>
  <Popover.Trigger>
    <Button>Left</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner side="left">
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Left Position</Popover.Title>
        <Popover.Description>
          This popover appears to the left.
        </Popover.Description>
        <Popover.Close />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  The <code className="font-mono text-sm">side</code> prop on Popover.Positioner controls the placement of the popover relative to its trigger.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Popover.Root>
                    <Popover.Trigger>
                      <Button>Top</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner side="top">
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Top Position</Popover.Title>
                          <Popover.Description>
                            This popover appears above the trigger.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root>
                    <Popover.Trigger>
                      <Button>Right</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner side="right">
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Right Position</Popover.Title>
                          <Popover.Description>
                            This popover appears to the right.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root>
                    <Popover.Trigger>
                      <Button>Bottom</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner side="bottom">
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Bottom Position</Popover.Title>
                          <Popover.Description>
                            This popover appears below the trigger.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>

                  <Popover.Root>
                    <Popover.Trigger>
                      <Button>Left</Button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Positioner side="left">
                        <Popover.Popup>
                          <Popover.Arrow />
                          <Popover.Title>Left Position</Popover.Title>
                          <Popover.Description>
                            This popover appears to the left.
                          </Popover.Description>
                          <Popover.Close />
                        </Popover.Popup>
                      </Popover.Positioner>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
              </Section>

              <Section
                title="With Form"
                titleLevel="h3"
                id="with-form"
                code={`function FormPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button>Settings</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <Popover.Arrow />
            <Popover.Title>Profile Settings</Popover.Title>
            <Popover.Description className="mb-4">
              Update your profile information.
            </Popover.Description>
            <div className="space-y-3">
              <div>
                <Typography level="body-sm" className="mb-1">
                  Display Name
                </Typography>
                <Input placeholder="John Doe" size="sm" />
              </div>
              <div>
                <Typography level="body-sm" className="mb-1">
                  Email
                </Typography>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  size="sm"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Save
                </Button>
              </div>
            </div>
            <Popover.Close />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Popovers can contain interactive content like forms. Use controlled mode with <code className="font-mono text-sm">open</code> and <code className="font-mono text-sm">onOpenChange</code> props.
                </Typography>
                <FormPopover />
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h3" className="mb-4" id="api-root">
                  Popover.Root
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The root component that manages popover state and provides context to child components.
                </Typography>
                <PropsTable props={rootProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-trigger">
                  Popover.Trigger
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The trigger element that opens the popover. Typically wraps a Button.
                </Typography>
                <PropsTable props={triggerProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-positioner">
                  Popover.Positioner
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Controls the positioning of the popover relative to its trigger.
                </Typography>
                <PropsTable props={positionerProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-popup">
                  Popover.Popup
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The popup container that displays the popover content.
                </Typography>
                <PropsTable props={popupProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-arrow">
                  Popover.Arrow
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  An optional arrow that points from the popover to its trigger.
                </Typography>
                <PropsTable props={arrowProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-title">
                  Popover.Title
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The title element for the popover content.
                </Typography>
                <PropsTable props={titleProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-description">
                  Popover.Description
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The description element for the popover content.
                </Typography>
                <PropsTable props={descriptionProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-close">
                  Popover.Close
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  A close button that dismisses the popover. Renders a default X icon if no children provided.
                </Typography>
                <PropsTable props={closeProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

function FormPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button>Settings</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner>
          <Popover.Popup>
            <Popover.Arrow />
            <Popover.Title>Profile Settings</Popover.Title>
            <Popover.Description className="mb-4">
              Update your profile information.
            </Popover.Description>
            <div className="space-y-3">
              <div>
                <Typography level="body-sm" className="mb-1">
                  Display Name
                </Typography>
                <Input placeholder="John Doe" size="sm" />
              </div>
              <div>
                <Typography level="body-sm" className="mb-1">
                  Email
                </Typography>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  size="sm"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Save
                </Button>
              </div>
            </div>
            <Popover.Close />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
