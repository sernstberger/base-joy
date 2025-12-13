import { PreviewCard, Button, Typography, Avatar, Badge } from '@base-joy/ui-styled';
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
    description: 'The visual style of the preview card.',
    required: false,
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    defaultValue: "'neutral'",
    description: 'The color scheme of the preview card.',
    required: false,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'The size of the preview card.',
    required: false,
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'Whether the preview card is open. Use for controlled mode.',
    required: false,
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the preview card is open by default. Use for uncontrolled mode.',
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
    description: 'The side of the trigger where the preview card appears.',
    required: false,
  },
  {
    name: 'alignment',
    type: "'start' | 'center' | 'end'",
    defaultValue: "'center'",
    description: 'The alignment of the preview card relative to the trigger.',
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

const backdropProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS class for the backdrop.',
    required: false,
  },
];

const previewCardControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const previewCardCodeTemplate = (props: Record<string, string>) =>
  `<PreviewCard.Root variant="${props.variant}" color="${props.color}" size="${props.size}">
  <PreviewCard.Trigger>
    <Button>Hover me</Button>
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>
        <Typography level="h4">Preview Card</Typography>
        <Typography level="body-sm">
          Rich preview content appears on hover
        </Typography>
      </PreviewCard.Popup>
      <PreviewCard.Arrow />
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'with-arrow', title: 'With Arrow', level: 3 },
  { id: 'with-backdrop', title: 'With Backdrop', level: 3 },
  { id: 'positioning', title: 'Positioning', level: 3 },
  { id: 'rich-content', title: 'Rich Content', level: 3 },
  { id: 'api', title: 'API Reference' },
  { id: 'root', title: 'Root', level: 3 },
  { id: 'trigger', title: 'Trigger', level: 3 },
  { id: 'positioner', title: 'Positioner', level: 3 },
  { id: 'popup', title: 'Popup', level: 3 },
  { id: 'arrow', title: 'Arrow', level: 3 },
  { id: 'backdrop', title: 'Backdrop', level: 3 },
];

export function PreviewCardPage() {
  return (
    <div>
      <ComponentHeader
        title="PreviewCard"
        description="A hover-triggered preview card component that displays rich content when users interact with a trigger element. Perfect for link previews, user profiles, or additional context."
        baseUiUrl="https://base-ui.com/react/components/preview-card"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={previewCardControls}
              codeTemplate={previewCardCodeTemplate}
            >
              {(props) => (
                <PreviewCard.Root
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  <PreviewCard.Trigger>
                    <Button>Hover me</Button>
                  </PreviewCard.Trigger>
                  <PreviewCard.Portal>
                    <PreviewCard.Positioner>
                      <PreviewCard.Popup>
                        <Typography level="h4">Preview Card</Typography>
                        <Typography level="body-sm">
                          Rich preview content appears on hover
                        </Typography>
                      </PreviewCard.Popup>
                      <PreviewCard.Arrow />
                    </PreviewCard.Positioner>
                  </PreviewCard.Portal>
                </PreviewCard.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<PreviewCard.Root variant="solid" color="primary">
  <PreviewCard.Trigger>
    <Button>Solid</Button>
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>Preview content</PreviewCard.Popup>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>

{/* soft, outlined, plain variants */}`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <PreviewCard.Root variant="solid" color="primary">
                    <PreviewCard.Trigger>
                      <Button>Solid</Button>
                    </PreviewCard.Trigger>
                    <PreviewCard.Portal>
                      <PreviewCard.Positioner>
                        <PreviewCard.Popup>
                          <Typography level="body-sm">Solid variant</Typography>
                        </PreviewCard.Popup>
                      </PreviewCard.Positioner>
                    </PreviewCard.Portal>
                  </PreviewCard.Root>

                  <PreviewCard.Root variant="soft" color="primary">
                    <PreviewCard.Trigger>
                      <Button>Soft</Button>
                    </PreviewCard.Trigger>
                    <PreviewCard.Portal>
                      <PreviewCard.Positioner>
                        <PreviewCard.Popup>
                          <Typography level="body-sm">Soft variant</Typography>
                        </PreviewCard.Popup>
                      </PreviewCard.Positioner>
                    </PreviewCard.Portal>
                  </PreviewCard.Root>

                  <PreviewCard.Root variant="outlined" color="primary">
                    <PreviewCard.Trigger>
                      <Button>Outlined</Button>
                    </PreviewCard.Trigger>
                    <PreviewCard.Portal>
                      <PreviewCard.Positioner>
                        <PreviewCard.Popup>
                          <Typography level="body-sm">Outlined variant</Typography>
                        </PreviewCard.Popup>
                      </PreviewCard.Positioner>
                    </PreviewCard.Portal>
                  </PreviewCard.Root>

                  <PreviewCard.Root variant="plain" color="primary">
                    <PreviewCard.Trigger>
                      <Button>Plain</Button>
                    </PreviewCard.Trigger>
                    <PreviewCard.Portal>
                      <PreviewCard.Positioner>
                        <PreviewCard.Popup>
                          <Typography level="body-sm">Plain variant</Typography>
                        </PreviewCard.Popup>
                      </PreviewCard.Positioner>
                    </PreviewCard.Portal>
                  </PreviewCard.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<PreviewCard.Root color="primary">
  <PreviewCard.Trigger>
    <Button color="primary">Primary</Button>
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>Primary preview</PreviewCard.Popup>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>

