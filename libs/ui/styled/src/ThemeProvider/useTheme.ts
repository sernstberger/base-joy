import * as React from 'react';
import { ThemeContext } from './ThemeProvider';

/**
 * Hook to access the current theme and update function.
 *
 * Must be used within a ThemeProvider component. Throws an error if used
 * outside of a provider context.
 *
 * @returns An object containing the current theme and a setter function
 *
 * @example
 * ```tsx
 * import { useTheme } from '@base-joy/ui-styled';
 *
 * function MyComponent() {
 *   const { theme, setTheme } = useTheme();
 *
 *   const changePrimaryColor = () => {
 *     setTheme({
 *       colors: {
 *         primary: {
 *           50: '#f0f9ff',
 *           // ... other shades
 *         },
 *       },
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <p>Current primary color: {theme.colors.primary[500]}</p>
 *       <button onClick={changePrimaryColor}>Change Primary</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
        'Wrap your app with <ThemeProvider> at the root level.'
    );
  }

  return context;
}
