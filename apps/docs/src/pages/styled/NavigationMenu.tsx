import { NavigationMenu, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';
import { useState } from 'react';

const navigationMenuControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'plain' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  {
    name: 'orientation',
    type: 'select',
    defaultValue: 'horizontal',
    options: ['horizontal', 'vertical'],
  },
];

const navigationMenuCodeTemplate = (props: Record<string, string>) =>
  `<NavigationMenu.Root variant="${props.variant}" color="${props.color}" size="${props.size}" orientation="${props.orientation}">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="products">
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner>
          <NavigationMenu.Popup>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="/products/all">All Products</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'basic-navigation', title: 'Basic Navigation', level: 3 },
  { id: 'with-dropdowns', title: 'With Dropdowns', level: 3 },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'vertical', title: 'Vertical Orientation', level: 3 },
  { id: 'active-links', title: 'Active Links', level: 3 },
  { id: 'api', title: 'API Reference' },
  { id: 'root-props', title: 'Root Props', level: 3 },
  { id: 'list-props', title: 'List Props', level: 3 },
  { id: 'item-props', title: 'Item Props', level: 3 },
  { id: 'trigger-props', title: 'Trigger Props', level: 3 },
  { id: 'link-props', title: 'Link Props', level: 3 },
  { id: 'content-props', title: 'Content Props', level: 3 },
];

const rootProps: PropMeta[] = [
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    required: false,
    defaultValue: "'plain'",
    description: 'The visual style of the navigation menu items.',
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    required: false,
    defaultValue: "'neutral'",
    description: 'The color scheme of the navigation menu items.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    required: false,
    defaultValue: "'md'",
    description: 'The size of the navigation menu.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    required: false,
    defaultValue: "'horizontal'",
    description: 'The orientation of the navigation menu.',
  },
  {
    name: 'value',
    type: 'any',
    required: false,
    defaultValue: 'null',
    description:
      'The controlled value of the navigation menu item that should be currently open.',
  },
  {
    name: 'defaultValue',
    type: 'any',
    required: false,
    defaultValue: 'null',
    description: 'The uncontrolled value of the item that should be initially selected.',
  },
  {
    name: 'onValueChange',
    type: '(value: any, eventDetails: ChangeEventDetails) => void',
    required: false,
    defaultValue: '-',
    description: 'Callback fired when the value changes.',
  },
  {
    name: 'delay',
    type: 'number',
    required: false,
    defaultValue: '50',
    description: 'How long to wait before opening the navigation menu (ms).',
  },
  {
    name: 'closeDelay',
    type: 'number',
    required: false,
    defaultValue: '50',
    description: 'How long to wait before closing the navigation menu (ms).',
  },
];

const listProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

const itemProps: PropMeta[] = [
  {
    name: 'value',
    type: 'any',
    required: false,
    defaultValue: '-',
    description:
      'A unique value that identifies this navigation menu item. If no value is provided, a unique ID will be generated automatically.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

const triggerProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

const linkProps: PropMeta[] = [
  {
    name: 'href',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'The URL to navigate to.',
  },
  {
    name: 'active',
    type: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'Whether the link is the currently active page.',
  },
  {
    name: 'closeOnClick',
    type: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'Whether to close the navigation menu when the link is clicked.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

const contentProps: PropMeta[] = [
  {
    name: 'className',
    type: 'string',
    required: false,
    defaultValue: '-',
    description: 'Additional CSS classes.',
  },
];

export function NavigationMenuPage() {
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <div>
      <ComponentHeader
        title="NavigationMenu"
        description="A navigation menu component with support for dropdowns, keyboard navigation, and accessible interactions. Built on Base UI's NavigationMenu with Joy UI-inspired styling."
        baseUiUrl="https://base-ui.com/react/components/navigation-menu"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={navigationMenuControls}
              codeTemplate={navigationMenuCodeTemplate}
            >
              {(props) => (
                <NavigationMenu.Root
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  orientation={
                    props.orientation as 'horizontal' | 'vertical'
                  }
                >
                  <NavigationMenu.List>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item value="products">
                      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                      <NavigationMenu.Portal>
                        <NavigationMenu.Positioner>
                          <NavigationMenu.Popup>
                            <NavigationMenu.Content>
                              <div className="flex flex-col gap-2 min-w-[200px]">
                                <NavigationMenu.Link href="/products/all">
                                  All Products
                                </NavigationMenu.Link>
                                <NavigationMenu.Link href="/products/new">
                                  New Arrivals
                                </NavigationMenu.Link>
                                <NavigationMenu.Link href="/products/sale">
                                  On Sale
                                </NavigationMenu.Link>
                              </div>
                            </NavigationMenu.Content>
                          </NavigationMenu.Popup>
                        </NavigationMenu.Positioner>
                      </NavigationMenu.Portal>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="/about">
                        About
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                </NavigationMenu.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Basic Navigation"
                titleLevel="h3"
                id="basic-navigation"
                code={`<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/contact">Contact</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`}
                codeLanguage="tsx"
              >
                <NavigationMenu.Root>
                  <NavigationMenu.List>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="/about">
                        About
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="/contact">
                        Contact
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                </NavigationMenu.Root>
              </Section>

              <Section
                title="With Dropdowns"
                titleLevel="h3"
                id="with-dropdowns"
                code={`<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="products">
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner>
          <NavigationMenu.Popup>
            <NavigationMenu.Content>
              <div className="flex flex-col gap-2 min-w-[200px]">
                <NavigationMenu.Link href="/products/all">All Products</NavigationMenu.Link>
                <NavigationMenu.Link href="/products/new">New Arrivals</NavigationMenu.Link>
                <NavigationMenu.Link href="/products/sale">On Sale</NavigationMenu.Link>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="company">
      <NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner>
          <NavigationMenu.Popup>
            <NavigationMenu.Content>
              <div className="flex flex-col gap-2 min-w-[200px]">
                <NavigationMenu.Link href="/about">About Us</NavigationMenu.Link>
                <NavigationMenu.Link href="/team">Our Team</NavigationMenu.Link>
                <NavigationMenu.Link href="/careers">Careers</NavigationMenu.Link>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`}
                codeLanguage="tsx"
              >
                <NavigationMenu.Root>
                  <NavigationMenu.List>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item value="products">
                      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                      <NavigationMenu.Portal>
                        <NavigationMenu.Positioner>
                          <NavigationMenu.Popup>
                            <NavigationMenu.Content>
                              <div className="flex flex-col gap-2 min-w-[200px]">
                                <NavigationMenu.Link href="/products/all">
                                  All Products
                                </NavigationMenu.Link>
                                <NavigationMenu.Link href="/products/new">
                                  New Arrivals
                                </NavigationMenu.Link>
                                <NavigationMenu.Link href="/products/sale">
                                  On Sale
                                </NavigationMenu.Link>
                              </div>
                            </NavigationMenu.Content>
                          </NavigationMenu.Popup>
                        </NavigationMenu.Positioner>
                      </NavigationMenu.Portal>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item value="company">
                      <NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
                      <NavigationMenu.Portal>
                        <NavigationMenu.Positioner>
                          <NavigationMenu.Popup>
                            <NavigationMenu.Content>
                              <div className="flex flex-col gap-2 min-w-[200px]">
                                <NavigationMenu.Link href="/about">
                                  About Us
                                </NavigationMenu.Link>
                                <NavigationMenu.Link href="/team">
                                  Our Team
                                </NavigationMenu.Link>
                                <NavigationMenu.Link href="/careers">
                                  Careers
                                </NavigationMenu.Link>
                              </div>
                            </NavigationMenu.Content>
                          </NavigationMenu.Popup>
                        </NavigationMenu.Positioner>
                      </NavigationMenu.Portal>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                </NavigationMenu.Root>
              </Section>

              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<NavigationMenu.Root variant="solid" color="primary">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Solid</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>

