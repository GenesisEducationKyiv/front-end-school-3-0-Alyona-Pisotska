# 🎵 MusicApp

**MusicApp** is a web application for managing music tracks. It allows users to view, edit, delete, and sort tracks, and observe real-time updates for the currently active track using Socket.IO.

---

## 📦 Prerequisites

- **Node.js** version `v20.13.1` (recommended)

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
   npm install
```

### 2. Environment Variables Setup

`.env` is used to store environment-specific and sensitive values such as API keys and tokens.

#### Steps:

1. Create a `.env` file in the root directory or copy the example:

   ```bash
   cp .env.dist .env
   ```

2. Add the following variables:

   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_SENTRY_ORG=pisotska
   VITE_SENTRY_PROJECT=music-app
   VITE_SENTRY_DSN=

   SENTRY_AUTH_TOKEN=
   ```

   ⚠️ Replace empty values with actual data from a Sentry account.

> **Important:** The `.env` file is already listed in `.gitignore` and should **never** be committed.

### 3. Run the App

```bash
   npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

> ⚠️ Make sure the backend API is running at [http://localhost:8000](http://localhost:8000)

---

## 📂 Scripts

| Command                             | Description                                                           |
| ----------------------------------- | --------------------------------------------------------------------- |
| `npm start`                         | Start the Vite development server                                     |
| `npm run build`                     | Type-check the project, build for production, and remove `.map` files |
| `npm run preview`                   | Preview the production build locally                                  |
| `npm run lint`                      | Run ESLint on the codebase with strict settings                       |
| `npm run format`                    | Format all source files using Prettier                                |
| `npm test`                          | Run unit tests using Vitest                                           |
| `npm run test:watch`                | Run Vitest in watch mode                                              |
| `npm run test:playwright`           | Run both E2E and component tests via Playwright                       |
| `npm run test:playwright:e2e`       | Run Playwright end-to-end tests                                       |
| `npm run test:playwright:component` | Run Playwright component tests using `playwright-ct.config.ts`        |

---

## 🧪 Testing

The project includes three types of tests:

### ✅ Unit Tests (via [Vitest](https://vitest.dev/))

To run unit tests at once:

```bash
  npm test
```

To run unit tests in watch mode (ideal for TDD or active development):

```bash
  npm run test:watch
```

---

### 🧪 End-to-End Tests (via [Playwright](https://playwright.dev/))

To run E2E tests across browsers and verify app behavior from a user perspective:

```bash
  npm run test:playwright:e2e
```

> Uses Playwright’s default config (`playwright.config.ts`). Make sure the dev server or backend is running if required by tests.

---

### 🧩 Component Tests (via [Playwright Component Testing](https://playwright.dev/docs/components/intro))

To test UI components in isolation with actual rendering:

```bash
  npm run test:playwright:component
```

> Uses a separate config file: `playwright-ct.config.ts`.

---

### 🔁 Run all Playwright tests (E2E + Component)

```bash
  npm run test:playwright
```

---

## 🛠 Tech Stack

- **React** + **TypeScript**
- **Vite**
- **Zustand**
- **TailwindCSS** + **shadcn/ui**
- **TanStack Table**
- **Socket.IO**
- **Sentry**

---

## 🐛 Common Issues

- **Port 3000 already in use:** Stop other services using the port or change the port in `vite.config.ts`.
- **Sentry errors or missing DSN:** Make sure all required environment variables are correctly set in `.env`.

---
