import { Meter, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { ColorScale, Size } from '@base-joy/tokens';
import type { PropMeta } from '../../components/PropsTable';

const meterControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'solid' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  {
    name: 'value',
    type: 'select',
    options: ['0', '25', '50', '75', '100'],
    defaultValue: '50',
  },
];

const meterCodeTemplate = (props: Record<string, string>) => {
  return `<Meter.Root variant="${props.variant}" color="${props.color}" size="${props.size}" value={${props.value}}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'usage', title: 'Usage Examples', level: 3 },
  { id: 'api', title: 'API Reference' },
];

// Manual PropMeta arrays for compound component
const meterRootProps: PropMeta[] = [
  {
    name: 'variant',
    type: "'solid' | 'soft'",
    required: false,
    defaultValue: "'solid'",
    description: 'The visual style of the meter indicator.',
  },
  {
    name: 'color',
    type: 'ColorScale',
    required: false,
    defaultValue: "'primary'",
    description: 'The color scheme of the meter indicator.',
  },
  {
    name: 'size',
    type: 'Size',
    required: false,
    defaultValue: "'md'",
    description: 'The size of the meter bar.',
  },
  {
    name: 'value',
    type: 'number',
    required: true,
    description: 'The current meter value.',
  },
  {
    name: 'min',
    type: 'number',
    required: false,
    defaultValue: '0',
    description: 'The minimum meter value.',
  },
  {
    name: 'max',
    type: 'number',
    required: false,
    defaultValue: '100',
    description: 'The maximum meter value.',
  },
  {
    name: 'optimum',
    type: 'number',
    required: false,
    description: 'The optimum value for the meter (used for semantic meaning).',
  },
  {
    name: 'low',
    type: 'number',
    required: false,
    description: 'The low threshold value.',
  },
  {
    name: 'high',
    type: 'number',
    required: false,
    description: 'The high threshold value.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply to the root element.',
  },
];

const meterTrackProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply to the track element.',
  },
];

const meterIndicatorProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply to the indicator element.',
  },
];

export function MeterPage() {
  return (
    <div>
      <ComponentHeader
        title="Meter"
        description="A meter component that displays a value within a known range, ideal for showing metrics like disk usage, battery level, or ratings. Unlike Progress, Meter represents a static measurement rather than task completion."
        baseUiUrl="https://base-ui.com/react/components/meter"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={meterControls}
              codeTemplate={meterCodeTemplate}
            >
              {(props) => (
                <Meter.Root
                  variant={props.variant as 'solid' | 'soft'}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  value={Number(props.value)}
                >
                  <Meter.Track>
                    <Meter.Indicator />
                  </Meter.Track>
                </Meter.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Meter.Root variant="solid" color="primary" value={50}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
<Meter.Root variant="soft" color="primary" value={50}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Solid (50%)
                    </Typography>
                    <Meter.Root variant="solid" color="primary" value={50}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Soft (50%)
                    </Typography>
                    <Meter.Root variant="soft" color="primary" value={50}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Meter.Root variant="solid" color="primary" value={60}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
<Meter.Root variant="solid" color="neutral" value={60}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
<Meter.Root variant="solid" color="success" value={60}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
<Meter.Root variant="solid" color="warning" value={60}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
<Meter.Root variant="solid" color="danger" value={60}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Primary (60%)
                    </Typography>
                    <Meter.Root variant="solid" color="primary" value={60}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Neutral (60%)
                    </Typography>
                    <Meter.Root variant="solid" color="neutral" value={60}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Success (60%)
                    </Typography>
                    <Meter.Root variant="solid" color="success" value={60}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Warning (60%)
                    </Typography>
                    <Meter.Root variant="solid" color="warning" value={60}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Danger (60%)
                    </Typography>
                    <Meter.Root variant="solid" color="danger" value={60}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Meter.Root variant="solid" color="primary" size="sm" value={50}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
<Meter.Root variant="solid" color="primary" size="md" value={50}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
<Meter.Root variant="solid" color="primary" size="lg" value={50}>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Small (sm)
                    </Typography>
                    <Meter.Root variant="solid" color="primary" size="sm" value={50}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Medium (md)
                    </Typography>
                    <Meter.Root variant="solid" color="primary" size="md" value={50}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Large (lg)
                    </Typography>
                    <Meter.Root variant="solid" color="primary" size="lg" value={50}>
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Usage Examples"
                titleLevel="h3"
                id="usage"
                code={`{/* Disk Usage */}
<Meter.Root variant="solid" color="warning" value={85} aria-label="Disk usage">
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>

{/* Battery Level */}
<Meter.Root variant="solid" color="success" value={75} aria-label="Battery level">
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>

{/* Rating */}
<Meter.Root variant="soft" color="primary" value={4.5} min={0} max={5} aria-label="Rating">
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>

{/* Custom Range */}
<Meter.Root variant="solid" color="neutral" value={150} min={0} max={200} aria-label="Memory usage">
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Disk Usage (85%)
                    </Typography>
                    <Meter.Root variant="solid" color="warning" value={85} aria-label="Disk usage">
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Battery Level (75%)
                    </Typography>
                    <Meter.Root variant="solid" color="success" value={75} aria-label="Battery level">
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Rating (4.5 / 5)
                    </Typography>
                    <Meter.Root variant="soft" color="primary" value={4.5} min={0} max={5} aria-label="Rating">
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Memory Usage (150 / 200 MB)
                    </Typography>
                    <Meter.Root variant="solid" color="neutral" value={150} min={0} max={200} aria-label="Memory usage">
                      <Meter.Track>
                        <Meter.Indicator />
                      </Meter.Track>
                    </Meter.Root>
                  </div>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h4" className="mb-4">
                  Meter.Root
                </Typography>
                <PropsTable props={meterRootProps} />
              </div>
              <div>
                <Typography level="h4" className="mb-4">
                  Meter.Track
                </Typography>
                <PropsTable props={meterTrackProps} />
              </div>
              <div>
                <Typography level="h4" className="mb-4">
                  Meter.Indicator
                </Typography>
                <PropsTable props={meterIndicatorProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
