import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Section } from './Section';

describe('Section', () => {
  describe('basic rendering', () => {
    it('renders section element', () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent('Content');
    });

    it('renders with title', () => {
      render(<Section title="Test Section">Content</Section>);
      expect(screen.getByText('Test Section')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders without title', () => {
      render(<Section>Content</Section>);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies spacing variants', () => {
      const { rerender, container } = render(<Section spacing="sm">Content</Section>);
      expect(container.firstChild).toHaveClass('mb-6');

      rerender(<Section spacing="md">Content</Section>);
      expect(container.firstChild).toHaveClass('mb-12');

      rerender(<Section spacing="lg">Content</Section>);
      expect(container.firstChild).toHaveClass('mb-16');
    });

    it('merges className', () => {
      const { container } = render(
        <Section className="custom-class">Content</Section>
      );
      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass('mb-12'); // default spacing
    });

    it('forwards HTML attributes', () => {
      render(
        <Section id="test-section" data-testid="section">
          Content
        </Section>
      );
      const section = screen.getByTestId('section');
      expect(section).toHaveAttribute('id', 'test-section');
    });

    it('applies different title levels', () => {
      const { rerender } = render(
        <Section title="Test" titleLevel="h1">
          Content
        </Section>
      );
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test');

      rerender(
        <Section title="Test" titleLevel="h2">
          Content
        </Section>
      );
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test');

      rerender(
        <Section title="Test" titleLevel="h3">
          Content
        </Section>
      );
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test');

      rerender(
        <Section title="Test" titleLevel="h4">
          Content
        </Section>
      );
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Test');
    });
  });

  describe('code display', () => {
    it('wraps in Card when code prop provided', () => {
      render(<Section code="const x = 1;">Content</Section>);
      expect(screen.getByRole('button', { name: /show code/i })).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('shows "Show Code" button when code provided', () => {
      render(<Section code="const test = true;">Content</Section>);
      const button = screen.getByRole('button', { name: /show code/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Show Code');
    });

    it('does not show button when code is empty string', () => {
      render(<Section code="">Content</Section>);
      expect(screen.queryByRole('button', { name: /show code/i })).not.toBeInTheDocument();
    });

    it('does not show button when code is whitespace only', () => {
      render(<Section code="   ">Content</Section>);
      expect(screen.queryByRole('button', { name: /show code/i })).not.toBeInTheDocument();
    });

    it('toggles code visibility on button click', async () => {
      const user = userEvent.setup();
      const testCode = 'const x = 1;';
      const { container } = render(<Section code={testCode}>Content</Section>);

      const button = screen.getByRole('button', { name: /show code/i });

      // Code should be hidden initially - check for pre element
      expect(container.querySelector('pre')).not.toBeInTheDocument();

      // Click to show code
      await user.click(button);
      await waitFor(() => {
        expect(container.querySelector('pre')).toBeInTheDocument();
      });

      expect(button).toHaveTextContent('Hide Code');

      // Click to hide code
      await user.click(button);
      await waitFor(() => {
        expect(container.querySelector('pre')).not.toBeInTheDocument();
      });

      expect(button).toHaveTextContent('Show Code');
    });

    it('respects codeExpanded prop', () => {
      const { container } = render(
        <Section code="const x = 1;" codeExpanded>
          Content
        </Section>
      );

      const button = screen.getByRole('button', { name: /hide code/i });
      expect(button).toHaveTextContent('Hide Code');

      // Code should be visible (pre element exists)
      expect(container.querySelector('pre')).toBeInTheDocument();
    });

    it('passes codeLanguage to CodeBlock', () => {
      const { container } = render(
        <Section code="print('hello')" codeLanguage="python" codeExpanded>
          Content
        </Section>
      );

      // CodeBlock should render (pre element exists)
      // The language is passed to CodeBlock internally for syntax highlighting
      expect(container.querySelector('pre')).toBeInTheDocument();
    });

    it('renders title outside Card by default', () => {
      render(
        <Section title="Test Section" code="const x = 1;">
          Content
        </Section>
      );

      const title = screen.getByText('Test Section');
      const content = screen.getByText('Content');

      // Title should appear before content in DOM
      expect(title.compareDocumentPosition(content)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
  });

  describe('backward compatibility', () => {
    it('maintains current behavior without code prop', () => {
      const { container } = render(
        <Section title="Test" spacing="lg">
          Content
        </Section>
      );

      // Should not have button
      expect(screen.queryByRole('button')).not.toBeInTheDocument();

      // Should have normal structure
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('mb-16');
    });

    it('does not wrap in Card without code', () => {
      render(<Section title="Test">Content</Section>);

      // Button only exists when wrapped in Card
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('existing Section usage unchanged', () => {
      const { container } = render(
        <Section title="Example Title" titleLevel="h3" spacing="sm" className="custom">
          <div className="example-content">Example Content</div>
        </Section>
      );

      const section = container.firstChild as HTMLElement;

      // Should have all expected classes
      expect(section).toHaveClass('mb-6');
      expect(section).toHaveClass('custom');

      // Should have title
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Example Title');

      // Should have content
      expect(screen.getByText('Example Content')).toBeInTheDocument();

      // Should not have Card wrapper
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has accessible button label', () => {
      render(<Section code="code">Content</Section>);
      const button = screen.getByRole('button', { name: /show code/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAccessibleName('Show Code');
    });

    it('uses aria-expanded on toggle button', async () => {
      const user = userEvent.setup();
      render(<Section code="code">Content</Section>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has no axe violations with code', async () => {
      const { container } = render(
        <Section title="Example" code="const x = 1;">
          <p>Example content</p>
        </Section>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations without code', async () => {
      const { container } = render(
        <Section title="Example" titleLevel="h2">
          <p>Example content</p>
        </Section>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations with code expanded', async () => {
      const { container } = render(
        <Section title="Example" code="const x = 1;" codeExpanded>
          <p>Example content</p>
        </Section>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
