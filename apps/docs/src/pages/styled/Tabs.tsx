import { useState } from 'react';
import { Typography, Tabs } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { Size, Variant, ColorScale } from '@base-joy/tokens';

const tabsControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const tabsCodeTemplate = (props: Record<string, string>) =>
  `<Tabs.Root variant="${props.variant}" color="${props.color}" size="${props.size}" defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Tab value="tab-1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="tab-3">Tab 3</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab-1">Panel 1 content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Panel 2 content</Tabs.Panel>
  <Tabs.Panel value="tab-3">Panel 3 content</Tabs.Panel>
</Tabs.Root>`;

const rootProps: PropMeta[] = [
  {
    name: 'defaultValue',
    type: 'string',
    description: 'The value of the initially selected tab (uncontrolled).',
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    description: 'The value of the selected tab (controlled).',
    required: false,
  },
  {
    name: 'onValueChange',
    type: '(value: string | null) => void',
    description: 'Callback when the selected tab changes.',
    required: false,
  },
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    defaultValue: "'soft'",
    description: 'The visual style of the tabs.',
    required: false,
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    defaultValue: "'primary'",
    description: 'The color scheme of the tabs.',
    required: false,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'The size of the tabs.',
    required: false,
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description: 'The orientation of the tab list.',
    required: false,
  },
];

const tabProps: PropMeta[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Unique identifier for the tab.',
    required: true,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the tab is disabled.',
    required: false,
  },
];

