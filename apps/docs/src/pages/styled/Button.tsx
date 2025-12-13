import { Button, Sheet, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const buttonControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'solid' },
  { name: 'color', type: 'color', defaultValue: 'primary' },
  { name: 'size', type: 'size', defaultValue: 'md' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'loading', type: 'boolean', defaultValue: false },
];

const buttonCodeTemplate = (props: Record<string, string | boolean>) => {
  const booleanProps = [];
  if (props.disabled === 'true' || props.disabled === true) booleanProps.push('disabled');
  if (props.loading === 'true' || props.loading === true) booleanProps.push('loading');
  const booleanPropsStr =
    booleanProps.length > 0 ? ' ' + booleanProps.join(' ') : '';

  return `<Button variant="${props.variant}" color="${props.color}" size="${props.size}"${booleanPropsStr}>
  Click me
</Button>`;
};

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'decorators', title: 'With Decorators', level: 3 },
  { id: 'loading', title: 'Loading State', level: 3 },
  { id: 'disabled', title: 'Disabled State', level: 3 },
  { id: 'full-width', title: 'Full Width', level: 3 },
  { id: 'as-link', title: 'As Link', level: 3 },
  { id: 'button-groups', title: 'Button Groups', level: 3 },
  { id: 'in-context', title: 'In Context', level: 3 },
  { id: 'api', title: 'API Reference' },
];

