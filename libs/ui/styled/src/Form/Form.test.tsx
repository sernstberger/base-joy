import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Form } from './Form';
import { Field } from '../Field';
import { Button } from '../Button';

describe('Form', () => {
  describe('rendering', () => {
    it('renders form element', () => {
      render(
        <Form data-testid="form">
          <div>Form content</div>
        </Form>
      );

      expect(screen.getByTestId('form')).toBeInTheDocument();
      expect(screen.getByTestId('form').tagName).toBe('FORM');
    });

    it('renders children correctly', () => {
      render(
        <Form>
          <Field.Root name="test">
            <Field.Label>Test Field</Field.Label>
            <Field.Control />
          </Field.Root>
        </Form>
      );

      expect(screen.getByText('Test Field')).toBeInTheDocument();
    });
  });

  describe('validation modes', () => {
    it('accepts onSubmit validation mode', () => {
      render(
        <Form validationMode="onSubmit" data-testid="form">
          <Field.Root name="email">
            <Field.Control type="email" required />
          </Field.Root>
        </Form>
      );

      expect(screen.getByTestId('form')).toBeInTheDocument();
    });

    it('accepts onBlur validation mode', () => {
      render(
        <Form validationMode="onBlur" data-testid="form">
          <Field.Root name="email">
            <Field.Control type="email" required />
          </Field.Root>
        </Form>
      );

      expect(screen.getByTestId('form')).toBeInTheDocument();
    });

    it('accepts onChange validation mode', () => {
      render(
        <Form validationMode="onChange" data-testid="form">
          <Field.Root name="email">
            <Field.Control type="email" required />
          </Field.Root>
        </Form>
      );

      expect(screen.getByTestId('form')).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className', () => {
      render(
        <Form className="custom-form-class" data-testid="form">
          <div>Content</div>
        </Form>
      );

      expect(screen.getByTestId('form')).toHaveClass('custom-form-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Form aria-label="Contact form">
          <Field.Root name="name">
            <Field.Label>Name</Field.Label>
            <Field.Control />
          </Field.Root>
          <Button type="submit">Submit</Button>
        </Form>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
