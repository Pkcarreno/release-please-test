/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), tsconfigPaths()],
    base: '/',
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: '.vitest/setup',
      include: ['**/test.{ts,tsx}']
    }
  }

  if (command !== 'serve') {
    config.base = '/release-please-test/'
  }

  return config
})
