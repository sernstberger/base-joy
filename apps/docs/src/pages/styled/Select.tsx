import { Select } from '@base-joy/ui-styled';
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

const selectControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const selectCodeTemplate = (props: Record<string, string>) =>
  `<Select.Root variant="${props.variant}" color="${props.color}" size="${props.size}">
  <Select.Trigger>
    <Select.Value placeholder="Select a fruit..." />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="apple">
          <Select.ItemText>Apple</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
        <Select.Item value="banana">
          <Select.ItemText>Banana</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
        <Select.Item value="cherry">
          <Select.ItemText>Cherry</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'groups', title: 'With Groups', level: 3 },
  { id: 'disabled-items', title: 'Disabled Items', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function SelectPage() {
  return (
    <div>
      <ComponentHeader
        title="Select"
        description="A dropdown select component for choosing from a list of options."
        baseUiUrl="https://base-ui.com/react/components/select"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={selectControls}
              codeTemplate={selectCodeTemplate}
            >
              {(props) => (
                <Select.Root
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select a fruit..." />
                    <Select.Icon />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner>
                      <Select.Popup>
                        <Select.Item value="apple">
                          <Select.ItemText>Apple</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                        <Select.Item value="banana">
                          <Select.ItemText>Banana</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                        <Select.Item value="cherry">
                          <Select.ItemText>Cherry</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Select.Root variant="solid" color="primary">
  <Select.Trigger>
    <Select.Value placeholder="Solid" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>

<Select.Root variant="soft" color="primary">
  <Select.Trigger>
    <Select.Value placeholder="Soft" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>

<Select.Root variant="outlined" color="primary">
  <Select.Trigger>
    <Select.Value placeholder="Outlined" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>

<Select.Root variant="plain" color="primary">
  <Select.Trigger>
    <Select.Value placeholder="Plain" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Select.Root variant="solid" color="primary">
                    <Select.Trigger>
                      <Select.Value placeholder="Solid" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <Select.Root variant="soft" color="primary">
                    <Select.Trigger>
                      <Select.Value placeholder="Soft" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <Select.Root variant="outlined" color="primary">
                    <Select.Trigger>
                      <Select.Value placeholder="Outlined" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <Select.Root variant="plain" color="primary">
                    <Select.Trigger>
                      <Select.Value placeholder="Plain" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Select.Root variant="soft" color="primary">
  <Select.Trigger>
    <Select.Value placeholder="Primary" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>

<Select.Root variant="soft" color="neutral">
  <Select.Trigger>
    <Select.Value placeholder="Neutral" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>

<Select.Root variant="soft" color="success">
  <Select.Trigger>
    <Select.Value placeholder="Success" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>

<Select.Root variant="soft" color="warning">
  <Select.Trigger>
    <Select.Value placeholder="Warning" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>

<Select.Root variant="soft" color="danger">
  <Select.Trigger>
    <Select.Value placeholder="Danger" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Select.Root variant="soft" color="primary">
                    <Select.Trigger>
                      <Select.Value placeholder="Primary" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <Select.Root variant="soft" color="neutral">
                    <Select.Trigger>
                      <Select.Value placeholder="Neutral" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <Select.Root variant="soft" color="success">
                    <Select.Trigger>
                      <Select.Value placeholder="Success" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <Select.Root variant="soft" color="warning">
                    <Select.Trigger>
                      <Select.Value placeholder="Warning" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <Select.Root variant="soft" color="danger">
                    <Select.Trigger>
                      <Select.Value placeholder="Danger" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Select.Root size="sm">
  <Select.Trigger>
    <Select.Value placeholder="Small select" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
        <Select.Item value="b">
          <Select.ItemText>Option B</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>

<Select.Root size="md">
  <Select.Trigger>
    <Select.Value placeholder="Medium select" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
        <Select.Item value="b">
          <Select.ItemText>Option B</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>

<Select.Root size="lg">
  <Select.Trigger>
    <Select.Value placeholder="Large select" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
        <Select.Item value="b">
          <Select.ItemText>Option B</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Select.Root size="sm">
                    <Select.Trigger>
                      <Select.Value placeholder="Small select" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="b">
                            <Select.ItemText>Option B</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <Select.Root size="md">
                    <Select.Trigger>
                      <Select.Value placeholder="Medium select" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="b">
                            <Select.ItemText>Option B</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>

                  <Select.Root size="lg">
                    <Select.Trigger>
                      <Select.Value placeholder="Large select" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner>
                        <Select.Popup>
                          <Select.Item value="a">
                            <Select.ItemText>Option A</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="b">
                            <Select.ItemText>Option B</Select.ItemText>
                          </Select.Item>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </Section>

              <Section
                title="With Groups"
                titleLevel="h3"
                id="groups"
                code={`<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Select a food..." />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Group>
          <Select.GroupLabel>Fruits</Select.GroupLabel>
          <Select.Item value="apple">
            <Select.ItemText>Apple</Select.ItemText>
          </Select.Item>
          <Select.Item value="banana">
            <Select.ItemText>Banana</Select.ItemText>
          </Select.Item>
        </Select.Group>
        <Select.Group>
          <Select.GroupLabel>Vegetables</Select.GroupLabel>
          <Select.Item value="carrot">
            <Select.ItemText>Carrot</Select.ItemText>
          </Select.Item>
          <Select.Item value="broccoli">
            <Select.ItemText>Broccoli</Select.ItemText>
          </Select.Item>
        </Select.Group>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`}
                codeLanguage="tsx"
              >
                <Select.Root>
                  <Select.Trigger>
                    <Select.Value placeholder="Select a food..." />
                    <Select.Icon />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner>
                      <Select.Popup>
                        <Select.Group>
                          <Select.GroupLabel>Fruits</Select.GroupLabel>
                          <Select.Item value="apple">
                            <Select.ItemText>Apple</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="banana">
                            <Select.ItemText>Banana</Select.ItemText>
                          </Select.Item>
                        </Select.Group>
                        <Select.Group>
                          <Select.GroupLabel>Vegetables</Select.GroupLabel>
                          <Select.Item value="carrot">
                            <Select.ItemText>Carrot</Select.ItemText>
                          </Select.Item>
                          <Select.Item value="broccoli">
                            <Select.ItemText>Broccoli</Select.ItemText>
                          </Select.Item>
                        </Select.Group>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              </Section>

              <Section
                title="Disabled Items"
                titleLevel="h3"
                id="disabled-items"
                code={`<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Select an option..." />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="available">
          <Select.ItemText>Available</Select.ItemText>
        </Select.Item>
        <Select.Item value="unavailable" disabled>
          <Select.ItemText>Unavailable</Select.ItemText>
        </Select.Item>
        <Select.Item value="coming-soon" disabled>
          <Select.ItemText>Coming Soon</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`}
                codeLanguage="tsx"
              >
                <Select.Root>
                  <Select.Trigger>
                    <Select.Value placeholder="Select an option..." />
                    <Select.Icon />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner>
                      <Select.Popup>
                        <Select.Item value="available">
                          <Select.ItemText>Available</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="unavailable" disabled>
                          <Select.ItemText>Unavailable</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="coming-soon" disabled>
                          <Select.ItemText>Coming Soon</Select.ItemText>
                        </Select.Item>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Select} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
