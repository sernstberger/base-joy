import { Typography, Sheet } from '@base-joy/ui-styled';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { ColorScale } from '@base-joy/tokens';

const typographyControls: PlaygroundControl[] = [
  { name: 'color', type: 'color', defaultValue: 'neutral' },
];

const typographyCodeTemplate = (props: Record<string, string>) =>
  `<Typography level="h1" color="${props.color}">Page Title</Typography>`;

export function TypographyPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Typography</Typography>
        <Typography level="body-lg">
          A unified typography component for headings and body text across the design system.
        </Typography>
      </header>

      <Section title="Playground">
        <Playground controls={typographyControls} codeTemplate={typographyCodeTemplate}>
          {(props) => (
            <div className="space-y-2">
              <Typography level="h1" color={props.color as ColorScale}>Heading 1</Typography>
              <Typography level="h2" color={props.color as ColorScale}>Heading 2</Typography>
              <Typography level="h3" color={props.color as ColorScale}>Heading 3</Typography>
            </div>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Heading Levels</Typography>
            <Sheet variant="outlined" color="neutral" className="space-y-4">
              <Typography level="h1">Heading Level h1</Typography>
              <Typography level="h2">Heading Level h2</Typography>
              <Typography level="h3">Heading Level h3</Typography>
              <Typography level="h4">Heading Level h4</Typography>
              <Typography level="h5">Heading Level h5</Typography>
              <Typography level="h6">Heading Level h6</Typography>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Heading Colors</Typography>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Typography level="h3" color="primary">Primary Heading</Typography>
              <Typography level="h3" color="neutral">Neutral Heading</Typography>
              <Typography level="h3" color="success">Success Heading</Typography>
              <Typography level="h3" color="warning">Warning Heading</Typography>
              <Typography level="h3" color="danger">Danger Heading</Typography>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Body Levels</Typography>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Typography level="body-xs">Extra small text (body-xs)</Typography>
              <Typography level="body-sm">Small text (body-sm)</Typography>
              <Typography level="body-md">Medium text (body-md) - default</Typography>
              <Typography level="body-lg">Large text (body-lg)</Typography>
              <Typography level="body-xl">Extra large text (body-xl)</Typography>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Body Colors</Typography>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Typography color="primary">Primary text</Typography>
              <Typography color="neutral">Neutral text - default</Typography>
              <Typography color="success">Success text</Typography>
              <Typography color="warning">Warning text</Typography>
              <Typography color="danger">Danger text</Typography>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Body Weights</Typography>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Typography weight="normal">Normal weight - default</Typography>
              <Typography weight="medium">Medium weight</Typography>
              <Typography weight="semibold">Semibold weight</Typography>
              <Typography weight="bold">Bold weight</Typography>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Custom Elements</Typography>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Typography component="p">Paragraph element (default for body)</Typography>
              <Typography component="span">Span element (inline)</Typography>
              <Typography component="div">Div element (block)</Typography>
              <Typography component="label">Label element (for forms)</Typography>
            </Sheet>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={componentProps.Typography} />
      </Section>
    </div>
  );
}
