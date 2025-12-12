import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorScaleEditor } from './ColorScaleEditor';
import { defaultTheme } from '@base-joy/tokens';

describe('ColorScaleEditor', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    label: 'Primary Color',
    scale: defaultTheme.colors.primary,
    baseColor: '#3b82f6',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with label', () => {
    render(<ColorScaleEditor {...defaultProps} />);
    expect(screen.getByText('Primary Color')).toBeInTheDocument();
  });

  it('renders base color label', () => {
    render(<ColorScaleEditor {...defaultProps} />);
    expect(screen.getByText('Base Color (500)')).toBeInTheDocument();
  });

  it('displays color input with correct value', () => {
    const { container } = render(<ColorScaleEditor {...defaultProps} />);
    const colorInput = container.querySelector('input[type="color"]') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
    expect(colorInput.value).toBe('#3b82f6');
  });

  it('displays text input with hex value', () => {
    render(<ColorScaleEditor {...defaultProps} />);
    const textInput = screen.getByPlaceholderText('#3b82f6');
    expect(textInput).toBeInTheDocument();
    expect(textInput).toHaveValue('#3b82f6');
  });

  it('renders Apply button', () => {
    render(<ColorScaleEditor {...defaultProps} />);
    expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
  });

  it('renders color scale preview', () => {
    render(<ColorScaleEditor {...defaultProps} />);

    const shades = Object.entries(defaultTheme.colors.primary);
    shades.forEach(([shade, hex]) => {
      const previewElement = screen.getByTitle(`${shade}: ${hex}`);
      expect(previewElement).toBeInTheDocument();
      expect(previewElement).toHaveStyle({ backgroundColor: hex });
    });
  });

  it('updates local color when color input changes', async () => {
    const user = userEvent.setup();
    const { container } = render(<ColorScaleEditor {...defaultProps} />);

    const colorInput = container.querySelector('input[type="color"]') as HTMLInputElement;
    await user.click(colorInput);
    await user.keyboard('{Backspace>7/}#ff0000');

    expect(colorInput.value).toBe('#ff0000');
  });

  it('updates local color when text input changes', async () => {
    const user = userEvent.setup();
    render(<ColorScaleEditor {...defaultProps} />);

    const textInput = screen.getByPlaceholderText('#3b82f6') as HTMLInputElement;

    await user.clear(textInput);
    await user.type(textInput, '#00ff00');

    expect(textInput.value).toBe('#00ff00');
  });

  it('calls onChange with new color when Apply is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorScaleEditor {...defaultProps} />);

    const textInput = screen.getByPlaceholderText('#3b82f6') as HTMLInputElement;

    await user.clear(textInput);
    await user.type(textInput, '#ff0000');
    await user.click(screen.getByRole('button', { name: /apply/i }));

    expect(mockOnChange).toHaveBeenCalledWith('#ff0000');
  });

  it('applies color when Apply button is clicked', async () => {
    const user = userEvent.setup();
    render(<ColorScaleEditor {...defaultProps} />);

    const textInput = screen.getByPlaceholderText('#3b82f6') as HTMLInputElement;
    await user.clear(textInput);
    await user.type(textInput, '#00ff00');
    await user.click(screen.getByRole('button', { name: /apply/i }));

    expect(mockOnChange).toHaveBeenCalledWith('#00ff00');
  });

  it('renders all 11 color shades in preview', () => {
    render(<ColorScaleEditor {...defaultProps} />);

    const expectedShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    expectedShades.forEach((shade) => {
      const hex = defaultTheme.colors.primary[shade as keyof typeof defaultTheme.colors.primary];
      expect(screen.getByTitle(`${shade}: ${hex}`)).toBeInTheDocument();
    });
  });

  it('applies correct styles to color preview elements', () => {
    const { container } = render(<ColorScaleEditor {...defaultProps} />);

    const previewContainer = container.querySelector('.flex.gap-1.mt-2');
    expect(previewContainer).toBeInTheDocument();

    const previewElements = previewContainer?.querySelectorAll('[title]');
    expect(previewElements).toHaveLength(11);

    previewElements?.forEach((element) => {
      expect(element).toHaveClass('flex-1', 'h-8', 'rounded');
    });
  });
});
