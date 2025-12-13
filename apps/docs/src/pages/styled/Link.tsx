import { Link, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { ColorScale } from '@base-joy/tokens';

const linkControls: PlaygroundControl[] = [
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'underline', type: 'select', defaultValue: 'hover', options: ['none', 'hover', 'always'] },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const linkCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  const booleanPropsStr = booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Link href="/page" color="${props.color}" underline="${props.underline}"${booleanPropsStr}>
  Click here
</Link>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'underline', title: 'Underline Options', level: 3 },
  { id: 'disabled', title: 'Disabled State', level: 3 },
  { id: 'external', title: 'External Links', level: 3 },
  { id: 'in-context', title: 'In Context', level: 3 },
  { id: 'polymorphic', title: 'Polymorphic Usage', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function LinkPage() {
  return (
    <div>
      <ComponentHeader
        title="Link"
        description="A styled link component with color variants, underline options, and external link support."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={linkControls} codeTemplate={linkCodeTemplate}>
              {(props) => (
                <Link
                  href="#"
                  color={props.color as ColorScale}
                  underline={props.underline as 'none' | 'hover' | 'always'}
                  disabled={props.disabled === 'true'}
                >
                  Click here to navigate
                </Link>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Link href="#" color="primary">
  Primary Link
</Link>
<Link href="#" color="neutral">
  Neutral Link
</Link>
<Link href="#" color="success">
  Success Link
</Link>
<Link href="#" color="warning">
  Warning Link
</Link>
<Link href="#" color="danger">
  Danger Link
</Link>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-col gap-3">
                  <Link href="#" color="primary">
                    Primary Link
                  </Link>
                  <Link href="#" color="neutral">
                    Neutral Link
                  </Link>
                  <Link href="#" color="success">
                    Success Link
                  </Link>
                  <Link href="#" color="warning">
                    Warning Link
                  </Link>
                  <Link href="#" color="danger">
                    Danger Link
                  </Link>
                </div>
              </Section>

              <Section
                title="Underline Options"
                titleLevel="h3"
                id="underline"
                code={`<Link href="#" underline="none">
  Link without underline
</Link>
<Link href="#" underline="hover">
  Link with underline on hover
</Link>
<Link href="#" underline="always">
  Link with permanent underline
</Link>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Control when the underline appears with the <code className="font-mono text-sm">underline</code> prop.
                </Typography>
                <div className="flex flex-col gap-3">
                  <div>
                    <Typography level="body-sm" className="mb-1">
                      No underline
                    </Typography>
                    <Link href="#" underline="none">
                      Link without underline
                    </Link>
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-1">
                      Hover underline (default)
                    </Typography>
                    <Link href="#" underline="hover">
                      Link with underline on hover
                    </Link>
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-1">
                      Always underline
                    </Typography>
                    <Link href="#" underline="always">
                      Link with permanent underline
                    </Link>
                  </div>
                </div>
              </Section>

              <Section
                title="Disabled State"
                titleLevel="h3"
                id="disabled"
                code={`<Link href="#" disabled>
  Disabled Primary Link
</Link>
<Link href="#" color="success" disabled>
  Disabled Success Link
</Link>
<Link href="https://example.com" external disabled>
  Disabled External Link
</Link>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-col gap-3">
                  <Link href="#" disabled>
                    Disabled Primary Link
                  </Link>
                  <Link href="#" color="success" disabled>
                    Disabled Success Link
                  </Link>
                  <Link href="https://example.com" external disabled>
                    Disabled External Link
                  </Link>
                </div>
              </Section>

              <Section
                title="External Links"
                titleLevel="h3"
                id="external"
                code={`<Link href="https://example.com" external>
  Visit external site
</Link>
<Link href="https://github.com" external color="neutral">
  GitHub Repository
</Link>
<Link href="https://docs.example.com" external color="primary">
  View Documentation
</Link>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  External links automatically add target="_blank" and rel="noopener noreferrer" for security, and display an external icon.
                </Typography>
                <div className="flex flex-col gap-3">
                  <Link href="https://example.com" external>
                    Visit external site
                  </Link>
                  <Link href="https://github.com" external color="neutral">
                    GitHub Repository
                  </Link>
                  <Link href="https://docs.example.com" external color="primary">
                    View Documentation
                  </Link>
                </div>
              </Section>

              <Section
                title="In Context"
                titleLevel="h3"
                id="in-context"
                code={`<Typography>
  This is a paragraph with an{' '}
  <Link href="#" color="primary">
    inline link
  </Link>{' '}
  that flows naturally with the text. You can also visit our{' '}
  <Link href="https://docs.example.com" external>
    documentation
  </Link>{' '}
  for more information.
</Typography>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Links work naturally within text content.
                </Typography>
                <Typography>
                  This is a paragraph with an{' '}
                  <Link href="#" color="primary">
                    inline link
                  </Link>{' '}
                  that flows naturally with the text. You can also visit our{' '}
                  <Link href="https://docs.example.com" external>
                    documentation
                  </Link>{' '}
                  for more information.
                </Typography>
              </Section>

              <Section
                title="Polymorphic Usage"
                titleLevel="h3"
                id="polymorphic"
                code={`import { Link as RouterLink } from 'react-router';

<Link as={RouterLink} to="/dashboard" color="primary">
  Go to Dashboard
</Link>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use the <code className="font-mono text-sm">as</code> prop to render Link with a custom component like React Router's Link.
                </Typography>
                <div className="space-y-2">
                  <pre className="text-sm bg-neutral-100 p-3 rounded">
                    {`import { Link as RouterLink } from 'react-router';

<Link as={RouterLink} to="/dashboard" color="primary">
  Go to Dashboard
</Link>`}
                  </pre>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Link} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
