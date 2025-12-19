# @scopeact/autoi18n

[![npm version](https://img.shields.io/npm/v/@scopeact/autoi18n.svg)](https://www.npmjs.com/package/@scopeact/autoi18n)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Pare de criar chaves de tradução manualmente. Deixe a IA fazer o trabalho pesado.**

O `@scopeact/autoi18n` é uma CLI poderosa que automatiza todo o fluxo de internacionalização (i18n) do seu projeto React/TypeScript. Ele usa Inteligência Artificial para escanear seu código, extrair textos, gerar chaves semânticas e traduzir tudo automaticamente.

---

## ✨ Funcionalidades

- **Extração via AST:** Usa `ts-morph` para analisar seu código de forma segura (não usa Regex instável).
- **Chaves Inteligentes:** Em vez de `text_1`, a IA gera chaves como `button_save_changes` baseadas no contexto.
- **Substituição Automática:** Troca `<div>Olá</div>` por `<div>{t('greeting_hello')}</div>` no seu arquivo original.
- **Multi-Provider:** Suporte para OpenAI (GPT-4o), Google Gemini, DeepSeek, OpenRouter e Ollama (local).
- **Tradução em Lote:** Gera arquivos JSON para múltiplos idiomas de uma só vez.

---

## 🚀 Início Rápido

### 1. Inicialize o projeto
Na raiz do seu projeto (onde está o `package.json`), execute:

```bash
npx @scopeact/autoi18n init
```
Isso criará um arquivo `autoi18n.config.json` com as configurações padrão.

### 2. Configure suas chaves de API
Crie ou edite seu arquivo `.env` e adicione a chave do provedor que deseja usar:

```env
OPENAI_API_KEY=sua_chave_aqui
# OU
GOOGLE_API_KEY=sua_chave_aqui
# OU
DEEPSEEK_API_KEY=sua_chave_aqui
```

### 3. Execute a automação
Agora, basta rodar o comando para processar seus arquivos:

```bash
npx @scopeact/autoi18n run
```

---

## ⚙️ Configuração (`autoi18n.config.json`)

```json
{
  "sourceLang": "pt",
  "targetLangs": ["en", "es"],
  "provider": "openai",
  "model": "gpt-4o",
  "localesDir": "./src/locales",
  "files": ["src/**/*.tsx", "src/**/*.ts"]
}
```

- **`sourceLang`**: Idioma original do seu código.
- **`targetLangs`**: Lista de idiomas para os quais você deseja traduzir.
- **`localesDir`**: Onde os arquivos `.json` de tradução serão salvos.
- **`provider`**: `openai`, `google`, `deepseek`, `openrouter` ou `ollama`.
- **`files`**: Glob pattern dos arquivos que devem ser escaneados.

---

## 💡 Exemplo de Uso

**Antes:**
```tsx
export const Welcome = () => {
  return <div>Bem-vindo ao nosso sistema!</div>;
};
```

**Depois de rodar o `autoi18n run`:**
```tsx
export const Welcome = () => {
  return <div>{t('welcome_message')}</div>;
};
```

**Arquivo `locales/en.json` gerado:**
```json
{
  "welcome_message": "Welcome to our system!"
}
```

---

## 🛠️ Requisitos

- **Node.js**: v18 ou superior.
- **i18next**: O projeto assume que você já tem o `i18next` configurado e o hook `t` disponível no escopo do arquivo.

---

## 🤝 Contribuição

Este projeto é mantido pela **Scopeact**. Se você encontrar bugs ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*.

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais detalhes.

---
Desenvolvido com ❤️ por [Felipe Vetter](https://github.com/felipevetter)