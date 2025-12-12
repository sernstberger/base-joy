import {
  Sheet,
  Typography,
  Button,
  Badge,
  Input,
  Checkbox,
  Radio,
  Toggle,
  CodeBlock,
} from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';

export function ColorContextPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Color Context"
        description="Automatic color inheritance and variant inversion for nested components. Children inherit the parent Sheet's color and automatically adjust variants for contrast on solid backgrounds."
      />

      <div className="space-y-12">
        <Section title="Overview" id="overview">
          <Typography level="body-sm" className="mb-4">
            Color Context enables automatic color propagation from parent
            containers to child components. When components are nested inside a
            Sheet, they inherit the parent's color and automatically adjust
            their variant for optimal contrast on solid backgrounds.
          </Typography>

          <Typography level="body-sm" weight="semibold" className="mb-2">
            Key Features
          </Typography>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <strong>Color Inheritance:</strong> Child components
                automatically use the parent Sheet's color
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Variant Inversion:</strong> Components inside solid
                containers automatically switch to contrast-friendly variants
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Explicit Override:</strong> Props always take precedence
                over context values
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Minimal Overhead:</strong> Memoized context values
                prevent unnecessary re-renders
              </Typography>
            </li>
          </ul>
        </Section>

        <Section title="Color Inheritance" id="color-inheritance">
          <Typography level="body-sm" className="mb-4">
            When components are placed inside a Sheet, they automatically
            inherit the Sheet's color. This eliminates the need to manually pass
            color props to every nested component.
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Without Color Context (Manual)
              </Typography>
              <CodeBlock
                language="tsx"
                code={`// Every component needs explicit color props
<Sheet variant="soft" color="primary">
  <Button color="primary">Button</Button>
  <Badge color="primary">Badge</Badge>
  <Input color="primary" placeholder="Input" />
</Sheet>`}
              />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                With Color Context (Automatic)
              </Typography>
              <CodeBlock
                language="tsx"
                code={`// Children inherit color automatically
<Sheet variant="soft" color="primary">
  <Button>Button</Button>
  <Badge>Badge</Badge>
  <Input placeholder="Input" />
</Sheet>`}
              />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Live Example
              </Typography>
              <div className="flex flex-wrap gap-6">
                <Sheet variant="soft" color="primary" className="space-y-3">
                  <Typography level="body-sm" weight="medium">
                    Primary Sheet
                  </Typography>
                  <div className="flex gap-2">
                    <Button size="sm">Button</Button>
                    <Badge>Badge</Badge>
                  </div>
                  <Input placeholder="Inherited primary" />
                </Sheet>

                <Sheet variant="soft" color="success" className="space-y-3">
                  <Typography level="body-sm" weight="medium">
                    Success Sheet
                  </Typography>
                  <div className="flex gap-2">
                    <Button size="sm">Button</Button>
                    <Badge>Badge</Badge>
                  </div>
                  <Input placeholder="Inherited success" />
                </Sheet>

                <Sheet variant="soft" color="danger" className="space-y-3">
                  <Typography level="body-sm" weight="medium">
                    Danger Sheet
                  </Typography>
                  <div className="flex gap-2">
                    <Button size="sm">Button</Button>
                    <Badge>Badge</Badge>
                  </div>
                  <Input placeholder="Inherited danger" />
                </Sheet>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Variant Inversion" id="variant-inversion">
          <Typography level="body-sm" className="mb-4">
            When components are placed inside a <strong>solid</strong> Sheet,
            their variants are automatically inverted to ensure proper contrast.
            This prevents solid-on-solid combinations that would have poor
            visibility.
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Inversion Rules
              </Typography>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Default Variant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Inside Solid
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        solid
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        plain
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        Avoid solid-on-solid
                      </td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        soft
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        plain
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        Soft bg won't contrast
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        outlined
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        outlined
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        White borders work
                      </td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        plain
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        plain
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        Already contrast-friendly
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Live Example - Buttons Inside Solid Sheet
              </Typography>
              <Typography level="body-sm" className="mb-4">
                Notice how Button (default variant: solid) automatically becomes
                plain inside the solid Sheet.
              </Typography>
              <div className="flex flex-wrap gap-6">
                <Sheet variant="solid" color="primary" className="space-y-3">
                  <Typography level="body-sm" weight="medium">
                    Solid Primary Sheet
                  </Typography>
                  <div className="flex gap-2">
                    <Button size="sm">Inverted Button</Button>
                    <Badge>Inverted Badge</Badge>
                  </div>
                  <Typography level="body-xs" className="opacity-80">
                    Buttons become plain (white text, transparent bg)
                  </Typography>
                </Sheet>

                <Sheet variant="solid" color="success" className="space-y-3">
                  <Typography level="body-sm" weight="medium">
                    Solid Success Sheet
                  </Typography>
                  <div className="flex gap-2">
                    <Button size="sm">Inverted Button</Button>
                    <Badge>Inverted Badge</Badge>
                  </div>
                  <Typography level="body-xs" className="opacity-80">
                    Hover to see white/10 background
                  </Typography>
                </Sheet>

                <Sheet variant="solid" color="danger" className="space-y-3">
                  <Typography level="body-sm" weight="medium">
                    Solid Danger Sheet
                  </Typography>
                  <div className="flex gap-2">
                    <Button size="sm">Inverted Button</Button>
                    <Badge>Inverted Badge</Badge>
                  </div>
                </Sheet>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Explicit Override" id="explicit-override">
          <Typography level="body-sm" className="mb-4">
            Explicit props always take precedence over context values. This
            allows you to break out of the inherited styling when needed.
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Override Color
              </Typography>
              <CodeBlock
                language="tsx"
                code={`<Sheet variant="soft" color="primary">
  <Button>Inherits primary</Button>
  <Button color="danger">Explicitly danger</Button>
</Sheet>`}
              />
              <div className="mt-4">
                <Sheet variant="soft" color="primary" className="space-y-3">
                  <Typography level="body-sm">Primary Sheet</Typography>
                  <div className="flex gap-2">
                    <Button size="sm">Inherits primary</Button>
                    <Button size="sm" color="danger">
                      Explicitly danger
                    </Button>
                  </div>
                </Sheet>
              </div>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Override Variant
              </Typography>
              <CodeBlock
                language="tsx"
                code={`<Sheet variant="solid" color="primary">
  <Button>Inverted to plain</Button>
  <Button variant="outlined">Explicitly outlined</Button>
</Sheet>`}
              />
              <div className="mt-4">
                <Sheet variant="solid" color="primary" className="space-y-3">
                  <Typography level="body-sm">Solid Primary Sheet</Typography>
                  <div className="flex gap-2">
                    <Button size="sm">Inverted to plain</Button>
                    <Button size="sm" variant="outlined">
                      Explicitly outlined
                    </Button>
                  </div>
                </Sheet>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Supported Components" id="supported-components">
          <Typography level="body-sm" className="mb-4">
            The following components support Color Context inheritance:
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Interactive Components
              </Typography>
              <Sheet variant="soft" color="success" className="space-y-4">
                <div className="flex flex-wrap gap-3 items-center">
                  <Button size="sm">Button</Button>
                  <Badge>Badge</Badge>
                  <Toggle aria-label="Toggle" size="sm" />
                </div>
              </Sheet>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Form Components
              </Typography>
              <Sheet variant="soft" color="primary" className="space-y-3">
                <Input placeholder="Input inherits primary" />
                <div className="flex gap-4">
                  <Checkbox.Root aria-label="Checkbox">
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  <Radio.Root aria-label="Radio" value="example">
                    <Radio.Indicator />
                  </Radio.Root>
                </div>
              </Sheet>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-3">
                Inside Solid Container
              </Typography>
              <Sheet variant="solid" color="warning" className="space-y-3">
                <Typography level="body-sm">
                  All components auto-invert
                </Typography>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button size="sm">Button</Button>
                  <Badge>Badge</Badge>
                  <Toggle aria-label="Toggle" size="sm" />
                </div>
              </Sheet>
            </div>
          </div>
        </Section>

        <Section title="Implementation" id="implementation">
          <Typography level="body-sm" className="mb-4">
            Color Context is implemented using React Context and a custom hook.
            The context is provided by Sheet and consumed by child components.
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                ColorContext Structure
              </Typography>
              <CodeBlock
                language="tsx"
                code={`interface ColorContextValue {
  color: ColorScale;           // Inherited color (primary, neutral, etc.)
  isInsideSolid: boolean;      // Whether inside a solid container
  parentVariant: Variant;      // Parent's variant for reference
}`}
              />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Using the Hook
              </Typography>
              <CodeBlock
                language="tsx"
                code={`import { useResolvedColorProps } from '@base-joy/ui-styled';

function MyComponent({ color, variant, ...props }) {
  // Hook resolves color/variant from context if not explicit
  const { color: resolvedColor, variant: resolvedVariant, isInsideSolid } =
    useResolvedColorProps(
      color,      // explicit color prop (or undefined)
      variant,    // explicit variant prop (or undefined)
      'neutral',  // default color
      'soft'      // default variant
    );

  return (
    <div className={myVariants({ color: resolvedColor, variant: resolvedVariant })}>
      {/* content */}
    </div>
  );
}`}
              />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Solid Container Styles
              </Typography>
              <CodeBlock
                language="tsx"
                code={`import { getSolidContainerStyles } from '@base-joy/ui-styled';

// Apply these styles when isInsideSolid is true
const className = cn(
  baseStyles,
  isInsideSolid && getSolidContainerStyles(variant, interactive)
);

// Solid container styles include:
// - text-white bg-transparent (for plain variant)
// - hover:bg-white/10 active:bg-white/20 (for interactive elements)
// - border-white/70 (for outlined variant)`}
              />
            </div>
          </div>
        </Section>

        <Section title="Best Practices" id="best-practices">
          <ul className="space-y-3 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <strong>Let colors inherit:</strong> Don't set explicit color
                props unless you need to override the inherited value
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Trust variant inversion:</strong> The automatic variant
                switching ensures proper contrast - avoid manual overrides
                unless necessary
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Use Sheet as container:</strong> Sheet is the only
                provider of color context. Card, Toast, and other containers
                wrap Sheet internally
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Override when needed:</strong> Explicit props always win
                - use them when you need to break out of inherited styling
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Test solid containers:</strong> When building custom
                components, test inside solid Sheets to ensure proper inversion
              </Typography>
            </li>
          </ul>
        </Section>

        <Section title="Related" id="related">
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <a
                  href="/features/color-inversion"
                  className="text-primary-700 hover:underline"
                >
                  Color Inversion
                </a>{' '}
                - CSS-based text color adjustments for WCAG compliance
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <a
                  href="/features/automatic-adjustment"
                  className="text-primary-700 hover:underline"
                >
                  Automatic Adjustment
                </a>{' '}
                - Planned size inheritance feature
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <a
                  href="/styled/sheet"
                  className="text-primary-700 hover:underline"
                >
                  Sheet Component
                </a>{' '}
                - The foundation component that provides color context
              </Typography>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
