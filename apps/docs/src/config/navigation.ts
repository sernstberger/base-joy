export interface NavItem {
  label: string;
  path: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: 'Primitives',
    items: [
      { label: 'Sheet', path: '/components/sheet' },
      { label: 'Item', path: '/components/item' },
      { label: 'Link', path: '/components/link' },
      { label: 'Table', path: '/components/table' },
      { label: 'Card', path: '/components/card' },
      { label: 'Typography', path: '/components/typography' },
      { label: 'Badge', path: '/components/badge' },
      { label: 'Divider', path: '/components/divider' },
      { label: 'Avatar', path: '/components/avatar' },
      { label: 'Button', path: '/components/button' },
      { label: 'Input', path: '/components/input' },
      { label: 'Container', path: '/components/container' },
      { label: 'Stack', path: '/components/stack' },
      { label: 'Grid', path: '/components/grid' },
      { label: 'Textarea', path: '/components/textarea' },
    ],
  },
];
