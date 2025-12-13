import { ScrollArea, Typography, Sheet } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { ColorScale, Size } from '@base-joy/tokens';
import type { PropMeta } from '../../components/PropsTable';

const controls: PlaygroundControl[] = [
  {
    name: 'scrollbars',
    type: 'select',
    options: ['vertical', 'horizontal', 'both', 'none'],
    defaultValue: 'vertical',
  },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const codeTemplate = (props: Record<string, string>) => {
  return `<ScrollArea
  scrollbars="${props.scrollbars}"
  color="${props.color}"
  size="${props.size}"
  className="h-72"
>
  {/* Your scrollable content */}
</ScrollArea>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'vertical-scroll', title: 'Vertical Scroll', level: 3 },
  { id: 'horizontal-scroll', title: 'Horizontal Scroll', level: 3 },
  { id: 'both-directions', title: 'Both Directions', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'api', title: 'API Reference' },
];

const scrollAreaProps: PropMeta[] = [
  {
    name: 'scrollbars',
    type: "'vertical' | 'horizontal' | 'both' | 'none'",
    required: false,
    defaultValue: "'vertical'",
    description: 'Which scrollbars to display.',
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    required: false,
    defaultValue: "'neutral'",
    description: 'The color scheme for scrollbar thumbs.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    required: false,
    defaultValue: "'md'",
    description: 'The size of the scrollbars.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes to apply to the root element.',
  },
  {
    name: 'viewportClassName',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes to apply to the viewport element.',
  },
];

export function ScrollAreaPage() {
  return (
    <div>
      <ComponentHeader
        title="ScrollArea"
        description="A customizable scroll area component with styled scrollbars. Wraps Base UI's ScrollArea with Joy UI-inspired styling."
        baseUiUrl="https://base-ui.com/react/components/scroll-area"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={controls} codeTemplate={codeTemplate}>
              {(props) => (
                <ScrollArea
                  scrollbars={props.scrollbars as 'vertical' | 'horizontal' | 'both' | 'none'}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  className="h-72 max-w-md rounded-lg border border-neutral-200"
                  viewportClassName="p-4"
                >
                  <div className="space-y-4">
                    {Array.from({ length: 20 }, (_, i) => (
                      <Sheet key={i} variant="soft" color="neutral" className="p-4">
                        <Typography level="body-md" weight="medium">
                          Item {i + 1}
                        </Typography>
                        <Typography level="body-sm" className="text-neutral-600">
                          This is a sample item in the scrollable area. Scroll to see more items.
                        </Typography>
                      </Sheet>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Vertical Scroll"
                titleLevel="h3"
                id="vertical-scroll"
                code={`<ScrollArea scrollbars="vertical" className="h-80 w-full rounded-lg border border-neutral-200">
  <div className="space-y-4 p-4">
    {items.map((item) => (
      <Sheet key={item.id} variant="soft" color="neutral" className="p-4">
        {item.content}
      </Sheet>
    ))}
  </div>
</ScrollArea>`}
                codeLanguage="tsx"
              >
                <ScrollArea scrollbars="vertical" className="h-80 w-full rounded-lg border border-neutral-200" viewportClassName="p-4">
                  <div className="space-y-4">
                    {Array.from({ length: 15 }, (_, i) => (
                      <Sheet key={i} variant="soft" color="neutral" className="p-4">
                        <Typography level="body-md" weight="medium">
                          Item {i + 1}
                        </Typography>
                        <Typography level="body-sm" className="text-neutral-600">
                          Scrollable content
                        </Typography>
                      </Sheet>
                    ))}
                  </div>
                </ScrollArea>
              </Section>

              <Section
                title="Horizontal Scroll"
                titleLevel="h3"
                id="horizontal-scroll"
                code={`<ScrollArea scrollbars="horizontal" className="w-full rounded-lg border border-neutral-200">
  <div className="flex gap-4 p-4" style={{ width: '2000px' }}>
    {items.map((item) => (
      <Sheet key={item.id} variant="soft" color="primary" className="p-4 shrink-0 w-44">
        {item.content}
      </Sheet>
    ))}
  </div>
</ScrollArea>`}
                codeLanguage="tsx"
              >
                <ScrollArea scrollbars="horizontal" className="w-full rounded-lg border border-neutral-200" viewportClassName="p-4">
                  <div className="flex gap-4" style={{ width: '2000px' }}>
                    {Array.from({ length: 10 }, (_, i) => (
                      <Sheet key={i} variant="soft" color="primary" className="p-4 shrink-0" style={{ width: '180px' }}>
                        <Typography level="body-md" weight="medium">
                          Card {i + 1}
                        </Typography>
                      </Sheet>
                    ))}
                  </div>
                </ScrollArea>
              </Section>

              <Section
                title="Both Directions"
                titleLevel="h3"
                id="both-directions"
                code={`<ScrollArea scrollbars="both" className="h-96 w-full rounded-lg border border-neutral-200">
  <div style={{ width: '1200px', minHeight: '800px' }} className="p-4">
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <Sheet key={item.id} variant="soft" color="success" className="p-4">
          {item.content}
        </Sheet>
      ))}
    </div>
  </div>
