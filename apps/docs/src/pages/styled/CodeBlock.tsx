import { CodeBlock } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';

const exampleCode = `import { Button } from '@base-joy/ui-styled';

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
    "@base-joy/ui-styled": "^1.0.0"
  }
}`;

const cssExample = `.button {
  background-color: var(--primary-500);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}`;

const bashExample = `# Install dependencies
yarn add @base-joy/ui-styled

# Start development server
yarn dev`;

const sections = [
  { id: 'basic-usage', title: 'Basic Usage' },
  { id: 'examples', title: 'Examples' },
  { id: 'languages', title: 'Languages', level: 3 },
  { id: 'themes', title: 'Themes', level: 3 },
  { id: 'rounded', title: 'Rounded Corners', level: 3 },
  { id: 'no-copy', title: 'Without Copy Button', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function CodeBlockPage() {
  return (
    <div>
      <ComponentHeader
        title="CodeBlock"
        description="Display code with syntax highlighting and copy functionality."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Basic Usage" id="basic-usage" code={exampleCode} codeLanguage="tsx">
            <CodeBlock code={exampleCode} language="tsx" />
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Languages"
                titleLevel="h3"
                id="languages"
                code={`<CodeBlock code={exampleCode} language="tsx" />
<CodeBlock code={jsonExample} language="json" />
<CodeBlock code={cssExample} language="css" />
<CodeBlock code={bashExample} language="bash" />`}
              >
                <div className="space-y-4">
                  <CodeBlock code={exampleCode} language="tsx" />
                  <CodeBlock code={jsonExample} language="json" />
                  <CodeBlock code={cssExample} language="css" />
                  <CodeBlock code={bashExample} language="bash" />
                </div>
              </Section>

              <Section
                title="Themes"
                titleLevel="h3"
                id="themes"
                code={`<CodeBlock code="const greeting = 'Hello, World!';" theme="github-dark" />
<CodeBlock code="const greeting = 'Hello, World!';" theme="github-light" />`}
              >
                <div className="space-y-4">
                  <CodeBlock code="const greeting = 'Hello, World!';" theme="github-dark" />
                  <CodeBlock code="const greeting = 'Hello, World!';" theme="github-light" />
                </div>
              </Section>

              <Section
                title="Rounded Corners"
                titleLevel="h3"
                id="rounded"
                code={`<CodeBlock code="const x = 1;" rounded="none" />
<CodeBlock code="const x = 1;" rounded="sm" />
<CodeBlock code="const x = 1;" rounded="md" />
<CodeBlock code="const x = 1;" rounded="lg" />`}
              >
                <div className="space-y-4">
                  <CodeBlock code="const x = 1;" rounded="none" />
                  <CodeBlock code="const x = 1;" rounded="sm" />
                  <CodeBlock code="const x = 1;" rounded="md" />
                  <CodeBlock code="const x = 1;" rounded="lg" />
                </div>
              </Section>

              <Section
                title="Without Copy Button"
                titleLevel="h3"
                id="no-copy"
                code={`<CodeBlock code="const simple = true;" showCopyButton={false} />`}
              >
                <CodeBlock code="const simple = true;" showCopyButton={false} />
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.CodeBlock} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
