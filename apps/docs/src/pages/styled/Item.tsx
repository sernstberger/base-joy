import { Typography } from '@base-joy/ui-styled';
import {
  Item,
  ItemStart,
  ItemContent,
  ItemEnd,
  ItemHeader,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemFooter,
  ItemMedia,
} from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Size, Variant, ColorScale } from '@base-joy/tokens';

const itemControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'interactive', type: 'boolean', defaultValue: true },
  { name: 'selected', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const itemCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.interactive === 'true' || props.interactive === true) booleanProps.push('interactive');
  if (props.selected === 'true' || props.selected === true) booleanProps.push('selected');
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  const booleanPropsStr = booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Item variant="${props.variant}" color="${props.color}" size="${props.size}"${booleanPropsStr}>
  <ItemStart><Icon /></ItemStart>
  <ItemContent>Content</ItemContent>
  <ItemEnd>End</ItemEnd>
</Item>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'interactive', title: 'Interactive Items', level: 3 },
  { id: 'rich-layout', title: 'Rich Card Layout', level: 3 },
  { id: 'user-list', title: 'User List with Actions', level: 3 },
  { id: 'notifications', title: 'Notification Items', level: 3 },
  { id: 'api', title: 'API Reference' },
  { id: 'slots', title: 'Slot Components', level: 3 },
];

const slotProps: PropMeta[] = [
  {
    name: 'ItemStart',
    type: 'React.ReactNode',
    description: 'Container for leading content (icons, small avatars).',
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
    description: 'Container for trailing content. Color-aware text styling.',
    required: false,
  },
  {
    name: 'ItemMedia',
    type: 'React.ReactNode',
    description: 'Container for larger media content (avatars, images).',
    required: false,
  },
  {
    name: 'ItemHeader',
    type: 'React.ReactNode',
    description: 'Container for title and actions with flex justify-between layout.',
    required: false,
  },
  {
    name: 'ItemTitle',
    type: 'React.ReactNode',
    description: 'Primary heading text (h3 element).',
    required: false,
  },
  {
    name: 'ItemDescription',
    type: 'React.ReactNode',
    description: 'Secondary descriptive text. Color-aware styling.',
    required: false,
  },
  {
    name: 'ItemActions',
    type: 'React.ReactNode',
    description: 'Right-aligned action area for buttons or controls.',
    required: false,
  },
  {
    name: 'ItemFooter',
    type: 'React.ReactNode',
    description: 'Bottom content area with optional border-top.',
    required: false,
  },
];

