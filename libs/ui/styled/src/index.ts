// Theme system
export { ThemeProvider, useTheme, useColorScheme, type ThemeProviderProps } from './ThemeProvider';
export { type Theme, defaultTheme } from '@base-joy/tokens';
export {
  ColorSchemeProvider,
  type ColorSchemeProviderProps,
  type ColorSchemeContextValue,
} from './ColorSchemeProvider';
export { ColorSchemeToggle, type ColorSchemeToggleProps } from './ColorSchemeToggle';
export { type ColorScheme, type ResolvedColorScheme } from '@base-joy/tokens';

// Color context (automatic color adjustment)
export {
  ColorContext,
  useColorContext,
  useResolvedColorProps,
  getSolidContainerStyles,
  solidContainerStyles,
  getInvertedVariant,
  VARIANT_INVERSION_MAP,
  type ColorContextValue,
  type ResolvedColorProps,
} from './ColorContext';

// Size context (automatic size inheritance)
export {
  SizeContext,
  useSizeContext,
  useResolvedSizeProps,
  type SizeContextValue,
} from './SizeContext';

// Core styled components
export { Sheet, sheetVariants, type SheetProps } from './Sheet';
export {
  Typography,
  typographyVariants,
  type TypographyProps,
} from './Typography';
export {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  tableVariants,
  tableHeadVariants,
  tableBodyVariants,
  tableRowVariants,
  tableHeaderVariants,
  tableCellVariants,
  type TableProps,
  type TableHeadProps,
  type TableBodyProps,
  type TableRowProps,
  type TableHeaderProps,
  type TableCellProps,
  type TableVariant,
} from './Table';
export { Separator, separatorVariants, type SeparatorProps } from './Separator';
export { Badge, badgeVariants, type BadgeProps } from './Badge';
export { Chip, chipVariants, type ChipProps } from './Chip';
export {
  Avatar,
  AvatarGroup,
  avatarVariants,
  avatarGroupVariants,
  type AvatarProps,
  type AvatarGroupProps,
} from './Avatar';
export { Link, linkVariants, type LinkProps } from './Link';
export { Button, buttonVariants, type ButtonProps } from './Button';
export { Input, type InputProps } from './Input';
export { Container, containerVariants, type ContainerProps } from './Container';
export { Stack, stackVariants, type StackProps } from './Stack';
export { Textarea, textareaSizeVariants, type TextareaProps } from './Textarea';
export {
  Grid,
  GridItem,
  gridVariants,
  gridItemVariants,
  type GridProps,
  type GridItemProps,
  type GridColumns,
  type GridGap,
  type GridItemSpan,
} from './Grid';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
  cardMediaVariants,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps,
  type CardMediaProps,
} from './Card';

// Form components
export {
  Form,
  type FormProps,
} from './Form';
export {
  Field,
  fieldRootVariants,
  fieldLabelVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
  type FieldRootProps,
  type FieldLabelProps,
  type FieldControlProps,
  type FieldDescriptionProps,
  type FieldErrorProps,
} from './Field';
export {
  Fieldset,
  fieldsetRootVariants,
  fieldsetLegendVariants,
  type FieldsetRootProps,
  type FieldsetLegendProps,
} from './Fieldset';

// Selection components
export {
  Checkbox,
  checkboxRootVariants,
  checkboxIndicatorVariants,
  type CheckboxRootProps,
  type CheckboxIndicatorProps,
} from './Checkbox';
export {
  CheckboxGroup,
  checkboxGroupVariants,
  checkboxVariants as checkboxGroupCheckboxVariants,
  checkboxIndicatorVariants as checkboxGroupIndicatorVariants,
  checkboxLabelVariants,
  type CheckboxGroupProps,
  type CheckboxOption,
} from './CheckboxGroup';
export {
  Radio,
  radioRootVariants,
  radioIndicatorVariants,
  type RadioRootProps,
  type RadioIndicatorProps,
} from './Radio';
export {
  RadioGroup,
  radioGroupVariants,
  radioVariants,
  radioIndicatorVariants as radioGroupIndicatorVariants,
  labelVariants as radioLabelVariants,
  type RadioGroupProps,
  type RadioOption,
} from './RadioGroup';
export {
  Switch,
  switchRootVariants,
  switchThumbVariants,
  type SwitchProps,
} from './Switch';
export {
  Toggle,
  toggleVariants,
  ToggleGroupContext,
  useToggleGroupContext,
  type ToggleProps,
  type ToggleGroupContextValue,
} from './Toggle';
export {
  ToggleGroup,
  toggleGroupVariants,
  type ToggleGroupRootProps,
} from './ToggleGroup';
export {
  Select,
  selectTriggerVariants,
  selectPopupVariants,
  selectItemVariants,
  selectGroupLabelVariants,
  type SelectProps,
  type SelectOption,
  type SelectOptionItem,
  type SelectOptionGroup,
} from './Select';

