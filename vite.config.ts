import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import { sentryVitePlugin } from '@sentry/vite-plugin';

import packageJson from './package.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      __APP_VERSION__: JSON.stringify(packageJson.version),
    },
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
      visualizer({
        open: true,
        filename: 'bundle-report/bundle-report.html',
        gzipSize: true,
        brotliSize: true,
      }),
      sentryVitePlugin({
        org: env.VITE_SENTRY_ORG,
        project: env.VITE_SENTRY_PROJECT,
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
        telemetry: false,
      }) as PluginOption,
    ],
    server: {
      port: 3000,
    },
    build: {
      sourcemap: 'hidden',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 1. TanStack Query та Axios
              if (id.includes('@tanstack') || id.includes('axios')) {
                return 'data-fetching';
              }

              // 2. Radix UI, Lucide Icons and related utilities for classes
              if (
                id.includes('@radix-ui') ||
                id.includes('lucide-react') ||
                id.includes('class-variance-authority') ||
                id.includes('clsx') ||
                id.includes('tailwind-merge')
              ) {
                return 'ui-vendors';
              }

              // 3. React Hook Form and validation
              if (id.includes('react-hook-form') || id.includes('@hookform/resolvers') || id.includes('zod')) {
                return 'form-validation';
              }

              // 4. React Select
              if (id.includes('react-select')) {
                return 'select-library';
              }

              // 5. Sentry
              if (id.includes('@sentry')) {
                return 'sentry';
              }

              return 'core';
            }
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      exclude: ['node_modules/', 'tests/', 'playwright/', 'playwright-report/', '**/*.spec.tsx'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: ['node_modules/', 'test/', '**/*.test.ts', '**/*.spec.ts'],
      },
    },
  };
});
