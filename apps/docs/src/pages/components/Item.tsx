import { Sheet } from '@base-joy/ui-core';
import { Item, ItemStart, ItemContent, ItemEnd } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';
import type { Size } from '@base-joy/tokens';

const itemControls: PlaygroundControl[] = [
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const itemCodeTemplate = (props: Record<string, string>) =>
  `<Item size="${props.size}">\n  <ItemStart><Icon /></ItemStart>\n  <ItemContent>Content</ItemContent>\n  <ItemEnd>End</ItemEnd>\n</Item>`;

const itemProps: PropMeta[] = [
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: 'The size of the item affecting padding.',
    required: false,
  },
  {
    name: 'interactive',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the item should have hover/focus states.',
    required: false,
  },
  {
    name: 'selected',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the item is in a selected state.',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the item is disabled.',
    required: false,
  },
  {
    name: 'as',
    type: 'React.ElementType',
    defaultValue: '"div"',
    description: 'The component used for the root node.',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content of the item (ItemStart, ItemContent, ItemEnd).',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

const slotProps: PropMeta[] = [
  {
    name: 'ItemStart',
    type: 'React.ReactNode',
    description: 'Container for leading content (icons, avatars).',
    required: false,
  },
  {
    name: 'ItemContent',
    type: 'React.ReactNode',
    description: 'Container for main content that grows to fill space.',
    required: false,
  },
  {
    name: 'ItemEnd',
    type: 'React.ReactNode',
    description: 'Container for trailing content (actions, badges).',
    required: false,
  },
];

export function ItemPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Item</Heading>
        <Text variant="subtitle">
          A structured content component with start, content, and end slots.
        </Text>
      </header>

      <Section title="Playground">
        <Playground controls={itemControls} codeTemplate={itemCodeTemplate}>
          {(props) => (
            <Sheet variant="outlined" color="neutral" className="w-full max-w-md p-0 overflow-hidden">
              <Item size={props.size as Size} interactive>
                <ItemStart>
                  <span className="w-4 h-4 bg-primary-500 rounded-full" />
                </ItemStart>
                <ItemContent>Interactive item</ItemContent>
                <ItemEnd>&rarr;</ItemEnd>
              </Item>
            </Sheet>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Basic Item</Heading>
            <Sheet variant="outlined" color="neutral" className="max-w-md">
              <Item>
                <ItemStart>
                  <span className="w-4 h-4 bg-primary-500 rounded-full" />
                </ItemStart>
                <ItemContent>Basic item with start icon</ItemContent>
                <ItemEnd>End</ItemEnd>
              </Item>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Interactive Items</Heading>
            <Sheet variant="outlined" color="neutral" className="max-w-md p-0 overflow-hidden">
              <Item interactive>
                <ItemStart>
                  <span className="w-4 h-4 bg-primary-500 rounded-full" />
                </ItemStart>
                <ItemContent>Hoverable item 1</ItemContent>
                <ItemEnd>&rarr;</ItemEnd>
              </Item>
              <Item interactive>
                <ItemStart>
                  <span className="w-4 h-4 bg-success-500 rounded-full" />
                </ItemStart>
                <ItemContent>Hoverable item 2</ItemContent>
                <ItemEnd>&rarr;</ItemEnd>
              </Item>
              <Item interactive selected>
                <ItemStart>
                  <span className="w-4 h-4 bg-warning-500 rounded-full" />
                </ItemStart>
                <ItemContent>Selected item</ItemContent>
                <ItemEnd>&check;</ItemEnd>
              </Item>
              <Item interactive disabled>
                <ItemStart>
                  <span className="w-4 h-4 bg-neutral-300 rounded-full" />
                </ItemStart>
                <ItemContent>Disabled item</ItemContent>
                <ItemEnd>&times;</ItemEnd>
              </Item>
            </Sheet>
          </div>

          <div>
            <Heading level={3}>Sizes</Heading>
            <div className="flex flex-col gap-4 max-w-md">
              <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
                <Item size="sm">
                  <ItemStart>
                    <span className="w-3 h-3 bg-primary-500 rounded-full" />
                  </ItemStart>
                  <ItemContent>Small item (sm)</ItemContent>
                </Item>
              </Sheet>
              <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
                <Item size="md">
                  <ItemStart>
                    <span className="w-4 h-4 bg-primary-500 rounded-full" />
                  </ItemStart>
                  <ItemContent>Medium item (md)</ItemContent>
                </Item>
              </Sheet>
              <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
                <Item size="lg">
                  <ItemStart>
                    <span className="w-5 h-5 bg-primary-500 rounded-full" />
                  </ItemStart>
                  <ItemContent>Large item (lg)</ItemContent>
                </Item>
              </Sheet>
            </div>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <Heading level={3}>Item Props</Heading>
        <PropsTable props={itemProps} />
      </Section>

      <Section title="Slot Components" spacing="sm">
        <PropsTable props={slotProps} />
      </Section>
    </div>
  );
}
