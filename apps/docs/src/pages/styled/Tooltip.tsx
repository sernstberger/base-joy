import { Tooltip, Button, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { ColorScale, Size } from '@base-joy/tokens';

const tooltipRootProps: PropMeta[] = [
  {
    name: 'variant',
    type: "'solid' | 'soft'",
    defaultValue: "'solid'",
    description: 'The visual style of the tooltip.',
    required: false,
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    defaultValue: "'neutral'",
    description: 'The color scheme of the tooltip.',
    required: false,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'sm'",
    description: 'The size of the tooltip.',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The tooltip trigger and content.',
    required: true,
  },
];

const tooltipProviderProps: PropMeta[] = [
  {
    name: 'delay',
    type: 'number',
    defaultValue: '600',
    description: 'The delay in milliseconds before the tooltip opens.',
    required: false,
  },
  {
    name: 'closeDelay',
    type: 'number',
    defaultValue: '0',
    description: 'The delay in milliseconds before the tooltip closes.',
    required: false,
  },
  {
    name: 'timeout',
    type: 'number',
    defaultValue: '0',
    description: 'The timeout in milliseconds after which the tooltip closes.',
    required: false,
  },
];

const tooltipTriggerProps: PropMeta[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The element that triggers the tooltip.',
    required: true,
  },
];

const tooltipPositionerProps: PropMeta[] = [
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    defaultValue: "'top'",
    description: 'The side of the trigger where the tooltip appears.',
    required: false,
  },
  {
    name: 'alignment',
    type: "'start' | 'center' | 'end'",
    defaultValue: "'center'",
    description: 'The alignment of the tooltip relative to the trigger.',
    required: false,
  },
  {
    name: 'sideOffset',
    type: 'number',
    defaultValue: '8',
    description: 'The offset in pixels from the trigger.',
    required: false,
  },
];

const tooltipPopupProps: PropMeta[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The tooltip content.',
    required: true,
  },
];

const tooltipArrowProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes for the arrow.',
    required: false,
  },
];

const tooltipControls: PlaygroundControl[] = [
  { name: 'variant', type: 'select', defaultValue: 'solid', options: ['solid', 'soft'] },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'sm' },
];

