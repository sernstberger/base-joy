import { CodeBlock, Typography, Sheet } from '@base-joy/ui-components';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';

const exampleCode = `import { Button } from '@base-joy/ui-components';

export function MyComponent() {
  return (
    <Button variant="solid" color="primary">
      Click me
    </Button>
  );
}`;

const jsonExample = `{
  "name": "base-joy",
  "version": "1.0.0",
  "dependencies": {
    "@base-joy/ui-components": "^1.0.0"
  }
}`;

const cssExample = `.button {
  background-color: var(--primary-500);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}`;

const bashExample = `# Install dependencies
yarn add @base-joy/ui-components

# Start development server
yarn dev`;

export function CodeBlockPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">CodeBlock</Typography>
        <Typography level="body-lg">
          Display code with syntax highlighting and copy functionality.
        </Typography>
      </header>

      <Section title="Basic Usage">
        <Sheet variant="outlined" color="neutral" className="p-6">
          <CodeBlock code={exampleCode} language="tsx" />
        </Sheet>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Languages</Typography>
            <Typography level="body-md" className="mb-4">
              CodeBlock supports multiple languages including TypeScript, JavaScript, JSON, CSS, and shell commands.
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  TSX / TypeScript
                </Typography>
                <CodeBlock code={exampleCode} language="tsx" />
              </div>

              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  JSON
                </Typography>
                <CodeBlock code={jsonExample} language="json" />
              </div>

              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  CSS
                </Typography>
                <CodeBlock code={cssExample} language="css" />
              </div>

              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  Bash / Shell
                </Typography>
                <CodeBlock code={bashExample} language="bash" />
              </div>
            </div>
          </div>

          <div>
            <Typography level="h3">Themes</Typography>
            <Typography level="body-md" className="mb-4">
              Choose between dark and light themes.
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  Dark Theme (default)
                </Typography>
                <CodeBlock code="const greeting = 'Hello, World!';" theme="github-dark" />
              </div>

              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  Light Theme
                </Typography>
                <CodeBlock code="const greeting = 'Hello, World!';" theme="github-light" />
              </div>
            </div>
          </div>

          <div>
            <Typography level="h3">Rounded Corners</Typography>
            <Typography level="body-md" className="mb-4">
              Customize the border radius.
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  None
                </Typography>
                <CodeBlock code="const x = 1;" rounded="none" />
              </div>

              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  Small
                </Typography>
                <CodeBlock code="const x = 1;" rounded="sm" />
              </div>

              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  Medium (default)
                </Typography>
                <CodeBlock code="const x = 1;" rounded="md" />
              </div>

              <div>
                <Typography level="body-sm" weight="medium" className="mb-2">
                  Large
                </Typography>
                <CodeBlock code="const x = 1;" rounded="lg" />
              </div>
            </div>
          </div>

          <div>
            <Typography level="h3">Without Copy Button</Typography>
            <Typography level="body-md" className="mb-4">
              Hide the copy button when not needed.
            </Typography>
            <CodeBlock code="const simple = true;" showCopyButton={false} />
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <Typography level="h3">CodeBlock</Typography>
        <PropsTable props={componentProps.CodeBlock} />
      </Section>
    </div>
  );
}
