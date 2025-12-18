import dotenv from 'dotenv';
dotenv.config();
import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readConfig } from "./config.js";

export type AIProvider = 'openai' | 'google' | 'deepseek' | 'openrouter' | 'ollama';

export async function askLLM(prompt: string, mode = 'text'): Promise<string> {
    const provider = readConfig('provider') || 'openai' as AIProvider;
    const model = readConfig('model');
    checkEnv(provider);
  switch (provider) {
    case 'openai':
      return askOpenAI(prompt, model || 'gpt-4o', mode);
    case 'google':
      return askGemini(prompt, model || 'gemini-2.5-flash', mode);
    case 'deepseek':
      return askDeepSeek(prompt, model || 'deepseek-chat', mode);
    case 'openrouter':
      return askOpenRouter(prompt, model || 'google/gemini-2.0-flash-001', mode);
    case 'ollama':
      return askOllama(prompt, model || 'llama3', mode);
    default:
      throw new Error(`Provedor de IA desconhecido: ${provider}`);
  }
}

export function checkEnv(provider: string) {
    if (!process.env[`${provider.toUpperCase()}_API_KEY`]) {
        throw new Error(`${provider.toUpperCase()}_API_KEY não foi definido`);
    }
}

async function askOpenAI(prompt: string, model: string, mode: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    response_format: mode === 'json' ? { type: 'json_object' } : { type: 'text' },
    messages: [{ role: 'user', content: prompt }],
    model,
  });
  return response?.choices?.[0]?.message?.content || '';
}

async function askGemini(prompt: string, model: string, mode: string) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
  const gemini = genAI.getGenerativeModel({ model, generationConfig: { responseMimeType: mode === 'json' ? 'application/json' : 'text/plain' } });
  const result = await gemini.generateContent(prompt);
  return result.response.text();
}

async function askDeepSeek(prompt: string, model: string, mode: string) {
  const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com'
  });
  const response = await client.chat.completions.create({
    response_format: mode === 'json' ? { type: 'json_object' } : { type: 'text' },
    messages: [{ role: 'user', content: prompt }],
    model,
  });
  return response?.choices?.[0]?.message?.content || '';
}

async function askOpenRouter(prompt: string, model: string, mode: string) {
  const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      "HTTP-Referer": "https://github.com/felipevetter/auto-i18n",
    }
  });
  const response = await client.chat.completions.create({
    response_format: mode === 'json' ? { type: 'json_object' } : { type: 'text' },
    messages: [{ role: 'user', content: prompt }],
    model,
  });
  return response?.choices?.[0]?.message?.content || '';
}

async function askOllama(prompt: string, model: string, mode: string) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      model,
      prompt,
      format: mode === 'json' ? 'json' : 'text',
      stream: false,
    }),
  });
  const data = await response.json() as { response: string };
  return data.response;
}