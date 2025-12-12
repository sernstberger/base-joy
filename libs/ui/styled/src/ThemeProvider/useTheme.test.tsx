import * as React from 'react';
import { render, screen, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';
import { defaultTheme } from '@base-joy/tokens';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.style.cssText = '';
  });

  it('throws error when used outside ThemeProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');

    spy.mockRestore();
  });

  it('returns theme and setTheme from context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBeDefined();
    expect(result.current.setTheme).toBeInstanceOf(Function);
    expect(result.current.theme.colors.primary).toEqual(defaultTheme.colors.primary);
  });

  it('provides access to theme colors', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme.colors.primary[500]).toBe(
      defaultTheme.colors.primary[500]
    );
    expect(result.current.theme.colors.neutral[900]).toBe(
      defaultTheme.colors.neutral[900]
    );
  });

  it('provides access to typography tokens', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme.typography.fontSizes.base).toBe(
      defaultTheme.typography.fontSizes.base
    );
    expect(result.current.theme.typography.lineHeights.lg).toBe(
      defaultTheme.typography.lineHeights.lg
    );
    expect(result.current.theme.typography.fontFamilies.mono).toBe(
      defaultTheme.typography.fontFamilies.mono
    );
  });

  it('allows updating theme via setTheme', async () => {
    function TestComponent() {
      const { theme, setTheme } = useTheme();

      return (
        <div>
          <div data-testid="color">{theme.colors.primary[500]}</div>
          <button
            onClick={() =>
              setTheme({
                colors: {
                  primary: {
                    50: '#new',
                    100: '#new',
                    200: '#new',
                    300: '#new',
                    400: '#new',
                    500: '#new-color',
                    600: '#new',
                    700: '#new',
                    800: '#new',
                    900: '#new',
                    950: '#new',
                  },
                },
              })
            }
          >
            Update
          </button>
        </div>
      );
    }

    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('color')).toHaveTextContent(
      defaultTheme.colors.primary[500]
    );

    await user.click(screen.getByRole('button', { name: /update/i }));

    expect(screen.getByTestId('color')).toHaveTextContent('#new-color');
  });

  it('merges partial theme updates with existing theme', async () => {
    function TestComponent() {
      const { theme, setTheme } = useTheme();

      return (
        <div>
          <div data-testid="primary">{theme.colors.primary[500]}</div>
          <div data-testid="neutral">{theme.colors.neutral[900]}</div>
          <button
            onClick={() =>
              setTheme({
                colors: {
                  primary: {
                    50: '#updated',
                    100: '#updated',
                    200: '#updated',
                    300: '#updated',
                    400: '#updated',
                    500: '#updated-primary',
                    600: '#updated',
                    700: '#updated',
                    800: '#updated',
                    900: '#updated',
                    950: '#updated',
                  },
                },
              })
            }
          >
            Update Primary
          </button>
        </div>
      );
    }

    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('primary')).toHaveTextContent(
      defaultTheme.colors.primary[500]
    );
    expect(screen.getByTestId('neutral')).toHaveTextContent(
      defaultTheme.colors.neutral[900]
    );

    await user.click(screen.getByRole('button', { name: /update primary/i }));

    expect(screen.getByTestId('primary')).toHaveTextContent('#updated-primary');
    expect(screen.getByTestId('neutral')).toHaveTextContent(
      defaultTheme.colors.neutral[900]
    );
  });
});
