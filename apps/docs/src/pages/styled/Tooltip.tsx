import { Tooltip, TooltipProvider, Button, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { ColorScale, Size } from '@base-joy/tokens';

const tooltipControls: PlaygroundControl[] = [
  { name: 'variant', type: 'select', defaultValue: 'solid', options: ['solid', 'soft'] },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'sm' },
  { name: 'showArrow', type: 'boolean', defaultValue: true },
];

const tooltipCodeTemplate = (props: Record<string, string>) =>
  `<Tooltip
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"
  showArrow={${props.showArrow}}
  content="Tooltip content"
>
  <Button variant="outlined" color="neutral">
    Hover me
  </Button>
</Tooltip>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors-solid', title: 'Colors (Solid)', level: 3 },
  { id: 'colors-soft', title: 'Colors (Soft)', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'positions', title: 'Positions', level: 3 },
  { id: 'with-arrow', title: 'With/Without Arrow', level: 3 },
  { id: 'custom-delay', title: 'Custom Delay', level: 3 },
  { id: 'api', title: 'API Reference' },
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
                <Tooltip
                  variant={props.variant as 'solid' | 'soft'}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  showArrow={props.showArrow === 'true'}
                  content="Tooltip content"
                >
                  <Button variant="outlined" color="neutral">
                    Hover me
                  </Button>
                </Tooltip>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Tooltip variant="solid" color="neutral" content="Solid variant tooltip">
  <Button variant="outlined" color="neutral">Solid</Button>
</Tooltip>

<Tooltip variant="soft" color="neutral" content="Soft variant tooltip">
  <Button variant="outlined" color="neutral">Soft</Button>
</Tooltip>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Tooltip variant="solid" color="neutral" content="Solid variant tooltip">
                    <Button variant="outlined" color="neutral">
                      Solid
                    </Button>
                  </Tooltip>

                  <Tooltip variant="soft" color="neutral" content="Soft variant tooltip">
                    <Button variant="outlined" color="neutral">
                      Soft
                    </Button>
                  </Tooltip>
                </div>
              </Section>

              <Section
                title="Colors (Solid variant)"
                titleLevel="h3"
                id="colors-solid"
                code={`<Tooltip variant="solid" color="primary" content="Primary tooltip">
  <Button variant="outlined" color="neutral">Primary</Button>
</Tooltip>

<Tooltip variant="solid" color="neutral" content="Neutral tooltip">
  <Button variant="outlined" color="neutral">Neutral</Button>
</Tooltip>

<Tooltip variant="solid" color="success" content="Success tooltip">
  <Button variant="outlined" color="neutral">Success</Button>
</Tooltip>

<Tooltip variant="solid" color="warning" content="Warning tooltip">
  <Button variant="outlined" color="neutral">Warning</Button>
</Tooltip>

<Tooltip variant="solid" color="danger" content="Danger tooltip">
  <Button variant="outlined" color="neutral">Danger</Button>
