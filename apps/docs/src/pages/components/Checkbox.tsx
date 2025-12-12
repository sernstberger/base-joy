import { Checkbox, CheckboxGroup, Typography } from '@base-joy/ui-components';
import { Section } from '../../components/Section';

export function CheckboxPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Checkbox</Typography>
        <Typography level="body-lg">
          A checkbox component for binary selections with visual indicator.
        </Typography>
      </header>

      <Section title="Basic Usage">
        <div className="flex items-center gap-2">
          <Checkbox.Root>
            <Checkbox.Indicator />
          </Checkbox.Root>
          <span>Accept terms and conditions</span>
        </div>
      </Section>

      <Section title="Sizes">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <Checkbox.Root size="sm">
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span className="text-sm">Small checkbox</span>
          </label>

          <label className="flex items-center gap-2">
            <Checkbox.Root size="md">
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span>Medium checkbox</span>
          </label>

          <label className="flex items-center gap-2">
            <Checkbox.Root size="lg">
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span className="text-lg">Large checkbox</span>
          </label>
        </div>
      </Section>

      <Section title="Colors">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <Checkbox.Root color="primary" defaultChecked>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span>Primary</span>
          </label>

          <label className="flex items-center gap-2">
            <Checkbox.Root color="success" defaultChecked>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span>Success</span>
          </label>

          <label className="flex items-center gap-2">
            <Checkbox.Root color="warning" defaultChecked>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span>Warning</span>
          </label>

          <label className="flex items-center gap-2">
            <Checkbox.Root color="danger" defaultChecked>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span>Danger</span>
          </label>
        </div>
      </Section>

      <Section title="States">
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <Checkbox.Root defaultChecked>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span>Checked</span>
          </label>

          <label className="flex items-center gap-2">
            <Checkbox.Root disabled>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span className="opacity-50">Disabled</span>
          </label>

          <label className="flex items-center gap-2">
            <Checkbox.Root disabled defaultChecked>
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span className="opacity-50">Disabled checked</span>
          </label>
        </div>
      </Section>

      <Section title="Checkbox Group">
        <CheckboxGroup defaultValue={['newsletter']}>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <Checkbox.Root value="newsletter">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Subscribe to newsletter</span>
            </label>

            <label className="flex items-center gap-2">
              <Checkbox.Root value="updates">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Receive product updates</span>
            </label>

            <label className="flex items-center gap-2">
              <Checkbox.Root value="marketing">
                <Checkbox.Indicator />
              </Checkbox.Root>
              <span>Marketing communications</span>
            </label>
          </div>
        </CheckboxGroup>
      </Section>

      <Section title="Horizontal Group">
        <CheckboxGroup orientation="horizontal">
          <label className="flex items-center gap-2">
            <Checkbox.Root value="a">
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span>Option A</span>
          </label>

          <label className="flex items-center gap-2">
            <Checkbox.Root value="b">
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span>Option B</span>
          </label>

          <label className="flex items-center gap-2">
            <Checkbox.Root value="c">
              <Checkbox.Indicator />
            </Checkbox.Root>
            <span>Option C</span>
          </label>
        </CheckboxGroup>
      </Section>
    </div>
  );
}
