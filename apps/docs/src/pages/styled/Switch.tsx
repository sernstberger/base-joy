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

  return `<Switch color="${props.color}" size="${props.size}"${booleanPropsStr} />`;
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
                <Switch
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  disabled={props.disabled === 'true'}
                  defaultChecked={props.defaultChecked === 'true'}
                  aria-label="Toggle switch"
                />
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
  <Switch color="primary" defaultChecked />
  <span>Primary</span>
</label>

<label className="flex items-center gap-3">
  <Switch color="neutral" defaultChecked />
  <span>Neutral</span>
</label>

<label className="flex items-center gap-3">
  <Switch color="success" defaultChecked />
  <span>Success</span>
</label>

<label className="flex items-center gap-3">
  <Switch color="warning" defaultChecked />
  <span>Warning</span>
</label>

<label className="flex items-center gap-3">
  <Switch color="danger" defaultChecked />
  <span>Danger</span>
</label>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <Switch color="primary" defaultChecked />
                    <span>Primary</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch color="neutral" defaultChecked />
                    <span>Neutral</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch color="success" defaultChecked />
                    <span>Success</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch color="warning" defaultChecked />
                    <span>Warning</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch color="danger" defaultChecked />
                    <span>Danger</span>
                  </label>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<label className="flex items-center gap-3">
  <Switch size="sm" />
  <Typography level="body-sm">Small switch</Typography>
</label>

<label className="flex items-center gap-3">
  <Switch size="md" />
  <span>Medium switch</span>
</label>

<label className="flex items-center gap-3">
  <Switch size="lg" />
  <Typography level="body-lg">Large switch</Typography>
</label>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <Switch size="sm" />
                    <Typography level="body-sm">Small switch</Typography>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch size="md" />
                    <span>Medium switch</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch size="lg" />
                    <Typography level="body-lg">Large switch</Typography>
                  </label>
                </div>
              </Section>

              <Section
                title="States"
                titleLevel="h3"
                id="states"
                code={`<label className="flex items-center gap-3">
  <Switch />
  <span>Unchecked</span>
</label>

<label className="flex items-center gap-3">
  <Switch defaultChecked />
  <span>Checked</span>
</label>

<label className="flex items-center gap-3">
  <Switch disabled />
  <Typography level="body-md" className="opacity-50">
    Disabled
  </Typography>
</label>

<label className="flex items-center gap-3">
  <Switch disabled defaultChecked />
  <Typography level="body-md" className="opacity-50">
    Disabled checked
  </Typography>
</label>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <Switch />
                    <span>Unchecked</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <span>Checked</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch disabled />
                    <Typography level="body-md" className="opacity-50">
                      Disabled
                    </Typography>
                  </label>

                  <label className="flex items-center gap-3">
                    <Switch disabled defaultChecked />
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
    <Switch defaultChecked aria-label="Push notifications" />
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
    <Switch aria-label="Email digest" />
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
    <Switch color="neutral" aria-label="Dark mode" />
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
                    <Switch defaultChecked aria-label="Push notifications" />
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
                    <Switch aria-label="Email digest" />
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
                    <Switch color="neutral" aria-label="Dark mode" />
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
