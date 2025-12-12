import { Toggle } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';

export function TogglePage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Toggle"
        description="A pressable button that can be toggled on and off."
        baseUiUrl="https://base-ui.com/react/components/toggle"
      />

      <Section title="Basic Usage">
        <Toggle aria-label="Toggle bold">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 3h5a3 3 0 0 1 0 6H4V3zM4 9h6a3 3 0 0 1 0 6H4V9z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </Toggle>
      </Section>

      <Section title="Variants">
        <div className="flex flex-wrap gap-3">
          <Toggle variant="solid" aria-label="Solid toggle">
            Solid
          </Toggle>
          <Toggle variant="soft" aria-label="Soft toggle">
            Soft
          </Toggle>
          <Toggle variant="outlined" aria-label="Outlined toggle">
            Outlined
          </Toggle>
          <Toggle variant="plain" aria-label="Plain toggle">
            Plain
          </Toggle>
        </div>
      </Section>

      <Section title="Colors">
        <div className="flex flex-wrap gap-3">
          <Toggle color="primary" aria-label="Primary toggle">
            Primary
          </Toggle>
          <Toggle color="neutral" aria-label="Neutral toggle">
            Neutral
          </Toggle>
          <Toggle color="success" aria-label="Success toggle">
            Success
          </Toggle>
          <Toggle color="warning" aria-label="Warning toggle">
            Warning
          </Toggle>
          <Toggle color="danger" aria-label="Danger toggle">
            Danger
          </Toggle>
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Toggle size="sm" aria-label="Small toggle">
            Small
          </Toggle>
          <Toggle size="md" aria-label="Medium toggle">
            Medium
          </Toggle>
          <Toggle size="lg" aria-label="Large toggle">
            Large
          </Toggle>
        </div>
      </Section>

      <Section title="Pressed State">
        <div className="flex flex-wrap gap-3">
          <Toggle defaultPressed aria-label="Bold">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 3h5a3 3 0 0 1 0 6H4V3zM4 9h6a3 3 0 0 1 0 6H4V9z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </Toggle>
          <Toggle aria-label="Italic">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3H6M10 13H6M9 3L7 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Toggle>
          <Toggle aria-label="Underline">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 3v5a4 4 0 0 0 8 0V3M3 13h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Toggle>
        </div>
      </Section>

      <Section title="Disabled">
        <div className="flex flex-wrap gap-3">
          <Toggle disabled aria-label="Disabled toggle">
            Disabled
          </Toggle>
          <Toggle disabled defaultPressed aria-label="Disabled pressed toggle">
            Disabled Pressed
          </Toggle>
        </div>
      </Section>
    </div>
  );
}