</Tooltip>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Tooltip variant="solid" color="primary" content="Primary tooltip">
                    <Button variant="outlined" color="neutral">
                      Primary
                    </Button>
                  </Tooltip>

                  <Tooltip variant="solid" color="neutral" content="Neutral tooltip">
                    <Button variant="outlined" color="neutral">
                      Neutral
                    </Button>
                  </Tooltip>

                  <Tooltip variant="solid" color="success" content="Success tooltip">
                    <Button variant="outlined" color="neutral">
                      Success
                    </Button>
                  </Tooltip>

                  <Tooltip variant="solid" color="warning" content="Warning tooltip">
                    <Button variant="outlined" color="neutral">
                      Warning
                    </Button>
                  </Tooltip>

                  <Tooltip variant="solid" color="danger" content="Danger tooltip">
                    <Button variant="outlined" color="neutral">
                      Danger
                    </Button>
                  </Tooltip>
                </div>
              </Section>

              <Section
                title="Colors (Soft variant)"
                titleLevel="h3"
                id="colors-soft"
                code={`<Tooltip variant="soft" color="primary" content="Primary tooltip">
  <Button variant="outlined" color="neutral">Primary</Button>
</Tooltip>

<Tooltip variant="soft" color="neutral" content="Neutral tooltip">
  <Button variant="outlined" color="neutral">Neutral</Button>
</Tooltip>

<Tooltip variant="soft" color="success" content="Success tooltip">
  <Button variant="outlined" color="neutral">Success</Button>
</Tooltip>

<Tooltip variant="soft" color="warning" content="Warning tooltip">
  <Button variant="outlined" color="neutral">Warning</Button>
</Tooltip>

<Tooltip variant="soft" color="danger" content="Danger tooltip">
  <Button variant="outlined" color="neutral">Danger</Button>
</Tooltip>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Tooltip variant="soft" color="primary" content="Primary tooltip">
                    <Button variant="outlined" color="neutral">
                      Primary
                    </Button>
                  </Tooltip>

                  <Tooltip variant="soft" color="neutral" content="Neutral tooltip">
                    <Button variant="outlined" color="neutral">
                      Neutral
                    </Button>
                  </Tooltip>

                  <Tooltip variant="soft" color="success" content="Success tooltip">
                    <Button variant="outlined" color="neutral">
                      Success
                    </Button>
                  </Tooltip>

                  <Tooltip variant="soft" color="warning" content="Warning tooltip">
                    <Button variant="outlined" color="neutral">
                      Warning
                    </Button>
                  </Tooltip>

                  <Tooltip variant="soft" color="danger" content="Danger tooltip">
                    <Button variant="outlined" color="neutral">
                      Danger
                    </Button>
                  </Tooltip>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Tooltip size="sm" content="Small tooltip">
  <Button variant="outlined" color="neutral" size="sm">
    Small
  </Button>
</Tooltip>

<Tooltip size="md" content="Medium tooltip">
  <Button variant="outlined" color="neutral" size="md">
    Medium
  </Button>
</Tooltip>

<Tooltip size="lg" content="Large tooltip">
  <Button variant="outlined" color="neutral" size="lg">
    Large
  </Button>
</Tooltip>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <Tooltip size="sm" content="Small tooltip">
                    <Button variant="outlined" color="neutral" size="sm">
                      Small
                    </Button>
                  </Tooltip>

                  <Tooltip size="md" content="Medium tooltip">
                    <Button variant="outlined" color="neutral" size="md">
                      Medium
                    </Button>
                  </Tooltip>

                  <Tooltip size="lg" content="Large tooltip">
                    <Button variant="outlined" color="neutral" size="lg">
                      Large
                    </Button>
                  </Tooltip>
                </div>
              </Section>

              <Section
                title="Positions"
                titleLevel="h3"
                id="positions"
                code={`<Tooltip content="Top position" side="top">
  <Button variant="outlined" color="neutral">Top</Button>
</Tooltip>

<Tooltip content="Right position" side="right">
  <Button variant="outlined" color="neutral">Right</Button>
</Tooltip>

<Tooltip content="Bottom position" side="bottom">
  <Button variant="outlined" color="neutral">Bottom</Button>
</Tooltip>

<Tooltip content="Left position" side="left">
  <Button variant="outlined" color="neutral">Left</Button>
</Tooltip>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Control the tooltip position using the <code className="font-mono text-sm">side</code> prop.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Tooltip content="Top position" side="top">
                    <Button variant="outlined" color="neutral">
                      Top
                    </Button>
                  </Tooltip>

                  <Tooltip content="Right position" side="right">
                    <Button variant="outlined" color="neutral">
                      Right
                    </Button>
                  </Tooltip>

                  <Tooltip content="Bottom position" side="bottom">
                    <Button variant="outlined" color="neutral">
                      Bottom
                    </Button>
                  </Tooltip>

                  <Tooltip content="Left position" side="left">
                    <Button variant="outlined" color="neutral">
                      Left
                    </Button>
                  </Tooltip>
                </div>
              </Section>

              <Section
                title="With/Without Arrow"
                titleLevel="h3"
                id="with-arrow"
                code={`<Tooltip variant="solid" color="primary" content="Tooltip with arrow">
  <Button variant="outlined" color="neutral">
    With Arrow
  </Button>
</Tooltip>

<Tooltip variant="solid" color="primary" content="Tooltip without arrow" showArrow={false}>
  <Button variant="outlined" color="neutral">
    No Arrow
  </Button>
</Tooltip>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  The arrow is shown by default. Set <code className="font-mono text-sm">showArrow={`{false}`}</code> to hide it.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Tooltip variant="solid" color="primary" content="Tooltip with arrow">
                    <Button variant="outlined" color="neutral">
                      With Arrow
                    </Button>
                  </Tooltip>

                  <Tooltip variant="solid" color="primary" content="Tooltip without arrow" showArrow={false}>
                    <Button variant="outlined" color="neutral">
                      No Arrow
                    </Button>
                  </Tooltip>
                </div>
              </Section>

              <Section
                title="Custom Delay"
                titleLevel="h3"
                id="custom-delay"
                code={`<TooltipProvider delay={100}>
  <Tooltip content="Opens quickly">
    <Button variant="outlined" color="neutral">Fast (100ms)</Button>
  </Tooltip>
</TooltipProvider>

<TooltipProvider delay={1000}>
  <Tooltip content="Opens slowly">
    <Button variant="outlined" color="neutral">Slow (1000ms)</Button>
  </Tooltip>
</TooltipProvider>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">TooltipProvider</code> to control the delay before tooltips appear.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <TooltipProvider delay={100}>
                    <Tooltip content="Opens quickly">
                      <Button variant="outlined" color="neutral">
                        Fast (100ms)
                      </Button>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider delay={1000}>
                    <Tooltip content="Opens slowly">
                      <Button variant="outlined" color="neutral">
                        Slow (1000ms)
                      </Button>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Tooltip} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