const panelProps: PropMeta[] = [
  {
    name: 'value',
    type: 'string',
    description: 'The value that determines when this panel is shown.',
    required: true,
  },
];

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'vertical', title: 'Vertical Orientation', level: 3 },
  { id: 'controlled', title: 'Controlled', level: 3 },
  { id: 'disabled', title: 'Disabled Tabs', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function TabsPage() {
  return (
    <div>
      <ComponentHeader
        title="Tabs"
        description="A set of layered sections of content that are displayed one at a time. Tabs organize content across different screens, data sets, and other interactions."
        baseUiUrl="https://base-ui.com/react/components/tabs"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={tabsControls} codeTemplate={tabsCodeTemplate}>
              {(props) => (
                <div className="w-full max-w-md">
                  <Tabs.Root
                    variant={props.variant as Variant}
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    defaultValue="tab-1"
                  >
                    <Tabs.List>
                      <Tabs.Tab value="tab-1">Overview</Tabs.Tab>
                      <Tabs.Tab value="tab-2">Features</Tabs.Tab>
                      <Tabs.Tab value="tab-3">Settings</Tabs.Tab>
                      <Tabs.Indicator />
                    </Tabs.List>
                    <Tabs.Panel value="tab-1">
                      <Typography level="body-sm">
                        View an overview of your project and its key metrics.
                      </Typography>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab-2">
                      <Typography level="body-sm">
                        Explore available features and functionality.
                      </Typography>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab-3">
                      <Typography level="body-sm">
                        Configure settings and preferences for your project.
                      </Typography>
                    </Tabs.Panel>
                  </Tabs.Root>
                </div>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Tabs.Root variant="solid" color="primary" defaultValue="solid">
  <Tabs.List>
    <Tabs.Tab value="solid">Solid</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="solid">Solid variant content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>

<Tabs.Root variant="soft" color="primary" defaultValue="soft">
  <Tabs.List>
    <Tabs.Tab value="soft">Soft</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="soft">Soft variant content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>

<Tabs.Root variant="outlined" color="primary" defaultValue="outlined">
  <Tabs.List>
    <Tabs.Tab value="outlined">Outlined</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="outlined">Outlined variant content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>

<Tabs.Root variant="plain" color="primary" defaultValue="plain">
  <Tabs.List>
    <Tabs.Tab value="plain">Plain</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="plain">Plain variant content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-6">
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Solid
                    </Typography>
                    <Tabs.Root variant="solid" color="primary" defaultValue="solid">
                      <Tabs.List>
                        <Tabs.Tab value="solid">Solid</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="solid">
                        <Typography level="body-sm">Solid variant content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Soft (default)
                    </Typography>
                    <Tabs.Root variant="soft" color="primary" defaultValue="soft">
                      <Tabs.List>
                        <Tabs.Tab value="soft">Soft</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="soft">
                        <Typography level="body-sm">Soft variant content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Outlined
                    </Typography>
                    <Tabs.Root variant="outlined" color="primary" defaultValue="outlined">
                      <Tabs.List>
                        <Tabs.Tab value="outlined">Outlined</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="outlined">
                        <Typography level="body-sm">Outlined variant content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Plain
                    </Typography>
                    <Tabs.Root variant="plain" color="primary" defaultValue="plain">
                      <Tabs.List>
                        <Tabs.Tab value="plain">Plain</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="plain">
                        <Typography level="body-sm">Plain variant content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Tabs.Root variant="soft" color="primary" defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Tab value="tab-1">Primary</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab-1">Primary color content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>

<Tabs.Root variant="soft" color="neutral" defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Tab value="tab-1">Neutral</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab-1">Neutral color content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>

<Tabs.Root variant="soft" color="success" defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Tab value="tab-1">Success</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab-1">Success color content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>

<Tabs.Root variant="soft" color="warning" defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Tab value="tab-1">Warning</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab-1">Warning color content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>

<Tabs.Root variant="soft" color="danger" defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Tab value="tab-1">Danger</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab-1">Danger color content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-6">
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Primary
                    </Typography>
                    <Tabs.Root variant="soft" color="primary" defaultValue="tab-1">
                      <Tabs.List>
                        <Tabs.Tab value="tab-1">Primary</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="tab-1">
                        <Typography level="body-sm">Primary color content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Neutral
                    </Typography>
                    <Tabs.Root variant="soft" color="neutral" defaultValue="tab-1">
                      <Tabs.List>
                        <Tabs.Tab value="tab-1">Neutral</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="tab-1">
                        <Typography level="body-sm">Neutral color content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Success
                    </Typography>
                    <Tabs.Root variant="soft" color="success" defaultValue="tab-1">
                      <Tabs.List>
                        <Tabs.Tab value="tab-1">Success</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="tab-1">
                        <Typography level="body-sm">Success color content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Warning
                    </Typography>
                    <Tabs.Root variant="soft" color="warning" defaultValue="tab-1">
                      <Tabs.List>
                        <Tabs.Tab value="tab-1">Warning</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="tab-1">
                        <Typography level="body-sm">Warning color content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Danger
                    </Typography>
                    <Tabs.Root variant="soft" color="danger" defaultValue="tab-1">
                      <Tabs.List>
                        <Tabs.Tab value="tab-1">Danger</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="tab-1">
                        <Typography level="body-sm">Danger color content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Tabs.Root size="sm" defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Tab value="tab-1">Small</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab-1">Small size content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>

<Tabs.Root size="md" defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Tab value="tab-1">Medium</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab-1">Medium size content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>

<Tabs.Root size="lg" defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Tab value="tab-1">Large</Tabs.Tab>
    <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="tab-1">Large size content</Tabs.Panel>
  <Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>
</Tabs.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-6">
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Small
                    </Typography>
                    <Tabs.Root size="sm" defaultValue="tab-1">
                      <Tabs.List>
                        <Tabs.Tab value="tab-1">Small</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="tab-1">
                        <Typography level="body-sm">Small size content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Medium (default)
                    </Typography>
                    <Tabs.Root size="md" defaultValue="tab-1">
                      <Tabs.List>
                        <Tabs.Tab value="tab-1">Medium</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="tab-1">
                        <Typography level="body-sm">Medium size content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                  <div className="max-w-md">
                    <Typography level="body-sm" className="mb-2">
                      Large
                    </Typography>
                    <Tabs.Root size="lg" defaultValue="tab-1">
                      <Tabs.List>
                        <Tabs.Tab value="tab-1">Large</Tabs.Tab>
                        <Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
                        <Tabs.Indicator />
                      </Tabs.List>
                      <Tabs.Panel value="tab-1">
                        <Typography level="body-sm">Large size content</Typography>
                      </Tabs.Panel>
                      <Tabs.Panel value="tab-2">
                        <Typography level="body-sm">Tab 2 content</Typography>
                      </Tabs.Panel>
                    </Tabs.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Vertical Orientation"
                titleLevel="h3"
                id="vertical"
                code={`<Tabs.Root orientation="vertical" defaultValue="account">
  <Tabs.List>
    <Tabs.Tab value="account">Account</Tabs.Tab>
    <Tabs.Tab value="security">Security</Tabs.Tab>
    <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="account">
    <Typography level="body-sm">
      Manage your account settings and preferences.
    </Typography>
  </Tabs.Panel>
  <Tabs.Panel value="security">
    <Typography level="body-sm">
      Configure security options and password settings.
    </Typography>
  </Tabs.Panel>
  <Tabs.Panel value="notifications">
    <Typography level="body-sm">
      Control how and when you receive notifications.
    </Typography>
  </Tabs.Panel>
</Tabs.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">orientation</code> prop to
                  display tabs vertically.
                </Typography>
                <div className="max-w-2xl">
                  <Tabs.Root orientation="vertical" defaultValue="account">
                    <Tabs.List>
                      <Tabs.Tab value="account">Account</Tabs.Tab>
                      <Tabs.Tab value="security">Security</Tabs.Tab>
                      <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
                      <Tabs.Indicator />
                    </Tabs.List>
                    <Tabs.Panel value="account">
                      <Typography level="body-sm">
                        Manage your account settings and preferences. Update your profile
                        information, email address, and more.
                      </Typography>
                    </Tabs.Panel>
                    <Tabs.Panel value="security">
                      <Typography level="body-sm">
                        Configure security options and password settings. Enable two-factor
                        authentication and review login history.
                      </Typography>
                    </Tabs.Panel>
                    <Tabs.Panel value="notifications">
                      <Typography level="body-sm">
                        Control how and when you receive notifications. Customize alerts for
                        different types of activities.
                      </Typography>
                    </Tabs.Panel>
                  </Tabs.Root>
                </div>
              </Section>

              <Section
                title="Controlled"
                titleLevel="h3"
                id="controlled"
                code={`function ControlledTabs() {
  const [value, setValue] = useState('home');

  return (
    <div>
      <Tabs.Root value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Tab value="home">Home</Tabs.Tab>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="home">
          <Typography level="body-sm">Home content</Typography>
        </Tabs.Panel>
        <Tabs.Panel value="profile">
          <Typography level="body-sm">Profile content</Typography>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <Typography level="body-sm">Settings content</Typography>
        </Tabs.Panel>
      </Tabs.Root>
      <Typography level="body-sm" className="mt-4 text-neutral-600">
        Current tab: {value}
      </Typography>
    </div>
  );
}`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">value</code> and{' '}
                  <code className="font-mono text-sm">onValueChange</code> props for
                  controlled tab state.
                </Typography>
                <ControlledTabsExample />
              </Section>

              <Section
                title="Disabled Tabs"
                titleLevel="h3"
                id="disabled"
                code={`<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="analytics" disabled>Analytics</Tabs.Tab>
    <Tabs.Tab value="reports">Reports</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="overview">
    <Typography level="body-sm">Overview content</Typography>
  </Tabs.Panel>
  <Tabs.Panel value="analytics">
    <Typography level="body-sm">Analytics content</Typography>
  </Tabs.Panel>
  <Tabs.Panel value="reports">
    <Typography level="body-sm">Reports content</Typography>
  </Tabs.Panel>
</Tabs.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">disabled</code> prop on
                  individual tabs to prevent user interaction.
                </Typography>
                <div className="max-w-md">
                  <Tabs.Root defaultValue="overview">
                    <Tabs.List>
                      <Tabs.Tab value="overview">Overview</Tabs.Tab>
                      <Tabs.Tab value="analytics" disabled>
                        Analytics
                      </Tabs.Tab>
                      <Tabs.Tab value="reports">Reports</Tabs.Tab>
                      <Tabs.Indicator />
                    </Tabs.List>
                    <Tabs.Panel value="overview">
                      <Typography level="body-sm">
                        View an overview of your data and key metrics.
                      </Typography>
                    </Tabs.Panel>
                    <Tabs.Panel value="analytics">
                      <Typography level="body-sm">
                        This tab is disabled and cannot be selected.
                      </Typography>
                    </Tabs.Panel>
                    <Tabs.Panel value="reports">
                      <Typography level="body-sm">
                        Generate and download detailed reports.
                      </Typography>
                    </Tabs.Panel>
                  </Tabs.Root>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h3" className="mb-4">
                  Tabs.Root
                </Typography>
                <PropsTable props={rootProps} />
              </div>
              <div>
                <Typography level="h3" className="mb-4">
                  Tabs.Tab
                </Typography>
                <PropsTable props={tabProps} />
              </div>
              <div>
                <Typography level="h3" className="mb-4">
                  Tabs.Panel
                </Typography>
                <PropsTable props={panelProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

function ControlledTabsExample() {
  const [value, setValue] = useState('home');

  return (
    <div className="max-w-md">
      <Tabs.Root value={value} onValueChange={(newValue) => setValue(newValue || 'home')}>
        <Tabs.List>
          <Tabs.Tab value="home">Home</Tabs.Tab>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="home">
          <Typography level="body-sm">Home content</Typography>
        </Tabs.Panel>
        <Tabs.Panel value="profile">
          <Typography level="body-sm">Profile content</Typography>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <Typography level="body-sm">Settings content</Typography>
        </Tabs.Panel>
      </Tabs.Root>
      <Typography level="body-sm" className="mt-4 text-neutral-600">
        Current tab: <strong>{value}</strong>
      </Typography>
    </div>
  );
}