<NavigationMenu.Root variant="soft" color="primary">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Soft</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>

<NavigationMenu.Root variant="outlined" color="primary">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Outlined</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>

<NavigationMenu.Root variant="plain" color="primary">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Plain</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <NavigationMenu.Root variant="solid" color="primary">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">Solid</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>

                  <NavigationMenu.Root variant="soft" color="primary">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">Soft</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>

                  <NavigationMenu.Root variant="outlined" color="primary">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">Outlined</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>

                  <NavigationMenu.Root variant="plain" color="primary">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">Plain</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<NavigationMenu.Root variant="soft" color="primary">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Primary</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>

<NavigationMenu.Root variant="soft" color="neutral">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Neutral</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>

<NavigationMenu.Root variant="soft" color="success">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Success</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>

<NavigationMenu.Root variant="soft" color="warning">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Warning</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>

<NavigationMenu.Root variant="soft" color="danger">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Danger</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <NavigationMenu.Root variant="soft" color="primary">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">
                          Primary
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>

                  <NavigationMenu.Root variant="soft" color="neutral">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">
                          Neutral
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>

                  <NavigationMenu.Root variant="soft" color="success">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">
                          Success
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>

                  <NavigationMenu.Root variant="soft" color="warning">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">
                          Warning
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>

                  <NavigationMenu.Root variant="soft" color="danger">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">Danger</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<NavigationMenu.Root size="sm">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Small</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>

