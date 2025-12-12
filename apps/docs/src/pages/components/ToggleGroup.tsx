import { Toggle, ToggleGroup } from '@base-joy/ui-core';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';

export function ToggleGroupPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="ToggleGroup"
        description="A group of toggle buttons where one or more can be selected."
        baseUiUrl="https://base-ui.com/react/components/toggle-group"
      />

      <Section title="Basic Usage">
        <ToggleGroup.Root defaultValue={['center']} aria-label="Text alignment">
          <Toggle value="left" aria-label="Align left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3h12M2 7h8M2 11h10M2 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Toggle>
          <Toggle value="center" aria-label="Align center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3h12M4 7h8M3 11h10M5 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Toggle>
          <Toggle value="right" aria-label="Align right">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3h12M6 7h8M4 11h10M8 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Toggle>
        </ToggleGroup.Root>
      </Section>

      <Section title="Variants">
        <div className="space-y-4">
          <ToggleGroup.Root variant="solid" defaultValue={['a']} aria-label="Solid variant">
            <Toggle value="a">Option A</Toggle>
            <Toggle value="b">Option B</Toggle>
            <Toggle value="c">Option C</Toggle>
          </ToggleGroup.Root>
          <ToggleGroup.Root variant="soft" defaultValue={['a']} aria-label="Soft variant">
            <Toggle value="a">Option A</Toggle>
            <Toggle value="b">Option B</Toggle>
            <Toggle value="c">Option C</Toggle>
          </ToggleGroup.Root>
          <ToggleGroup.Root variant="outlined" defaultValue={['a']} aria-label="Outlined variant">
            <Toggle value="a">Option A</Toggle>
            <Toggle value="b">Option B</Toggle>
            <Toggle value="c">Option C</Toggle>
          </ToggleGroup.Root>
          <ToggleGroup.Root variant="plain" defaultValue={['a']} aria-label="Plain variant">
            <Toggle value="a">Option A</Toggle>
            <Toggle value="b">Option B</Toggle>
            <Toggle value="c">Option C</Toggle>
          </ToggleGroup.Root>
        </div>
      </Section>

      <Section title="Colors">
        <div className="space-y-4">
          <ToggleGroup.Root color="primary" defaultValue={['a']} aria-label="Primary color">
            <Toggle value="a">Primary</Toggle>
            <Toggle value="b">Primary</Toggle>
          </ToggleGroup.Root>
          <ToggleGroup.Root color="success" defaultValue={['a']} aria-label="Success color">
            <Toggle value="a">Success</Toggle>
            <Toggle value="b">Success</Toggle>
          </ToggleGroup.Root>
          <ToggleGroup.Root color="danger" defaultValue={['a']} aria-label="Danger color">
            <Toggle value="a">Danger</Toggle>
            <Toggle value="b">Danger</Toggle>
          </ToggleGroup.Root>
        </div>
      </Section>

      <Section title="Sizes">
        <div className="space-y-4">
          <ToggleGroup.Root size="sm" defaultValue={['a']} aria-label="Small size">
            <Toggle value="a">Small</Toggle>
            <Toggle value="b">Small</Toggle>
          </ToggleGroup.Root>
          <ToggleGroup.Root size="md" defaultValue={['a']} aria-label="Medium size">
            <Toggle value="a">Medium</Toggle>
            <Toggle value="b">Medium</Toggle>
          </ToggleGroup.Root>
          <ToggleGroup.Root size="lg" defaultValue={['a']} aria-label="Large size">
            <Toggle value="a">Large</Toggle>
            <Toggle value="b">Large</Toggle>
          </ToggleGroup.Root>
        </div>
      </Section>

      <Section title="Multiple Selection">
        <ToggleGroup.Root multiple defaultValue={['bold', 'italic']} aria-label="Text formatting">
          <Toggle value="bold" aria-label="Bold">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 3h5a3 3 0 0 1 0 6H4V3zM4 9h6a3 3 0 0 1 0 6H4V9z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </Toggle>
          <Toggle value="italic" aria-label="Italic">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3H6M10 13H6M9 3L7 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Toggle>
          <Toggle value="underline" aria-label="Underline">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 3v5a4 4 0 0 0 8 0V3M3 13h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Toggle>
        </ToggleGroup.Root>
      </Section>

      <Section title="Orientation">
        <div className="flex gap-8">
          <ToggleGroup.Root orientation="horizontal" defaultValue={['a']} aria-label="Horizontal group">
            <Toggle value="a">A</Toggle>
            <Toggle value="b">B</Toggle>
            <Toggle value="c">C</Toggle>
          </ToggleGroup.Root>
          <ToggleGroup.Root orientation="vertical" defaultValue={['a']} aria-label="Vertical group">
            <Toggle value="a">A</Toggle>
            <Toggle value="b">B</Toggle>
            <Toggle value="c">C</Toggle>
          </ToggleGroup.Root>
        </div>
      </Section>

      <Section title="Disabled">
        <ToggleGroup.Root disabled defaultValue={['a']} aria-label="Disabled group">
          <Toggle value="a">Disabled A</Toggle>
          <Toggle value="b">Disabled B</Toggle>
          <Toggle value="c">Disabled C</Toggle>
        </ToggleGroup.Root>
      </Section>
    </div>
  );
}