const tooltipCodeTemplate = (props: Record<string, string>) =>
  `<Tooltip.Root variant="${props.variant}" color="${props.color}" size="${props.size}">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">
      Hover me
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Tooltip content
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors-solid', title: 'Colors (Solid)', level: 3 },
  { id: 'colors-soft', title: 'Colors (Soft)', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'positions', title: 'Positions', level: 3 },
  { id: 'with-arrow', title: 'With Arrow', level: 3 },
  { id: 'custom-delay', title: 'Custom Delay', level: 3 },
  { id: 'api', title: 'API Reference' },
  { id: 'api-root', title: 'Tooltip.Root', level: 3 },
  { id: 'api-provider', title: 'Tooltip.Provider', level: 3 },
  { id: 'api-trigger', title: 'Tooltip.Trigger', level: 3 },
  { id: 'api-positioner', title: 'Tooltip.Positioner', level: 3 },
  { id: 'api-popup', title: 'Tooltip.Popup', level: 3 },
  { id: 'api-arrow', title: 'Tooltip.Arrow', level: 3 },
];

export function TooltipPage() {
  return (
    <div>
      <ComponentHeader
        title="Tooltip"
        description="A popup that displays information when hovering over or focusing on an element. Built with variant, color, and size props for consistent styling."
        baseUiUrl="https://base-ui.com/react/components/tooltip"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={tooltipControls}
              codeTemplate={tooltipCodeTemplate}
            >
              {(props) => (
                <Tooltip.Root
                  variant={props.variant as 'solid' | 'soft'}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  <Tooltip.Trigger>
                    <Button variant="outlined" color="neutral">
                      Hover me
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner>
                      <Tooltip.Popup>
                        Tooltip content
                        <Tooltip.Arrow />
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Tooltip.Root variant="solid" color="neutral">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Solid</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Solid variant tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="soft" color="neutral">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Soft</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Soft variant tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Tooltip.Root variant="solid" color="neutral">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Solid
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Solid variant tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="soft" color="neutral">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Soft
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Soft variant tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </Section>

              <Section
                title="Colors (Solid variant)"
                titleLevel="h3"
                id="colors-solid"
                code={`<Tooltip.Root variant="solid" color="primary">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Primary</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Primary tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="solid" color="neutral">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Neutral</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Neutral tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="solid" color="success">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Success</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Success tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="solid" color="warning">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Warning</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Warning tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="solid" color="danger">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Danger</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Danger tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Tooltip.Root variant="solid" color="primary">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Primary
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Primary tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="solid" color="neutral">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Neutral
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Neutral tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="solid" color="success">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Success
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Success tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="solid" color="warning">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Warning
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Warning tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="solid" color="danger">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Danger
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Danger tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </Section>

              <Section
                title="Colors (Soft variant)"
                titleLevel="h3"
                id="colors-soft"
                code={`<Tooltip.Root variant="soft" color="primary">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Primary</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Primary tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="soft" color="neutral">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Neutral</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Neutral tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="soft" color="success">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Success</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Success tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="soft" color="warning">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Warning</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Warning tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="soft" color="danger">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Danger</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Danger tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Tooltip.Root variant="soft" color="primary">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Primary
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Primary tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="soft" color="neutral">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Neutral
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Neutral tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="soft" color="success">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Success
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Success tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="soft" color="warning">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Warning
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Warning tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="soft" color="danger">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Danger
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Danger tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Tooltip.Root size="sm">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral" size="sm">
      Small
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Small tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root size="md">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral" size="md">
      Medium
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Medium tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root size="lg">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral" size="lg">
      Large
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Large tooltip
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <Tooltip.Root size="sm">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral" size="sm">
                        Small
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Small tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root size="md">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral" size="md">
                        Medium
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Medium tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root size="lg">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral" size="lg">
                        Large
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Large tooltip
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </Section>

              <Section
                title="Positions"
                titleLevel="h3"
                id="positions"
                code={`<Tooltip.Root>
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Top</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner side="top">
      <Tooltip.Popup>
        Top position
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root>
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Right</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner side="right">
      <Tooltip.Popup>
        Right position
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root>
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Bottom</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner side="bottom">
      <Tooltip.Popup>
        Bottom position
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root>
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">Left</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner side="left">
      <Tooltip.Popup>
        Left position
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Control the tooltip position using the <code className="font-mono text-sm">side</code> prop on Tooltip.Positioner.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Top
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner side="top">
                        <Tooltip.Popup>
                          Top position
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Right
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner side="right">
                        <Tooltip.Popup>
                          Right position
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Bottom
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner side="bottom">
                        <Tooltip.Popup>
                          Bottom position
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        Left
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner side="left">
                        <Tooltip.Popup>
                          Left position
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </Section>

              <Section
                title="With Arrow"
                titleLevel="h3"
                id="with-arrow"
                code={`<Tooltip.Root variant="solid" color="primary">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">With Arrow</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Tooltip with arrow
        <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>

<Tooltip.Root variant="solid" color="primary">
  <Tooltip.Trigger>
    <Button variant="outlined" color="neutral">No Arrow</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Positioner>
      <Tooltip.Popup>
        Tooltip without arrow
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</Tooltip.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  The arrow is optional. Omit the <code className="font-mono text-sm">Tooltip.Arrow</code> component to display a tooltip without an arrow.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Tooltip.Root variant="solid" color="primary">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        With Arrow
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Tooltip with arrow
                          <Tooltip.Arrow />
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root variant="solid" color="primary">
                    <Tooltip.Trigger>
                      <Button variant="outlined" color="neutral">
                        No Arrow
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner>
                        <Tooltip.Popup>
                          Tooltip without arrow
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </Section>

              <Section
                title="Custom Delay"
                titleLevel="h3"
                id="custom-delay"
                code={`<Tooltip.Provider delay={100}>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button variant="outlined" color="neutral">Fast (100ms)</Button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>
          Opens quickly
          <Tooltip.Arrow />
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>

<Tooltip.Provider delay={1000}>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button variant="outlined" color="neutral">Slow (1000ms)</Button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Positioner>
        <Tooltip.Popup>
          Opens slowly
          <Tooltip.Arrow />
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">Tooltip.Provider</code> to control the delay before tooltips appear.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Tooltip.Provider delay={100}>
                    <Tooltip.Root>
                      <Tooltip.Trigger>
                        <Button variant="outlined" color="neutral">
                          Fast (100ms)
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Positioner>
                          <Tooltip.Popup>
                            Opens quickly
                            <Tooltip.Arrow />
                          </Tooltip.Popup>
                        </Tooltip.Positioner>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>

                  <Tooltip.Provider delay={1000}>
                    <Tooltip.Root>
                      <Tooltip.Trigger>
                        <Button variant="outlined" color="neutral">
                          Slow (1000ms)
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Positioner>
                          <Tooltip.Popup>
                            Opens slowly
                            <Tooltip.Arrow />
                          </Tooltip.Popup>
                        </Tooltip.Positioner>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h3" className="mb-4" id="api-root">
                  Tooltip.Root
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The root component that provides variant, color, and size context to child components.
                </Typography>
                <PropsTable props={tooltipRootProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-provider">
                  Tooltip.Provider
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Optional provider for controlling delay behavior across multiple tooltips.
                </Typography>
                <PropsTable props={tooltipProviderProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-trigger">
                  Tooltip.Trigger
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The element that triggers the tooltip on hover or focus.
                </Typography>
                <PropsTable props={tooltipTriggerProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-positioner">
                  Tooltip.Positioner
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Controls the position and alignment of the tooltip relative to the trigger.
                </Typography>
                <PropsTable props={tooltipPositionerProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-popup">
                  Tooltip.Popup
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The tooltip content container with inherited styling from Tooltip.Root.
                </Typography>
                <PropsTable props={tooltipPopupProps} />
              </div>

              <div>
                <Typography level="h3" className="mb-4" id="api-arrow">
                  Tooltip.Arrow
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Optional arrow that points from the tooltip to the trigger element.
                </Typography>
                <PropsTable props={tooltipArrowProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
