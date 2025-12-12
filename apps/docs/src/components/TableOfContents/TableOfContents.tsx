import { useEffect, useState } from 'react';
import { Typography } from '@base-joy/ui-styled';
import { cn } from '@base-joy/utils';

export interface Section {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  sections: Section[];
  className?: string;
}

export function TableOfContents({
  sections,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={cn(
        'hidden lg:block w-64 shrink-0',
        'sticky top-0 self-start h-screen py-8 overflow-y-auto',
        className
      )}
      aria-label="Table of contents"
    >
      <Typography level="body-sm" weight="semibold" className="mb-3 px-2">
        On this page
      </Typography>
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => handleClick(section.id)}
              className={cn(
                'w-full text-left px-2 py-1.5 rounded text-sm transition-colors',
                section.level === 3 && 'pl-4',
                activeId === section.id
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              )}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
