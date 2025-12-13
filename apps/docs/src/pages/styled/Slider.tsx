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

  return `<Slider color="${props.color}" size="${props.size}"${booleanPropsStr} defaultValue={60} />`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'range-slider', title: 'Range Slider', level: 3 },
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
                  <Slider
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    disabled={props.disabled === 'true'}
                    defaultValue={60}
                    aria-label="Slider"
                  />
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
                code={`<Slider color="primary" defaultValue={60} aria-label="Primary slider" />
<Slider color="success" defaultValue={60} aria-label="Success slider" />
<Slider color="warning" defaultValue={60} aria-label="Warning slider" />
<Slider color="danger" defaultValue={60} aria-label="Danger slider" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-6 max-w-md">
                  <Slider color="primary" defaultValue={60} aria-label="Primary slider" />
                  <Slider color="success" defaultValue={60} aria-label="Success slider" />
                  <Slider color="warning" defaultValue={60} aria-label="Warning slider" />
                  <Slider color="danger" defaultValue={60} aria-label="Danger slider" />
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Slider size="sm" defaultValue={30} aria-label="Small slider" />
<Slider size="md" defaultValue={50} aria-label="Medium slider" />
<Slider size="lg" defaultValue={70} aria-label="Large slider" />`}
                codeLanguage="tsx"
              >
                <div className="space-y-8 max-w-md">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Small
                    </Typography>
                    <Slider size="sm" defaultValue={30} aria-label="Small slider" />
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Medium
                    </Typography>
                    <Slider size="md" defaultValue={50} aria-label="Medium slider" />
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Large
                    </Typography>
                    <Slider size="lg" defaultValue={70} aria-label="Large slider" />
                  </div>
                </div>
              </Section>

              <Section
                title="Range Slider"
                titleLevel="h3"
                id="range-slider"
                code={`<Slider defaultValue={[25, 75]} aria-label="Price range" />`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use an array value for range selection. The component automatically renders the correct number of thumbs.
                </Typography>
                <div className="max-w-md">
                  <Slider defaultValue={[25, 75]} aria-label="Price range" />
                </div>
              </Section>

              <Section
                title="Custom Range"
                titleLevel="h3"
                id="custom-range"
                code={`<Slider min={0} max={1000} step={50} defaultValue={500} aria-label="Budget" />`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Customize the range with <code className="font-mono text-sm">min</code>,{' '}
                  <code className="font-mono text-sm">max</code>, and{' '}
                  <code className="font-mono text-sm">step</code> props.
                </Typography>
                <div className="max-w-md">
                  <Slider min={0} max={1000} step={50} defaultValue={500} aria-label="Budget" />
                </div>
              </Section>

              <Section
                title="Disabled"
                titleLevel="h3"
                id="disabled"
                code={`<Slider disabled defaultValue={50} aria-label="Volume" />`}
                codeLanguage="tsx"
              >
                <div className="max-w-md">
                  <Slider disabled defaultValue={50} aria-label="Volume" />
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
