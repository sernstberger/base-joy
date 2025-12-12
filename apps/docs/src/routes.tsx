import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/index';
import { SheetPage } from './pages/components/Sheet';
import { ItemPage } from './pages/components/Item';
import { TablePage } from './pages/components/Table';
import { TypographyPage } from './pages/components/Typography';
import { BadgePage } from './pages/components/Badge';
import { DividerPage } from './pages/components/Divider';
import { AvatarPage } from './pages/components/Avatar';
import { ButtonPage } from './pages/components/Button';
import { LinkPage } from './pages/components/Link';
import { InputPage } from './pages/components/Input';
import { ContainerPage } from './pages/components/Container';
import { StackPage } from './pages/components/Stack';
import { GridPage } from './pages/components/Grid';
import { TextareaPage } from './pages/components/Textarea';
import { CardPage } from './pages/components/Card';
import { FormPage } from './pages/components/Form';
import { FieldPage } from './pages/components/Field';
import { FieldsetPage } from './pages/components/Fieldset';
import { CheckboxPage } from './pages/components/Checkbox';
import { CheckboxGroupPage } from './pages/components/CheckboxGroup';
import { RadioPage } from './pages/components/Radio';
import { RadioGroupPage } from './pages/components/RadioGroup';
import { SwitchPage } from './pages/components/Switch';
import { SelectPage } from './pages/components/Select';
import { ComboboxPage } from './pages/components/Combobox';
import { AutocompletePage } from './pages/components/Autocomplete';
import { SliderPage } from './pages/components/Slider';
import { NumberFieldPage } from './pages/components/NumberField';
import { ToastPage } from './pages/components/Toast';

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
        path: 'components/sheet',
        element: <SheetPage />,
      },
      {
        path: 'components/item',
        element: <ItemPage />,
      },
      {
        path: 'components/table',
        element: <TablePage />,
      },
      {
        path: 'components/typography',
        element: <TypographyPage />,
      },
      {
        path: 'components/badge',
        element: <BadgePage />,
      },
      {
        path: 'components/divider',
        element: <DividerPage />,
      },
      {
        path: 'components/avatar',
        element: <AvatarPage />,
      },
      {
        path: 'components/button',
        element: <ButtonPage />,
      },
      {
        path: 'components/link',
        element: <LinkPage />,
      },
      {
        path: 'components/input',
        element: <InputPage />,
      },
      {
        path: 'components/container',
        element: <ContainerPage />,
      },
      {
        path: 'components/stack',
        element: <StackPage />,
      },
      {
        path: 'components/grid',
        element: <GridPage />,
      },
      {
        path: 'components/textarea',
        element: <TextareaPage />,
      },
      {
        path: 'components/card',
        element: <CardPage />,
      },
      {
        path: 'components/form',
        element: <FormPage />,
      },
      {
        path: 'components/field',
        element: <FieldPage />,
      },
      {
        path: 'components/fieldset',
        element: <FieldsetPage />,
      },
      {
        path: 'components/checkbox',
        element: <CheckboxPage />,
      },
      {
        path: 'components/checkbox-group',
        element: <CheckboxGroupPage />,
      },
      {
        path: 'components/radio',
        element: <RadioPage />,
      },
      {
        path: 'components/radio-group',
        element: <RadioGroupPage />,
      },
      {
        path: 'components/switch',
        element: <SwitchPage />,
      },
      {
        path: 'components/select',
        element: <SelectPage />,
      },
      {
        path: 'components/combobox',
        element: <ComboboxPage />,
      },
      {
        path: 'components/autocomplete',
        element: <AutocompletePage />,
      },
      {
        path: 'components/slider',
        element: <SliderPage />,
      },
      {
        path: 'components/number-field',
        element: <NumberFieldPage />,
      },
      {
        path: 'components/toast',
        element: <ToastPage />,
      },
    ],
  },
]);
