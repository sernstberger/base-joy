import {
  Typography,
  Button,
  Sheet,
  Input,
  Badge,
  Checkbox,
  CodeBlock,
} from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';

export function AutomaticAdjustmentPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Automatic Adjustment"
        description="Components automatically inherit size from parent context, reducing the need for manual prop configuration."
      />

      <div className="space-y-12">
        <Section title="Overview" id="overview">
          <Typography level="body-sm" className="mb-4">
            Automatic size adjustment allows components to inherit the{' '}
            <code className="font-mono text-sm">size</code> prop from their
            parent containers (like Sheet), creating a more cohesive design
            system with less manual configuration.
          </Typography>

          <Typography level="body-sm" weight="semibold" className="mb-2">
            Benefits
          </Typography>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <strong>Consistency:</strong> Child components automatically
                match parent sizing
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Less Code:</strong> No need to pass size props to every
                nested component
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Flexibility:</strong> Override inherited values when
                needed
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Maintainability:</strong> Change parent size to update
                all children
              </Typography>
            </li>
          </ul>
        </Section>

        <Section
          title="Size Inheritance"
          id="size-inheritance"
          code={`<Sheet size="sm">
  {/* All components inherit size="sm" */}
  <Button>Small button</Button>
  <Input placeholder="Small input" />
  <Badge>Small badge</Badge>
</Sheet>

<Sheet size="lg">
  {/* All components inherit size="lg" */}
  <Button>Large button</Button>
  <Input placeholder="Large input" />
  <Badge>Large badge</Badge>
</Sheet>`}
        >
          <Typography level="body-sm" className="mb-4">
            When a Sheet has a <code className="font-mono text-sm">size</code>{' '}
            prop, all child components automatically inherit that size.
          </Typography>

          <div className="space-y-4">
            <Sheet size="sm" variant="soft" color="neutral" className="p-4">
              <Typography level="body-sm" weight="semibold" className="mb-3">
                size="sm"
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Button</Button>
                <Input placeholder="Input" className="w-40" />
                <Badge>Badge</Badge>
              </div>
            </Sheet>

            <Sheet size="md" variant="soft" color="neutral" className="p-4">
              <Typography level="body-sm" weight="semibold" className="mb-3">
                size="md" (default)
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Button</Button>
                <Input placeholder="Input" className="w-40" />
                <Badge>Badge</Badge>
              </div>
            </Sheet>

            <Sheet size="lg" variant="soft" color="neutral" className="p-4">
              <Typography level="body-sm" weight="semibold" className="mb-3">
                size="lg"
              </Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Button</Button>
                <Input placeholder="Input" className="w-40" />
                <Badge>Badge</Badge>
              </div>
            </Sheet>
          </div>
        </Section>

        <Section
          title="Override When Needed"
          id="override"
          code={`<Sheet size="lg">
  {/* Inherits lg */}
  <Button>Large button</Button>

  {/* Explicit size overrides context */}
  <Button size="sm">Small button</Button>
</Sheet>`}
        >
          <Typography level="body-sm" className="mb-4">
            You can always override the inherited size by setting an explicit{' '}
            <code className="font-mono text-sm">size</code> prop on any
            component. Explicit props take precedence over context.
          </Typography>

          <Sheet size="lg" variant="soft" color="neutral" className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Large (inherited)</Button>
              <Button size="sm">Small (explicit)</Button>
              <Button size="md">Medium (explicit)</Button>
            </div>
          </Sheet>
        </Section>

        <Section
          title="Form Layouts"
          id="form-layouts"
          code={`<Sheet size="sm" className="space-y-3 p-4">
  <Input placeholder="Email" />
  <Input placeholder="Password" type="password" />
  <Checkbox.Root>
    <Checkbox.Indicator />
    Remember me
  </Checkbox.Root>
  <Button className="w-full">Sign in</Button>
</Sheet>`}
        >
          <Typography level="body-sm" className="mb-4">
            Set size once on the form container, and all inputs inherit:
          </Typography>

          <div className="flex gap-6">
            <Sheet size="sm" variant="outlined" color="neutral" className="p-4 space-y-3 flex-1">
              <Typography level="body-sm" weight="semibold" className="mb-1">
                Compact Form (sm)
              </Typography>
              <Input placeholder="Email" />
              <Input placeholder="Password" type="password" />
              <div className="flex items-center gap-2">
                <Checkbox.Root>
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <Typography level="body-sm">Remember me</Typography>
              </div>
              <Button className="w-full">Sign in</Button>
            </Sheet>

            <Sheet size="lg" variant="outlined" color="neutral" className="p-4 space-y-3 flex-1">
              <Typography level="body-sm" weight="semibold" className="mb-1">
                Spacious Form (lg)
              </Typography>
              <Input placeholder="Email" />
              <Input placeholder="Password" type="password" />
              <div className="flex items-center gap-2">
                <Checkbox.Root>
                  <Checkbox.Indicator />
                </Checkbox.Root>
                <Typography level="body-sm">Remember me</Typography>
              </div>
              <Button className="w-full">Sign in</Button>
            </Sheet>
          </div>
        </Section>

        <Section title="How It Works" id="how-it-works">
          <Typography level="body-sm" className="mb-4">
            Size inheritance is implemented using React Context, following the
            same pattern as ColorContext for automatic color adjustment.
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Resolution Order
              </Typography>
              <Typography level="body-sm" className="mb-3">
                Size is resolved in this order of priority:
              </Typography>
              <ol className="space-y-2 ml-6 list-decimal">
                <li>
                  <Typography level="body-sm">
                    <strong>Explicit prop:</strong> If a component has a size
                    prop set directly, that value is used
                  </Typography>
                </li>
                <li>
                  <Typography level="body-sm">
                    <strong>Context:</strong> If no explicit prop, check
                    SizeContext from parent Sheet
                  </Typography>
                </li>
                <li>
                  <Typography level="body-sm">
                    <strong>Default:</strong> If no context, use the
                    component's default (usually "md")
                  </Typography>
                </li>
              </ol>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Implementation
              </Typography>
              <CodeBlock
                language="tsx"
                code={`// SizeContext provides size to descendant components
const SizeContext = React.createContext<{ size: Size } | null>(null);

// Hook resolves size: explicit > context > default
function useResolvedSizeProps(explicitSize?: Size, defaultSize: Size = 'md'): Size {
  const ctx = useSizeContext();
  return explicitSize ?? ctx?.size ?? defaultSize;
}

// Sheet provides SizeContext when size is set
function Sheet({ size, children, ...props }) {
  return (
    <SizeContext.Provider value={size ? { size } : null}>
      <div {...props}>{children}</div>
    </SizeContext.Provider>
  );
}

// Components use the hook to resolve their size
function Button({ size: sizeProp, ...props }) {
  const size = useResolvedSizeProps(sizeProp, 'md');
  return <BaseButton className={buttonVariants({ size })} {...props} />;
}`}
              />
            </div>
          </div>
        </Section>

        <Section title="Supported Components" id="supported-components">
          <Typography level="body-sm" className="mb-4">
            The following components support automatic size inheritance from
            parent Sheet:
          </Typography>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'Avatar',
              'Badge',
              'Button',
              'Card',
              'Checkbox',
              'CheckboxGroup',
              'Combobox',
              'ColorSchemeToggle',
              'Field',
              'Fieldset',
              'Input',
              'Item',
              'List',
              'NavList',
              'NumberField',
              'Radio',
              'RadioGroup',
              'Select',
              'Slider',
              'Switch',
              'Table',
              'Textarea',
              'Toast',
              'Toggle',
              'ToggleGroup',
              'Accordion',
              'Autocomplete',
            ].map((component) => (
              <div
                key={component}
                className="px-3 py-1.5 bg-neutral-50 rounded text-sm"
              >
                {component}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Using SizeContext Directly" id="size-context">
          <Typography level="body-sm" className="mb-4">
            For custom components, you can use the{' '}
            <code className="font-mono text-sm">useSizeContext</code> hook or{' '}
            <code className="font-mono text-sm">useResolvedSizeProps</code> hook
            to participate in size inheritance.
          </Typography>

          <CodeBlock
            language="tsx"
            code={`import { useSizeContext, useResolvedSizeProps } from '@base-joy/ui-styled';

// Option 1: Get context directly
function MyComponent({ size: sizeProp }) {
  const ctx = useSizeContext();
  const size = sizeProp ?? ctx?.size ?? 'md';
  // ... use size
}

// Option 2: Use the convenience hook (recommended)
function MyComponent({ size: sizeProp }) {
  const size = useResolvedSizeProps(sizeProp, 'md');
  // ... use size
}`}
          />
        </Section>
      </div>
    </div>
  );
}