</ScrollArea>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use both vertical and horizontal scrollbars for content that overflows in both directions.
                </Typography>
                <ScrollArea scrollbars="both" className="h-96 w-full rounded-lg border border-neutral-200" viewportClassName="p-4">
                  <div style={{ width: '1200px', minHeight: '800px' }}>
                    <div className="grid grid-cols-4 gap-4">
                      {Array.from({ length: 24 }, (_, i) => (
                        <Sheet key={i} variant="soft" color="success" className="p-4">
                          <Typography level="body-md" weight="medium">
                            Card {i + 1}
                          </Typography>
                        </Sheet>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<ScrollArea color="primary" className="h-64 w-full">
  {/* content */}
</ScrollArea>

<ScrollArea color="success" className="h-64 w-full">
  {/* content */}
</ScrollArea>

<ScrollArea color="danger" className="h-64 w-full">
  {/* content */}
</ScrollArea>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Customize the scrollbar thumb color to match your design.
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Primary
                    </Typography>
                    <ScrollArea color="primary" className="h-64 w-full rounded-lg border border-neutral-200" viewportClassName="p-4">
                      <div className="space-y-3">
                        {Array.from({ length: 12 }, (_, i) => (
                          <Sheet key={i} variant="soft" color="primary" className="p-3">
                            <Typography level="body-sm">Item {i + 1}</Typography>
                          </Sheet>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Success
                    </Typography>
                    <ScrollArea color="success" className="h-64 w-full rounded-lg border border-neutral-200" viewportClassName="p-4">
                      <div className="space-y-3">
                        {Array.from({ length: 12 }, (_, i) => (
                          <Sheet key={i} variant="soft" color="success" className="p-3">
                            <Typography level="body-sm">Item {i + 1}</Typography>
                          </Sheet>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Danger
                    </Typography>
                    <ScrollArea color="danger" className="h-64 w-full rounded-lg border border-neutral-200" viewportClassName="p-4">
                      <div className="space-y-3">
                        {Array.from({ length: 12 }, (_, i) => (
                          <Sheet key={i} variant="soft" color="danger" className="p-3">
                            <Typography level="body-sm">Item {i + 1}</Typography>
                          </Sheet>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<ScrollArea size="sm" className="h-64 w-full">
  {/* content */}
</ScrollArea>

<ScrollArea size="md" className="h-64 w-full">
  {/* content */}
</ScrollArea>

<ScrollArea size="lg" className="h-64 w-full">
  {/* content */}
</ScrollArea>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Control the thickness of the scrollbars with the size prop.
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Small
                    </Typography>
                    <ScrollArea size="sm" className="h-64 w-full rounded-lg border border-neutral-200" viewportClassName="p-4">
                      <div className="space-y-3">
                        {Array.from({ length: 12 }, (_, i) => (
                          <Sheet key={i} variant="soft" color="neutral" className="p-3">
                            <Typography level="body-sm">Item {i + 1}</Typography>
                          </Sheet>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Medium
                    </Typography>
                    <ScrollArea size="md" className="h-64 w-full rounded-lg border border-neutral-200" viewportClassName="p-4">
                      <div className="space-y-3">
                        {Array.from({ length: 12 }, (_, i) => (
                          <Sheet key={i} variant="soft" color="neutral" className="p-3">
                            <Typography level="body-sm">Item {i + 1}</Typography>
                          </Sheet>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div>
                    <Typography level="body-sm" className="mb-2">
                      Large
                    </Typography>
                    <ScrollArea size="lg" className="h-64 w-full rounded-lg border border-neutral-200" viewportClassName="p-4">
                      <div className="space-y-3">
                        {Array.from({ length: 12 }, (_, i) => (
                          <Sheet key={i} variant="soft" color="neutral" className="p-3">
                            <Typography level="body-sm">Item {i + 1}</Typography>
                          </Sheet>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={scrollAreaProps} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
