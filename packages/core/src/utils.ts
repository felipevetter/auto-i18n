export function createExtractionPrompt(texto: string, contexto?: string): string {
  return `
Você é um especialista em internacionalização (i18n).
Recebi um texto extraído de um arquivo React (.tsx).
Sua tarefa é gerar chaves curtas e descritivas em inglês (snake_case) para cada texto.

REGRAS:
1. Retorne APENAS o JSON com o nome da chave e o valor.
2. A chave deve ser o texto original e o valor deve ser a chave sugerida para o i18n.
3. Se o texto for muito curto, a chave deve ser fiel ao significado.

TEXTO:
${JSON.stringify(texto, null, 2)}

${contexto ? `Contexto do projeto: ${contexto}` : ''}

RESPOSTA ESPERADA (Exemplo):
{
  "Salvar alterações": "buttons.save"
}
`.trim();
}

export function createTranslationPrompt(
  jsonOriginal: object, 
  from: string, 
  to: string, 
  contexto?: string
): string {
  return `
Você é um tradutor profissional de software.
Traduza o conteúdo deste arquivo JSON de i18n de "${from}" para "${to}".

REGRAS:
1. Mantenha as chaves idênticas ao original.
2. Traduza apenas os valores.
3. Mantenha tons e variáveis (ex: {{name}}, {0}) exatamente como estão.
4. Tente manter a tradução concisa para interfaces de usuário.
${contexto ? `5. Contexto do projeto: ${contexto}` : ''}

JSON ORIGINAL:
${JSON.stringify(jsonOriginal, null, 2)}

RESPOSTA ESPERADA:
JSON puro, sem blocos de código markdown ou explicações.
`.trim();
}

export function cleanJsonResponse(text: string): string {
  return text.replace(/```json|```/g, '').trim();
}