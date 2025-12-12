import { Sheet, Typography, Input } from '@base-joy/ui-styled';
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

const sheetControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'interactive', type: 'boolean', defaultValue: false },
  { name: 'focusWithin', type: 'boolean', defaultValue: false },
];

const sheetCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.interactive) booleanProps.push('interactive');
  if (props.focusWithin) booleanProps.push('focusWithin');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Sheet variant="${props.variant}" color="${props.color}" size="${props.size}"${booleanPropsStr}>
  Sheet Content
</Sheet>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors-soft', title: 'Colors (Soft)', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'colors-solid', title: 'Colors (Solid)', level: 3 },
  { id: 'interactive', title: 'Interactive', level: 3 },
  { id: 'as-different-elements', title: 'As Different Elements', level: 3 },
  { id: 'focus-within', title: 'Focus Within', level: 3 },
  { id: 'nested-sheets', title: 'Nested Sheets', level: 3 },
  { id: 'automatic-contrast', title: 'Automatic Contrast' },
  { id: 'api', title: 'API Reference' },
];

export function SheetPage() {
  return (
    <div>
      <ComponentHeader
        title="Sheet"
        description="A styled container component with CVA variants for visual styles, colors, and sizes. Sheet is the foundation for many components like Card, Badge, and form inputs."
        baseUiUrl="https://base-ui.com/react/handbook/styling"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={sheetControls}
              codeTemplate={sheetCodeTemplate}
            >
              {(props) => {
                const interactive = Boolean(props.interactive);
                const focusWithin = Boolean(props.focusWithin);

                return (
                  <Sheet
                    variant={props.variant as Variant}
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    interactive={interactive}
                    focusWithin={focusWithin}
                    className="min-w-80"
                    {...(interactive ? { tabIndex: 0 } : {})}
                  >
                    <Typography level="body-md" weight="medium">
                      Sheet Component
                    </Typography>
                    <Typography level="body-sm" className="opacity-80">
                      {interactive
                        ? 'Try clicking or tabbing to see focus styles'
                        : 'A styled container with CVA variants'}
                    </Typography>
                  </Sheet>
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
                code={`<Sheet variant="solid" color="primary">
  Solid
</Sheet>
<Sheet variant="soft" color="primary">
  Soft
</Sheet>
<Sheet variant="outlined" color="primary">
  Outlined
</Sheet>
<Sheet variant="plain" color="primary">
  Plain
</Sheet>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Sheet variant="solid" color="primary">
                    Solid
                  </Sheet>
                  <Sheet variant="soft" color="primary">
                    Soft
                  </Sheet>
                  <Sheet variant="outlined" color="primary">
                    Outlined
                  </Sheet>
                  <Sheet variant="plain" color="primary">
                    Plain
                  </Sheet>
                </div>
              </Section>

              <Section
                title="Colors (Soft variant)"
                titleLevel="h3"
                id="colors-soft"
                code={`<Sheet variant="soft" color="primary">
  Primary
</Sheet>
<Sheet variant="soft" color="neutral">
  Neutral
</Sheet>
<Sheet variant="soft" color="success">
  Success
</Sheet>
<Sheet variant="soft" color="warning">
  Warning
</Sheet>
<Sheet variant="soft" color="danger">
  Danger
</Sheet>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Sheet variant="soft" color="primary">
                    Primary
                  </Sheet>
                  <Sheet variant="soft" color="neutral">
                    Neutral
                  </Sheet>
                  <Sheet variant="soft" color="success">
                    Success
                  </Sheet>
                  <Sheet variant="soft" color="warning">
                    Warning
                  </Sheet>
                  <Sheet variant="soft" color="danger">
                    Danger
                  </Sheet>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Sheet variant="outlined" color="neutral" size="sm">
  Small (sm)
</Sheet>
<Sheet variant="outlined" color="neutral" size="md">
  Medium (md)
</Sheet>
<Sheet variant="outlined" color="neutral" size="lg">
  Large (lg)
</Sheet>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <Sheet variant="outlined" color="neutral" size="sm">
                    Small (sm)
                  </Sheet>
                  <Sheet variant="outlined" color="neutral" size="md">
                    Medium (md)
                  </Sheet>
                  <Sheet variant="outlined" color="neutral" size="lg">
                    Large (lg)
                  </Sheet>
                </div>
              </Section>

              <Section
                title="Colors (Solid variant)"
                titleLevel="h3"
                id="colors-solid"
                code={`<Sheet variant="solid" color="primary">
  Primary
</Sheet>
<Sheet variant="solid" color="neutral">
  Neutral
</Sheet>
<Sheet variant="solid" color="success">
  Success
</Sheet>
<Sheet variant="solid" color="warning">
  Warning
</Sheet>
<Sheet variant="solid" color="danger">
  Danger
</Sheet>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-4">
                  <Sheet variant="solid" color="primary">
                    Primary
                  </Sheet>
                  <Sheet variant="solid" color="neutral">
                    Neutral
                  </Sheet>
                  <Sheet variant="solid" color="success">
                    Success
                  </Sheet>
                  <Sheet variant="solid" color="warning">
                    Warning
                  </Sheet>
                  <Sheet variant="solid" color="danger">
                    Danger
                  </Sheet>
                </div>
              </Section>

              <div>
                <Typography level="h3" className="mb-2" id="interactive">
                  Interactive
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  The <code className="font-mono text-sm">interactive</code>{' '}
                  prop adds focus rings and hover states for clickable or
                  focusable elements.
                </Typography>
                <Section
                  code={`<Sheet
  variant="outlined"
  color="primary"
  interactive
  as="button"
  className="cursor-pointer"
>
  Click me
</Sheet>
<Sheet
  variant="soft"
  color="success"
  interactive
  as="button"
  className="cursor-pointer"
>
  Interactive Sheet
</Sheet>`}
                  codeLanguage="tsx"
                >
                  <div className="flex flex-wrap gap-4">
                    <Sheet
                      variant="outlined"
                      color="primary"
                      interactive
                      as="button"
                      className="cursor-pointer"
                    >
                      Click me
                    </Sheet>
                    <Sheet
                      variant="soft"
                      color="success"
                      interactive
                      as="button"
                      className="cursor-pointer"
                    >
                      Interactive Sheet
                    </Sheet>
                  </div>
                </Section>
              </div>

              <div>
                <Typography level="h3" className="mb-2" id="as-different-elements">
                  As Different Elements
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">as</code> prop to
                  render Sheet as different HTML elements for semantic
                  correctness.
                </Typography>
                <Section
                  code={`<Sheet variant="outlined" color="neutral" as="section">
  <Typography level="body-sm" weight="medium">
    as="section"
  </Typography>
  <Typography level="body-xs">
    Rendered as a section element
  </Typography>
</Sheet>
<Sheet variant="outlined" color="neutral" as="article">
  <Typography level="body-sm" weight="medium">
    as="article"
  </Typography>
  <Typography level="body-xs">
    Rendered as an article element
  </Typography>
</Sheet>
<Sheet variant="outlined" color="neutral" as="aside">
  <Typography level="body-sm" weight="medium">
    as="aside"
  </Typography>
  <Typography level="body-xs">
    Rendered as an aside element
  </Typography>
</Sheet>`}
                  codeLanguage="tsx"
                >
                  <div className="space-y-3">
                    <Sheet variant="outlined" color="neutral" as="section">
                      <Typography level="body-sm" weight="medium">
                        as="section"
                      </Typography>
                      <Typography level="body-xs">
                        Rendered as a section element
                      </Typography>
                    </Sheet>
                    <Sheet variant="outlined" color="neutral" as="article">
                      <Typography level="body-sm" weight="medium">
                        as="article"
                      </Typography>
                      <Typography level="body-xs">
                        Rendered as an article element
                      </Typography>
                    </Sheet>
                    <Sheet variant="outlined" color="neutral" as="aside">
                      <Typography level="body-sm" weight="medium">
                        as="aside"
                      </Typography>
                      <Typography level="body-xs">
                        Rendered as an aside element
                      </Typography>
                    </Sheet>
                  </div>
                </Section>
              </div>

              <div>
                <Typography level="h3" className="mb-2" id="focus-within">
                  Focus Within
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">focusWithin</code>{' '}
                  prop for containers with focusable children to show focus
                  rings on the container.
                </Typography>
                <Section
                  code={`<Sheet
  variant="outlined"
  color="primary"
  interactive
  focusWithin
  className="space-y-2 min-w-60"
>
  <Typography level="body-sm" weight="medium">
    Container with input
  </Typography>
  <Input placeholder="Focus me" size="sm" />
</Sheet>`}
                  codeLanguage="tsx"
                >
                  <div className="flex flex-wrap gap-4">
                    <Sheet
                      variant="outlined"
                      color="primary"
                      interactive
                      focusWithin
                      className="space-y-2 min-w-60"
                    >
                      <Typography level="body-sm" weight="medium">
                        Container with input
                      </Typography>
                      <Input placeholder="Focus me" size="sm" />
                    </Sheet>
                  </div>
                </Section>
              </div>

              <div>
                <Typography level="h3" className="mb-2" id="nested-sheets">
                  Nested Sheets
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Sheets can be nested to create layered interfaces with
                  different visual styles.
                </Typography>
                <Section
                  code={`<Sheet
  variant="outlined"
  color="neutral"
  size="lg"
  className="space-y-4"
>
  <Typography level="h5">Outer Sheet</Typography>
  <Typography level="body-sm">
    This is the outer container with outlined variant.
  </Typography>
  <Sheet
    variant="soft"
    color="primary"
    size="md"
    className="space-y-2"
  >
    <Typography level="body-sm" weight="medium">
      Inner Sheet
    </Typography>
    <Typography level="body-xs">
      Nested soft variant sheet inside the outlined container.
    </Typography>
  </Sheet>
</Sheet>`}
                  codeLanguage="tsx"
                >
                  <Sheet
                    variant="outlined"
                    color="neutral"
                    size="lg"
                    className="space-y-4"
                  >
                    <Typography level="h5">Outer Sheet</Typography>
                    <Typography level="body-sm">
                      This is the outer container with outlined variant.
                    </Typography>
                    <Sheet
                      variant="soft"
                      color="primary"
                      size="md"
                      className="space-y-2"
                    >
                      <Typography level="body-sm" weight="medium">
                        Inner Sheet
                      </Typography>
                      <Typography level="body-xs">
                        Nested soft variant sheet inside the outlined container.
                      </Typography>
                    </Sheet>
                  </Sheet>
                </Section>
              </div>
            </div>
          </Section>

          <Section title="Automatic Contrast" id="automatic-contrast">
            <Typography level="body-sm" className="mb-4">
              Sheet automatically ensures accessible text colors following WCAG
              AA/AAA standards. Text colors adjust dynamically on interactive
              states to maintain optimal contrast as backgrounds change.
            </Typography>

            <div className="space-y-4">
              <div>
                <Typography level="body-sm" weight="semibold" className="mb-2">
                  How it works
                </Typography>
                <Typography level="body-xs" className="text-neutral-600 mb-2">
                  Each variant uses carefully selected text shades that provide
                  accessible contrast:
                </Typography>
                <ul className="space-y-1 ml-6 list-disc">
                  <li>
                    <Typography level="body-xs" className="text-neutral-600">
                      <strong>Solid:</strong> White text on color-500+
                      backgrounds (warning uses color-600 for enhanced contrast)
                    </Typography>
                  </li>
                  <li>
                    <Typography level="body-xs" className="text-neutral-600">
                      <strong>Soft:</strong> Dark text (color-900/950) on light
                      backgrounds (color-100-300)
                    </Typography>
                  </li>
                  <li>
                    <Typography level="body-xs" className="text-neutral-600">
                      <strong>Outlined/Plain:</strong> Medium-dark text
                      (color-700/800) on transparent/light backgrounds
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography level="body-sm" weight="semibold" className="mb-2">
                  Interactive states
                </Typography>
                <Typography level="body-xs" className="text-neutral-600">
                  When{' '}
                  <code className="font-mono text-sm">interactive={'{'}true{'}'}</code>,
                  text automatically darkens on active states to maintain AAA
                  contrast as backgrounds darken. Non-interactive Sheets keep
                  constant text colors.
                </Typography>
              </div>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Sheet} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
