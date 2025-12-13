import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/index';
import { GettingStartedPage } from './pages/getting-started/index';
import ThemingPage from './pages/foundation/Theming';
import CustomizeThemePage from './pages/foundation/CustomizeTheme';
import { UnstyledItemPage } from './pages/unstyled/Item';
import { SheetPage } from './pages/styled/Sheet';
import { ItemPage } from './pages/styled/Item';
import { TablePage } from './pages/styled/Table';
import { TypographyPage } from './pages/styled/Typography';
import { BadgePage } from './pages/styled/Badge';
import { SeparatorPage } from './pages/styled/Separator';
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
import { ListPage } from './pages/styled/List';
import { AccordionPage } from './pages/styled/Accordion';
import { NavListPage } from './pages/styled/NavList';
import { DialogPage } from './pages/styled/Dialog';
import { MenuPage } from './pages/styled/Menu';
import { NavigationMenuPage } from './pages/styled/NavigationMenu';
import { TabsPage } from './pages/styled/Tabs';
import { TooltipPage } from './pages/styled/Tooltip';
import { PopoverPage } from './pages/styled/Popover';
import { PreviewCardPage } from './pages/styled/PreviewCard';
import { ProgressPage } from './pages/styled/Progress';
import { MeterPage } from './pages/styled/Meter';
import { AlertDialogPage } from './pages/styled/AlertDialog';
import { CollapsiblePage } from './pages/styled/Collapsible';
import { ScrollAreaPage } from './pages/styled/ScrollArea';
import { ToolbarPage } from './pages/styled/Toolbar';
import { ColorInversionPage } from './pages/features/ColorInversion';
import { ColorContextPage } from './pages/features/ColorContext';
import { GlobalVariantsPage } from './pages/features/GlobalVariants';
import { AutomaticAdjustmentPage } from './pages/features/AutomaticAdjustment';
import { DarkModeOptimizationPage } from './pages/features/DarkModeOptimization';
import { DarkModePage } from './pages/styled/DarkMode';

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
        path: 'foundation/theming',
        element: <ThemingPage />,
      },
      {
        path: 'foundation/customize-theme',
        element: <CustomizeThemePage />,
      },
      {
        path: 'features/color-inversion',
        element: <ColorInversionPage />,
      },
      {
        path: 'features/color-context',
        element: <ColorContextPage />,
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
        path: 'styled/dark-mode',
        element: <DarkModePage />,
      },
      {
        path: 'styled/color-scheme-toggle',
        element: <DarkModePage />,
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
        path: 'styled/separator',
        element: <SeparatorPage />,
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
      {
        path: 'styled/list',
        element: <ListPage />,
      },
      {
        path: 'styled/accordion',
        element: <AccordionPage />,
      },
      {
        path: 'styled/navlist',
        element: <NavListPage />,
      },
      {
        path: 'styled/dialog',
        element: <DialogPage />,
      },
      {
        path: 'styled/menu',
        element: <MenuPage />,
      },
      {
        path: 'styled/navigation-menu',
        element: <NavigationMenuPage />,
      },
      {
        path: 'styled/tabs',
        element: <TabsPage />,
      },
      {
        path: 'styled/tooltip',
        element: <TooltipPage />,
      },
      {
        path: 'styled/popover',
        element: <PopoverPage />,
      },
      {
        path: 'styled/preview-card',
        element: <PreviewCardPage />,
      },
      {
        path: 'styled/progress',
        element: <ProgressPage />,
      },
      {
        path: 'styled/meter',
        element: <MeterPage />,
      },
      {
        path: 'styled/alert-dialog',
        element: <AlertDialogPage />,
      },
      {
        path: 'styled/collapsible',
        element: <CollapsiblePage />,
      },
      {
        path: 'styled/scroll-area',
        element: <ScrollAreaPage />,
      },
      {
        path: 'styled/toolbar',
        element: <ToolbarPage />,
      },
    ],
  },
]);
