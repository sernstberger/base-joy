import { Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { ColorScale } from '@base-joy/tokens';

const typographyControls: PlaygroundControl[] = [
  {
    name: 'level',
    type: 'select',
    defaultValue: 'h1',
    options: ['h1', 'h2', 'h3', 'h4', 'body-lg', 'body-md', 'body-sm', 'body-xs'],
  },
  {
    name: 'weight',
    type: 'select',
    defaultValue: 'normal',
    options: ['normal', 'medium', 'semibold', 'bold'],
  },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
];

const typographyCodeTemplate = (props: Record<string, string>) => {
  const weightProp = props.weight ? ` weight="${props.weight}"` : '';
  return `<Typography level="${props.level}" color="${props.color}"${weightProp}>
  Typography Text
</Typography>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'heading-levels', title: 'Heading Levels', level: 3 },
  { id: 'body-levels', title: 'Body Levels', level: 3 },
  { id: 'font-weights', title: 'Font Weights', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'semantic-elements', title: 'Semantic Elements', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function TypographyPage() {
  return (
    <div>
      <ComponentHeader
        title="Typography"
        description="A unified typography component for headings and body text across the design system. Provides consistent text styling with support for various levels, weights, and colors."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={typographyControls} codeTemplate={typographyCodeTemplate}>
              {(props) => (
                <Typography
                  level={props.level as any}
                  color={props.color as ColorScale | 'inherit'}
                  weight={props.weight ? (props.weight as any) : undefined}
                >
                  Typography Text
                </Typography>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Heading Levels"
                titleLevel="h3"
                id="heading-levels"
                code={`<Typography level="h1">Heading Level h1</Typography>
<Typography level="h2">Heading Level h2</Typography>
<Typography level="h3">Heading Level h3</Typography>
<Typography level="h4">Heading Level h4</Typography>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Typography level="h1">Heading Level h1</Typography>
                  <Typography level="h2">Heading Level h2</Typography>
                  <Typography level="h3">Heading Level h3</Typography>
                  <Typography level="h4">Heading Level h4</Typography>
                </div>
              </Section>

              <Section
                title="Body Levels"
                titleLevel="h3"
                id="body-levels"
                code={`<Typography level="body-lg">Large text (body-lg)</Typography>
<Typography level="body-md">Medium text (body-md) - default</Typography>
<Typography level="body-sm">Small text (body-sm)</Typography>
<Typography level="body-xs">Extra small text (body-xs)</Typography>`}
                codeLanguage="tsx"
              >
                <div className="space-y-2">
                  <Typography level="body-lg">Large text (body-lg)</Typography>
                  <Typography level="body-md">Medium text (body-md) - default</Typography>
                  <Typography level="body-sm">Small text (body-sm)</Typography>
                  <Typography level="body-xs">Extra small text (body-xs)</Typography>
                </div>
              </Section>

              <Section
                title="Font Weights"
                titleLevel="h3"
                id="font-weights"
                code={`<Typography weight="normal">Normal weight</Typography>
<Typography weight="medium">Medium weight</Typography>
<Typography weight="semibold">Semibold weight</Typography>
<Typography weight="bold">Bold weight</Typography>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Weight props only apply to body levels. Headings are always bold.
                </Typography>
                <div className="space-y-2">
                  <Typography weight="normal">Normal weight</Typography>
                  <Typography weight="medium">Medium weight</Typography>
                  <Typography weight="semibold">Semibold weight</Typography>
                  <Typography weight="bold">Bold weight</Typography>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Typography color="primary">Primary text</Typography>
<Typography color="neutral">Neutral text</Typography>
<Typography color="success">Success text</Typography>
<Typography color="warning">Warning text</Typography>
<Typography color="danger">Danger text</Typography>`}
                codeLanguage="tsx"
              >
                <div className="space-y-2">
                  <Typography color="primary">Primary text</Typography>
                  <Typography color="neutral">Neutral text</Typography>
                  <Typography color="success">Success text</Typography>
                  <Typography color="warning">Warning text</Typography>
                  <Typography color="danger">Danger text</Typography>
                </div>
              </Section>

              <Section
                title="Semantic Elements"
                titleLevel="h3"
                id="semantic-elements"
                code={`<Typography component="p">Paragraph element (default for body)</Typography>
<Typography component="span">Span element (inline)</Typography>
<Typography component="div">Div element (block)</Typography>
<Typography component="label">Label element (for forms)</Typography>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">component</code> prop to override the default HTML element.
                </Typography>
                <div className="space-y-2">
                  <Typography component="p">Paragraph element (default for body)</Typography>
                  <Typography component="span">Span element (inline)</Typography>
                  <Typography component="div">Div element (block)</Typography>
                  <Typography component="label">Label element (for forms)</Typography>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Typography} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
