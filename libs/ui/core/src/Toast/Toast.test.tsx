import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Toast, useToastManager } from './Toast';

const TestToast = () => {
  const toastManager = useToastManager();

  return (
    <div>
      <button
        onClick={() =>
          toastManager.add({
            title: 'Test Toast',
            description: 'This is a test toast',
          })
        }
      >
        Show Toast
      </button>
      <Toast.Viewport>
        {toastManager.toasts.map((toast) => (
          <Toast.Root key={toast.id}>
            <div>
              <Toast.Title>{toast.title}</Toast.Title>
              <Toast.Description>{toast.description}</Toast.Description>
            </div>
            <Toast.Close />
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </div>
  );
};

describe('Toast', () => {
  describe('rendering', () => {
    it('renders toast when triggered', async () => {
      const user = userEvent.setup();
      render(
        <Toast.Provider>
          <TestToast />
        </Toast.Provider>
      );

      await user.click(screen.getByText('Show Toast'));
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      async (variant) => {
        render(
          <Toast.Provider>
            <Toast.Viewport>
              <Toast.Root variant={variant} data-testid="toast">
                <Toast.Title>Toast</Toast.Title>
              </Toast.Root>
            </Toast.Viewport>
          </Toast.Provider>
        );

        expect(screen.getByTestId('toast')).toBeInTheDocument();
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'success', 'warning', 'danger', 'neutral'] as const)(
      'renders %s color',
      async (color) => {
        render(
          <Toast.Provider>
            <Toast.Viewport>
              <Toast.Root color={color} data-testid="toast">
                <Toast.Title>Toast</Toast.Title>
              </Toast.Root>
            </Toast.Viewport>
          </Toast.Provider>
        );

        expect(screen.getByTestId('toast')).toBeInTheDocument();
      }
    );
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Toast.Provider>
          <Toast.Viewport>
            <Toast.Root size={size} data-testid="toast">
              <Toast.Title>Toast</Toast.Title>
            </Toast.Root>
          </Toast.Viewport>
        </Toast.Provider>
      );

      expect(screen.getByTestId('toast')).toBeInTheDocument();
    });
  });

  describe('positions', () => {
    it.each([
      'top-right',
      'top-left',
      'top-center',
      'bottom-right',
      'bottom-left',
      'bottom-center',
    ] as const)('renders %s position', (position) => {
      render(
        <Toast.Provider>
          <Toast.Viewport position={position} data-testid="viewport">
            <Toast.Root>
              <Toast.Title>Toast</Toast.Title>
            </Toast.Root>
          </Toast.Viewport>
        </Toast.Provider>
      );

      expect(screen.getByTestId('viewport')).toBeInTheDocument();
    });
  });

  describe('close functionality', () => {
    it('renders close button', () => {
      render(
        <Toast.Provider>
          <Toast.Viewport>
            <Toast.Root>
              <Toast.Title>Toast</Toast.Title>
              <Toast.Close data-testid="close" />
            </Toast.Root>
          </Toast.Viewport>
        </Toast.Provider>
      );

      expect(screen.getByTestId('close')).toBeInTheDocument();
    });
  });

  describe('action button', () => {
    it('renders action button', () => {
      render(
        <Toast.Provider>
          <Toast.Viewport>
            <Toast.Root>
              <Toast.Title>Toast</Toast.Title>
              <Toast.Action>Undo</Toast.Action>
            </Toast.Root>
          </Toast.Viewport>
        </Toast.Provider>
      );

      expect(screen.getByText('Undo')).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <Toast.Provider>
          <Toast.Viewport className="custom-viewport">
            <Toast.Root className="custom-root" data-testid="toast">
              <Toast.Title className="custom-title">Toast</Toast.Title>
            </Toast.Root>
          </Toast.Viewport>
        </Toast.Provider>
      );

      expect(screen.getByTestId('toast')).toHaveClass('custom-root');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Toast.Provider>
          <Toast.Viewport>
            <Toast.Root role="alert">
              <Toast.Title>Notification</Toast.Title>
              <Toast.Description>Your changes have been saved</Toast.Description>
              <Toast.Close aria-label="Close notification" />
            </Toast.Root>
          </Toast.Viewport>
        </Toast.Provider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
