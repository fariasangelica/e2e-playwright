# e2e-playwright

Learning repo to get started with [Playwright](https://playwright.dev): introduction, getting started, running tests, writing tests, debugging tests, and running tests on CI.

Tests run on **Chromium**, **Firefox**, and **WebKit**, with a **GitHub Actions** pipeline.

---

## Introduction

Playwright is an end-to-end testing framework for modern web apps. It ships with:

- a test runner and assertions
- built-in locators with **auto-wait** and **retry**
- browser isolation per test (each test gets a fresh `page`)
- tooling for codegen, debugging, and traces
- support for all major CI providers

**Async rule:** Playwright is async — no `await` = flaky tests.

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- npm

### Scaffold command used in this project

```bash
npm init playwright@latest --yes -- --quiet --browser=chromium --browser=firefox --browser=webkit --gha
```

Creates the Playwright project with 3 browsers and a GitHub Actions workflow.

### Install dependencies

```bash
npm install
npx playwright install
```

### Project structure

```
e2e-playwright/
├── .github/workflows/playwright.yml  # CI workflow
├── tests/
│   ├── example.spec.ts               # starter examples (playwright.dev)
│   └── test-1.spec.ts                # Contoso Traders shopping flow
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Running tests

```bash
# all tests (headless by default)
npx playwright test

# one file
npx playwright test tests/example.spec.ts

# UI Mode
npx playwright test --ui

# headed (visible browser window)
npx playwright test --headed

# open HTML report
npx playwright show-report
```

| Mode | Behavior |
| --- | --- |
| **Headless** | No browser window is shown (default in CI / terminal) |
| **Headed** | Browser window is visible (`--headed`) |

You can also explore **traces** for a step-by-step recording of a test run (see [Debugging tests](#debugging-tests)).

---

## Writing tests

### Locators

A **locator** is how Playwright finds an element on the page.

Playwright includes built-in locators with **auto-wait** and **retry**: it waits for the element to appear and keeps trying until it is actionable, or until the timeout is reached.

**Prefer user-facing attributes**, especially accessibility roles. Avoid CSS/XPath when possible — users do not see or care about those selectors. Test IDs (`getByTestId`) are also supported when needed.

Recommended built-in locators:

- `page.getByRole()` — accessibility role + name
- `page.getByText()` — text content
- `page.getByLabel()` — form control by label
- `page.getByPlaceholder()` — input by placeholder
- `page.getByAltText()` — image by alt text
- `page.getByTitle()` — title attribute
- `page.getByTestId()` — `data-testid` (or configured test id attribute)

### Example from `tests/example.spec.ts`

```ts
import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Role-based locator: role type + accessible name
  await page.getByRole('link', { name: 'Get started' }).click();

  // Assertion: heading with text "Installation" is visible
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

- **Line with `getByRole('link', ...)`** — role-based locator (`link` + name `Get started`)
- **Line with `toBeVisible()`** — assertion that the `Installation` heading is on the page

Assertions in Playwright **retry until they pass or time out** (example: `toHaveTitle`, `toBeVisible`).

Each `test(...)` receives an isolated `{ page }` fixture — tests do not share browser state.

### Codegen (generate tests from user actions)

You can generate tests by interacting with the page:

```bash
npx playwright codegen
```

Or use **Pick locator** / Codegen from the Playwright VS Code extension:

1. Import `test` and `expect`
2. Create a `test(...)` block
3. Click through the UI — Playwright records the interactions and generates the test code

---

## Debugging tests

Useful options:

```bash
# UI Mode — inspect steps live
npx playwright test --ui

# Playwright Inspector (debug mode)
npx playwright test --debug

# headed + slow down actions
npx playwright test --headed --debug
```

Tips from this learning path:

- Set **breakpoints** to pause execution
- Run tests in **debug mode** to step through actions
- Playwright is strict by default: a locator must resolve to **one** matching element
- Use the **Trace Viewer** to inspect a step-by-step recording after changing or failing a test

```bash
# show last HTML report (includes traces when configured)
npx playwright show-report

# open a trace file directly
npx playwright show-trace trace.zip
```

In this project, `playwright.config.ts` uses `trace: 'on-first-retry'` so traces are captured when a test is retried.

---

## Running tests on CI

This repo runs Playwright on **every push and pull request** to `main` / `master`, so you can catch breakages before merging to production.

Workflow: `.github/workflows/playwright.yml`

1. Install dependencies (`npm ci`)
2. Install Playwright browsers
3. Run `npx playwright test`
4. Upload the `playwright-report` artifact

Playwright works with **all major CI providers**. If a test fails on the PR, you can fix it before merge.

