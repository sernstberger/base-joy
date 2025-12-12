import { Link, Sheet, Typography } from '@base-joy/ui-styled';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { ColorScale } from '@base-joy/tokens';

const linkControls: PlaygroundControl[] = [
  { name: 'color', type: 'color', defaultValue: 'primary' },
];

const linkCodeTemplate = (props: Record<string, string>) =>
  `<Link href="/page" color="${props.color}" underline="${props.underline}">Click here</Link>`;

export function LinkPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Link</Typography>
        <Typography level="body-lg">
          A styled link component with color variants, underline options, and external link support.
        </Typography>
      </header>

      <Section title="Playground">
        <Playground controls={linkControls} codeTemplate={linkCodeTemplate}>
          {(props) => (
            <Sheet variant="outlined" color="neutral" className="p-6">
              <Link
                href="#"
                color={props.color as ColorScale}
                underline={props.underline as 'none' | 'hover' | 'always'}
              >
                Click here to navigate
              </Link>
            </Sheet>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Colors</Typography>
            <Sheet variant="outlined" color="neutral" className="p-6">
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
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Underline Variants</Typography>
            <Sheet variant="outlined" color="neutral" className="p-6">
              <div className="flex flex-col gap-3">
                <div>
                  <Typography level="body-sm" className="text-sm mb-1">
                    No underline
                  </Typography>
                  <Link href="#" underline="none">
                    Link without underline
                  </Link>
                </div>
                <div>
                  <Typography level="body-sm" className="text-sm mb-1">
                    Hover underline (default)
                  </Typography>
                  <Link href="#" underline="hover">
                    Link with underline on hover
                  </Link>
                </div>
                <div>
                  <Typography level="body-sm" className="text-sm mb-1">
                    Always underline
                  </Typography>
                  <Link href="#" underline="always">
                    Link with permanent underline
                  </Link>
                </div>
              </div>
            </Sheet>
          </div>

          <div>
            <Typography level="h3">External Links</Typography>
            <Typography level="body-sm" className="mb-3">
              External links automatically add target="_blank" and rel="noopener noreferrer" for security,
              and display an external icon.
            </Typography>
            <Sheet variant="outlined" color="neutral" className="p-6">
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
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Disabled State</Typography>
            <Sheet variant="outlined" color="neutral" className="p-6">
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
            </Sheet>
          </div>

          <div>
            <Typography level="h3">In Context</Typography>
            <Typography level="body-sm" className="mb-3">
              Links work naturally within text content.
            </Typography>
            <Sheet variant="outlined" color="neutral" className="p-6">
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
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Polymorphic Usage</Typography>
            <Typography level="body-sm" className="mb-3">
              Use the `as` prop to render Link with a custom component like React Router's Link.
            </Typography>
            <Sheet variant="outlined" color="neutral" className="p-6">
              <div className="space-y-2">
                <pre className="text-sm bg-neutral-100 p-3 rounded">
                  {`import { Link as RouterLink } from 'react-router';

<Link as={RouterLink} to="/dashboard" color="primary">
  Go to Dashboard
</Link>`}
                </pre>
              </div>
            </Sheet>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={componentProps.Link} />
      </Section>
    </div>
  );
}
