# Joy UI Reference

## Philosophy

Joy UI prioritizes **developer flexibility and theming ease** over prescriptive design constraints. It's designed for projects requiring significant customization or multi-brand applications.

Key differences from Material UI:
- Less opinionated about specific design patterns
- Simpler token naming
- More emphasis on CSS variables for runtime theming
- Cleaner, more modern aesthetic

## Global Variants System

Every interactive component supports four variants:

### solid
- **Visual**: Full-color background, contrasting text
- **Use for**: Primary actions, high emphasis, main CTAs
- **States**: Darkens on hover/active (500 → 600 → 700)

### soft
- **Visual**: Muted/tinted background, colored text
- **Use for**: Secondary actions, selections, tags, chips
- **States**: Slightly intensifies (100 → 200 → 300)

### outlined
- **Visual**: Border with transparent/subtle background
- **Use for**: Form fields, tertiary actions, less emphasis
- **States**: Adds subtle background fill on hover

### plain
- **Visual**: Text only, no background or border
- **Use for**: Minimal emphasis, inline actions, text buttons
- **States**: Adds subtle background on hover

## Color Palette

### Semantic Colors

| Color | Tokens | Use Case |
|-------|--------|----------|
| **primary** | primary-50 to primary-900 | Brand, main actions |
| **neutral** | neutral-50 to neutral-900 | Default UI, backgrounds |
| **success** | success-50 to success-900 | Positive feedback, completion |
| **warning** | warning-50 to warning-900 | Caution, attention |
| **danger** | danger-50 to danger-900 | Errors, destructive actions |

### Token Pattern

For each color, Joy UI defines:
```
{color}-50    // Lightest tint
{color}-100   // Soft background
{color}-200   // Soft hover
{color}-300   // Soft active
{color}-400   //
{color}-500   // Main/solid background
{color}-600   // Solid hover
{color}-700   // Solid active / text on light
{color}-800   // Darker text
{color}-900   // Darkest / text on soft
```

### Variant-Color Combinations

**Solid variant uses:**
- Background: {color}-500
- Text: white
- Hover: {color}-600
- Active: {color}-700

**Soft variant uses:**
- Background: {color}-100
- Text: {color}-900
- Hover: {color}-200
- Active: {color}-300

**Outlined variant uses:**
- Border: {color}-500
- Text: {color}-700
- Background: transparent → {color}-50 on hover

**Plain variant uses:**
- Text: {color}-700
- Background: transparent → {color}-50 on hover

## Typography Scale

Joy UI uses a semantic typography system:

| Level | Size | Weight | Use Case |
|-------|------|--------|----------|
| h1 | 2.25rem | Bold | Page titles |
| h2 | 1.875rem | Bold | Section headers |
| h3 | 1.5rem | Semibold | Subsections |
| h4 | 1.25rem | Semibold | Card titles |
| body-lg | 1.125rem | Normal | Large body text |
| body-md | 1rem | Normal | Default body |
| body-sm | 0.875rem | Normal | Secondary text |
| body-xs | 0.75rem | Normal | Captions, hints |

## Spacing System

Based on 8px units:
- 0.5 = 4px
- 1 = 8px
- 1.5 = 12px
- 2 = 16px
- 3 = 24px
- 4 = 32px
- 6 = 48px
- 8 = 64px

## Component Sizes

Three sizes for interactive components:

| Size | Height | Padding | Font |
|------|--------|---------|------|
| sm | 32px | 12px | 14px |
| md | 40px | 16px | 16px |
| lg | 48px | 24px | 18px |

## Border Radius

- sm: 4px
- md: 8px (default)
- lg: 12px
- xl: 16px
- full: 9999px (pills, avatars)

## Shadow/Elevation

Joy UI uses subtle shadows:
- sm: Subtle lift (cards)
- md: Moderate elevation (dropdowns)
- lg: High elevation (modals)

## Dark Mode

Joy UI supports automatic dark mode via:
- `data-joy-color-scheme="dark"` attribute
- CSS variables automatically adjust
- Same color tokens, different values

## Design Principles

1. **Consistency over novelty**: Use established patterns
2. **Hierarchy through weight**: solid > soft > outlined > plain
3. **Color means something**: Don't use semantic colors decoratively
4. **Whitespace is intentional**: Use consistent spacing
5. **Accessibility first**: Contrast ratios, focus indicators
