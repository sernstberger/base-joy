import { Toggle, Typography } from '@base-joy/ui-styled';
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

const toggleControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'pressed', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const toggleCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.pressed === 'true' || props.pressed === true) booleanProps.push('pressed');
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Toggle variant="${props.variant}" color="${props.color}" size="${props.size}"${booleanPropsStr} aria-label="Toggle">
  Toggle
</Toggle>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'pressed-state', title: 'Pressed State', level: 3 },
  { id: 'disabled', title: 'Disabled', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function TogglePage() {
  return (
    <div>
      <ComponentHeader
        title="Toggle"
        description="A pressable button that can be toggled on and off."
        baseUiUrl="https://base-ui.com/react/components/toggle"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={toggleControls}
              codeTemplate={toggleCodeTemplate}
            >
              {(props) => (
                <Toggle
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  pressed={props.pressed === 'true'}
                  disabled={props.disabled === 'true'}
                  aria-label="Toggle"
                >
                  Toggle
                </Toggle>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Toggle variant="solid" aria-label="Solid toggle">
  Solid
</Toggle>
<Toggle variant="soft" aria-label="Soft toggle">
  Soft
</Toggle>
<Toggle variant="outlined" aria-label="Outlined toggle">
  Outlined
</Toggle>
<Toggle variant="plain" aria-label="Plain toggle">
  Plain
</Toggle>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Toggle variant="solid" aria-label="Solid toggle">
                    Solid
                  </Toggle>
                  <Toggle variant="soft" aria-label="Soft toggle">
                    Soft
                  </Toggle>
                  <Toggle variant="outlined" aria-label="Outlined toggle">
                    Outlined
                  </Toggle>
                  <Toggle variant="plain" aria-label="Plain toggle">
                    Plain
                  </Toggle>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Toggle color="primary" aria-label="Primary toggle">
  Primary
</Toggle>
<Toggle color="neutral" aria-label="Neutral toggle">
  Neutral
</Toggle>
<Toggle color="success" aria-label="Success toggle">
  Success
</Toggle>
<Toggle color="warning" aria-label="Warning toggle">
  Warning
</Toggle>
<Toggle color="danger" aria-label="Danger toggle">
  Danger
</Toggle>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Toggle color="primary" aria-label="Primary toggle">
                    Primary
                  </Toggle>
                  <Toggle color="neutral" aria-label="Neutral toggle">
                    Neutral
                  </Toggle>
                  <Toggle color="success" aria-label="Success toggle">
                    Success
                  </Toggle>
                  <Toggle color="warning" aria-label="Warning toggle">
                    Warning
                  </Toggle>
                  <Toggle color="danger" aria-label="Danger toggle">
                    Danger
                  </Toggle>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Toggle size="sm" aria-label="Small toggle">
  Small
</Toggle>
<Toggle size="md" aria-label="Medium toggle">
  Medium
</Toggle>
<Toggle size="lg" aria-label="Large toggle">
  Large
</Toggle>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <Toggle size="sm" aria-label="Small toggle">
                    Small
                  </Toggle>
                  <Toggle size="md" aria-label="Medium toggle">
                    Medium
                  </Toggle>
                  <Toggle size="lg" aria-label="Large toggle">
                    Large
                  </Toggle>
                </div>
              </Section>

              <Section
                title="Pressed State"
                titleLevel="h3"
                id="pressed-state"
                code={`<Toggle defaultPressed aria-label="Bold">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M4 3h5a3 3 0 0 1 0 6H4V3zM4 9h6a3 3 0 0 1 0 6H4V9z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
</Toggle>
<Toggle aria-label="Italic">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 3H6M10 13H6M9 3L7 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
</Toggle>
<Toggle aria-label="Underline">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M4 3v5a4 4 0 0 0 8 0V3M3 13h10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
</Toggle>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Toggle components maintain their pressed state when clicked,
                  useful for formatting toolbars and selection controls.
                </Typography>
                <div className="flex flex-wrap gap-4">
                  <Toggle defaultPressed aria-label="Bold">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 3h5a3 3 0 0 1 0 6H4V3zM4 9h6a3 3 0 0 1 0 6H4V9z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </Toggle>
                  <Toggle aria-label="Italic">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M10 3H6M10 13H6M9 3L7 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Toggle>
                  <Toggle aria-label="Underline">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 3v5a4 4 0 0 0 8 0V3M3 13h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Toggle>
                </div>
              </Section>

              <Section
                title="Disabled"
                titleLevel="h3"
                id="disabled"
                code={`<Toggle disabled aria-label="Disabled toggle">
  Disabled
</Toggle>
<Toggle disabled defaultPressed aria-label="Disabled pressed toggle">
  Disabled Pressed
</Toggle>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Toggle disabled aria-label="Disabled toggle">
                    Disabled
                  </Toggle>
                  <Toggle disabled defaultPressed aria-label="Disabled pressed toggle">
                    Disabled Pressed
                  </Toggle>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Toggle} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
