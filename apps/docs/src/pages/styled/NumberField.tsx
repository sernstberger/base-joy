import { NumberField, Typography } from '@base-joy/ui-styled';
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

const numberFieldControls: PlaygroundControl[] = [
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const numberFieldCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<NumberField.Root color="${props.color}" size="${props.size}"${booleanPropsStr} defaultValue={5}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'disabled', title: 'Disabled State', level: 3 },
  { id: 'with-label', title: 'With Label', level: 3 },
  { id: 'step-values', title: 'Step Values', level: 3 },
  { id: 'min-max', title: 'Min/Max Values', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function NumberFieldPage() {
  return (
    <div>
      <ComponentHeader
        title="NumberField"
        description="A number input with increment/decrement buttons for precise numeric entry. Built on Base UI NumberField with Joy UI styling."
        baseUiUrl="https://base-ui.com/react/components/number-field"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={numberFieldControls}
              codeTemplate={numberFieldCodeTemplate}
            >
              {(props) => (
                <NumberField.Root
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  disabled={props.disabled === 'true'}
                  defaultValue={5}
                >
                  <NumberField.Group>
                    <NumberField.Decrement />
                    <NumberField.Input />
                    <NumberField.Increment />
                  </NumberField.Group>
                </NumberField.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<NumberField.Root color="primary" defaultValue={10}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>

<NumberField.Root color="neutral" defaultValue={10}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>

<NumberField.Root color="success" defaultValue={10}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>

<NumberField.Root color="warning" defaultValue={10}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>

<NumberField.Root color="danger" defaultValue={10}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <NumberField.Root color="primary" defaultValue={10}>
                    <NumberField.Group>
                      <NumberField.Decrement />
                      <NumberField.Input />
                      <NumberField.Increment />
                    </NumberField.Group>
                  </NumberField.Root>

                  <NumberField.Root color="neutral" defaultValue={10}>
                    <NumberField.Group>
                      <NumberField.Decrement />
                      <NumberField.Input />
                      <NumberField.Increment />
                    </NumberField.Group>
                  </NumberField.Root>

                  <NumberField.Root color="success" defaultValue={10}>
                    <NumberField.Group>
                      <NumberField.Decrement />
                      <NumberField.Input />
                      <NumberField.Increment />
                    </NumberField.Group>
                  </NumberField.Root>

                  <NumberField.Root color="warning" defaultValue={10}>
                    <NumberField.Group>
                      <NumberField.Decrement />
                      <NumberField.Input />
                      <NumberField.Increment />
                    </NumberField.Group>
                  </NumberField.Root>

                  <NumberField.Root color="danger" defaultValue={10}>
                    <NumberField.Group>
                      <NumberField.Decrement />
                      <NumberField.Input />
                      <NumberField.Increment />
                    </NumberField.Group>
                  </NumberField.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<NumberField.Root size="sm" defaultValue={10}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>

<NumberField.Root size="md" defaultValue={10}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>

<NumberField.Root size="lg" defaultValue={10}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <NumberField.Root size="sm" defaultValue={10}>
                    <NumberField.Group>
                      <NumberField.Decrement />
                      <NumberField.Input />
                      <NumberField.Increment />
                    </NumberField.Group>
                  </NumberField.Root>

                  <NumberField.Root size="md" defaultValue={10}>
                    <NumberField.Group>
                      <NumberField.Decrement />
                      <NumberField.Input />
                      <NumberField.Increment />
                    </NumberField.Group>
                  </NumberField.Root>

                  <NumberField.Root size="lg" defaultValue={10}>
                    <NumberField.Group>
                      <NumberField.Decrement />
                      <NumberField.Input />
                      <NumberField.Increment />
                    </NumberField.Group>
                  </NumberField.Root>
                </div>
              </Section>

              <Section
                title="Disabled State"
                titleLevel="h3"
                id="disabled"
                code={`<NumberField.Root disabled defaultValue={5}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`}
                codeLanguage="tsx"
              >
                <NumberField.Root disabled defaultValue={5}>
                  <NumberField.Group>
                    <NumberField.Decrement />
                    <NumberField.Input />
                    <NumberField.Increment />
                  </NumberField.Group>
                </NumberField.Root>
              </Section>

              <Section
                title="With Label"
                titleLevel="h3"
                id="with-label"
                code={`<div className="space-y-2">
  <Typography level="body-sm" weight="medium">
    Quantity
  </Typography>
  <NumberField.Root min={1} max={99} defaultValue={1}>
    <NumberField.Group>
      <NumberField.Decrement />
      <NumberField.Input />
      <NumberField.Increment />
    </NumberField.Group>
  </NumberField.Root>
</div>`}
                codeLanguage="tsx"
              >
                <div className="space-y-2">
                  <Typography level="body-sm" weight="medium">
                    Quantity
                  </Typography>
                  <NumberField.Root min={1} max={99} defaultValue={1}>
                    <NumberField.Group>
                      <NumberField.Decrement />
                      <NumberField.Input />
                      <NumberField.Increment />
                    </NumberField.Group>
                  </NumberField.Root>
                </div>
              </Section>

              <Section
                title="Step Values"
                titleLevel="h3"
                id="step-values"
                code={`<div className="space-y-4">
  <div>
    <Typography level="body-sm" className="mb-2">
      Step: 1 (default)
    </Typography>
    <NumberField.Root step={1} defaultValue={5}>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField.Root>
  </div>

  <div>
    <Typography level="body-sm" className="mb-2">
      Step: 5
    </Typography>
    <NumberField.Root step={5} defaultValue={25}>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField.Root>
  </div>

  <div>
    <Typography level="body-sm" className="mb-2">
      Step: 0.1 (decimals)
    </Typography>
    <NumberField.Root step={0.1} defaultValue={1.5}>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField.Root>
  </div>
</div>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Step: 1 (default)
                    </Typography>
                    <NumberField.Root step={1} defaultValue={5}>
                      <NumberField.Group>
                        <NumberField.Decrement />
                        <NumberField.Input />
                        <NumberField.Increment />
                      </NumberField.Group>
                    </NumberField.Root>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Step: 5
                    </Typography>
                    <NumberField.Root step={5} defaultValue={25}>
                      <NumberField.Group>
                        <NumberField.Decrement />
                        <NumberField.Input />
                        <NumberField.Increment />
                      </NumberField.Group>
                    </NumberField.Root>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Step: 0.1 (decimals)
                    </Typography>
                    <NumberField.Root step={0.1} defaultValue={1.5}>
                      <NumberField.Group>
                        <NumberField.Decrement />
                        <NumberField.Input />
                        <NumberField.Increment />
                      </NumberField.Group>
                    </NumberField.Root>
                  </div>
                </div>
              </Section>

              <Section
                title="Min/Max Values"
                titleLevel="h3"
                id="min-max"
                code={`<div className="space-y-4">
  <div>
    <Typography level="body-sm" className="mb-2">
      Min: 0, Max: 10
    </Typography>
    <NumberField.Root min={0} max={10} defaultValue={5}>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField.Root>
  </div>

  <div>
    <Typography level="body-sm" className="mb-2">
      Min: -5, Max: 5 (negative values)
    </Typography>
    <NumberField.Root min={-5} max={5} defaultValue={0}>
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField.Root>
  </div>
</div>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Min: 0, Max: 10
                    </Typography>
                    <NumberField.Root min={0} max={10} defaultValue={5}>
                      <NumberField.Group>
                        <NumberField.Decrement />
                        <NumberField.Input />
                        <NumberField.Increment />
                      </NumberField.Group>
                    </NumberField.Root>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Min: -5, Max: 5 (negative values)
                    </Typography>
                    <NumberField.Root min={-5} max={5} defaultValue={0}>
                      <NumberField.Group>
                        <NumberField.Decrement />
                        <NumberField.Input />
                        <NumberField.Increment />
                      </NumberField.Group>
                    </NumberField.Root>
                  </div>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.NumberField} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
