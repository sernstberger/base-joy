import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { useColorScheme } from './useColorScheme';
import { ColorSchemeProvider } from './ColorSchemeProvider';

describe('useColorScheme', () => {
  beforeEach(() => {
    // Mock localStorage
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      get length() {
        return 0;
      },
      key: vi.fn(),
    };

    // Mock matchMedia
    global.matchMedia = vi.fn((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('throws error when used outside ColorSchemeProvider', () => {
    // Suppress console.error for this test
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useColorScheme());
    }).toThrow(
      'useColorScheme must be used within a ColorSchemeProvider. ' +
        'Wrap your app with <ColorSchemeProvider> to use this hook.'
    );

    consoleError.mockRestore();
  });

  it('returns context value when used inside ColorSchemeProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ColorSchemeProvider>{children}</ColorSchemeProvider>
    );

    const { result } = renderHook(() => useColorScheme(), { wrapper });

    expect(result.current).toHaveProperty('colorScheme');
    expect(result.current).toHaveProperty('resolvedColorScheme');
    expect(result.current).toHaveProperty('setColorScheme');
  });

  it('returns system as default colorScheme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ColorSchemeProvider>{children}</ColorSchemeProvider>
    );

    const { result } = renderHook(() => useColorScheme(), { wrapper });

    expect(result.current.colorScheme).toBe('system');
  });

  it('returns light or dark as resolvedColorScheme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ColorSchemeProvider>{children}</ColorSchemeProvider>
    );

    const { result } = renderHook(() => useColorScheme(), { wrapper });

    expect(['light', 'dark']).toContain(result.current.resolvedColorScheme);
  });

  it('setColorScheme is a function', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ColorSchemeProvider>{children}</ColorSchemeProvider>
    );

    const { result } = renderHook(() => useColorScheme(), { wrapper });

    expect(typeof result.current.setColorScheme).toBe('function');
  });
});
