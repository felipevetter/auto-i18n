# @scopeact/autoi18n

[![npm version](https://img.shields.io/npm/v/@scopeact/autoi18n.svg)](https://www.npmjs.com/package/@scopeact/autoi18n)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Transforme seu código React/TS em uma aplicação multi-idioma em segundos usando IA.**

`@scopeact/autoi18n` é uma ferramenta de linha de comando (CLI) que automatiza o processo mais chato do desenvolvimento de software: a internacionalização (i18n). Ele varre seus arquivos, extrai textos, gera chaves inteligentes com IA e cria os arquivos de tradução JSON automaticamente.

---

## ✨ Funcionalidades

- **Extração Inteligente:** Identifica textos em arquivos `.tsx` e `.ts` usando AST (Abstract Syntax Tree).
- **Chaves Semânticas:** Em vez de chaves genéricas como `text1`, a IA gera chaves como `button_save_changes`.
- **Múltiplos Provedores:** Suporte para OpenAI, Google Gemini, DeepSeek, OpenRouter e Ollama.
- **Tradução Automática:** Traduz instantaneamente para múltiplos idiomas mantendo o contexto.
- **Preservação de Código:** Substitui os textos no seu código por chamadas `{t('chave')}` de forma segura.

---

## 🚀 Como usar

Você pode rodar diretamente via `npx`:

```bash
# 1. Inicialize a configuração
npx @scopeact/autoi18n init

# 2. Configure suas chaves de API no arquivo .env
# OPENAI_API_KEY=sua_chave
# ou GOOGLE_API_KEY=sua_chave
# ou DEEPSEEK_API_KEY=sua_chave
# ou OPENROUTER_API_KEY=sua_chave
# ou OLLAMA_API_KEY=sua_chave

# 3. Execute a automação
npx @scopeact/autoi18n run
```

---

## ⚙️ Configuração

Após rodar o `init`, um arquivo `auto-i18n.config.json` será criado:

```json
{
  "sourceLang": "pt",
  "targetLangs": ["en", "es"],
  "provider": "openai",
  "model": "gpt-4o",
  "localesDir": "./src/locales",
  "files": ["src/**/*.tsx"]
}
```

---

## 🛠️ Requisitos

- **Node.js:** v20 ou superior.
- **i18next:** O código gerado assume que você utiliza a biblioteca `i18next` com o hook `t`.

---

## 📂 Estrutura do Projeto

O CLI busca textos em:
- Conteúdo de tags JSX (`<div>Texto</div>`)
- *Próximas versões:* Atributos de componentes (placeholder, title) e strings literais em funções.

---

## 🤝 Contribuição

Contribuições são muito bem-vindas! Sinta-se à vontade para abrir Issues ou enviar Pull Requests.

Dica: Ao clonar o repo, use `npm install` na raiz para configurar o workspace.

---

## 📄 Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.

---
Criado por [Felipe Vetter](https://github.com/felipevetter) - Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/felipevetter)