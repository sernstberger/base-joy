import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    globals: true,
    alias: {
      '@base-joy/tokens': resolve(__dirname, './libs/design-system/tokens/src/index.ts'),
      '@base-joy/utils': resolve(__dirname, './libs/design-system/utils/src/index.ts'),
      '@base-joy/ui-unstyled': resolve(__dirname, './libs/ui/unstyled/src/index.ts'),
      '@base-joy/ui-styled': resolve(__dirname, './libs/ui/styled/src/index.ts'),
      shiki: resolve(__dirname, './__mocks__/shiki.ts'),
    },
    coverage: {
      provider: 'v8',
      include: ['libs/**/src/**/*.{ts,tsx}'],
      exclude: ['libs/**/src/**/*.d.ts', 'libs/**/src/**/index.ts'],
    },
  },
});
