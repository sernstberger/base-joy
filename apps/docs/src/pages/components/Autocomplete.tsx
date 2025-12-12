import { Autocomplete } from '@base-joy/ui-core';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';

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

export function AutocompletePage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Autocomplete</Heading>
        <Text variant="subtitle">
          An input component with automatic filtering and suggestions.
        </Text>
      </header>

      <Section title="Basic Usage">
        <div className="max-w-xs">
          <Autocomplete.Root>
            <Autocomplete.Input placeholder="Search countries..." />
            <Autocomplete.Portal>
              <Autocomplete.Positioner>
                <Autocomplete.Popup>
                  <Autocomplete.List>
                    {countries.map((country) => (
                      <Autocomplete.Item key={country.value} value={country.value}>
                        <Autocomplete.ItemText>{country.label}</Autocomplete.ItemText>
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
      </Section>

      <Section title="Sizes">
        <div className="space-y-4 max-w-xs">
          <Autocomplete.Root size="sm">
            <Autocomplete.Input placeholder="Small autocomplete" />
            <Autocomplete.Portal>
              <Autocomplete.Positioner>
                <Autocomplete.Popup>
                  <Autocomplete.List>
                    {countries.slice(0, 3).map((country) => (
                      <Autocomplete.Item key={country.value} value={country.value}>
                        <Autocomplete.ItemText>{country.label}</Autocomplete.ItemText>
                      </Autocomplete.Item>
                    ))}
                  </Autocomplete.List>
                </Autocomplete.Popup>
              </Autocomplete.Positioner>
            </Autocomplete.Portal>
          </Autocomplete.Root>

          <Autocomplete.Root size="md">
            <Autocomplete.Input placeholder="Medium autocomplete" />
            <Autocomplete.Portal>
              <Autocomplete.Positioner>
                <Autocomplete.Popup>
                  <Autocomplete.List>
                    {countries.slice(0, 3).map((country) => (
                      <Autocomplete.Item key={country.value} value={country.value}>
                        <Autocomplete.ItemText>{country.label}</Autocomplete.ItemText>
                      </Autocomplete.Item>
                    ))}
                  </Autocomplete.List>
                </Autocomplete.Popup>
              </Autocomplete.Positioner>
            </Autocomplete.Portal>
          </Autocomplete.Root>

          <Autocomplete.Root size="lg">
            <Autocomplete.Input placeholder="Large autocomplete" />
            <Autocomplete.Portal>
              <Autocomplete.Positioner>
                <Autocomplete.Popup>
                  <Autocomplete.List>
                    {countries.slice(0, 3).map((country) => (
                      <Autocomplete.Item key={country.value} value={country.value}>
                        <Autocomplete.ItemText>{country.label}</Autocomplete.ItemText>
                      </Autocomplete.Item>
                    ))}
                  </Autocomplete.List>
                </Autocomplete.Popup>
              </Autocomplete.Positioner>
            </Autocomplete.Portal>
          </Autocomplete.Root>
        </div>
      </Section>

      <Section title="With Groups">
        <div className="max-w-xs">
          <Autocomplete.Root>
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
                      <Autocomplete.Item value="fr">
                        <Autocomplete.ItemText>France</Autocomplete.ItemText>
                      </Autocomplete.Item>
                    </Autocomplete.Group>
                    <Autocomplete.Group>
                      <Autocomplete.GroupLabel>Asia Pacific</Autocomplete.GroupLabel>
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

      <Section title="Variants">
        <div className="space-y-4 max-w-xs">
          <Autocomplete.Root variant="outlined">
            <Autocomplete.Input placeholder="Outlined variant" />
            <Autocomplete.Portal>
              <Autocomplete.Positioner>
                <Autocomplete.Popup>
                  <Autocomplete.List>
                    {countries.slice(0, 3).map((country) => (
                      <Autocomplete.Item key={country.value} value={country.value}>
                        <Autocomplete.ItemText>{country.label}</Autocomplete.ItemText>
                      </Autocomplete.Item>
                    ))}
                  </Autocomplete.List>
                </Autocomplete.Popup>
              </Autocomplete.Positioner>
            </Autocomplete.Portal>
          </Autocomplete.Root>

          <Autocomplete.Root variant="soft">
            <Autocomplete.Input placeholder="Soft variant" />
            <Autocomplete.Portal>
              <Autocomplete.Positioner>
                <Autocomplete.Popup>
                  <Autocomplete.List>
                    {countries.slice(0, 3).map((country) => (
                      <Autocomplete.Item key={country.value} value={country.value}>
                        <Autocomplete.ItemText>{country.label}</Autocomplete.ItemText>
                      </Autocomplete.Item>
                    ))}
                  </Autocomplete.List>
                </Autocomplete.Popup>
              </Autocomplete.Positioner>
            </Autocomplete.Portal>
          </Autocomplete.Root>
        </div>
      </Section>

      <Section title="Address Form Example">
        <div className="max-w-md p-4 bg-neutral-50 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <Autocomplete.Root>
              <Autocomplete.Input placeholder="Select country..." />
              <Autocomplete.Portal>
                <Autocomplete.Positioner>
                  <Autocomplete.Popup>
                    <Autocomplete.List>
                      {countries.map((country) => (
                        <Autocomplete.Item key={country.value} value={country.value}>
                          <Autocomplete.ItemText>{country.label}</Autocomplete.ItemText>
                          <Autocomplete.ItemIndicator />
                        </Autocomplete.Item>
                      ))}
                    </Autocomplete.List>
                  </Autocomplete.Popup>
                </Autocomplete.Positioner>
              </Autocomplete.Portal>
            </Autocomplete.Root>
          </div>
        </div>
      </Section>
    </div>
  );
}
