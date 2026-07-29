# e2e-playwright

Projeto de testes end-to-end com [Playwright](https://playwright.dev), cobrindo Chromium, Firefox e WebKit, com pipeline no GitHub Actions.

## Setup inicial

Comando usado para criar o projeto:

```bash
npm init playwright@latest --yes -- --quiet --browser=chromium --browser=firefox --browser=webkit --gha
```

Inicializa o Playwright com os 3 browsers e gera o workflow do GitHub Actions.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS)
- npm

## Instalação

```bash
npm install
npx playwright install
```

## Como rodar os testes

```bash
# todos os testes (3 browsers)
npx playwright test

# um arquivo específico
npx playwright test tests/example.spec.ts

# modo UI (debug visual)
npx playwright test --ui

# navegador visível
npx playwright test --headed

# abrir o relatório HTML
npx playwright show-report
```

## Estrutura

```
e2e-playwright/
├── .github/workflows/playwright.yml  # CI no GitHub Actions
├── tests/
│   ├── example.spec.ts               # exemplos oficiais (playwright.dev)
│   └── test-1.spec.ts                # fluxo de compra (Contoso Traders)
├── playwright.config.ts
├── package.json
└── README.md
```

## Observação sobre Contoso Traders

O teste `tests/test-1.spec.ts` aponta para `http://cloudtesting.contosotraders.com/`.  
Esse ambiente demo da Microsoft **não está mais no ar** (DNS não resolve; o [repositório](https://github.com/microsoft/contosotraders-cloudtesting) está arquivado).  
Enquanto a URL não for substituída por um ambiente válido, esse teste vai falhar na navegação.

## CI

A cada push/PR em `main` ou `master`, o workflow `.github/workflows/playwright.yml`:

1. instala dependências (`npm ci`)
2. instala os browsers do Playwright
3. executa `npx playwright test`
4. publica o artefato `playwright-report`
