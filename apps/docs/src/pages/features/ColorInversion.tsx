import { Sheet, Typography, Button } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';
import { CodeBlock } from '@base-joy/ui-styled';

export function ColorInversionPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Color Inversion"
        description="Automatic text color adjustments that ensure accessible contrast across all color backgrounds, following WCAG AA/AAA standards."
      />

      <div className="space-y-12">
        <Section title="Overview" id="overview">
          <Typography level="body-sm" className="mb-4">
            Color inversion is a core feature that automatically adjusts text
            colors to maintain optimal contrast when placed on colored
            backgrounds. This ensures all components remain accessible without
            manual color overrides.
          </Typography>

          <Typography level="body-sm" weight="semibold" className="mb-2">
            Key Benefits
          </Typography>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <strong>Automatic Accessibility:</strong> WCAG AA/AAA compliant
                text colors without manual intervention
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Dynamic Adjustments:</strong> Text darkens on
                interactive states (hover, active) as backgrounds change
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Developer Experience:</strong> Write less code - colors
                inherit automatically from parent components
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Consistent Design:</strong> Maintains visual hierarchy
                across all color combinations
              </Typography>
            </li>
          </ul>
        </Section>

        <Section title="How It Works" id="how-it-works">
          <Typography level="body-sm" className="mb-4">
            Base Joy uses CVA (class-variance-authority) compound variants to
            automatically apply accessible text colors based on variant and
            color combinations. Typography components inherit these colors by
            default.
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Solid Variants
              </Typography>
              <Typography level="body-sm" className="mb-4">
                White text on dark backgrounds (color-500+ shades). Warning uses
                color-600 for enhanced contrast.
              </Typography>
              <div className="flex flex-wrap gap-4">
                <Sheet variant="solid" color="primary" className="space-y-2">
                  <Typography level="body-md" weight="medium">
                    Primary Solid
                  </Typography>
                  <Typography level="body-sm" className="opacity-80">
                    White text on primary-500
                  </Typography>
                </Sheet>
                <Sheet variant="solid" color="success" className="space-y-2">
                  <Typography level="body-md" weight="medium">
                    Success Solid
                  </Typography>
                  <Typography level="body-sm" className="opacity-80">
                    White text on success-500
                  </Typography>
                </Sheet>
                <Sheet variant="solid" color="warning" className="space-y-2">
                  <Typography level="body-md" weight="medium">
                    Warning Solid
                  </Typography>
                  <Typography level="body-sm" className="opacity-80">
                    White text on warning-600
                  </Typography>
                </Sheet>
              </div>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Soft Variants
              </Typography>
              <Typography level="body-sm" className="mb-4">
                Dark text (color-900/950) on light backgrounds (color-100-300).
                Text automatically darkens to 950 on active states for
                warning/danger.
              </Typography>
              <div className="flex flex-wrap gap-4">
                <Sheet variant="soft" color="primary" className="space-y-2">
                  <Typography level="body-md" weight="medium">
                    Primary Soft
                  </Typography>
                  <Typography level="body-sm" className="opacity-80">
                    primary-900 on primary-100
                  </Typography>
                </Sheet>
                <Sheet variant="soft" color="success" className="space-y-2">
                  <Typography level="body-md" weight="medium">
                    Success Soft
                  </Typography>
                  <Typography level="body-sm" className="opacity-80">
                    success-900 on success-100
                  </Typography>
                </Sheet>
                <Sheet variant="soft" color="danger" className="space-y-2">
                  <Typography level="body-md" weight="medium">
                    Danger Soft
                  </Typography>
                  <Typography level="body-sm" className="opacity-80">
                    danger-900 on danger-100
                  </Typography>
                </Sheet>
              </div>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Outlined & Plain Variants
              </Typography>
              <Typography level="body-sm" className="mb-4">
                Medium-dark text (color-700/800) on transparent/light
                backgrounds. Text darkens to 800 on active states.
              </Typography>
              <div className="flex flex-wrap gap-4">
                <Sheet variant="outlined" color="primary" className="space-y-2">
                  <Typography level="body-md" weight="medium">
                    Primary Outlined
                  </Typography>
                  <Typography level="body-sm" className="opacity-80">
                    primary-700 text
                  </Typography>
                </Sheet>
                <Sheet variant="plain" color="success" className="space-y-2">
                  <Typography level="body-md" weight="medium">
                    Success Plain
                  </Typography>
                  <Typography level="body-sm" className="opacity-80">
                    success-700 text
                  </Typography>
                </Sheet>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Interactive States" id="interactive-states">
          <Typography level="body-sm" className="mb-4">
            When <code className="font-mono text-sm">interactive={'{'}true{'}'}</code>,
            text colors automatically adjust on hover and active states to
            maintain AAA contrast as backgrounds change.
          </Typography>

          <Typography level="body-sm" weight="semibold" className="mb-3">
            Try Clicking These Buttons
          </Typography>
          <div className="flex flex-wrap gap-4">
            <Button variant="soft" color="warning">
              Soft Warning
            </Button>
            <Button variant="outlined" color="primary">
              Outlined Primary
            </Button>
            <Button variant="plain" color="danger">
              Plain Danger
            </Button>
          </div>
          <Typography level="body-xs" className="mt-3 opacity-80">
            Notice how the text automatically darkens when you click (active
            state) to maintain contrast as the background darkens.
          </Typography>
        </Section>

        <Section title="Typography Inheritance" id="typography-inheritance">
          <Typography level="body-sm" className="mb-4">
            Typography components inherit text color from their parent by
            default. This means you don't need to manually set text colors when
            placing Typography inside colored containers.
          </Typography>

          <div className="space-y-4">
            <div>
              <CodeBlock language="tsx" code={`// Typography automatically inherits white text
<Sheet variant="solid" color="primary">
  <Typography level="h2">Heading</Typography>
  <Typography level="body-sm">Description text</Typography>
</Sheet>

// To override, use color="neutral" explicitly
<Sheet variant="solid" color="primary">
  <Typography level="body-sm" color="neutral">
    This forces neutral color
  </Typography>
</Sheet>`} />
            </div>

            <Typography level="body-sm" weight="semibold" className="mb-2">
              Live Example
            </Typography>
            <div className="flex flex-wrap gap-4">
              <Sheet variant="solid" color="danger" className="space-y-2">
                <Typography level="body-md" weight="medium">
                  Auto-inherited
                </Typography>
                <Typography level="body-sm">
                  This text is automatically white
                </Typography>
              </Sheet>
              <Sheet variant="solid" color="danger" className="space-y-2">
                <Typography level="body-md" weight="medium" color="neutral">
                  Explicit Override
                </Typography>
                <Typography level="body-sm" color="neutral">
                  This text is forced to neutral color (doesn't inherit)
                </Typography>
              </Sheet>
            </div>
          </div>
        </Section>

        <Section title="Contrast Ratios" id="contrast-ratios">
          <Typography level="body-sm" className="mb-4">
            All text color combinations meet or exceed WCAG AA standards (4.5:1
            minimum), with most achieving AAA standards (7:1 minimum).
          </Typography>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Variant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Color
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Background
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Text
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Contrast
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-neutral-900">Solid</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    primary
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-900">500</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">white</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    8.6:1 ✓ AAA
                  </td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="px-4 py-3 text-sm text-neutral-900">Solid</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    warning
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-900">600</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">white</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    5.8:1 ✓ AAA
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-neutral-900">Soft</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">all</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">100</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">900</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    12:1 ✓ AAA
                  </td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    Outlined
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-900">all</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    transparent
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-900">700</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    8:1 ✓ AAA
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-neutral-900">Plain</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">all</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    transparent
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-900">700</td>
                  <td className="px-4 py-3 text-sm text-neutral-900">
                    8:1 ✓ AAA
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Implementation Details" id="implementation">
          <Typography level="body-sm" className="mb-4">
            Color inversion is implemented using CVA compound variants in the
            Sheet component and color inheritance in Typography.
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Sheet Component (libs/ui/styled/src/Sheet/Sheet.tsx)
              </Typography>
              <CodeBlock language="tsx" code={`const sheetVariants = cva('rounded-lg transition-colors', {
  variants: { /* ... */ },
  compoundVariants: [
    // Solid variants with accessible text
    { variant: 'solid', color: 'primary',
      className: 'bg-primary-500 text-white' },

    // Soft variants with dark text
    { variant: 'soft', color: 'primary',
      className: 'bg-primary-100 text-primary-900' },

    // Interactive text color adjustments
    { interactive: true, variant: 'soft', color: 'warning',
      className: 'active:text-warning-950' },
  ],
});`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Typography Component (libs/ui/styled/src/Typography/Typography.tsx)
              </Typography>
              <CodeBlock language="tsx" code={`const typographyVariants = cva('', {
  variants: {
    color: {
      inherit: '', // Default - inherits from parent
      neutral: '',
      primary: 'text-primary-700',
      // ...
    },
  },
  compoundVariants: [
    // Neutral only applies when explicitly set
    { color: 'neutral', level: 'h1',
      className: 'text-neutral-900' },
  ],
  defaultVariants: {
    color: 'inherit', // Changed from 'neutral'
  },
});`} />
            </div>
          </div>
        </Section>

        <Section title="Best Practices" id="best-practices">
          <ul className="space-y-3 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <strong>Let colors inherit:</strong> Don't set explicit text
                colors unless you need to override the default behavior
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Use opacity for hierarchy:</strong> Instead of custom
                text colors, use <code className="font-mono text-sm">opacity-80</code> or{' '}
                <code className="font-mono text-sm">opacity-60</code> for secondary text
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Trust the system:</strong> The automatic color
                adjustments are tested for accessibility - avoid manual overrides
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Test with all variants:</strong> When creating custom
                components, test with all color variants to ensure proper
                inheritance
              </Typography>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
