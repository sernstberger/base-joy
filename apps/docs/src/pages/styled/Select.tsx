import { Select, Typography } from '@base-joy/ui-styled';
import { Section } from '../../components/Section';

export function SelectPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Select</Typography>
        <Typography level="body-lg">
          A dropdown select component for choosing from a list of options.
        </Typography>
      </header>

      <Section title="Basic Usage">
        <Select.Root>
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
      </Section>

      <Section title="Sizes">
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

      <Section title="With Groups">
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

      <Section title="Disabled Items">
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

      <Section title="Variants">
        <div className="space-y-4">
          <Select.Root variant="outlined">
            <Select.Trigger>
              <Select.Value placeholder="Outlined variant" />
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

          <Select.Root variant="soft">
            <Select.Trigger>
              <Select.Value placeholder="Soft variant" />
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
    </div>
  );
}
