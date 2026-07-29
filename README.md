# e2e-playwright

End-to-end testing project with [Playwright](https://playwright.dev), covering Chromium, Firefox, and WebKit, plus a GitHub Actions pipeline.

## Initial setup

Command used to scaffold the project:

```bash
npm init playwright@latest --yes -- --quiet --browser=chromium --browser=firefox --browser=webkit --gha
```

Initializes Playwright with all 3 browsers and generates the GitHub Actions workflow.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- npm

## Installation

```bash
npm install
npx playwright install
```

## Running tests

```bash
# all tests (3 browsers)
npx playwright test

# a specific file
npx playwright test tests/example.spec.ts

# UI mode (visual debug)
npx playwright test --ui

# headed browser
npx playwright test --headed

# open the HTML report
npx playwright show-report
```

## Structure

```
e2e-playwright/
├── .github/workflows/playwright.yml  # GitHub Actions CI
├── tests/
│   ├── example.spec.ts               # official samples (playwright.dev)
│   └── test-1.spec.ts                # shopping flow (Contoso Traders)
├── playwright.config.ts
├── package.json
└── README.md
```

## Note about Contoso Traders

The test in `tests/test-1.spec.ts` targets `http://cloudtesting.contosotraders.com/`.  
That Microsoft demo environment is **no longer available** (DNS does not resolve; the [repository](https://github.com/microsoft/contosotraders-cloudtesting) is archived).  
Until the URL is replaced with a valid environment, this test will fail on navigation.

## CI

On every push/PR to `main` or `master`, the workflow `.github/workflows/playwright.yml`:

1. installs dependencies (`npm ci`)
2. installs Playwright browsers
3. runs `npx playwright test`
4. uploads the `playwright-report` artifact
