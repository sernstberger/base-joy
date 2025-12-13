import { Toggle, ToggleGroup, Typography } from '@base-joy/ui-styled';
import { colors, type ColorScale, type Variant, type Size } from '@base-joy/tokens';
import { cn } from '@base-joy/utils';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';

const toggleGroupControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'multiple', type: 'boolean', defaultValue: false },
];

const toggleGroupCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  if (props.multiple === 'true' || props.multiple === true) booleanProps.push('multiple');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<ToggleGroup.Root variant="${props.variant}" color="${props.color}" size="${props.size}"${booleanPropsStr}>
  <Toggle value="a">Option A</Toggle>
  <Toggle value="b">Option B</Toggle>
  <Toggle value="c">Option C</Toggle>
</ToggleGroup.Root>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'single-selection', title: 'Single Selection', level: 3 },
  { id: 'multiple-selection', title: 'Multiple Selection', level: 3 },
  { id: 'orientation', title: 'Orientation', level: 3 },
  { id: 'disabled', title: 'Disabled', level: 3 },
  { id: 'custom-styling', title: 'Custom Styling', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function ToggleGroupPage() {
  return (
    <div>
      <ComponentHeader
        title="ToggleGroup"
        description="A group of toggle buttons where one or more can be selected."
        baseUiUrl="https://base-ui.com/react/components/toggle-group"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={toggleGroupControls}
              codeTemplate={toggleGroupCodeTemplate}
            >
              {(props) => {
                const disabled = props.disabled === 'true';
                const multiple = props.multiple === 'true';

                return (
                  <ToggleGroup.Root
                    variant={props.variant as Variant}
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    disabled={disabled}
                    multiple={multiple}
                    defaultValue={['a']}
                    aria-label="Toggle group playground"
                  >
                    <Toggle value="a">Option A</Toggle>
                    <Toggle value="b">Option B</Toggle>
                    <Toggle value="c">Option C</Toggle>
                  </ToggleGroup.Root>
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
                code={`<ToggleGroup.Root variant="solid" defaultValue={['a']}>
  <Toggle value="a">Option A</Toggle>
  <Toggle value="b">Option B</Toggle>
  <Toggle value="c">Option C</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root variant="soft" defaultValue={['a']}>
  <Toggle value="a">Option A</Toggle>
  <Toggle value="b">Option B</Toggle>
  <Toggle value="c">Option C</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root variant="outlined" defaultValue={['a']}>
  <Toggle value="a">Option A</Toggle>
  <Toggle value="b">Option B</Toggle>
  <Toggle value="c">Option C</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root variant="plain" defaultValue={['a']}>
  <Toggle value="a">Option A</Toggle>
  <Toggle value="b">Option B</Toggle>
  <Toggle value="c">Option C</Toggle>
</ToggleGroup.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <ToggleGroup.Root variant="solid" defaultValue={['a']} aria-label="Solid variant">
                    <Toggle value="a">Option A</Toggle>
                    <Toggle value="b">Option B</Toggle>
                    <Toggle value="c">Option C</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root variant="soft" defaultValue={['a']} aria-label="Soft variant">
                    <Toggle value="a">Option A</Toggle>
                    <Toggle value="b">Option B</Toggle>
                    <Toggle value="c">Option C</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root variant="outlined" defaultValue={['a']} aria-label="Outlined variant">
                    <Toggle value="a">Option A</Toggle>
                    <Toggle value="b">Option B</Toggle>
                    <Toggle value="c">Option C</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root variant="plain" defaultValue={['a']} aria-label="Plain variant">
                    <Toggle value="a">Option A</Toggle>
                    <Toggle value="b">Option B</Toggle>
                    <Toggle value="c">Option C</Toggle>
                  </ToggleGroup.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<ToggleGroup.Root color="primary" defaultValue={['a']}>
  <Toggle value="a">Primary</Toggle>
  <Toggle value="b">Primary</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root color="neutral" defaultValue={['a']}>
  <Toggle value="a">Neutral</Toggle>
  <Toggle value="b">Neutral</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root color="success" defaultValue={['a']}>
  <Toggle value="a">Success</Toggle>
  <Toggle value="b">Success</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root color="warning" defaultValue={['a']}>
  <Toggle value="a">Warning</Toggle>
  <Toggle value="b">Warning</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root color="danger" defaultValue={['a']}>
  <Toggle value="a">Danger</Toggle>
  <Toggle value="b">Danger</Toggle>
</ToggleGroup.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <ToggleGroup.Root color="primary" defaultValue={['a']} aria-label="Primary color">
                    <Toggle value="a">Primary</Toggle>
                    <Toggle value="b">Primary</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root color="neutral" defaultValue={['a']} aria-label="Neutral color">
                    <Toggle value="a">Neutral</Toggle>
                    <Toggle value="b">Neutral</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root color="success" defaultValue={['a']} aria-label="Success color">
                    <Toggle value="a">Success</Toggle>
                    <Toggle value="b">Success</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root color="warning" defaultValue={['a']} aria-label="Warning color">
                    <Toggle value="a">Warning</Toggle>
                    <Toggle value="b">Warning</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root color="danger" defaultValue={['a']} aria-label="Danger color">
                    <Toggle value="a">Danger</Toggle>
                    <Toggle value="b">Danger</Toggle>
                  </ToggleGroup.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<ToggleGroup.Root size="sm" defaultValue={['a']}>
  <Toggle value="a">Small</Toggle>
  <Toggle value="b">Small</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root size="md" defaultValue={['a']}>
  <Toggle value="a">Medium</Toggle>
  <Toggle value="b">Medium</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root size="lg" defaultValue={['a']}>
  <Toggle value="a">Large</Toggle>
  <Toggle value="b">Large</Toggle>
</ToggleGroup.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <ToggleGroup.Root size="sm" defaultValue={['a']} aria-label="Small size">
                    <Toggle value="a">Small</Toggle>
                    <Toggle value="b">Small</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root size="md" defaultValue={['a']} aria-label="Medium size">
                    <Toggle value="a">Medium</Toggle>
                    <Toggle value="b">Medium</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root size="lg" defaultValue={['a']} aria-label="Large size">
                    <Toggle value="a">Large</Toggle>
                    <Toggle value="b">Large</Toggle>
                  </ToggleGroup.Root>
                </div>
              </Section>

              <Section
                title="Single Selection"
                titleLevel="h3"
                id="single-selection"
                code={`<ToggleGroup.Root defaultValue={['center']} aria-label="Text alignment">
  <Toggle value="left" aria-label="Align left">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3h12M2 7h8M2 11h10M2 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Toggle>
  <Toggle value="center" aria-label="Align center">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3h12M4 7h8M3 11h10M5 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Toggle>
  <Toggle value="right" aria-label="Align right">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 3h12M6 7h8M4 11h10M8 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Toggle>
</ToggleGroup.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  By default, only one toggle can be selected at a time.
                </Typography>
                <ToggleGroup.Root defaultValue={['center']} aria-label="Text alignment">
                  <Toggle value="left" aria-label="Align left">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 3h12M2 7h8M2 11h10M2 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </Toggle>
                  <Toggle value="center" aria-label="Align center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 3h12M4 7h8M3 11h10M5 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </Toggle>
                  <Toggle value="right" aria-label="Align right">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 3h12M6 7h8M4 11h10M8 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </Toggle>
                </ToggleGroup.Root>
              </Section>

              <Section
                title="Multiple Selection"
                titleLevel="h3"
                id="multiple-selection"
                code={`<ToggleGroup.Root multiple defaultValue={['bold', 'italic']} aria-label="Text formatting">
  <Toggle value="bold" aria-label="Bold">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 3h5a3 3 0 0 1 0 6H4V3zM4 9h6a3 3 0 0 1 0 6H4V9z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  </Toggle>
  <Toggle value="italic" aria-label="Italic">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 3H6M10 13H6M9 3L7 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </Toggle>
  <Toggle value="underline" aria-label="Underline">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 3v5a4 4 0 0 0 8 0V3M3 13h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </Toggle>
</ToggleGroup.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">multiple</code> prop to allow selecting multiple toggles.
                </Typography>
                <ToggleGroup.Root multiple defaultValue={['bold', 'italic']} aria-label="Text formatting">
                  <Toggle value="bold" aria-label="Bold">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 3h5a3 3 0 0 1 0 6H4V3zM4 9h6a3 3 0 0 1 0 6H4V9z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </Toggle>
                  <Toggle value="italic" aria-label="Italic">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M10 3H6M10 13H6M9 3L7 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Toggle>
                  <Toggle value="underline" aria-label="Underline">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 3v5a4 4 0 0 0 8 0V3M3 13h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Toggle>
                </ToggleGroup.Root>
              </Section>

              <Section
                title="Orientation"
                titleLevel="h3"
                id="orientation"
                code={`<ToggleGroup.Root orientation="horizontal" defaultValue={['a']}>
  <Toggle value="a">A</Toggle>
  <Toggle value="b">B</Toggle>
  <Toggle value="c">C</Toggle>
</ToggleGroup.Root>
<ToggleGroup.Root orientation="vertical" defaultValue={['a']}>
  <Toggle value="a">A</Toggle>
  <Toggle value="b">B</Toggle>
  <Toggle value="c">C</Toggle>
</ToggleGroup.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Toggle groups can be laid out horizontally or vertically.
                </Typography>
                <div className="flex gap-8">
                  <ToggleGroup.Root orientation="horizontal" defaultValue={['a']} aria-label="Horizontal group">
                    <Toggle value="a">A</Toggle>
                    <Toggle value="b">B</Toggle>
                    <Toggle value="c">C</Toggle>
                  </ToggleGroup.Root>
                  <ToggleGroup.Root orientation="vertical" defaultValue={['a']} aria-label="Vertical group">
                    <Toggle value="a">A</Toggle>
                    <Toggle value="b">B</Toggle>
                    <Toggle value="c">C</Toggle>
                  </ToggleGroup.Root>
                </div>
              </Section>

              <Section
                title="Disabled"
                titleLevel="h3"
                id="disabled"
                code={`<ToggleGroup.Root disabled defaultValue={['a']}>
  <Toggle value="a">Disabled A</Toggle>
  <Toggle value="b">Disabled B</Toggle>
  <Toggle value="c">Disabled C</Toggle>
</ToggleGroup.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Disable the entire toggle group to prevent user interaction.
                </Typography>
                <ToggleGroup.Root disabled defaultValue={['a']} aria-label="Disabled group">
                  <Toggle value="a">Disabled A</Toggle>
                  <Toggle value="b">Disabled B</Toggle>
                  <Toggle value="c">Disabled C</Toggle>
                </ToggleGroup.Root>
              </Section>

              <Section
                title="Custom Styling"
                titleLevel="h3"
                id="custom-styling"
                code={`<ToggleGroup.Root
  defaultValue={['primary']}
  aria-label="Color picker"
  className="flex flex-wrap gap-2"
>
  {(Object.keys(colors) as ColorScale[]).map((color) => (
    <Toggle
      key={color}
      value={color}
      title={color}
      className={cn(
        'w-8 h-8 p-0 rounded-full border-2 transition-all',
        'border-transparent hover:scale-110',
        'data-pressed:scale-125 data-pressed:border-neutral-900',
        'data-pressed:ring-2 data-pressed:ring-offset-1 data-pressed:ring-neutral-400'
      )}
      style={{ backgroundColor: colors[color][500] }}
    >
      <span className="hidden data-pressed:flex items-center justify-center text-white text-xs">
        ✓
      </span>
    </Toggle>
  ))}
</ToggleGroup.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  ToggleGroup can be heavily customized to create unique UI patterns like
                  color pickers. This example shows how custom className overrides can
                  transform Toggle buttons into color swatches, as used in the documentation
                  playground controls.
                </Typography>
                <div className="flex flex-col gap-3">
                  <ToggleGroup.Root
                    defaultValue={['primary']}
                    aria-label="Color picker"
                    className="flex flex-wrap gap-2"
                  >
                    {(Object.keys(colors) as ColorScale[]).map((color) => (
                      <Toggle
                        key={color}
                        value={color}
                        title={color}
                        className={cn(
                          'w-8 h-8 p-0 rounded-full border-2 transition-all',
                          'border-transparent hover:scale-110',
                          'data-pressed:scale-125 data-pressed:border-neutral-900',
                          'data-pressed:ring-2 data-pressed:ring-offset-1 data-pressed:ring-neutral-400'
                        )}
                        style={{ backgroundColor: colors[color][500] }}
                      >
                        <span className="hidden data-pressed:flex items-center justify-center text-white text-xs">
                          ✓
                        </span>
                      </Toggle>
                    ))}
                  </ToggleGroup.Root>
                  <Typography level="body-xs" className="text-neutral-600">
                    The Toggle buttons use custom styles to create circular color swatches
                    with scale and ring effects on selection, demonstrating how the component
                    can be adapted beyond standard button appearances.
                  </Typography>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.ToggleGroup} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
