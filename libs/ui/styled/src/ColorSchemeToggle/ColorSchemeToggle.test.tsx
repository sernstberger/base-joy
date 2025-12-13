import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { ColorSchemeProvider } from '../ColorSchemeProvider';

describe('ColorSchemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-color-scheme');

    global.matchMedia = vi.fn((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-color-scheme');
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <ColorSchemeProvider>
        <ColorSchemeToggle />
      </ColorSchemeProvider>
    );

    expect(screen.getByLabelText('Light mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Dark mode')).toBeInTheDocument();
    expect(screen.getByLabelText('System mode')).toBeInTheDocument();
  });

  it('throws error when used outside ColorSchemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<ColorSchemeToggle />);
    }).toThrow('useColorScheme must be used within a ColorSchemeProvider');

    spy.mockRestore();
  });

  it('renders with custom variant', () => {
    render(
      <ColorSchemeProvider>
        <ColorSchemeToggle variant="outlined" />
      </ColorSchemeProvider>
    );

    const lightButton = screen.getByLabelText('Light mode');
    expect(lightButton).toHaveClass('border-neutral-300');
  });

  it('renders with custom color', () => {
    render(
      <ColorSchemeProvider>
        <ColorSchemeToggle variant="soft" color="primary" />
      </ColorSchemeProvider>
    );

    const lightButton = screen.getByLabelText('Light mode');
    expect(lightButton).toHaveClass('bg-primary-100');
  });

  it('renders with custom size', () => {
    render(
      <ColorSchemeProvider>
        <ColorSchemeToggle size="lg" />
      </ColorSchemeProvider>
    );

    const lightButton = screen.getByLabelText('Light mode');
    expect(lightButton).toHaveClass('h-12');
  });

  it('hides system option when showSystemOption is false', () => {
    render(
      <ColorSchemeProvider>
        <ColorSchemeToggle showSystemOption={false} />
      </ColorSchemeProvider>
    );

    expect(screen.getByLabelText('Light mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Dark mode')).toBeInTheDocument();
    expect(screen.queryByLabelText('System mode')).not.toBeInTheDocument();
  });

  it('switches to light mode when light button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ColorSchemeProvider defaultColorScheme="dark">
        <ColorSchemeToggle />
      </ColorSchemeProvider>
    );

    await user.click(screen.getByLabelText('Light mode'));

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-color-scheme')).toBe('light');
    });
  });

  it('switches to dark mode when dark button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ColorSchemeProvider defaultColorScheme="light">
        <ColorSchemeToggle />
      </ColorSchemeProvider>
    );

    await user.click(screen.getByLabelText('Dark mode'));

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-color-scheme')).toBe('dark');
    });
  });

  it('switches to system mode when system button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ColorSchemeProvider defaultColorScheme="light">
        <ColorSchemeToggle />
      </ColorSchemeProvider>
    );

    await user.click(screen.getByLabelText('System mode'));

    await waitFor(() => {
      const attribute = document.documentElement.getAttribute('data-color-scheme');
      expect(['light', 'dark']).toContain(attribute);
    });
  });

  it('persists color scheme to localStorage', async () => {
    const user = userEvent.setup();

    render(
      <ColorSchemeProvider>
        <ColorSchemeToggle />
      </ColorSchemeProvider>
    );

    await user.click(screen.getByLabelText('Dark mode'));

    await waitFor(() => {
      expect(localStorage.getItem('base-joy-color-scheme')).toBe('dark');
    });
  });

  it('reflects current color scheme state', async () => {
    const user = userEvent.setup();

    render(
      <ColorSchemeProvider defaultColorScheme="light">
        <ColorSchemeToggle />
      </ColorSchemeProvider>
    );

    const lightButton = screen.getByLabelText('Light mode');
    const darkButton = screen.getByLabelText('Dark mode');

    expect(lightButton).toHaveAttribute('data-pressed');
    expect(darkButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(darkButton);

    await waitFor(() => {
      expect(lightButton).toHaveAttribute('aria-pressed', 'false');
      expect(darkButton).toHaveAttribute('data-pressed');
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <ColorSchemeProvider>
        <ColorSchemeToggle className="custom-class" />
      </ColorSchemeProvider>
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('forwards ref to the toggle group element', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <ColorSchemeProvider>
        <ColorSchemeToggle ref={ref} />
      </ColorSchemeProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has accessible labels for all buttons', () => {
    render(
      <ColorSchemeProvider>
        <ColorSchemeToggle />
      </ColorSchemeProvider>
    );

    const lightButton = screen.getByLabelText('Light mode');
    const darkButton = screen.getByLabelText('Dark mode');
    const systemButton = screen.getByLabelText('System mode');

    expect(lightButton).toHaveAttribute('aria-label', 'Light mode');
    expect(darkButton).toHaveAttribute('aria-label', 'Dark mode');
    expect(systemButton).toHaveAttribute('aria-label', 'System mode');
  });

  it('handles rapid clicks without errors', async () => {
    const user = userEvent.setup();

    render(
      <ColorSchemeProvider>
        <ColorSchemeToggle />
      </ColorSchemeProvider>
    );

    const lightButton = screen.getByLabelText('Light mode');
    const darkButton = screen.getByLabelText('Dark mode');

    await user.click(lightButton);
    await user.click(darkButton);
    await user.click(lightButton);
    await user.click(darkButton);

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-color-scheme')).toBe('dark');
    });
  });
});
