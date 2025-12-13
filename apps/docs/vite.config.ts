import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@base-joy/tokens': path.resolve(__dirname, '../../libs/design-system/tokens/src'),
      '@base-joy/utils': path.resolve(__dirname, '../../libs/design-system/utils/src'),
      '@base-joy/ui-unstyled': path.resolve(__dirname, '../../libs/ui/unstyled/src'),
      '@base-joy/ui-styled': path.resolve(__dirname, '../../libs/ui/styled/src'),
    },
  },
});
