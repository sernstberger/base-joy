import { Combobox } from '@base-joy/ui-styled';
import type { ColorScale, Size, Variant } from '@base-joy/tokens';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';

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

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'disabled', title: 'Disabled', level: 3 },
  { id: 'groups', title: 'With Groups', level: 3 },
  { id: 'clear', title: 'With Clear Button', level: 3 },
  { id: 'api', title: 'API Reference' },
];

const controls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const codeTemplate = (props: Record<string, string | boolean>) =>
  `<Combobox.Root
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"${props.disabled === 'true' || props.disabled === true ? '\n  disabled' : ''}
>
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
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Popup>
    </Combobox.Positioner>
  </Combobox.Portal>
</Combobox.Root>`;

export function ComboboxPage() {
  return (
    <div>
      <ComponentHeader
        title="Combobox"
        description="A searchable dropdown component that combines an input with a list of options."
        baseUiUrl="https://base-ui.com/react/components/combobox"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={controls} codeTemplate={codeTemplate}>
              {(props) => (
                <div className="max-w-xs">
                  <Combobox.Root
                    variant={props.variant as Variant}
                    color={props.color as ColorScale}
                    size={props.size as Size}
                    disabled={props.disabled === 'true'}
                  >
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
                              </Combobox.Item>
                            ))}
                          </Combobox.List>
                        </Combobox.Popup>
                      </Combobox.Positioner>
                    </Combobox.Portal>
                  </Combobox.Root>
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
                code={`<Combobox.Root variant="solid">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Solid variant" />
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

<Combobox.Root variant="soft">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Soft variant" />
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

<Combobox.Root variant="outlined">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Outlined variant" />
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

<Combobox.Root variant="plain">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Plain variant" />
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
</Combobox.Root>`}
              >
                <div className="space-y-4 max-w-xs">
                  <Combobox.Root variant="solid">
                    <Combobox.Trigger>
                      <Combobox.Input placeholder="Solid variant" />
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

                  <Combobox.Root variant="plain">
                    <Combobox.Trigger>
                      <Combobox.Input placeholder="Plain variant" />
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

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Combobox.Root color="primary">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Primary" />
  </Combobox.Trigger>
  {/* ... */}
</Combobox.Root>

<Combobox.Root color="neutral">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Neutral" />
  </Combobox.Trigger>
  {/* ... */}
</Combobox.Root>

<Combobox.Root color="success">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Success" />
  </Combobox.Trigger>
  {/* ... */}
</Combobox.Root>

<Combobox.Root color="warning">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Warning" />
  </Combobox.Trigger>
  {/* ... */}
</Combobox.Root>

<Combobox.Root color="danger">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Danger" />
  </Combobox.Trigger>
  {/* ... */}
</Combobox.Root>`}
              >
                <div className="space-y-4 max-w-xs">
                  <Combobox.Root color="primary">
                    <Combobox.Trigger>
                      <Combobox.Input placeholder="Primary" />
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

                  <Combobox.Root color="neutral">
                    <Combobox.Trigger>
                      <Combobox.Input placeholder="Neutral" />
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

                  <Combobox.Root color="success">
                    <Combobox.Trigger>
                      <Combobox.Input placeholder="Success" />
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

                  <Combobox.Root color="warning">
                    <Combobox.Trigger>
                      <Combobox.Input placeholder="Warning" />
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

                  <Combobox.Root color="danger">
                    <Combobox.Trigger>
                      <Combobox.Input placeholder="Danger" />
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

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Combobox.Root size="sm">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Small combobox" />
  </Combobox.Trigger>
  {/* ... */}
</Combobox.Root>

<Combobox.Root size="md">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Medium combobox" />
  </Combobox.Trigger>
  {/* ... */}
</Combobox.Root>

<Combobox.Root size="lg">
  <Combobox.Trigger>
    <Combobox.Input placeholder="Large combobox" />
  </Combobox.Trigger>
  {/* ... */}
</Combobox.Root>`}
              >
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

              <Section
                title="Disabled"
                titleLevel="h3"
                id="disabled"
                code={`<Combobox.Root disabled>
  <Combobox.Trigger>
    <Combobox.Input placeholder="Disabled combobox" />
  </Combobox.Trigger>
  {/* ... */}
</Combobox.Root>`}
              >
                <div className="max-w-xs">
                  <Combobox.Root disabled>
                    <Combobox.Trigger>
                      <Combobox.Input placeholder="Disabled combobox" />
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

              <Section
                title="With Groups"
                titleLevel="h3"
                id="groups"
                code={`<Combobox.Root>
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
</Combobox.Root>`}
              >
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

              <Section
                title="With Clear Button"
                titleLevel="h3"
                id="clear"
                code={`<Combobox.Root>
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
</Combobox.Root>`}
              >
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
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Combobox} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
