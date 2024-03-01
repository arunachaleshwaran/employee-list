import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    strictPort: true,
  },
  plugins: [
    react(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    eslintPlugin({ fix: true, include: '**/*.+(cjs|ts|tsx)' }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
