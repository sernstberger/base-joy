import { Slider, Typography } from '@base-joy/ui-styled';
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

const controls: PlaygroundControl[] = [
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const codeTemplate = (props: Record<string, string>) => {
  const booleanProps = [];
  if (props.disabled === 'true') booleanProps.push('disabled');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Slider.Root color="${props.color}" size="${props.size}"${booleanPropsStr} defaultValue={60}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'range-slider', title: 'Range Slider', level: 3 },
  { id: 'with-value-display', title: 'With Value Display', level: 3 },
  { id: 'custom-range', title: 'Custom Range', level: 3 },
  { id: 'disabled', title: 'Disabled', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function SliderPage() {
  return (
    <div>
      <ComponentHeader
        title="Slider"
        description="A slider component for selecting a value from a range with customizable colors and sizes."
        baseUiUrl="https://base-ui.com/react/components/slider"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={controls} codeTemplate={codeTemplate}>
              {(props) => (
                <div className="max-w-md">
                  <Slider.Root
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    disabled={props.disabled === 'true'}
                    defaultValue={60}
                  >
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Indicator />
                      </Slider.Track>
                      <Slider.Thumb />
                    </Slider.Control>
                  </Slider.Root>
                </div>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Slider.Root color="primary" defaultValue={60}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

<Slider.Root color="success" defaultValue={60}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

<Slider.Root color="warning" defaultValue={60}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

<Slider.Root color="danger" defaultValue={60}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-6 max-w-md">
                  <Slider.Root color="primary" defaultValue={60}>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Indicator />
                      </Slider.Track>
                      <Slider.Thumb />
                    </Slider.Control>
                  </Slider.Root>

                  <Slider.Root color="success" defaultValue={60}>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Indicator />
                      </Slider.Track>
                      <Slider.Thumb />
                    </Slider.Control>
                  </Slider.Root>

                  <Slider.Root color="warning" defaultValue={60}>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Indicator />
                      </Slider.Track>
                      <Slider.Thumb />
                    </Slider.Control>
                  </Slider.Root>

                  <Slider.Root color="danger" defaultValue={60}>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Indicator />
                      </Slider.Track>
                      <Slider.Thumb />
                    </Slider.Control>
                  </Slider.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Slider.Root size="sm" defaultValue={30}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

<Slider.Root size="md" defaultValue={50}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>

<Slider.Root size="lg" defaultValue={70}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-8 max-w-md">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Small
                    </Typography>
                    <Slider.Root size="sm" defaultValue={30}>
                      <Slider.Control>
                        <Slider.Track>
                          <Slider.Indicator />
                        </Slider.Track>
                        <Slider.Thumb />
                      </Slider.Control>
                    </Slider.Root>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Medium
                    </Typography>
                    <Slider.Root size="md" defaultValue={50}>
                      <Slider.Control>
                        <Slider.Track>
                          <Slider.Indicator />
                        </Slider.Track>
                        <Slider.Thumb />
                      </Slider.Control>
                    </Slider.Root>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Large
                    </Typography>
                    <Slider.Root size="lg" defaultValue={70}>
                      <Slider.Control>
                        <Slider.Track>
                          <Slider.Indicator />
                        </Slider.Track>
                        <Slider.Thumb />
                      </Slider.Control>
                    </Slider.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Range Slider"
                titleLevel="h3"
                id="range-slider"
                code={`<Slider.Root defaultValue={[25, 75]}>
  <div className="flex justify-between mb-2">
    <Typography level="body-sm">Price Range</Typography>
    <Slider.Value />
  </div>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use an array value with multiple Thumb components for range selection.
                </Typography>
                <div className="max-w-md">
                  <Slider.Root defaultValue={[25, 75]}>
                    <div className="flex justify-between mb-2">
                      <Typography level="body-sm">Price Range</Typography>
                      <Slider.Value />
                    </div>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Indicator />
                      </Slider.Track>
                      <Slider.Thumb />
                      <Slider.Thumb />
                    </Slider.Control>
                  </Slider.Root>
                </div>
              </Section>

              <Section
                title="With Value Display"
                titleLevel="h3"
                id="with-value-display"
                code={`<Slider.Root defaultValue={75}>
  <div className="flex justify-between mb-2">
    <Typography level="body-sm">Volume</Typography>
    <Slider.Value />
  </div>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  The Value component displays the current slider value.
                </Typography>
                <div className="max-w-md">
                  <Slider.Root defaultValue={75}>
                    <div className="flex justify-between mb-2">
                      <Typography level="body-sm">Volume</Typography>
                      <Slider.Value />
                    </div>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Indicator />
                      </Slider.Track>
                      <Slider.Thumb />
                    </Slider.Control>
                  </Slider.Root>
                </div>
              </Section>

              <Section
                title="Custom Range"
                titleLevel="h3"
                id="custom-range"
                code={`<Slider.Root min={0} max={1000} step={50} defaultValue={500}>
  <div className="flex justify-between mb-2">
    <Typography level="body-sm">Budget</Typography>
    <Slider.Value />
  </div>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Customize the range with <code className="font-mono text-sm">min</code>,{' '}
                  <code className="font-mono text-sm">max</code>, and{' '}
                  <code className="font-mono text-sm">step</code> props.
                </Typography>
                <div className="max-w-md">
                  <Slider.Root min={0} max={1000} step={50} defaultValue={500}>
                    <div className="flex justify-between mb-2">
                      <Typography level="body-sm">Budget</Typography>
                      <Slider.Value />
                    </div>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Indicator />
                      </Slider.Track>
                      <Slider.Thumb />
                    </Slider.Control>
                  </Slider.Root>
                </div>
              </Section>

              <Section
                title="Disabled"
                titleLevel="h3"
                id="disabled"
                code={`<Slider.Root disabled defaultValue={50}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
    </Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>`}
                codeLanguage="tsx"
              >
                <div className="max-w-md">
                  <Slider.Root disabled defaultValue={50}>
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Indicator />
                      </Slider.Track>
                      <Slider.Thumb />
                    </Slider.Control>
                  </Slider.Root>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Slider} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
