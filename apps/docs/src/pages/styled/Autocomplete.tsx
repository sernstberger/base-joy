import { Autocomplete } from '@base-joy/ui-styled';
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

const countries = [
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

  return `<Autocomplete.Root variant="${props.variant}" color="${props.color}" size="${props.size}"${booleanPropsStr}>
  <Autocomplete.Input placeholder="Search countries..." />
  <Autocomplete.Portal>
    <Autocomplete.Positioner>
      <Autocomplete.Popup>
        <Autocomplete.List>
          {countries.map((country) => (
            <Autocomplete.Item key={country.value} value={country.value}>
              <Autocomplete.ItemText>{country.label}</Autocomplete.ItemText>
            </Autocomplete.Item>
          ))}
        </Autocomplete.List>
        <Autocomplete.Empty>No countries found</Autocomplete.Empty>
      </Autocomplete.Popup>
    </Autocomplete.Positioner>
  </Autocomplete.Portal>
</Autocomplete.Root>`;
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
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={autocompleteControls}
              codeTemplate={autocompleteCodeTemplate}
            >
              {(props) => (
                <div className="max-w-xs">
                  <Autocomplete.Root
                    variant={props.variant as Variant}
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    disabled={props.disabled === 'true'}
                  >
                    <Autocomplete.Input placeholder="Search countries..." />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                                <Autocomplete.ItemIndicator />
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                          <Autocomplete.Empty>No countries found</Autocomplete.Empty>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>
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
                code={`<Autocomplete.Root variant="solid" color="neutral">
  <Autocomplete.Input placeholder="Solid variant" />
  <Autocomplete.Portal>
    <Autocomplete.Positioner>
      <Autocomplete.Popup>
        <Autocomplete.List>
          {/* items */}
        </Autocomplete.List>
      </Autocomplete.Popup>
    </Autocomplete.Positioner>
  </Autocomplete.Portal>
</Autocomplete.Root>

<Autocomplete.Root variant="soft" color="neutral">
  <Autocomplete.Input placeholder="Soft variant" />
  {/* ... */}
</Autocomplete.Root>

<Autocomplete.Root variant="outlined" color="neutral">
  <Autocomplete.Input placeholder="Outlined variant" />
  {/* ... */}
</Autocomplete.Root>

<Autocomplete.Root variant="plain" color="neutral">
  <Autocomplete.Input placeholder="Plain variant" />
  {/* ... */}
</Autocomplete.Root>`}
              >
                <div className="space-y-4 max-w-xs">
                  <Autocomplete.Root variant="solid" color="neutral">
                    <Autocomplete.Input placeholder="Solid variant" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>

                  <Autocomplete.Root variant="soft" color="neutral">
                    <Autocomplete.Input placeholder="Soft variant" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>

                  <Autocomplete.Root variant="outlined" color="neutral">
                    <Autocomplete.Input placeholder="Outlined variant" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>

                  <Autocomplete.Root variant="plain" color="neutral">
                    <Autocomplete.Input placeholder="Plain variant" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Autocomplete.Root variant="soft" color="primary">
  <Autocomplete.Input placeholder="Primary" />
  {/* ... */}
</Autocomplete.Root>

<Autocomplete.Root variant="soft" color="neutral">
  <Autocomplete.Input placeholder="Neutral" />
  {/* ... */}
</Autocomplete.Root>

<Autocomplete.Root variant="soft" color="success">
  <Autocomplete.Input placeholder="Success" />
  {/* ... */}
</Autocomplete.Root>

<Autocomplete.Root variant="soft" color="warning">
  <Autocomplete.Input placeholder="Warning" />
  {/* ... */}
</Autocomplete.Root>

<Autocomplete.Root variant="soft" color="danger">
  <Autocomplete.Input placeholder="Danger" />
  {/* ... */}
</Autocomplete.Root>`}
              >
                <div className="space-y-4 max-w-xs">
                  <Autocomplete.Root variant="soft" color="primary">
                    <Autocomplete.Input placeholder="Primary" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>

                  <Autocomplete.Root variant="soft" color="neutral">
                    <Autocomplete.Input placeholder="Neutral" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>

                  <Autocomplete.Root variant="soft" color="success">
                    <Autocomplete.Input placeholder="Success" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>

                  <Autocomplete.Root variant="soft" color="warning">
                    <Autocomplete.Input placeholder="Warning" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>

                  <Autocomplete.Root variant="soft" color="danger">
                    <Autocomplete.Input placeholder="Danger" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Autocomplete.Root size="sm">
  <Autocomplete.Input placeholder="Small" />
  {/* ... */}
</Autocomplete.Root>

<Autocomplete.Root size="md">
  <Autocomplete.Input placeholder="Medium" />
  {/* ... */}
</Autocomplete.Root>

<Autocomplete.Root size="lg">
  <Autocomplete.Input placeholder="Large" />
  {/* ... */}
</Autocomplete.Root>`}
              >
                <div className="space-y-4 max-w-xs">
                  <Autocomplete.Root size="sm">
                    <Autocomplete.Input placeholder="Small" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>

                  <Autocomplete.Root size="md">
                    <Autocomplete.Input placeholder="Medium" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>

                  <Autocomplete.Root size="lg">
                    <Autocomplete.Input placeholder="Large" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>
                </div>
              </Section>

              <Section
                title="With Groups"
                titleLevel="h3"
                id="with-groups"
                code={`<Autocomplete.Root>
  <Autocomplete.Input placeholder="Search regions..." />
  <Autocomplete.Portal>
    <Autocomplete.Positioner>
      <Autocomplete.Popup>
        <Autocomplete.List>
          <Autocomplete.Group>
            <Autocomplete.GroupLabel>North America</Autocomplete.GroupLabel>
            <Autocomplete.Item value="us">
              <Autocomplete.ItemText>United States</Autocomplete.ItemText>
            </Autocomplete.Item>
            <Autocomplete.Item value="ca">
              <Autocomplete.ItemText>Canada</Autocomplete.ItemText>
            </Autocomplete.Item>
          </Autocomplete.Group>
          <Autocomplete.Group>
            <Autocomplete.GroupLabel>Europe</Autocomplete.GroupLabel>
            <Autocomplete.Item value="uk">
              <Autocomplete.ItemText>United Kingdom</Autocomplete.ItemText>
            </Autocomplete.Item>
            <Autocomplete.Item value="de">
              <Autocomplete.ItemText>Germany</Autocomplete.ItemText>
            </Autocomplete.Item>
          </Autocomplete.Group>
        </Autocomplete.List>
      </Autocomplete.Popup>
    </Autocomplete.Positioner>
  </Autocomplete.Portal>
</Autocomplete.Root>`}
              >
                <div className="max-w-xs">
                  <Autocomplete.Root>
                    <Autocomplete.Input placeholder="Search regions..." />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            <Autocomplete.Group>
                              <Autocomplete.GroupLabel>
                                North America
                              </Autocomplete.GroupLabel>
                              <Autocomplete.Item value="us">
                                <Autocomplete.ItemText>
                                  United States
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                              <Autocomplete.Item value="ca">
                                <Autocomplete.ItemText>Canada</Autocomplete.ItemText>
                              </Autocomplete.Item>
                            </Autocomplete.Group>
                            <Autocomplete.Group>
                              <Autocomplete.GroupLabel>Europe</Autocomplete.GroupLabel>
                              <Autocomplete.Item value="uk">
                                <Autocomplete.ItemText>
                                  United Kingdom
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                              <Autocomplete.Item value="de">
                                <Autocomplete.ItemText>Germany</Autocomplete.ItemText>
                              </Autocomplete.Item>
                              <Autocomplete.Item value="fr">
                                <Autocomplete.ItemText>France</Autocomplete.ItemText>
                              </Autocomplete.Item>
                            </Autocomplete.Group>
                            <Autocomplete.Group>
                              <Autocomplete.GroupLabel>
                                Asia Pacific
                              </Autocomplete.GroupLabel>
                              <Autocomplete.Item value="au">
                                <Autocomplete.ItemText>Australia</Autocomplete.ItemText>
                              </Autocomplete.Item>
                              <Autocomplete.Item value="jp">
                                <Autocomplete.ItemText>Japan</Autocomplete.ItemText>
                              </Autocomplete.Item>
                            </Autocomplete.Group>
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>
                </div>
              </Section>

              <Section
                title="Disabled State"
                titleLevel="h3"
                id="disabled"
                code={`<Autocomplete.Root disabled>
  <Autocomplete.Input placeholder="Disabled autocomplete" />
  <Autocomplete.Portal>
    <Autocomplete.Positioner>
      <Autocomplete.Popup>
        <Autocomplete.List>
          {/* items */}
        </Autocomplete.List>
      </Autocomplete.Popup>
    </Autocomplete.Positioner>
  </Autocomplete.Portal>
</Autocomplete.Root>`}
              >
                <div className="max-w-xs">
                  <Autocomplete.Root disabled>
                    <Autocomplete.Input placeholder="Disabled autocomplete" />
                    <Autocomplete.Portal>
                      <Autocomplete.Positioner>
                        <Autocomplete.Popup>
                          <Autocomplete.List>
                            {countries.slice(0, 3).map((country) => (
                              <Autocomplete.Item
                                key={country.value}
                                value={country.value}
                              >
                                <Autocomplete.ItemText>
                                  {country.label}
                                </Autocomplete.ItemText>
                              </Autocomplete.Item>
                            ))}
                          </Autocomplete.List>
                        </Autocomplete.Popup>
                      </Autocomplete.Positioner>
                    </Autocomplete.Portal>
                  </Autocomplete.Root>
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
