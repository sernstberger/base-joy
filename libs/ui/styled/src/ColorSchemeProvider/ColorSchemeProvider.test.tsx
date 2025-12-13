import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorSchemeProvider } from './ColorSchemeProvider';
import { useColorScheme } from './useColorScheme';

// Test component that uses the hook
function TestComponent() {
  const { colorScheme, resolvedColorScheme, setColorScheme } = useColorScheme();

  return (
    <div>
      <div data-testid="color-scheme">{colorScheme}</div>
      <div data-testid="resolved-color-scheme">{resolvedColorScheme}</div>
      <button onClick={() => setColorScheme('light')}>Set Light</button>
      <button onClick={() => setColorScheme('dark')}>Set Dark</button>
      <button onClick={() => setColorScheme('system')}>Set System</button>
    </div>
  );
}

describe('ColorSchemeProvider', () => {
  let localStorageMock: { [key: string]: string };
  let matchMediaMock: any;

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};
    global.localStorage = {
      getItem: vi.fn((key) => localStorageMock[key] || null),
      setItem: vi.fn((key, value) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        localStorageMock = {};
      }),
      get length() {
        return Object.keys(localStorageMock).length;
      },
      key: vi.fn((index) => Object.keys(localStorageMock)[index] || null),
    };

    // Mock matchMedia
    matchMediaMock = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    global.matchMedia = matchMediaMock;

    // Clear document attribute
    document.documentElement.removeAttribute('data-color-scheme');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children without crashing', () => {
    render(
      <ColorSchemeProvider>
        <div data-testid="child">Test</div>
      </ColorSchemeProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('defaults to system color scheme', () => {
    render(
      <ColorSchemeProvider>
        <TestComponent />
      </ColorSchemeProvider>
    );

    expect(screen.getByTestId('color-scheme')).toHaveTextContent('system');
  });

  it('uses custom default color scheme', () => {
    render(
      <ColorSchemeProvider defaultColorScheme="dark">
        <TestComponent />
      </ColorSchemeProvider>
    );

    expect(screen.getByTestId('color-scheme')).toHaveTextContent('dark');
    expect(screen.getByTestId('resolved-color-scheme')).toHaveTextContent('dark');
  });

  it('resolves system scheme to light when no dark preference', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    render(
      <ColorSchemeProvider defaultColorScheme="system">
        <TestComponent />
      </ColorSchemeProvider>
    );

    expect(screen.getByTestId('color-scheme')).toHaveTextContent('system');
    expect(screen.getByTestId('resolved-color-scheme')).toHaveTextContent('light');
  });

  it('resolves system scheme to dark when dark preference is set', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    render(
      <ColorSchemeProvider defaultColorScheme="system">
        <TestComponent />
      </ColorSchemeProvider>
    );

    expect(screen.getByTestId('color-scheme')).toHaveTextContent('system');
    expect(screen.getByTestId('resolved-color-scheme')).toHaveTextContent('dark');
  });

  it('updates color scheme when setColorScheme is called', async () => {
    const user = userEvent.setup();
    render(
      <ColorSchemeProvider>
        <TestComponent />
      </ColorSchemeProvider>
    );

    await user.click(screen.getByText('Set Dark'));

    await waitFor(() => {
      expect(screen.getByTestId('color-scheme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved-color-scheme')).toHaveTextContent('dark');
    });
  });

  it('persists color scheme to localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const user = userEvent.setup();

    render(
      <ColorSchemeProvider>
        <TestComponent />
      </ColorSchemeProvider>
    );

    await user.click(screen.getByText('Set Dark'));

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith('base-joy-color-scheme', 'dark');
    });

    setItemSpy.mockRestore();
  });

  it('loads color scheme from localStorage on mount', () => {
    localStorageMock['base-joy-color-scheme'] = 'dark';

    render(
      <ColorSchemeProvider>
        <TestComponent />
      </ColorSchemeProvider>
    );

    expect(screen.getByTestId('color-scheme')).toHaveTextContent('dark');
    expect(screen.getByTestId('resolved-color-scheme')).toHaveTextContent('dark');
  });

  it('applies data-color-scheme attribute to document.documentElement', async () => {
    render(
      <ColorSchemeProvider defaultColorScheme="dark">
        <TestComponent />
      </ColorSchemeProvider>
    );

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-color-scheme')).toBe('dark');
    });
  });

  it('updates data-color-scheme attribute when scheme changes', async () => {
    const user = userEvent.setup();
    render(
      <ColorSchemeProvider>
        <TestComponent />
      </ColorSchemeProvider>
    );

    await user.click(screen.getByText('Set Light'));

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-color-scheme')).toBe('light');
    });
  });

  it('does not listen for system changes when not using system scheme', () => {
    let addEventListenerMock = vi.fn();

    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: addEventListenerMock,
      removeEventListener: vi.fn(),
    });

    render(
      <ColorSchemeProvider defaultColorScheme="light">
        <TestComponent />
      </ColorSchemeProvider>
    );

    // Should not add listener when not using system scheme
    expect(addEventListenerMock).not.toHaveBeenCalled();
  });

  it('continues to work when localStorage fails', async () => {
    const user = userEvent.setup();

    // Make setItem throw an error
    const originalSetItem = global.localStorage.setItem;
    global.localStorage.setItem = vi.fn(() => {
      throw new Error('QuotaExceededError');
    });

    render(
      <ColorSchemeProvider>
        <TestComponent />
      </ColorSchemeProvider>
    );

    await user.click(screen.getByText('Set Dark'));

    // Color scheme should still update in memory even if localStorage fails
    await waitFor(() => {
      expect(screen.getByTestId('color-scheme')).toHaveTextContent('dark');
    });

    // Restore original
    global.localStorage.setItem = originalSetItem;
  });

  it('uses default when localStorage has invalid value', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('invalid-value');

    render(
      <ColorSchemeProvider defaultColorScheme="light">
        <TestComponent />
      </ColorSchemeProvider>
    );

    // Should use provided default since stored value is invalid
    expect(screen.getByTestId('color-scheme')).toHaveTextContent('light');

    getItemSpy.mockRestore();
  });
});
