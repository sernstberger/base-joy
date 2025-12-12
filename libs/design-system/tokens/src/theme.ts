import { colors } from './colors';
import { fontSizes, lineHeights, fontFamilies } from './typography';

/**
 * Color scale with 11 shades (50-950)
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Typography tokens for font sizes, line heights, and font families
 */
export interface TypographyTokens {
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  lineHeights: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontFamilies: {
    sans: string;
    mono: string;
  };
}

/**
 * Theme configuration for base-joy design system.
 *
 * A theme provides a complete set of design tokens including colors
 * and typography. Use the ThemeProvider to apply a custom theme to
 * your application.
 *
 * @example
 * ```tsx
 * import { ThemeProvider, defaultTheme } from '@base-joy/ui-styled';
 *
 * const customTheme = {
 *   colors: {
 *     ...defaultTheme.colors,
 *     primary: {
 *       // Custom primary color scale
 *       50: '#f0f9ff',
 *       // ...
 *     },
 *   },
 * };
 *
 * <ThemeProvider theme={customTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export interface Theme {
  colors: {
    primary: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    danger: ColorScale;
  };
  typography: TypographyTokens;
}

/**
 * Default theme using the base-joy design tokens.
 *
 * This theme matches the default styling of all components when
 * no ThemeProvider is used.
 */
export const defaultTheme: Theme = {
  colors: {
    primary: colors.primary,
    neutral: colors.neutral,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  },
  typography: {
    fontSizes: { ...fontSizes },
    lineHeights: { ...lineHeights },
    fontFamilies: { ...fontFamilies },
  },
};

export type ThemeColorScale = keyof Theme['colors'];
