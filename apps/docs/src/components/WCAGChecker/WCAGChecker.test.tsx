import { render, screen } from '@testing-library/react';
import { WCAGChecker } from './WCAGChecker';
import { defaultTheme } from '@base-joy/tokens';
import { generateColorScale } from '../../utils/colorScaleGenerator';

describe('WCAGChecker', () => {
  it('renders success message when theme is WCAG compliant', () => {
    const compliantTheme = {
      ...defaultTheme,
      colors: {
        primary: generateColorScale('#0c4a6e'),
        neutral: generateColorScale('#525252'),
        success: generateColorScale('#166534'),
        warning: generateColorScale('#92400e'),
        danger: generateColorScale('#991b1b'),
      },
    };

    render(<WCAGChecker theme={compliantTheme} />);

    expect(screen.getByText('WCAG Compliant')).toBeInTheDocument();
    expect(
      screen.getByText('All color combinations meet WCAG AA standards for contrast.')
    ).toBeInTheDocument();
  });

  it('renders warnings when theme has WCAG issues', () => {
    const badTheme = {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: generateColorScale('#ffff00'),
      },
    };

    render(<WCAGChecker theme={badTheme} />);

    expect(screen.queryByText('WCAG Compliant')).not.toBeInTheDocument();
    expect(screen.getByText(/primary/i)).toBeInTheDocument();
  });

  it('displays warning details for each issue', () => {
    const badTheme = {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: generateColorScale('#ffff00'),
      },
    };

    render(<WCAGChecker theme={badTheme} />);

    expect(screen.getByText(/primary \(solid\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/contrast ratio/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/WCAG AA/i)[0]).toBeInTheDocument();
  });

  it('displays recommendation for fixing issues', () => {
    const badTheme = {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: generateColorScale('#ffff00'),
      },
    };

    render(<WCAGChecker theme={badTheme} />);

    const recommendations = screen.getAllByText(/💡/);
    expect(recommendations.length).toBeGreaterThan(0);
  });

  it('renders multiple warnings when multiple scales fail', () => {
    const badTheme = {
      ...defaultTheme,
      colors: {
        primary: generateColorScale('#ffff00'),
        neutral: defaultTheme.colors.neutral,
        success: generateColorScale('#ffff00'),
        warning: defaultTheme.colors.warning,
        danger: defaultTheme.colors.danger,
      },
    };

    render(<WCAGChecker theme={badTheme} />);

    const scaleLabels = screen.getAllByText(/\(solid\)/i);
    expect(scaleLabels.length).toBeGreaterThan(1);
  });

  it('applies correct styling to success card', () => {
    const { container } = render(<WCAGChecker theme={defaultTheme} />);

    const successCard = container.querySelector('.p-4');
    expect(successCard).toBeInTheDocument();
    expect(successCard).toHaveClass('p-4');
  });

  it('applies correct styling to warning cards', () => {
    const badTheme = {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: generateColorScale('#ffff00'),
      },
    };

    const { container } = render(<WCAGChecker theme={badTheme} />);

    const warningCards = container.querySelectorAll('.p-4');
    expect(warningCards.length).toBeGreaterThan(0);
  });

  it('renders SVG icon for success state', () => {
    const compliantTheme = {
      ...defaultTheme,
      colors: {
        primary: generateColorScale('#0c4a6e'),
        neutral: generateColorScale('#525252'),
        success: generateColorScale('#166534'),
        warning: generateColorScale('#92400e'),
        danger: generateColorScale('#991b1b'),
      },
    };

    const { container} = render(<WCAGChecker theme={compliantTheme} />);

    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon?.querySelector('polyline')).toBeInTheDocument();
  });

  it('renders SVG icon for warning state', () => {
    const badTheme = {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: generateColorScale('#ffff00'),
      },
    };

    const { container } = render(<WCAGChecker theme={badTheme} />);

    const svgIcons = container.querySelectorAll('svg');
    expect(svgIcons.length).toBeGreaterThan(0);
    expect(svgIcons[0].querySelector('path')).toBeInTheDocument();
  });
});
