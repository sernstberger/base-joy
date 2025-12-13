# Base UI Reference

## Philosophy

Base UI provides **unstyled, accessible React components**. You bring the styling; Base UI handles:
- Accessibility (ARIA patterns, keyboard navigation)
- Behavior (state management, interactions)
- Composition (compound components, render props)

## Core Principles

### 1. Accessibility by Default
Every component implements proper ARIA patterns:
- Roles and attributes
- Keyboard navigation
- Focus management
- Screen reader announcements

### 2. Unstyled Architecture
Components render minimal HTML with no styles:
- No CSS included
- No design opinions
- Full styling control via className

### 3. Composition Over Props
Complex components are built from composable parts:
```tsx
// Not this (prop drilling)
<Select options={[...]} onChange={...} />

// But this (composition)
<Select.Root>
  <Select.Trigger />
  <Select.Portal>
    <Select.Popup>
      <Select.Option value="a">A</Select.Option>
    </Select.Popup>
  </Select.Portal>
</Select.Root>
```

## Render Prop Pattern

Base UI uses render props for polymorphism:

```tsx
// Render as different element
<Button render={<a href="/page" />}>
  Link styled as button
</Button>

// Render as custom component
<Menu.Trigger render={<MyButton size="lg" />}>
  Open Menu
</Menu.Trigger>

// Access internal state
<Collapsible.Trigger render={({ open }) => (
  <button>{open ? 'Close' : 'Open'}</button>
)} />
```

## Component Categories

### Form Controls
- **Checkbox** - Toggle with indeterminate support
- **Radio** - Single selection from group
- **Switch** - On/off toggle
- **Slider** - Range selection
- **NumberField** - Numeric input with increment/decrement
- **Select** - Dropdown selection
- **Input** - Text input (use native, Base UI provides field wrapper)

### Overlays
- **Dialog** - Modal dialogs
- **AlertDialog** - Confirmation dialogs
- **Popover** - Positioned content
- **Tooltip** - Hover information
- **Menu** - Dropdown menus
- **PreviewCard** - Hover preview cards

### Disclosure
- **Accordion** - Expandable sections
- **Collapsible** - Show/hide content
- **Tabs** - Tabbed interface

### Navigation
- **NavigationMenu** - Site navigation

### Feedback
- **Progress** - Determinate progress
- **Toast** - Notifications

### Layout
- **ScrollArea** - Custom scrollbars

## Accessibility Patterns

### Focus Management

Base UI manages focus automatically:
- Dialogs trap focus
- Menus cycle through items
- Escapes close overlays

### ARIA Attributes

Components set appropriate ARIA:
```tsx
// Checkbox
<Checkbox.Root>  // role="checkbox", aria-checked
  <Checkbox.Indicator />
</Checkbox.Root>

// Dialog
<Dialog.Popup>  // role="dialog", aria-modal
  <Dialog.Title />  // aria-labelledby
</Dialog.Popup>
```

### Keyboard Navigation

| Component | Keys |
|-----------|------|
| Button | Enter, Space to activate |
| Menu | Arrow keys to navigate, Enter to select |
| Dialog | Escape to close, Tab to cycle |
| Tabs | Arrow keys to switch tabs |
| Slider | Arrow keys to adjust value |
| Checkbox | Space to toggle |

## State Management

Components expose state via data attributes:

```tsx
// Use data attributes for styling
<Checkbox.Root>  // data-checked, data-disabled
  <Checkbox.Indicator />  // data-checked
</Checkbox.Root>

// Available attributes vary by component:
// data-checked, data-unchecked
// data-disabled
// data-open, data-closed
// data-pressed
// data-selected
// data-highlighted
// data-valid, data-invalid
```

## Portal Pattern

Overlays render in portals to escape z-index/overflow issues:

```tsx
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>  // Renders at document.body
    <Dialog.Backdrop />
    <Dialog.Popup>Content</Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

## Positioner Pattern

Floating elements use positioners for placement:

```tsx
<Popover.Root>
  <Popover.Trigger />
  <Popover.Portal>
    <Popover.Positioner side="top" align="center">
      <Popover.Popup>
        <Popover.Arrow />
        Content
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

**Position options:**
- side: top, bottom, left, right
- align: start, center, end
- sideOffset: gap from trigger
- collision: flip, shift behavior

## Controlled vs Uncontrolled

Components support both patterns:

```tsx
// Uncontrolled (internal state)
<Checkbox.Root defaultChecked>

// Controlled (external state)
<Checkbox.Root checked={checked} onCheckedChange={setChecked}>
```

## Form Integration

Base UI components work with form libraries:

```tsx
// Native form submission
<form>
  <Checkbox.Root name="terms" value="accepted" />
  <button type="submit">Submit</button>
</form>

// React Hook Form, Formik, etc. work via controlled mode
```

## Common Patterns in base-joy

### Wrapping Base UI Components

```tsx
import { Button as BaseButton } from '@base-ui/react/button';

export const Button = forwardRef((props, ref) => (
  <BaseButton
    ref={ref}
    className={cn(sheetVariants({ variant, color }), className)}
    {...props}
  />
));
```

### Styling with Data Attributes

```tsx
// In Tailwind/CSS
const checkboxStyles = `
  data-[checked]:bg-primary-500
  data-[disabled]:opacity-50
`;
```

### Compound Component Wrappers

```tsx
// Expose Base UI parts through namespace
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: Dialog.Portal,  // Pass through
  Popup: DialogPopup,     // Styled wrapper
  // ...
};
```
