/// <reference types="vitest" />
/// <reference types="vite/client" />
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'ES2022',
  },
  plugins: [
    react(),
    basicSsl(),
  ],
  test: {
    environment: 'jsdom',
    coverage: {
      thresholds: {
        autoUpdate: true,
        lines: 22.07,
        functions: 33.75,
        branches: 51.91,
        statements: 22.07,
      }
    }
  }
})