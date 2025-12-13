import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { TableOfContents, type Section } from './TableOfContents';

const mockSections: Section[] = [
  { id: 'playground', title: 'Playground' },
  { id: 'examples', title: 'Examples' },
  { id: 'variants', title: 'Variants', level: 3 },
  { id: 'colors', title: 'Colors', level: 3 },
  { id: 'api', title: 'API Reference' },
];

describe('TableOfContents', () => {
  beforeEach(() => {
    mockSections.forEach(({ id }) => {
      const el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
    });
  });

  afterEach(() => {
    mockSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        document.body.removeChild(el);
      }
    });
  });

  it('renders all sections', () => {
    render(<TableOfContents sections={mockSections} />);

    expect(screen.getByText('On this page')).toBeInTheDocument();
    expect(screen.getByText('Playground')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
    expect(screen.getByText('Variants')).toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('API Reference')).toBeInTheDocument();
  });

  it('renders as a nav landmark', () => {
    render(<TableOfContents sections={mockSections} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAccessibleName('Table of contents');
  });

  it('applies level 3 indentation', () => {
    render(<TableOfContents sections={mockSections} />);

    const variantsButton = screen.getByText('Variants');
    const colorsButton = screen.getByText('Colors');
    const playgroundButton = screen.getByText('Playground');

    expect(variantsButton).toHaveClass('pl-4');
    expect(colorsButton).toHaveClass('pl-4');
    expect(playgroundButton).not.toHaveClass('pl-4');
  });

  it('scrolls to section on click', async () => {
    const user = userEvent.setup();
    render(<TableOfContents sections={mockSections} />);

    const playgroundElement = document.getElementById('playground')!;
    const scrollIntoViewMock = vi.fn();
    playgroundElement.scrollIntoView = scrollIntoViewMock;

    await user.click(screen.getByText('Playground'));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <TableOfContents sections={mockSections} className="custom-class" />
    );

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('custom-class');
  });

  it('is hidden on mobile and tablet', () => {
    const { container } = render(<TableOfContents sections={mockSections} />);

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('hidden');
    expect(nav).toHaveClass('lg:block');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TableOfContents sections={mockSections} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
