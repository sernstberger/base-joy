import { Heading, Text, Sheet } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import type { ColorScale } from '@base-joy/tokens';

const headingControls: PlaygroundControl[] = [
  { name: 'color', type: 'color', defaultValue: 'neutral' },
];

const headingCodeTemplate = (props: Record<string, string>) =>
  `<Heading level={1} color="${props.color}">Page Title</Heading>`;

const headingProps: PropMeta[] = [
  {
    name: 'level',
    type: '1 | 2 | 3 | 4 | 5 | 6',
    defaultValue: '1',
    description: 'The heading level, maps to h1-h6 tags.',
    required: false,
  },
  {
    name: 'color',
    type: '"primary" | "neutral" | "success" | "warning" | "danger"',
    defaultValue: '"neutral"',
    description: 'The text color.',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

const textProps: PropMeta[] = [
  {
    name: 'size',
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    defaultValue: '"md"',
    description: 'The text size.',
    required: false,
  },
  {
    name: 'color',
    type: '"primary" | "neutral" | "success" | "warning" | "danger"',
    defaultValue: '"neutral"',
    description: 'The text color.',
    required: false,
  },
  {
    name: 'weight',
    type: '"normal" | "medium" | "semibold" | "bold"',
    defaultValue: '"normal"',
    description: 'The font weight.',
    required: false,
  },
  {
    name: 'as',
    type: '"p" | "span" | "div" | "label"',
    defaultValue: '"p"',
    description: 'The element type to render.',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

export function TypographyPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Typography</Heading>
        <Text size="lg" color="neutral">
          Heading and Text components for consistent typography across the design system.
        </Text>
      </header>

      <Section title="Heading Playground">
        <Playground controls={headingControls} codeTemplate={headingCodeTemplate}>
          {(props) => (
            <div className="space-y-2">
              <Heading level={1} color={props.color as ColorScale}>Heading 1</Heading>
              <Heading level={2} color={props.color as ColorScale}>Heading 2</Heading>
              <Heading level={3} color={props.color as ColorScale}>Heading 3</Heading>
            </div>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Heading Levels</Heading>
            <Sheet variant="outlined" color="neutral" className="space-y-4">
              <Heading level={1}>Heading Level 1</Heading>
              <Heading level={2}>Heading Level 2</Heading>
              <Heading level={3}>Heading Level 3</Heading>
              <Heading level={4}>Heading Level 4</Heading>
              <Heading level={5}>Heading Level 5</Heading>
              <Heading level={6}>Heading Level 6</Heading>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Heading Colors</Heading>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Heading level={3} color="primary">Primary Heading</Heading>
              <Heading level={3} color="neutral">Neutral Heading</Heading>
              <Heading level={3} color="success">Success Heading</Heading>
              <Heading level={3} color="warning">Warning Heading</Heading>
              <Heading level={3} color="danger">Danger Heading</Heading>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Text Sizes</Heading>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Text size="xs">Extra small text (xs)</Text>
              <Text size="sm">Small text (sm)</Text>
              <Text size="md">Medium text (md) - default</Text>
              <Text size="lg">Large text (lg)</Text>
              <Text size="xl">Extra large text (xl)</Text>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Text Colors</Heading>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Text color="primary">Primary text</Text>
              <Text color="neutral">Neutral text - default</Text>
              <Text color="success">Success text</Text>
              <Text color="warning">Warning text</Text>
              <Text color="danger">Danger text</Text>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Text Weights</Heading>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Text weight="normal">Normal weight - default</Text>
              <Text weight="medium">Medium weight</Text>
              <Text weight="semibold">Semibold weight</Text>
              <Text weight="bold">Bold weight</Text>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Text as Different Elements</Heading>
            <Sheet variant="outlined" color="neutral" className="space-y-2">
              <Text as="p">Paragraph element (default)</Text>
              <Text as="span">Span element (inline)</Text>
              <Text as="div">Div element (block)</Text>
              <Text as="label">Label element (for forms)</Text>
            </Sheet>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Heading</Heading>
            <PropsTable props={headingProps} />
          </div>
          <div>
            <Heading level={3}>Text</Heading>
            <PropsTable props={textProps} />
          </div>
        </div>
      </Section>
    </div>
  );
}
