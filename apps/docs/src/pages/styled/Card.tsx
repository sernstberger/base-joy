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
import { Playground, type PlaygroundControl } from '../../components/Playground';
import { PropsTable, type PropMeta } from '../../components/PropsTable';
import { Section } from '../../components/Section';
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

export function CardPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Card</Typography>
        <Typography level="body-lg">
          A flexible card component with header, content, footer, and media sections. Built on
          Sheet for consistent styling.
        </Typography>
      </header>

      <Section title="Playground">
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

      <Section title="Examples">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Basic Card</Typography>
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
          </div>

          <div>
            <Typography level="h3">Card with Footer</Typography>
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
          </div>

          <div>
            <Typography level="h3">Card with Media</Typography>
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
          </div>

          <div>
            <Typography level="h3">Variants</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Outlined</CardTitle>
                  <CardDescription>Default variant</CardDescription>
                </CardHeader>
                <CardContent>Card with outlined border</CardContent>
              </Card>

              <Card variant="soft">
                <CardHeader>
                  <CardTitle>Soft</CardTitle>
                  <CardDescription>Subtle background</CardDescription>
                </CardHeader>
                <CardContent>Card with soft background color</CardContent>
              </Card>

              <Card variant="solid">
                <CardHeader>
                  <CardTitle>Solid</CardTitle>
                  <CardDescription>Bold background</CardDescription>
                </CardHeader>
                <CardContent>Card with solid background</CardContent>
              </Card>

              <Card variant="plain">
                <CardHeader>
                  <CardTitle>Plain</CardTitle>
                  <CardDescription>Minimal styling</CardDescription>
                </CardHeader>
                <CardContent>Card with minimal styling</CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Typography level="h3">Colors</Typography>
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
          </div>

          <div>
            <Typography level="h3">Sizes</Typography>
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
          </div>

          <div>
            <Typography level="h3">Horizontal Layout</Typography>
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
          </div>
        </div>
      </Section>

      <Section title="API Reference">
        <div className="space-y-8">
          <div>
            <Typography level="h3">Card</Typography>
            <PropsTable props={componentProps.Card} />
          </div>
          <div>
            <Typography level="h3">CardHeader</Typography>
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
            <Typography level="h3">CardTitle</Typography>
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
            <Typography level="h3">CardDescription</Typography>
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
            <Typography level="h3">CardContent</Typography>
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
            <Typography level="h3">CardFooter</Typography>
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
            <Typography level="h3">CardMedia</Typography>
            <Typography level="body-sm" className="mb-4">
              Full-width image or video container.
            </Typography>
            <PropsTable props={mediaProps} />
          </div>
        </div>
      </Section>
    </div>
  );
}
