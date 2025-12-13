import { Switch, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { ColorScale, Size } from '@base-joy/tokens';

const switchControls: PlaygroundControl[] = [
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'defaultChecked', type: 'boolean', defaultValue: false },
];

const switchCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  if (props.defaultChecked === 'true' || props.defaultChecked === true) booleanProps.push('defaultChecked');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Switch.Root color="${props.color}" size="${props.size}"${booleanPropsStr}>
  <Switch.Thumb />
</Switch.Root>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'states', title: 'States', level: 3 },
  { id: 'settings-example', title: 'Settings Example', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function SwitchPage() {
  return (
    <div>
      <ComponentHeader
        title="Switch"
        description="A toggle switch component for binary on/off states."
        baseUiUrl="https://base-ui.com/react/components/switch"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={switchControls}
              codeTemplate={switchCodeTemplate}
            >
              {(props) => (
                <Switch.Root
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  disabled={props.disabled === 'true'}
                  defaultChecked={props.defaultChecked === 'true'}
                >
                  <Switch.Thumb />
                </Switch.Root>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<label className="flex items-center gap-3">
  <Switch.Root color="primary" defaultChecked>
    <Switch.Thumb />
  </Switch.Root>
  <span>Primary</span>
</label>

<label className="flex items-center gap-3">
  <Switch.Root color="neutral" defaultChecked>
    <Switch.Thumb />
  </Switch.Root>
  <span>Neutral</span>
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
</label>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <Switch.Root color="primary" defaultChecked>
                      <Switch.Thumb />
                    </Switch.Root>
                    <span>Primary</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch.Root color="neutral" defaultChecked>
                      <Switch.Thumb />
                    </Switch.Root>
                    <span>Neutral</span>
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
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<label className="flex items-center gap-3">
  <Switch.Root size="sm">
    <Switch.Thumb />
  </Switch.Root>
  <Typography level="body-sm">Small switch</Typography>
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
  <Typography level="body-lg">Large switch</Typography>
</label>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <Switch.Root size="sm">
                      <Switch.Thumb />
                    </Switch.Root>
                    <Typography level="body-sm">Small switch</Typography>
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
                    <Typography level="body-lg">Large switch</Typography>
                  </label>
                </div>
              </Section>

              <Section
                title="States"
                titleLevel="h3"
                id="states"
                code={`<label className="flex items-center gap-3">
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
  <Typography level="body-md" className="opacity-50">
    Disabled
  </Typography>
</label>

<label className="flex items-center gap-3">
  <Switch.Root disabled defaultChecked>
    <Switch.Thumb />
  </Switch.Root>
  <Typography level="body-md" className="opacity-50">
    Disabled checked
  </Typography>
</label>`}
                codeLanguage="tsx"
              >
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
                    <Typography level="body-md" className="opacity-50">
                      Disabled
                    </Typography>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch.Root disabled defaultChecked>
                      <Switch.Thumb />
                    </Switch.Root>
                    <Typography level="body-md" className="opacity-50">
                      Disabled checked
                    </Typography>
                  </label>
                </div>
              </Section>

              <Section
                title="Settings Example"
                titleLevel="h3"
                id="settings-example"
                code={`<div className="max-w-md space-y-4">
  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
    <div>
      <Typography level="body-md" weight="medium">
        Push Notifications
      </Typography>
      <Typography level="body-sm" className="text-neutral-500">
        Receive push notifications
      </Typography>
    </div>
    <Switch.Root defaultChecked>
      <Switch.Thumb />
    </Switch.Root>
  </div>

  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
    <div>
      <Typography level="body-md" weight="medium">
        Email Digest
      </Typography>
      <Typography level="body-sm" className="text-neutral-500">
        Weekly email summary
      </Typography>
    </div>
    <Switch.Root>
      <Switch.Thumb />
    </Switch.Root>
  </div>

  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
    <div>
      <Typography level="body-md" weight="medium">
        Dark Mode
      </Typography>
      <Typography level="body-sm" className="text-neutral-500">
        Use dark color theme
      </Typography>
    </div>
    <Switch.Root color="neutral">
      <Switch.Thumb />
    </Switch.Root>
  </div>
</div>`}
                codeLanguage="tsx"
              >
                <div className="max-w-md space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <Typography level="body-md" weight="medium">
                        Push Notifications
                      </Typography>
                      <Typography level="body-sm" className="text-neutral-500">
                        Receive push notifications
                      </Typography>
                    </div>
                    <Switch.Root defaultChecked>
                      <Switch.Thumb />
                    </Switch.Root>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <Typography level="body-md" weight="medium">
                        Email Digest
                      </Typography>
                      <Typography level="body-sm" className="text-neutral-500">
                        Weekly email summary
                      </Typography>
                    </div>
                    <Switch.Root>
                      <Switch.Thumb />
                    </Switch.Root>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <Typography level="body-md" weight="medium">
                        Dark Mode
                      </Typography>
                      <Typography level="body-sm" className="text-neutral-500">
                        Use dark color theme
                      </Typography>
                    </div>
                    <Switch.Root color="neutral">
                      <Switch.Thumb />
                    </Switch.Root>
                  </div>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Switch} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
