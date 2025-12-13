import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
  Button,
  Typography,
} from '@base-joy/ui-styled';
import { ComponentHeader } from '../../components/ComponentHeader';
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
import { TableOfContents } from '../../components/TableOfContents';
import { componentProps } from '../../props';
import type { Variant, ColorScale, Size } from '@base-joy/tokens';

const cardControls: PlaygroundControl[] = [
  { name: 'variant', type: 'variant', defaultValue: 'outlined' },
  { name: 'color', type: 'color', defaultValue: 'neutral' },
  { name: 'size', type: 'size', defaultValue: 'md' },
];

const cardCodeTemplate = (props: Record<string, string>) =>
  `<Card variant="${props.variant}" color="${props.color}" size="${props.size}">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Card body content goes here.
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`;

const mediaProps: PropMeta[] = [
  {
    name: 'src',
    type: 'string',
    description: 'The source URL for the image or video.',
    required: true,
  },
  {
    name: 'alt',
    type: 'string',
    description: 'Alternative text for images (required for accessibility).',
    required: false,
  },
  {
    name: 'as',
    type: '"img" | "video"',
    defaultValue: '"img"',
    description: 'The element type to render as.',
    required: false,
  },
];

const sections = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'basic-card', title: 'Basic Card', level: 3 },
  { id: 'card-with-footer', title: 'Card with Footer', level: 3 },
  { id: 'card-with-media', title: 'Card with Media', level: 3 },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'sizes', title: 'Sizes', level: 3 },
  { id: 'horizontal-layout', title: 'Horizontal Layout', level: 3 },
  { id: 'api', title: 'API Reference' },
  { id: 'api-card', title: 'Card', level: 3 },
  { id: 'api-card-header', title: 'CardHeader', level: 3 },
  { id: 'api-card-title', title: 'CardTitle', level: 3 },
  { id: 'api-card-description', title: 'CardDescription', level: 3 },
  { id: 'api-card-content', title: 'CardContent', level: 3 },
  { id: 'api-card-footer', title: 'CardFooter', level: 3 },
  { id: 'api-card-media', title: 'CardMedia', level: 3 },
];