export function ItemPage() {
  return (
    <div>
      <ComponentHeader
        title="Item"
        description="A styled content component with variant, color, and size support for building list items, menu items, and structured content."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={itemControls} codeTemplate={itemCodeTemplate}>
              {(props) => {
                const interactive = props.interactive === 'true';
                const selected = props.selected === 'true';
                const disabled = props.disabled === 'true';

                return (
                  <div className="w-full max-w-md">
                    <Item
                      variant={props.variant as Variant}
                      color={props.color as ColorScale}
                      size={props.size as Size}
                      interactive={interactive}
                      selected={selected}
                      disabled={disabled}
                    >
                      <ItemStart>
                        <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
                      </ItemStart>
                      <ItemContent>Interactive item</ItemContent>
                      <ItemEnd>&rarr;</ItemEnd>
                    </Item>
                  </div>
                );
              }}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Item variant="solid" color="primary">
  <ItemStart>
    <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
  </ItemStart>
  <ItemContent>Solid variant</ItemContent>
</Item>
<Item variant="soft" color="primary">
  <ItemStart>
    <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
  </ItemStart>
  <ItemContent>Soft variant (default)</ItemContent>
</Item>
<Item variant="outlined" color="primary">
  <ItemStart>
    <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
  </ItemStart>
  <ItemContent>Outlined variant</ItemContent>
</Item>
<Item variant="plain" color="primary">
  <ItemStart>
    <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
  </ItemStart>
  <ItemContent>Plain variant</ItemContent>
</Item>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4 max-w-md">
                  <Item variant="solid" color="primary">
                    <ItemStart>
                      <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
                    </ItemStart>
                    <ItemContent>Solid variant</ItemContent>
                  </Item>
                  <Item variant="soft" color="primary">
                    <ItemStart>
                      <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
                    </ItemStart>
                    <ItemContent>Soft variant (default)</ItemContent>
                  </Item>
                  <Item variant="outlined" color="primary">
                    <ItemStart>
                      <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
                    </ItemStart>
                    <ItemContent>Outlined variant</ItemContent>
                  </Item>
                  <Item variant="plain" color="primary">
                    <ItemStart>
                      <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
                    </ItemStart>
                    <ItemContent>Plain variant</ItemContent>
                  </Item>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Item color="primary">
  <ItemContent>Primary</ItemContent>
  <ItemDescription>With color-aware description</ItemDescription>
</Item>
<Item color="neutral">
  <ItemContent>Neutral</ItemContent>
  <ItemDescription>With color-aware description</ItemDescription>
</Item>
<Item color="success">
  <ItemContent>Success</ItemContent>
  <ItemDescription>With color-aware description</ItemDescription>
</Item>
<Item color="warning">
  <ItemContent>Warning</ItemContent>
  <ItemDescription>With color-aware description</ItemDescription>
</Item>
<Item color="danger">
  <ItemContent>Danger</ItemContent>
  <ItemDescription>With color-aware description</ItemDescription>
</Item>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4 max-w-md">
                  <Item color="primary">
                    <ItemContent>Primary</ItemContent>
                    <ItemDescription>With color-aware description</ItemDescription>
                  </Item>
                  <Item color="neutral">
                    <ItemContent>Neutral</ItemContent>
                    <ItemDescription>With color-aware description</ItemDescription>
                  </Item>
                  <Item color="success">
                    <ItemContent>Success</ItemContent>
                    <ItemDescription>With color-aware description</ItemDescription>
                  </Item>
                  <Item color="warning">
                    <ItemContent>Warning</ItemContent>
                    <ItemDescription>With color-aware description</ItemDescription>
                  </Item>
                  <Item color="danger">
                    <ItemContent>Danger</ItemContent>
                    <ItemDescription>With color-aware description</ItemDescription>
                  </Item>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Item size="sm" variant="outlined" color="neutral">
  <ItemStart>
    <span className="w-3 h-3 bg-neutral-400 rounded-full" />
  </ItemStart>
  <ItemContent>Small item (sm)</ItemContent>
</Item>
<Item size="md" variant="outlined" color="neutral">
  <ItemStart>
    <span className="w-4 h-4 bg-neutral-400 rounded-full" />
  </ItemStart>
  <ItemContent>Medium item (md)</ItemContent>
</Item>
<Item size="lg" variant="outlined" color="neutral">
  <ItemStart>
    <span className="w-5 h-5 bg-neutral-400 rounded-full" />
  </ItemStart>
  <ItemContent>Large item (lg)</ItemContent>
</Item>`}
                codeLanguage="tsx"
              >
                <div className="flex flex-col gap-4 max-w-md">
                  <Item size="sm" variant="outlined" color="neutral">
                    <ItemStart>
                      <span className="w-3 h-3 bg-neutral-400 rounded-full" />
                    </ItemStart>
                    <ItemContent>Small item (sm)</ItemContent>
                  </Item>
                  <Item size="md" variant="outlined" color="neutral">
                    <ItemStart>
                      <span className="w-4 h-4 bg-neutral-400 rounded-full" />
                    </ItemStart>
                    <ItemContent>Medium item (md)</ItemContent>
                  </Item>
                  <Item size="lg" variant="outlined" color="neutral">
                    <ItemStart>
                      <span className="w-5 h-5 bg-neutral-400 rounded-full" />
                    </ItemStart>
                    <ItemContent>Large item (lg)</ItemContent>
                  </Item>
                </div>
              </Section>

              <Section
                title="Interactive Items"
                titleLevel="h3"
                id="interactive"
                code={`<Item interactive color="primary">
  <ItemStart>
    <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
  </ItemStart>
  <ItemContent>Hoverable item 1</ItemContent>
  <ItemEnd>&rarr;</ItemEnd>
</Item>
<Item interactive color="success">
  <ItemStart>
    <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
  </ItemStart>
  <ItemContent>Hoverable item 2</ItemContent>
  <ItemEnd>&rarr;</ItemEnd>
</Item>
<Item interactive selected color="primary">
  <ItemStart>
    <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
  </ItemStart>
  <ItemContent>Selected item</ItemContent>
  <ItemEnd>&check;</ItemEnd>
</Item>
<Item interactive disabled color="neutral">
  <ItemStart>
    <span className="w-4 h-4 bg-current opacity-20 rounded-full" />
  </ItemStart>
  <ItemContent>Disabled item</ItemContent>
  <ItemEnd>&times;</ItemEnd>
</Item>`}
                codeLanguage="tsx"
              >
                <div className="max-w-md space-y-2">
                  <Item interactive color="primary">
                    <ItemStart>
                      <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
                    </ItemStart>
                    <ItemContent>Hoverable item 1</ItemContent>
                    <ItemEnd>&rarr;</ItemEnd>
                  </Item>
                  <Item interactive color="success">
                    <ItemStart>
                      <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
                    </ItemStart>
                    <ItemContent>Hoverable item 2</ItemContent>
                    <ItemEnd>&rarr;</ItemEnd>
                  </Item>
                  <Item interactive selected color="primary">
                    <ItemStart>
                      <span className="w-4 h-4 bg-current opacity-50 rounded-full" />
                    </ItemStart>
                    <ItemContent>Selected item</ItemContent>
                    <ItemEnd>&check;</ItemEnd>
                  </Item>
                  <Item interactive disabled color="neutral">
                    <ItemStart>
                      <span className="w-4 h-4 bg-current opacity-20 rounded-full" />
                    </ItemStart>
                    <ItemContent>Disabled item</ItemContent>
                    <ItemEnd>&times;</ItemEnd>
                  </Item>
                </div>
              </Section>

              <Section
                title="Rich Card Layout"
                titleLevel="h3"
                id="rich-layout"
                code={`<Item variant="outlined" color="neutral" className="max-w-md flex-col items-start">
  <div className="flex items-start gap-3 w-full">
    <ItemMedia>
      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
        JD
      </div>
    </ItemMedia>
    <ItemContent className="flex-col">
      <ItemHeader>
        <ItemTitle>John Doe</ItemTitle>
        <ItemActions>
          <button className="px-3 py-1 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            Follow
          </button>
        </ItemActions>
      </ItemHeader>
      <ItemDescription>
        Software Engineer at Acme Corp. Building the future of web development.
      </ItemDescription>
    </ItemContent>
  </div>
  <ItemFooter bordered className="text-sm text-neutral-500">
    <div className="flex items-center gap-4">
      <span>Joined Dec 2024</span>
      <span>&middot;</span>
      <span>San Francisco, CA</span>
    </div>
  </ItemFooter>
</Item>`}
                codeLanguage="tsx"
              >
                <Item variant="outlined" color="neutral" className="max-w-md flex-col items-start">
                  <div className="flex items-start gap-3 w-full">
                    <ItemMedia>
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                    </ItemMedia>
                    <ItemContent className="flex-col">
                      <ItemHeader>
                        <ItemTitle>John Doe</ItemTitle>
                        <ItemActions>
                          <button className="px-3 py-1 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                            Follow
                          </button>
                        </ItemActions>
                      </ItemHeader>
                      <ItemDescription>
                        Software Engineer at Acme Corp. Building the future of web development.
                      </ItemDescription>
                    </ItemContent>
                  </div>
                  <ItemFooter bordered className="text-sm text-neutral-500">
                    <div className="flex items-center gap-4">
                      <span>Joined Dec 2024</span>
                      <span>&middot;</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </ItemFooter>
                </Item>
              </Section>

              <Section
                title="User List with Actions"
                titleLevel="h3"
                id="user-list"
                code={`<Item variant="soft" color="neutral" className="flex-col items-start">
  <div className="flex items-center gap-3 w-full">
    <ItemMedia>
      <div className="w-10 h-10 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center text-white font-semibold">
        AS
      </div>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Alice Smith</ItemTitle>
      <ItemDescription>Product Designer</ItemDescription>
    </ItemContent>
    <ItemActions>
      <button className="text-sm text-primary-500 hover:text-primary-600">
        Message
      </button>
    </ItemActions>
  </div>
</Item>
<Item variant="soft" color="neutral" className="flex-col items-start">
  <div className="flex items-center gap-3 w-full">
    <ItemMedia>
      <div className="w-10 h-10 bg-gradient-to-br from-warning-400 to-warning-600 rounded-full flex items-center justify-center text-white font-semibold">
        BJ
      </div>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Bob Johnson</ItemTitle>
      <ItemDescription>Frontend Developer</ItemDescription>
    </ItemContent>
    <ItemActions>
      <button className="text-sm text-primary-500 hover:text-primary-600">
        Message
      </button>
    </ItemActions>
  </div>
</Item>`}
                codeLanguage="tsx"
              >
                <div className="max-w-md space-y-2">
                  <Item variant="soft" color="neutral" className="flex-col items-start">
                    <div className="flex items-center gap-3 w-full">
                      <ItemMedia>
                        <div className="w-10 h-10 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center text-white font-semibold">
                          AS
                        </div>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Alice Smith</ItemTitle>
                        <ItemDescription>Product Designer</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <button className="text-sm text-primary-500 hover:text-primary-600">
                          Message
                        </button>
                      </ItemActions>
                    </div>
                  </Item>
                  <Item variant="soft" color="neutral" className="flex-col items-start">
                    <div className="flex items-center gap-3 w-full">
                      <ItemMedia>
                        <div className="w-10 h-10 bg-gradient-to-br from-warning-400 to-warning-600 rounded-full flex items-center justify-center text-white font-semibold">
                          BJ
                        </div>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Bob Johnson</ItemTitle>
                        <ItemDescription>Frontend Developer</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <button className="text-sm text-primary-500 hover:text-primary-600">
                          Message
                        </button>
                      </ItemActions>
                    </div>
                  </Item>
                </div>
              </Section>

              <Section
                title="Notification Items"
                titleLevel="h3"
                id="notifications"
                code={`<Item interactive variant="soft" color="primary" className="flex-col items-start">
  <div className="flex items-start gap-3 w-full">
    <ItemStart>
      <span className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs">
        &#9733;
      </span>
    </ItemStart>
    <ItemContent>
      <ItemTitle>New feature available</ItemTitle>
      <ItemDescription>
        Check out our new dark mode feature. You can enable it in settings.
      </ItemDescription>
      <ItemFooter className="text-xs">2 hours ago</ItemFooter>
    </ItemContent>
  </div>
</Item>
<Item interactive variant="soft" color="success" className="flex-col items-start">
  <div className="flex items-start gap-3 w-full">
    <ItemStart>
      <span className="w-5 h-5 bg-success-500 rounded-full flex items-center justify-center text-white text-xs">
        &#10003;
      </span>
    </ItemStart>
    <ItemContent>
      <ItemTitle>Update completed</ItemTitle>
      <ItemDescription>
        Your profile has been successfully updated.
      </ItemDescription>
      <ItemFooter className="text-xs">1 day ago</ItemFooter>
    </ItemContent>
  </div>
</Item>`}
                codeLanguage="tsx"
              >
                <div className="max-w-md space-y-2">
                  <Item interactive variant="soft" color="primary" className="flex-col items-start">
                    <div className="flex items-start gap-3 w-full">
                      <ItemStart>
                        <span className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs">
                          &#9733;
                        </span>
                      </ItemStart>
                      <ItemContent>
                        <ItemTitle>New feature available</ItemTitle>
                        <ItemDescription>
                          Check out our new dark mode feature. You can enable it in settings.
                        </ItemDescription>
                        <ItemFooter className="text-xs">2 hours ago</ItemFooter>
                      </ItemContent>
                    </div>
                  </Item>
                  <Item interactive variant="soft" color="success" className="flex-col items-start">
                    <div className="flex items-start gap-3 w-full">
                      <ItemStart>
                        <span className="w-5 h-5 bg-success-500 rounded-full flex items-center justify-center text-white text-xs">
                          &#10003;
                        </span>
                      </ItemStart>
                      <ItemContent>
                        <ItemTitle>Update completed</ItemTitle>
                        <ItemDescription>
                          Your profile has been successfully updated.
                        </ItemDescription>
                        <ItemFooter className="text-xs">1 day ago</ItemFooter>
                      </ItemContent>
                    </div>
                  </Item>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h3" id="item-props" className="mb-4">
                  Item Props
                </Typography>
                <PropsTable props={componentProps.Item} />
              </div>

              <div>
                <Typography level="h3" id="slots" className="mb-4">
                  Slot Components
                </Typography>
                <PropsTable props={slotProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
