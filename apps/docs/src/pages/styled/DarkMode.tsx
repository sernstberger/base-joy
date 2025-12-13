import {
  Typography,
  Button,
  Sheet,
  ColorSchemeToggle,
  useColorScheme,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { componentProps } from '../../props';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const toggleControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const toggleCodeTemplate = (props: Record<string, string>) =>
  `<ColorSchemeToggle
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"
/>`;

function ColorSchemeDemo() {
  const { colorScheme, resolvedColorScheme, setColorScheme } = useColorScheme();

  return (
    <Sheet variant="outlined" color="neutral" className="p-4 space-y-4">
      <div className="space-y-2">
        <Typography level="body-sm" weight="semibold">
          Current Settings
        </Typography>
        <div className="flex flex-wrap gap-2">
          <Badge variant="soft" color="neutral">
            Color Scheme: {colorScheme}
          </Badge>
          <Badge variant="soft" color={resolvedColorScheme === 'dark' ? 'neutral' : 'primary'}>
            Resolved: {resolvedColorScheme}
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="soft"
          color="neutral"
          size="sm"
          onClick={() => setColorScheme('light')}
        >
          Set Light
        </Button>
        <Button
          variant="soft"
          color="neutral"
          size="sm"
          onClick={() => setColorScheme('dark')}
        >
          Set Dark
        </Button>
        <Button
          variant="soft"
          color="neutral"
          size="sm"
          onClick={() => setColorScheme('system')}
        >
          Set System
        </Button>
      </div>
    </Sheet>
  );
}

export function DarkModePage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Dark Mode"
        description="Joy UI-inspired dark mode support with automatic color scheme switching, system preference detection, and persistent storage."
      />

      <Section title="Playground" id="playground">
        <Playground controls={toggleControls} codeTemplate={toggleCodeTemplate}>
          {(props) => (
            <ColorSchemeToggle
              variant={props.variant as Variant}
              color={props.color as ColorScale}
              size={props.size as Size}
            />
          )}
        </Playground>
      </Section>

      <Section title="Examples" id="examples">
        <div className="space-y-8">
          <Section
            title="Basic Usage"
            titleLevel="h3"
            id="basic-usage"
            code={`import { ColorSchemeToggle } from '@base-joy/ui-styled';

function App() {
  return <ColorSchemeToggle />;
}`}
          >
            <Typography level="body-sm" className="mb-4">
              The ColorSchemeToggle component provides a simple way to switch between light, dark, and system color schemes.
            </Typography>
            <ColorSchemeToggle />
          </Section>

          <Section
            title="Using the Hook"
            titleLevel="h3"
            id="using-hook"
            code={`import { useColorScheme } from '@base-joy/ui-styled';

function MyComponent() {
  const { colorScheme, resolvedColorScheme, setColorScheme } = useColorScheme();

  return (
    <div>
      <p>Current: {colorScheme}</p>
      <p>Resolved: {resolvedColorScheme}</p>
      <button onClick={() => setColorScheme('dark')}>
        Set Dark
      </button>
    </div>
  );
}`}
          >
            <Typography level="body-sm" className="mb-4">
              Use the <code className="font-mono text-sm">useColorScheme</code> hook to programmatically control the color scheme.
            </Typography>
            <ColorSchemeDemo />
          </Section>

          <Section
            title="Variants and Colors"
            titleLevel="h3"
            id="variants"
            code={`<ColorSchemeToggle variant="solid" />
<ColorSchemeToggle variant="soft" />
<ColorSchemeToggle variant="outlined" />
<ColorSchemeToggle variant="plain" />`}
          >
            <Typography level="body-sm" className="mb-4">
              The ColorSchemeToggle supports all standard variants.
            </Typography>
            <div className="flex flex-wrap gap-4">
              <ColorSchemeToggle variant="solid" />
              <ColorSchemeToggle variant="soft" />
              <ColorSchemeToggle variant="outlined" />
              <ColorSchemeToggle variant="plain" />
            </div>
          </Section>

          <Section
            title="Sizes"
            titleLevel="h3"
            id="sizes"
            code={`<ColorSchemeToggle size="sm" />
<ColorSchemeToggle size="md" />
<ColorSchemeToggle size="lg" />`}
          >
            <Typography level="body-sm" className="mb-4">
              Available in three sizes to fit different layouts.
            </Typography>
            <div className="flex flex-wrap items-center gap-4">
              <ColorSchemeToggle size="sm" />
              <ColorSchemeToggle size="md" />
              <ColorSchemeToggle size="lg" />
            </div>
          </Section>

          <Section
            title="Without System Option"
            titleLevel="h3"
            id="no-system"
            code={`<ColorSchemeToggle showSystemOption={false} />`}
          >
            <Typography level="body-sm" className="mb-4">
              Hide the system option to only allow manual light/dark selection.
            </Typography>
            <ColorSchemeToggle showSystemOption={false} />
          </Section>

          <Section
            title="Color Schemes"
            titleLevel="h3"
            id="colors"
            code={`<ColorSchemeToggle variant="soft" color="primary" />
<ColorSchemeToggle variant="soft" color="success" />
<ColorSchemeToggle variant="soft" color="danger" />`}
          >
            <Typography level="body-sm" className="mb-4">
              Customize the toggle with different color schemes.
            </Typography>
            <div className="flex flex-wrap gap-4">
              <ColorSchemeToggle variant="soft" color="primary" />
              <ColorSchemeToggle variant="soft" color="success" />
              <ColorSchemeToggle variant="soft" color="danger" />
            </div>
          </Section>

          <Section title="Component Showcase" titleLevel="h3" id="showcase">
            <Typography level="body-sm" className="mb-4">
              All components automatically adapt to the current color scheme. Try toggling between light and dark modes to see the changes.
            </Typography>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Card Component</CardTitle>
                    <CardDescription>
                      Cards automatically adjust to the color scheme
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="solid" color="primary" className="w-full">
                      Primary Button
                    </Button>
                  </CardContent>
                </Card>

                <Card variant="soft" color="primary">
                  <CardHeader>
                    <CardTitle>Soft Card</CardTitle>
                    <CardDescription>
                      Soft variants use lighter backgrounds
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outlined" color="primary" className="w-full">
                      Outlined Button
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Sheet variant="outlined" color="neutral" className="p-4">
                <Typography level="body-md" className="mb-3">
                  Color Palette
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="solid" color="primary">Primary</Badge>
                  <Badge variant="solid" color="neutral">Neutral</Badge>
                  <Badge variant="solid" color="success">Success</Badge>
                  <Badge variant="solid" color="warning">Warning</Badge>
                  <Badge variant="solid" color="danger">Danger</Badge>
                </div>
              </Sheet>
            </div>
          </Section>
        </div>
      </Section>

      <Section title="How It Works" id="how-it-works">
        <Typography level="body-sm" className="mb-4">
          Dark mode in Base Joy uses <strong>semantic CSS variables</strong> that automatically swap values based on the <code className="font-mono text-sm">data-color-scheme</code> attribute on the document root.
        </Typography>

        <div className="space-y-4">
          <div>
            <Typography level="body-sm" weight="semibold" className="mb-2">
              Key Features:
            </Typography>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
              <li>Automatic color scheme switching for all components</li>
              <li>System preference detection via <code className="font-mono text-sm">prefers-color-scheme</code></li>
              <li>Persistent storage in localStorage</li>
              <li>SSR-safe implementation with no flash of unstyled content</li>
              <li>WCAG-compliant color contrast ratios in both modes</li>
              <li>Zero breaking changes - works with all existing components</li>
            </ul>
          </div>

          <div>
            <Typography level="body-sm" weight="semibold" className="mb-2">
              Color Scheme Values:
            </Typography>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
              <li><code className="font-mono text-sm">'light'</code> - Force light mode</li>
              <li><code className="font-mono text-sm">'dark'</code> - Force dark mode</li>
              <li><code className="font-mono text-sm">'system'</code> - Follow system preference (default)</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="API Reference" id="api">
        <div className="space-y-8">
          <div>
            <Typography level="h3" className="mb-4">
              ColorSchemeToggle
            </Typography>
            <PropsTable props={componentProps.ColorSchemeToggle} />
          </div>

          <div>
            <Typography level="h3" className="mb-4">
              useColorScheme Hook
            </Typography>
            <Typography level="body-sm" className="mb-4">
              The <code className="font-mono text-sm">useColorScheme</code> hook returns an object with the following properties:
            </Typography>
            <Sheet variant="outlined" color="neutral" className="overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left p-3 font-semibold">Property</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="p-3"><code className="font-mono text-sm">colorScheme</code></td>
                    <td className="p-3"><code className="font-mono text-sm">'light' | 'dark' | 'system'</code></td>
                    <td className="p-3">The user's selected color scheme preference</td>
                  </tr>
                  <tr>
                    <td className="p-3"><code className="font-mono text-sm">resolvedColorScheme</code></td>
                    <td className="p-3"><code className="font-mono text-sm">'light' | 'dark'</code></td>
                    <td className="p-3">The actual color scheme being applied (resolves 'system' to 'light' or 'dark')</td>
                  </tr>
                  <tr>
                    <td className="p-3"><code className="font-mono text-sm">setColorScheme</code></td>
                    <td className="p-3"><code className="font-mono text-sm">(scheme: ColorScheme) =&gt; void</code></td>
                    <td className="p-3">Function to programmatically change the color scheme</td>
                  </tr>
                </tbody>
              </table>
            </Sheet>
          </div>
        </div>
      </Section>
    </div>
  );
}
