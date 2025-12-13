import * as React from 'react';
import { Tabs } from './Tabs';

export function TabsDemo() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Default Tabs</h2>
        <Tabs.Root defaultValue="overview">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="projects">Projects</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="overview">
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Overview Content</h3>
              <p>This is the overview panel with important information.</p>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="projects">
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Projects Content</h3>
              <p>Here are all your projects.</p>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="settings">
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Settings Content</h3>
              <p>Configure your settings here.</p>
            </div>
          </Tabs.Panel>
        </Tabs.Root>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Solid Variant - Primary</h2>
        <Tabs.Root defaultValue="tab1" variant="solid" color="primary">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="tab1">Content for Tab 1</Tabs.Panel>
          <Tabs.Panel value="tab2">Content for Tab 2</Tabs.Panel>
          <Tabs.Panel value="tab3">Content for Tab 3</Tabs.Panel>
        </Tabs.Root>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Outlined Variant - Success</h2>
        <Tabs.Root defaultValue="tab1" variant="outlined" color="success">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="tab1">Success Tab 1 Content</Tabs.Panel>
          <Tabs.Panel value="tab2">Success Tab 2 Content</Tabs.Panel>
          <Tabs.Panel value="tab3">Success Tab 3 Content</Tabs.Panel>
        </Tabs.Root>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Sizes</h2>
        <div className="space-y-4">
          <Tabs.Root defaultValue="tab1" size="sm">
            <Tabs.List>
              <Tabs.Tab value="tab1">Small</Tabs.Tab>
              <Tabs.Tab value="tab2">Tabs</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value="tab1">Small size content</Tabs.Panel>
            <Tabs.Panel value="tab2">Tab 2 content</Tabs.Panel>
          </Tabs.Root>

          <Tabs.Root defaultValue="tab1" size="md">
            <Tabs.List>
              <Tabs.Tab value="tab1">Medium</Tabs.Tab>
              <Tabs.Tab value="tab2">Tabs</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value="tab1">Medium size content</Tabs.Panel>
            <Tabs.Panel value="tab2">Tab 2 content</Tabs.Panel>
          </Tabs.Root>

          <Tabs.Root defaultValue="tab1" size="lg">
            <Tabs.List>
              <Tabs.Tab value="tab1">Large</Tabs.Tab>
              <Tabs.Tab value="tab2">Tabs</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value="tab1">Large size content</Tabs.Panel>
            <Tabs.Panel value="tab2">Tab 2 content</Tabs.Panel>
          </Tabs.Root>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Vertical Orientation</h2>
        <Tabs.Root defaultValue="tab1" orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="tab1">Vertical Tab 1 Content</Tabs.Panel>
          <Tabs.Panel value="tab2">Vertical Tab 2 Content</Tabs.Panel>
          <Tabs.Panel value="tab3">Vertical Tab 3 Content</Tabs.Panel>
        </Tabs.Root>
      </div>
    </div>
  );
}
