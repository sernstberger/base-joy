import { Typography, Button } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';
import { CodeBlock } from '@base-joy/ui-styled';

export function AutomaticAdjustmentPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Automatic Adjustment"
        description="Components automatically adapt their size and styling based on parent context, reducing the need for manual prop configuration."
      />

      <div className="space-y-12">
        <Section title="Overview" id="overview">
          <Typography level="body-sm" className="mb-4">
            Automatic adjustment allows components to inherit properties like
            size from their parent containers, creating a more cohesive design
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

        <Section title="Current Implementation" id="current-implementation">
          <Typography level="body-sm" className="mb-4">
            Base Joy currently implements size props on individual components
            but does not yet support automatic propagation through context.
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Size Props Available
              </Typography>
              <Typography level="body-sm" className="mb-3">
                Most components support <code className="font-mono text-sm">sm</code>,{' '}
                <code className="font-mono text-sm">md</code>, and{' '}
                <code className="font-mono text-sm">lg</code> sizes:
              </Typography>
              <div className="flex items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Manual Size Configuration (Current)
              </Typography>
              <CodeBlock language="tsx" code={`<Sheet variant="soft" color="neutral" size="lg">
  <Typography level="body-lg">Large container</Typography>
  <Button size="lg">Button must specify size="lg"</Button>
  <Input size="lg" placeholder="Input must specify size='lg'" />
</Sheet>`} />
            </div>
          </div>
        </Section>

        <Section title="Planned: Automatic Size Inheritance" id="planned">
          <Typography level="body-sm" className="mb-4">
            In a future update, components will automatically inherit size from
            parent context, similar to Joy UI's implementation.
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Future API (Planned)
              </Typography>
              <CodeBlock language="tsx" code={`// Parent sets size context
<Sheet variant="soft" color="neutral" size="lg">
  <Typography level="body-lg">Large container</Typography>
  {/* These components automatically inherit size="lg" */}
  <Button>Auto-sized button</Button>
  <Input placeholder="Auto-sized input" />
</Sheet>

// Or use a SizeProvider for complex layouts
<SizeProvider size="sm">
  <div className="form-section">
    <Input placeholder="Small input" />
    <Button>Small button</Button>
    <Select>
      <option>Small select</option>
    </Select>
  </div>
</SizeProvider>`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Override When Needed
              </Typography>
              <CodeBlock language="tsx" code={`<Sheet size="lg">
  {/* Inherits lg */}
  <Button>Large button</Button>

  {/* Override to md */}
  <Button size="md">Medium button</Button>
</Sheet>`} />
            </div>
          </div>
        </Section>

        <Section title="How It Will Work" id="how-it-works">
          <Typography level="body-sm" className="mb-4">
            The automatic size adjustment will be implemented using React
            Context, similar to how Typography already inherits color.
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Implementation Approach
              </Typography>
              <ul className="space-y-2 ml-6 list-disc">
                <li>
                  <Typography level="body-sm">
                    <strong>SizeContext:</strong> React context provides size to
                    descendant components
                  </Typography>
                </li>
                <li>
                  <Typography level="body-sm">
                    <strong>SizeProvider:</strong> Component that sets size
                    context for its children
                  </Typography>
                </li>
                <li>
                  <Typography level="body-sm">
                    <strong>useSize hook:</strong> Components read from context
                    as fallback when size prop not provided
                  </Typography>
                </li>
                <li>
                  <Typography level="body-sm">
                    <strong>Container components:</strong> Sheet, Card, and
                    other containers provide size context automatically
                  </Typography>
                </li>
              </ul>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Planned Implementation (Pseudocode)
              </Typography>
              <CodeBlock language="tsx" code={`// SizeContext.tsx
const SizeContext = createContext<Size | undefined>(undefined);

export function SizeProvider({ size, children }) {
  return (
    <SizeContext.Provider value={size}>
      {children}
    </SizeContext.Provider>
  );
}

export function useSize(explicitSize?: Size): Size {
  const contextSize = useContext(SizeContext);
  // Explicit prop takes precedence over context
  return explicitSize ?? contextSize ?? 'md'; // 'md' is default
}

// Button.tsx
export function Button({ size, ...props }: ButtonProps) {
  const resolvedSize = useSize(size);
  return (
    <BaseButton
      className={buttonVariants({ size: resolvedSize })}
      {...props}
    />
  );
}

// Sheet.tsx
export function Sheet({ size = 'md', children, ...props }: SheetProps) {
  return (
    <SizeProvider size={size}>
      <div className={sheetVariants({ size })} {...props}>
        {children}
      </div>
    </SizeProvider>
  );
}`} />
            </div>
          </div>
        </Section>

        <Section title="Use Cases" id="use-cases">
          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Form Layouts
              </Typography>
              <Typography level="body-sm" className="mb-3">
                Set size once on the form container, all inputs inherit:
              </Typography>
              <CodeBlock language="tsx" code={`<Sheet size="sm" className="space-y-3">
  <Input placeholder="Email" />
  <Input placeholder="Password" type="password" />
  <Button>Submit</Button>
  {/* All components automatically use size="sm" */}
</Sheet>`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Card Density
              </Typography>
              <Typography level="body-sm" className="mb-3">
                Create compact or spacious cards by changing one prop:
              </Typography>
              <CodeBlock language="tsx" code={`<Card size="sm">
  <Typography level="body-sm">Compact card</Typography>
  <Button>Action</Button>
  <Badge>Status</Badge>
</Card>

<Card size="lg">
  <Typography level="body-lg">Spacious card</Typography>
  <Button>Action</Button>
  <Badge>Status</Badge>
</Card>`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Responsive Design
              </Typography>
              <Typography level="body-sm" className="mb-3">
                Change size based on viewport with a single prop:
              </Typography>
              <CodeBlock language="tsx" code={`const size = useMediaQuery('(min-width: 768px)') ? 'lg' : 'sm';

<Sheet size={size}>
  {/* All children adapt to viewport size */}
  <Input />
  <Button />
  <Select />
</Sheet>`} />
            </div>
          </div>
        </Section>

        <Section title="Migration Path" id="migration">
          <Typography level="body-sm" className="mb-4">
            When automatic size adjustment is implemented, it will be
            backward-compatible. Existing code will continue to work, but you'll
            be able to remove redundant size props.
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Before (Current)
              </Typography>
              <CodeBlock language="tsx" code={`<Sheet size="lg">
  <Input size="lg" />
  <Button size="lg">Submit</Button>
  <Select size="lg">...</Select>
</Sheet>`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                After (Future)
              </Typography>
              <CodeBlock language="tsx" code={`<Sheet size="lg">
  {/* Size props can be removed - inherited from Sheet */}
  <Input />
  <Button>Submit</Button>
  <Select>...</Select>
</Sheet>`} />
            </div>
          </div>
        </Section>

        <Section title="Tracking" id="tracking">
          <Typography level="body-sm" className="mb-3">
            This feature is planned for implementation. Track progress in:
          </Typography>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                GitHub Issue:{' '}
                <a
                  href="https://github.com/sernstberger/base-joy/issues/29"
                  className="text-primary-700 hover:underline"
                >
                  #29 - Complete Automatic Size Adjustment
                </a>
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                Roadmap: Phase 1 (Q1 2025) in MISSING_FEATURES.md
              </Typography>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
