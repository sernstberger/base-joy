/**
 * Color scheme types for dark mode support.
 *
 * - 'light': Force light mode
 * - 'dark': Force dark mode
 * - 'system': Follow OS/browser preference via prefers-color-scheme
 */
export type ColorScheme = 'light' | 'dark' | 'system';

/**
 * Resolved color scheme after system preference is applied.
 * Always 'light' or 'dark', never 'system'.
 */
export type ResolvedColorScheme = 'light' | 'dark';
