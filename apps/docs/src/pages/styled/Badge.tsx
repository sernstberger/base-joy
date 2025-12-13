import { Badge, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const badgeControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const badgeCodeTemplate = (props: Record<string, string>) =>
  `<Badge variant="${props.variant}" color="${props.color}" size="${props.size}">New</Badge>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'with-decorators', title: 'With Decorators', level: 3 },
  { id: 'use-cases', title: 'Use Cases', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function BadgePage() {
  return (
    <div>
      <ComponentHeader
        title="Badge"
        description="Small labels for categorization, status indicators, or counts."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={badgeControls} codeTemplate={badgeCodeTemplate}>
              {(props) => (
                <Badge
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  New
                </Badge>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Badge variant="solid" color="primary">
  Solid
</Badge>
<Badge variant="soft" color="primary">
  Soft
</Badge>
<Badge variant="outlined" color="primary">
  Outlined
</Badge>
<Badge variant="plain" color="primary">
  Plain
</Badge>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap gap-3">
                  <Badge variant="solid" color="primary">
                    Solid
                  </Badge>
                  <Badge variant="soft" color="primary">
                    Soft
                  </Badge>
                  <Badge variant="outlined" color="primary">
                    Outlined
                  </Badge>
                  <Badge variant="plain" color="primary">
                    Plain
                  </Badge>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`// Solid variant
<Badge variant="solid" color="primary">Primary</Badge>
<Badge variant="solid" color="neutral">Neutral</Badge>
<Badge variant="solid" color="success">Success</Badge>
<Badge variant="solid" color="warning">Warning</Badge>
<Badge variant="solid" color="danger">Danger</Badge>

// Soft variant
<Badge variant="soft" color="primary">Primary</Badge>
<Badge variant="soft" color="neutral">Neutral</Badge>
<Badge variant="soft" color="success">Success</Badge>
<Badge variant="soft" color="warning">Warning</Badge>
<Badge variant="soft" color="danger">Danger</Badge>

// Outlined variant
<Badge variant="outlined" color="primary">Primary</Badge>
<Badge variant="outlined" color="neutral">Neutral</Badge>
<Badge variant="outlined" color="success">Success</Badge>
<Badge variant="outlined" color="warning">Warning</Badge>
<Badge variant="outlined" color="danger">Danger</Badge>

// Plain variant
<Badge variant="plain" color="primary">Primary</Badge>
<Badge variant="plain" color="neutral">Neutral</Badge>
<Badge variant="plain" color="success">Success</Badge>
<Badge variant="plain" color="warning">Warning</Badge>
<Badge variant="plain" color="danger">Danger</Badge>`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Solid
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="solid" color="primary">
                        Primary
                      </Badge>
                      <Badge variant="solid" color="neutral">
                        Neutral
                      </Badge>
                      <Badge variant="solid" color="success">
                        Success
                      </Badge>
                      <Badge variant="solid" color="warning">
                        Warning
                      </Badge>
                      <Badge variant="solid" color="danger">
                        Danger
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Soft
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="soft" color="primary">
                        Primary
                      </Badge>
                      <Badge variant="soft" color="neutral">
                        Neutral
                      </Badge>
                      <Badge variant="soft" color="success">
                        Success
                      </Badge>
                      <Badge variant="soft" color="warning">
                        Warning
                      </Badge>
                      <Badge variant="soft" color="danger">
                        Danger
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Outlined
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="outlined" color="primary">
                        Primary
                      </Badge>
                      <Badge variant="outlined" color="neutral">
                        Neutral
                      </Badge>
                      <Badge variant="outlined" color="success">
                        Success
                      </Badge>
                      <Badge variant="outlined" color="warning">
                        Warning
                      </Badge>
                      <Badge variant="outlined" color="danger">
                        Danger
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Plain
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="plain" color="primary">
                        Primary
                      </Badge>
                      <Badge variant="plain" color="neutral">
                        Neutral
                      </Badge>
                      <Badge variant="plain" color="success">
                        Success
                      </Badge>
                      <Badge variant="plain" color="warning">
                        Warning
                      </Badge>
                      <Badge variant="plain" color="danger">
                        Danger
                      </Badge>
                    </div>
                  </div>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Badge size="sm" color="primary">
  Small
</Badge>
<Badge size="md" color="primary">
  Medium
</Badge>
<Badge size="lg" color="primary">
  Large
</Badge>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge size="sm" color="primary">
                    Small
                  </Badge>
                  <Badge size="md" color="primary">
                    Medium
                  </Badge>
                  <Badge size="lg" color="primary">
                    Large
                  </Badge>
                </div>
              </Section>

              <Section
                title="With Decorators"
                titleLevel="h3"
                id="with-decorators"
                code={`// Start Decorator
<Badge
  variant="soft"
  color="success"
  startDecorator={<span>✓</span>}
>
  Verified
</Badge>
<Badge
  variant="soft"
  color="warning"
  startDecorator={<span>⚠</span>}
>
  Warning
</Badge>
<Badge
  variant="soft"
  color="danger"
  startDecorator={<span>✕</span>}
>
  Error
</Badge>

// End Decorator
<Badge variant="soft" color="primary" endDecorator={<span>→</span>}>
  Next
</Badge>
<Badge variant="soft" color="neutral" endDecorator={<span>×</span>}>
  Dismissible
</Badge>

// Both Decorators
<Badge
  variant="outlined"
  color="primary"
  startDecorator={<span>←</span>}
  endDecorator={<span>→</span>}
>
  Range
</Badge>`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Start Decorator
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge
                        variant="soft"
                        color="success"
                        startDecorator={<span>✓</span>}
                      >
                        Verified
                      </Badge>
                      <Badge
                        variant="soft"
                        color="warning"
                        startDecorator={<span>⚠</span>}
                      >
                        Warning
                      </Badge>
                      <Badge
                        variant="soft"
                        color="danger"
                        startDecorator={<span>✕</span>}
                      >
                        Error
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      End Decorator
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="soft" color="primary" endDecorator={<span>→</span>}>
                        Next
                      </Badge>
                      <Badge variant="soft" color="neutral" endDecorator={<span>×</span>}>
                        Dismissible
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Both Decorators
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge
                        variant="outlined"
                        color="primary"
                        startDecorator={<span>←</span>}
                        endDecorator={<span>→</span>}
                      >
                        Range
                      </Badge>
                    </div>
                  </div>
                </div>
              </Section>

              <Section
                title="Use Cases"
                titleLevel="h3"
                id="use-cases"
                code={`// Status Indicators
<Badge variant="soft" color="success">Active</Badge>
<Badge variant="soft" color="warning">Pending</Badge>
<Badge variant="soft" color="danger">Inactive</Badge>
<Badge variant="soft" color="neutral">Draft</Badge>

// Categories
<Badge variant="outlined" color="primary">React</Badge>
<Badge variant="outlined" color="primary">TypeScript</Badge>
<Badge variant="outlined" color="primary">Tailwind</Badge>

// Counts
<Badge variant="solid" color="danger">3</Badge>
<Badge variant="solid" color="primary">12</Badge>
<Badge variant="solid" color="success">99+</Badge>`}
                codeLanguage="tsx"
              >
                <div className="space-y-3">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Status Indicators
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="soft" color="success">
                        Active
                      </Badge>
                      <Badge variant="soft" color="warning">
                        Pending
                      </Badge>
                      <Badge variant="soft" color="danger">
                        Inactive
                      </Badge>
                      <Badge variant="soft" color="neutral">
                        Draft
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Categories
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="outlined" color="primary">
                        React
                      </Badge>
                      <Badge variant="outlined" color="primary">
                        TypeScript
                      </Badge>
                      <Badge variant="outlined" color="primary">
                        Tailwind
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Counts
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="solid" color="danger">
                        3
                      </Badge>
                      <Badge variant="solid" color="primary">
                        12
                      </Badge>
                      <Badge variant="solid" color="success">
                        99+
                      </Badge>
                    </div>
                  </div>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Badge} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
