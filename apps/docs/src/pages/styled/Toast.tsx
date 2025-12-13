import { Toast, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const rootProps: PropMeta[] = [
  {
    name: 'variant',
    type: "'solid' | 'soft' | 'outlined' | 'plain'",
    defaultValue: "'solid'",
    description: 'The visual style of the toast.',
    required: false,
  },
  {
    name: 'color',
    type: "'primary' | 'neutral' | 'success' | 'warning' | 'danger'",
    defaultValue: "'neutral'",
    description: 'The color scheme of the toast.',
    required: false,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'The size of the toast.',
    required: false,
  },
];

const viewportProps: PropMeta[] = [
  {
    name: 'position',
    type: "'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'",
    defaultValue: "'bottom-right'",
    description: 'The position where toasts appear on screen.',
    required: false,
  },
];

function StaticToastExample({
  variant = 'solid',
  color = 'neutral',
  size = 'md',
  title,
  description,
  showAction = false,
}: {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  title: string;
  description: string;
  showAction?: boolean;
}) {
  // Create a mock toast object for static examples
  const mockToast = {
    id: 'static-toast',
    open: true,
  };

  return (
    <div className="relative">
      <Toast.Root variant={variant} color={color} size={size} toast={mockToast}>
        <div className="flex-1">
          <Toast.Title>{title}</Toast.Title>
          <Toast.Description>{description}</Toast.Description>
        </div>
        {showAction && <Toast.Action>Undo</Toast.Action>}
        <Toast.Close />
      </Toast.Root>
    </div>
  );
}

const toastControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'solid' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const toastCodeTemplate = (props: Record<string, string>) =>
  `<Toast.Root variant="${props.variant}" color="${props.color}" size="${props.size}">
  <div className="flex-1">
    <Toast.Title>Notification</Toast.Title>
    <Toast.Description>Your changes have been saved.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'with-action', title: 'With Action', level: 3 },
  { id: 'usage', title: 'Usage Example' },
  { id: 'api', title: 'API Reference' },
];

export function ToastPage() {
  return (
    <div>
      <ComponentHeader
        title="Toast"
        description="A toast notification component for displaying brief, dismissible messages. Built on Base UI's Toast with useToastManager hook for state management."
        baseUiUrl="https://base-ui.com/react/components/toast"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground
              controls={toastControls}
              codeTemplate={toastCodeTemplate}
            >
              {(props) => (
                <StaticToastExample
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                  title="Notification"
                  description="Your changes have been saved."
                />
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Toast.Root variant="solid" color="primary">
  <div className="flex-1">
    <Toast.Title>Solid Variant</Toast.Title>
    <Toast.Description>This is a solid toast.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>
<Toast.Root variant="soft" color="primary">
  <div className="flex-1">
    <Toast.Title>Soft Variant</Toast.Title>
    <Toast.Description>This is a soft toast.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>
<Toast.Root variant="outlined" color="primary">
  <div className="flex-1">
    <Toast.Title>Outlined Variant</Toast.Title>
    <Toast.Description>This is an outlined toast.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <StaticToastExample
                    variant="solid"
                    color="primary"
                    title="Solid Variant"
                    description="This is a solid toast."
                  />
                  <StaticToastExample
                    variant="soft"
                    color="primary"
                    title="Soft Variant"
                    description="This is a soft toast."
                  />
                  <StaticToastExample
                    variant="outlined"
                    color="primary"
                    title="Outlined Variant"
                    description="This is an outlined toast."
                  />
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Toast.Root variant="solid" color="neutral">
  <div className="flex-1">
    <Toast.Title>Notification</Toast.Title>
    <Toast.Description>This is a neutral toast message.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>
<Toast.Root variant="solid" color="primary">
  <div className="flex-1">
    <Toast.Title>Info</Toast.Title>
    <Toast.Description>This is an informational toast.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>
<Toast.Root variant="solid" color="success">
  <div className="flex-1">
    <Toast.Title>Success!</Toast.Title>
    <Toast.Description>Operation completed successfully.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>
<Toast.Root variant="solid" color="warning">
  <div className="flex-1">
    <Toast.Title>Warning</Toast.Title>
    <Toast.Description>Please review before continuing.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>
<Toast.Root variant="solid" color="danger">
  <div className="flex-1">
    <Toast.Title>Error</Toast.Title>
    <Toast.Description>Something went wrong.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <StaticToastExample
                    variant="solid"
                    color="neutral"
                    title="Notification"
                    description="This is a neutral toast message."
                  />
                  <StaticToastExample
                    variant="solid"
                    color="primary"
                    title="Info"
                    description="This is an informational toast."
                  />
                  <StaticToastExample
                    variant="solid"
                    color="success"
                    title="Success!"
                    description="Operation completed successfully."
                  />
                  <StaticToastExample
                    variant="solid"
                    color="warning"
                    title="Warning"
                    description="Please review before continuing."
                  />
                  <StaticToastExample
                    variant="solid"
                    color="danger"
                    title="Error"
                    description="Something went wrong."
                  />
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Toast.Root size="sm">
  <div className="flex-1">
    <Toast.Title>Small Toast</Toast.Title>
    <Toast.Description>This is a small toast.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>
<Toast.Root size="md">
  <div className="flex-1">
    <Toast.Title>Medium Toast</Toast.Title>
    <Toast.Description>This is a medium toast.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>
<Toast.Root size="lg">
  <div className="flex-1">
    <Toast.Title>Large Toast</Toast.Title>
    <Toast.Description>This is a large toast.</Toast.Description>
  </div>
  <Toast.Close />
</Toast.Root>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <StaticToastExample
                    size="sm"
                    title="Small Toast"
                    description="This is a small toast."
                  />
                  <StaticToastExample
                    size="md"
                    title="Medium Toast"
                    description="This is a medium toast."
                  />
                  <StaticToastExample
                    size="lg"
                    title="Large Toast"
                    description="This is a large toast."
                  />
                </div>
              </Section>

              <Section
                title="With Action"
                titleLevel="h3"
                id="with-action"
                code={`<Toast.Root variant="solid" color="neutral" toast={toast}>
  <div className="flex-1">
    <Toast.Title>Undo Action</Toast.Title>
    <Toast.Description>Item deleted.</Toast.Description>
  </div>
  <Toast.Action>Undo</Toast.Action>
  <Toast.Close />
</Toast.Root>`}
                codeLanguage="tsx"
              >
                <Typography level="body-sm" className="mb-4">
                  Use <code className="font-mono text-sm">Toast.Action</code> to add interactive buttons to toasts.
                </Typography>
                <StaticToastExample
                  variant="solid"
                  color="neutral"
                  title="Undo Action"
                  description="Item deleted."
                  showAction
                />
              </Section>
            </div>
          </Section>

          <Section title="Usage Example" id="usage">
            <Typography level="body-sm" className="mb-4">
              Toast uses Base UI's Toast component with <code className="font-mono text-sm">useToastManager</code> hook for managing toast state. Import <code className="font-mono text-sm">useToastManager</code> from <code className="font-mono text-sm">@base-joy/ui-styled</code> to manage toasts dynamically.
            </Typography>
            <Section
              code={`import { Toast, useToastManager } from '@base-joy/ui-styled';

function MyComponent() {
  const toastManager = useToastManager();

  return (
    <Toast.Provider>
      <button
        onClick={() =>
          toastManager.add({
            title: 'Hello!',
            description: 'This is a toast message.',
          })
        }
      >
        Show Toast
      </button>
      <Toast.Viewport position="bottom-right">
        {toastManager.toasts.map((toast) => (
          <Toast.Root key={toast.id} toast={toast}>
            <div className="flex-1">
              <Toast.Title>{toast.title}</Toast.Title>
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </div>
            <Toast.Close />
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Provider>
  );
}`}
              codeLanguage="tsx"
            />
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h3" className="mb-4">
                  Toast.Root
                </Typography>
                <PropsTable props={rootProps} />
              </div>
              <div>
                <Typography level="h3" className="mb-4">
                  Toast.Viewport
                </Typography>
                <PropsTable props={viewportProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
