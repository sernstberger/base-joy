import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@base-joy/tokens': path.resolve(__dirname, '../../libs/design-system/tokens/src'),
      '@base-joy/utils': path.resolve(__dirname, '../../libs/design-system/utils/src'),
      '@base-joy/ui-core': path.resolve(__dirname, '../../libs/ui/core/src'),
    },
  },
});
