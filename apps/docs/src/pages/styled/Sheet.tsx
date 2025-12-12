import { Sheet, Typography } from '@base-joy/ui-styled';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const sheetControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const sheetCodeTemplate = (props: Record<string, string>) =>
  `<Sheet variant="${props.variant}" color="${props.color}" size="${props.size}">\n  Your content here\n</Sheet>`;

export function SheetPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Sheet</Typography>
        <Typography level="body-lg">
          A styled container with CVA variants for colors, visual styles, and sizes.
        </Typography>
      </header>

      <Section title="Playground">
        <Playground controls={sheetControls} codeTemplate={sheetCodeTemplate}>
          {(props) => (
            <Sheet
              variant={props.variant as Variant}
              color={props.color as ColorScale}
              size={props.size as Size}
              className="min-w-50"
            >
              <p className="font-medium">Sheet</p>
            </Sheet>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Variants</Typography>
            <div className="flex flex-wrap gap-4">
              <Sheet variant="solid" color="primary">Solid</Sheet>
              <Sheet variant="soft" color="primary">Soft</Sheet>
              <Sheet variant="outlined" color="primary">Outlined</Sheet>
              <Sheet variant="plain" color="primary">Plain</Sheet>
            </div>
          </div>

          <div>
            <Typography level="h3">Colors (Soft variant)</Typography>
            <div className="flex flex-wrap gap-4">
              <Sheet variant="soft" color="primary">Primary</Sheet>
              <Sheet variant="soft" color="neutral">Neutral</Sheet>
              <Sheet variant="soft" color="success">Success</Sheet>
              <Sheet variant="soft" color="warning">Warning</Sheet>
              <Sheet variant="soft" color="danger">Danger</Sheet>
            </div>
          </div>

          <div>
            <Typography level="h3">Sizes</Typography>
            <div className="flex flex-wrap items-start gap-4">
              <Sheet variant="outlined" color="neutral" size="sm">Small (sm)</Sheet>
              <Sheet variant="outlined" color="neutral" size="md">Medium (md)</Sheet>
              <Sheet variant="outlined" color="neutral" size="lg">Large (lg)</Sheet>
            </div>
          </div>

          <div>
            <Typography level="h3">Colors (Solid variant)</Typography>
            <div className="flex flex-wrap gap-4">
              <Sheet variant="solid" color="primary">Primary</Sheet>
              <Sheet variant="solid" color="neutral">Neutral</Sheet>
              <Sheet variant="solid" color="success">Success</Sheet>
              <Sheet variant="solid" color="warning">Warning</Sheet>
              <Sheet variant="solid" color="danger">Danger</Sheet>
            </div>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={componentProps.Sheet} />
      </Section>
    </div>
  );
}
