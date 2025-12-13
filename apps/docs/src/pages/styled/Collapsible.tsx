import { useState } from 'react';
import { Collapsible, Typography, Button, Card } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';

const collapsibleControls: PlaygroundControl[] = [
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const collapsibleCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  const booleanPropsStr = booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Collapsible.Root${booleanPropsStr}>
  <Collapsible.Trigger>
    <Button>Toggle Content</Button>
  </Collapsible.Trigger>
  <Collapsible.Panel>
    <Card variant="soft" color="neutral" className="mt-2">
      Collapsible content that smoothly expands and collapses.
    </Card>
  </Collapsible.Panel>
</Collapsible.Root>`;
};

const rootProps: PropMeta[] = [
  {
    name: 'defaultOpen',
    type: 'boolean',
    description: 'Whether the collapsible is initially open (uncontrolled).',
    required: false,
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'Whether the collapsible is open (controlled).',
    required: false,
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Callback when open state changes.',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the collapsible is disabled.',
    required: false,
  },
];

const triggerProps: PropMeta[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'The trigger content (typically a button or interactive element).',
    required: true,
  },
];

const panelProps: PropMeta[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'The content to show/hide.',
    required: true,
  },
];

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'basic-usage', title: 'Basic Usage', level: 3 },
  { id: 'default-open', title: 'Default Open', level: 3 },
  { id: 'controlled', title: 'Controlled State', level: 3 },
  { id: 'disabled', title: 'Disabled', level: 3 },
  { id: 'custom-trigger', title: 'Custom Trigger', level: 3 },
  { id: 'nested-content', title: 'Nested Content', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function CollapsiblePage() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(true);

  return (
    <div>
      <ComponentHeader
        title="Collapsible"
        description="An interactive component for expanding and collapsing content with smooth animations."
        baseUiUrl="https://base-ui.com/react/components/collapsible"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={collapsibleControls} codeTemplate={collapsibleCodeTemplate}>
              {(props) => {
                const disabled = props.disabled === 'true';

                return (
                  <Collapsible.Root disabled={disabled}>
                    <Collapsible.Trigger>
                      <Button>Toggle Content</Button>
                    </Collapsible.Trigger>
                    <Collapsible.Panel>
                      <Card variant="soft" color="neutral" className="mt-2">
                        <Typography level="body-sm">
                          Collapsible content that smoothly expands and collapses.
                        </Typography>
                      </Card>
                    </Collapsible.Panel>
                  </Collapsible.Root>
                );
              }}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Basic Usage"
                titleLevel="h3"
                id="basic-usage"
                code={`<Collapsible.Root>
  <Collapsible.Trigger>
    <Button>Show Details</Button>
  </Collapsible.Trigger>
  <Collapsible.Panel>
    <Card variant="soft" color="primary" className="mt-2">
      <Typography level="body-sm">
        This content is hidden by default and expands when the trigger
        is clicked.
      </Typography>
    </Card>
  </Collapsible.Panel>
</Collapsible.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Click the button to expand and collapse the content panel.
                </Typography>
                <Collapsible.Root>
                  <Collapsible.Trigger>
                    <Button>Show Details</Button>
                  </Collapsible.Trigger>
                  <Collapsible.Panel>
                    <Card variant="soft" color="primary" className="mt-2">
                      <Typography level="body-sm">
                        This content is hidden by default and expands when the trigger is
                        clicked.
                      </Typography>
                    </Card>
                  </Collapsible.Panel>
                </Collapsible.Root>
              </Section>

              <Section
                title="Default Open"
                titleLevel="h3"
                id="default-open"
                code={`<Collapsible.Root defaultOpen>
  <Collapsible.Trigger>
    <Button>Hide Details</Button>
  </Collapsible.Trigger>
  <Collapsible.Panel>
    <Card variant="soft" color="success" className="mt-2">
      <Typography level="body-sm">
        This content starts expanded by default.
      </Typography>
    </Card>
  </Collapsible.Panel>
</Collapsible.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">defaultOpen</code> to start with the
                  panel expanded.
                </Typography>
                <Collapsible.Root defaultOpen>
                  <Collapsible.Trigger>
                    <Button>Hide Details</Button>
                  </Collapsible.Trigger>
                  <Collapsible.Panel>
                    <Card variant="soft" color="success" className="mt-2">
                      <Typography level="body-sm">
                        This content starts expanded by default.
                      </Typography>
                    </Card>
                  </Collapsible.Panel>
                </Collapsible.Root>
              </Section>

              <Section
                title="Controlled State"
                titleLevel="h3"
                id="controlled"
                code={`const [open1, setOpen1] = useState(false);
const [open2, setOpen2] = useState(true);

return (
  <div className="space-y-4">
    <Collapsible.Root open={open1} onOpenChange={setOpen1}>
      <Collapsible.Trigger>
        <Button>{open1 ? 'Hide' : 'Show'} Section 1</Button>
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <Card variant="soft" color="primary" className="mt-2">
          Content for section 1
        </Card>
      </Collapsible.Panel>
    </Collapsible.Root>

    <Collapsible.Root open={open2} onOpenChange={setOpen2}>
      <Collapsible.Trigger>
        <Button>{open2 ? 'Hide' : 'Show'} Section 2</Button>
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <Card variant="soft" color="warning" className="mt-2">
          Content for section 2
        </Card>
      </Collapsible.Panel>
    </Collapsible.Root>

    <Button
      variant="outlined"
      onClick={() => {
        setOpen1(!open1);
        setOpen2(!open2);
      }}
    >
      Toggle Both
    </Button>
  </div>
);`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Control the open state externally using{' '}
                  <code className="font-mono text-sm">open</code> and{' '}
                  <code className="font-mono text-sm">onOpenChange</code> props.
                </Typography>
                <div className="space-y-4">
                  <Collapsible.Root open={open1} onOpenChange={setOpen1}>
                    <Collapsible.Trigger>
                      <Button>{open1 ? 'Hide' : 'Show'} Section 1</Button>
                    </Collapsible.Trigger>
                    <Collapsible.Panel>
                      <Card variant="soft" color="primary" className="mt-2">
                        <Typography level="body-sm">Content for section 1</Typography>
                      </Card>
                    </Collapsible.Panel>
                  </Collapsible.Root>

                  <Collapsible.Root open={open2} onOpenChange={setOpen2}>
                    <Collapsible.Trigger>
                      <Button>{open2 ? 'Hide' : 'Show'} Section 2</Button>
                    </Collapsible.Trigger>
                    <Collapsible.Panel>
                      <Card variant="soft" color="warning" className="mt-2">
                        <Typography level="body-sm">Content for section 2</Typography>
                      </Card>
                    </Collapsible.Panel>
                  </Collapsible.Root>

                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpen1(!open1);
                      setOpen2(!open2);
                    }}
                  >
                    Toggle Both
                  </Button>
                </div>
              </Section>

              <Section
                title="Disabled"
                titleLevel="h3"
                id="disabled"
                code={`<Collapsible.Root disabled>
  <Collapsible.Trigger>
    <Button>Disabled Trigger</Button>
  </Collapsible.Trigger>
  <Collapsible.Panel>
    <Card variant="soft" color="neutral" className="mt-2">
      This content cannot be toggled when disabled.
    </Card>
  </Collapsible.Panel>
</Collapsible.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">disabled</code> prop to prevent
                  user interaction.
                </Typography>
                <Collapsible.Root disabled>
                  <Collapsible.Trigger>
                    <Button>Disabled Trigger</Button>
                  </Collapsible.Trigger>
                  <Collapsible.Panel>
                    <Card variant="soft" color="neutral" className="mt-2">
                      <Typography level="body-sm">
                        This content cannot be toggled when disabled.
                      </Typography>
                    </Card>
                  </Collapsible.Panel>
                </Collapsible.Root>
              </Section>

              <Section
                title="Custom Trigger"
                titleLevel="h3"
                id="custom-trigger"
                code={`<Collapsible.Root defaultOpen>
  <Collapsible.Trigger>
    <Button
      variant="outlined"
      color="primary"
      className="w-full text-left h-auto"
    >
      <div className="space-y-1">
        <Typography level="body-md" weight="semibold">
          Advanced Settings
        </Typography>
        <Typography level="body-xs" className="text-neutral-600">
          Click to toggle configuration options
        </Typography>
      </div>
    </Button>
  </Collapsible.Trigger>
  <Collapsible.Panel>
    <Card variant="soft" color="neutral" className="mt-2 space-y-2">
      <Typography level="body-sm" weight="medium">
        Configuration Options
      </Typography>
      <Typography level="body-xs" className="text-neutral-600">
        Enable notifications: Yes
      </Typography>
      <Typography level="body-xs" className="text-neutral-600">
        Auto-save: Enabled
      </Typography>
      <Typography level="body-xs" className="text-neutral-600">
        Theme: System default
      </Typography>
    </Card>
  </Collapsible.Panel>
</Collapsible.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  The trigger can be any interactive element, not just a Button.
                </Typography>
                <div className="max-w-md">
                  <Collapsible.Root defaultOpen>
                    <Collapsible.Trigger>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="w-full text-left h-auto"
                      >
                        <div className="space-y-1">
                          <Typography level="body-md" weight="semibold">
                            Advanced Settings
                          </Typography>
                          <Typography level="body-xs" className="text-neutral-600">
                            Click to toggle configuration options
                          </Typography>
                        </div>
                      </Button>
                    </Collapsible.Trigger>
                    <Collapsible.Panel>
                      <Card variant="soft" color="neutral" className="mt-2 space-y-2">
                        <Typography level="body-sm" weight="medium">
                          Configuration Options
                        </Typography>
                        <Typography level="body-xs" className="text-neutral-600">
                          Enable notifications: Yes
                        </Typography>
                        <Typography level="body-xs" className="text-neutral-600">
                          Auto-save: Enabled
                        </Typography>
                        <Typography level="body-xs" className="text-neutral-600">
                          Theme: System default
                        </Typography>
                      </Card>
                    </Collapsible.Panel>
                  </Collapsible.Root>
                </div>
              </Section>

              <Section
                title="Nested Content"
                titleLevel="h3"
                id="nested-content"
                code={`<Collapsible.Root>
  <Collapsible.Trigger>
    <Button variant="soft" color="primary">
      Show Product Details
    </Button>
  </Collapsible.Trigger>
  <Collapsible.Panel>
    <Card variant="outlined" color="neutral" className="mt-2 space-y-3">
      <Typography level="body-md" weight="semibold">
        Product Information
      </Typography>

      <div className="space-y-2">
        <Typography level="body-sm" weight="medium">
          Features
        </Typography>
        <ul className="ml-6 space-y-1 list-disc">
          <li>
            <Typography level="body-xs">
              High-performance processor
            </Typography>
          </li>
          <li>
            <Typography level="body-xs">
              64GB storage capacity
            </Typography>
          </li>
          <li>
            <Typography level="body-xs">
              Long-lasting battery life
            </Typography>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <Typography level="body-sm" weight="medium">
          Specifications
        </Typography>
        <Typography level="body-xs" className="text-neutral-600">
          Dimensions: 150 x 75 x 8mm
        </Typography>
        <Typography level="body-xs" className="text-neutral-600">
          Weight: 180g
        </Typography>
        <Typography level="body-xs" className="text-neutral-600">
          Color: Midnight Black
        </Typography>
      </div>
    </Card>
  </Collapsible.Panel>
</Collapsible.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Collapsible panels can contain rich, structured content.
                </Typography>
                <div className="max-w-md">
                  <Collapsible.Root>
                    <Collapsible.Trigger>
                      <Button variant="soft" color="primary">
                        Show Product Details
                      </Button>
                    </Collapsible.Trigger>
                    <Collapsible.Panel>
                      <Card variant="outlined" color="neutral" className="mt-2 space-y-3">
                        <Typography level="body-md" weight="semibold">
                          Product Information
                        </Typography>

                        <div className="space-y-2">
                          <Typography level="body-sm" weight="medium">
                            Features
                          </Typography>
                          <ul className="ml-6 space-y-1 list-disc">
                            <li>
                              <Typography level="body-xs">
                                High-performance processor
                              </Typography>
                            </li>
                            <li>
                              <Typography level="body-xs">
                                64GB storage capacity
                              </Typography>
                            </li>
                            <li>
                              <Typography level="body-xs">
                                Long-lasting battery life
                              </Typography>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <Typography level="body-sm" weight="medium">
                            Specifications
                          </Typography>
                          <Typography level="body-xs" className="text-neutral-600">
                            Dimensions: 150 x 75 x 8mm
                          </Typography>
                          <Typography level="body-xs" className="text-neutral-600">
                            Weight: 180g
                          </Typography>
                          <Typography level="body-xs" className="text-neutral-600">
                            Color: Midnight Black
                          </Typography>
                        </div>
                      </Card>
                    </Collapsible.Panel>
                  </Collapsible.Root>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h3" className="mb-4">
                  Collapsible.Root
                </Typography>
                <PropsTable props={rootProps} />
              </div>
              <div>
                <Typography level="h3" className="mb-4">
                  Collapsible.Trigger
                </Typography>
                <PropsTable props={triggerProps} />
              </div>
              <div>
                <Typography level="h3" className="mb-4">
                  Collapsible.Panel
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
