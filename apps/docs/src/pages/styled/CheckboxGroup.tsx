import { Checkbox, CheckboxGroup, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Size } from '@base-joy/tokens';

const checkboxGroupControls: PlaygroundControl[] = [
  { name: 'orientation', type: 'select', options: ['vertical', 'horizontal'], defaultValue: 'vertical' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
];

const checkboxGroupCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<CheckboxGroup orientation="${props.orientation}" size="${props.size}"${booleanPropsStr}>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="email">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Email</span>
  </label>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="sms">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>SMS</span>
  </label>
</CheckboxGroup>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'basic-usage', title: 'Basic Usage', level: 3 },
  { id: 'orientation', title: 'Orientation', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'disabled', title: 'Disabled', level: 3 },
  { id: 'select-all', title: 'Select All', level: 3 },
  { id: 'with-descriptions', title: 'With Descriptions', level: 3 },
  { id: 'filter-example', title: 'Filter Example', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function CheckboxGroupPage() {
  return (
    <div>
      <ComponentHeader
        title="CheckboxGroup"
        description="A container for grouping multiple checkbox options together with consistent spacing and layout."
        baseUiUrl="https://base-ui.com/react/components/checkbox-group"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={checkboxGroupControls}
              codeTemplate={checkboxGroupCodeTemplate}
            >
              {(props) => (
                <CheckboxGroup
                  orientation={props.orientation as 'vertical' | 'horizontal'}
                  size={props.size as Size}
                  disabled={props.disabled === 'true'}
                >
                  <label className="flex items-center gap-3">
                    <Checkbox.Root value="email">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>Email</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <Checkbox.Root value="sms">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>SMS</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <Checkbox.Root value="push">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>Push Notifications</span>
                  </label>
                </CheckboxGroup>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Basic Usage"
                titleLevel="h3"
                id="basic-usage"
                code={`<CheckboxGroup defaultValue={['email']}>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="email">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Email</span>
  </label>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="sms">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>SMS</span>
  </label>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="push">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Push Notifications</span>
  </label>
</CheckboxGroup>`}
              >
                <CheckboxGroup defaultValue={['email']}>
                  <label className="flex items-center gap-3">
                    <Checkbox.Root value="email">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>Email</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <Checkbox.Root value="sms">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>SMS</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <Checkbox.Root value="push">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>Push Notifications</span>
                  </label>
                </CheckboxGroup>
              </Section>

              <Section
                title="Orientation"
                titleLevel="h3"
                id="orientation"
                code={`{/* Vertical (default) */}
<CheckboxGroup orientation="vertical">
  <label className="flex items-center gap-3">
    <Checkbox.Root value="small">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Small</span>
  </label>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="medium">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Medium</span>
  </label>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="large">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Large</span>
  </label>
</CheckboxGroup>

{/* Horizontal */}
<CheckboxGroup orientation="horizontal">
  <label className="flex items-center gap-2">
    <Checkbox.Root value="small">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Small</span>
  </label>
  <label className="flex items-center gap-2">
    <Checkbox.Root value="medium">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Medium</span>
  </label>
  <label className="flex items-center gap-2">
    <Checkbox.Root value="large">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Large</span>
  </label>
</CheckboxGroup>`}
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-sm" className="mb-2 text-neutral-600">
                      Vertical (default)
                    </Typography>
                    <CheckboxGroup orientation="vertical">
                      <label className="flex items-center gap-3">
                        <Checkbox.Root value="small">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Small</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <Checkbox.Root value="medium">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Medium</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <Checkbox.Root value="large">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Large</span>
                      </label>
                    </CheckboxGroup>
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2 text-neutral-600">
                      Horizontal
                    </Typography>
                    <CheckboxGroup orientation="horizontal">
                      <label className="flex items-center gap-2">
                        <Checkbox.Root value="small">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Small</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <Checkbox.Root value="medium">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Medium</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <Checkbox.Root value="large">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Large</span>
                      </label>
                    </CheckboxGroup>
                  </div>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<CheckboxGroup size="sm">
  <label className="flex items-center gap-2">
    <Checkbox.Root value="option1">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Small spacing</span>
  </label>
  <label className="flex items-center gap-2">
    <Checkbox.Root value="option2">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Between items</span>
  </label>
</CheckboxGroup>

<CheckboxGroup size="md">
  <label className="flex items-center gap-3">
    <Checkbox.Root value="option1">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Medium spacing</span>
  </label>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="option2">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Between items</span>
  </label>
</CheckboxGroup>

<CheckboxGroup size="lg">
  <label className="flex items-center gap-4">
    <Checkbox.Root value="option1">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Large spacing</span>
  </label>
  <label className="flex items-center gap-4">
    <Checkbox.Root value="option2">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Between items</span>
  </label>
</CheckboxGroup>`}
              >
                <div className="space-y-4">
                  <div>
                    <Typography level="body-sm" className="mb-2 text-neutral-600">
                      Small (sm)
                    </Typography>
                    <CheckboxGroup size="sm">
                      <label className="flex items-center gap-2">
                        <Checkbox.Root value="option1">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Small spacing</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <Checkbox.Root value="option2">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Between items</span>
                      </label>
                    </CheckboxGroup>
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2 text-neutral-600">
                      Medium (md)
                    </Typography>
                    <CheckboxGroup size="md">
                      <label className="flex items-center gap-3">
                        <Checkbox.Root value="option1">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Medium spacing</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <Checkbox.Root value="option2">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Between items</span>
                      </label>
                    </CheckboxGroup>
                  </div>
                  <div>
                    <Typography level="body-sm" className="mb-2 text-neutral-600">
                      Large (lg)
                    </Typography>
                    <CheckboxGroup size="lg">
                      <label className="flex items-center gap-4">
                        <Checkbox.Root value="option1">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Large spacing</span>
                      </label>
                      <label className="flex items-center gap-4">
                        <Checkbox.Root value="option2">
                          <Checkbox.Indicator />
                        </Checkbox.Root>
                        <span>Between items</span>
                      </label>
                    </CheckboxGroup>
                  </div>
                </div>
              </Section>

              <Section
                title="Disabled"
                titleLevel="h3"
                id="disabled"
                code={`<CheckboxGroup disabled defaultValue={['option1']}>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="option1">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Option 1 (checked)</span>
  </label>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="option2">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Option 2</span>
  </label>
  <label className="flex items-center gap-3">
    <Checkbox.Root value="option3">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Option 3</span>
  </label>
</CheckboxGroup>`}
              >
                <CheckboxGroup disabled defaultValue={['option1']}>
                  <label className="flex items-center gap-3">
                    <Checkbox.Root value="option1">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>Option 1 (checked)</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <Checkbox.Root value="option2">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>Option 2</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <Checkbox.Root value="option3">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>Option 3</span>
                  </label>
                </CheckboxGroup>
              </Section>

              <Section
                title="Select All"
                titleLevel="h3"
                id="select-all"
                code={`<CheckboxGroup allValues={['option1', 'option2', 'option3']}>
  <label className="flex items-center gap-3 font-medium">
    <Checkbox.Root parent>
      <Checkbox.Indicator />
    </Checkbox.Root>
    <span>Select All</span>
  </label>
  <div className="ml-6 space-y-2">
    <label className="flex items-center gap-3">
      <Checkbox.Root value="option1">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <span>Option 1</span>
    </label>
    <label className="flex items-center gap-3">
      <Checkbox.Root value="option2">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <span>Option 2</span>
    </label>
    <label className="flex items-center gap-3">
      <Checkbox.Root value="option3">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <span>Option 3</span>
    </label>
  </div>
</CheckboxGroup>`}
              >
                <CheckboxGroup allValues={['option1', 'option2', 'option3']}>
                  <label className="flex items-center gap-3 font-medium">
                    <Checkbox.Root parent>
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <span>Select All</span>
                  </label>
                  <div className="ml-6 space-y-2">
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="option1">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <span>Option 1</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="option2">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <span>Option 2</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="option3">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <span>Option 3</span>
                    </label>
                  </div>
                </CheckboxGroup>
              </Section>

              <Section
                title="With Descriptions"
                titleLevel="h3"
                id="with-descriptions"
                code={`<CheckboxGroup>
  <label className="flex items-start gap-3">
    <Checkbox.Root value="analytics" className="mt-0.5">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <div>
      <div className="font-medium">Analytics</div>
      <Typography level="body-sm" className="text-neutral-500">
        Allow us to collect anonymous usage data to improve the product
      </Typography>
    </div>
  </label>
  <label className="flex items-start gap-3">
    <Checkbox.Root value="marketing" className="mt-0.5">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <div>
      <div className="font-medium">Marketing</div>
      <Typography level="body-sm" className="text-neutral-500">
        Receive marketing emails about new features and offers
      </Typography>
    </div>
  </label>
  <label className="flex items-start gap-3">
    <Checkbox.Root value="updates" className="mt-0.5">
      <Checkbox.Indicator />
    </Checkbox.Root>
    <div>
      <div className="font-medium">Product Updates</div>
      <Typography level="body-sm" className="text-neutral-500">
        Get notified about new features and product updates
      </Typography>
    </div>
  </label>
</CheckboxGroup>`}
              >
                <CheckboxGroup>
                  <label className="flex items-start gap-3">
                    <Checkbox.Root value="analytics" className="mt-0.5">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <div>
                      <div className="font-medium">Analytics</div>
                      <Typography level="body-sm" className="text-neutral-500">
                        Allow us to collect anonymous usage data to improve the product
                      </Typography>
                    </div>
                  </label>
                  <label className="flex items-start gap-3">
                    <Checkbox.Root value="marketing" className="mt-0.5">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <div>
                      <div className="font-medium">Marketing</div>
                      <Typography level="body-sm" className="text-neutral-500">
                        Receive marketing emails about new features and offers
                      </Typography>
                    </div>
                  </label>
                  <label className="flex items-start gap-3">
                    <Checkbox.Root value="updates" className="mt-0.5">
                      <Checkbox.Indicator />
                    </Checkbox.Root>
                    <div>
                      <div className="font-medium">Product Updates</div>
                      <Typography level="body-sm" className="text-neutral-500">
                        Get notified about new features and product updates
                      </Typography>
                    </div>
                  </label>
                </CheckboxGroup>
              </Section>

              <Section
                title="Filter Example"
                titleLevel="h3"
                id="filter-example"
                code={`<div className="max-w-xs p-4 bg-neutral-50 rounded-lg">
  <Typography level="body-md" weight="medium" className="mb-3">
    Filter by Category
  </Typography>
  <CheckboxGroup defaultValue={['electronics', 'books']}>
    <label className="flex items-center gap-3">
      <Checkbox.Root value="electronics">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <span>Electronics</span>
      <Typography level="body-sm" className="ml-auto text-neutral-400">
        42
      </Typography>
    </label>
    <label className="flex items-center gap-3">
      <Checkbox.Root value="clothing">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <span>Clothing</span>
      <Typography level="body-sm" className="ml-auto text-neutral-400">
        18
      </Typography>
    </label>
    <label className="flex items-center gap-3">
      <Checkbox.Root value="books">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <span>Books</span>
      <Typography level="body-sm" className="ml-auto text-neutral-400">
        156
      </Typography>
    </label>
    <label className="flex items-center gap-3">
      <Checkbox.Root value="home">
        <Checkbox.Indicator />
      </Checkbox.Root>
      <span>Home & Garden</span>
      <Typography level="body-sm" className="ml-auto text-neutral-400">
        73
      </Typography>
    </label>
  </CheckboxGroup>
</div>`}
              >
                <div className="max-w-xs p-4 bg-neutral-50 rounded-lg">
                  <Typography level="body-md" weight="medium" className="mb-3">
                    Filter by Category
                  </Typography>
                  <CheckboxGroup defaultValue={['electronics', 'books']}>
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="electronics">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <span>Electronics</span>
                      <Typography level="body-sm" className="ml-auto text-neutral-400">
                        42
                      </Typography>
                    </label>
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="clothing">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <span>Clothing</span>
                      <Typography level="body-sm" className="ml-auto text-neutral-400">
                        18
                      </Typography>
                    </label>
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="books">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <span>Books</span>
                      <Typography level="body-sm" className="ml-auto text-neutral-400">
                        156
                      </Typography>
                    </label>
                    <label className="flex items-center gap-3">
                      <Checkbox.Root value="home">
                        <Checkbox.Indicator />
                      </Checkbox.Root>
                      <span>Home & Garden</span>
                      <Typography level="body-sm" className="ml-auto text-neutral-400">
                        73
                      </Typography>
                    </label>
                  </CheckboxGroup>
                </div>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.CheckboxGroup} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
