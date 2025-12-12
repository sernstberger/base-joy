import * as React from 'react';
import {
  Button,
  Badge,
  Input,
  Typography,
  Card,
  CodeBlock,
  useTheme,
  defaultTheme,
} from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';

function ThemePreview() {
  const { theme } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="solid" color="primary">
          Solid Button
        </Button>
        <Button variant="soft" color="primary">
          Soft Button
        </Button>
        <Button variant="outlined" color="primary">
          Outlined Button
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge variant="solid" color="primary">
          Solid Badge
        </Badge>
        <Badge variant="soft" color="primary">
          Soft Badge
        </Badge>
        <Badge variant="outlined" color="primary">
          Outlined Badge
        </Badge>
      </div>
      <div className="flex flex-wrap gap-3">
        <Input placeholder="Primary input" />
      </div>
      <Typography level="body-sm" className="text-neutral-600">
        Current primary-500: {theme.colors.primary[500]}
      </Typography>
    </div>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [customColor, setCustomColor] = React.useState(theme.colors.primary[500]);

  const applyColor = () => {
    const newPrimaryScale = {
      50: lighten(customColor, 0.95),
      100: lighten(customColor, 0.9),
      200: lighten(customColor, 0.75),
      300: lighten(customColor, 0.5),
      400: lighten(customColor, 0.25),
      500: customColor,
      600: darken(customColor, 0.15),
      700: darken(customColor, 0.3),
      800: darken(customColor, 0.45),
      900: darken(customColor, 0.6),
      950: darken(customColor, 0.75),
    };

    setTheme({
      colors: {
        primary: newPrimaryScale,
      },
    });
  };

  const resetTheme = () => {
    setTheme({
      colors: defaultTheme.colors,
    });
    setCustomColor(defaultTheme.colors.primary[500]);
  };

  return (
    <Card variant="outlined" color="neutral" className="p-6">
      <div className="space-y-4">
        <Typography level="h4">Interactive Theme Editor</Typography>
        <div className="flex gap-3 items-end">
          <div>
            <label htmlFor="color-picker" className="block mb-2">
              <Typography level="body-sm">Primary Color (500 shade)</Typography>
            </label>
            <input
              id="color-picker"
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-20 h-10 rounded border border-neutral-300 cursor-pointer"
            />
          </div>
          <Button variant="solid" color="primary" onClick={applyColor}>
            Apply Theme
          </Button>
          <Button variant="outlined" color="neutral" onClick={resetTheme}>
            Reset
          </Button>
        </div>
        <div className="mt-6">
          <ThemePreview />
        </div>
      </div>
    </Card>
  );
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * amount));
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * amount));
  const b = Math.min(255, Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.floor((num >> 16) * (1 - amount)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00ff) * (1 - amount)));
  const b = Math.max(0, Math.floor((num & 0x0000ff) * (1 - amount)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default function Theming() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Theming"
        description="Customize the design system's colors and typography to match your brand using the ThemeProvider component."
      />

      <Section title="Overview" id="overview">
        <Typography level="body-md" className="mb-4">
          The base-joy theme system enables runtime customization of colors and typography
          throughout your application. Using the <code className="font-mono text-sm">ThemeProvider</code>, you can:
        </Typography>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <Typography level="body-md">
              Customize color scales (primary, neutral, success, warning, danger)
            </Typography>
          </li>
          <li>
            <Typography level="body-md">
              Adjust typography tokens (font sizes, line heights, font families)
            </Typography>
          </li>
          <li>
            <Typography level="body-md">
              Switch themes at runtime without reloading the page
            </Typography>
          </li>
          <li>
            <Typography level="body-md">
              Persist theme preferences across page reloads
            </Typography>
          </li>
        </ul>
        <Typography level="body-md" className="mb-4">
          The theme system works by updating CSS custom properties on the document root element,
          which are automatically referenced by all Tailwind utility classes used in components.
        </Typography>
      </Section>

      <Section title="Quick Start" id="quick-start">
        <Typography level="body-md" className="mb-4">
          Wrap your application with the <code className="font-mono text-sm">ThemeProvider</code> to
          enable theming:
        </Typography>
        <CodeBlock
          code={`import { ThemeProvider } from '@base-joy/ui-styled';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}`}
          language="tsx"
          className="mb-4"
        />
        <Typography level="body-sm" className="text-neutral-600">
          Without any props, ThemeProvider applies the default theme, which matches the built-in
          styling of all components.
        </Typography>
      </Section>

      <Section title="Playground" id="playground">
        <Typography level="body-md" className="mb-4">
          Try customizing the primary color and see how it affects all components in real-time:
        </Typography>
        <ThemeSwitcher />
        <Typography level="body-xs" className="text-neutral-600 mt-4">
          Theme changes are automatically saved to localStorage and will persist across page reloads.
        </Typography>
      </Section>

      <Section title="Examples" id="examples">
        <div className="space-y-8">
          <Section
            title="Custom Primary Color"
            titleLevel="h3"
            id="custom-primary"
            code={`import { ThemeProvider, defaultTheme } from '@base-joy/ui-styled';

const customTheme = {
  colors: {
    ...defaultTheme.colors,
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Sky blue
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}`}
          >
            <Typography level="body-md" className="mb-3">
              Replace the default primary color scale with your brand colors:
            </Typography>
            <div className="flex flex-wrap gap-3">
              <Button variant="solid" color="primary">
                Custom Primary
              </Button>
              <Badge variant="soft" color="primary">
                Brand Badge
              </Badge>
            </div>
          </Section>

          <Section
            title="Runtime Theme Switching"
            titleLevel="h3"
            id="runtime-switching"
            code={`import { useTheme } from '@base-joy/ui-styled';

function ThemeSwitcher() {
  const { setTheme } = useTheme();

  const applyBluePrimary = () => {
    setTheme({
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
    });
  };

  const applyGreenPrimary = () => {
    setTheme({
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
    });
  };

  return (
    <div>
      <button onClick={applyBluePrimary}>Blue Theme</button>
      <button onClick={applyGreenPrimary}>Green Theme</button>
    </div>
  );
}`}
          >
            <Typography level="body-md" className="mb-3">
              Use the <code className="font-mono text-sm">useTheme</code> hook to switch themes
              dynamically:
            </Typography>
            <Typography level="body-sm" className="text-neutral-600">
              The <code className="font-mono text-sm">setTheme</code> function accepts partial
              theme objects, automatically merging with the current theme.
            </Typography>
          </Section>

          <Section
            title="Typography Customization"
            titleLevel="h3"
            id="typography"
            code={`import { ThemeProvider, defaultTheme } from '@base-joy/ui-styled';

const customTheme = {
  ...defaultTheme,
  typography: {
    ...defaultTheme.typography,
    fontFamilies: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}`}
          >
            <Typography level="body-md" className="mb-3">
              Customize typography tokens to match your brand's type system:
            </Typography>
            <Typography level="body-sm" className="text-neutral-600">
              You can override font families, sizes, and line heights independently.
            </Typography>
          </Section>
        </div>
      </Section>

      <Section title="API Reference" id="api">
        <div className="space-y-6">
          <div>
            <Typography level="h3" className="mb-3">
              ThemeProvider
            </Typography>
            <Typography level="body-md" className="mb-3">
              Component that provides theme context to all children.
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="text-left py-2 px-3">
                      <Typography level="body-sm" weight="semibold">
                        Prop
                      </Typography>
                    </th>
                    <th className="text-left py-2 px-3">
                      <Typography level="body-sm" weight="semibold">
                        Type
                      </Typography>
                    </th>
                    <th className="text-left py-2 px-3">
                      <Typography level="body-sm" weight="semibold">
                        Default
                      </Typography>
                    </th>
                    <th className="text-left py-2 px-3">
                      <Typography level="body-sm" weight="semibold">
                        Description
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 px-3">
                      <code className="font-mono text-sm">theme</code>
                    </td>
                    <td className="py-2 px-3">
                      <code className="font-mono text-sm">Partial&lt;Theme&gt;</code>
                    </td>
                    <td className="py-2 px-3">
                      <Typography level="body-sm">-</Typography>
                    </td>
                    <td className="py-2 px-3">
                      <Typography level="body-sm">
                        Custom theme configuration (merged with defaults)
                      </Typography>
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-200">
                    <td className="py-2 px-3">
                      <code className="font-mono text-sm">children</code>
                    </td>
                    <td className="py-2 px-3">
                      <code className="font-mono text-sm">ReactNode</code>
                    </td>
                    <td className="py-2 px-3">
                      <Typography level="body-sm">-</Typography>
                    </td>
                    <td className="py-2 px-3">
                      <Typography level="body-sm">
                        Child components that will have access to theme
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <Typography level="h3" className="mb-3">
              useTheme()
            </Typography>
            <Typography level="body-md" className="mb-3">
              Hook to access and update the current theme. Must be used within a ThemeProvider.
            </Typography>
            <CodeBlock
              code={`const { theme, setTheme } = useTheme();`}
              language="tsx"
              className="mb-3"
            />
            <Typography level="body-sm" className="mb-2">
              <strong>Returns:</strong>
            </Typography>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <Typography level="body-sm">
                  <code className="font-mono text-sm">theme</code> - Current theme object
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  <code className="font-mono text-sm">setTheme</code> - Function to update theme
                  (accepts partial theme)
                </Typography>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Best Practices" id="best-practices">
        <div className="space-y-4">
          <div>
            <Typography level="h4" className="mb-2">
              Color Contrast
            </Typography>
            <Typography level="body-md" className="mb-2">
              When customizing colors, ensure sufficient contrast ratios for accessibility:
            </Typography>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <Typography level="body-sm">
                  Normal text: minimum 4.5:1 contrast ratio (WCAG AA)
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  Large text: minimum 3:1 contrast ratio (WCAG AA)
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  UI components: minimum 3:1 contrast ratio
                </Typography>
              </li>
            </ul>
          </div>

          <div>
            <Typography level="h4" className="mb-2">
              Performance
            </Typography>
            <Typography level="body-md" className="mb-2">
              Theme updates are optimized for performance:
            </Typography>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <Typography level="body-sm">
                  CSS variables update instantly without re-rendering components
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  Only components using <code className="font-mono text-sm">useTheme</code> re-render
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  Avoid calling <code className="font-mono text-sm">setTheme</code> in tight loops
                </Typography>
              </li>
            </ul>
          </div>

          <div>
            <Typography level="h4" className="mb-2">
              Theme Persistence
            </Typography>
            <Typography level="body-md" className="mb-2">
              Themes are automatically saved to localStorage:
            </Typography>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <Typography level="body-sm">
                  Theme preferences persist across page reloads
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  Works across browser tabs on the same origin
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  Handles localStorage errors gracefully (e.g., private browsing mode)
                </Typography>
              </li>
            </ul>
          </div>

          <div>
            <Typography level="h4" className="mb-2">
              SSR Considerations
            </Typography>
            <Typography level="body-md" className="mb-2">
              The theme system is SSR-safe:
            </Typography>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <Typography level="body-sm">
                  Server renders with the default theme from CSS
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  Client hydrates and applies custom theme immediately
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  No flash of unstyled content (FOUC)
                </Typography>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
