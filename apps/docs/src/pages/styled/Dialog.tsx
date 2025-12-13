import * as React from 'react';
import { Dialog, Button, Input, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const dialogControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const dialogCodeTemplate = (props: Record<string, string>) =>
  `<Dialog.Root variant="${props.variant}" color="${props.color}" size="${props.size}">
  <Dialog.Trigger render={<Button>Open Dialog</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>
        This is a dialog description that provides context.
      </Dialog.Description>
      <Dialog.Close />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'with-form', title: 'With Form', level: 3 },
  { id: 'controlled', title: 'Controlled', level: 3 },
  { id: 'api', title: 'API Reference' },
];

const dialogRootProps: PropMeta[] = [
  {
    name: 'variant',
    type: 'Variant',
    required: false,
    defaultValue: 'outlined',
    description: 'The visual style of the dialog.',
  },
  {
    name: 'color',
    type: 'ColorScale',
    required: false,
    defaultValue: 'neutral',
    description: 'The color scheme of the dialog.',
  },
  {
    name: 'size',
    type: 'Size',
    required: false,
    defaultValue: 'md',
    description: 'The size of the dialog.',
  },
  {
    name: 'open',
    type: 'boolean',
    required: false,
    defaultValue: '-',
    description: 'Controls the open state of the dialog.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'The default open state for uncontrolled mode.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    required: false,
    defaultValue: '-',
    description: 'Callback fired when the open state changes.',
  },
];

const dialogTriggerProps: PropMeta[] = [
  {
    name: 'render',
    type: 'ReactElement',
    required: false,
    defaultValue: '-',
    description: 'The element to render as the trigger (Base UI pattern).',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

const dialogPopupProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

const dialogBackdropProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

const dialogTitleProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

const dialogDescriptionProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

const dialogCloseProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    defaultValue: 'X icon',
    description: 'Custom close button content.',
  },
];

export function DialogPage() {
  return (
    <div>
      <ComponentHeader
        title="Dialog"
        description="A modal dialog component built on Base UI with Joy UI-inspired styling. Supports variants, colors, sizes, and controlled/uncontrolled modes."
        baseUiUrl="https://base-ui.com/react/components/dialog"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={dialogControls} codeTemplate={dialogCodeTemplate}>
              {(props) => (
                <Dialog.Root
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  <Dialog.Trigger render={<Button>Open Dialog</Button>} />
                  <Dialog.Portal>
                    <Dialog.Backdrop />
                    <Dialog.Popup>
                      <Dialog.Title>Dialog Title</Dialog.Title>
                      <Dialog.Description>
                        This is a dialog description that provides context about the
                        dialog content and actions.
                      </Dialog.Description>
                      <div className="mt-6 flex gap-2 justify-end">
                        <Dialog.Close>
                          <Button variant="outlined" color="neutral">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button>Confirm</Button>
                        </Dialog.Close>
                      </div>
                      <Dialog.Close />
                    </Dialog.Popup>
                  </Dialog.Portal>
                </Dialog.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Dialog.Root variant="solid" color="primary">
  <Dialog.Trigger render={<Button>Solid</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Solid Dialog</Dialog.Title>
      <Dialog.Description>Solid variant dialog.</Dialog.Description>
      <Dialog.Close />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>

<Dialog.Root variant="soft" color="primary">
  <Dialog.Trigger render={<Button>Soft</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Soft Dialog</Dialog.Title>
      <Dialog.Description>Soft variant dialog.</Dialog.Description>
      <Dialog.Close />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>

<Dialog.Root variant="outlined" color="primary">
  <Dialog.Trigger render={<Button>Outlined</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Outlined Dialog</Dialog.Title>
      <Dialog.Description>Outlined variant dialog.</Dialog.Description>
      <Dialog.Close />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>

<Dialog.Root variant="plain" color="primary">
  <Dialog.Trigger render={<Button>Plain</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Plain Dialog</Dialog.Title>
      <Dialog.Description>Plain variant dialog.</Dialog.Description>
      <Dialog.Close />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`}
              >
                <div className="flex flex-wrap gap-3">
                  <Dialog.Root variant="solid" color="primary">
                    <Dialog.Trigger render={<Button>Solid</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Solid Dialog</Dialog.Title>
                        <Dialog.Description>
                          This dialog uses the solid variant for a bold, prominent
                          appearance.
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root variant="soft" color="primary">
                    <Dialog.Trigger render={<Button>Soft</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Soft Dialog</Dialog.Title>
                        <Dialog.Description>
                          This dialog uses the soft variant for a subtle appearance.
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root variant="outlined" color="primary">
                    <Dialog.Trigger render={<Button>Outlined</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Outlined Dialog</Dialog.Title>
                        <Dialog.Description>
                          This dialog uses the outlined variant with a border.
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root variant="plain" color="primary">
                    <Dialog.Trigger render={<Button>Plain</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Plain Dialog</Dialog.Title>
                        <Dialog.Description>
                          This dialog uses the plain variant for a minimal appearance.
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Dialog.Root color="primary">
  <Dialog.Trigger render={<Button color="primary">Primary</Button>} />
  {/* Dialog content */}
</Dialog.Root>

<Dialog.Root color="neutral">
  <Dialog.Trigger render={<Button color="neutral">Neutral</Button>} />
  {/* Dialog content */}
</Dialog.Root>

<Dialog.Root color="success">
  <Dialog.Trigger render={<Button color="success">Success</Button>} />
  {/* Dialog content */}
</Dialog.Root>

<Dialog.Root color="warning">
  <Dialog.Trigger render={<Button color="warning">Warning</Button>} />
  {/* Dialog content */}
</Dialog.Root>

<Dialog.Root color="danger">
  <Dialog.Trigger render={<Button color="danger">Danger</Button>} />
  {/* Dialog content */}
</Dialog.Root>`}
              >
                <div className="flex flex-wrap gap-3">
                  <Dialog.Root color="primary">
                    <Dialog.Trigger render={<Button color="primary">Primary</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Primary Dialog</Dialog.Title>
                        <Dialog.Description>
                          This dialog uses the primary color scheme.
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root color="neutral">
                    <Dialog.Trigger render={<Button color="neutral">Neutral</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Neutral Dialog</Dialog.Title>
                        <Dialog.Description>
                          This dialog uses the neutral color scheme.
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root color="success">
                    <Dialog.Trigger render={<Button color="success">Success</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Success Dialog</Dialog.Title>
                        <Dialog.Description>
                          This dialog uses the success color scheme.
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root color="warning">
                    <Dialog.Trigger render={<Button color="warning">Warning</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Warning Dialog</Dialog.Title>
                        <Dialog.Description>
                          This dialog uses the warning color scheme.
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root color="danger">
                    <Dialog.Trigger render={<Button color="danger">Danger</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Danger Dialog</Dialog.Title>
                        <Dialog.Description>
                          This dialog uses the danger color scheme.
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Dialog.Root size="sm">
  <Dialog.Trigger render={<Button>Small</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Small Dialog</Dialog.Title>
      <Dialog.Description>Small size dialog (max-w-md).</Dialog.Description>
      <Dialog.Close />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>

<Dialog.Root size="md">
  <Dialog.Trigger render={<Button>Medium</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Medium Dialog</Dialog.Title>
      <Dialog.Description>Medium size dialog (max-w-lg).</Dialog.Description>
      <Dialog.Close />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>

<Dialog.Root size="lg">
  <Dialog.Trigger render={<Button>Large</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Large Dialog</Dialog.Title>
      <Dialog.Description>Large size dialog (max-w-2xl).</Dialog.Description>
      <Dialog.Close />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`}
              >
                <div className="flex flex-wrap gap-3">
                  <Dialog.Root size="sm">
                    <Dialog.Trigger render={<Button>Small</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Small Dialog</Dialog.Title>
                        <Dialog.Description>
                          This is a small dialog with a maximum width of 448px (max-w-md).
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root size="md">
                    <Dialog.Trigger render={<Button>Medium</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Medium Dialog</Dialog.Title>
                        <Dialog.Description>
                          This is a medium dialog with a maximum width of 512px (max-w-lg).
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root size="lg">
                    <Dialog.Trigger render={<Button>Large</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Large Dialog</Dialog.Title>
                        <Dialog.Description>
                          This is a large dialog with a maximum width of 672px (max-w-2xl).
                        </Dialog.Description>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </Section>

              <div>
                <Typography level="h3" className="mb-2" id="with-form">
                  With Form
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Dialogs commonly contain forms for user input. This example shows a
                  dialog with form fields.
                </Typography>
                <Section
                  code={`<Dialog.Root>
  <Dialog.Trigger render={<Button>Edit Profile</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Edit Profile</Dialog.Title>
      <Dialog.Description>
        Update your profile information below.
      </Dialog.Description>
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input placeholder="Enter your name" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input placeholder="Enter your email" className="mt-1" />
        </div>
      </div>
      <div className="mt-6 flex gap-2 justify-end">
        <Dialog.Close>
          <Button variant="outlined" color="neutral">Cancel</Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Save Changes</Button>
        </Dialog.Close>
      </div>
      <Dialog.Close />
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`}
                >
                  <Dialog.Root>
                    <Dialog.Trigger render={<Button>Edit Profile</Button>} />
                    <Dialog.Portal>
                      <Dialog.Backdrop />
                      <Dialog.Popup>
                        <Dialog.Title>Edit Profile</Dialog.Title>
                        <Dialog.Description>
                          Update your profile information below.
                        </Dialog.Description>
                        <div className="mt-4 space-y-4">
                          <div>
                            <Typography level="body-sm" weight="medium" className="mb-1">
                              Name
                            </Typography>
                            <Input placeholder="Enter your name" />
                          </div>
                          <div>
                            <Typography level="body-sm" weight="medium" className="mb-1">
                              Email
                            </Typography>
                            <Input placeholder="Enter your email" type="email" />
                          </div>
                        </div>
                        <div className="mt-6 flex gap-2 justify-end">
                          <Dialog.Close>
                            <Button variant="outlined" color="neutral">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button>Save Changes</Button>
                          </Dialog.Close>
                        </div>
                        <Dialog.Close />
                      </Dialog.Popup>
                    </Dialog.Portal>
                  </Dialog.Root>
                </Section>
              </div>

              <div>
                <Typography level="h3" className="mb-2" id="controlled">
                  Controlled
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">open</code> and{' '}
                  <code className="font-mono text-sm">onOpenChange</code> props to
                  control the dialog state externally.
                </Typography>
                <Section
                  code={`function ControlledDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Controlled Dialog
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>Controlled Dialog</Dialog.Title>
            <Dialog.Description>
              This dialog is controlled by external state.
            </Dialog.Description>
            <div className="mt-6 flex gap-2 justify-end">
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
            <Dialog.Close />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}`}
                >
                  <ControlledDialogExample />
                </Section>
              </div>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h3" className="mb-4">
                  Dialog.Root
                </Typography>
                <PropsTable props={dialogRootProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Dialog.Trigger
                </Typography>
                <PropsTable props={dialogTriggerProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Dialog.Portal
                </Typography>
                <Typography level="body-sm" className="text-neutral-600">
                  Renders dialog content in a portal. No additional props beyond Base
                  UI Portal props.
                </Typography>
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Dialog.Backdrop
                </Typography>
                <PropsTable props={dialogBackdropProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Dialog.Popup
                </Typography>
                <PropsTable props={dialogPopupProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Dialog.Title
                </Typography>
                <PropsTable props={dialogTitleProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Dialog.Description
                </Typography>
                <PropsTable props={dialogDescriptionProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Dialog.Close
                </Typography>
                <PropsTable props={dialogCloseProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

function ControlledDialogExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>Controlled Dialog</Dialog.Title>
            <Dialog.Description>
              This dialog is controlled by external state. The open state is managed
              by a React useState hook.
            </Dialog.Description>
            <div className="mt-6 flex gap-2 justify-end">
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
            <Dialog.Close />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
