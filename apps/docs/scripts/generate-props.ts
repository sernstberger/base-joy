import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as docgen from 'react-docgen-typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UI_BASE_PATH = path.resolve(__dirname, '../../../libs/ui/base/src');
const UI_COMPONENTS_PATH = path.resolve(__dirname, '../../../libs/ui/components/src');
const OUTPUT_PATH = path.resolve(__dirname, '../src/props');

// Components in ui-base (unstyled primitives)
const UI_BASE_COMPONENTS = new Set(['Item']);

// Components to extract props from (only existing components)
const COMPONENTS = [
  'Autocomplete',
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Checkbox',
  'CheckboxGroup',
  'CodeBlock',
  'Combobox',
  'Container',
  'Divider',
  'Field',
  'Fieldset',
  'Form',
  'Grid',
  'Input',
  'Item',
  'Link',
  'NumberField',
  'Radio',
  'RadioGroup',
  'Select',
  'Sheet',
  'Slider',
  'Stack',
  'Switch',
  'Table',
  'Textarea',
  'Toast',
  'Typography',
];

// Known type mappings for design system tokens
const TYPE_MAPPINGS: Record<string, string> = {
  Variant: '"solid" | "soft" | "outlined" | "plain"',
  Size: '"sm" | "md" | "lg"',
  ColorScale: '"primary" | "neutral" | "success" | "warning" | "danger"',
};

// Props we want to include even if inherited
const INCLUDE_PROPS = new Set([
  'variant', 'color', 'size', 'disabled', 'error', 'fullWidth',
  'startDecorator', 'endDecorator', 'className', 'children',
  'checked', 'defaultChecked', 'onChange', 'value', 'defaultValue',
  'placeholder', 'type', 'name', 'id', 'label', 'src', 'alt',
  'interactive', 'striped', 'hoverable', 'stickyHeader',
]);

// Props to exclude per component (irrelevant inherited props)
const EXCLUDE_PROPS: Record<string, Set<string>> = {
  Input: new Set(['alt', 'checked', 'defaultChecked', 'src']),
  Textarea: new Set(['alt', 'checked', 'defaultChecked', 'src']),
  Button: new Set(['alt', 'src']),
};

const parser = docgen.withCustomConfig(
  path.resolve(__dirname, '../../../tsconfig.base.json'),
  {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop) => {
      // Always include our key props
      if (INCLUDE_PROPS.has(prop.name)) {
        return true;
      }
      // Filter out inherited HTML props that aren't explicitly defined
      if (prop.declarations && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(
          (declaration) => {
            return !declaration.fileName.includes('node_modules');
          }
        );
        return Boolean(hasPropAdditionalDescription);
      }
      return true;
    },
  }
);

interface PropMeta {
  name: string;
  type: string;
  defaultValue?: string;
  description?: string;
  required: boolean;
}

function formatType(type: docgen.PropItem['type'], propName: string): string {
  if (!type) return 'unknown';

  let typeStr = type.name;

  // Map known design system types
  if (TYPE_MAPPINGS[typeStr]) {
    return TYPE_MAPPINGS[typeStr];
  }

  // Handle "any" that's actually a known type based on prop name
  if (typeStr === 'any') {
    if (propName === 'variant') return TYPE_MAPPINGS.Variant;
    if (propName === 'color') return TYPE_MAPPINGS.ColorScale;
    if (propName === 'size') return TYPE_MAPPINGS.Size;
  }

  // Simplify ReactNode
  if (typeStr.includes('ReactElement') || typeStr === 'ReactNode') {
    return 'React.ReactNode';
  }

  // Handle union types with literals
  if (type.name === 'enum' && type.raw) {
    return type.raw;
  }

  return typeStr;
}

function extractProps(componentName: string): PropMeta[] | null {
  const basePath = UI_BASE_COMPONENTS.has(componentName) ? UI_BASE_PATH : UI_COMPONENTS_PATH;
  const componentPath = path.join(basePath, componentName, `${componentName}.tsx`);

  if (!fs.existsSync(componentPath)) {
    console.warn(`Component not found: ${componentPath}`);
    return null;
  }

  const docs = parser.parse(componentPath);

  if (docs.length === 0) {
    console.warn(`No documentation found for ${componentName}`);
    return null;
  }

  // Find the main component (usually the one matching the filename)
  const componentDoc = docs.find(d => d.displayName === componentName) || docs[0];

  const excludeSet = EXCLUDE_PROPS[componentName] || new Set();

  const props: PropMeta[] = Object.entries(componentDoc.props)
    .filter(([name]) => !excludeSet.has(name))
    .map(([name, prop]) => ({
      name,
      type: formatType(prop.type, name),
      defaultValue: prop.defaultValue?.value,
      description: prop.description || undefined,
      required: prop.required,
    }));

  // Sort: required first, then alphabetically
  props.sort((a, b) => {
    if (a.required !== b.required) return a.required ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return props;
}

function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  const allProps: Record<string, PropMeta[]> = {};

  for (const component of COMPONENTS) {
    console.log(`Extracting props for ${component}...`);
    const props = extractProps(component);

    if (props) {
      allProps[component] = props;

      // Write individual component file
      const outputFile = path.join(OUTPUT_PATH, `${component}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(props, null, 2));
      console.log(`  -> ${props.length} props written to ${component}.json`);
    }
  }

  // Write combined index file
  const indexFile = path.join(OUTPUT_PATH, 'index.json');
  fs.writeFileSync(indexFile, JSON.stringify(allProps, null, 2));
  console.log(`\nAll props written to index.json`);

  // Generate TypeScript index file for imports
  const tsIndex = `// Auto-generated - do not edit manually
// Run "yarn props:generate" to regenerate

${COMPONENTS.map(c => `import ${c}Props from './${c}.json';`).join('\n')}

export const componentProps = {
${COMPONENTS.map(c => `  ${c}: ${c}Props,`).join('\n')}
} as const;

export type { PropMeta } from '../components/PropsTable';
`;

  fs.writeFileSync(path.join(OUTPUT_PATH, 'index.ts'), tsIndex);
  console.log('TypeScript index generated');
}

main();
