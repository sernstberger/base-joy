import { Container, Sheet, Typography } from '@base-joy/ui-styled';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';

export function ContainerPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Container</Typography>
        <Typography level="body-lg">
          A responsive container with max-width constraints and automatic centering. Perfect for constraining content width on larger screens.
        </Typography>
      </header>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Default (Large, Centered)</Typography>
            <div className="border border-dashed border-neutral-300 p-4">
              <Container>
                <Sheet variant="soft" color="neutral">
                  <p>This is the default container - max-width lg and centered with mx-auto.</p>
                </Sheet>
              </Container>
            </div>
          </div>

          <div>
            <Typography level="h3">Max Width Variants</Typography>
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
          </div>

          <div>
            <Typography level="h3">Centered vs Non-Centered</Typography>
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
          </div>

          <div>
            <Typography level="h3">Responsive Padding</Typography>
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
          </div>

          <div>
            <Typography level="h3">Polymorphic Component</Typography>
            <Typography level="body-sm" className="mb-4">
              Use the `as` prop to render Container as a semantic HTML element.
            </Typography>
            <div className="border border-dashed border-neutral-300 p-4">
              <Container as="main" maxWidth="md">
                <Sheet variant="outlined" color="neutral">
                  <Typography level="h4">Main Content</Typography>
                  <p>This Container renders as a &lt;main&gt; element for better semantics.</p>
                </Sheet>
              </Container>
            </div>
          </div>

          <div>
            <Typography level="h3">Common Use Cases</Typography>
            <div className="space-y-6 mt-4">
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
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <div>
          <Typography level="h3">Container</Typography>
          <PropsTable props={componentProps.Container} />
        </div>
      </Section>
    </div>
  );
}
