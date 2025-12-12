import { Link } from 'react-router';
import { Sheet, Typography } from '@base-joy/ui-styled';
import { Section } from '../components/Section';

export function HomePage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-12">
        <Typography level="h1" className="text-4xl mb-4">Base Joy</Typography>
        <Typography level="body-lg" className="text-xl">
          A headless component library built on Base UI with Tailwind CSS
        </Typography>
      </header>

      <Section title="Getting Started">
        <Sheet variant="soft" color="neutral" className="mb-4">
          <pre className="text-sm">
            <code>npm install @base-joy/ui-styled</code>
          </pre>
        </Sheet>
        <Typography>
          Base Joy provides a set of foundational components that follow Joy UI design patterns,
          built with Base UI for accessibility and Tailwind CSS for styling.
        </Typography>
      </Section>

      <Section title="Components" spacing="sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/styled/sheet">
            <Sheet
              variant="outlined"
              color="neutral"
              className="p-6 hover:border-primary-300 transition-colors cursor-pointer"
            >
              <Typography level="h3">Sheet</Typography>
              <Typography level="body-sm">
                A styled container with variants for colors, visual styles, and sizes.
              </Typography>
            </Sheet>
          </Link>
          <Link to="/styled/item">
            <Sheet
              variant="outlined"
              color="neutral"
              className="p-6 hover:border-primary-300 transition-colors cursor-pointer"
            >
              <Typography level="h3">Item</Typography>
              <Typography level="body-sm">
                A structured content component with start, content, and end slots.
              </Typography>
            </Sheet>
          </Link>
          <Link to="/styled/table">
            <Sheet
              variant="outlined"
              color="neutral"
              className="p-6 hover:border-primary-300 transition-colors cursor-pointer"
            >
              <Typography level="h3">Table</Typography>
              <Typography level="body-sm">
                A styled table with striped rows and interactive states.
              </Typography>
            </Sheet>
          </Link>
        </div>
      </Section>

      <footer className="mt-16 pt-8 border-t border-neutral-200 text-center">
        <Typography level="body-sm">Base Joy v0.0.1 - Built with Base UI + Tailwind CSS v4</Typography>
      </footer>
    </div>
  );
}
