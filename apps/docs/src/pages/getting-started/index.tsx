import { Typography, Sheet, Stack, Badge } from '@base-joy/ui-styled';
import { Section } from '../../components/Section';
import { Link } from 'react-router';

export function GettingStartedPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Getting Started</Typography>
        <Typography level="body-lg">
          Learn about Base Joy's component libraries and when to use each one.
        </Typography>
      </header>

      <Section title="Overview">
        <Typography level="body-md" className="mb-4">
          Base Joy provides two complementary packages for building React applications:
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Sheet variant="outlined" color="neutral" className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Typography level="h4">@base-joy/ui-unstyled</Typography>
              <Badge variant="soft" color="neutral" size="sm">Primitives</Badge>
            </div>
            <Typography level="body-sm" className="text-neutral-600">
              Unstyled, accessible React primitives that follow Base UI patterns.
              Use when you need complete control over styling.
            </Typography>
          </Sheet>

          <Sheet variant="outlined" color="primary" className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Typography level="h4">@base-joy/ui-styled</Typography>
              <Badge variant="soft" color="primary" size="sm">Styled</Badge>
            </div>
            <Typography level="body-sm" className="text-neutral-600">
              Pre-styled components with Joy UI-inspired aesthetics.
              Use when you want beautiful defaults with variant/color support.
            </Typography>
          </Sheet>
        </div>
      </Section>

      <Section title="@base-joy/ui-unstyled">
        <Typography level="body-md" className="mb-4">
          The base package provides unstyled primitives that give you full control
          over styling while handling accessibility and behavior.
        </Typography>

        <Typography level="h4" className="mb-2">Key Features</Typography>
        <ul className="list-disc list-inside space-y-1 text-neutral-700 mb-4">
          <li>Unstyled - bring your own CSS or Tailwind classes</li>
          <li>Composable - slot-based architecture</li>
          <li>Size variants - consistent sizing system (sm, md, lg)</li>
          <li>Context-based - props automatically inherited by children</li>
        </ul>

        <Typography level="h4" className="mb-2">When to Use</Typography>
        <ul className="list-disc list-inside space-y-1 text-neutral-700 mb-4">
          <li>Building a custom design system</li>
          <li>Need complete control over visual styling</li>
          <li>Integrating with existing CSS architecture</li>
          <li>Creating themed or branded experiences</li>
        </ul>

        <Typography level="h4" className="mb-2">Installation</Typography>
        <Sheet variant="outlined" color="neutral" className="font-mono text-sm">
          npm install @base-joy/ui-unstyled
        </Sheet>
      </Section>

      <Section title="@base-joy/ui-styled">
        <Typography level="body-md" className="mb-4">
          The components package provides pre-styled components with Joy UI-inspired
          aesthetics and a consistent variant/color system.
        </Typography>

        <Typography level="h4" className="mb-2">Key Features</Typography>
        <ul className="list-disc list-inside space-y-1 text-neutral-700 mb-4">
          <li>Variant system - solid, soft, outlined, plain</li>
          <li>Color palette - primary, neutral, success, warning, danger</li>
          <li>Size variants - consistent sizing (sm, md, lg)</li>
          <li>Built on Base UI - accessible by default</li>
        </ul>

        <Typography level="h4" className="mb-2">When to Use</Typography>
        <ul className="list-disc list-inside space-y-1 text-neutral-700 mb-4">
          <li>Rapid prototyping and MVPs</li>
          <li>Projects that want Joy UI aesthetics</li>
          <li>Applications needing consistent styling out-of-the-box</li>
          <li>Teams that prefer convention over configuration</li>
        </ul>

        <Typography level="h4" className="mb-2">Installation</Typography>
        <Sheet variant="outlined" color="neutral" className="font-mono text-sm">
          npm install @base-joy/ui-styled
        </Sheet>
      </Section>

      <Section title="Comparison">
        <Sheet variant="outlined" color="neutral" className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left p-3 font-medium">Feature</th>
                <th className="text-left p-3 font-medium">ui-unstyled</th>
                <th className="text-left p-3 font-medium">ui-styled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <td className="p-3">Styling</td>
                <td className="p-3">Unstyled (BYO CSS)</td>
                <td className="p-3">Pre-styled</td>
              </tr>
              <tr>
                <td className="p-3">Variants</td>
                <td className="p-3">Size only</td>
                <td className="p-3">solid, soft, outlined, plain</td>
              </tr>
              <tr>
                <td className="p-3">Colors</td>
                <td className="p-3">None</td>
                <td className="p-3">primary, neutral, success, warning, danger</td>
              </tr>
              <tr>
                <td className="p-3">Customization</td>
                <td className="p-3">Full control</td>
                <td className="p-3">Via className and CVA</td>
              </tr>
              <tr>
                <td className="p-3">Best for</td>
                <td className="p-3">Custom design systems</td>
                <td className="p-3">Rapid development</td>
              </tr>
            </tbody>
          </table>
        </Sheet>
      </Section>

      <Section title="Documentation Structure">
        <Typography level="body-md" className="mb-4">
          The documentation is organized into two sections:
        </Typography>

        <Stack spacing={4}>
          <Sheet variant="soft" color="primary" className="p-4">
            <Typography level="h4" className="mb-1">Styled</Typography>
            <Typography level="body-sm" className="text-neutral-600 mb-2">
              Documentation for @base-joy/ui-styled. Includes playgrounds,
              variant/color examples, and rich visual documentation.
            </Typography>
            <Link to="/styled/item" className="text-primary-600 hover:text-primary-700 text-sm">
              View Styled Item &rarr;
            </Link>
          </Sheet>

          <Sheet variant="soft" color="neutral" className="p-4">
            <Typography level="h4" className="mb-1">Unstyled</Typography>
            <Typography level="body-sm" className="text-neutral-600 mb-2">
              Documentation for @base-joy/ui-unstyled primitives. Focuses on API,
              composition patterns, and styling from scratch.
            </Typography>
            <Link to="/unstyled/item" className="text-primary-600 hover:text-primary-700 text-sm">
              View Unstyled Item &rarr;
            </Link>
          </Sheet>
        </Stack>
      </Section>
    </div>
  );
}
