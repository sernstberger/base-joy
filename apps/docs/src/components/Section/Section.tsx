import * as React from 'react';
import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import {
  Typography,
  Card,
  CardContent,
  CardFooter,
  Button,
  CodeBlock,
} from '@base-joy/ui-styled';

const sectionVariants = cva('', {
  variants: {
    spacing: {
      sm: 'mb-6',
      md: 'mb-12',
      lg: 'mb-16',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Section title.
   */
  title?: string;

  /**
   * Title level for the heading.
   * @default 'h2'
   */
  titleLevel?: 'h1' | 'h2' | 'h3' | 'h4';

  /**
   * Bottom margin size.
   * @default 'md'
   */
  spacing?: 'sm' | 'md' | 'lg';

  /**
   * Code to display in an expandable code block.
   * When provided, wraps the section content in a Card with footer toggle.
   */
  code?: string;

  /**
   * Language for syntax highlighting.
   * @default 'tsx'
   */
  codeLanguage?: string;

  /**
   * Whether code should be expanded by default.
   * @default false
   */
  codeExpanded?: boolean;
}

export function Section({
  className,
  title,
  titleLevel = 'h2',
  spacing = 'md',
  code,
  codeLanguage = 'tsx',
  codeExpanded = false,
  children,
  ...props
}: SectionProps) {
  const [showCode, setShowCode] = useState(codeExpanded);

  // If code is provided, wrap in Card with expandable code footer
  if (code && code.trim()) {
    return (
      <section className={cn(sectionVariants({ spacing }), className)} {...props}>
        {/* Title outside Card for consistent heading hierarchy */}
        {title && <Typography level={titleLevel} className="mb-4">{title}</Typography>}

        <Card variant="outlined" color="neutral">
          <CardContent>
            {children}
          </CardContent>

          <CardFooter>
            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => setShowCode(!showCode)}
                variant="outlined"
                color="neutral"
                size="sm"
                aria-expanded={showCode}
                className="self-start"
              >
                {showCode ? 'Hide Code' : 'Show Code'}
              </Button>

              {showCode && (
                <CodeBlock
                  code={code}
                  language={codeLanguage}
                  showCopyButton={true}
                  rounded="md"
                />
              )}
            </div>
          </CardFooter>
        </Card>
      </section>
    );
  }

  // Backward compatible: no code = current behavior (no Card wrapper)
  return (
    <section className={cn(sectionVariants({ spacing }), className)} {...props}>
      {title && <Typography level={titleLevel} className="mb-4">{title}</Typography>}
      {children}
    </section>
  );
}
