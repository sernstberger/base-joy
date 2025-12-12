import { Avatar, AvatarGroup } from '@base-joy/ui-core';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Heading, Text } from '../../components/Typography';
import { Section } from '../../components/Section';
import type { Size, ColorScale } from '@base-joy/tokens';

const avatarControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const avatarCodeTemplate = (props: Record<string, string>) =>
  `<Avatar variant="${props.variant}" color="${props.color}" size="${props.size}">JD</Avatar>`;

const avatarProps: PropMeta[] = [
  {
    name: 'variant',
    type: '"solid" | "soft" | "outlined"',
    defaultValue: '"soft"',
    description: 'The visual style of the avatar.',
    required: false,
  },
  {
    name: 'color',
    type: '"primary" | "neutral" | "success" | "warning" | "danger"',
    defaultValue: '"neutral"',
    description: 'The color scheme of the avatar.',
    required: false,
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: 'The size of the avatar.',
    required: false,
  },
  {
    name: 'src',
    type: 'string',
    description: 'Image source URL.',
    required: false,
  },
  {
    name: 'alt',
    type: 'string',
    description: 'Alt text for the image.',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Fallback content (typically initials) displayed when no src is provided or image fails to load.',
    required: false,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

const avatarGroupProps: PropMeta[] = [
  {
    name: 'max',
    type: 'number',
    description: 'Maximum number of avatars to display. Remaining avatars are hidden.',
    required: false,
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: 'The size of avatars in the group.',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Avatar components to display.',
    required: true,
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply.',
    required: false,
  },
];

export function AvatarPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Heading level={1}>Avatar</Heading>
        <Text variant="subtitle">
          Display user profile images or initials with support for fallback content and grouping.
        </Text>
      </header>

      <Section title="Playground">
        <Playground controls={avatarControls} codeTemplate={avatarCodeTemplate}>
          {(props) => (
            <Avatar
              variant={props.variant as 'solid' | 'soft' | 'outlined'}
              color={props.color as ColorScale}
              size={props.size as Size}
            >
              JD
            </Avatar>
          )}
        </Playground>
      </Section>

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Heading level={3}>With Image</Heading>
            <div className="flex gap-3">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                alt="User avatar"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="User avatar"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                alt="User avatar"
              />
            </div>
          </div>

          <div>
            <Heading level={3}>With Initials</Heading>
            <div className="flex gap-3">
              <Avatar>JD</Avatar>
              <Avatar>AB</Avatar>
              <Avatar>MK</Avatar>
            </div>
          </div>

          <div>
            <Heading level={3}>Sizes</Heading>
            <div className="flex items-center gap-3">
              <Avatar size="sm">SM</Avatar>
              <Avatar size="md">MD</Avatar>
              <Avatar size="lg">LG</Avatar>
            </div>
          </div>

          <div>
            <Heading level={3}>Colors</Heading>
            <div className="flex gap-3">
              <Avatar color="primary">PR</Avatar>
              <Avatar color="neutral">NE</Avatar>
              <Avatar color="success">SU</Avatar>
              <Avatar color="warning">WA</Avatar>
              <Avatar color="danger">DA</Avatar>
            </div>
          </div>

          <div>
            <Heading level={3}>Variants</Heading>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">
                  Solid
                </Text>
                <div className="flex gap-3">
                  <Avatar variant="solid" color="primary">
                    PR
                  </Avatar>
                  <Avatar variant="solid" color="neutral">
                    NE
                  </Avatar>
                  <Avatar variant="solid" color="success">
                    SU
                  </Avatar>
                  <Avatar variant="solid" color="warning">
                    WA
                  </Avatar>
                  <Avatar variant="solid" color="danger">
                    DA
                  </Avatar>
                </div>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  Soft
                </Text>
                <div className="flex gap-3">
                  <Avatar variant="soft" color="primary">
                    PR
                  </Avatar>
                  <Avatar variant="soft" color="neutral">
                    NE
                  </Avatar>
                  <Avatar variant="soft" color="success">
                    SU
                  </Avatar>
                  <Avatar variant="soft" color="warning">
                    WA
                  </Avatar>
                  <Avatar variant="soft" color="danger">
                    DA
                  </Avatar>
                </div>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  Outlined
                </Text>
                <div className="flex gap-3">
                  <Avatar variant="outlined" color="primary">
                    PR
                  </Avatar>
                  <Avatar variant="outlined" color="neutral">
                    NE
                  </Avatar>
                  <Avatar variant="outlined" color="success">
                    SU
                  </Avatar>
                  <Avatar variant="outlined" color="warning">
                    WA
                  </Avatar>
                  <Avatar variant="outlined" color="danger">
                    DA
                  </Avatar>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Heading level={3}>AvatarGroup</Heading>
            <Text variant="muted" className="mb-3">
              Display multiple avatars with overlap. The avatars stack with negative margin for a
              grouped appearance.
            </Text>
            <AvatarGroup>
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                alt="User 1"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="User 2"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                alt="User 3"
              />
              <Avatar>AB</Avatar>
            </AvatarGroup>
          </div>

          <div>
            <Heading level={3}>AvatarGroup with Max</Heading>
            <Text variant="muted" className="mb-3">
              Limit the number of avatars displayed with the max prop. Extra avatars show as a +N
              indicator.
            </Text>
            <AvatarGroup max={3}>
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                alt="User 1"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="User 2"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                alt="User 3"
              />
              <Avatar>AB</Avatar>
              <Avatar>CD</Avatar>
              <Avatar>EF</Avatar>
            </AvatarGroup>
          </div>

          <div>
            <Heading level={3}>AvatarGroup Sizes</Heading>
            <div className="space-y-4">
              <div>
                <Text variant="muted" className="mb-2">
                  Small
                </Text>
                <AvatarGroup size="sm">
                  <Avatar>AB</Avatar>
                  <Avatar>CD</Avatar>
                  <Avatar>EF</Avatar>
                </AvatarGroup>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  Medium
                </Text>
                <AvatarGroup size="md">
                  <Avatar>AB</Avatar>
                  <Avatar>CD</Avatar>
                  <Avatar>EF</Avatar>
                </AvatarGroup>
              </div>
              <div>
                <Text variant="muted" className="mb-2">
                  Large
                </Text>
                <AvatarGroup size="lg">
                  <Avatar>AB</Avatar>
                  <Avatar>CD</Avatar>
                  <Avatar>EF</Avatar>
                </AvatarGroup>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <div className="space-y-8">
          <div>
            <Heading level={3}>Avatar</Heading>
            <PropsTable props={avatarProps} />
          </div>
          <div>
            <Heading level={3}>AvatarGroup</Heading>
            <PropsTable props={avatarGroupProps} />
          </div>
        </div>
      </Section>
    </div>
  );
}
