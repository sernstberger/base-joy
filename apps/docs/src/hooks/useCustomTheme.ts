import { useState, useCallback } from 'react';
import { useTheme } from '@base-joy/ui-styled';
import { defaultTheme, type Theme } from '@base-joy/tokens';
import { generateColorScale } from '../utils/colorScaleGenerator';

const CUSTOM_THEME_KEY = 'base-joy-custom-theme';

export function useCustomTheme() {
  const { theme, setTheme } = useTheme();
  const [customizations, setCustomizations] = useState<Partial<Theme>>(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_THEME_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const updateColorScale = useCallback(
    (scale: keyof Theme['colors'], baseHex: string) => {
      const newScale = generateColorScale(baseHex);

      const newCustomizations: Partial<Theme> = {
        ...customizations,
        colors: {
          ...defaultTheme.colors,
          ...customizations.colors,
          [scale]: newScale,
        },
      };

      setCustomizations(newCustomizations);
      setTheme(newCustomizations);

      try {
        localStorage.setItem(CUSTOM_THEME_KEY, JSON.stringify(newCustomizations));
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    },
    [customizations, setTheme]
  );

  const resetTheme = useCallback(() => {
    setCustomizations({});
    setTheme({ colors: defaultTheme.colors });

    try {
      localStorage.removeItem(CUSTOM_THEME_KEY);
    } catch (error) {
      console.warn('Failed to remove theme from localStorage:', error);
    }
  }, [setTheme]);

  const exportTheme = useCallback(() => {
    const exportData = JSON.stringify(customizations, null, 2);

    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'base-joy-theme.json';
    a.click();
    URL.revokeObjectURL(url);

    return exportData;
  }, [customizations]);

  const importTheme = useCallback(
    (jsonString: string) => {
      try {
        const imported = JSON.parse(jsonString);

        if (!imported.colors || typeof imported.colors !== 'object') {
          throw new Error('Invalid theme format: missing colors object');
        }

        setCustomizations(imported);
        setTheme(imported);

        try {
          localStorage.setItem(CUSTOM_THEME_KEY, jsonString);
        } catch (error) {
          console.warn('Failed to save imported theme to localStorage:', error);
        }

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Invalid JSON',
        };
      }
    },
    [setTheme]
  );

  return {
    theme,
    customizations,
    updateColorScale,
    resetTheme,
    exportTheme,
    importTheme,
  };
}
