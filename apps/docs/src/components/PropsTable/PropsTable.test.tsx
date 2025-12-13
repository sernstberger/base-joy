import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { PropsTable, type PropMeta } from './PropsTable';

const mockProps: PropMeta[] = [
  {
    name: 'variant',
    type: '"solid" | "soft" | "outlined" | "plain"',
    defaultValue: '"soft"',
    description: 'The visual style variant.',
    required: false,
  },
  {
    name: 'color',
    type: '"primary" | "neutral" | "success" | "warning" | "danger"',
    defaultValue: '"neutral"',
    description: 'The color scheme.',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content of the component.',
    required: true,
  },
];

describe('PropsTable', () => {
  it('renders all props', () => {
    render(<PropsTable props={mockProps} />);

    expect(screen.getByText('variant')).toBeInTheDocument();
    expect(screen.getByText('color')).toBeInTheDocument();
    expect(screen.getByText('children')).toBeInTheDocument();
  });

  it('renders column headers in correct order', () => {
    render(<PropsTable props={mockProps} />);

    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(5);
    expect(headers[0]).toHaveTextContent('Prop');
    expect(headers[1]).toHaveTextContent('Type');
    expect(headers[2]).toHaveTextContent('Required');
    expect(headers[3]).toHaveTextContent('Default');
    expect(headers[4]).toHaveTextContent('Description');
  });

  it('displays "Yes" for required props', () => {
    render(<PropsTable props={mockProps} />);

    const rows = screen.getAllByRole('row');
    const childrenRow = rows.find((row) =>
      row.textContent?.includes('children')
    );

    expect(childrenRow).toHaveTextContent('Yes');
  });

  it('displays "No" for optional props', () => {
    render(<PropsTable props={mockProps} />);

    const rows = screen.getAllByRole('row');
    const variantRow = rows.find((row) => row.textContent?.includes('variant'));

    expect(variantRow).toHaveTextContent('No');
  });

  it('shows asterisk for required props', () => {
    render(<PropsTable props={mockProps} />);

    const rows = screen.getAllByRole('row');
    const childrenRow = rows.find((row) =>
      row.textContent?.includes('children')
    );

    expect(childrenRow?.textContent).toContain('*');
  });

  it('does not show asterisk for optional props', () => {
    render(<PropsTable props={mockProps} />);

    const rows = screen.getAllByRole('row');
    const variantRow = rows.find((row) => row.textContent?.includes('variant'));

    const asteriskCount = (variantRow?.textContent?.match(/\*/g) || []).length;
    expect(asteriskCount).toBe(0);
  });

  it('renders default values', () => {
    render(<PropsTable props={mockProps} />);

    expect(screen.getByText('"soft"')).toBeInTheDocument();
    expect(screen.getByText('"neutral"')).toBeInTheDocument();
  });

  it('renders dash when no default value', () => {
    render(<PropsTable props={mockProps} />);

    const rows = screen.getAllByRole('row');
    const childrenRow = rows.find((row) =>
      row.textContent?.includes('children')
    );

    const cells = childrenRow?.querySelectorAll('td');
    const defaultCell = cells?.[3];
    expect(defaultCell).toHaveTextContent('-');
  });

  it('renders descriptions', () => {
    render(<PropsTable props={mockProps} />);

    expect(screen.getByText('The visual style variant.')).toBeInTheDocument();
    expect(screen.getByText('The color scheme.')).toBeInTheDocument();
    expect(screen.getByText('The content of the component.')).toBeInTheDocument();
  });

  it('renders dash when no description', () => {
    const propsWithoutDescription: PropMeta[] = [
      {
        name: 'test',
        type: 'string',
        required: false,
      },
    ];

    render(<PropsTable props={propsWithoutDescription} />);

    const rows = screen.getAllByRole('row');
    const testRow = rows.find((row) => row.textContent?.includes('test'));

    const cells = testRow?.querySelectorAll('td');
    const descriptionCell = cells?.[4];
    expect(descriptionCell).toHaveTextContent('-');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PropsTable props={mockProps} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
