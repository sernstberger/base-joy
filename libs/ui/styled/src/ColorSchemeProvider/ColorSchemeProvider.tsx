import * as React from 'react';
import type { ColorScheme, ResolvedColorScheme } from '@base-joy/tokens';

const COLOR_SCHEME_STORAGE_KEY = 'base-joy-color-scheme';

export interface ColorSchemeContextValue {
  /**
   * Current color scheme setting.
   * - 'light': Force light mode
   * - 'dark': Force dark mode
   * - 'system': Follow OS/browser preference
   */
  colorScheme: ColorScheme;

  /**
   * Resolved color scheme after applying system preference.
   * Always 'light' or 'dark', never 'system'.
   */
  resolvedColorScheme: ResolvedColorScheme;

  /**
   * Update the color scheme.
   * Changes are persisted to localStorage.
   */
  setColorScheme: (scheme: ColorScheme) => void;
}

const ColorSchemeContext = React.createContext<
  ColorSchemeContextValue | undefined
>(undefined);

export interface ColorSchemeProviderProps {
  /**
   * Default color scheme to use.
   * @default 'system'
   */
  defaultColorScheme?: ColorScheme;

  /**
   * Children components that will have access to color scheme context.
   */
  children: React.ReactNode;
}

/**
 * Get system color scheme preference via media query
 */
function getSystemColorScheme(): ResolvedColorScheme {
  if (typeof window === 'undefined') {
    return 'light'; // SSR fallback
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Resolve color scheme to actual scheme ('light' or 'dark')
 */
function resolveColorScheme(scheme: ColorScheme): ResolvedColorScheme {
  if (scheme === 'system') {
    return getSystemColorScheme();
  }
  return scheme;
}

/**
 * Load color scheme from localStorage (client-side only)
 */
function loadColorSchemeFromStorage(): ColorScheme | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
    if (stored && (stored === 'light' || stored === 'dark' || stored === 'system')) {
      return stored as ColorScheme;
    }
  } catch (error) {
    console.warn('Failed to load color scheme from localStorage:', error);
  }

  return null;
}

/**
 * Save color scheme to localStorage (client-side only)
 */
function saveColorSchemeToStorage(scheme: ColorScheme): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, scheme);
  } catch (error) {
    console.warn('Failed to save color scheme to localStorage:', error);
  }
}

/**
 * ColorSchemeProvider manages color scheme state and applies it to the document.
 *
 * Features:
 * - System preference detection via prefers-color-scheme
 * - localStorage persistence
 * - Automatic data-color-scheme attribute management
 * - SSR-safe
 *
 * @example
 * ```tsx
 * import { ColorSchemeProvider } from '@base-joy/ui-styled';
 *
 * function App() {
 *   return (
 *     <ColorSchemeProvider>
 *       <YourApp />
 *     </ColorSchemeProvider>
 *   );
 * }
 * ```
 *
 * @example
 * With default color scheme
 * ```tsx
 * <ColorSchemeProvider defaultColorScheme="dark">
 *   <App />
 * </ColorSchemeProvider>
 * ```
 */
export function ColorSchemeProvider({
  defaultColorScheme = 'system',
  children,
}: ColorSchemeProviderProps) {
  const [colorScheme, setColorSchemeState] = React.useState<ColorScheme>(() => {
    const stored = loadColorSchemeFromStorage();
    return stored || defaultColorScheme;
  });

  const [resolvedColorScheme, setResolvedColorScheme] =
    React.useState<ResolvedColorScheme>(() => resolveColorScheme(colorScheme));

  // Track mounted state for SSR safety
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Apply data-color-scheme attribute to document
  React.useEffect(() => {
    if (!mounted || typeof document === 'undefined') {
      return;
    }

    document.documentElement.setAttribute(
      'data-color-scheme',
      resolvedColorScheme
    );
  }, [mounted, resolvedColorScheme]);

  // Listen for system preference changes
  React.useEffect(() => {
    if (typeof window === 'undefined' || colorScheme !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setResolvedColorScheme(event.matches ? 'dark' : 'light');
    };

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [colorScheme]);

  // Update resolved scheme when color scheme changes
  React.useEffect(() => {
    setResolvedColorScheme(resolveColorScheme(colorScheme));
  }, [colorScheme]);

  const setColorScheme = React.useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme);
    saveColorSchemeToStorage(scheme);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      colorScheme,
      resolvedColorScheme,
      setColorScheme,
    }),
    [colorScheme, resolvedColorScheme, setColorScheme]
  );

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export { ColorSchemeContext };
