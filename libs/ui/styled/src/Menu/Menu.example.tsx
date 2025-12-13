import * as React from 'react';
import { Menu } from './Menu';
import { Button } from '../Button';

/**
 * Example usage of the Menu component
 */
export function MenuExample() {
  return (
    <div className="space-y-8">
      {/* Basic Menu */}
      <Menu.Root>
        <Menu.Trigger render={<Button>Open Menu</Button>} />
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item>New File</Menu.Item>
              <Menu.Item>Open...</Menu.Item>
              <Menu.Separator />
              <Menu.Item>Save</Menu.Item>
              <Menu.Item>Save As...</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      {/* Menu with Groups */}
      <Menu.Root variant="soft" color="primary">
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

      {/* Menu with Radio Items */}
      <Menu.Root>
        <Menu.Trigger render={<Button>View</Button>} />
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.RadioGroup value="grid">
                <Menu.RadioItem value="grid">Grid View</Menu.RadioItem>
                <Menu.RadioItem value="list">List View</Menu.RadioItem>
                <Menu.RadioItem value="compact">Compact View</Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      {/* Menu with Checkbox Items */}
      <Menu.Root>
        <Menu.Trigger render={<Button>Options</Button>} />
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.CheckboxItem defaultChecked>Show Toolbar</Menu.CheckboxItem>
              <Menu.CheckboxItem>Show Sidebar</Menu.CheckboxItem>
              <Menu.CheckboxItem defaultChecked>Show Minimap</Menu.CheckboxItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}
