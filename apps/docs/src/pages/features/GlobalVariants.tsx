import { Sheet, Typography, Button, Badge } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';
import { CodeBlock } from '@base-joy/ui-styled';

export function GlobalVariantsPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Global Variants"
        description="Consistent visual styles that work across all components, providing four distinct appearances: solid, soft, outlined, and plain."
      />

      <div className="space-y-12">
        <Section title="Overview" id="overview">
          <Typography level="body-sm" className="mb-4">
            Global variants provide a unified styling system across the entire
            component library. Every interactive component supports the same
            four variants, creating visual consistency and predictability.
          </Typography>

          <Typography level="body-sm" weight="semibold" className="mb-2">
            The Four Variants
          </Typography>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <strong>Solid:</strong> High emphasis with filled backgrounds
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Soft:</strong> Medium emphasis with subtle backgrounds
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Outlined:</strong> Low emphasis with borders
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Plain:</strong> Minimal emphasis with no background or border
              </Typography>
            </li>
          </ul>
        </Section>

        <Section title="Variant Examples" id="examples">
          <Typography level="body-sm" className="mb-6">
            The same variant system works across all components - buttons,
            badges, form fields, and containers.
          </Typography>

          <div className="space-y-8">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Buttons
              </Typography>
              <div className="flex flex-wrap gap-3">
                <Button variant="solid" color="primary">
                  Solid
                </Button>
                <Button variant="soft" color="primary">
                  Soft
                </Button>
                <Button variant="outlined" color="primary">
                  Outlined
                </Button>
                <Button variant="plain" color="primary">
                  Plain
                </Button>
              </div>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Badges
              </Typography>
              <div className="flex flex-wrap gap-3">
                <Badge variant="solid" color="success">
                  Solid
                </Badge>
                <Badge variant="soft" color="success">
                  Soft
                </Badge>
                <Badge variant="outlined" color="success">
                  Outlined
                </Badge>
                <Badge variant="plain" color="success">
                  Plain
                </Badge>
              </div>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Sheets (Containers)
              </Typography>
              <div className="flex flex-wrap gap-3">
                <Sheet variant="solid" color="warning">
                  Solid
                </Sheet>
                <Sheet variant="soft" color="warning">
                  Soft
                </Sheet>
                <Sheet variant="outlined" color="warning">
                  Outlined
                </Sheet>
                <Sheet variant="plain" color="warning">
                  Plain
                </Sheet>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Visual Hierarchy" id="hierarchy">
          <Typography level="body-sm" className="mb-4">
            Variants create a natural visual hierarchy, helping users understand
            importance and intended actions.
          </Typography>

          <div className="space-y-4">
            <Sheet variant="soft" color="neutral" className="space-y-3">
              <Typography level="body-sm" weight="semibold">
                High Emphasis (Solid)
              </Typography>
              <Typography level="body-xs" className="opacity-80">
                Use for primary actions, important status indicators, or to draw
                maximum attention. Solid variants have the strongest visual weight.
              </Typography>
              <div className="flex gap-2">
                <Button variant="solid" color="primary" size="sm">
                  Save Changes
                </Button>
                <Badge variant="solid" color="danger">
                  Critical
                </Badge>
              </div>
            </Sheet>

            <Sheet variant="soft" color="neutral" className="space-y-3">
              <Typography level="body-sm" weight="semibold">
                Medium Emphasis (Soft)
              </Typography>
              <Typography level="body-xs" className="opacity-80">
                Use for secondary actions, informational content, or default
                states. Soft variants are the most commonly used.
              </Typography>
              <div className="flex gap-2">
                <Button variant="soft" color="primary" size="sm">
                  Learn More
                </Button>
                <Badge variant="soft" color="warning">
                  Pending
                </Badge>
              </div>
            </Sheet>

            <Sheet variant="soft" color="neutral" className="space-y-3">
              <Typography level="body-sm" weight="semibold">
                Low Emphasis (Outlined)
              </Typography>
              <Typography level="body-xs" className="opacity-80">
                Use for tertiary actions, optional features, or to provide
                structure without dominating the layout.
              </Typography>
              <div className="flex gap-2">
                <Button variant="outlined" color="neutral" size="sm">
                  Cancel
                </Button>
                <Badge variant="outlined" color="neutral">
                  Draft
                </Badge>
              </div>
            </Sheet>

            <Sheet variant="soft" color="neutral" className="space-y-3">
              <Typography level="body-sm" weight="semibold">
                Minimal Emphasis (Plain)
              </Typography>
              <Typography level="body-xs" className="opacity-80">
                Use for subtle actions, inline links, or when you want color
                only on hover/focus.
              </Typography>
              <div className="flex gap-2">
                <Button variant="plain" color="neutral" size="sm">
                  Skip
                </Button>
                <Badge variant="plain" color="neutral">
                  Optional
                </Badge>
              </div>
            </Sheet>
          </div>
        </Section>

        <Section title="Color Combinations" id="colors">
          <Typography level="body-sm" className="mb-4">
            Each variant works with all five color scales: primary, neutral,
            success, warning, and danger.
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Solid Variant Across Colors
              </Typography>
              <div className="flex flex-wrap gap-3">
                <Button variant="solid" color="primary">
                  Primary
                </Button>
                <Button variant="solid" color="neutral">
                  Neutral
                </Button>
                <Button variant="solid" color="success">
                  Success
                </Button>
                <Button variant="solid" color="warning">
                  Warning
                </Button>
                <Button variant="solid" color="danger">
                  Danger
                </Button>
              </div>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Soft Variant Across Colors
              </Typography>
              <div className="flex flex-wrap gap-3">
                <Button variant="soft" color="primary">
                  Primary
                </Button>
                <Button variant="soft" color="neutral">
                  Neutral
                </Button>
                <Button variant="soft" color="success">
                  Success
                </Button>
                <Button variant="soft" color="warning">
                  Warning
                </Button>
                <Button variant="soft" color="danger">
                  Danger
                </Button>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Usage Guidelines" id="usage">
          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                When to Use Each Variant
              </Typography>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Variant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Use For
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Avoid For
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                        Solid
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-700">
                        Primary CTAs, critical alerts, active states
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-700">
                        Multiple items in a row (creates visual noise)
                      </td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                        Soft
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-700">
                        Default buttons, status badges, form fields
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-700">
                        When you need maximum contrast
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                        Outlined
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-700">
                        Secondary actions, containers, grouped items
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-700">
                        Dense layouts (borders add visual weight)
                      </td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                        Plain
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-700">
                        Inline actions, subtle indicators, dense lists
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-700">
                        When you need clear visual boundaries
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Combining Variants
              </Typography>
              <Typography level="body-sm" className="mb-3">
                Mix variants to create hierarchy. For example, use solid for the
                primary action and soft/outlined for secondary actions.
              </Typography>
              <div className="flex gap-3">
                <Button variant="solid" color="primary">
                  Confirm Purchase
                </Button>
                <Button variant="outlined" color="neutral">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Implementation" id="implementation">
          <Typography level="body-sm" className="mb-4">
            All variants are defined in the Sheet component and reused across
            the component library via the <code className="font-mono text-sm">sheetVariants</code> CVA
            function.
          </Typography>

          <CodeBlock language="tsx" code={`import { Sheet, Button, Badge } from '@base-joy/ui-styled';

// All support the same variant prop
<Sheet variant="soft" color="primary">
  <Button variant="solid" color="primary">
    Action
  </Button>
  <Badge variant="outlined" color="success">
    Status
  </Badge>
</Sheet>

// Variants work with all colors
<Button variant="soft" color="warning">Warning</Button>
<Button variant="soft" color="danger">Danger</Button>
<Button variant="soft" color="success">Success</Button>`} />

          <Typography level="body-sm" weight="semibold" className="mt-6 mb-2">
            Custom Components
          </Typography>
          <Typography level="body-sm" className="mb-3">
            You can reuse the variant system in your own components by using the{' '}
            <code className="font-mono text-sm">sheetVariants</code> function.
          </Typography>

          <CodeBlock language="tsx" code={`import { sheetVariants } from '@base-joy/ui-styled';
import { cn } from '@base-joy/utils';

function MyCustomComponent({ variant, color, className, ...props }) {
  return (
    <div
      className={cn(
        sheetVariants({ variant, color }),
        'custom-styles',
        className
      )}
      {...props}
    />
  );
}`} />
        </Section>

        <Section title="Design Principles" id="principles">
          <ul className="space-y-3 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <strong>Consistency:</strong> The same variant behaves identically
                across all components
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Predictability:</strong> Users learn the variant system
                once and understand it everywhere
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Accessibility:</strong> All variants maintain WCAG
                compliance automatically via color inversion
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Flexibility:</strong> Four variants provide enough
                options without overwhelming choice
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Scalability:</strong> New components automatically gain
                variant support by using Sheet/sheetVariants
              </Typography>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
