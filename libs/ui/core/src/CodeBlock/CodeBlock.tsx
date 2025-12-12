import * as React from 'react';
import { createHighlighter, type Highlighter } from 'shiki';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { Button } from '../Button';

const codeBlockVariants = cva('relative overflow-hidden', {
  variants: {
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
    },
  },
  defaultVariants: {
    rounded: 'md',
  },
});

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['tsx', 'typescript', 'jsx', 'javascript', 'html', 'css', 'json', 'bash', 'shell'],
    });
  }
  return highlighterPromise;
}

export interface CodeBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof codeBlockVariants> {
  /** The code to display */
  code: string;
  /** The language for syntax highlighting */
  language?: string;
  /** The color theme for syntax highlighting */
  theme?: 'github-dark' | 'github-light';
  /** Whether to show the copy button */
  showCopyButton?: boolean;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      code,
      language = 'tsx',
      theme = 'github-dark',
      showCopyButton = true,
      showLineNumbers = false,
      rounded,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const [highlightedHtml, setHighlightedHtml] = React.useState<string>('');

    React.useEffect(() => {
      let mounted = true;

      getHighlighter().then((highlighter) => {
        if (mounted) {
          const html = highlighter.codeToHtml(code, {
            lang: language,
            theme,
          });
          setHighlightedHtml(html);
        }
      });

      return () => {
        mounted = false;
      };
    }, [code, language, theme]);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const lineNumberStyles = showLineNumbers
      ? '[&_.line]:before:content-[counter(line)] [&_.line]:before:counter-increment-[line] [&_.line]:before:mr-4 [&_.line]:before:text-neutral-500 [&_.line]:before:text-right [&_.line]:before:w-4 [&_.line]:before:inline-block [&>pre]:counter-reset-[line]'
      : '';

    return (
      <div ref={ref} className={cn(codeBlockVariants({ rounded }), className)} {...props}>
        {highlightedHtml ? (
          <div
            className={cn(
              '[&>pre]:p-4 [&>pre]:text-sm [&>pre]:overflow-x-auto [&>pre]:m-0',
              lineNumberStyles
            )}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre
            className={cn(
              'p-4 text-sm overflow-x-auto font-mono m-0',
              theme === 'github-dark'
                ? 'bg-[#24292e] text-neutral-100'
                : 'bg-[#f6f8fa] text-neutral-900'
            )}
          >
            <code>{code}</code>
          </pre>
        )}
        {showCopyButton && (
          <div className="absolute top-2 right-2">
            <Button onClick={handleCopy} variant="soft" color="neutral" size="sm">
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';

export { codeBlockVariants };
