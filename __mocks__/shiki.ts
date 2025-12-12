export const createHighlighter = jest.fn().mockResolvedValue({
  codeToHtml: jest.fn().mockReturnValue('<pre><code>mock code</code></pre>'),
});

export const getSingletonHighlighter = jest.fn().mockResolvedValue({
  codeToHtml: jest.fn().mockReturnValue('<pre><code>mock code</code></pre>'),
});

export type Highlighter = {
  codeToHtml: (code: string, options?: any) => string;
};
