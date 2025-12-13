import { useState } from 'react';
import {
  Button,
  Badge,
  Input,
  Textarea,
  Card,
  Checkbox,
  Radio,
  Switch,
  Select,
  Typography,
  CodeBlock,
} from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { ColorScaleEditor } from '../../components/ColorScaleEditor';
import { WCAGChecker } from '../../components/WCAGChecker';
import { useCustomTheme } from '../../hooks/useCustomTheme';

const sections = [
  { id: 'color-customization', title: 'Color Customization' },
  { id: 'component-preview', title: 'Component Preview' },
  { id: 'export-import', title: 'Export & Import' },
  { id: 'wcag-compliance', title: 'WCAG Compliance' },
  { id: 'code-examples', title: 'Code Examples' },
];

export default function CustomizeTheme() {
  const { theme, updateColorScale, resetTheme, exportTheme, importTheme } = useCustomTheme();
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');

  const handleImport = () => {
    const result = importTheme(importJson);
    if (result.success) {
      setImportJson('');
      setImportError('');
    } else {
      setImportError(result.error || 'Invalid JSON');
    }
  };

  return (
    <div className="flex gap-8 max-w-7xl">
      <div className="flex-1 max-w-4xl">
        <ComponentHeader
          title="Customize Theme"
          description="Interactively customize all color scales, preview changes in real-time, and export your custom theme configuration."
        />

        <Section title="Color Customization" id="color-customization">
          <Typography level="body-md" className="mb-4">
            Customize each color scale by selecting a base color (500 shade). The system will
            automatically generate a complete 11-shade scale with optimal lightness progression.
          </Typography>

          <Card variant="outlined" color="neutral" className="p-6">
            <div className="space-y-6">
              <ColorScaleEditor
                label="Primary Color"
                scale={theme.colors.primary}
                baseColor={theme.colors.primary[500]}
                onChange={(hex) => updateColorScale('primary', hex)}
              />
              <ColorScaleEditor
                label="Neutral Color"
                scale={theme.colors.neutral}
                baseColor={theme.colors.neutral[500]}
                onChange={(hex) => updateColorScale('neutral', hex)}
              />
              <ColorScaleEditor
                label="Success Color"
                scale={theme.colors.success}
                baseColor={theme.colors.success[500]}
                onChange={(hex) => updateColorScale('success', hex)}
              />
              <ColorScaleEditor
                label="Warning Color"
                scale={theme.colors.warning}
                baseColor={theme.colors.warning[500]}
                onChange={(hex) => updateColorScale('warning', hex)}
              />
              <ColorScaleEditor
                label="Danger Color"
                scale={theme.colors.danger}
                baseColor={theme.colors.danger[500]}
                onChange={(hex) => updateColorScale('danger', hex)}
              />
            </div>
          </Card>
        </Section>

        <Section title="Component Preview" id="component-preview">
          <Typography level="body-md" className="mb-4">
            See how your custom colors look across all components in real-time.
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography level="h3" className="mb-3">
                Buttons
              </Typography>
              <div className="space-y-3">
                {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
                  <div key={color} className="flex flex-wrap gap-3">
                    <Button variant="solid" color={color}>
                      {color} solid
                    </Button>
                    <Button variant="soft" color={color}>
                      {color} soft
                    </Button>
                    <Button variant="outlined" color={color}>
                      {color} outlined
                    </Button>
                    <Button variant="plain" color={color}>
                      {color} plain
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Typography level="h3" className="mb-3">
                Badges
              </Typography>
              <div className="space-y-3">
                {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
                  <div key={color} className="flex flex-wrap gap-3">
                    <Badge variant="solid" color={color}>
                      {color} solid
                    </Badge>
                    <Badge variant="soft" color={color}>
                      {color} soft
                    </Badge>
                    <Badge variant="outlined" color={color}>
                      {color} outlined
                    </Badge>
                    <Badge variant="plain" color={color}>
                      {color} plain
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Typography level="h3" className="mb-3">
                Form Controls
              </Typography>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Input placeholder="Primary input" color="primary" />
                  <Input placeholder="Neutral input" color="neutral" />
                  <Input placeholder="Success input" color="success" />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Checkbox.Root aria-label="Primary checkbox" color="primary">
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  <Radio.Root aria-label="Primary radio" color="primary" value="primary">
                    <Radio.Indicator />
                  </Radio.Root>
                  <Switch aria-label="Primary switch" color="primary" />
                </div>
                <div>
                  <Select
                    defaultValue="1"
                    color="primary"
                    placeholder="Select option"
                    options={[
                      { value: '1', label: 'Option 1' },
                      { value: '2', label: 'Option 2' },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div>
              <Typography level="h3" className="mb-3">
                Cards
              </Typography>
              <div className="grid grid-cols-2 gap-3">
                {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
                  <Card key={color} variant="soft" color={color} className="p-4">
                    <Typography level="body-sm" weight="semibold">
                      {color} card
                    </Typography>
                    <Typography level="body-xs" className="mt-1">
                      Soft variant
                    </Typography>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Export & Import" id="export-import">
          <Typography level="body-md" className="mb-4">
            Export your custom theme as JSON to use in your application, or import a previously
            saved theme.
          </Typography>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Button onClick={exportTheme} variant="solid" color="primary">
                Export as JSON
              </Button>
              <Button onClick={resetTheme} variant="outlined" color="neutral">
                Reset to Default
              </Button>
            </div>

            <div>
              <Typography level="body-sm" className="mb-2">
                Import theme JSON:
              </Typography>
              <Textarea
                placeholder="Paste theme JSON here..."
                rows={6}
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
              />
              {importError && (
                <Typography level="body-xs" className="text-danger-700 mt-2">
                  {importError}
                </Typography>
              )}
              <Button onClick={handleImport} className="mt-2" variant="soft" color="primary">
                Import Theme
              </Button>
            </div>

            <div>
              <Typography level="body-sm" className="mb-2">
                Current theme configuration:
              </Typography>
              <CodeBlock
                code={JSON.stringify({ colors: theme.colors }, null, 2)}
                language="json"
              />
            </div>
          </div>
        </Section>

        <Section title="WCAG Compliance" id="wcag-compliance">
          <Typography level="body-md" className="mb-4">
            WCAG (Web Content Accessibility Guidelines) ensures your colors have sufficient contrast
            for users with visual impairments.
          </Typography>

          <WCAGChecker theme={theme} />

          <div className="mt-6 space-y-3">
            <Typography level="h4">WCAG Standards</Typography>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <Typography level="body-sm">
                  <strong>AA (minimum):</strong> Contrast ratio of at least 4.5:1 for normal text
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  <strong>AAA (enhanced):</strong> Contrast ratio of at least 7:1 for normal text
                </Typography>
              </li>
              <li>
                <Typography level="body-sm">
                  <strong>Large text:</strong> Contrast ratio of at least 3:1 (18pt+ or 14pt+ bold)
                </Typography>
              </li>
            </ul>
          </div>
        </Section>

        <Section
          title="Code Examples"
          id="code-examples"
          code={`import { ThemeProvider } from '@base-joy/ui-styled';
import customTheme from './my-theme.json';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}`}
        >
          <Typography level="body-md" className="mb-3">
            After exporting your custom theme, import it into your application and pass it to the
            ThemeProvider:
          </Typography>
          <Typography level="body-sm" className="text-neutral-600">
            The theme will be automatically applied to all base-joy components throughout your
            application.
          </Typography>
        </Section>
      </div>

      <TableOfContents sections={sections} />
    </div>
  );
}