export function CardPage() {
  return (
    <div>
      <ComponentHeader
        title="Card"
        description="A flexible card component with header, content, footer, and media sections. Built on Sheet for consistent styling."
      />
      <div className="flex gap-8">
        <div className="flex-1">
          <Section title="Playground" id="playground">
            <Playground controls={cardControls} codeTemplate={cardCodeTemplate}>
              {(props) => (
                <Card
                  variant={props.variant as Variant}
                  color={props.color as ColorScale}
                  size={props.size as Size}
                >
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    This is the main content area of the card. You can put any content here,
                    including text, images, or other components.
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>
              )}
            </Playground>
          </Section>

          <Section title="Examples" id="examples">
            <div className="space-y-8">
              <Section
                title="Basic Card"
                titleLevel="h3"
                id="basic-card"
                code={`<Card variant="outlined" className="max-w-md">
  <CardHeader>
    <CardTitle>Simple Card</CardTitle>
    <CardDescription>A basic card with title and content</CardDescription>
  </CardHeader>
  <CardContent>
    This is a simple card with just a header and content section. Perfect for
    displaying basic information.
  </CardContent>
</Card>`}
                codeLanguage="tsx"
              >
                <Card variant="outlined" className="max-w-md">
                  <CardHeader>
                    <CardTitle>Simple Card</CardTitle>
                    <CardDescription>A basic card with title and content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    This is a simple card with just a header and content section. Perfect for
                    displaying basic information.
                  </CardContent>
                </Card>
              </Section>

              <Section
                title="Card with Footer"
                titleLevel="h3"
                id="card-with-footer"
                code={`<Card variant="outlined" className="max-w-md">
  <CardHeader>
    <CardTitle>Product Card</CardTitle>
    <CardDescription>Premium wireless headphones</CardDescription>
  </CardHeader>
  <CardContent>
    High-quality sound with active noise cancellation. Up to 30 hours of battery life.
  </CardContent>
  <CardFooter>
    <Button size="sm" variant="solid" color="primary">
      Add to Cart
    </Button>
  </CardFooter>
</Card>`}
                codeLanguage="tsx"
              >
                <Card variant="outlined" className="max-w-md">
                  <CardHeader>
                    <CardTitle>Product Card</CardTitle>
                    <CardDescription>Premium wireless headphones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    High-quality sound with active noise cancellation. Up to 30 hours of battery life.
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="solid" color="primary">
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </Section>

              <Section
                title="Card with Media"
                titleLevel="h3"
                id="card-with-media"
                code={`<Card variant="outlined" className="max-w-md">
  <CardMedia
    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format"
    alt="Headphones"
  />
  <CardHeader>
    <CardTitle>Premium Headphones</CardTitle>
    <CardDescription>Studio-quality audio</CardDescription>
  </CardHeader>
  <CardContent>
    Experience crystal-clear sound with our latest wireless headphones.
  </CardContent>
  <CardFooter>
    <Button size="sm">Learn More</Button>
  </CardFooter>
</Card>`}
                codeLanguage="tsx"
              >
                <Card variant="outlined" className="max-w-md">
                  <CardMedia
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format"
                    alt="Headphones"
                  />
                  <CardHeader>
                    <CardTitle>Premium Headphones</CardTitle>
                    <CardDescription>Studio-quality audio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    Experience crystal-clear sound with our latest wireless headphones.
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Learn More</Button>
                  </CardFooter>
                </Card>
              </Section>

              <Section
                title="Variants"
                titleLevel="h3"
                id="variants"
                code={`<Card variant="solid">
  <CardHeader>
    <CardTitle>Solid</CardTitle>
    <CardDescription>Bold background</CardDescription>
  </CardHeader>
  <CardContent>Card with solid background</CardContent>
</Card>

<Card variant="soft">
  <CardHeader>
    <CardTitle>Soft</CardTitle>
    <CardDescription>Subtle background</CardDescription>
  </CardHeader>
  <CardContent>Card with soft background color</CardContent>
</Card>

<Card variant="outlined">
  <CardHeader>
    <CardTitle>Outlined</CardTitle>
    <CardDescription>Default variant</CardDescription>
  </CardHeader>
  <CardContent>Card with outlined border</CardContent>
</Card>

<Card variant="plain">
  <CardHeader>
    <CardTitle>Plain</CardTitle>
    <CardDescription>Minimal styling</CardDescription>
  </CardHeader>
  <CardContent>Card with minimal styling</CardContent>
</Card>`}
                codeLanguage="tsx"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card variant="solid">
                    <CardHeader>
                      <CardTitle>Solid</CardTitle>
                      <CardDescription>Bold background</CardDescription>
                    </CardHeader>
                    <CardContent>Card with solid background</CardContent>
                  </Card>

                  <Card variant="soft">
                    <CardHeader>
                      <CardTitle>Soft</CardTitle>
                      <CardDescription>Subtle background</CardDescription>
                    </CardHeader>
                    <CardContent>Card with soft background color</CardContent>
                  </Card>

                  <Card variant="outlined">
                    <CardHeader>
                      <CardTitle>Outlined</CardTitle>
                      <CardDescription>Default variant</CardDescription>
                    </CardHeader>
                    <CardContent>Card with outlined border</CardContent>
                  </Card>

                  <Card variant="plain">
                    <CardHeader>
                      <CardTitle>Plain</CardTitle>
                      <CardDescription>Minimal styling</CardDescription>
                    </CardHeader>
                    <CardContent>Card with minimal styling</CardContent>
                  </Card>
                </div>
              </Section>

              <Section
                title="Colors"
                titleLevel="h3"
                id="colors"
                code={`<Card variant="soft" color="primary">
  <CardHeader>
    <CardTitle>Primary</CardTitle>
  </CardHeader>
  <CardContent>Primary color card</CardContent>
</Card>

<Card variant="soft" color="neutral">
  <CardHeader>
    <CardTitle>Neutral</CardTitle>
  </CardHeader>
  <CardContent>Neutral color card</CardContent>
</Card>

<Card variant="soft" color="success">
  <CardHeader>
    <CardTitle>Success</CardTitle>
  </CardHeader>
  <CardContent>Success color card</CardContent>
</Card>

<Card variant="soft" color="warning">
  <CardHeader>
    <CardTitle>Warning</CardTitle>
  </CardHeader>
  <CardContent>Warning color card</CardContent>
</Card>

<Card variant="soft" color="danger">
  <CardHeader>
    <CardTitle>Danger</CardTitle>
  </CardHeader>
  <CardContent>Danger color card</CardContent>
</Card>`}
                codeLanguage="tsx"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card variant="soft" color="primary">
                    <CardHeader>
                      <CardTitle>Primary</CardTitle>
                    </CardHeader>
                    <CardContent>Primary color card</CardContent>
                  </Card>

                  <Card variant="soft" color="neutral">
                    <CardHeader>
                      <CardTitle>Neutral</CardTitle>
                    </CardHeader>
                    <CardContent>Neutral color card</CardContent>
                  </Card>

                  <Card variant="soft" color="success">
                    <CardHeader>
                      <CardTitle>Success</CardTitle>
                    </CardHeader>
                    <CardContent>Success color card</CardContent>
                  </Card>

                  <Card variant="soft" color="warning">
                    <CardHeader>
                      <CardTitle>Warning</CardTitle>
                    </CardHeader>
                    <CardContent>Warning color card</CardContent>
                  </Card>

                  <Card variant="soft" color="danger">
                    <CardHeader>
                      <CardTitle>Danger</CardTitle>
                    </CardHeader>
                    <CardContent>Danger color card</CardContent>
                  </Card>
                </div>
              </Section>

              <Section
                title="Sizes"
                titleLevel="h3"
                id="sizes"
                code={`<Card variant="outlined" size="sm" className="max-w-md">
  <CardHeader>
    <CardTitle>Small Card</CardTitle>
    <CardDescription>Compact padding</CardDescription>
  </CardHeader>
  <CardContent>This card has small padding for compact layouts.</CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>

<Card variant="outlined" size="md" className="max-w-md">
  <CardHeader>
    <CardTitle>Medium Card</CardTitle>
    <CardDescription>Default padding</CardDescription>
  </CardHeader>
  <CardContent>This card has medium padding (default size).</CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>

<Card variant="outlined" size="lg" className="max-w-md">
  <CardHeader>
    <CardTitle>Large Card</CardTitle>
    <CardDescription>Spacious padding</CardDescription>
  </CardHeader>
  <CardContent>This card has large padding for more breathing room.</CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>`}
                codeLanguage="tsx"
              >
                <div className="space-y-4">
                  <Card variant="outlined" size="sm" className="max-w-md">
                    <CardHeader>
                      <CardTitle>Small Card</CardTitle>
                      <CardDescription>Compact padding</CardDescription>
                    </CardHeader>
                    <CardContent>This card has small padding for compact layouts.</CardContent>
                    <CardFooter>
                      <Button size="sm">Action</Button>
                    </CardFooter>
                  </Card>

                  <Card variant="outlined" size="md" className="max-w-md">
                    <CardHeader>
                      <CardTitle>Medium Card</CardTitle>
                      <CardDescription>Default padding</CardDescription>
                    </CardHeader>
                    <CardContent>This card has medium padding (default size).</CardContent>
                    <CardFooter>
                      <Button size="sm">Action</Button>
                    </CardFooter>
                  </Card>

                  <Card variant="outlined" size="lg" className="max-w-md">
                    <CardHeader>
                      <CardTitle>Large Card</CardTitle>
                      <CardDescription>Spacious padding</CardDescription>
                    </CardHeader>
                    <CardContent>This card has large padding for more breathing room.</CardContent>
                    <CardFooter>
                      <Button size="sm">Action</Button>
                    </CardFooter>
                  </Card>
                </div>
              </Section>

              <Section
                title="Horizontal Layout"
                titleLevel="h3"
                id="horizontal-layout"
                code={`<Card variant="outlined" className="max-w-2xl">
  <div className="flex flex-col md:flex-row">
    <CardMedia
      src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=400&auto=format"
      alt="Product"
      className="md:w-48 md:max-h-none"
    />
    <div className="flex-1">
      <CardHeader>
        <CardTitle>Wireless Speaker</CardTitle>
        <CardDescription>360-degree sound</CardDescription>
      </CardHeader>
      <CardContent>
        Portable Bluetooth speaker with rich, room-filling sound. Waterproof design
        perfect for any adventure.
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="solid" color="primary">
          Buy Now
        </Button>
        <Button size="sm" variant="outlined" color="neutral" className="ml-2">
          Details
        </Button>
      </CardFooter>
    </div>
  </div>
</Card>`}
                codeLanguage="tsx"
              >
                <Card variant="outlined" className="max-w-2xl">
                  <div className="flex flex-col md:flex-row">
                    <CardMedia
                      src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=400&auto=format"
                      alt="Product"
                      className="md:w-48 md:max-h-none"
                    />
                    <div className="flex-1">
                      <CardHeader>
                        <CardTitle>Wireless Speaker</CardTitle>
                        <CardDescription>360-degree sound</CardDescription>
                      </CardHeader>
                      <CardContent>
                        Portable Bluetooth speaker with rich, room-filling sound. Waterproof design
                        perfect for any adventure.
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" variant="solid" color="primary">
                          Buy Now
                        </Button>
                        <Button size="sm" variant="outlined" color="neutral" className="ml-2">
                          Details
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </Section>
            </div>
          </Section>

          <Section title="API Reference" id="api">
            <div className="space-y-8">
              <div>
                <Typography level="h3" id="api-card">
                  Card
                </Typography>
                <PropsTable props={componentProps.Card} />
              </div>
              <div>
                <Typography level="h3" id="api-card-header">
                  CardHeader
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Container for card title and description with consistent padding.
                </Typography>
                <PropsTable
                  props={[
                    {
                      name: 'className',
                      type: 'string',
                      description: 'Additional CSS classes to apply.',
                      required: false,
                    },
                  ]}
                />
              </div>
              <div>
                <Typography level="h3" id="api-card-title">
                  CardTitle
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Renders as an h3 heading with bold styling.
                </Typography>
                <PropsTable
                  props={[
                    {
                      name: 'className',
                      type: 'string',
                      description: 'Additional CSS classes to apply.',
                      required: false,
                    },
                  ]}
                />
              </div>
              <div>
                <Typography level="h3" id="api-card-description">
                  CardDescription
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Secondary text rendered with muted color styling.
                </Typography>
                <PropsTable
                  props={[
                    {
                      name: 'className',
                      type: 'string',
                      description: 'Additional CSS classes to apply.',
                      required: false,
                    },
                  ]}
                />
              </div>
              <div>
                <Typography level="h3" id="api-card-content">
                  CardContent
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Main content area with appropriate padding.
                </Typography>
                <PropsTable
                  props={[
                    {
                      name: 'className',
                      type: 'string',
                      description: 'Additional CSS classes to apply.',
                      required: false,
                    },
                  ]}
                />
              </div>
              <div>
                <Typography level="h3" id="api-card-footer">
                  CardFooter
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Footer section with top border, typically used for actions.
                </Typography>
                <PropsTable
                  props={[
                    {
                      name: 'className',
                      type: 'string',
                      description: 'Additional CSS classes to apply.',
                      required: false,
                    },
                  ]}
                />
              </div>
              <div>
                <Typography level="h3" id="api-card-media">
                  CardMedia
                </Typography>
                <Typography level="body-sm" className="mb-4">
                  Full-width image or video container.
                </Typography>
                <PropsTable props={mediaProps} />
              </div>
            </div>
          </Section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
