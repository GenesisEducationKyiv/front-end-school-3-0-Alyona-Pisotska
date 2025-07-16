import * as Sentry from '@sentry/react';
import { SENTRY_PROJECT, SENTRY_DSN } from '@/lib/constants/constants';

if (import.meta.env.MODE === 'production') {
  Sentry.init({
    dsn: SENTRY_DSN,
    release: `${SENTRY_PROJECT}-${__APP_VERSION__}`,
    environment: import.meta.env.MODE,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 1.0,
  });
}
