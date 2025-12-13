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
    title: 'Features',
    items: [
      { label: 'Color Context', path: '/features/color-context' },
      { label: 'Color Inversion', path: '/features/color-inversion' },
      { label: 'Global Variants', path: '/features/global-variants' },
      { label: 'Automatic Adjustment', path: '/features/automatic-adjustment' },
      { label: 'Dark Mode', path: '/styled/dark-mode' },
    ],
  },
  {
    title: 'Foundation',
    items: [
      { label: 'Theming', path: '/foundation/theming' },
      { label: 'Customize Theme', path: '/foundation/customize-theme' },
    ],
  },
  {
    title: 'Styled',
    items: sortByLabel([
      { label: 'Accordion', path: '/styled/accordion', baseUiUrl: 'https://base-ui.com/react/components/accordion' },
      { label: 'AlertDialog', path: '/styled/alert-dialog', baseUiUrl: 'https://base-ui.com/react/components/alert-dialog', comingSoon: true },
      { label: 'Autocomplete', path: '/styled/autocomplete' },
      { label: 'Avatar', path: '/styled/avatar', baseUiUrl: 'https://base-ui.com/react/components/avatar' },
      { label: 'Badge', path: '/styled/badge' },
      { label: 'Button', path: '/styled/button', baseUiUrl: 'https://base-ui.com/react/components/button' },
      { label: 'Card', path: '/styled/card' },
      { label: 'Checkbox', path: '/styled/checkbox', baseUiUrl: 'https://base-ui.com/react/components/checkbox' },
      { label: 'CheckboxGroup', path: '/styled/checkbox-group', baseUiUrl: 'https://base-ui.com/react/components/checkbox-group' },
      { label: 'CodeBlock', path: '/styled/code-block' },
      { label: 'Collapsible', path: '/styled/collapsible', baseUiUrl: 'https://base-ui.com/react/components/collapsible', comingSoon: true },
      { label: 'ColorSchemeToggle', path: '/styled/color-scheme-toggle' },
      { label: 'Combobox', path: '/styled/combobox' },
      { label: 'Container', path: '/styled/container' },
      { label: 'Dialog', path: '/styled/dialog', baseUiUrl: 'https://base-ui.com/react/components/dialog', comingSoon: true },
            { label: 'Field', path: '/styled/field', baseUiUrl: 'https://base-ui.com/react/components/field' },
      { label: 'Fieldset', path: '/styled/fieldset', baseUiUrl: 'https://base-ui.com/react/components/fieldset' },
      { label: 'Form', path: '/styled/form', baseUiUrl: 'https://base-ui.com/react/components/form' },
      { label: 'Grid', path: '/styled/grid' },
      { label: 'Input', path: '/styled/input', baseUiUrl: 'https://base-ui.com/react/components/input' },
      { label: 'Item', path: '/styled/item' },
      { label: 'Link', path: '/styled/link' },
      { label: 'List', path: '/styled/list' },
      { label: 'Menu', path: '/styled/menu', baseUiUrl: 'https://base-ui.com/react/components/menu', comingSoon: true },
      { label: 'Meter', path: '/styled/meter', baseUiUrl: 'https://base-ui.com/react/components/meter', comingSoon: true },
      { label: 'NavigationMenu', path: '/styled/navigation-menu', baseUiUrl: 'https://base-ui.com/react/components/navigation-menu', comingSoon: true },
      { label: 'NavList', path: '/styled/navlist' },
      { label: 'NumberField', path: '/styled/number-field', baseUiUrl: 'https://base-ui.com/react/components/number-field' },
      { label: 'Popover', path: '/styled/popover', baseUiUrl: 'https://base-ui.com/react/components/popover', comingSoon: true },
      { label: 'PreviewCard', path: '/styled/preview-card', baseUiUrl: 'https://base-ui.com/react/components/preview-card', comingSoon: true },
      { label: 'Progress', path: '/styled/progress', baseUiUrl: 'https://base-ui.com/react/components/progress', comingSoon: true },
      { label: 'Radio', path: '/styled/radio', baseUiUrl: 'https://base-ui.com/react/components/radio' },
      { label: 'RadioGroup', path: '/styled/radio-group', baseUiUrl: 'https://base-ui.com/react/components/radio-group' },
      { label: 'ScrollArea', path: '/styled/scroll-area', baseUiUrl: 'https://base-ui.com/react/components/scroll-area', comingSoon: true },
      { label: 'Select', path: '/styled/select', baseUiUrl: 'https://base-ui.com/react/components/select' },
      { label: 'Separator', path: '/styled/separator', baseUiUrl: 'https://base-ui.com/react/components/separator' },
      { label: 'Sheet', path: '/styled/sheet' },
      { label: 'Slider', path: '/styled/slider', baseUiUrl: 'https://base-ui.com/react/components/slider' },
      { label: 'Stack', path: '/styled/stack' },
      { label: 'Switch', path: '/styled/switch', baseUiUrl: 'https://base-ui.com/react/components/switch' },
      { label: 'Table', path: '/styled/table' },
      { label: 'Tabs', path: '/styled/tabs', baseUiUrl: 'https://base-ui.com/react/components/tabs', comingSoon: true },
      { label: 'Textarea', path: '/styled/textarea' },
      { label: 'Toast', path: '/styled/toast', baseUiUrl: 'https://base-ui.com/react/components/toast' },
      { label: 'Toggle', path: '/styled/toggle', baseUiUrl: 'https://base-ui.com/react/components/toggle' },
      { label: 'ToggleGroup', path: '/styled/toggle-group', baseUiUrl: 'https://base-ui.com/react/components/toggle-group' },
      { label: 'Toolbar', path: '/styled/toolbar', baseUiUrl: 'https://base-ui.com/react/components/toolbar', comingSoon: true },
      { label: 'Tooltip', path: '/styled/tooltip', baseUiUrl: 'https://base-ui.com/react/components/tooltip', comingSoon: true },
      { label: 'Typography', path: '/styled/typography' },
    ]),
  },
  {
    title: 'Unstyled',
    items: sortByLabel([{ label: 'Item', path: '/unstyled/item' }]),
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
