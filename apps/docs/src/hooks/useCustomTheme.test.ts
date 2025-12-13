import * as React from 'react';
import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useCustomTheme } from './useCustomTheme';
import { useTheme, ThemeProvider } from '@base-joy/ui-styled';
import { defaultTheme } from '@base-joy/tokens';

vi.mock('@base-joy/ui-styled', async () => {
  const actual = await vi.importActual('@base-joy/ui-styled');
  return {
    ...actual,
    useTheme: vi.fn(),
  };
});

describe('useCustomTheme', () => {
  let mockSetTheme: ReturnType<typeof vi.fn>;
  let localStorageMock: { [key: string]: string };
  let originalCreateElement: typeof document.createElement;

  beforeEach(() => {
    mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: defaultTheme,
      setTheme: mockSetTheme,
    });

    localStorageMock = {};
    global.Storage.prototype.getItem = vi.fn((key: string) => localStorageMock[key] || null);
    global.Storage.prototype.setItem = vi.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    global.Storage.prototype.removeItem = vi.fn((key: string) => {
      delete localStorageMock[key];
    });

    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();

    originalCreateElement = document.createElement.bind(document);
    document.createElement = vi.fn((tagName: string, options?: ElementCreationOptions) => {
      if (tagName === 'a') {
        return {
          click: vi.fn(),
          href: '',
          download: '',
        } as any;
      }
      return originalCreateElement(tagName, options);
    });
  });

  afterEach(() => {
    document.createElement = originalCreateElement;
  });

  it('initializes with empty customizations when no stored theme', () => {
    const { result } = renderHook(() => useCustomTheme());

    expect(result.current.customizations).toEqual({});
    expect(result.current.theme).toEqual(defaultTheme);
  });

  it('loads customizations from localStorage on mount', () => {
    const storedTheme = {
      colors: {
        primary: {
          500: '#ff0000',
        },
      },
    };
    localStorageMock['base-joy-custom-theme'] = JSON.stringify(storedTheme);

    const { result } = renderHook(() => useCustomTheme());

    expect(result.current.customizations).toEqual(storedTheme);
  });

  it('handles corrupted localStorage data gracefully', () => {
    localStorageMock['base-joy-custom-theme'] = 'invalid json';

    const { result } = renderHook(() => useCustomTheme());

    expect(result.current.customizations).toEqual({});
  });

  describe('updateColorScale', () => {
    it('generates and applies new color scale', () => {
      const { result } = renderHook(() => useCustomTheme());

      act(() => {
        result.current.updateColorScale('primary', '#ff0000');
      });

      expect(mockSetTheme).toHaveBeenCalled();
      const calledWith = mockSetTheme.mock.calls[0][0];
      expect(calledWith.colors.primary).toBeDefined();
      expect(calledWith.colors.primary[500]).toBe('#ff0000');
    });

    it('persists updated theme to localStorage', () => {
      const { result } = renderHook(() => useCustomTheme());

      act(() => {
        result.current.updateColorScale('primary', '#ff0000');
      });

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'base-joy-custom-theme',
        expect.stringContaining('#ff0000')
      );
    });

    it('updates customizations state', () => {
      const { result } = renderHook(() => useCustomTheme());

      act(() => {
        result.current.updateColorScale('primary', '#ff0000');
      });

      expect(result.current.customizations.colors?.primary[500]).toBe('#ff0000');
    });

    it('merges with existing customizations', () => {
      const { result } = renderHook(() => useCustomTheme());

      act(() => {
        result.current.updateColorScale('primary', '#ff0000');
      });

      act(() => {
        result.current.updateColorScale('success', '#00ff00');
      });

      expect(result.current.customizations.colors?.primary[500]).toBe('#ff0000');
      expect(result.current.customizations.colors?.success[500]).toBe('#00ff00');
    });
  });

  describe('resetTheme', () => {
    it('clears customizations', () => {
      const { result } = renderHook(() => useCustomTheme());

      act(() => {
        result.current.updateColorScale('primary', '#ff0000');
      });

      act(() => {
        result.current.resetTheme();
      });

      expect(result.current.customizations).toEqual({});
    });

    it('resets theme to default', () => {
      const { result } = renderHook(() => useCustomTheme());

      act(() => {
        result.current.updateColorScale('primary', '#ff0000');
      });

      mockSetTheme.mockClear();

      act(() => {
        result.current.resetTheme();
      });

      expect(mockSetTheme).toHaveBeenCalledWith({ colors: defaultTheme.colors });
    });

    it('removes theme from localStorage', () => {
      const { result } = renderHook(() => useCustomTheme());

      act(() => {
        result.current.updateColorScale('primary', '#ff0000');
      });

      act(() => {
        result.current.resetTheme();
      });

      expect(localStorage.removeItem).toHaveBeenCalledWith('base-joy-custom-theme');
    });
  });

  describe('exportTheme', () => {
    it('returns JSON string of customizations', () => {
      const { result } = renderHook(() => useCustomTheme());

      act(() => {
        result.current.updateColorScale('primary', '#ff0000');
      });

      let exported: string = '';
      act(() => {
        exported = result.current.exportTheme();
      });

      expect(exported).toContain('#ff0000');
      expect(() => JSON.parse(exported)).not.toThrow();
    });

    it('triggers file download', () => {
      const { result } = renderHook(() => useCustomTheme());
      const mockAnchor = { click: vi.fn(), href: '', download: '' };
      vi.mocked(document.createElement).mockReturnValue(mockAnchor);

      act(() => {
        result.current.exportTheme();
      });

      expect(mockAnchor.download).toBe('base-joy-theme.json');
      expect(mockAnchor.click).toHaveBeenCalled();
    });
  });

  describe('importTheme', () => {
    it('imports valid theme JSON', () => {
      const { result } = renderHook(() => useCustomTheme());
      const validTheme = {
        colors: {
          primary: {
            500: '#ff0000',
          },
        },
      };

      let importResult: any;
      act(() => {
        importResult = result.current.importTheme(JSON.stringify(validTheme));
      });

      expect(importResult.success).toBe(true);
      expect(mockSetTheme).toHaveBeenCalled();
    });

    it('rejects invalid JSON', () => {
      const { result } = renderHook(() => useCustomTheme());

      let importResult: any;
      act(() => {
        importResult = result.current.importTheme('invalid json');
      });

      expect(importResult.success).toBe(false);
      expect(importResult.error).toBeDefined();
    });

    it('rejects theme without colors object', () => {
      const { result } = renderHook(() => useCustomTheme());
      const invalidTheme = { typography: {} };

      let importResult: any;
      act(() => {
        importResult = result.current.importTheme(JSON.stringify(invalidTheme));
      });

      expect(importResult.success).toBe(false);
      expect(importResult.error).toContain('colors');
    });

    it('persists imported theme to localStorage', () => {
      const { result } = renderHook(() => useCustomTheme());
      const validTheme = {
        colors: {
          primary: {
            500: '#ff0000',
          },
        },
      };
      const themeJson = JSON.stringify(validTheme);

      act(() => {
        result.current.importTheme(themeJson);
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('base-joy-custom-theme', themeJson);
    });

    it('updates customizations state with imported theme', () => {
      const { result } = renderHook(() => useCustomTheme());
      const validTheme = {
        colors: {
          primary: {
            500: '#ff0000',
          },
        },
      };

      act(() => {
        result.current.importTheme(JSON.stringify(validTheme));
      });

      expect(result.current.customizations).toEqual(validTheme);
    });
  });
});
