import { Switch } from '@base-joy/ui-core';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Section } from '../../components/Section';

export function SwitchPage() {
  return (
    <div className="max-w-4xl">
      <ComponentHeader
        title="Switch"
        description="A toggle switch component for binary on/off states."
        baseUiUrl="https://base-ui.com/react/components/switch"
      />

      <Section title="Basic Usage">
        <label className="flex items-center gap-3">
          <Switch.Root>
            <Switch.Thumb />
          </Switch.Root>
          <span>Enable notifications</span>
        </label>
      </Section>

      <Section title="Sizes">
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <Switch.Root size="sm">
              <Switch.Thumb />
            </Switch.Root>
            <span className="text-sm">Small switch</span>
          </label>

          <label className="flex items-center gap-3">
            <Switch.Root size="md">
              <Switch.Thumb />
            </Switch.Root>
            <span>Medium switch</span>
          </label>

          <label className="flex items-center gap-3">
            <Switch.Root size="lg">
              <Switch.Thumb />
            </Switch.Root>
            <span className="text-lg">Large switch</span>
          </label>
        </div>
      </Section>

      <Section title="Colors">
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <Switch.Root color="primary" defaultChecked>
              <Switch.Thumb />
            </Switch.Root>
            <span>Primary</span>
          </label>

          <label className="flex items-center gap-3">
            <Switch.Root color="success" defaultChecked>
              <Switch.Thumb />
            </Switch.Root>
            <span>Success</span>
          </label>

          <label className="flex items-center gap-3">
            <Switch.Root color="warning" defaultChecked>
              <Switch.Thumb />
            </Switch.Root>
            <span>Warning</span>
          </label>

          <label className="flex items-center gap-3">
            <Switch.Root color="danger" defaultChecked>
              <Switch.Thumb />
            </Switch.Root>
            <span>Danger</span>
          </label>

          <label className="flex items-center gap-3">
            <Switch.Root color="neutral" defaultChecked>
              <Switch.Thumb />
            </Switch.Root>
            <span>Neutral</span>
          </label>
        </div>
      </Section>

      <Section title="States">
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <Switch.Root>
              <Switch.Thumb />
            </Switch.Root>
            <span>Unchecked</span>
          </label>

          <label className="flex items-center gap-3">
            <Switch.Root defaultChecked>
              <Switch.Thumb />
            </Switch.Root>
            <span>Checked</span>
          </label>

          <label className="flex items-center gap-3">
            <Switch.Root disabled>
              <Switch.Thumb />
            </Switch.Root>
            <span className="opacity-50">Disabled</span>
          </label>

          <label className="flex items-center gap-3">
            <Switch.Root disabled defaultChecked>
              <Switch.Thumb />
            </Switch.Root>
            <span className="opacity-50">Disabled checked</span>
          </label>
        </div>
      </Section>

      <Section title="Settings Example">
        <div className="max-w-md space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm text-neutral-500">Receive push notifications</div>
            </div>
            <Switch.Root defaultChecked>
              <Switch.Thumb />
            </Switch.Root>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <div className="font-medium">Email Digest</div>
              <div className="text-sm text-neutral-500">Weekly email summary</div>
            </div>
            <Switch.Root>
              <Switch.Thumb />
            </Switch.Root>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div>
              <div className="font-medium">Dark Mode</div>
              <div className="text-sm text-neutral-500">Use dark color theme</div>
            </div>
            <Switch.Root color="neutral">
              <Switch.Thumb />
            </Switch.Root>
          </div>
        </div>
      </Section>
    </div>
  );
}
