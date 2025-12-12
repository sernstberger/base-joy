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
      { label: 'Table', path: '/components/table' },
    ],
  },
];
