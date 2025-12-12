import { Sheet, Typography } from '@base-joy/ui-components';
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
} from '@base-joy/ui-base';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { Size } from '@base-joy/tokens';

const itemControls: PlaygroundControl[] = [
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const itemCodeTemplate = (props: Record<string, string>) =>
  `<Item size="${props.size}">\n  <ItemStart><Icon /></ItemStart>\n  <ItemContent>Content</ItemContent>\n  <ItemEnd>End</ItemEnd>\n</Item>`;

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
    description: 'Container for trailing content (actions, badges).',
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
    description: 'Secondary descriptive text with muted color.',
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
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Item</Typography>
        <Typography level="body-lg">
          A structured content component with start, content, and end slots.
        </Typography>
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
            <Typography level="h3">Basic Item</Typography>
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
            <Typography level="h3">Interactive Items</Typography>
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
            <Typography level="h3">Sizes</Typography>
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

          <div>
            <Typography level="h3">Rich Card Layout</Typography>
            <Sheet variant="outlined" color="neutral" className="max-w-md p-0 overflow-hidden">
              <Item className="flex-col items-start">
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
            </Sheet>
          </div>

          <div>
            <Typography level="h3">User List with Actions</Typography>
            <Sheet variant="outlined" color="neutral" className="max-w-md p-0 overflow-hidden">
              <Item className="flex-col items-start">
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
              <Item className="flex-col items-start">
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
            </Sheet>
          </div>

          <div>
            <Typography level="h3">Notification Items</Typography>
            <Sheet variant="outlined" color="neutral" className="max-w-md p-0 overflow-hidden">
              <Item interactive className="flex-col items-start">
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
                    <ItemFooter className="text-xs text-neutral-500">2 hours ago</ItemFooter>
                  </ItemContent>
                </div>
              </Item>
              <Item interactive className="flex-col items-start">
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
                    <ItemFooter className="text-xs text-neutral-500">1 day ago</ItemFooter>
                  </ItemContent>
                </div>
              </Item>
            </Sheet>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <Typography level="h3">Item Props</Typography>
        <PropsTable props={componentProps.Item} />
      </Section>

      <Section title="Slot Components" spacing="sm">
        <PropsTable props={slotProps} />
      </Section>
    </div>
  );
}