<NavigationMenu.Root size="md">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Medium</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>

<NavigationMenu.Root size="lg">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Large</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <NavigationMenu.Root size="sm">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">Small</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>

                  <NavigationMenu.Root size="md">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">Medium</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>

                  <NavigationMenu.Root size="lg">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link href="/">Large</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>
                </div>
              </Section>

              <Section
                title="Vertical Orientation"
                titleLevel="h3"
                id="vertical"
                code={`<NavigationMenu.Root orientation="vertical" variant="soft">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="products">
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner>
          <NavigationMenu.Popup>
            <NavigationMenu.Content>
              <div className="flex flex-col gap-2 min-w-[200px]">
                <NavigationMenu.Link href="/products/all">All Products</NavigationMenu.Link>
                <NavigationMenu.Link href="/products/new">New Arrivals</NavigationMenu.Link>
              </div>
            </NavigationMenu.Content>
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`}
                codeLanguage="tsx"
              >
                <NavigationMenu.Root orientation="vertical" variant="soft">
                  <NavigationMenu.List>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item value="products">
                      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                      <NavigationMenu.Portal>
                        <NavigationMenu.Positioner>
                          <NavigationMenu.Popup>
                            <NavigationMenu.Content>
                              <div className="flex flex-col gap-2 min-w-[200px]">
                                <NavigationMenu.Link href="/products/all">
                                  All Products
                                </NavigationMenu.Link>
                                <NavigationMenu.Link href="/products/new">
                                  New Arrivals
                                </NavigationMenu.Link>
                              </div>
                            </NavigationMenu.Content>
                          </NavigationMenu.Popup>
                        </NavigationMenu.Positioner>
                      </NavigationMenu.Portal>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link href="/about">
                        About
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                </NavigationMenu.Root>
              </Section>

              <Section
                title="Active Links"
                titleLevel="h3"
                id="active-links"
                code={`const [currentPath, setCurrentPath] = useState('/');

<NavigationMenu.Root variant="soft">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link
        href="/"
        active={currentPath === '/'}
        onClick={(e) => {
          e.preventDefault();
          setCurrentPath('/');
        }}
      >
        Home
      </NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link
        href="/about"
        active={currentPath === '/about'}
        onClick={(e) => {
          e.preventDefault();
          setCurrentPath('/about');
        }}
      >
        About
      </NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link
        href="/contact"
        active={currentPath === '/contact'}
        onClick={(e) => {
          e.preventDefault();
          setCurrentPath('/contact');
        }}
      >
        Contact
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`}
                codeLanguage="tsx"
              >
                <div>
                  <Typography level="body-sm" className="mb-4 text-neutral-600">
                    Click links to see active state (active link is highlighted)
                  </Typography>
                  <NavigationMenu.Root variant="soft">
                    <NavigationMenu.List>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link
                          href="/"
                          active={currentPath === '/'}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPath('/');
                          }}
                        >
                          Home
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link
                          href="/about"
                          active={currentPath === '/about'}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPath('/about');
                          }}
                        >
                          About
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                      <NavigationMenu.Item>
                        <NavigationMenu.Link
                          href="/contact"
                          active={currentPath === '/contact'}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPath('/contact');
                          }}
                        >
                          Contact
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.List>
                  </NavigationMenu.Root>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <Section title="Root Props" titleLevel="h3" id="root-props">
                <PropsTable props={rootProps} />
              </Section>

              <Section title="List Props" titleLevel="h3" id="list-props">
                <PropsTable props={listProps} />
              </Section>

              <Section title="Item Props" titleLevel="h3" id="item-props">
                <PropsTable props={itemProps} />
              </Section>

              <Section title="Trigger Props" titleLevel="h3" id="trigger-props">
                <PropsTable props={triggerProps} />
              </Section>

              <Section title="Link Props" titleLevel="h3" id="link-props">
                <PropsTable props={linkProps} />
              </Section>

              <Section title="Content Props" titleLevel="h3" id="content-props">
                <PropsTable props={contentProps} />
              </Section>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
