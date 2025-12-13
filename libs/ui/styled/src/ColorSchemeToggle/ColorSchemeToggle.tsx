import * as React from 'react';
import { ToggleGroup } from '../ToggleGroup';
import { Toggle } from '../Toggle';
import { useColorScheme } from '../ColorSchemeProvider';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

export interface ColorSchemeToggleProps {
  /**
   * The visual style of the toggle.
   * @default 'soft'
   */
  variant?: Variant;
  /**
   * The color scheme of the toggle.
   * @default 'neutral'
   */
  color?: ColorScale;
  /**
   * The size of the toggle.
   * @default 'md'
   */
  size?: Size;
  /**
   * Whether to show the system option.
   * @default true
   */
  showSystemOption?: boolean;
  /**
   * Additional CSS class names.
   */
  className?: string;
}

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.5 3.5l-1 1M4.5 11.5l-1 1M12.5 12.5l-1-1M4.5 4.5l-1-1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M13.5 8.5a5.5 5.5 0 01-7-7 5.5 5.5 0 107 7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MonitorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="1.5"
      y="2.5"
      width="13"
      height="9"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M5 14.5h6M8 11.5v3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * ColorSchemeToggle component for switching between light, dark, and system color schemes.
 *
 * This component provides a user interface for changing the application's color scheme.
 * It integrates with the ColorSchemeProvider and persists the user's preference.
 *
 * @example
 * ```tsx
 * import { ColorSchemeToggle } from '@base-joy/ui-styled';
 *
 * function Header() {
 *   return (
 *     <header>
 *       <ColorSchemeToggle />
 *     </header>
 *   );
 * }
 * ```
 *
 * @example
 * Custom styling
 * ```tsx
 * <ColorSchemeToggle
 *   variant="outlined"
 *   color="primary"
 *   size="lg"
 *   showSystemOption={false}
 * />
 * ```
 */
export const ColorSchemeToggle = React.forwardRef<
  HTMLDivElement,
  ColorSchemeToggleProps
>(
  (
    {
      variant = 'soft',
      color = 'neutral',
      size = 'md',
      showSystemOption = true,
      className,
    },
    ref
  ) => {
    const { colorScheme, setColorScheme } = useColorScheme();

    return (
      <ToggleGroup.Root
        ref={ref}
        className={className}
        variant={variant}
        color={color}
        size={size}
        value={[colorScheme]}
        onValueChange={(value) => {
          if (value.length > 0) {
            const newScheme = value[value.length - 1];
            if (newScheme === 'light' || newScheme === 'dark' || newScheme === 'system') {
              setColorScheme(newScheme);
            }
          }
        }}
      >
        <Toggle value="light" aria-label="Light mode">
          <SunIcon />
        </Toggle>
        <Toggle value="dark" aria-label="Dark mode">
          <MoonIcon />
        </Toggle>
        {showSystemOption && (
          <Toggle value="system" aria-label="System mode">
            <MonitorIcon />
          </Toggle>
        )}
      </ToggleGroup.Root>
    );
  }
);

ColorSchemeToggle.displayName = 'ColorSchemeToggle';
