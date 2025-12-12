import { Avatar, AvatarGroup, Typography } from '@base-joy/ui-components';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { componentProps } from '../../props';
import type { Size, ColorScale } from '@base-joy/tokens';

const avatarControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const avatarCodeTemplate = (props: Record<string, string>) =>
  `<Avatar variant="${props.variant}" color="${props.color}" size="${props.size}">JD</Avatar>`;

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
        <Typography level="h1">Avatar</Typography>
        <Typography level="body-lg">
          Display user profile images or initials with support for fallback content and grouping.
        </Typography>
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
            <Typography level="h3">With Image</Typography>
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
            <Typography level="h3">With Initials</Typography>
            <div className="flex gap-3">
              <Avatar>JD</Avatar>
              <Avatar>AB</Avatar>
              <Avatar>MK</Avatar>
            </div>
          </div>

          <div>
            <Typography level="h3">Sizes</Typography>
            <div className="flex items-center gap-3">
              <Avatar size="sm">SM</Avatar>
              <Avatar size="md">MD</Avatar>
              <Avatar size="lg">LG</Avatar>
            </div>
          </div>

          <div>
            <Typography level="h3">Colors</Typography>
            <div className="flex gap-3">
              <Avatar color="primary">PR</Avatar>
              <Avatar color="neutral">NE</Avatar>
              <Avatar color="success">SU</Avatar>
              <Avatar color="warning">WA</Avatar>
              <Avatar color="danger">DA</Avatar>
            </div>
          </div>

          <div>
            <Typography level="h3">Variants</Typography>
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" className="mb-2">
                  Solid
                </Typography>
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
                <Typography level="body-sm" className="mb-2">
                  Soft
                </Typography>
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
                <Typography level="body-sm" className="mb-2">
                  Outlined
                </Typography>
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
            <Typography level="h3">AvatarGroup</Typography>
            <Typography level="body-sm" className="mb-3">
              Display multiple avatars with overlap. The avatars stack with negative margin for a
              grouped appearance.
            </Typography>
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
            <Typography level="h3">AvatarGroup with Max</Typography>
            <Typography level="body-sm" className="mb-3">
              Limit the number of avatars displayed with the max prop. Extra avatars show as a +N
              indicator.
            </Typography>
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
            <Typography level="h3">AvatarGroup Sizes</Typography>
            <div className="space-y-4">
              <div>
                <Typography level="body-sm" className="mb-2">
                  Small
                </Typography>
                <AvatarGroup size="sm">
                  <Avatar>AB</Avatar>
                  <Avatar>CD</Avatar>
                  <Avatar>EF</Avatar>
                </AvatarGroup>
              </div>
              <div>
                <Typography level="body-sm" className="mb-2">
                  Medium
                </Typography>
                <AvatarGroup size="md">
                  <Avatar>AB</Avatar>
                  <Avatar>CD</Avatar>
                  <Avatar>EF</Avatar>
                </AvatarGroup>
              </div>
              <div>
                <Typography level="body-sm" className="mb-2">
                  Large
                </Typography>
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
            <Typography level="h3">Avatar</Typography>
            <PropsTable props={componentProps.Avatar} />
          </div>
          <div>
            <Typography level="h3">AvatarGroup</Typography>
            <PropsTable props={avatarGroupProps} />
          </div>
        </div>
      </Section>
    </div>
  );
}
