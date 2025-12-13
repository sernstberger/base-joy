import { useState } from 'react';
import { AlertDialog, Button, Typography } from '@base-joy/ui-styled';
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
    description: 'The visual style of the alert dialog.',
    required: false,
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    defaultValue: "'danger'",
    description: 'The color scheme of the alert dialog.',
    required: false,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'The size of the alert dialog.',
    required: false,
  },
];

const triggerProps: PropMeta[] = [
  {
    name: 'render',
    type: 'React.ReactElement',
    description:
      'Render prop for composing with custom trigger elements (e.g., Button).',
    required: false,
  },
];

const portalProps: PropMeta[] = [
  {
    name: 'container',
    type: 'HTMLElement | null',
    description:
      'The container element to portal the dialog into. Defaults to document.body.',
    required: false,
  },
];

const backdropProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes for the backdrop.',
    required: false,
  },
];

const popupProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes for the popup container.',
    required: false,
  },
];

const titleProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes for the title.',
    required: false,
  },
];

const descriptionProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes for the description.',
    required: false,
  },
];

const closeProps: PropMeta[] = [
  {
    name: 'render',
    type: 'React.ReactElement',
    description:
      'Render prop for composing with custom close elements (e.g., Button).',
    required: false,
  },
];

const alertDialogControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'danger' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const alertDialogCodeTemplate = (props: Record<string, string>) =>
  `<AlertDialog.Root variant="${props.variant}" color="${props.color}" size="${props.size}">
  <AlertDialog.Trigger render={<Button>Delete Account</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialog.Description>
      <div className="flex gap-3 mt-6 justify-end">
        <AlertDialog.Close render={<Button variant="outlined" color="neutral">Cancel</Button>} />
        <AlertDialog.Close render={<Button variant="solid" color="danger">Delete Account</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'destructive-action', title: 'Destructive Action', level: 3 },
  { id: 'api', title: 'API Reference' },
  { id: 'api-root', title: 'AlertDialog.Root', level: 3 },
  { id: 'api-trigger', title: 'AlertDialog.Trigger', level: 3 },
  { id: 'api-portal', title: 'AlertDialog.Portal', level: 3 },
  { id: 'api-backdrop', title: 'AlertDialog.Backdrop', level: 3 },
  { id: 'api-popup', title: 'AlertDialog.Popup', level: 3 },
  { id: 'api-title', title: 'AlertDialog.Title', level: 3 },
  { id: 'api-description', title: 'AlertDialog.Description', level: 3 },
  { id: 'api-close', title: 'AlertDialog.Close', level: 3 },
];

export function AlertDialogPage() {
  return (
    <div>
      <ComponentHeader
        title="AlertDialog"
        description="A modal dialog for important confirmations that interrupt user workflow and require an action. Built on Base UI's AlertDialog with Joy UI styling."
        baseUiUrl="https://base-ui.com/react/components/alert-dialog"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={alertDialogControls}
              codeTemplate={alertDialogCodeTemplate}
            >
              {(props) => (
                <AlertDialog.Root
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  <AlertDialog.Trigger
                    render={<Button color="danger">Delete Account</Button>}
                  />
                  <AlertDialog.Portal>
                    <AlertDialog.Backdrop />
                    <AlertDialog.Popup>
                      <AlertDialog.Title>
                        Are you absolutely sure?
                      </AlertDialog.Title>
                      <AlertDialog.Description>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialog.Description>
                      <div className="flex gap-3 mt-6 justify-end">
                        <AlertDialog.Close
                          render={
                            <Button variant="outlined" color="neutral">
                              Cancel
                            </Button>
                          }
                        />
                        <AlertDialog.Close
                          render={
                            <Button variant="solid" color="danger">
                              Delete Account
                            </Button>
                          }
                        />
                      </div>
                    </AlertDialog.Popup>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<AlertDialog.Root variant="solid" color="danger">
  <AlertDialog.Trigger render={<Button color="danger">Solid</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Confirm deletion?</AlertDialog.Title>
      <AlertDialog.Description>
        This will permanently delete the item.
      </AlertDialog.Description>
      <div className="flex gap-3 mt-6 justify-end">
        <AlertDialog.Close render={<Button variant="outlined">Cancel</Button>} />
        <AlertDialog.Close render={<Button>Confirm</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>

<AlertDialog.Root variant="soft" color="danger">
  <AlertDialog.Trigger render={<Button color="danger">Soft</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Confirm deletion?</AlertDialog.Title>
      <AlertDialog.Description>
        This will permanently delete the item.
      </AlertDialog.Description>
      <div className="flex gap-3 mt-6 justify-end">
        <AlertDialog.Close render={<Button variant="outlined">Cancel</Button>} />
        <AlertDialog.Close render={<Button>Confirm</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>

<AlertDialog.Root variant="outlined" color="danger">
  <AlertDialog.Trigger render={<Button color="danger">Outlined</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Confirm deletion?</AlertDialog.Title>
      <AlertDialog.Description>
        This will permanently delete the item.
      </AlertDialog.Description>
      <div className="flex gap-3 mt-6 justify-end">
        <AlertDialog.Close render={<Button variant="outlined">Cancel</Button>} />
        <AlertDialog.Close render={<Button>Confirm</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Alert dialogs support all standard variants: solid, soft,
                  outlined, and plain.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <AlertDialog.Root variant="solid" color="danger">
                    <AlertDialog.Trigger
                      render={<Button color="danger">Solid</Button>}
                    />
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop />
                      <AlertDialog.Popup>
                        <AlertDialog.Title>Confirm deletion?</AlertDialog.Title>
                        <AlertDialog.Description>
                          This will permanently delete the item.
                        </AlertDialog.Description>
                        <div className="flex gap-3 mt-6 justify-end">
                          <AlertDialog.Close
                            render={
                              <Button variant="outlined" color="neutral">
                                Cancel
                              </Button>
                            }
                          />
                          <AlertDialog.Close
                            render={<Button color="danger">Confirm</Button>}
                          />
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>

                  <AlertDialog.Root variant="soft" color="danger">
                    <AlertDialog.Trigger
                      render={<Button color="danger">Soft</Button>}
                    />
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop />
                      <AlertDialog.Popup>
                        <AlertDialog.Title>Confirm deletion?</AlertDialog.Title>
                        <AlertDialog.Description>
                          This will permanently delete the item.
                        </AlertDialog.Description>
                        <div className="flex gap-3 mt-6 justify-end">
                          <AlertDialog.Close
                            render={
                              <Button variant="outlined" color="neutral">
                                Cancel
                              </Button>
                            }
                          />
                          <AlertDialog.Close
                            render={<Button color="danger">Confirm</Button>}
                          />
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>

                  <AlertDialog.Root variant="outlined" color="danger">
                    <AlertDialog.Trigger
                      render={<Button color="danger">Outlined</Button>}
                    />
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop />
                      <AlertDialog.Popup>
                        <AlertDialog.Title>Confirm deletion?</AlertDialog.Title>
                        <AlertDialog.Description>
                          This will permanently delete the item.
                        </AlertDialog.Description>
                        <div className="flex gap-3 mt-6 justify-end">
                          <AlertDialog.Close
                            render={
                              <Button variant="outlined" color="neutral">
                                Cancel
                              </Button>
                            }
                          />
                          <AlertDialog.Close
                            render={<Button color="danger">Confirm</Button>}
                          />
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<AlertDialog.Root variant="outlined" color="danger">
  <AlertDialog.Trigger render={<Button color="danger">Danger</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Delete account</AlertDialog.Title>
      <AlertDialog.Description>
        This will permanently delete your account.
      </AlertDialog.Description>
      <div className="flex gap-3 mt-6 justify-end">
        <AlertDialog.Close render={<Button variant="outlined">Cancel</Button>} />
        <AlertDialog.Close render={<Button color="danger">Delete</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>

<AlertDialog.Root variant="outlined" color="warning">
  <AlertDialog.Trigger render={<Button color="warning">Warning</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Unsaved changes</AlertDialog.Title>
      <AlertDialog.Description>
        You have unsaved changes. Are you sure you want to leave?
      </AlertDialog.Description>
      <div className="flex gap-3 mt-6 justify-end">
        <AlertDialog.Close render={<Button variant="outlined">Stay</Button>} />
        <AlertDialog.Close render={<Button color="warning">Leave</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>

<AlertDialog.Root variant="outlined" color="primary">
  <AlertDialog.Trigger render={<Button>Primary</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Confirm action</AlertDialog.Title>
      <AlertDialog.Description>
        Please confirm you want to proceed with this action.
      </AlertDialog.Description>
      <div className="flex gap-3 mt-6 justify-end">
        <AlertDialog.Close render={<Button variant="outlined">Cancel</Button>} />
        <AlertDialog.Close render={<Button>Confirm</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use different colors to indicate the severity or type of
                  confirmation. Danger is commonly used for destructive
                  actions.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <AlertDialog.Root variant="outlined" color="danger">
                    <AlertDialog.Trigger
                      render={<Button color="danger">Danger</Button>}
                    />
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop />
                      <AlertDialog.Popup>
                        <AlertDialog.Title>Delete account</AlertDialog.Title>
                        <AlertDialog.Description>
                          This will permanently delete your account.
                        </AlertDialog.Description>
                        <div className="flex gap-3 mt-6 justify-end">
                          <AlertDialog.Close
                            render={
                              <Button variant="outlined" color="neutral">
                                Cancel
                              </Button>
                            }
                          />
                          <AlertDialog.Close
                            render={<Button color="danger">Delete</Button>}
                          />
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>

                  <AlertDialog.Root variant="outlined" color="warning">
                    <AlertDialog.Trigger
                      render={<Button color="warning">Warning</Button>}
                    />
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop />
                      <AlertDialog.Popup>
                        <AlertDialog.Title>Unsaved changes</AlertDialog.Title>
                        <AlertDialog.Description>
                          You have unsaved changes. Are you sure you want to
                          leave?
                        </AlertDialog.Description>
                        <div className="flex gap-3 mt-6 justify-end">
                          <AlertDialog.Close
                            render={
                              <Button variant="outlined" color="neutral">
                                Stay
                              </Button>
                            }
                          />
                          <AlertDialog.Close
                            render={<Button color="warning">Leave</Button>}
                          />
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>

                  <AlertDialog.Root variant="outlined" color="primary">
                    <AlertDialog.Trigger render={<Button>Primary</Button>} />
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop />
                      <AlertDialog.Popup>
                        <AlertDialog.Title>Confirm action</AlertDialog.Title>
                        <AlertDialog.Description>
                          Please confirm you want to proceed with this action.
                        </AlertDialog.Description>
                        <div className="flex gap-3 mt-6 justify-end">
                          <AlertDialog.Close
                            render={
                              <Button variant="outlined" color="neutral">
                                Cancel
                              </Button>
                            }
                          />
                          <AlertDialog.Close render={<Button>Confirm</Button>} />
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<AlertDialog.Root variant="outlined" color="danger" size="sm">
  <AlertDialog.Trigger render={<Button size="sm" color="danger">Small</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Small dialog</AlertDialog.Title>
      <AlertDialog.Description>
        Compact alert dialog for simple confirmations.
      </AlertDialog.Description>
      <div className="flex gap-2 mt-4 justify-end">
        <AlertDialog.Close render={<Button size="sm" variant="outlined">Cancel</Button>} />
        <AlertDialog.Close render={<Button size="sm" color="danger">Confirm</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>

<AlertDialog.Root variant="outlined" color="danger" size="md">
  <AlertDialog.Trigger render={<Button color="danger">Medium</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Medium dialog</AlertDialog.Title>
      <AlertDialog.Description>
        Default size for most alert dialogs.
      </AlertDialog.Description>
      <div className="flex gap-3 mt-6 justify-end">
        <AlertDialog.Close render={<Button variant="outlined">Cancel</Button>} />
        <AlertDialog.Close render={<Button color="danger">Confirm</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>

<AlertDialog.Root variant="outlined" color="danger" size="lg">
  <AlertDialog.Trigger render={<Button size="lg" color="danger">Large</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Large dialog</AlertDialog.Title>
      <AlertDialog.Description>
        Larger dialog for more content or detailed descriptions.
      </AlertDialog.Description>
      <div className="flex gap-3 mt-6 justify-end">
        <AlertDialog.Close render={<Button size="lg" variant="outlined">Cancel</Button>} />
        <AlertDialog.Close render={<Button size="lg" color="danger">Confirm</Button>} />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Alert dialogs come in three sizes: sm, md (default), and lg.
                  The size affects the popup width and typography scale.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <AlertDialog.Root variant="outlined" color="danger" size="sm">
                    <AlertDialog.Trigger
                      render={<Button size="sm" color="danger">Small</Button>}
                    />
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop />
                      <AlertDialog.Popup>
                        <AlertDialog.Title>Small dialog</AlertDialog.Title>
                        <AlertDialog.Description>
                          Compact alert dialog for simple confirmations.
                        </AlertDialog.Description>
                        <div className="flex gap-2 mt-4 justify-end">
                          <AlertDialog.Close
                            render={
                              <Button size="sm" variant="outlined" color="neutral">
                                Cancel
                              </Button>
                            }
                          />
                          <AlertDialog.Close
                            render={<Button size="sm" color="danger">Confirm</Button>}
                          />
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>

                  <AlertDialog.Root variant="outlined" color="danger" size="md">
                    <AlertDialog.Trigger
                      render={<Button color="danger">Medium</Button>}
                    />
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop />
                      <AlertDialog.Popup>
                        <AlertDialog.Title>Medium dialog</AlertDialog.Title>
                        <AlertDialog.Description>
                          Default size for most alert dialogs.
                        </AlertDialog.Description>
                        <div className="flex gap-3 mt-6 justify-end">
                          <AlertDialog.Close
                            render={
                              <Button variant="outlined" color="neutral">
                                Cancel
                              </Button>
                            }
                          />
                          <AlertDialog.Close
                            render={<Button color="danger">Confirm</Button>}
                          />
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>

                  <AlertDialog.Root variant="outlined" color="danger" size="lg">
                    <AlertDialog.Trigger
                      render={<Button size="lg" color="danger">Large</Button>}
                    />
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop />
                      <AlertDialog.Popup>
                        <AlertDialog.Title>Large dialog</AlertDialog.Title>
                        <AlertDialog.Description>
                          Larger dialog for more content or detailed
                          descriptions.
                        </AlertDialog.Description>
                        <div className="flex gap-3 mt-6 justify-end">
                          <AlertDialog.Close
                            render={
                              <Button size="lg" variant="outlined" color="neutral">
                                Cancel
                              </Button>
                            }
                          />
                          <AlertDialog.Close
                            render={<Button size="lg" color="danger">Confirm</Button>}
                          />
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </div>
              </Section>

              <Section
                title="Destructive Action"
                titleLevel="h3"
                id="destructive-action"
                code={`function DeleteUserDialog() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDeleting(false);
    // Close dialog and show success message
  };

  return (
    <AlertDialog.Root variant="outlined" color="danger">
      <AlertDialog.Trigger render={<Button color="danger">Delete User</Button>} />
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Title>Delete user account?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete the user
            account and remove all associated data from our servers.
          </AlertDialog.Description>
          <div className="flex gap-3 mt-6 justify-end">
            <AlertDialog.Close render={<Button variant="outlined" disabled={isDeleting}>Cancel</Button>} />
            <Button
              color="danger"
              onClick={handleDelete}
              loading={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete User'}
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Common pattern for destructive actions with loading state and
                  confirmation. Use danger color to emphasize the critical
                  nature of the action.
                </Typography>
                <DestructiveActionExample />
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div id="api-root">
                <Typography level="h3" className="mb-3">
                  AlertDialog.Root
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The root component that provides context for all child
                  components. Manages the open/closed state and passes
                  variant/color/size to children.
                </Typography>
                <PropsTable props={rootProps} />
              </div>

              <div id="api-trigger">
                <Typography level="h3" className="mb-3">
                  AlertDialog.Trigger
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Button or element that opens the alert dialog. Use the render
                  prop to compose with custom trigger elements.
                </Typography>
                <PropsTable props={triggerProps} />
              </div>

              <div id="api-portal">
                <Typography level="h3" className="mb-3">
                  AlertDialog.Portal
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Portals the dialog content to a different part of the DOM
                  (typically document.body) to avoid z-index issues.
                </Typography>
                <PropsTable props={portalProps} />
              </div>

              <div id="api-backdrop">
                <Typography level="h3" className="mb-3">
                  AlertDialog.Backdrop
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Semi-transparent overlay that appears behind the dialog popup.
                  Clicking the backdrop does not close the alert dialog.
                </Typography>
                <PropsTable props={backdropProps} />
              </div>

              <div id="api-popup">
                <Typography level="h3" className="mb-3">
                  AlertDialog.Popup
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The dialog popup container. Styled with Sheet variants and
                  centered on screen. Contains the title, description, and
                  action buttons.
                </Typography>
                <PropsTable props={popupProps} />
              </div>

              <div id="api-title">
                <Typography level="h3" className="mb-3">
                  AlertDialog.Title
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The dialog title. Font size scales with the dialog size.
                </Typography>
                <PropsTable props={titleProps} />
              </div>

              <div id="api-description">
                <Typography level="h3" className="mb-3">
                  AlertDialog.Description
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The dialog description text. Provides additional context about
                  the action requiring confirmation.
                </Typography>
                <PropsTable props={descriptionProps} />
              </div>

              <div id="api-close">
                <Typography level="h3" className="mb-3">
                  AlertDialog.Close
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Button or element that closes the alert dialog. Use the render
                  prop to compose with custom close elements like Button.
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

function DestructiveActionExample() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsDeleting(false);
  };

  return (
    <AlertDialog.Root variant="outlined" color="danger">
      <AlertDialog.Trigger
        render={<Button color="danger">Delete User</Button>}
      />
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Title>Delete user account?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete the user
            account and remove all associated data from our servers.
          </AlertDialog.Description>
          <div className="flex gap-3 mt-6 justify-end">
            <AlertDialog.Close
              render={
                <Button variant="outlined" color="neutral" disabled={isDeleting}>
                  Cancel
                </Button>
              }
            />
            <Button color="danger" onClick={handleDelete} loading={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete User'}
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
