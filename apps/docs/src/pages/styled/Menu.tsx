import { Menu, Button, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';
import * as React from 'react';

const menuControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const menuCodeTemplate = (props: Record<string, string>) =>
  `<Menu.Root variant="${props.variant}" color="${props.color}" size="${props.size}">
  <Menu.Trigger render={<Button>Open Menu</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Menu Item 1</Menu.Item>
        <Menu.Item>Menu Item 2</Menu.Item>
        <Menu.Item>Menu Item 3</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'with-icons', title: 'With Icons', level: 3 },
  { id: 'with-separator', title: 'With Separator', level: 3 },
  { id: 'with-groups', title: 'With Groups', level: 3 },
  { id: 'checkbox-items', title: 'Checkbox Items', level: 3 },
  { id: 'radio-items', title: 'Radio Items', level: 3 },
  { id: 'submenu', title: 'Submenu', level: 3 },
  { id: 'disabled-items', title: 'Disabled Items', level: 3 },
  { id: 'api', title: 'API Reference' },
];

// Manual props definitions for Menu components
const menuRootProps: PropMeta[] = [
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    required: false,
    defaultValue: "'outlined'",
    description: 'The visual style of the menu items.',
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    required: false,
    defaultValue: "'neutral'",
    description: 'The color scheme of the menu items.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    required: false,
    defaultValue: "'md'",
    description: 'The size of the menu.',
  },
];

const menuTriggerProps: PropMeta[] = [
  {
    name: 'render',
    type: 'React.ReactElement',
    required: false,
    description: 'Render prop for composition (Base UI pattern).',
  },
];

const menuItemProps: PropMeta[] = [
  {
    name: 'disabled',
    type: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'Whether the menu item is disabled.',
  },
];

const menuCheckboxItemProps: PropMeta[] = [
  {
    name: 'defaultChecked',
    type: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'Whether the checkbox is checked by default.',
  },
  {
    name: 'checked',
    type: 'boolean',
    required: false,
    description: 'Controlled checked state.',
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean) => void',
    required: false,
    description: 'Callback when checked state changes.',
  },
];

const menuRadioGroupProps: PropMeta[] = [
  {
    name: 'value',
    type: 'string',
    required: false,
    description: 'The currently selected radio item value.',
  },
  {
    name: 'defaultValue',
    type: 'string',
    required: false,
    description: 'The default selected radio item value.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    required: false,
    description: 'Callback when the selected value changes.',
  },
];

const menuRadioItemProps: PropMeta[] = [
  {
    name: 'value',
    type: 'string',
    required: true,
    description: 'The value of the radio item.',
  },
];

export function MenuPage() {
  const [view, setView] = React.useState('grid');

  return (
    <div>
      <ComponentHeader
        title="Menu"
        description="A dropdown menu component with support for items, groups, separators, checkboxes, radio buttons, and submenus. Built on Base UI's accessible menu primitives."
        baseUiUrl="https://base-ui.com/react/components/menu"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={menuControls} codeTemplate={menuCodeTemplate}>
              {(props) => (
                <Menu.Root
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  <Menu.Trigger render={<Button>Open Menu</Button>} />
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Item>Menu Item 1</Menu.Item>
                        <Menu.Item>Menu Item 2</Menu.Item>
                        <Menu.Item>Menu Item 3</Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Menu.Root variant="solid" color="primary">
  <Menu.Trigger render={<Button>Solid</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>New File</Menu.Item>
        <Menu.Item>Open...</Menu.Item>
        <Menu.Item>Save</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

<Menu.Root variant="soft" color="primary">
  <Menu.Trigger render={<Button>Soft</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>New File</Menu.Item>
        <Menu.Item>Open...</Menu.Item>
        <Menu.Item>Save</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

<Menu.Root variant="outlined" color="primary">
  <Menu.Trigger render={<Button>Outlined</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>New File</Menu.Item>
        <Menu.Item>Open...</Menu.Item>
        <Menu.Item>Save</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

<Menu.Root variant="plain" color="primary">
  <Menu.Trigger render={<Button>Plain</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>New File</Menu.Item>
        <Menu.Item>Open...</Menu.Item>
        <Menu.Item>Save</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Menu.Root variant="solid" color="primary">
                    <Menu.Trigger render={<Button>Solid</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>New File</Menu.Item>
                          <Menu.Item>Open...</Menu.Item>
                          <Menu.Item>Save</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>

                  <Menu.Root variant="soft" color="primary">
                    <Menu.Trigger render={<Button>Soft</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>New File</Menu.Item>
                          <Menu.Item>Open...</Menu.Item>
                          <Menu.Item>Save</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>

                  <Menu.Root variant="outlined" color="primary">
                    <Menu.Trigger render={<Button>Outlined</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>New File</Menu.Item>
                          <Menu.Item>Open...</Menu.Item>
                          <Menu.Item>Save</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>

                  <Menu.Root variant="plain" color="primary">
                    <Menu.Trigger render={<Button>Plain</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>New File</Menu.Item>
                          <Menu.Item>Open...</Menu.Item>
                          <Menu.Item>Save</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Menu.Root variant="soft" color="primary">
  <Menu.Trigger render={<Button color="primary">Primary</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

<Menu.Root variant="soft" color="neutral">
  <Menu.Trigger render={<Button color="neutral">Neutral</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

<Menu.Root variant="soft" color="success">
  <Menu.Trigger render={<Button color="success">Success</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

<Menu.Root variant="soft" color="warning">
  <Menu.Trigger render={<Button color="warning">Warning</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

<Menu.Root variant="soft" color="danger">
  <Menu.Trigger render={<Button color="danger">Danger</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Menu.Root variant="soft" color="primary">
                    <Menu.Trigger render={<Button color="primary">Primary</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>Action 1</Menu.Item>
                          <Menu.Item>Action 2</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>

                  <Menu.Root variant="soft" color="neutral">
                    <Menu.Trigger render={<Button color="neutral">Neutral</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>Action 1</Menu.Item>
                          <Menu.Item>Action 2</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>

                  <Menu.Root variant="soft" color="success">
                    <Menu.Trigger render={<Button color="success">Success</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>Action 1</Menu.Item>
                          <Menu.Item>Action 2</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>

                  <Menu.Root variant="soft" color="warning">
                    <Menu.Trigger render={<Button color="warning">Warning</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>Action 1</Menu.Item>
                          <Menu.Item>Action 2</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>

                  <Menu.Root variant="soft" color="danger">
                    <Menu.Trigger render={<Button color="danger">Danger</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>Action 1</Menu.Item>
                          <Menu.Item>Action 2</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Menu.Root size="sm">
  <Menu.Trigger render={<Button size="sm">Small</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

<Menu.Root size="md">
  <Menu.Trigger render={<Button size="md">Medium</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>

<Menu.Root size="lg">
  <Menu.Trigger render={<Button size="lg">Large</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <Menu.Root size="sm">
                    <Menu.Trigger render={<Button size="sm">Small</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>Item 1</Menu.Item>
                          <Menu.Item>Item 2</Menu.Item>
                          <Menu.Item>Item 3</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>

                  <Menu.Root size="md">
                    <Menu.Trigger render={<Button size="md">Medium</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>Item 1</Menu.Item>
                          <Menu.Item>Item 2</Menu.Item>
                          <Menu.Item>Item 3</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>

                  <Menu.Root size="lg">
                    <Menu.Trigger render={<Button size="lg">Large</Button>} />
                    <Menu.Portal>
                      <Menu.Positioner>
                        <Menu.Popup>
                          <Menu.Item>Item 1</Menu.Item>
                          <Menu.Item>Item 2</Menu.Item>
                          <Menu.Item>Item 3</Menu.Item>
                        </Menu.Popup>
                      </Menu.Positioner>
                    </Menu.Portal>
                  </Menu.Root>
                </div>
              </Section>

              <Section
                title="With Icons"
                titleLevel="h3"
                id="with-icons"
                code={`<Menu.Root>
  <Menu.Trigger render={<Button>Actions</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          New File
        </Menu.Item>
        <Menu.Item>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M13 6L8.5 10.5L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Save
        </Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <Menu.Root>
                  <Menu.Trigger render={<Button>Actions</Button>} />
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Item>
                          <svg
                            className="w-4 h-4"
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
                          New File
                        </Menu.Item>
                        <Menu.Item>
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 8.5L6.5 12L13 5.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Save
                        </Menu.Item>
                        <Menu.Item>
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 6h8M4 10h5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          Open...
                        </Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </Section>

              <Section
                title="With Separator"
                titleLevel="h3"
                id="with-separator"
                code={`<Menu.Root>
  <Menu.Trigger render={<Button>File</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>New File</Menu.Item>
        <Menu.Item>Open...</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Save</Menu.Item>
        <Menu.Item>Save As...</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Close</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <Menu.Root>
                  <Menu.Trigger render={<Button>File</Button>} />
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Item>New File</Menu.Item>
                        <Menu.Item>Open...</Menu.Item>
                        <Menu.Separator />
                        <Menu.Item>Save</Menu.Item>
                        <Menu.Item>Save As...</Menu.Item>
                        <Menu.Separator />
                        <Menu.Item>Close</Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </Section>

              <Section
                title="With Groups"
                titleLevel="h3"
                id="with-groups"
                code={`<Menu.Root>
  <Menu.Trigger render={<Button>Settings</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Group>
          <Menu.GroupLabel>Appearance</Menu.GroupLabel>
          <Menu.Item>Theme</Menu.Item>
          <Menu.Item>Font Size</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>Privacy</Menu.GroupLabel>
          <Menu.Item>Cookies</Menu.Item>
          <Menu.Item>Data</Menu.Item>
        </Menu.Group>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <Menu.Root>
                  <Menu.Trigger render={<Button>Settings</Button>} />
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Group>
                          <Menu.GroupLabel>Appearance</Menu.GroupLabel>
                          <Menu.Item>Theme</Menu.Item>
                          <Menu.Item>Font Size</Menu.Item>
                        </Menu.Group>
                        <Menu.Separator />
                        <Menu.Group>
                          <Menu.GroupLabel>Privacy</Menu.GroupLabel>
                          <Menu.Item>Cookies</Menu.Item>
                          <Menu.Item>Data</Menu.Item>
                        </Menu.Group>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </Section>

              <Section
                title="Checkbox Items"
                titleLevel="h3"
                id="checkbox-items"
                code={`<Menu.Root>
  <Menu.Trigger render={<Button>View Options</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.CheckboxItem defaultChecked>
          Show Toolbar
        </Menu.CheckboxItem>
        <Menu.CheckboxItem>
          Show Sidebar
        </Menu.CheckboxItem>
        <Menu.CheckboxItem defaultChecked>
          Show Minimap
        </Menu.CheckboxItem>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <Menu.Root>
                  <Menu.Trigger render={<Button>View Options</Button>} />
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.CheckboxItem defaultChecked>
                          Show Toolbar
                        </Menu.CheckboxItem>
                        <Menu.CheckboxItem>Show Sidebar</Menu.CheckboxItem>
                        <Menu.CheckboxItem defaultChecked>
                          Show Minimap
                        </Menu.CheckboxItem>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </Section>

              <Section
                title="Radio Items"
                titleLevel="h3"
                id="radio-items"
                code={`const [view, setView] = React.useState('grid');

<Menu.Root>
  <Menu.Trigger render={<Button>View: {view}</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.RadioGroup value={view} onValueChange={setView}>
          <Menu.RadioItem value="grid">Grid View</Menu.RadioItem>
          <Menu.RadioItem value="list">List View</Menu.RadioItem>
          <Menu.RadioItem value="compact">Compact View</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <Menu.Root>
                  <Menu.Trigger
                    render={<Button>View: {view}</Button>}
                  />
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.RadioGroup value={view} onValueChange={setView}>
                          <Menu.RadioItem value="grid">Grid View</Menu.RadioItem>
                          <Menu.RadioItem value="list">List View</Menu.RadioItem>
                          <Menu.RadioItem value="compact">
                            Compact View
                          </Menu.RadioItem>
                        </Menu.RadioGroup>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </Section>

              <Section
                title="Submenu"
                titleLevel="h3"
                id="submenu"
                code={`<Menu.Root>
  <Menu.Trigger render={<Button>Edit</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Cut</Menu.Item>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Paste</Menu.Item>
        <Menu.Separator />
        <Menu.Root>
          <Menu.SubmenuTrigger>Transform</Menu.SubmenuTrigger>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.Item>Uppercase</Menu.Item>
                <Menu.Item>Lowercase</Menu.Item>
                <Menu.Item>Capitalize</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <Menu.Root>
                  <Menu.Trigger render={<Button>Edit</Button>} />
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Item>Cut</Menu.Item>
                        <Menu.Item>Copy</Menu.Item>
                        <Menu.Item>Paste</Menu.Item>
                        <Menu.Separator />
                        <Menu.Root>
                          <Menu.SubmenuTrigger>Transform</Menu.SubmenuTrigger>
                          <Menu.Portal>
                            <Menu.Positioner>
                              <Menu.Popup>
                                <Menu.Item>Uppercase</Menu.Item>
                                <Menu.Item>Lowercase</Menu.Item>
                                <Menu.Item>Capitalize</Menu.Item>
                              </Menu.Popup>
                            </Menu.Positioner>
                          </Menu.Portal>
                        </Menu.Root>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </Section>

              <Section
                title="Disabled Items"
                titleLevel="h3"
                id="disabled-items"
                code={`<Menu.Root>
  <Menu.Trigger render={<Button>Actions</Button>} />
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup>
        <Menu.Item>Available Action</Menu.Item>
        <Menu.Item disabled>Disabled Action</Menu.Item>
        <Menu.Item>Another Action</Menu.Item>
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</Menu.Root>`}
                codeLanguage="tsx"
              >
                <Menu.Root>
                  <Menu.Trigger render={<Button>Actions</Button>} />
                  <Menu.Portal>
                    <Menu.Positioner>
                      <Menu.Popup>
                        <Menu.Item>Available Action</Menu.Item>
                        <Menu.Item disabled>Disabled Action</Menu.Item>
                        <Menu.Item>Another Action</Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h3" className="mb-4">
                  Menu.Root
                </Typography>
                <PropsTable props={menuRootProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.Trigger
                </Typography>
                <PropsTable props={menuTriggerProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.Portal
                </Typography>
                <Typography level="body-sm" className="text-neutral-600">
                  Portals the menu popup to the document body. No additional
                  props.
                </Typography>
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.Positioner
                </Typography>
                <Typography level="body-sm" className="text-neutral-600">
                  Positions the menu popup relative to the trigger. Accepts
                  standard positioning props from Base UI.
                </Typography>
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.Popup
                </Typography>
                <Typography level="body-sm" className="text-neutral-600">
                  The container for menu items. Inherits variant, color, and
                  size from Menu.Root.
                </Typography>
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.Item
                </Typography>
                <PropsTable props={menuItemProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.Separator
                </Typography>
                <Typography level="body-sm" className="text-neutral-600">
                  A visual separator between menu items. No additional props.
                </Typography>
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.Group
                </Typography>
                <Typography level="body-sm" className="text-neutral-600">
                  Groups related menu items together. No additional props.
                </Typography>
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.GroupLabel
                </Typography>
                <Typography level="body-sm" className="text-neutral-600">
                  A label for a menu group. Inherits size from Menu.Root.
                </Typography>
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.CheckboxItem
                </Typography>
                <PropsTable props={menuCheckboxItemProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.RadioGroup
                </Typography>
                <PropsTable props={menuRadioGroupProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.RadioItem
                </Typography>
                <PropsTable props={menuRadioItemProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4">
                  Menu.SubmenuTrigger
                </Typography>
                <Typography level="body-sm" className="text-neutral-600">
                  Triggers a nested submenu. Must be wrapped in a Menu.Root for
                  the submenu. Automatically displays an arrow indicator.
                </Typography>
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
