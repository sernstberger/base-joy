import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Field } from './Field';
import { Input } from '../Input';

describe('Field', () => {
  describe('rendering', () => {
    it('renders all subcomponents correctly', () => {
      render(
        <Field.Root name="email">
          <Field.Label>Email</Field.Label>
          <Field.Control />
          <Field.Description>Enter your email</Field.Description>
        </Field.Root>
      );

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Enter your email')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders required indicator when required prop is set', () => {
      render(
        <Field.Root name="email">
          <Field.Label required>Email</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(
        <Field.Root name="test" size={size} data-testid="field-root">
          <Field.Label>Label</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      const root = screen.getByTestId('field-root');
      expect(root).toBeInTheDocument();
    });
  });

  describe('className merging', () => {
    it('merges custom className with default styles', () => {
      render(
        <Field.Root name="test" className="custom-class" data-testid="field-root">
          <Field.Label className="label-class">Label</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      expect(screen.getByTestId('field-root')).toHaveClass('custom-class');
      expect(screen.getByText('Label')).toHaveClass('label-class');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Field.Root name="email">
          <Field.Label>Email Address</Field.Label>
          <Field.Control type="email" />
          <Field.Description>We will not share your email</Field.Description>
        </Field.Root>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('associates label with control', () => {
      render(
        <Field.Root name="email">
          <Field.Label>Email</Field.Label>
          <Field.Control />
        </Field.Root>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAccessibleName('Email');
    });
  });
});
