export interface NavItem {
  label: string;
  path: string;
  baseUiUrl?: string;
  comingSoon?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

const sortByLabel = (items: NavItem[]) =>
  [...items].sort((a, b) => a.label.localeCompare(b.label));

export const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [{ label: 'Overview', path: '/getting-started' }],
  },
  {
    title: 'Base',
    items: sortByLabel([{ label: 'Item', path: '/base/item' }]),
  },
  {
    title: 'Components',
    items: sortByLabel([
      { label: 'Accordion', path: '/components/accordion', baseUiUrl: 'https://base-ui.com/react/components/accordion', comingSoon: true },
      { label: 'AlertDialog', path: '/components/alert-dialog', baseUiUrl: 'https://base-ui.com/react/components/alert-dialog', comingSoon: true },
      { label: 'Autocomplete', path: '/components/autocomplete' },
      { label: 'Avatar', path: '/components/avatar', baseUiUrl: 'https://base-ui.com/react/components/avatar' },
      { label: 'Badge', path: '/components/badge' },
      { label: 'Button', path: '/components/button', baseUiUrl: 'https://base-ui.com/react/components/button' },
      { label: 'Card', path: '/components/card' },
      { label: 'Checkbox', path: '/components/checkbox', baseUiUrl: 'https://base-ui.com/react/components/checkbox' },
      { label: 'CheckboxGroup', path: '/components/checkbox-group', baseUiUrl: 'https://base-ui.com/react/components/checkbox-group' },
      { label: 'CodeBlock', path: '/components/code-block' },
      { label: 'Collapsible', path: '/components/collapsible', baseUiUrl: 'https://base-ui.com/react/components/collapsible', comingSoon: true },
      { label: 'Combobox', path: '/components/combobox' },
      { label: 'Container', path: '/components/container' },
      { label: 'Dialog', path: '/components/dialog', baseUiUrl: 'https://base-ui.com/react/components/dialog', comingSoon: true },
      { label: 'Divider', path: '/components/divider' },
      { label: 'Field', path: '/components/field', baseUiUrl: 'https://base-ui.com/react/components/field' },
      { label: 'Fieldset', path: '/components/fieldset', baseUiUrl: 'https://base-ui.com/react/components/fieldset' },
      { label: 'Form', path: '/components/form', baseUiUrl: 'https://base-ui.com/react/components/form' },
      { label: 'Grid', path: '/components/grid' },
      { label: 'Input', path: '/components/input', baseUiUrl: 'https://base-ui.com/react/components/input' },
      { label: 'Item', path: '/components/item' },
      { label: 'Link', path: '/components/link' },
      { label: 'Menu', path: '/components/menu', baseUiUrl: 'https://base-ui.com/react/components/menu', comingSoon: true },
      { label: 'Meter', path: '/components/meter', baseUiUrl: 'https://base-ui.com/react/components/meter', comingSoon: true },
      { label: 'NavigationMenu', path: '/components/navigation-menu', baseUiUrl: 'https://base-ui.com/react/components/navigation-menu', comingSoon: true },
      { label: 'NumberField', path: '/components/number-field', baseUiUrl: 'https://base-ui.com/react/components/number-field' },
      { label: 'Popover', path: '/components/popover', baseUiUrl: 'https://base-ui.com/react/components/popover', comingSoon: true },
      { label: 'PreviewCard', path: '/components/preview-card', baseUiUrl: 'https://base-ui.com/react/components/preview-card', comingSoon: true },
      { label: 'Progress', path: '/components/progress', baseUiUrl: 'https://base-ui.com/react/components/progress', comingSoon: true },
      { label: 'Radio', path: '/components/radio', baseUiUrl: 'https://base-ui.com/react/components/radio' },
      { label: 'RadioGroup', path: '/components/radio-group', baseUiUrl: 'https://base-ui.com/react/components/radio-group' },
      { label: 'ScrollArea', path: '/components/scroll-area', baseUiUrl: 'https://base-ui.com/react/components/scroll-area', comingSoon: true },
      { label: 'Select', path: '/components/select', baseUiUrl: 'https://base-ui.com/react/components/select' },
      { label: 'Separator', path: '/components/separator', baseUiUrl: 'https://base-ui.com/react/components/separator', comingSoon: true },
      { label: 'Sheet', path: '/components/sheet' },
      { label: 'Slider', path: '/components/slider', baseUiUrl: 'https://base-ui.com/react/components/slider' },
      { label: 'Stack', path: '/components/stack' },
      { label: 'Switch', path: '/components/switch', baseUiUrl: 'https://base-ui.com/react/components/switch' },
      { label: 'Table', path: '/components/table' },
      { label: 'Tabs', path: '/components/tabs', baseUiUrl: 'https://base-ui.com/react/components/tabs', comingSoon: true },
      { label: 'Textarea', path: '/components/textarea' },
      { label: 'Toast', path: '/components/toast', baseUiUrl: 'https://base-ui.com/react/components/toast' },
      { label: 'Toggle', path: '/components/toggle', baseUiUrl: 'https://base-ui.com/react/components/toggle' },
      { label: 'ToggleGroup', path: '/components/toggle-group', baseUiUrl: 'https://base-ui.com/react/components/toggle-group' },
      { label: 'Toolbar', path: '/components/toolbar', baseUiUrl: 'https://base-ui.com/react/components/toolbar', comingSoon: true },
      { label: 'Tooltip', path: '/components/tooltip', baseUiUrl: 'https://base-ui.com/react/components/tooltip', comingSoon: true },
      { label: 'Typography', path: '/components/typography' },
    ]),
  },
];

// Helper to find navigation item by path
export const findNavItem = (path: string): NavItem | undefined => {
  for (const section of navigation) {
    const item = section.items.find((item) => item.path === path);
    if (item) return item;
  }
  return undefined;
};
