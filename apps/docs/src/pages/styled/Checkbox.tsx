import { Checkbox, CheckboxGroup, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const checkboxControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'checked', type: 'boolean', defaultValue: true },
];

const checkboxCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  if (props.checked === 'true' || props.checked === true) booleanProps.push('defaultChecked');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Checkbox.Root variant="${props.variant}" color="${props.color}" size="${props.size}"${booleanPropsStr}>
  <Checkbox.Indicator />
</Checkbox.Root>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'states', title: 'States', level: 3 },
  { id: 'checkbox-group', title: 'Checkbox Group', level: 3 },
  { id: 'horizontal-group', title: 'Horizontal Group', level: 3 },
  { id: 'api', title: 'API Reference' },
  { id: 'api-group', title: 'CheckboxGroup API', level: 3 },
];

export function CheckboxPage() {
  return (
    <div>
      <ComponentHeader
        title="Checkbox"
        description="A checkbox component for binary selections with visual indicator."
        baseUiUrl="https://base-ui.com/react/components/checkbox"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={checkboxControls}
              codeTemplate={checkboxCodeTemplate}
            >
              {(props) => {
                const disabled = props.disabled === 'true';
                const checked = props.checked === 'true';

                return (
                  <Checkbox.Root
                    variant={props.variant as Variant}
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    disabled={disabled}
                    defaultChecked={checked}
                  >
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                );
              }}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Checkbox.Root variant="solid" color="primary" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root variant="soft" color="primary" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root variant="outlined" color="primary" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root variant="plain" color="primary" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root variant="solid" color="primary" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Solid</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root variant="soft" color="primary" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Soft</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root variant="outlined" color="primary" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Outlined</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root variant="plain" color="primary" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Plain</Typography>
                  </label>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Checkbox.Root color="primary" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root color="neutral" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root color="success" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root color="warning" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root color="danger" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root color="primary" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Primary</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root color="neutral" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Neutral</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root color="success" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Success</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root color="warning" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Warning</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root color="danger" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Danger</Typography>
                  </label>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Checkbox.Root size="sm" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root size="md" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root size="lg" defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root size="sm" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-sm">Small</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root size="md" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Medium</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root size="lg" defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-lg">Large</Typography>
                  </label>
                </div>
              </Section>

              <Section
                title="States"
                titleLevel="h3"
                id="states"
                code={`<Checkbox.Root>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root disabled>
  <Checkbox.Indicator />
</Checkbox.Root>
<Checkbox.Root disabled defaultChecked>
  <Checkbox.Indicator />
</Checkbox.Root>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Unchecked</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Checked</Typography>
                  </label>
                  <label className="flex items-center gap-2 opacity-50">
                    <Checkbox.Root disabled>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Disabled</Typography>
                  </label>
                  <label className="flex items-center gap-2 opacity-50">
                    <Checkbox.Root disabled defaultChecked>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Disabled checked</Typography>
                  </label>
                </div>
              </Section>

              <Section
                title="Checkbox Group"
                titleLevel="h3"
                id="checkbox-group"
                code={`<CheckboxGroup defaultValue={['newsletter']}>
  <div className="space-y-3">
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox.Root value="newsletter">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <Typography level="body-md">Subscribe to newsletter</Typography>
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox.Root value="updates">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <Typography level="body-md">Receive product updates</Typography>
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox.Root value="marketing">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <Typography level="body-md">Marketing communications</Typography>
    </label>
  </div>
</CheckboxGroup>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use CheckboxGroup to manage multiple related checkboxes with shared state.
                </Typography>
                <CheckboxGroup defaultValue={['newsletter']}>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox.Root value="newsletter">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <Typography level="body-md">Subscribe to newsletter</Typography>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox.Root value="updates">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <Typography level="body-md">Receive product updates</Typography>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox.Root value="marketing">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <Typography level="body-md">Marketing communications</Typography>
                    </label>
                  </div>
                </CheckboxGroup>
              </Section>

              <Section
                title="Horizontal Group"
                titleLevel="h3"
                id="horizontal-group"
                code={`<CheckboxGroup orientation="horizontal">
  <label className="flex items-center gap-2 cursor-pointer">
    <Checkbox.Root value="a">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <Typography level="body-md">Option A</Typography>
  </label>
  <label className="flex items-center gap-2 cursor-pointer">
    <Checkbox.Root value="b">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <Typography level="body-md">Option B</Typography>
  </label>
  <label className="flex items-center gap-2 cursor-pointer">
    <Checkbox.Root value="c">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <Typography level="body-md">Option C</Typography>
  </label>
</CheckboxGroup>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Set <code className="font-mono text-sm">orientation="horizontal"</code> to display checkboxes in a row.
                </Typography>
                <CheckboxGroup orientation="horizontal">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root value="a">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Option A</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root value="b">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Option B</Typography>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root value="c">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <Typography level="body-md">Option C</Typography>
                  </label>
                </CheckboxGroup>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Checkbox} />
            <Section
              title="CheckboxGroup API"
              titleLevel="h3"
              id="api-group"
            >
              <PropsTable props={componentProps.CheckboxGroup} />
            </Section>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
