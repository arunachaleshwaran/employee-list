import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    strictPort: true
  },
  plugins: [
    react(),
    eslintPlugin({ fix: true, include: '**/*.+(js|jsx|ts|tsx)' })
  ],
})
