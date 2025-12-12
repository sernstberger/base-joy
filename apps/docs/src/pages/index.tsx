import { Link } from 'react-router';
import { Sheet } from '@base-joy/ui-core';
import { Heading, Text } from '../components/Typography';
import { Section } from '../components/Section';

export function HomePage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-12">
        <Heading level={1} className="text-4xl mb-4">Base Joy</Heading>
        <Text variant="subtitle" className="text-xl">
          A headless component library built on Base UI with Tailwind CSS
        </Text>
      </header>

      <Section title="Getting Started">
        <Sheet variant="soft" color="neutral" className="mb-4">
          <pre className="text-sm">
            <code>npm install @base-joy/ui-core</code>
          </pre>
        </Sheet>
        <Text>
          Base Joy provides a set of foundational components that follow Joy UI design patterns,
          built with Base UI for accessibility and Tailwind CSS for styling.
        </Text>
      </Section>

      <Section title="Components" spacing="sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/components/sheet">
            <Sheet
              variant="outlined"
              color="neutral"
              className="p-6 hover:border-primary-300 transition-colors cursor-pointer"
            >
              <Heading level={3}>Sheet</Heading>
              <Text variant="muted">
                A styled container with variants for colors, visual styles, and sizes.
              </Text>
            </Sheet>
          </Link>
          <Link to="/components/item">
            <Sheet
              variant="outlined"
              color="neutral"
              className="p-6 hover:border-primary-300 transition-colors cursor-pointer"
            >
              <Heading level={3}>Item</Heading>
              <Text variant="muted">
                A structured content component with start, content, and end slots.
              </Text>
            </Sheet>
          </Link>
          <Link to="/components/table">
            <Sheet
              variant="outlined"
              color="neutral"
              className="p-6 hover:border-primary-300 transition-colors cursor-pointer"
            >
              <Heading level={3}>Table</Heading>
              <Text variant="muted">
                A styled table with striped rows and interactive states.
              </Text>
            </Sheet>
          </Link>
        </div>
      </Section>

      <footer className="mt-16 pt-8 border-t border-neutral-200 text-center">
        <Text variant="muted">Base Joy v0.0.1 - Built with Base UI + Tailwind CSS v4</Text>
      </footer>
    </div>
  );
}
