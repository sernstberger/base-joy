import { Badge, Typography } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const badgeControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const badgeCodeTemplate = (props: Record<string, string>) =>
  `<Badge variant="${props.variant}" color="${props.color}" size="${props.size}">New</Badge>`;

export function BadgePage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Badge</Typography>
        <Typography level="body-lg">
          Small labels for categorization, status indicators, or counts.
        </Typography>
      </header>

      <Section title="Playground">
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

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Variants</Typography>
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
          </div>

          <div>
            <Typography level="h3">Colors</Typography>
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
          </div>

          <div>
            <Typography level="h3">Sizes</Typography>
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
          </div>

          <div>
            <Typography level="h3">With Decorators</Typography>
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
          </div>

          <div>
            <Typography level="h3">Use Cases</Typography>
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
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <Typography level="h3">Badge</Typography>
        <PropsTable props={componentProps.Badge} />
      </Section>
    </div>
  );
}
