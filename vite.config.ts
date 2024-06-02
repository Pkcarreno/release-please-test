/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  process.env.BASE_URL = process.env.VITE_BASE_URL ?? '/'
  const config = {
    plugins: [react(), tsconfigPaths()],
    base: process.env.BASE_URL,
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      BASE_URL: JSON.stringify(process.env.BASE_URL)
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: '.vitest/setup',
      include: ['**/test.{ts,tsx}']
    }
  }

  return config
})