// Input components
export {
  Slider,
  sliderRootVariants,
  sliderControlVariants,
  sliderTrackVariants,
  sliderIndicatorVariants,
  sliderThumbVariants,
  type SliderProps,
} from './Slider';
export {
  NumberField,
  numberFieldRootVariants,
  numberFieldGroupVariants,
  numberFieldInputVariants,
  numberFieldButtonVariants,
  type NumberFieldRootProps,
  type NumberFieldGroupProps,
  type NumberFieldInputProps,
  type NumberFieldIncrementProps,
  type NumberFieldDecrementProps,
} from './NumberField';
export {
  Combobox,
  comboboxInputVariants,
  comboboxTriggerVariants,
  comboboxPopupVariants,
  comboboxItemVariants,
  type ComboboxRootProps,
  type ComboboxInputProps,
  type ComboboxTriggerProps,
  type ComboboxPortalProps,
  type ComboboxPositionerProps,
  type ComboboxPopupProps,
  type ComboboxListProps,
  type ComboboxItemProps,
  type ComboboxItemIndicatorProps,
  type ComboboxItemTextProps,
  type ComboboxEmptyProps,
  type ComboboxGroupProps,
  type ComboboxGroupLabelProps,
  type ComboboxClearProps,
} from './Combobox';
export {
  Autocomplete,
  autocompleteInputVariants,
  autocompletePopupVariants,
  autocompleteItemVariants,
  autocompleteGroupLabelVariants,
  type AutocompleteProps,
  type AutocompleteOption,
  type AutocompleteOptionItem,
  type AutocompleteOptionGroup,
} from './Autocomplete';

// Item components
export {
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
  ItemIcon,
  ItemContext,
  useItemContext,
  StyledItemContext,
  useStyledItemContext,
  styledItemVariants,
  styledItemDescriptionVariants,
  styledItemEndVariants,
  itemStartVariants,
  itemContentVariants,
  itemHeaderVariants,
  itemTitleVariants,
  itemActionsVariants,
  itemFooterVariants,
  itemMediaVariants,
  itemIconVariants,
  type ItemProps,
  type ItemStartProps,
  type ItemContentProps,
  type ItemEndProps,
  type ItemHeaderProps,
  type ItemTitleProps,
  type ItemDescriptionProps,
  type ItemActionsProps,
  type ItemFooterProps,
  type ItemMediaProps,
  type ItemIconProps,
} from './Item';

// List components
export {
  List,
  ListItem,
  ListSubheader,
  ListSeparator,
  listVariants,
  listSubheaderVariants,
  ListContext,
  useListContext,
  type ListProps,
  type ListItemProps,
  type ListSubheaderProps,
  type ListSeparatorProps,
  type ListSeparatorInset,
  type ListContextValue,
  type Marker,
} from './List';

// Accordion components
export {
  Accordion,
  AccordionContext,
  useAccordionContext,
  accordionRootVariants,
  accordionItemVariants,
  accordionHeaderVariants,
  accordionTriggerVariants,
  accordionPanelVariants,
  type AccordionRootProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionTriggerProps,
  type AccordionPanelProps,
} from './Accordion';

// Collapsible components
export {
  Collapsible,
  type CollapsibleRootProps,
  type CollapsibleTriggerProps,
  type CollapsiblePanelProps,
} from './Collapsible';

// NavList components
export {
  NavList,
  NavListItem,
  NavListGroup,
  NavListGroupTrigger,
  NavListGroupContent,
  NavListContext,
  useNavListContext,
  navListGroupTriggerVariants,
  type NavListProps,
  type NavListItemProps,
  type NavListGroupProps,
  type NavListGroupTriggerProps,
  type NavListGroupContentProps,
} from './NavList';

// Code display components
export { CodeBlock, codeBlockVariants, type CodeBlockProps } from './CodeBlock';

