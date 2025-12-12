import { Sheet } from '@base-joy/ui-core';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';

function StaticToastExample({
  variant,
  color,
  size,
  title,
  description,
}: {
  variant?: 'solid' | 'soft' | 'outlined';
  color?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  title: string;
  description: string;
}) {
  return (
    <Sheet
      variant={variant ?? 'solid'}
      color={color ?? 'neutral'}
      className={`pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg p-4 shadow-lg transition-all ${
        size === 'sm' ? 'min-w-[280px] max-w-[320px]' :
        size === 'lg' ? 'min-w-[360px] max-w-[480px]' :
        'min-w-[320px] max-w-[400px]'
      }`}
    >
      <div className="flex-1">
        <div className={`font-semibold ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}`}>
          {title}
        </div>
        <div className={`opacity-90 ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
          {description}
        </div>
      </div>
      <button className="absolute top-2 right-2 rounded p-1 opacity-70 transition-opacity hover:opacity-100">
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </Sheet>
  );
}

export function ToastPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Toast</Heading>
        <Text variant="subtitle">
          A toast notification component for displaying brief messages.
        </Text>
      </header>

      <Section title="Usage">
        <Text className="mb-4">
          Toast uses Base UI's Toast component with useToastManager hook. Import{' '}
          <code className="bg-neutral-100 px-1 rounded">useToastManager</code> from{' '}
          <code className="bg-neutral-100 px-1 rounded">@base-ui/react/toast</code> to manage toasts.
        </Text>
        <pre className="bg-neutral-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { Toast } from '@base-joy/ui-core';
import { useToastManager } from '@base-ui/react/toast';

function MyComponent() {
  const toastManager = useToastManager();

  return (
    <Toast.Provider>
      <button onClick={() => toastManager.add({ title: 'Hello!' })}>
        Show Toast
      </button>
      <Toast.Viewport position="bottom-right">
        {toastManager.toasts.map((toast) => (
          <Toast.Root key={toast.id} toast={toast}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Close />
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Provider>
  );
}`}
        </pre>
      </Section>

      <Section title="Colors">
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

      <Section title="Variants">
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

      <Section title="Sizes">
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

      <Section title="With Action">
        <Sheet
          variant="solid"
          color="neutral"
          className="pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg p-4 shadow-lg min-w-[320px] max-w-[400px]"
        >
          <div className="flex-1">
            <div className="font-semibold">Undo Action</div>
            <div className="text-sm opacity-90">Item deleted.</div>
          </div>
          <button className="inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors hover:bg-black/10">
            Undo
          </button>
          <button className="absolute top-2 right-2 rounded p-1 opacity-70 transition-opacity hover:opacity-100">
            <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </Sheet>
      </Section>
    </div>
  );
}