{/* neutral, success, warning, danger colors */}`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
                    <PreviewCard.Root key={color} color={color}>
                      <PreviewCard.Trigger>
                        <Button color={color}>{color}</Button>
                      </PreviewCard.Trigger>
                      <PreviewCard.Portal>
                        <PreviewCard.Positioner>
                          <PreviewCard.Popup>
                            <Typography level="body-sm">{color} preview</Typography>
                          </PreviewCard.Popup>
                        </PreviewCard.Positioner>
                      </PreviewCard.Portal>
                    </PreviewCard.Root>
                  ))}
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<PreviewCard.Root size="sm">
  <PreviewCard.Trigger>
    <Button size="sm">Small</Button>
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>Small size</PreviewCard.Popup>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>

{/* md, lg sizes */}`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap items-start gap-4">
                  {(['sm', 'md', 'lg'] as const).map((size) => (
                    <PreviewCard.Root key={size} size={size}>
                      <PreviewCard.Trigger>
                        <Button size={size}>{size}</Button>
                      </PreviewCard.Trigger>
                      <PreviewCard.Portal>
                        <PreviewCard.Positioner>
                          <PreviewCard.Popup>
                            <Typography level="body-sm">Size: {size}</Typography>
                          </PreviewCard.Popup>
                        </PreviewCard.Positioner>
                      </PreviewCard.Portal>
                    </PreviewCard.Root>
                  ))}
                </div>
              </Section>

              <Section
                title="With Arrow"
                titleLevel="h3"
                id="with-arrow"
                code={`<PreviewCard.Root>
  <PreviewCard.Trigger>
    <Button>Hover me</Button>
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>
        Preview with arrow
      </PreviewCard.Popup>
      <PreviewCard.Arrow />
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>`}
                codeLanguage="tsx"
              >
                <PreviewCard.Root>
                  <PreviewCard.Trigger>
                    <Button>Hover for arrow</Button>
                  </PreviewCard.Trigger>
                  <PreviewCard.Portal>
                    <PreviewCard.Positioner>
                      <PreviewCard.Popup>
                        <Typography level="body-sm">
                          The arrow points to the trigger
                        </Typography>
                      </PreviewCard.Popup>
                      <PreviewCard.Arrow />
                    </PreviewCard.Positioner>
                  </PreviewCard.Portal>
                </PreviewCard.Root>
              </Section>

              <Section
                title="With Backdrop"
                titleLevel="h3"
                id="with-backdrop"
                code={`<PreviewCard.Root>
  <PreviewCard.Trigger>
    <Button>Hover me</Button>
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Backdrop />
    <PreviewCard.Positioner>
      <PreviewCard.Popup>
        Preview with backdrop
      </PreviewCard.Popup>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Add a backdrop to dim the background and focus attention on the preview card.
                </Typography>
                <PreviewCard.Root>
                  <PreviewCard.Trigger>
                    <Button>Hover for backdrop</Button>
                  </PreviewCard.Trigger>
                  <PreviewCard.Portal>
                    <PreviewCard.Backdrop />
                    <PreviewCard.Positioner>
                      <PreviewCard.Popup>
                        <Typography level="h4">Focused Preview</Typography>
                        <Typography level="body-sm">
                          The backdrop dims the background
                        </Typography>
                      </PreviewCard.Popup>
                    </PreviewCard.Positioner>
                  </PreviewCard.Portal>
                </PreviewCard.Root>
              </Section>

              <Section
                title="Positioning"
                titleLevel="h3"
                id="positioning"
                code={`<PreviewCard.Root>
  <PreviewCard.Trigger>
    <Button>Top</Button>
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner side="top">
      <PreviewCard.Popup>Top side</PreviewCard.Popup>
      <PreviewCard.Arrow />
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>

{/* right, bottom, left sides */}`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Control the placement of the preview card using the <code className="font-mono text-sm">side</code> prop.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                    <PreviewCard.Root key={side}>
                      <PreviewCard.Trigger>
                        <Button>{side}</Button>
                      </PreviewCard.Trigger>
                      <PreviewCard.Portal>
                        <PreviewCard.Positioner side={side}>
                          <PreviewCard.Popup>
                            <Typography level="body-sm">Side: {side}</Typography>
                          </PreviewCard.Popup>
                          <PreviewCard.Arrow />
                        </PreviewCard.Positioner>
                      </PreviewCard.Portal>
                    </PreviewCard.Root>
                  ))}
                </div>
              </Section>

              <Section
                title="Rich Content"
                titleLevel="h3"
                id="rich-content"
                code={`<PreviewCard.Root variant="outlined" size="lg">
  <PreviewCard.Trigger>
    <Button>@johndoe</Button>
  </PreviewCard.Trigger>
  <PreviewCard.Portal>
    <PreviewCard.Positioner>
      <PreviewCard.Popup>
        <div className="flex items-start gap-3">
          <Avatar size="lg" alt="John Doe" />
          <div className="flex-1">
            <Typography level="h4">John Doe</Typography>
            <Typography level="body-sm" className="text-neutral-600">
              @johndoe
            </Typography>
            <Typography level="body-sm" className="mt-2">
              Software engineer passionate about UI/UX
            </Typography>
            <div className="flex gap-2 mt-3">
              <Badge variant="soft" color="primary">
                Developer
              </Badge>
              <Badge variant="soft" color="success">
                Open Source
              </Badge>
            </div>
          </div>
        </div>
      </PreviewCard.Popup>
      <PreviewCard.Arrow />
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</PreviewCard.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Preview cards can contain rich content like user profiles, link previews, or detailed information.
                </Typography>
                <PreviewCard.Root variant="outlined" size="lg">
                  <PreviewCard.Trigger>
                    <Button variant="plain">@johndoe</Button>
                  </PreviewCard.Trigger>
                  <PreviewCard.Portal>
                    <PreviewCard.Positioner>
                      <PreviewCard.Popup className="min-w-80">
                        <div className="flex items-start gap-3">
                          <Avatar size="lg" alt="John Doe" />
                          <div className="flex-1">
                            <Typography level="h4">John Doe</Typography>
                            <Typography level="body-sm" className="text-neutral-600">
                              @johndoe
                            </Typography>
                            <Typography level="body-sm" className="mt-2">
                              Software engineer passionate about UI/UX
                            </Typography>
                            <div className="flex gap-2 mt-3">
                              <Badge variant="soft" color="primary">
                                Developer
                              </Badge>
                              <Badge variant="soft" color="success">
                                Open Source
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </PreviewCard.Popup>
                      <PreviewCard.Arrow />
                    </PreviewCard.Positioner>
                  </PreviewCard.Portal>
                </PreviewCard.Root>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <Section title="Root" titleLevel="h3" id="root">
                <PropsTable props={rootProps} />
              </Section>

              <Section title="Trigger" titleLevel="h3" id="trigger">
                <PropsTable props={triggerProps} />
              </Section>

              <Section title="Positioner" titleLevel="h3" id="positioner">
                <PropsTable props={positionerProps} />
              </Section>

              <Section title="Popup" titleLevel="h3" id="popup">
                <PropsTable props={popupProps} />
              </Section>

              <Section title="Arrow" titleLevel="h3" id="arrow">
                <PropsTable props={arrowProps} />
              </Section>

              <Section title="Backdrop" titleLevel="h3" id="backdrop">
                <PropsTable props={backdropProps} />
              </Section>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