// Feedback components
export {
  Toast,
  toastViewportVariants,
  toastRootVariants,
  toastTitleVariants,
  toastDescriptionVariants,
  type ToastProviderProps,
  type ToastViewportProps,
  type ToastRootProps,
  type ToastTitleProps,
  type ToastDescriptionProps,
  type ToastActionProps,
  type ToastCloseProps,
} from './Toast';
export {
  Tooltip,
  TooltipProvider,
  tooltipPopupVariants,
  tooltipArrowVariants,
  type TooltipProps,
  type TooltipProviderProps,
} from './Tooltip';
export {
  Popover,
  popoverPopupVariants,
  popoverArrowVariants,
  popoverTitleVariants,
  popoverDescriptionVariants,
  popoverCloseVariants,
  type PopoverRootProps,
  type PopoverTriggerProps,
  type PopoverPortalProps,
  type PopoverPositionerProps,
  type PopoverPopupProps,
  type PopoverArrowProps,
  type PopoverTitleProps,
  type PopoverDescriptionProps,
  type PopoverCloseProps,
} from './Popover';
export {
  PreviewCard,
  previewCardPopupVariants,
  previewCardArrowVariants,
  type PreviewCardRootProps,
  type PreviewCardTriggerProps,
  type PreviewCardPortalProps,
  type PreviewCardBackdropProps,
  type PreviewCardPositionerProps,
  type PreviewCardPopupProps,
  type PreviewCardArrowProps,
} from './PreviewCard';

// Tabs components
export {
  Tabs,
  tabListVariants,
  tabVariants,
  tabIndicatorVariants,
  tabPanelVariants,
  type TabsRootProps,
  type TabsListProps,
  type TabsTabProps,
  type TabsIndicatorProps,
  type TabsPanelProps,
} from './Tabs';

// Dialog components
export {
  Dialog,
  dialogPopupVariants,
  dialogBackdropVariants,
  dialogTitleVariants,
  dialogDescriptionVariants,
  dialogCloseVariants,
  type DialogRootProps,
  type DialogTriggerProps,
  type DialogPortalProps,
  type DialogBackdropProps,
  type DialogPopupProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogCloseProps,
} from './Dialog';
export {
  AlertDialog,
  alertDialogPopupVariants,
  alertDialogBackdropVariants,
  alertDialogTitleVariants,
  alertDialogDescriptionVariants,
  type AlertDialogRootProps,
  type AlertDialogTriggerProps,
  type AlertDialogPortalProps,
  type AlertDialogBackdropProps,
  type AlertDialogPopupProps,
  type AlertDialogTitleProps,
  type AlertDialogDescriptionProps,
  type AlertDialogCloseProps,
} from './AlertDialog';

// Menu components
export {
  Menu,
  menuPopupVariants,
  menuItemVariants,
  menuSeparatorVariants,
  menuGroupLabelVariants,
  type MenuRootProps,
  type MenuTriggerProps,
  type MenuPortalProps,
  type MenuPositionerProps,
  type MenuPopupProps,
  type MenuItemProps,
  type MenuSeparatorProps,
  type MenuGroupProps,
  type MenuGroupLabelProps,
  type MenuRadioGroupProps,
  type MenuRadioItemProps,
  type MenuCheckboxItemProps,
  type MenuSubmenuTriggerProps,
} from './Menu';

// NavigationMenu components
export {
  NavigationMenu,
  navigationMenuListVariants,
  navigationMenuItemVariants,
  navigationMenuTriggerVariants,
  navigationMenuLinkVariants,
  navigationMenuPopupVariants,
  navigationMenuViewportVariants,
  navigationMenuContentVariants,
  type NavigationMenuRootProps,
  type NavigationMenuListProps,
  type NavigationMenuItemProps,
  type NavigationMenuTriggerProps,
  type NavigationMenuLinkProps,
  type NavigationMenuPortalProps,
  type NavigationMenuPositionerProps,
  type NavigationMenuPopupProps,
  type NavigationMenuViewportProps,
  type NavigationMenuContentProps,
  type NavigationMenuBackdropProps,
  type NavigationMenuArrowProps,
  type NavigationMenuIconProps,
} from './NavigationMenu';

// Progress components
export {
  Progress,
  ProgressContext,
  useProgressContext,
  progressRootVariants,
  progressTrackVariants,
  progressIndicatorVariants,
  type ProgressRootProps,
  type ProgressTrackProps,
  type ProgressIndicatorProps,
} from './Progress';

// Meter components
export {
  Meter,
  MeterContext,
  useMeterContext,
  meterRootVariants,
  meterTrackVariants,
  meterIndicatorVariants,
  type MeterRootProps,
  type MeterTrackProps,
  type MeterIndicatorProps,
} from './Meter';

// ScrollArea components
export {
  ScrollArea,
  scrollbarVariants,
  scrollbarThumbVariants,
  type ScrollAreaProps,
} from './ScrollArea';

// Toolbar components
export {
  Toolbar,
  toolbarRootVariants,
  toolbarButtonVariants,
  toolbarLinkVariants,
  toolbarSeparatorVariants,
  toolbarGroupVariants,
  type ToolbarRootProps,
  type ToolbarButtonProps,
  type ToolbarLinkProps,
  type ToolbarSeparatorProps,
  type ToolbarGroupProps,
} from './Toolbar';
