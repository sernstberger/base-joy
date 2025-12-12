import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';
import { defaultTheme } from '@base-joy/tokens';

const THEME_STORAGE_KEY = 'base-joy-theme';

function TestComponent() {
  const { theme } = useTheme();
  return (
    <div>
      <div data-testid="primary-500">{theme.colors.primary[500]}</div>
      <div data-testid="font-size-base">{theme.typography.fontSizes.base}</div>
    </div>
  );
}

function ThemeUpdater() {
  const { setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme({
          colors: {
            primary: {
              50: '#custom',
              100: '#custom',
              200: '#custom',
              300: '#custom',
              400: '#custom',
              500: '#custom-primary',
              600: '#custom',
              700: '#custom',
              800: '#custom',
              900: '#custom',
              950: '#custom',
            },
          },
        })
      }
    >
      Update Theme
    </button>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.style.cssText = '';
  });

  it('renders children without crashing', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('provides default theme to children', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('primary-500')).toHaveTextContent(
      defaultTheme.colors.primary[500]
    );
    expect(screen.getByTestId('font-size-base')).toHaveTextContent(
      defaultTheme.typography.fontSizes.base
    );
  });

  it('applies default theme CSS variables on mount', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--color-primary-500')).toBe(
        defaultTheme.colors.primary[500]
      );
      expect(root.style.getPropertyValue('--color-neutral-900')).toBe(
        defaultTheme.colors.neutral[900]
      );
      expect(root.style.getPropertyValue('--font-size-base')).toBe(
        defaultTheme.typography.fontSizes.base
      );
    });
  });

  it('merges custom theme with defaults', () => {
    const customTheme = {
      colors: {
        primary: {
          50: '#custom',
          100: '#custom',
          200: '#custom',
          300: '#custom',
          400: '#custom',
          500: '#custom-primary',
          600: '#custom',
          700: '#custom',
          800: '#custom',
          900: '#custom',
          950: '#custom',
        },
      },
    };

    render(
      <ThemeProvider theme={customTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('primary-500')).toHaveTextContent('#custom-primary');
    expect(screen.getByTestId('font-size-base')).toHaveTextContent(
      defaultTheme.typography.fontSizes.base
    );
  });

  it('updates CSS variables when theme changes', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
        <ThemeUpdater />
      </ThemeProvider>
    );

    await user.click(screen.getByRole('button', { name: /update theme/i }));

    await waitFor(() => {
      expect(screen.getByTestId('primary-500')).toHaveTextContent('#custom-primary');
    });

    await waitFor(() => {
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--color-primary-500')).toBe('#custom-primary');
    });
  });

  it('persists theme to localStorage', async () => {
    const customTheme = {
      colors: {
        primary: {
          50: '#stored',
          100: '#stored',
          200: '#stored',
          300: '#stored',
          400: '#stored',
          500: '#stored-primary',
          600: '#stored',
          700: '#stored',
          800: '#stored',
          900: '#stored',
          950: '#stored',
        },
      },
    };

    render(
      <ThemeProvider theme={customTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.colors.primary[500]).toBe('#stored-primary');
    });
  });

  it('restores theme from localStorage on mount', async () => {
    const storedTheme = {
      colors: {
        primary: {
          50: '#restored',
          100: '#restored',
          200: '#restored',
          300: '#restored',
          400: '#restored',
          500: '#restored-primary',
          600: '#restored',
          700: '#restored',
          800: '#restored',
          900: '#restored',
          950: '#restored',
        },
        neutral: defaultTheme.colors.neutral,
        success: defaultTheme.colors.success,
        warning: defaultTheme.colors.warning,
        danger: defaultTheme.colors.danger,
      },
      typography: defaultTheme.typography,
    };

    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storedTheme));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('primary-500')).toHaveTextContent('#restored-primary');
    });
  });

  it('handles partial theme updates', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
        <ThemeUpdater />
      </ThemeProvider>
    );

    expect(screen.getByTestId('primary-500')).toHaveTextContent(
      defaultTheme.colors.primary[500]
    );

    await user.click(screen.getByRole('button', { name: /update theme/i }));

    await waitFor(() => {
      expect(screen.getByTestId('primary-500')).toHaveTextContent('#custom-primary');
      expect(screen.getByTestId('font-size-base')).toHaveTextContent(
        defaultTheme.typography.fontSizes.base
      );
    });
  });

  it('applies all color scale CSS variables', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      const root = document.documentElement;

      ['primary', 'neutral', 'success', 'warning', 'danger'].forEach((scale) => {
        ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].forEach(
          (shade) => {
            const value = root.style.getPropertyValue(`--color-${scale}-${shade}`);
            expect(value).toBeTruthy();
          }
        );
      });
    });
  });

  it('applies typography CSS variables', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      const root = document.documentElement;

      expect(root.style.getPropertyValue('--font-size-xs')).toBe(
        defaultTheme.typography.fontSizes.xs
      );
      expect(root.style.getPropertyValue('--line-height-base')).toBe(
        defaultTheme.typography.lineHeights.base
      );
      expect(root.style.getPropertyValue('--font-family-sans')).toBe(
        defaultTheme.typography.fontFamilies.sans
      );
    });
  });
});
