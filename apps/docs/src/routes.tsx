import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/index';
import { GettingStartedPage } from './pages/getting-started/index';
import { UnstyledItemPage } from './pages/unstyled/Item';
import { SheetPage } from './pages/styled/Sheet';
import { ItemPage } from './pages/styled/Item';
import { TablePage } from './pages/styled/Table';
import { TypographyPage } from './pages/styled/Typography';
import { BadgePage } from './pages/styled/Badge';
import { DividerPage } from './pages/styled/Divider';
import { AvatarPage } from './pages/styled/Avatar';
import { ButtonPage } from './pages/styled/Button';
import { LinkPage } from './pages/styled/Link';
import { InputPage } from './pages/styled/Input';
import { ContainerPage } from './pages/styled/Container';
import { StackPage } from './pages/styled/Stack';
import { GridPage } from './pages/styled/Grid';
import { TextareaPage } from './pages/styled/Textarea';
import { CardPage } from './pages/styled/Card';
import { FormPage } from './pages/styled/Form';
import { FieldPage } from './pages/styled/Field';
import { FieldsetPage } from './pages/styled/Fieldset';
import { CheckboxPage } from './pages/styled/Checkbox';
import { CheckboxGroupPage } from './pages/styled/CheckboxGroup';
import { RadioPage } from './pages/styled/Radio';
import { RadioGroupPage } from './pages/styled/RadioGroup';
import { SwitchPage } from './pages/styled/Switch';
import { SelectPage } from './pages/styled/Select';
import { ComboboxPage } from './pages/styled/Combobox';
import { AutocompletePage } from './pages/styled/Autocomplete';
import { SliderPage } from './pages/styled/Slider';
import { NumberFieldPage } from './pages/styled/NumberField';
import { ToastPage } from './pages/styled/Toast';
import { CodeBlockPage } from './pages/styled/CodeBlock';
import { TogglePage } from './pages/styled/Toggle';
import { ToggleGroupPage } from './pages/styled/ToggleGroup';
import { ColorInversionPage } from './pages/features/ColorInversion';
import { GlobalVariantsPage } from './pages/features/GlobalVariants';
import { AutomaticAdjustmentPage } from './pages/features/AutomaticAdjustment';
import { DarkModeOptimizationPage } from './pages/features/DarkModeOptimization';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'getting-started',
        element: <GettingStartedPage />,
      },
      {
        path: 'features/color-inversion',
        element: <ColorInversionPage />,
      },
      {
        path: 'features/global-variants',
        element: <GlobalVariantsPage />,
      },
      {
        path: 'features/automatic-adjustment',
        element: <AutomaticAdjustmentPage />,
      },
      {
        path: 'features/dark-mode-optimization',
        element: <DarkModeOptimizationPage />,
      },
      {
        path: 'unstyled/item',
        element: <UnstyledItemPage />,
      },
      {
        path: 'styled/sheet',
        element: <SheetPage />,
      },
      {
        path: 'styled/item',
        element: <ItemPage />,
      },
      {
        path: 'styled/table',
        element: <TablePage />,
      },
      {
        path: 'styled/typography',
        element: <TypographyPage />,
      },
      {
        path: 'styled/badge',
        element: <BadgePage />,
      },
      {
        path: 'styled/divider',
        element: <DividerPage />,
      },
      {
        path: 'styled/avatar',
        element: <AvatarPage />,
      },
      {
        path: 'styled/button',
        element: <ButtonPage />,
      },
      {
        path: 'styled/link',
        element: <LinkPage />,
      },
      {
        path: 'styled/input',
        element: <InputPage />,
      },
      {
        path: 'styled/container',
        element: <ContainerPage />,
      },
      {
        path: 'styled/stack',
        element: <StackPage />,
      },
      {
        path: 'styled/grid',
        element: <GridPage />,
      },
      {
        path: 'styled/textarea',
        element: <TextareaPage />,
      },
      {
        path: 'styled/card',
        element: <CardPage />,
      },
      {
        path: 'styled/form',
        element: <FormPage />,
      },
      {
        path: 'styled/field',
        element: <FieldPage />,
      },
      {
        path: 'styled/fieldset',
        element: <FieldsetPage />,
      },
      {
        path: 'styled/checkbox',
        element: <CheckboxPage />,
      },
      {
        path: 'styled/checkbox-group',
        element: <CheckboxGroupPage />,
      },
      {
        path: 'styled/radio',
        element: <RadioPage />,
      },
      {
        path: 'styled/radio-group',
        element: <RadioGroupPage />,
      },
      {
        path: 'styled/switch',
        element: <SwitchPage />,
      },
      {
        path: 'styled/select',
        element: <SelectPage />,
      },
      {
        path: 'styled/combobox',
        element: <ComboboxPage />,
      },
      {
        path: 'styled/autocomplete',
        element: <AutocompletePage />,
      },
      {
        path: 'styled/slider',
        element: <SliderPage />,
      },
      {
        path: 'styled/number-field',
        element: <NumberFieldPage />,
      },
      {
        path: 'styled/toast',
        element: <ToastPage />,
      },
      {
        path: 'styled/code-block',
        element: <CodeBlockPage />,
      },
      {
        path: 'styled/toggle',
        element: <TogglePage />,
      },
      {
        path: 'styled/toggle-group',
        element: <ToggleGroupPage />,
      },
    ],
  },
]);
