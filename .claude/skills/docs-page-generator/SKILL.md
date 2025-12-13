---
name: docs-page-generator
description: Generate documentation pages for components. Use when creating docs, adding a documentation page, writing component documentation, or setting up API docs for a component.
---

# Documentation Page Generator

Generate consistent documentation pages for base-joy components.

## File Location

Create doc pages at: `apps/docs/src/pages/styled/ComponentName.tsx`

## Page Template

```tsx
import { ComponentName, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

// Playground controls
const controls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'solid' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  // Add component-specific controls:
  // { name: 'disabled', type: 'boolean', defaultValue: false },
  // { name: 'loading', type: 'boolean', defaultValue: false },
];

// Code template for playground
const codeTemplate = (props: Record<string, string | boolean>) => {
  return `<ComponentName variant="${props.variant}" color="${props.color}" size="${props.size}">
  Content
</ComponentName>`;
};

// Table of contents sections
const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  // Add more subsections as needed:
  // { id: 'states', title: 'States', level: 3 },
  // { id: 'decorators', title: 'With Decorators', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function ComponentNamePage() {
  return (
    <div>
      <ComponentHeader
        title="ComponentName"
        description="Brief description of the component and its purpose."
        baseUiUrl="https://base-ui.com/react/components/component-name"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          {/* Playground Section */}
          <Section title="Playground" id="playground">
            <Playground controls={controls} codeTemplate={codeTemplate}>
              {(props) => (
                <ComponentName
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  Demo content
                </ComponentName>
              )}
            </Playground>
          </Section>

          {/* Examples Section */}
          <Section title="Examples" id="examples">
            <div className="space-y-8">
              {/* Variants */}
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<ComponentName variant="solid">Solid</ComponentName>
<ComponentName variant="soft">Soft</ComponentName>
<ComponentName variant="outlined">Outlined</ComponentName>
<ComponentName variant="plain">Plain</ComponentName>`}
              >
                <div className="flex flex-wrap gap-3">
                  <ComponentName variant="solid">Solid</ComponentName>
                  <ComponentName variant="soft">Soft</ComponentName>
                  <ComponentName variant="outlined">Outlined</ComponentName>
                  <ComponentName variant="plain">Plain</ComponentName>
                </div>
              </Section>

              {/* Colors */}
              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<ComponentName color="primary">Primary</ComponentName>
<ComponentName color="neutral">Neutral</ComponentName>
<ComponentName color="success">Success</ComponentName>
<ComponentName color="warning">Warning</ComponentName>
<ComponentName color="danger">Danger</ComponentName>`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-3">
                    <ComponentName color="primary">Primary</ComponentName>
                    <ComponentName color="neutral">Neutral</ComponentName>
                    <ComponentName color="success">Success</ComponentName>
                    <ComponentName color="warning">Warning</ComponentName>
                    <ComponentName color="danger">Danger</ComponentName>
                  </div>
                </div>
              </Section>

              {/* Sizes */}
              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<ComponentName size="sm">Small</ComponentName>
<ComponentName size="md">Medium</ComponentName>
<ComponentName size="lg">Large</ComponentName>`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <ComponentName size="sm">Small</ComponentName>
                  <ComponentName size="md">Medium</ComponentName>
                  <ComponentName size="lg">Large</ComponentName>
                </div>
              </Section>
            </div>
          </Section>

          {/* API Reference */}
          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.ComponentName} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
```

## Page Structure Requirements

### 1. ComponentHeader
- `title`: Component name
- `description`: Brief description (1-2 sentences)
- `baseUiUrl`: Optional link to Base UI docs (if component wraps Base UI)

### 2. Playground Section
- Define `controls` array with PlaygroundControl items
- Define `codeTemplate` function for code display
- Use proper type casting in render function

### 3. Examples Section
- Wrap subsections in `<div className="space-y-8">`
- Each subsection uses `titleLevel="h3"` and has an `id`
- Include `code` prop for expandable code examples

### 4. API Reference
- Use PropsTable with generated props
- Ensure props JSON exists: `apps/docs/src/props/ComponentName.json`

### 5. TableOfContents
- Define sections array with matching IDs
- Use `level: 3` for subsections (h3)

## Playground Control Types

```tsx
type PlaygroundControl = {
  name: string;
  type: 'variant' | 'color' | 'size' | 'boolean' | 'select' | 'text';
  defaultValue: string | boolean;
  options?: string[]; // For 'select' type
};
```

## Section Props

```tsx
<Section
  title="Title"           // Required
  titleLevel="h3"         // 'h2' (default) | 'h3' | 'h4'
  id="section-id"         // For TableOfContents navigation
  code={`...`}            // Optional: adds expandable code display
  codeLanguage="tsx"      // Optional: syntax highlighting language
  codeExpanded={false}    // Optional: start with code visible
>
  {children}
</Section>
```

## Route Registration

Add route to `apps/docs/src/main.tsx`:
```tsx
{
  path: 'styled/component-name',
  lazy: () => import('./pages/styled/ComponentName').then(m => ({ Component: m.ComponentNamePage })),
},
```

## Props Generation

1. Ensure component has proper JSDoc @default tags
2. Run `yarn props:generate` to create/update props JSON
3. Import from `componentProps`:
```tsx
import { componentProps } from '../../props';
<PropsTable props={componentProps.ComponentName} />
```

## Reference Implementations

Read these files for patterns:
- `apps/docs/src/pages/styled/Button.tsx` - Full-featured with many examples
- `apps/docs/src/pages/styled/Sheet.tsx` - Comprehensive with TOC
- `apps/docs/src/pages/styled/Badge.tsx` - Simpler component page

## Common Example Patterns

### With Decorators
```tsx
<Section title="With Decorators" titleLevel="h3" id="decorators" code={...}>
  <div className="flex flex-wrap gap-3">
    <Component startDecorator={<Icon />}>Start</Component>
    <Component endDecorator={<Icon />}>End</Component>
  </div>
</Section>
```

### States (Disabled, Error, Loading)
```tsx
<Section title="States" titleLevel="h3" id="states" code={...}>
  <div className="flex flex-wrap gap-3">
    <Component disabled>Disabled</Component>
    <Component loading>Loading</Component>
  </div>
</Section>
```

### In Context (Inside Sheet)
```tsx
<Section title="In Context" titleLevel="h3" id="in-context" code={...}>
  <Sheet variant="outlined" color="neutral">
    <Component>Inside Sheet</Component>
  </Sheet>
</Section>
```

## Checklist

- [ ] File created at `apps/docs/src/pages/styled/ComponentName.tsx`
- [ ] ComponentHeader with title, description, optional baseUiUrl
- [ ] Playground with controls and codeTemplate
- [ ] Examples section with Variants, Colors, Sizes subsections
- [ ] Each subsection has `titleLevel="h3"`, `id`, and `code` prop
- [ ] API Reference with PropsTable
- [ ] TableOfContents with matching section IDs
- [ ] Route added to `apps/docs/src/main.tsx`
- [ ] Props JSON generated with `yarn props:generate`
