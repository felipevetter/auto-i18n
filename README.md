# @scopeact/autoi18n

[![npm version](https://img.shields.io/npm/v/@scopeact/autoi18n.svg)](https://www.npmjs.com/package/@scopeact/autoi18n)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> CLI to automatically migrate React / TypeScript projects to i18n using AST and LLMs.

**auto-i18n** scans TS/TSX files, extracts hardcoded strings, replaces them with `t("key")`, generates translation files, and optionally injects the correct i18n imports — all with explicit, opinionated trade-offs.

This is a **migration tool**, not a runtime framework.

---

## Why this exists

Internationalizing a React codebase usually means:

* Manually hunting hardcoded strings
* Guessing translation keys
* Rewriting components by hand
* Copy-pasting JSON across languages

It’s repetitive, boring, and easy to screw up.

**auto-i18n automates the mechanical work and delegates semantic decisions to an LLM.**

---

## What this tool does

* Parses **TypeScript and TSX using AST** (no regex hacks)
* Detects static hardcoded strings
* Rewrites code to use `t("key")`
* Generates translation files
* Uses an **LLM to generate semantic translation keys**
* Optionally injects i18n imports automatically
* Supports different i18n libraries

---

## Installation

No global install required:

```bash
npx @scopeact/auto-i18n init
```

---

## Usage

### 1. Initialize configuration

```bash
npx @scopeact/auto-i18n init
```

This creates:

* `auto-i18n.config.json`

---

### 2. Run the migration

```bash
npx @scopeact/auto-i18n run
```

The tool will:

1. Parse files into AST
2. Detect static string literals
3. Ask the LLM to infer **semantic translation keys**
4. Rewrite source code
5. Inject i18n imports if missing
6. Generate translation files

---

## Example

### Before

```tsx
export function Home() {
  return (
    <div>
      <h1>Hello world</h1>
      <p>Welcome to our platform</p>
    </div>
  );
}
```

### After

```tsx
import { useTranslation } from "react-i18next";

export function Home() {
  return (
    <div>
      <h1>{t("greeting")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

Generated translation file:

```json
{
  "greeting": "Hello world",
  "description": "Welcome to our platform"
}
```

---

## Configuration

Example `auto-i18n.config.json`:

```json
{
  "sourceLang": "pt",
  "targetLangs": [ "en", "es", "de" ],
  "autoInject": true,
  "i18nLibrary": "react-i18next",
  "provider": "ollama",
  "localesDir": "./locales",
  "model": "gemma3-translator",
  "files": [ "**/*.tsx" ]
}
```

### Options

#### `autoInject`

```json
{
  "autoInject": true
}
```

Automatically injects the required i18n import at the top of the file **if it does not already exist**.

This avoids manual setup and keeps the migration fully automated.

---

#### `i18nLibrary`

```json
{
  "i18nLibrary": "react-i18next"
}
```

Defines which i18n library should be used when injecting imports and hooks.

Supported values:

* `react-i18next`
* `next-i18n`

This affects:

* import statements
* generated code structure

---

## Why keys are AI-generated (no dry-run)

Translation key naming is a **semantic problem**, not a mechanical one.

For example:

* Is `"Hello world"` a title, a CTA, or a heading?
* Does it belong to `home`, `layout`, or `marketing`?

These decisions cannot be inferred deterministically.

**auto-i18n intentionally requires an LLM to:**

* infer intent
* generate meaningful keys
* avoid arbitrary conventions

Because of this, a traditional dry-run would produce **misleading results** and is intentionally not supported.

This trade-off is explicit.

---

## Why AST instead of regex

Regex does not understand JSX or TypeScript.

AST parsing:

* Preserves syntax structure
* Avoids accidental replacements
* Handles real-world React code
* Produces predictable transformations

This tool is designed for **production codebases**, not demos.

---

## Limitations

This tool does **not** handle:

* Dynamic strings (`"Hello " + name`)
* Template literals with expressions
* Runtime-generated text
* Context-dependent translations

It is meant to **bootstrap i18n**, not replace human review.

---

## When you should NOT use this

* Your project already has a mature i18n setup
* Translations depend heavily on runtime logic
* You expect zero review after migration

---

## Design philosophy

* Explicit over clever
* Predictable over magical
* Narrow scope over feature bloat

This tool solves **one specific problem**, deliberately.

---

## License

Distributed under MIT license. See [LICENSE](LICENSE) for more details.

---

## 🇧🇷 Nota

README principal em inglês por usabilidade global.
Português aqui só pra lembrar que esse projeto nasceu no Brasil.