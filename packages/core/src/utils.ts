import fs from 'fs';

export interface ExtractionItem {
  id: number;
  text: string;
}

export function createExtractionPrompt(itens: ExtractionItem[], contexto?: string): string {
  return `
Você é um especialista em i18n. Recebi uma lista de textos de uma interface React.
Sua tarefa é gerar chaves (keys) semânticas e curtas em inglês (snake_case) para cada item.

REGRAS:
1. Retorne APENAS um array de objetos JSON.
2. Cada objeto deve ter: "id" (o mesmo enviado) e "key" (a chave sugerida).
3. As chaves devem ser curtas (max 4 palavras). 
4. Textos longos devem ter chaves que resumam o sentido.

EXEMPLO DE ENTRADA:
[ { "id": 1, "text": "Salvar alterações" } ]

EXEMPLO DE SAÍDA:
[ { "id": 1, "key": "button_save_changes" } ]

ITENS PARA PROCESSAR:
${JSON.stringify(itens, null, 2)}

${contexto ? `Contexto do projeto: ${contexto}` : ''}
`.trim();
}

export function createTranslationPrompt(
  delta: object, 
  from: string, 
  to: string, 
  contexto?: string
): string {
  return `
Você é um tradutor sênior de software especializado em localização (i18n).
Sua tarefa é traduzir os VALORES das novas chaves de interface que foram adicionadas ao projeto.

IDIOMAS: De "${from}" para "${to}".

REGRAS CRÍTICAS:
1. MANUTENÇÃO DE CHAVES: Mantenha as chaves (keys) EXATAMENTE como estão. Não as traduza nem as altere.
2. TRADUÇÃO DE VALORES: Traduza apenas os valores para o idioma de destino.
3. VARIÁVEIS E PLACEHOLDERS: Preserve placeholders como {{name}}, {0}, %s ou qualquer texto entre chaves. Eles NÃO devem ser traduzidos.
4. TOM DE VOZ: Use um tom profissional e conciso, adequado para interfaces de usuário (botões, labels, mensagens de erro).
5. FORMATO: Retorne APENAS o objeto JSON puro, sem explicações ou blocos de código markdown.

${contexto ? `CONTEXTO DO PROJETO: ${contexto}` : ''}

DADOS PARA TRADUZIR:
${JSON.stringify(delta, null, 2)}
`.trim();
}

export function cleanJsonResponse(text: string): string {
  return text.replace(/```json|```/g, '').trim();
}

export function lerJson(caminho: string): object {
  if (!fs.existsSync(caminho)) {
    fs.writeFileSync(caminho, '{}');
    return {};
  }
  return JSON.parse(fs.readFileSync(caminho, 'utf-8'));
}

export function salvarJson(caminho: string, json: object): void {
  fs.writeFileSync(caminho, JSON.stringify(json, null, 2));
}