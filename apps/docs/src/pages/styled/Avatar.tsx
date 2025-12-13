import { Avatar, AvatarGroup, Typography } from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Size, ColorScale } from '@base-joy/tokens';

const avatarControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'soft' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const avatarCodeTemplate = (props: Record<string, string>) =>
  `<Avatar variant="${props.variant}" color="${props.color}" size="${props.size}">JD</Avatar>`;

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'with-image', title: 'With Image', level: 3 },
  { id: 'with-initials', title: 'With Initials', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'avatar-group', title: 'AvatarGroup', level: 3 },
  { id: 'avatar-group-max', title: 'AvatarGroup with Max', level: 3 },
  { id: 'avatar-group-sizes', title: 'AvatarGroup Sizes', level: 3 },
  { id: 'api', title: 'API Reference' },
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
    <div>
      <ComponentHeader
        title="Avatar"
        description="Display user profile images or initials with support for fallback content and grouping."
        baseUiUrl="https://base-ui.com/react/components/avatar"
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
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

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="With Image"
                titleLevel="h3"
                id="with-image"
                code={`<Avatar
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
/>`}
                codeLanguage="tsx"
              >
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
              </Section>

              <Section
                title="With Initials"
                titleLevel="h3"
                id="with-initials"
                code={`<Avatar>JD</Avatar>
<Avatar>AB</Avatar>
<Avatar>MK</Avatar>`}
                codeLanguage="tsx"
              >
                <div className="flex gap-3">
                  <Avatar>JD</Avatar>
                  <Avatar>AB</Avatar>
                  <Avatar>MK</Avatar>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Avatar size="sm">SM</Avatar>
<Avatar size="md">MD</Avatar>
<Avatar size="lg">LG</Avatar>`}
                codeLanguage="tsx"
              >
                <div className="flex items-center gap-3">
                  <Avatar size="sm">SM</Avatar>
                  <Avatar size="md">MD</Avatar>
                  <Avatar size="lg">LG</Avatar>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Avatar color="primary">PR</Avatar>
<Avatar color="neutral">NE</Avatar>
<Avatar color="success">SU</Avatar>
<Avatar color="warning">WA</Avatar>
<Avatar color="danger">DA</Avatar>`}
                codeLanguage="tsx"
              >
                <div className="flex gap-3">
                  <Avatar color="primary">PR</Avatar>
                  <Avatar color="neutral">NE</Avatar>
                  <Avatar color="success">SU</Avatar>
                  <Avatar color="warning">WA</Avatar>
                  <Avatar color="danger">DA</Avatar>
                </div>
              </Section>

              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Avatar variant="solid" color="primary">PR</Avatar>
<Avatar variant="solid" color="neutral">NE</Avatar>
<Avatar variant="solid" color="success">SU</Avatar>
<Avatar variant="solid" color="warning">WA</Avatar>
<Avatar variant="solid" color="danger">DA</Avatar>

<Avatar variant="soft" color="primary">PR</Avatar>
<Avatar variant="soft" color="neutral">NE</Avatar>
<Avatar variant="soft" color="success">SU</Avatar>
<Avatar variant="soft" color="warning">WA</Avatar>
<Avatar variant="soft" color="danger">DA</Avatar>

<Avatar variant="outlined" color="primary">PR</Avatar>
<Avatar variant="outlined" color="neutral">NE</Avatar>
<Avatar variant="outlined" color="success">SU</Avatar>
<Avatar variant="outlined" color="warning">WA</Avatar>
<Avatar variant="outlined" color="danger">DA</Avatar>`}
                codeLanguage="tsx"
              >
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
              </Section>

              <Section
                title="AvatarGroup"
                titleLevel="h3"
                id="avatar-group"
                code={`<AvatarGroup>
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
</AvatarGroup>`}
                codeLanguage="tsx"
              >
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
              </Section>

              <Section
                title="AvatarGroup with Max"
                titleLevel="h3"
                id="avatar-group-max"
                code={`<AvatarGroup max={3}>
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
</AvatarGroup>`}
                codeLanguage="tsx"
              >
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
              </Section>

              <Section
                title="AvatarGroup Sizes"
                titleLevel="h3"
                id="avatar-group-sizes"
                code={`<AvatarGroup size="sm">
  <Avatar>AB</Avatar>
  <Avatar>CD</Avatar>
  <Avatar>EF</Avatar>
</AvatarGroup>

<AvatarGroup size="md">
  <Avatar>AB</Avatar>
  <Avatar>CD</Avatar>
  <Avatar>EF</Avatar>
</AvatarGroup>

<AvatarGroup size="lg">
  <Avatar>AB</Avatar>
  <Avatar>CD</Avatar>
  <Avatar>EF</Avatar>
</AvatarGroup>`}
                codeLanguage="tsx"
              >
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
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
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
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
