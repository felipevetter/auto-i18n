
# @scopeact/autoi18n

[![npm version](https://img.shields.io/npm/v/@scopeact/autoi18n.svg?style=flat-square)](https://www.npmjs.com/package/@scopeact/autoi18n)
[![Build Status](https://img.shields.io/github/actions/workflow/status/felipevetter/auto-i18n/publish.yml?style=flat-square)](https://github.com/felipevetter/auto-i18n/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg?style=flat-square)](https://github.com/felipevetter/auto-i18n/pulls)

> The only i18n tool that handles both **Extraction** (via AST + AI) and **Runtime** (Zero-Config).

**autoi18n** is a dual-purpose tool designed to take a hardcoded React/Next.js project to full internationalization in minutes, not hours.

---

## ⚡ The Core: CLI Migration

The CLI scans your `TSX` files, extracts hardcoded strings using **Abstract Syntax Tree (AST)**, and uses **AI to generate semantic keys**.

- **No Regex:** Safe code transformations that won't break your syntax.
- **AI-Powered:** Keys like `welcome_title` instead of `text_1`.
- **Auto-Inject:** Automatically adds imports to your files.

### Quick Start
```bash
npx @scopeact/autoi18n init
npx @scopeact/autoi18n run
```

---

## 🚀 The Feature: Zero-Config Runtime

We noticed that even after extracting strings, configuring i18n in **Next.js (App Router)** is a nightmare (Middleware, `[locale]` folders, etc). 

So we built a **minimalist, high-performance runtime** specifically for the CLI output.

### 1. Setup the Provider (Root Layout)
No need to move files into `[locale]` folders. Just wrap your layout.

```tsx
// app/layout.tsx
import { I18nProvider } from "@scopeact/autoi18n/client";
import { getI18nConfig } from "@scopeact/autoi18n/server";

export default async function RootLayout({ children }) {
  const i18n = await getI18nConfig('en'); // Default language

  return (
    <html lang={i18n.locale}>
      <body>
        <I18nProvider locale={i18n.locale} messages={i18n.messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

### 2. Usage in Server Components
```tsx
// app/page.tsx (Server)
import { getI18n } from '@scopeact/autoi18n/server';

export default async function Page() {
  const { t } = await getI18n();
  return <h1>{t("hero_title")}</h1>;
}
```

### 3. Usage in Client Components
```tsx
// components/Button.tsx (Client)
'use client';
import { useI18n } from '@scopeact/autoi18n/client';

export function HeroButton() {
  const { t } = useI18n();
  return <button>{t("get_started")}</button>;
}
```

---

## 🛠 Configuration

Created via `init`, the `auto-i18n.config.json` controls the magic:

```json
{
  "sourceLang": "pt",
  "targetLangs": ["en", "es"],
  "i18nLibrary": "@scopeact/autoi18n",
  "provider": "openai",
  "localesDir": "./locales",
  "files": ["src/**/*.tsx"]
}
```

---

## 💎 Why autoi18n?

| Feature | Tradicional (next-intl/i18next) | **autoi18n** |
| :--- | :--- | :--- |
| **Key Creation** | Manual (Hours of copy-paste) | **AI-Automated** (Seconds) |
| **Code Rewrite** | Manual | **AST-Automated** |
| **Folder Structure** | Forced `[locale]` nesting | **Stay as you are** |
| **Next.js Setup** | Complex (Middleware/Config) | **Zero-Config** |

---

## 🇧🇷 Born in Brazil
Projeto desenvolvido com foco em resolver a dor real de desenvolvedores que precisam entregar projetos globais rápido. 

## License
MIT © [Felipe Vetter](https://github.com/felipevetter)