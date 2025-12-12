import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Slider } from './Slider';

describe('Slider', () => {
  describe('rendering', () => {
    it('renders correctly', () => {
      render(
        <Slider.Root defaultValue={50}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
            </Slider.Track>
            <Slider.Thumb />
          </Slider.Control>
        </Slider.Root>
      );

      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('renders with value display', () => {
      render(
        <Slider.Root defaultValue={50}>
          <Slider.Value />
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
            </Slider.Track>
            <Slider.Thumb />
          </Slider.Control>
        </Slider.Root>
      );

      expect(screen.getByRole('slider')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Slider.Root size={size} defaultValue={50} data-testid="slider">
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
            </Slider.Track>
            <Slider.Thumb />
          </Slider.Control>
        </Slider.Root>
      );

      expect(screen.getByTestId('slider')).toBeInTheDocument();
    });
  });

  describe('colors', () => {
    it.each(['primary', 'success', 'warning', 'danger', 'neutral'] as const)(
      'renders %s color',
      (color) => {
        render(
          <Slider.Root color={color} defaultValue={50} data-testid="slider">
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>
        );

        expect(screen.getByTestId('slider')).toBeInTheDocument();
      }
    );
  });

  describe('orientation', () => {
    it('renders horizontal orientation', () => {
      render(
        <Slider.Root orientation="horizontal" defaultValue={50} data-testid="slider">
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
            </Slider.Track>
            <Slider.Thumb />
          </Slider.Control>
        </Slider.Root>
      );

      expect(screen.getByTestId('slider')).toHaveClass('items-center');
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <Slider.Root defaultValue={50} className="custom-class" data-testid="slider">
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
            </Slider.Track>
            <Slider.Thumb />
          </Slider.Control>
        </Slider.Root>
      );

      expect(screen.getByTestId('slider')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Slider.Root defaultValue={50}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Indicator />
            </Slider.Track>
            <Slider.Thumb aria-label="Volume" />
          </Slider.Control>
        </Slider.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
