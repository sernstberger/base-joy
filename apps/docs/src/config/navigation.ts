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
      { label: 'CodeBlock', path: '/components/code-block' },
      { label: 'Divider', path: '/components/divider' },
      { label: 'Avatar', path: '/components/avatar' },
      { label: 'Container', path: '/components/container' },
      { label: 'Stack', path: '/components/stack' },
      { label: 'Grid', path: '/components/grid' },
    ],
  },
  {
    title: 'Form',
    items: [
      { label: 'Form', path: '/components/form' },
      { label: 'Field', path: '/components/field' },
      { label: 'Fieldset', path: '/components/fieldset' },
    ],
  },
  {
    title: 'Inputs',
    items: [
      { label: 'Button', path: '/components/button' },
      { label: 'Input', path: '/components/input' },
      { label: 'Textarea', path: '/components/textarea' },
      { label: 'Checkbox', path: '/components/checkbox' },
      { label: 'CheckboxGroup', path: '/components/checkbox-group' },
      { label: 'Radio', path: '/components/radio' },
      { label: 'RadioGroup', path: '/components/radio-group' },
      { label: 'Switch', path: '/components/switch' },
      { label: 'Select', path: '/components/select' },
      { label: 'Combobox', path: '/components/combobox' },
      { label: 'Autocomplete', path: '/components/autocomplete' },
      { label: 'Slider', path: '/components/slider' },
      { label: 'NumberField', path: '/components/number-field' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { label: 'Toast', path: '/components/toast' },
    ],
  },
];
