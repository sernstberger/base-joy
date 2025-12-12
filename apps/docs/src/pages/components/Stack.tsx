import { Stack, Sheet, Button, Badge, Divider } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';

const stackControls: PlaygroundControl[] = [];

const stackCodeTemplate = () =>
  `<Stack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`;

export function StackPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Stack</Heading>
        <Text variant="subtitle">
          A flexible layout component for stacking elements with consistent spacing and alignment.
        </Text>
      </header>

      <Section title="Playground">
        <Playground controls={stackControls} codeTemplate={stackCodeTemplate}>
          {() => (
            <Sheet variant="outlined" color="neutral">
              <Stack spacing={4}>
                <Sheet variant="soft" color="primary" size="sm">
                  Item 1
                </Sheet>
                <Sheet variant="soft" color="neutral" size="sm">
                  Item 2
                </Sheet>
                <Sheet variant="soft" color="success" size="sm">
                  Item 3
                </Sheet>
              </Stack>
            </Sheet>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Column Direction (Default)</Heading>
            <Text variant="muted" className="mb-3">
              Stack items vertically with consistent spacing.
            </Text>
            <Sheet variant="outlined" color="neutral">
              <Stack spacing={4}>
                <Sheet variant="soft" color="neutral" size="sm">
                  First item
                </Sheet>
                <Sheet variant="soft" color="neutral" size="sm">
                  Second item
                </Sheet>
                <Sheet variant="soft" color="neutral" size="sm">
                  Third item
                </Sheet>
              </Stack>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Row Direction</Heading>
            <Text variant="muted" className="mb-3">
              Stack items horizontally for button groups and toolbars.
            </Text>
            <Sheet variant="outlined" color="neutral">
              <Stack direction="row" spacing={2} align="center">
                <Button>Primary</Button>
                <Button>Secondary</Button>
                <Button>Tertiary</Button>
              </Stack>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Alignment</Heading>
            <Text variant="muted" className="mb-3">
              Control how items align along the cross axis.
            </Text>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">
                  align="start"
                </Text>
                <Sheet variant="outlined" color="neutral">
                  <Stack direction="row" spacing={2} align="start">
                    <Sheet variant="soft" color="neutral" size="sm">
                      Small
                    </Sheet>
                    <Sheet variant="soft" color="neutral" className="p-6">
                      Larger item
                    </Sheet>
                    <Sheet variant="soft" color="neutral" size="sm">
                      Small
                    </Sheet>
                  </Stack>
                </Sheet>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  align="center"
                </Text>
                <Sheet variant="outlined" color="neutral">
                  <Stack direction="row" spacing={2} align="center">
                    <Sheet variant="soft" color="neutral" size="sm">
                      Small
                    </Sheet>
                    <Sheet variant="soft" color="neutral" className="p-6">
                      Larger item
                    </Sheet>
                    <Sheet variant="soft" color="neutral" size="sm">
                      Small
                    </Sheet>
                  </Stack>
                </Sheet>
              </div>
            </div>
          </div>

          <div>
            <Heading level={3}>Justification</Heading>
            <Text variant="muted" className="mb-3">
              Control how items are distributed along the main axis.
            </Text>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">
                  justify="between"
                </Text>
                <Sheet variant="outlined" color="neutral">
                  <Stack direction="row" justify="between">
                    <Button>Left</Button>
                    <Button>Right</Button>
                  </Stack>
                </Sheet>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  justify="center"
                </Text>
                <Sheet variant="outlined" color="neutral">
                  <Stack direction="row" justify="center" spacing={2}>
                    <Button>Center 1</Button>
                    <Button>Center 2</Button>
                  </Stack>
                </Sheet>
              </div>
            </div>
          </div>

          <div>
            <Heading level={3}>Spacing Variants</Heading>
            <Text variant="muted" className="mb-3">
              Control the gap between items.
            </Text>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">
                  spacing=0
                </Text>
                <Sheet variant="outlined" color="neutral">
                  <Stack direction="row" spacing={0}>
                    <Sheet variant="soft" color="neutral" size="sm">
                      No
                    </Sheet>
                    <Sheet variant="soft" color="neutral" size="sm">
                      Gap
                    </Sheet>
                  </Stack>
                </Sheet>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  spacing=8
                </Text>
                <Sheet variant="outlined" color="neutral">
                  <Stack direction="row" spacing={8}>
                    <Sheet variant="soft" color="neutral" size="sm">
                      Large
                    </Sheet>
                    <Sheet variant="soft" color="neutral" size="sm">
                      Gap
                    </Sheet>
                  </Stack>
                </Sheet>
              </div>
            </div>
          </div>

          <div>
            <Heading level={3}>With Dividers</Heading>
            <Text variant="muted" className="mb-3">
              Insert dividers between children for visual separation.
            </Text>
            <Sheet variant="outlined" color="neutral">
              <Stack spacing={3} divider={<Divider />}>
                <div>Section 1</div>
                <div>Section 2</div>
                <div>Section 3</div>
              </Stack>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Wrapping</Heading>
            <Text variant="muted" className="mb-3">
              Allow items to wrap to the next line.
            </Text>
            <Sheet variant="outlined" color="neutral">
              <Stack direction="row" spacing={2} wrap>
                <Badge>Tag 1</Badge>
                <Badge>Tag 2</Badge>
                <Badge>Tag 3</Badge>
                <Badge>Tag 4</Badge>
                <Badge>Tag 5</Badge>
                <Badge>Tag 6</Badge>
                <Badge>Tag 7</Badge>
                <Badge>Tag 8</Badge>
                <Badge>Tag 9</Badge>
                <Badge>Tag 10</Badge>
              </Stack>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Reverse Directions</Heading>
            <Text variant="muted" className="mb-3">
              Reverse the order of items.
            </Text>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">
                  direction="column-reverse"
                </Text>
                <Sheet variant="outlined" color="neutral">
                  <Stack direction="column-reverse" spacing={2}>
                    <Sheet variant="soft" color="neutral" size="sm">
                      First in DOM
                    </Sheet>
                    <Sheet variant="soft" color="neutral" size="sm">
                      Second in DOM
                    </Sheet>
                    <Sheet variant="soft" color="neutral" size="sm">
                      Third in DOM (appears first)
                    </Sheet>
                  </Stack>
                </Sheet>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  direction="row-reverse"
                </Text>
                <Sheet variant="outlined" color="neutral">
                  <Stack direction="row-reverse" spacing={2}>
                    <Sheet variant="soft" color="neutral" size="sm">
                      First
                    </Sheet>
                    <Sheet variant="soft" color="neutral" size="sm">
                      Second
                    </Sheet>
                    <Sheet variant="soft" color="neutral" size="sm">
                      Third (appears first)
                    </Sheet>
                  </Stack>
                </Sheet>
              </div>
            </div>
          </div>

          <div>
            <Heading level={3}>Polymorphic</Heading>
            <Text variant="muted" className="mb-3">
              Render as different HTML elements for semantic markup.
            </Text>
            <Sheet variant="outlined" color="neutral">
              <Stack as="nav" direction="row" spacing={4} aria-label="Main navigation">
                <a href="#home" className="text-primary-600 hover:underline">
                  Home
                </a>
                <a href="#about" className="text-primary-600 hover:underline">
                  About
                </a>
                <a href="#contact" className="text-primary-600 hover:underline">
                  Contact
                </a>
              </Stack>
            </Sheet>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <Heading level={3}>Stack</Heading>
        <PropsTable props={componentProps.Stack} />
      </Section>
    </div>
  );
}
