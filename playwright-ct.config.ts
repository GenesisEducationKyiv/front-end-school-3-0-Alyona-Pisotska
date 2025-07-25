import { defineConfig, devices } from '@playwright/experimental-ct-react';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/component',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Port to use for Vite preview. */
    ctPort: 3100,

    /* Template directory for component testing */
    ctTemplateDir: 'playwright',

    /* Screenshot options */
    screenshot: 'only-on-failure',

    /* Vite configuration for component testing */
    ctViteConfig: {
      resolve: {
        alias: {
          '@': new URL('./src', import.meta.url).pathname,
        },
      },
    },
  },

  /* Configure screenshot settings */
  expect: {
    /* Maximum time expect() should wait for screenshot comparison */
    toHaveScreenshot: {
      threshold: 0.3,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
