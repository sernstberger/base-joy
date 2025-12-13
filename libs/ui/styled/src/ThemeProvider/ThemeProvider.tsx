import * as React from 'react';
import { defaultTheme, type Theme } from '@base-joy/tokens';
import { ColorSchemeProvider } from '../ColorSchemeProvider';

const THEME_STORAGE_KEY = 'base-joy-theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Partial<Theme>) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

export interface ThemeProviderProps {
  /**
   * Custom theme configuration. Partial theme objects will be deep merged
   * with the default theme.
   */
  theme?: Partial<Theme>;
  /**
   * Child components that will have access to the theme context.
   */
  children: React.ReactNode;
}

/**
 * Deep merge utility for theme objects
 */
function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(
        target[key] || ({} as any),
        source[key] as any
      );
    } else if (source[key] !== undefined) {
      result[key] = source[key] as any;
    }
  }

  return result;
}

/**
 * Load theme from localStorage (client-side only)
 */
function loadThemeFromStorage(): Partial<Theme> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load theme from localStorage:', error);
  }

  return null;
}

/**
 * Save theme to localStorage (client-side only)
 */
function saveThemeToStorage(theme: Theme): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
}

/**
 * ThemeProvider component that applies theme configuration to the application.
 *
 * The provider updates CSS custom properties on the document root element,
 * enabling all components to use the theme colors and typography via Tailwind
 * utility classes.
 *
 * Theme changes are automatically persisted to localStorage and restored on
 * subsequent page loads.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@base-joy/ui-styled';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * @example
 * Custom theme
 * ```tsx
 * import { ThemeProvider, defaultTheme } from '@base-joy/ui-styled';
 *
 * const customTheme = {
 *   colors: {
 *     ...defaultTheme.colors,
 *     primary: {
 *       50: '#f0f9ff',
 *       100: '#e0f2fe',
 *       // ... other shades
 *       950: '#082f49',
 *     },
 *   },
 * };
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={customTheme}>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ theme: customTheme, children }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    const storedTheme = loadThemeFromStorage();
    const initialTheme = customTheme || storedTheme || {};
    return deepMerge(defaultTheme, initialTheme);
  });

  const setTheme = React.useCallback((partialTheme: Partial<Theme>) => {
    setThemeState((prevTheme) => deepMerge(prevTheme, partialTheme));
  }, []);

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;

    // NOTE: Color variables are NOT set here because they are controlled by
    // the [data-color-scheme] attribute in base.css. Setting them as inline
    // styles would override the CSS cascade and break dark mode.
    // Only typography variables are set here for theme customization.

    Object.entries(theme.typography.fontSizes).forEach(([name, value]) => {
      root.style.setProperty(`--font-size-${name}`, value);
    });

    Object.entries(theme.typography.lineHeights).forEach(([name, value]) => {
      root.style.setProperty(`--line-height-${name}`, value);
    });

    Object.entries(theme.typography.fontFamilies).forEach(([name, value]) => {
      root.style.setProperty(`--font-family-${name}`, value);
    });
  }, [theme]);

  React.useEffect(() => {
    saveThemeToStorage(theme);
  }, [theme]);

  const contextValue = React.useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ColorSchemeProvider defaultColorScheme={theme.colorScheme}>
        {children}
      </ColorSchemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
