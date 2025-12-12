import { Combobox, Typography } from '@base-joy/ui-styled';
import { Section } from '../../components/Section';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'orange', label: 'Orange' },
  { value: 'peach', label: 'Peach' },
  { value: 'pear', label: 'Pear' },
  { value: 'strawberry', label: 'Strawberry' },
];

export function ComboboxPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Combobox</Typography>
        <Typography level="body-lg">
          A searchable dropdown component that combines an input with a list of options.
        </Typography>
      </header>

      <Section title="Basic Usage">
        <div className="max-w-xs">
          <Combobox.Root>
            <Combobox.Trigger>
              <Combobox.Input placeholder="Search fruits..." />
            </Combobox.Trigger>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup>
                  <Combobox.List>
                    {fruits.map((fruit) => (
                      <Combobox.Item key={fruit.value} value={fruit.value}>
                        <Combobox.ItemText>{fruit.label}</Combobox.ItemText>
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                  <Combobox.Empty>No results found</Combobox.Empty>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        </div>
      </Section>

      <Section title="Sizes">
        <div className="space-y-4 max-w-xs">
          <Combobox.Root size="sm">
            <Combobox.Trigger>
              <Combobox.Input placeholder="Small combobox" />
            </Combobox.Trigger>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup>
                  <Combobox.List>
                    {fruits.slice(0, 3).map((fruit) => (
                      <Combobox.Item key={fruit.value} value={fruit.value}>
                        <Combobox.ItemText>{fruit.label}</Combobox.ItemText>
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>

          <Combobox.Root size="md">
            <Combobox.Trigger>
              <Combobox.Input placeholder="Medium combobox" />
            </Combobox.Trigger>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup>
                  <Combobox.List>
                    {fruits.slice(0, 3).map((fruit) => (
                      <Combobox.Item key={fruit.value} value={fruit.value}>
                        <Combobox.ItemText>{fruit.label}</Combobox.ItemText>
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>

          <Combobox.Root size="lg">
            <Combobox.Trigger>
              <Combobox.Input placeholder="Large combobox" />
            </Combobox.Trigger>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup>
                  <Combobox.List>
                    {fruits.slice(0, 3).map((fruit) => (
                      <Combobox.Item key={fruit.value} value={fruit.value}>
                        <Combobox.ItemText>{fruit.label}</Combobox.ItemText>
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        </div>
      </Section>

      <Section title="With Groups">
        <div className="max-w-xs">
          <Combobox.Root>
            <Combobox.Trigger>
              <Combobox.Input placeholder="Search foods..." />
            </Combobox.Trigger>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup>
                  <Combobox.List>
                    <Combobox.Group>
                      <Combobox.GroupLabel>Fruits</Combobox.GroupLabel>
                      <Combobox.Item value="apple">
                        <Combobox.ItemText>Apple</Combobox.ItemText>
                      </Combobox.Item>
                      <Combobox.Item value="banana">
                        <Combobox.ItemText>Banana</Combobox.ItemText>
                      </Combobox.Item>
                    </Combobox.Group>
                    <Combobox.Group>
                      <Combobox.GroupLabel>Vegetables</Combobox.GroupLabel>
                      <Combobox.Item value="carrot">
                        <Combobox.ItemText>Carrot</Combobox.ItemText>
                      </Combobox.Item>
                      <Combobox.Item value="broccoli">
                        <Combobox.ItemText>Broccoli</Combobox.ItemText>
                      </Combobox.Item>
                    </Combobox.Group>
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        </div>
      </Section>

      <Section title="Variants">
        <div className="space-y-4 max-w-xs">
          <Combobox.Root variant="outlined">
            <Combobox.Trigger>
              <Combobox.Input placeholder="Outlined variant" />
            </Combobox.Trigger>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup>
                  <Combobox.List>
                    {fruits.slice(0, 3).map((fruit) => (
                      <Combobox.Item key={fruit.value} value={fruit.value}>
                        <Combobox.ItemText>{fruit.label}</Combobox.ItemText>
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>

          <Combobox.Root variant="soft">
            <Combobox.Trigger>
              <Combobox.Input placeholder="Soft variant" />
            </Combobox.Trigger>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup>
                  <Combobox.List>
                    {fruits.slice(0, 3).map((fruit) => (
                      <Combobox.Item key={fruit.value} value={fruit.value}>
                        <Combobox.ItemText>{fruit.label}</Combobox.ItemText>
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        </div>
      </Section>

      <Section title="With Clear Button">
        <div className="max-w-xs">
          <Combobox.Root>
            <Combobox.Trigger>
              <Combobox.Input placeholder="Search and clear..." />
              <Combobox.Clear />
            </Combobox.Trigger>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup>
                  <Combobox.List>
                    {fruits.map((fruit) => (
                      <Combobox.Item key={fruit.value} value={fruit.value}>
                        <Combobox.ItemText>{fruit.label}</Combobox.ItemText>
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        </div>
      </Section>
    </div>
  );
}
