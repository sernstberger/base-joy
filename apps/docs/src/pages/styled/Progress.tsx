import { Progress, Typography } from '@base-joy/ui-styled';
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
import { useState, useEffect } from 'react';

const progressControls: PlaygroundControl[] = [
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

const progressCodeTemplate = (props: Record<string, string>) => {
  return `<Progress.Root variant="${props.variant}" color="${props.color}" size="${props.size}" value={${props.value}}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'indeterminate', title: 'Indeterminate', level: 3 },
  { id: 'api', title: 'API Reference' },
];

// Manual PropMeta arrays for compound component
const progressRootProps: PropMeta[] = [
  {
    name: 'variant',
    type: "'solid' | 'soft'",
    required: false,
    defaultValue: "'solid'",
    description: 'The visual style of the progress indicator.',
  },
  {
    name: 'color',
    type: 'ColorScale',
    required: false,
    defaultValue: "'primary'",
    description: 'The color scheme of the progress indicator.',
  },
  {
    name: 'size',
    type: 'Size',
    required: false,
    defaultValue: "'md'",
    description: 'The size of the progress bar.',
  },
  {
    name: 'value',
    type: 'number',
    required: false,
    defaultValue: 'null',
    description: 'The current progress value. When null, the progress is indeterminate.',
  },
  {
    name: 'max',
    type: 'number',
    required: false,
    defaultValue: '100',
    description: 'The maximum progress value.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply to the root element.',
  },
];

const progressTrackProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply to the track element.',
  },
];

const progressIndicatorProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply to the indicator element.',
  },
];

export function ProgressPage() {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate progress from 0 to 100 continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ComponentHeader
        title="Progress"
        description="A progress indicator component that shows completion status with customizable variants, colors, and sizes. Supports both determinate and indeterminate states."
        baseUiUrl="https://base-ui.com/react/components/progress"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={progressControls}
              codeTemplate={progressCodeTemplate}
            >
              {(props) => (
                <Progress.Root
                  variant={props.variant as 'solid' | 'soft'}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  value={Number(props.value)}
                >
                  <Progress.Track>
                    <Progress.Indicator />
                  </Progress.Track>
                </Progress.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Progress.Root variant="solid" color="primary" value={50}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
<Progress.Root variant="soft" color="primary" value={50}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Solid (50%)
                    </Typography>
                    <Progress.Root variant="solid" color="primary" value={50}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Soft (50%)
                    </Typography>
                    <Progress.Root variant="soft" color="primary" value={50}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Progress.Root variant="solid" color="primary" value={60}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
<Progress.Root variant="solid" color="neutral" value={60}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
<Progress.Root variant="solid" color="success" value={60}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
<Progress.Root variant="solid" color="warning" value={60}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
<Progress.Root variant="solid" color="danger" value={60}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Primary (60%)
                    </Typography>
                    <Progress.Root variant="solid" color="primary" value={60}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Neutral (60%)
                    </Typography>
                    <Progress.Root variant="solid" color="neutral" value={60}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Success (60%)
                    </Typography>
                    <Progress.Root variant="solid" color="success" value={60}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Warning (60%)
                    </Typography>
                    <Progress.Root variant="solid" color="warning" value={60}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Danger (60%)
                    </Typography>
                    <Progress.Root variant="solid" color="danger" value={60}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Progress.Root variant="solid" color="primary" size="sm" value={50}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
<Progress.Root variant="solid" color="primary" size="md" value={50}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
<Progress.Root variant="solid" color="primary" size="lg" value={50}>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Small (sm)
                    </Typography>
                    <Progress.Root variant="solid" color="primary" size="sm" value={50}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Medium (md)
                    </Typography>
                    <Progress.Root variant="solid" color="primary" size="md" value={50}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Large (lg)
                    </Typography>
                    <Progress.Root variant="solid" color="primary" size="lg" value={50}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Indeterminate"
                titleLevel="h3"
                id="indeterminate"
                code={`<Progress.Root variant="solid" color="primary">
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  When <code className="font-mono text-sm">value</code> is not provided, the progress bar is indeterminate. Animated progress example:
                </Typography>
                <div className="space-y-4">
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Animated Progress ({animatedValue}%)
                    </Typography>
                    <Progress.Root variant="solid" color="success" value={animatedValue}>
                      <Progress.Track>
                        <Progress.Indicator />
                      </Progress.Track>
                    </Progress.Root>
                  </div>
                  <div>
                    <Typography level="body-xs" className="mb-2 text-neutral-600">
                      Different states
                    </Typography>
                    <div className="space-y-3">
                      <div>
                        <Typography level="body-xs" className="mb-1 text-neutral-500">
                          0%
                        </Typography>
                        <Progress.Root variant="solid" color="neutral" value={0}>
                          <Progress.Track>
                            <Progress.Indicator />
                          </Progress.Track>
                        </Progress.Root>
                      </div>
                      <div>
                        <Typography level="body-xs" className="mb-1 text-neutral-500">
                          50%
                        </Typography>
                        <Progress.Root variant="solid" color="primary" value={50}>
                          <Progress.Track>
                            <Progress.Indicator />
                          </Progress.Track>
                        </Progress.Root>
                      </div>
                      <div>
                        <Typography level="body-xs" className="mb-1 text-neutral-500">
                          100%
                        </Typography>
                        <Progress.Root variant="solid" color="success" value={100}>
                          <Progress.Track>
                            <Progress.Indicator />
                          </Progress.Track>
                        </Progress.Root>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h4" className="mb-4">
                  Progress.Root
                </Typography>
                <PropsTable props={progressRootProps} />
              </div>
              <div>
                <Typography level="h4" className="mb-4">
                  Progress.Track
                </Typography>
                <PropsTable props={progressTrackProps} />
              </div>
              <div>
                <Typography level="h4" className="mb-4">
                  Progress.Indicator
                </Typography>
                <PropsTable props={progressIndicatorProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
