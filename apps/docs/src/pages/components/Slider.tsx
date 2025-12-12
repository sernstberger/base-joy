import { Slider, Typography } from '@base-joy/ui-core';
import { Section } from '../../components/Section';

export function SliderPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <Typography level="h1">Slider</Typography>
        <Typography level="body-lg">
          A slider component for selecting a value from a range.
        </Typography>
      </header>

      <Section title="Basic Usage">
        <div className="max-w-md">
          <Slider.Root defaultValue={50}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>
        </div>
      </Section>

      <Section title="With Value Display">
        <div className="max-w-md">
          <Slider.Root defaultValue={75}>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Volume</span>
              <Slider.Value />
            </div>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>
        </div>
      </Section>

      <Section title="Sizes">
        <div className="space-y-8 max-w-md">
          <div>
            <Typography level="body-sm" className="mb-2">Small</Typography>
            <Slider.Root size="sm" defaultValue={30}>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Indicator />
                </Slider.Track>
                <Slider.Thumb />
              </Slider.Control>
            </Slider.Root>
          </div>

          <div>
            <Typography level="body-sm" className="mb-2">Medium</Typography>
            <Slider.Root size="md" defaultValue={50}>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Indicator />
                </Slider.Track>
                <Slider.Thumb />
              </Slider.Control>
            </Slider.Root>
          </div>

          <div>
            <Typography level="body-sm" className="mb-2">Large</Typography>
            <Slider.Root size="lg" defaultValue={70}>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Indicator />
                </Slider.Track>
                <Slider.Thumb />
              </Slider.Control>
            </Slider.Root>
          </div>
        </div>
      </Section>

      <Section title="Colors">
        <div className="space-y-6 max-w-md">
          <Slider.Root color="primary" defaultValue={60}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>

          <Slider.Root color="success" defaultValue={60}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>

          <Slider.Root color="warning" defaultValue={60}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>

          <Slider.Root color="danger" defaultValue={60}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>
        </div>
      </Section>

      <Section title="Range Slider">
        <div className="max-w-md">
          <Slider.Root defaultValue={[25, 75]}>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Price Range</span>
              <Slider.Value />
            </div>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>
        </div>
      </Section>

      <Section title="Custom Range">
        <div className="max-w-md">
          <Slider.Root min={0} max={1000} step={50} defaultValue={500}>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Budget</span>
              <Slider.Value />
            </div>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>
        </div>
      </Section>

      <Section title="Disabled">
        <div className="max-w-md">
          <Slider.Root disabled defaultValue={50}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>
        </div>
      </Section>
    </div>
  );
}
