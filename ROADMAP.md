# 🗺 Roadmap - auto-i18n

The goal of this library is to be the fastest and simplest way to internationalize Next.js projects using the power of AST and AI.

## ✅ Released (v1.3.0)
- [x] **AST-based Extraction:** Automatic detection of strings in JSX/TSX files.
- [x] **AI Translation:** Multi-provider support (OpenAI, Anthropic, Google, Ollama).
- [x] **Zero-Config Runtime:** `getI18n` (Server) and `useI18n` (Client) without the need for `[locale]` folders.

## 🚀 Planned (Short-term)
- [ ] **VS Code Extension:** Inline translations, key highlighting, and one-click AI generation directly from the editor.
- [ ] **Pluralization Support:** Simple logic for handling counts (e.g., `one`, `other`).
- [ ] **Auto-detect Language:** Optional middleware for browser language detection.
- [ ] **Type-Safe Keys:** Automatic generation of TypeScript definitions for translation keys (Intellisense support).

## 🟡 Long-term Vision
- [ ] **Framework Agnostic:** Support for Vite/React and Remix.
- [ ] **Export/Import:** Support for CSV/Excel formats for human-in-the-loop review.
- [ ] **Visual Dashboard:** A simple local UI to manage and edit translation keys.

---
*Suggestions? Feel free to open an Issue or a Pull Request!*