import { NumberField, Typography } from '@base-joy/ui-components';
import { Section } from '../../components/Section';

export function NumberFieldPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">NumberField</Typography>
        <Typography level="body-lg">
          A number input with increment/decrement buttons for precise numeric entry.
        </Typography>
      </header>

      <Section title="Basic Usage">
        <NumberField.Root defaultValue={5}>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      </Section>

      <Section title="Sizes">
        <div className="space-y-4">
          <NumberField.Root size="sm" defaultValue={10}>
            <NumberField.Group>
              <NumberField.Decrement />
              <NumberField.Input />
              <NumberField.Increment />
            </NumberField.Group>
          </NumberField.Root>

          <NumberField.Root size="md" defaultValue={10}>
            <NumberField.Group>
              <NumberField.Decrement />
              <NumberField.Input />
              <NumberField.Increment />
            </NumberField.Group>
          </NumberField.Root>

          <NumberField.Root size="lg" defaultValue={10}>
            <NumberField.Group>
              <NumberField.Decrement />
              <NumberField.Input />
              <NumberField.Increment />
            </NumberField.Group>
          </NumberField.Root>
        </div>
      </Section>

      <Section title="With Min/Max">
        <div className="space-y-4">
          <div>
            <Typography level="body-sm" className="mb-2">Min: 0, Max: 10</Typography>
            <NumberField.Root min={0} max={10} defaultValue={5}>
              <NumberField.Group>
                <NumberField.Decrement />
                <NumberField.Input />
                <NumberField.Increment />
              </NumberField.Group>
            </NumberField.Root>
          </div>

          <div>
            <Typography level="body-sm" className="mb-2">Min: -5, Max: 5</Typography>
            <NumberField.Root min={-5} max={5} defaultValue={0}>
              <NumberField.Group>
                <NumberField.Decrement />
                <NumberField.Input />
                <NumberField.Increment />
              </NumberField.Group>
            </NumberField.Root>
          </div>
        </div>
      </Section>

      <Section title="Step Values">
        <div className="space-y-4">
          <div>
            <Typography level="body-sm" className="mb-2">Step: 1 (default)</Typography>
            <NumberField.Root step={1} defaultValue={5}>
              <NumberField.Group>
                <NumberField.Decrement />
                <NumberField.Input />
                <NumberField.Increment />
              </NumberField.Group>
            </NumberField.Root>
          </div>

          <div>
            <Typography level="body-sm" className="mb-2">Step: 5</Typography>
            <NumberField.Root step={5} defaultValue={25}>
              <NumberField.Group>
                <NumberField.Decrement />
                <NumberField.Input />
                <NumberField.Increment />
              </NumberField.Group>
            </NumberField.Root>
          </div>

          <div>
            <Typography level="body-sm" className="mb-2">Step: 0.1</Typography>
            <NumberField.Root step={0.1} defaultValue={1.5}>
              <NumberField.Group>
                <NumberField.Decrement />
                <NumberField.Input />
                <NumberField.Increment />
              </NumberField.Group>
            </NumberField.Root>
          </div>
        </div>
      </Section>

      <Section title="Variants">
        <div className="space-y-4">
          <NumberField.Root variant="outlined" defaultValue={10}>
            <NumberField.Group>
              <NumberField.Decrement />
              <NumberField.Input />
              <NumberField.Increment />
            </NumberField.Group>
          </NumberField.Root>

          <NumberField.Root variant="soft" defaultValue={10}>
            <NumberField.Group>
              <NumberField.Decrement />
              <NumberField.Input />
              <NumberField.Increment />
            </NumberField.Group>
          </NumberField.Root>
        </div>
      </Section>

      <Section title="Disabled">
        <NumberField.Root disabled defaultValue={5}>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField.Root>
      </Section>

      <Section title="Quantity Selector Example">
        <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg max-w-md">
          <img
            src="https://via.placeholder.com/80"
            alt="Product"
            className="w-20 h-20 rounded object-cover"
          />
          <div className="flex-1">
            <div className="font-medium">Product Name</div>
            <div className="text-sm text-neutral-500">$29.99</div>
          </div>
          <NumberField.Root min={1} max={99} defaultValue={1}>
            <NumberField.Group>
              <NumberField.Decrement />
              <NumberField.Input />
              <NumberField.Increment />
            </NumberField.Group>
          </NumberField.Root>
        </div>
      </Section>
    </div>
  );
}
