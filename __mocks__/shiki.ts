import { vi } from 'vitest';

export const createHighlighter = vi.fn().mockResolvedValue({
  codeToHtml: vi.fn().mockReturnValue('<pre><code>mock code</code></pre>'),
});

export const getSingletonHighlighter = vi.fn().mockResolvedValue({
  codeToHtml: vi.fn().mockReturnValue('<pre><code>mock code</code></pre>'),
});

export type Highlighter = {
  codeToHtml: (code: string, options?: any) => string;
};
