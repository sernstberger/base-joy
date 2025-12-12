import { Input } from '@base-joy/ui-core';
import {
  Playground,
  type PlaygroundControl,
} from '../../components/Playground';
import { PropsTable } from '../../components/PropsTable';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const inputControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const inputCodeTemplate = (props: Record<string, string>) =>
  `<Input
  variant="${props.variant}"
  color="${props.color}"
  size="${props.size}"
  placeholder="Enter text"
/>`;

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 10l3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="4"
      width="12"
      height="8"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M2 5l6 4 6-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="7"
      width="10"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M5 7V5a3 3 0 0 1 6 0v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8l3 3 7-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function InputPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Input</Heading>
        <Text variant="subtitle">
          A versatile input component with variants, colors, sizes, and
          decorators.
        </Text>
      </header>

      <Section title="Playground">
        <Playground controls={inputControls} codeTemplate={inputCodeTemplate}>
          {(props) => (
            <Input
              variant={props.variant as Variant}
              color={props.color as ColorScale}
              size={props.size as Size}
              placeholder="Enter text"
            />
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Variants</Heading>
            <div className="space-y-3 max-w-md">
              <Input variant="solid" placeholder="Solid variant" />
              <Input variant="soft" placeholder="Soft variant" />
              <Input variant="outlined" placeholder="Outlined variant" />
              <Input variant="plain" placeholder="Plain variant" />
            </div>
          </div>

          <div>
            <Heading level={3}>Colors</Heading>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input color="primary" placeholder="Primary" />
                <Input color="neutral" placeholder="Neutral" />
                <Input color="success" placeholder="Success" />
                <Input color="warning" placeholder="Warning" />
                <Input color="danger" placeholder="Danger" />
              </div>
              <Text variant="muted" className="mt-2">
                Soft variant with different colors
              </Text>
            </div>
            <div className="space-y-3 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  variant="outlined"
                  color="primary"
                  placeholder="Primary"
                />
                <Input
                  variant="outlined"
                  color="neutral"
                  placeholder="Neutral"
                />
                <Input
                  variant="outlined"
                  color="success"
                  placeholder="Success"
                />
                <Input
                  variant="outlined"
                  color="warning"
                  placeholder="Warning"
                />
                <Input variant="outlined" color="danger" placeholder="Danger" />
              </div>
              <Text variant="muted" className="mt-2">
                Outlined variant with different colors
              </Text>
            </div>
          </div>

          <div>
            <Heading level={3}>Sizes</Heading>
            <div className="space-y-3 max-w-md">
              <Input size="sm" placeholder="Small input" />
              <Input size="md" placeholder="Medium input" />
              <Input size="lg" placeholder="Large input" />
            </div>
          </div>

          <div>
            <Heading level={3}>Input Types</Heading>
            <div className="space-y-3 max-w-md">
              <Input type="text" placeholder="Text input" />
              <Input type="email" placeholder="Email input" />
              <Input type="password" placeholder="Password input" />
              <Input type="number" placeholder="Number input" />
              <Input type="search" placeholder="Search input" />
              <Input type="tel" placeholder="Phone number" />
              <Input type="url" placeholder="URL input" />
            </div>
          </div>

          <div>
            <Heading level={3}>With Start Decorator</Heading>
            <div className="space-y-3 max-w-md">
              <Input startDecorator={<SearchIcon />} placeholder="Search..." />
              <Input
                startDecorator={<EmailIcon />}
                type="email"
                placeholder="Email address"
              />
              <Input
                startDecorator={<LockIcon />}
                type="password"
                placeholder="Password"
              />
              <Input
                variant="outlined"
                startDecorator={
                  <span className="text-neutral-500">https://</span>
                }
                placeholder="example.com"
              />
            </div>
          </div>

          <div>
            <Heading level={3}>With End Decorator</Heading>
            <div className="space-y-3 max-w-md">
              <Input
                endDecorator={<CheckIcon />}
                placeholder="Verified input"
                color="success"
              />
              <Input
                endDecorator={
                  <button
                    type="button"
                    className="text-neutral-500 hover:text-neutral-700"
                    aria-label="Clear"
                  >
                    ✕
                  </button>
                }
                placeholder="Clearable input"
              />
              <Input
                variant="outlined"
                endDecorator={
                  <span className="text-sm text-neutral-500">0/100</span>
                }
                placeholder="Character counter"
              />
            </div>
          </div>

          <div>
            <Heading level={3}>Both Decorators</Heading>
            <div className="space-y-3 max-w-md">
              <Input
                startDecorator={<SearchIcon />}
                endDecorator={
                  <kbd className="px-1.5 py-0.5 text-xs bg-neutral-200 rounded">
                    ⌘K
                  </kbd>
                }
                placeholder="Search..."
              />
              <Input
                variant="outlined"
                startDecorator={<span className="text-neutral-500">$</span>}
                endDecorator={<span className="text-neutral-500">USD</span>}
                type="number"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Heading level={3}>Error State</Heading>
            <div className="space-y-3 max-w-md">
              <div>
                <Input error placeholder="Invalid input" />
                <Text variant="muted" className="text-danger-600 text-sm mt-1">
                  This field is required
                </Text>
              </div>
              <div>
                <Input
                  variant="outlined"
                  error
                  type="email"
                  placeholder="email@example.com"
                  startDecorator={<EmailIcon />}
                />
                <Text variant="muted" className="text-danger-600 text-sm mt-1">
                  Please enter a valid email address
                </Text>
              </div>
            </div>
          </div>

          <div>
            <Heading level={3}>Disabled State</Heading>
            <div className="space-y-3 max-w-md">
              <Input disabled placeholder="Disabled input" />
              <Input
                variant="outlined"
                disabled
                startDecorator={<EmailIcon />}
                placeholder="Disabled with icon"
              />
            </div>
          </div>

          <div>
            <Heading level={3}>Full Width</Heading>
            <Input fullWidth placeholder="Full width input" />
          </div>

          <div>
            <Heading level={3}>Form Example</Heading>
            <form className="space-y-4 max-w-md">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <Input id="name" type="text" placeholder="John Doe" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  startDecorator={<EmailIcon />}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  startDecorator={<LockIcon />}
                />
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium mb-1"
                >
                  Website
                </label>
                <Input
                  id="website"
                  type="url"
                  variant="outlined"
                  placeholder="example.com"
                  startDecorator={
                    <span className="text-neutral-500">https://</span>
                  }
                />
              </div>
            </form>
          </div>

          <div>
            <Heading level={3}>Search Variants</Heading>
            <div className="space-y-3 max-w-md">
              <Input
                type="search"
                variant="soft"
                startDecorator={<SearchIcon />}
                placeholder="Search in soft variant..."
              />
              <Input
                type="search"
                variant="outlined"
                startDecorator={<SearchIcon />}
                placeholder="Search in outlined variant..."
              />
              <Input
                type="search"
                variant="outlined"
                color="primary"
                startDecorator={<SearchIcon />}
                endDecorator={
                  <kbd className="px-1.5 py-0.5 text-xs bg-primary-100 text-primary-700 rounded">
                    /
                  </kbd>
                }
                placeholder="Quick search..."
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={componentProps.Input} />
      </Section>
    </div>
  );
}
