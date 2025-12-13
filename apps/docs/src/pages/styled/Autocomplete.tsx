import { Autocomplete, Typography, type AutocompleteOption } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const countries: AutocompleteOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
];

const autocompleteControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const autocompleteCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  const booleanPropsStr = booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Autocomplete
  options={countries}
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"
  placeholder="Search countries..."
  aria-label="Search countries"${booleanPropsStr}
/>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'with-groups', title: 'With Groups', level: 3 },
  { id: 'disabled', title: 'Disabled State', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function AutocompletePage() {
  return (
    <div>
      <ComponentHeader
        title="Autocomplete"
        description="An input component with automatic filtering and suggestions. Built on Base UI's Autocomplete for accessibility."
        baseUiUrl="https://base-ui.com/react/components/autocomplete"
      />
      <Typography level="body-sm" className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <strong>Autocomplete vs Combobox:</strong> Use Autocomplete when you want search suggestions
        but also allow free-form text input. Use Combobox when selection must come from a predefined
        list.
      </Typography>
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={autocompleteControls}
              codeTemplate={autocompleteCodeTemplate}
            >
              {(props) => (
                <div className="max-w-xs">
                  <Autocomplete
                    options={countries}
                    variant={props.variant as Variant}
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    disabled={props.disabled === 'true'}
                    placeholder="Search countries..."
                    aria-label="Search countries"
                  />
                </div>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Autocomplete
  options={countries}
  variant="solid"
  color="neutral"
  placeholder="Solid variant"
  aria-label="Solid variant"
/>

<Autocomplete
  options={countries}
  variant="soft"
  color="neutral"
  placeholder="Soft variant"
  aria-label="Soft variant"
/>

<Autocomplete
  options={countries}
  variant="outlined"
  color="neutral"
  placeholder="Outlined variant"
  aria-label="Outlined variant"
/>

<Autocomplete
  options={countries}
  variant="plain"
  color="neutral"
  placeholder="Plain variant"
  aria-label="Plain variant"
/>`}
              >
                <div className="space-y-4 max-w-xs">
                  <Autocomplete
                    options={countries}
                    variant="solid"
                    color="neutral"
                    placeholder="Solid variant"
                    aria-label="Solid variant"
                  />
                  <Autocomplete
                    options={countries}
                    variant="soft"
                    color="neutral"
                    placeholder="Soft variant"
                    aria-label="Soft variant"
                  />
                  <Autocomplete
                    options={countries}
                    variant="outlined"
                    color="neutral"
                    placeholder="Outlined variant"
                    aria-label="Outlined variant"
                  />
                  <Autocomplete
                    options={countries}
                    variant="plain"
                    color="neutral"
                    placeholder="Plain variant"
                    aria-label="Plain variant"
                  />
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Autocomplete
  options={countries}
  variant="soft"
  color="primary"
  placeholder="Primary"
  aria-label="Primary"
/>

<Autocomplete
  options={countries}
  variant="soft"
  color="neutral"
  placeholder="Neutral"
  aria-label="Neutral"
/>

<Autocomplete
  options={countries}
  variant="soft"
  color="success"
  placeholder="Success"
  aria-label="Success"
/>

<Autocomplete
  options={countries}
  variant="soft"
  color="warning"
  placeholder="Warning"
  aria-label="Warning"
/>

<Autocomplete
  options={countries}
  variant="soft"
  color="danger"
  placeholder="Danger"
  aria-label="Danger"
/>`}
              >
                <div className="space-y-4 max-w-xs">
                  <Autocomplete
                    options={countries}
                    variant="soft"
                    color="primary"
                    placeholder="Primary"
                    aria-label="Primary"
                  />
                  <Autocomplete
                    options={countries}
                    variant="soft"
                    color="neutral"
                    placeholder="Neutral"
                    aria-label="Neutral"
                  />
                  <Autocomplete
                    options={countries}
                    variant="soft"
                    color="success"
                    placeholder="Success"
                    aria-label="Success"
                  />
                  <Autocomplete
                    options={countries}
                    variant="soft"
                    color="warning"
                    placeholder="Warning"
                    aria-label="Warning"
                  />
                  <Autocomplete
                    options={countries}
                    variant="soft"
                    color="danger"
                    placeholder="Danger"
                    aria-label="Danger"
                  />
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Autocomplete
  options={countries}
  size="sm"
  placeholder="Small"
  aria-label="Small"
/>

<Autocomplete
  options={countries}
  size="md"
  placeholder="Medium"
  aria-label="Medium"
/>

<Autocomplete
  options={countries}
  size="lg"
  placeholder="Large"
  aria-label="Large"
/>`}
              >
                <div className="space-y-4 max-w-xs">
                  <Autocomplete
                    options={countries}
                    size="sm"
                    placeholder="Small"
                    aria-label="Small"
                  />
                  <Autocomplete
                    options={countries}
                    size="md"
                    placeholder="Medium"
                    aria-label="Medium"
                  />
                  <Autocomplete
                    options={countries}
                    size="lg"
                    placeholder="Large"
                    aria-label="Large"
                  />
                </div>
              </Section>

              <Section
                title="With Groups"
                titleLevel="h3"
                id="with-groups"
                code={`const groupedCountries: AutocompleteOption[] = [
  {
    group: 'North America',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
    ],
  },
  {
    group: 'Europe',
    options: [
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
    ],
  },
  {
    group: 'Asia Pacific',
    options: [
      { value: 'au', label: 'Australia' },
      { value: 'jp', label: 'Japan' },
    ],
  },
];

<Autocomplete
  options={groupedCountries}
  placeholder="Search regions..."
  aria-label="Search regions"
/>`}
              >
                <div className="max-w-xs">
                  <Autocomplete
                    options={[
                      {
                        group: 'North America',
                        options: [
                          { value: 'us', label: 'United States' },
                          { value: 'ca', label: 'Canada' },
                        ],
                      },
                      {
                        group: 'Europe',
                        options: [
                          { value: 'uk', label: 'United Kingdom' },
                          { value: 'de', label: 'Germany' },
                          { value: 'fr', label: 'France' },
                        ],
                      },
                      {
                        group: 'Asia Pacific',
                        options: [
                          { value: 'au', label: 'Australia' },
                          { value: 'jp', label: 'Japan' },
                        ],
                      },
                    ]}
                    placeholder="Search regions..."
                    aria-label="Search regions"
                  />
                </div>
              </Section>

              <Section
                title="Disabled State"
                titleLevel="h3"
                id="disabled"
                code={`<Autocomplete
  options={countries}
  disabled
  placeholder="Disabled autocomplete"
  aria-label="Disabled autocomplete"
/>`}
              >
                <div className="max-w-xs">
                  <Autocomplete
                    options={countries}
                    disabled
                    placeholder="Disabled autocomplete"
                    aria-label="Disabled autocomplete"
                  />
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Autocomplete} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
