import fs from 'node:fs/promises';
import path from 'node:path';

// @ts-ignore
import { cookies, headers } from 'next/headers';

async function detectLocale(sourceLang: string) {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
    if (localeCookie) return localeCookie;

    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');
    if (acceptLanguage) {
        return acceptLanguage.split(',')[0].split('-')[0];
    }

    return sourceLang;
}

export async function getI18nConfig(defaultLang: string = "en") {
    const locale = await detectLocale(defaultLang);

    const localesDir = path.join(process.cwd(), "./locales");
    const filePath = path.join(localesDir, `${locale}.json`);

    let messages: Record<string, string> = {};
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        messages = JSON.parse(content);
    } catch (err) {
        console.warn(`[auto-i18n] Arquivo de tradução não encontrado para: ${locale}`);
    }

    return { locale, messages };
}

/*
    * Retorna um objeto com a função de tradução e o locale atual.
    * @param defaultLang: { defaultLocale: string }
    * @returns { t: (key: string) => string, locale: string }
*/
export async function getI18n() {
    const { messages, locale } = await getI18nConfig();

    const t = (key: string) => {
        return messages[key] || key;
    };

    return { t, locale };
}