import { Sheet, Typography, Button, Badge } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';
import { CodeBlock } from '@base-joy/ui-styled';

export function DarkModeOptimizationPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Dark Mode Optimization"
        description="Seamless dark mode support with optimized color palettes, system preference detection, and automatic variant adjustments."
      />

      <div className="space-y-12">
        <Section title="Overview" id="overview">
          <Typography level="body-sm" className="mb-4">
            Dark mode optimization provides a complete theming solution that
            adapts your interface to user preferences, with carefully designed
            dark color palettes and automatic component adjustments.
          </Typography>

          <Typography level="body-sm" weight="semibold" className="mb-2">
            Key Features (Planned)
          </Typography>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <strong>Automatic Detection:</strong> Respects system color
                scheme preferences
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Manual Control:</strong> Users can override system
                preference
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Persistent Storage:</strong> Remembers user's choice
                across sessions
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Optimized Palettes:</strong> Dark-specific color scales
                designed for WCAG compliance
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Automatic Adjustments:</strong> Components adapt their
                variants for dark backgrounds
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Smooth Transitions:</strong> Animated color scheme
                switching
              </Typography>
            </li>
          </ul>
        </Section>

        <Section title="Current State" id="current-state">
          <Sheet variant="soft" color="warning" className="space-y-2">
            <Typography level="body-sm" weight="semibold">
              Not Yet Implemented
            </Typography>
            <Typography level="body-sm">
              Dark mode support is currently not available in Base Joy. This
              feature is planned for Phase 1 (Q1 2025) of the roadmap.
            </Typography>
          </Sheet>

          <Typography level="body-sm" className="mt-4">
            You can track progress and contribute to the discussion on{' '}
            <a
              href="https://github.com/sernstberger/base-joy/issues/28"
              className="text-primary-700 hover:underline"
            >
              GitHub Issue #28
            </a>
            .
          </Typography>
        </Section>

        <Section title="Planned Implementation" id="planned-implementation">
          <Typography level="body-sm" className="mb-4">
            When implemented, dark mode will follow Joy UI's approach with
            improvements from our CVA-based architecture.
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Color Scheme Provider
              </Typography>
              <Typography level="body-sm" className="mb-3">
                A provider component will manage color scheme state and sync
                with system preferences:
              </Typography>
              <CodeBlock language="tsx" code={`import { ColorSchemeProvider } from '@base-joy/ui-styled';

function App() {
  return (
    <ColorSchemeProvider defaultMode="system">
      <YourApp />
    </ColorSchemeProvider>
  );
}`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                useColorScheme Hook
              </Typography>
              <Typography level="body-sm" className="mb-3">
                Programmatic control over color scheme:
              </Typography>
              <CodeBlock language="tsx" code={`import { useColorScheme } from '@base-joy/ui-styled';

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  return (
    <Button
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </Button>
  );
}`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Automatic Mode Detection
              </Typography>
              <CodeBlock language="tsx" code={`// Detects system preference automatically
<ColorSchemeProvider defaultMode="system">
  {/* Components adapt to system dark mode */}
</ColorSchemeProvider>

// Or set explicit default
<ColorSchemeProvider defaultMode="dark">
  {/* Always starts in dark mode */}
</ColorSchemeProvider>`} />
            </div>
          </div>
        </Section>

        <Section title="Dark Color Palettes" id="dark-palettes">
          <Typography level="body-sm" className="mb-4">
            Dark mode will use specially designed color scales that maintain
            WCAG compliance on dark backgrounds.
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Color Scale Adjustments
              </Typography>
              <ul className="space-y-2 ml-6 list-disc">
                <li>
                  <Typography level="body-sm">
                    <strong>Inverted Scales:</strong> Dark mode uses lighter
                    shades (100-300) where light mode uses darker (700-900)
                  </Typography>
                </li>
                <li>
                  <Typography level="body-sm">
                    <strong>Reduced Saturation:</strong> Dark backgrounds need
                    less saturated colors to prevent eye strain
                  </Typography>
                </li>
                <li>
                  <Typography level="body-sm">
                    <strong>Adjusted Contrast:</strong> Higher contrast ratios
                    to compensate for lower ambient light
                  </Typography>
                </li>
                <li>
                  <Typography level="body-sm">
                    <strong>Pure Black Avoidance:</strong> Uses dark grays
                    (neutral-900/950) instead of pure black for better OLED
                    performance
                  </Typography>
                </li>
              </ul>
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Example Color Mapping
              </Typography>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Element
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Light Mode
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Dark Mode
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        Page background
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        white
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        neutral-950
                      </td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        Primary text
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        neutral-900
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        neutral-100
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        Soft variant bg
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        primary-100
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        primary-900/30
                      </td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        Border color
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        neutral-200
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-900">
                        neutral-800
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Component Adaptations" id="component-adaptations">
          <Typography level="body-sm" className="mb-4">
            Components will automatically adjust their appearance for dark mode,
            ensuring optimal contrast and visual hierarchy.
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Automatic Variant Adjustments
              </Typography>
              <Typography level="body-sm" className="mb-3">
                Some variants work better in light mode, others in dark mode.
                Components will automatically switch variants when appropriate:
              </Typography>
              <CodeBlock language="tsx" code={`// Light mode: outlined variant provides subtle contrast
<Card variant="outlined">...</Card>

// Dark mode: soft variant automatically used for better visibility
// (outlined borders can be too harsh on dark backgrounds)`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Interactive State Adjustments
              </Typography>
              <Typography level="body-sm" className="mb-3">
                Hover and active states will use different color shades in dark
                mode to maintain the same perceived intensity:
              </Typography>
              <CodeBlock language="tsx" code={`// Light mode soft button
hover: bg-primary-200 (darker)
active: bg-primary-300 (even darker)

// Dark mode soft button
hover: bg-primary-800 (lighter)
active: bg-primary-700 (even lighter)`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Shadow Adjustments
              </Typography>
              <Typography level="body-sm">
                Shadows will be adjusted for dark mode - lighter, more diffused
                shadows work better on dark backgrounds.
              </Typography>
            </div>
          </div>
        </Section>

        <Section title="System Integration" id="system-integration">
          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                CSS Media Query
              </Typography>
              <Typography level="body-sm" className="mb-3">
                The implementation will use the{' '}
                <code className="font-mono text-sm">prefers-color-scheme</code>{' '}
                media query to detect system preferences:
              </Typography>
              <CodeBlock language="css" code={`@media (prefers-color-scheme: dark) {
  /* Dark mode styles automatically applied */
}`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Data Attribute
              </Typography>
              <Typography level="body-sm" className="mb-3">
                The color scheme will be exposed via a{' '}
                <code className="font-mono text-sm">data-color-scheme</code>{' '}
                attribute on the root element:
              </Typography>
              <CodeBlock language="html" code={`<html data-color-scheme="dark">
  <!-- All components read from this attribute -->
</html>`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Local Storage Persistence
              </Typography>
              <CodeBlock language="tsx" code={`// User's choice persisted across sessions
localStorage.setItem('color-scheme', 'dark');

// Next visit remembers preference
const saved = localStorage.getItem('color-scheme') ?? 'system';`} />
            </div>
          </div>
        </Section>

        <Section title="Migration Strategy" id="migration">
          <Typography level="body-sm" className="mb-4">
            When dark mode is implemented, it will be opt-in and
            backward-compatible:
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Step 1: Wrap with Provider
              </Typography>
              <CodeBlock language="tsx" code={`import { ColorSchemeProvider } from '@base-joy/ui-styled';

function App() {
  return (
    <ColorSchemeProvider>
      <YourApp />
    </ColorSchemeProvider>
  );
}`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Step 2: Add Theme Toggle
              </Typography>
              <CodeBlock language="tsx" code={`import { useColorScheme } from '@base-joy/ui-styled';

function Header() {
  const { mode, setMode } = useColorScheme();

  return (
    <Button
      variant="plain"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      Toggle theme
    </Button>
  );
}`} />
            </div>

            <div>
              <Typography level="body-sm" weight="semibold" className="mb-2">
                Step 3: Test Both Modes
              </Typography>
              <Typography level="body-sm">
                Components will automatically adapt, but you should verify
                custom styles work in both modes.
              </Typography>
            </div>
          </div>
        </Section>

        <Section title="Design Principles" id="design-principles">
          <ul className="space-y-3 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                <strong>WCAG Compliant:</strong> All color combinations maintain
                AA/AAA standards in both modes
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Automatic by Default:</strong> Components work without
                changes in either mode
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>User Control:</strong> Users can override system
                preference easily
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Performance:</strong> CSS-based switching with no
                re-renders
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                <strong>Consistency:</strong> Same component API in both light
                and dark modes
              </Typography>
            </li>
          </ul>
        </Section>

        <Section title="Tracking" id="tracking">
          <Typography level="body-sm" className="mb-3">
            This feature is a high priority for Phase 1. Track progress in:
          </Typography>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Typography level="body-sm">
                GitHub Issue:{' '}
                <a
                  href="https://github.com/sernstberger/base-joy/issues/28"
                  className="text-primary-700 hover:underline"
                >
                  #28 - Implement Dark Mode Support
                </a>
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                Roadmap: Phase 1 (Q1 2025) in MISSING_FEATURES.md
              </Typography>
            </li>
            <li>
              <Typography level="body-sm">
                Reference:{' '}
                <a
                  href="https://mui.com/joy-ui/main-features/dark-mode-optimization/"
                  className="text-primary-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Joy UI Dark Mode Documentation
                </a>
              </Typography>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
