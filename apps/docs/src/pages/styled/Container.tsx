import { Container, Sheet, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';

const sections = [
  { id: 'examples', title: 'Examples' },
  { id: 'default', title: 'Default (Large, Centered)', level: 3 },
  { id: 'max-width', title: 'Max Width Variants', level: 3 },
  { id: 'centered', title: 'Centered vs Non-Centered', level: 3 },
  { id: 'padding', title: 'Responsive Padding', level: 3 },
  { id: 'polymorphic', title: 'Polymorphic Component', level: 3 },
  { id: 'use-cases', title: 'Common Use Cases', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function ContainerPage() {
  return (
    <div>
      <ComponentHeader
        title="Container"
        description="A responsive container with max-width constraints and automatic centering. Perfect for constraining content width on larger screens."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Examples" id="examples">
        <div className="space-y-8">
          <Section
            title="Default (Large, Centered)"
            titleLevel="h3"
            id="default"
            code={`<Container>
  <Sheet variant="soft" color="neutral">
    <p>This is the default container - max-width lg and centered with mx-auto.</p>
  </Sheet>
</Container>`}
          >
            <div className="border border-dashed border-neutral-300 p-4">
              <Container>
                <Sheet variant="soft" color="neutral">
                  <p>This is the default container - max-width lg and centered with mx-auto.</p>
                </Sheet>
              </Container>
            </div>
          </Section>

          <Section
            title="Max Width Variants"
            titleLevel="h3"
            id="max-width"
            code={`<Container maxWidth="xs">...</Container>
<Container maxWidth="sm">...</Container>
<Container maxWidth="md">...</Container>
<Container maxWidth="lg">...</Container>
<Container maxWidth="xl">...</Container>
<Container maxWidth="2xl">...</Container>
<Container maxWidth="full">...</Container>`}
          >
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" className="mb-2">Extra Small (xs)</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="xs">
                    <Sheet variant="soft" color="primary">
                      max-w-xs
                    </Sheet>
                  </Container>
                </div>
              </div>

              <div>
                <Typography level="body-sm" className="mb-2">Small (sm)</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="sm">
                    <Sheet variant="soft" color="success">
                      max-w-sm
                    </Sheet>
                  </Container>
                </div>
              </div>

              <div>
                <Typography level="body-sm" className="mb-2">Medium (md)</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="md">
                    <Sheet variant="soft" color="warning">
                      max-w-md
                    </Sheet>
                  </Container>
                </div>
              </div>

              <div>
                <Typography level="body-sm" className="mb-2">Large (lg) - Default</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="lg">
                    <Sheet variant="soft" color="danger">
                      max-w-lg
                    </Sheet>
                  </Container>
                </div>
              </div>

              <div>
                <Typography level="body-sm" className="mb-2">Extra Large (xl)</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="xl">
                    <Sheet variant="soft" color="primary">
                      max-w-xl
                    </Sheet>
                  </Container>
                </div>
              </div>

              <div>
                <Typography level="body-sm" className="mb-2">2X Large (2xl)</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="2xl">
                    <Sheet variant="soft" color="success">
                      max-w-2xl
                    </Sheet>
                  </Container>
                </div>
              </div>

              <div>
                <Typography level="body-sm" className="mb-2">Full Width</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="full">
                    <Sheet variant="soft" color="warning">
                      max-w-full (no width constraint)
                    </Sheet>
                  </Container>
                </div>
              </div>
            </div>
          </Section>

          <Section
            title="Centered vs Non-Centered"
            titleLevel="h3"
            id="centered"
            code={`<Container maxWidth="sm" centered={true}>
  <Sheet variant="outlined" color="neutral">
    This container is centered with mx-auto
  </Sheet>
</Container>

<Container maxWidth="sm" centered={false}>
  <Sheet variant="outlined" color="neutral">
    This container is not centered (no mx-auto)
  </Sheet>
</Container>`}
          >
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" className="mb-2">Centered (default)</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="sm" centered={true}>
                    <Sheet variant="outlined" color="neutral">
                      This container is centered with mx-auto
                    </Sheet>
                  </Container>
                </div>
              </div>

              <div>
                <Typography level="body-sm" className="mb-2">Not Centered</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="sm" centered={false}>
                    <Sheet variant="outlined" color="neutral">
                      This container is not centered (no mx-auto)
                    </Sheet>
                  </Container>
                </div>
              </div>
            </div>
          </Section>

          <Section
            title="Responsive Padding"
            titleLevel="h3"
            id="padding"
            code={`<Container>
  <Sheet variant="soft" color="primary">
    <p>Resize the window to see the padding adjust at different breakpoints.</p>
    <p className="mt-2 text-sm">Mobile: 1rem (16px) | Tablet: 1.5rem (24px) | Desktop: 2rem (32px)</p>
  </Sheet>
</Container>`}
          >
            <Typography level="body-sm" className="mb-4">
              Container includes responsive padding: px-4 on mobile, px-6 on tablets (sm), and px-8 on desktop (lg).
            </Typography>
            <div className="border border-dashed border-neutral-300">
              <Container>
                <Sheet variant="soft" color="primary">
                  <p>Resize the window to see the padding adjust at different breakpoints.</p>
                  <p className="mt-2 text-sm">Mobile: 1rem (16px) | Tablet: 1.5rem (24px) | Desktop: 2rem (32px)</p>
                </Sheet>
              </Container>
            </div>
          </Section>

          <Section
            title="Polymorphic Component"
            titleLevel="h3"
            id="polymorphic"
            code={`<Container as="main" maxWidth="md">
  <Sheet variant="outlined" color="neutral">
    <Typography level="h4">Main Content</Typography>
    <p>This Container renders as a &lt;main&gt; element for better semantics.</p>
  </Sheet>
</Container>`}
          >
            <Typography level="body-sm" className="mb-4">
              Use the <code className="font-mono text-sm">as</code> prop to render Container as a semantic HTML element.
            </Typography>
            <div className="border border-dashed border-neutral-300 p-4">
              <Container as="main" maxWidth="md">
                <Sheet variant="outlined" color="neutral">
                  <Typography level="h4">Main Content</Typography>
                  <p>This Container renders as a &lt;main&gt; element for better semantics.</p>
                </Sheet>
              </Container>
            </div>
          </Section>

          <Section
            title="Common Use Cases"
            titleLevel="h3"
            id="use-cases"
            code={`// Blog Post Layout - medium width for optimal reading
<Container maxWidth="md">
  <Sheet variant="outlined" color="neutral">
    <Typography level="h4">Article Title</Typography>
    <Typography level="body-sm" className="mb-3">Published on December 11, 2025</Typography>
    <p className="mb-3">This is a blog post layout using a medium-width container for optimal reading length.</p>
    <p>Studies show that line lengths of 50-75 characters improve readability.</p>
  </Sheet>
</Container>

// Form Layout - small width reduces eye strain
<Container maxWidth="sm">
  <Sheet variant="outlined" color="neutral">
    <Typography level="h4">Sign Up</Typography>
    <p className="mb-3">Forms work well in smaller containers to reduce eye strain.</p>
    <div className="space-y-2">
      <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-neutral-300 rounded" />
      <input type="password" placeholder="Password" className="w-full px-3 py-2 border border-neutral-300 rounded" />
    </div>
  </Sheet>
</Container>

// Dashboard Layout - wider for multiple columns
<Container maxWidth="2xl">
  <Sheet variant="outlined" color="neutral">
    <Typography level="h4">Dashboard</Typography>
    <p>Dashboards often need wider containers to display multiple columns of data.</p>
    <div className="grid grid-cols-3 gap-4 mt-4">
      <Sheet variant="soft" color="primary" size="sm">Metric 1</Sheet>
      <Sheet variant="soft" color="success" size="sm">Metric 2</Sheet>
      <Sheet variant="soft" color="warning" size="sm">Metric 3</Sheet>
    </div>
  </Sheet>
</Container>`}
          >
            <div className="space-y-6">
              <div>
                <Typography level="body-lg" className="mb-3">Blog Post Layout</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="md">
                    <Sheet variant="outlined" color="neutral">
                      <Typography level="h4">Article Title</Typography>
                      <Typography level="body-sm" className="mb-3">Published on December 11, 2025</Typography>
                      <p className="mb-3">
                        This is a blog post layout using a medium-width container for optimal reading length.
                      </p>
                      <p>
                        Studies show that line lengths of 50-75 characters improve readability.
                      </p>
                    </Sheet>
                  </Container>
                </div>
              </div>

              <div>
                <Typography level="body-lg" className="mb-3">Form Layout</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="sm">
                    <Sheet variant="outlined" color="neutral">
                      <Typography level="h4">Sign Up</Typography>
                      <p className="mb-3">Forms work well in smaller containers to reduce eye strain.</p>
                      <div className="space-y-2">
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full px-3 py-2 border border-neutral-300 rounded"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full px-3 py-2 border border-neutral-300 rounded"
                        />
                      </div>
                    </Sheet>
                  </Container>
                </div>
              </div>

              <div>
                <Typography level="body-lg" className="mb-3">Dashboard Layout</Typography>
                <div className="border border-dashed border-neutral-300 p-4">
                  <Container maxWidth="2xl">
                    <Sheet variant="outlined" color="neutral">
                      <Typography level="h4">Dashboard</Typography>
                      <p>Dashboards often need wider containers to display multiple columns of data.</p>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <Sheet variant="soft" color="primary" size="sm">Metric 1</Sheet>
                        <Sheet variant="soft" color="success" size="sm">Metric 2</Sheet>
                        <Sheet variant="soft" color="warning" size="sm">Metric 3</Sheet>
                      </div>
                    </Sheet>
                  </Container>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </Section>

      <Section title="API Reference" id="api">
        <PropsTable props={componentProps.Container} />
      </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