export function ButtonPage() {
  return (
    <div>
      <ComponentHeader
        title="Button"
        description="A versatile button component with variants, colors, sizes, and loading states."
        baseUiUrl="https://base-ui.com/react/components/button"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={buttonControls} codeTemplate={buttonCodeTemplate}>
              {(props) => (
                <Button
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  disabled={props.disabled === 'true'}
                  loading={props.loading === 'true'}
                >
                  Click me
                </Button>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Button variant="solid">Solid</Button>
<Button variant="soft">Soft</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="plain">Plain</Button>`}
              >
                <div className="flex flex-wrap gap-3">
                  <Button variant="solid">Solid</Button>
                  <Button variant="soft">Soft</Button>
                  <Button variant="outlined">Outlined</Button>
                  <Button variant="plain">Plain</Button>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`{/* Solid variant */}
<Button color="primary">Primary</Button>
<Button color="neutral">Neutral</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="danger">Danger</Button>

{/* Soft variant */}
<Button variant="soft" color="primary">Primary</Button>
<Button variant="soft" color="neutral">Neutral</Button>
<Button variant="soft" color="success">Success</Button>
<Button variant="soft" color="warning">Warning</Button>
<Button variant="soft" color="danger">Danger</Button>

{/* Outlined variant */}
<Button variant="outlined" color="primary">Primary</Button>
<Button variant="outlined" color="neutral">Neutral</Button>
<Button variant="outlined" color="success">Success</Button>
<Button variant="outlined" color="warning">Warning</Button>
<Button variant="outlined" color="danger">Danger</Button>`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-3">
                    <Button color="primary">Primary</Button>
                    <Button color="neutral">Neutral</Button>
                    <Button color="success">Success</Button>
                    <Button color="warning">Warning</Button>
                    <Button color="danger">Danger</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="soft" color="primary">Primary</Button>
                    <Button variant="soft" color="neutral">Neutral</Button>
                    <Button variant="soft" color="success">Success</Button>
                    <Button variant="soft" color="warning">Warning</Button>
                    <Button variant="soft" color="danger">Danger</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outlined" color="primary">Primary</Button>
                    <Button variant="outlined" color="neutral">Neutral</Button>
                    <Button variant="outlined" color="success">Success</Button>
                    <Button variant="outlined" color="warning">Warning</Button>
                    <Button variant="outlined" color="danger">Danger</Button>
                  </div>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </Section>

              <Section
                title="With Decorators"
                titleLevel="h3"
                id="decorators"
                code={`<Button
  startDecorator={<PlusIcon />}
>
  Add Item
</Button>
<Button
  endDecorator={<ArrowRightIcon />}
>
  Next
</Button>
<Button
  variant="soft"
  startDecorator={<ClockIcon />}
>
  Schedule
</Button>`}
              >
                <div className="flex flex-wrap gap-3">
                  <Button
                    startDecorator={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 3.5v9M3.5 8h9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  >
                    Add Item
                  </Button>
                  <Button
                    endDecorator={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  >
                    Next
                  </Button>
                  <Button
                    variant="soft"
                    startDecorator={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8 5v3l2 2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                  >
                    Schedule
                  </Button>
                </div>
              </Section>

              <Section
                title="Loading State"
                titleLevel="h3"
                id="loading"
                code={`<Button loading>Loading</Button>
<Button variant="soft" loading>Loading</Button>
<Button variant="outlined" loading>Loading</Button>
<Button size="sm" loading>Small Loading</Button>
<Button size="lg" loading>Large Loading</Button>`}
              >
                <div className="flex flex-wrap gap-3">
                  <Button loading>Loading</Button>
                  <Button variant="soft" loading>Loading</Button>
                  <Button variant="outlined" loading>Loading</Button>
                  <Button size="sm" loading>Small Loading</Button>
                  <Button size="lg" loading>Large Loading</Button>
                </div>
              </Section>

              <Section
                title="Disabled State"
                titleLevel="h3"
                id="disabled"
                code={`<Button disabled>Disabled</Button>
<Button variant="soft" disabled>Disabled</Button>
<Button variant="outlined" disabled>Disabled</Button>`}
              >
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button variant="soft" disabled>Disabled</Button>
                  <Button variant="outlined" disabled>Disabled</Button>
                </div>
              </Section>

              <Section
                title="Full Width"
                titleLevel="h3"
                id="full-width"
                code={`<Button fullWidth>Full Width Button</Button>`}
              >
                <div className="max-w-md">
                  <Button fullWidth>Full Width Button</Button>
                </div>
              </Section>

              <div>
                <Typography level="h3" className="mb-2" id="as-link">
                  As Link
                </Typography>
                <Typography level="body-sm" className="mb-3">
                  Use the <code className="font-mono text-sm">render</code> prop to render the button as an anchor
                  tag (Base UI pattern).
                </Typography>
                <Section
                  code={`<Button render={<a href="#" />}>Link Button</Button>
<Button render={<a href="#" />} variant="outlined">Outlined Link</Button>`}
                >
                  <div className="flex flex-wrap gap-3">
                    <Button render={<a href="#" />}>Link Button</Button>
                    <Button render={<a href="#" />} variant="outlined">Outlined Link</Button>
                  </div>
                </Section>
              </div>

              <Section
                title="Button Groups"
                titleLevel="h3"
                id="button-groups"
                code={`<div className="flex gap-0">
  <Button className="rounded-r-none border-r-0">First</Button>
  <Button className="rounded-none border-r-0">Second</Button>
  <Button className="rounded-l-none">Third</Button>
</div>`}
              >
                <div className="flex gap-0">
                  <Button className="rounded-r-none border-r-0">First</Button>
                  <Button className="rounded-none border-r-0">Second</Button>
                  <Button className="rounded-l-none">Third</Button>
                </div>
              </Section>

              <div>
                <Typography level="h3" className="mb-2" id="in-context">
                  In Context
                </Typography>
                <Typography level="body-sm" className="mb-3">
                  Buttons work well within other components like Sheet.
                </Typography>
                <Section
                  code={`<Sheet variant="outlined" color="neutral">
  <div className="space-y-4">
    <div>
      <Typography level="h4">Confirm Action</Typography>
      <Typography>Are you sure you want to proceed?</Typography>
    </div>
    <div className="flex gap-2">
      <Button variant="outlined" color="neutral">Cancel</Button>
      <Button color="primary">Confirm</Button>
    </div>
  </div>
</Sheet>`}
                >
                  <Sheet variant="outlined" color="neutral">
                    <div className="space-y-4">
                      <div>
                        <Typography level="h4">Confirm Action</Typography>
                        <Typography>
                          Are you sure you want to proceed with this action?
                        </Typography>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outlined" color="neutral">Cancel</Button>
                        <Button color="primary">Confirm</Button>
                      </div>
                    </div>
                  </Sheet>
                </Section>
              </div>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <PropsTable props={componentProps.Button} />
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
