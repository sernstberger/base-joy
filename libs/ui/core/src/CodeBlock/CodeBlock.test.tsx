import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { CodeBlock } from './CodeBlock';

jest.mock('shiki', () => ({
  createHighlighter: jest.fn(() =>
    Promise.resolve({
      codeToHtml: jest.fn(
        (code: string) =>
          `<pre class="shiki github-dark"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
      ),
    })
  ),
}));

describe('CodeBlock', () => {
  describe('rendering', () => {
    it('renders code correctly', async () => {
      render(<CodeBlock code="const x = 1;" />);
      await waitFor(() => {
        expect(screen.getByText('const x = 1;')).toBeInTheDocument();
      });
    });

    it('shows fallback before highlighting loads', () => {
      const { container } = render(<CodeBlock code="const x = 1;" />);
      const pre = container.querySelector('pre');
      expect(pre).toBeInTheDocument();
    });

    it('renders highlighted code after loading', async () => {
      const { container } = render(<CodeBlock code="const x = 1;" />);
      await waitFor(() => {
        expect(container.querySelector('.shiki')).toBeInTheDocument();
      });
    });

    it('renders as div element', () => {
      const { container } = render(<CodeBlock code="test" />);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });
  });

  describe('copy button', () => {
    it('shows copy button by default', async () => {
      render(<CodeBlock code="test code" />);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
      });
    });

    it('hides copy button when showCopyButton is false', async () => {
      render(<CodeBlock code="test code" showCopyButton={false} />);
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: 'Copy' })).not.toBeInTheDocument();
      });
    });

    it('copies code to clipboard on click', async () => {
      const user = userEvent.setup();
      const mockWriteText = jest.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
        configurable: true,
      });

      render(<CodeBlock code="const hello = 'world';" />);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: 'Copy' }));
      expect(mockWriteText).toHaveBeenCalledWith("const hello = 'world';");
    });

    it('shows "Copied!" after clicking copy', async () => {
      const user = userEvent.setup();
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: jest.fn().mockResolvedValue(undefined) },
        writable: true,
        configurable: true,
      });

      render(<CodeBlock code="test" />);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: 'Copy' }));
      expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument();
    });
  });

  describe('language prop', () => {
    it('accepts different languages', async () => {
      const { rerender } = render(<CodeBlock code="console.log('hi')" language="javascript" />);
      await waitFor(() => {
        expect(screen.getByText("console.log('hi')")).toBeInTheDocument();
      });

      rerender(<CodeBlock code=".class { color: red; }" language="css" />);
      await waitFor(() => {
        expect(screen.getByText('.class { color: red; }')).toBeInTheDocument();
      });
    });

    it('defaults to tsx language', () => {
      render(<CodeBlock code="<Component />" />);
      expect(screen.getByText('<Component />')).toBeInTheDocument();
    });
  });

  describe('theme prop', () => {
    it('defaults to github-dark theme', () => {
      const { container } = render(<CodeBlock code="test" />);
      const pre = container.querySelector('pre');
      expect(pre).toHaveClass('bg-[#24292e]');
    });

    it('applies github-light theme', () => {
      const { container } = render(<CodeBlock code="test" theme="github-light" />);
      const pre = container.querySelector('pre');
      expect(pre).toHaveClass('bg-[#f6f8fa]');
    });
  });

  describe('rounded prop', () => {
    it.each([
      ['none', 'rounded-none'],
      ['sm', 'rounded-sm'],
      ['md', 'rounded-md'],
      ['lg', 'rounded-lg'],
    ] as const)('applies %s rounded variant', (rounded, expectedClass) => {
      const { container } = render(<CodeBlock code="test" rounded={rounded} />);
      expect(container.firstChild).toHaveClass(expectedClass);
    });

    it('applies default md rounded', () => {
      const { container } = render(<CodeBlock code="test" />);
      expect(container.firstChild).toHaveClass('rounded-md');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the DOM element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CodeBlock ref={ref} code="test" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      const { container } = render(<CodeBlock code="test" className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass('relative');
    });
  });

  describe('additional HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(<CodeBlock code="test" data-testid="test-code" id="my-code" />);
      const codeBlock = screen.getByTestId('test-code');
      expect(codeBlock).toHaveAttribute('id', 'my-code');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<CodeBlock code="const x = 1;" />);
      await waitFor(() => {
        expect(container.querySelector('.shiki')).toBeInTheDocument();
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations without copy button', async () => {
      const { container } = render(
        <CodeBlock code="const x = 1;" showCopyButton={false} />
      );
      await waitFor(() => {
        expect(container.querySelector('.shiki')).toBeInTheDocument();
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with light theme', async () => {
      const { container } = render(
        <CodeBlock code="const x = 1;" theme="github-light" />
      );
      await waitFor(() => {
        expect(container.querySelector('.shiki')).toBeInTheDocument();
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
