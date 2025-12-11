import { Sheet } from '@base-joy/ui-core';
import { Item, ItemStart, ItemContent, ItemEnd } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from './components/Playground';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

// Sheet Playground Configuration
const sheetControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const sheetCodeTemplate = (props: Record<string, string>) =>
  `<Sheet variant="${props.variant}" color="${props.color}" size="${props.size}">\n  Your content here\n</Sheet>`;

function App() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Base Joy</h1>
        <p className="text-lg text-neutral-600">
          A headless component library built on Base UI with Tailwind CSS
        </p>
      </header>

      <main className="space-y-12">
        {/* Sheet Component Demo */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Sheet Component</h2>
          <p className="text-neutral-600 mb-6">
            A styled container with CVA variants for colors, visual styles, and sizes.
          </p>

          {/* Interactive Playground */}
          <div className="mb-8">
            <Playground controls={sheetControls} codeTemplate={sheetCodeTemplate}>
              {(props) => (
                <Sheet
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  className="min-w-50"
                >
                  <p className="font-medium">Sheet</p>
                </Sheet>
              )}
            </Playground>
          </div>

          <div className="space-y-8">
            {/* Variants */}
            <div>
              <h3 className="text-lg font-medium mb-3">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Sheet variant="solid" color="primary">
                  Solid
                </Sheet>
                <Sheet variant="soft" color="primary">
                  Soft
                </Sheet>
                <Sheet variant="outlined" color="primary">
                  Outlined
                </Sheet>
                <Sheet variant="plain" color="primary">
                  Plain
                </Sheet>
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-medium mb-3">Colors (Soft variant)</h3>
              <div className="flex flex-wrap gap-4">
                <Sheet variant="soft" color="primary">
                  Primary
                </Sheet>
                <Sheet variant="soft" color="neutral">
                  Neutral
                </Sheet>
                <Sheet variant="soft" color="success">
                  Success
                </Sheet>
                <Sheet variant="soft" color="warning">
                  Warning
                </Sheet>
                <Sheet variant="soft" color="danger">
                  Danger
                </Sheet>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-medium mb-3">Sizes</h3>
              <div className="flex flex-wrap items-start gap-4">
                <Sheet variant="outlined" color="neutral" size="sm">
                  Small (sm)
                </Sheet>
                <Sheet variant="outlined" color="neutral" size="md">
                  Medium (md)
                </Sheet>
                <Sheet variant="outlined" color="neutral" size="lg">
                  Large (lg)
                </Sheet>
              </div>
            </div>

            {/* Solid Colors */}
            <div>
              <h3 className="text-lg font-medium mb-3">Colors (Solid variant)</h3>
              <div className="flex flex-wrap gap-4">
                <Sheet variant="solid" color="primary">
                  Primary
                </Sheet>
                <Sheet variant="solid" color="neutral">
                  Neutral
                </Sheet>
                <Sheet variant="solid" color="success">
                  Success
                </Sheet>
                <Sheet variant="solid" color="warning">
                  Warning
                </Sheet>
                <Sheet variant="solid" color="danger">
                  Danger
                </Sheet>
              </div>
            </div>
          </div>
        </section>

        {/* Item Component Demo */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Item Component</h2>
          <p className="text-neutral-600 mb-6">
            A structured content component with start, content, and end slots.
          </p>

          <div className="space-y-8">
            {/* Basic Item */}
            <div>
              <h3 className="text-lg font-medium mb-3">Basic Item</h3>
              <Sheet variant="outlined" color="neutral" className="max-w-md">
                <Item>
                  <ItemStart>
                    <span className="w-4 h-4 bg-primary-500 rounded-full" />
                  </ItemStart>
                  <ItemContent>Basic item with start icon</ItemContent>
                  <ItemEnd>End</ItemEnd>
                </Item>
              </Sheet>
            </div>

            {/* Interactive Items */}
            <div>
              <h3 className="text-lg font-medium mb-3">Interactive Items</h3>
              <Sheet variant="outlined" color="neutral" className="max-w-md p-0 overflow-hidden">
                <Item interactive>
                  <ItemStart>
                    <span className="w-4 h-4 bg-primary-500 rounded-full" />
                  </ItemStart>
                  <ItemContent>Hoverable item 1</ItemContent>
                  <ItemEnd>→</ItemEnd>
                </Item>
                <Item interactive>
                  <ItemStart>
                    <span className="w-4 h-4 bg-success-500 rounded-full" />
                  </ItemStart>
                  <ItemContent>Hoverable item 2</ItemContent>
                  <ItemEnd>→</ItemEnd>
                </Item>
                <Item interactive selected>
                  <ItemStart>
                    <span className="w-4 h-4 bg-warning-500 rounded-full" />
                  </ItemStart>
                  <ItemContent>Selected item</ItemContent>
                  <ItemEnd>✓</ItemEnd>
                </Item>
                <Item interactive disabled>
                  <ItemStart>
                    <span className="w-4 h-4 bg-neutral-300 rounded-full" />
                  </ItemStart>
                  <ItemContent>Disabled item</ItemContent>
                  <ItemEnd>×</ItemEnd>
                </Item>
              </Sheet>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-medium mb-3">Sizes</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
                  <Item size="sm">
                    <ItemStart>
                      <span className="w-3 h-3 bg-primary-500 rounded-full" />
                    </ItemStart>
                    <ItemContent>Small item (sm)</ItemContent>
                  </Item>
                </Sheet>
                <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
                  <Item size="md">
                    <ItemStart>
                      <span className="w-4 h-4 bg-primary-500 rounded-full" />
                    </ItemStart>
                    <ItemContent>Medium item (md)</ItemContent>
                  </Item>
                </Sheet>
                <Sheet variant="outlined" color="neutral" className="p-0 overflow-hidden">
                  <Item size="lg">
                    <ItemStart>
                      <span className="w-5 h-5 bg-primary-500 rounded-full" />
                    </ItemStart>
                    <ItemContent>Large item (lg)</ItemContent>
                  </Item>
                </Sheet>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 pt-8 border-t border-neutral-200 text-center text-neutral-500">
        <p>Base Joy v0.0.1 - Built with Base UI + Tailwind CSS v4</p>
      </footer>
    </div>
  );
}

export default App;
