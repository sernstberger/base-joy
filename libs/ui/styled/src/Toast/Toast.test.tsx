import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Toast, useToastManager } from './Toast';

interface TestToastProps {
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  position?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center';
  showClose?: boolean;
  showAction?: boolean;
  className?: string;
  viewportClassName?: string;
}

const TestToast = ({
  variant,
  color,
  size,
  position,
  showClose = false,
  showAction = false,
  className,
  viewportClassName,
}: TestToastProps) => {
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
      <Toast.Viewport position={position} className={viewportClassName} data-testid="viewport">
        {toastManager.toasts.map((toast: { id: string; title: string; description: string }) => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            variant={variant}
            color={color}
            size={size}
            className={className}
            data-testid="toast"
          >
            <div>
              <Toast.Title className="custom-title">{toast.title}</Toast.Title>
              <Toast.Description>{toast.description}</Toast.Description>
            </div>
            {showAction && <Toast.Action>Undo</Toast.Action>}
            {showClose && <Toast.Close data-testid="close" aria-label="Close notification" />}
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </div>
  );
};

const renderAndTriggerToast = async (props: TestToastProps = {}) => {
  const user = userEvent.setup();
  const result = render(
    <Toast.Provider>
      <TestToast {...props} />
    </Toast.Provider>
  );

  await user.click(screen.getByText('Show Toast'));
  await waitFor(() => {
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
  });

  return { ...result, user };
};

describe('Toast', () => {
  describe('rendering', () => {
    it('renders toast when triggered', async () => {
      await renderAndTriggerToast();
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
      expect(screen.getByText('This is a test toast')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'soft', 'outlined', 'plain'] as const)(
      'renders %s variant',
      async (variant) => {
        await renderAndTriggerToast({ variant });
        expect(screen.getByTestId('toast')).toBeInTheDocument();
      }
    );
  });

  describe('colors', () => {
    it.each(['primary', 'success', 'warning', 'danger', 'neutral'] as const)(
      'renders %s color',
      async (color) => {
        await renderAndTriggerToast({ color });
        expect(screen.getByTestId('toast')).toBeInTheDocument();
      }
    );
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', async (size) => {
      await renderAndTriggerToast({ size });
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
    ] as const)('renders viewport with %s position', async (position) => {
      render(
        <Toast.Provider>
          <TestToast position={position} />
        </Toast.Provider>
      );

      // Viewport should be rendered even without toasts
      expect(screen.getByTestId('viewport')).toBeInTheDocument();
    });
  });

  describe('close functionality', () => {
    it('renders close button', async () => {
      await renderAndTriggerToast({ showClose: true });
      expect(screen.getByTestId('close')).toBeInTheDocument();
    });
  });

  describe('action button', () => {
    it('renders action button', async () => {
      await renderAndTriggerToast({ showAction: true });
      expect(screen.getByText('Undo')).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className on toast root', async () => {
      await renderAndTriggerToast({ className: 'custom-root' });
      expect(screen.getByTestId('toast')).toHaveClass('custom-root');
    });

    it('merges custom className on viewport', async () => {
      render(
        <Toast.Provider>
          <TestToast viewportClassName="custom-viewport" />
        </Toast.Provider>
      );

      expect(screen.getByTestId('viewport')).toHaveClass('custom-viewport');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = await renderAndTriggerToast({ showClose: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
