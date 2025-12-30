'use client';

// @ts-ignore
import React, { createContext, useContext, useState, ReactNode } from 'react';
// @ts-ignore
import { useRouter } from 'next/navigation';

type I18nContextType = {
    locale: string;
    messages: Record<string, string>;
    t: (key: string) => string;
    setLocale: (newLocale: string) => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
    children,
    locale: initialLocale,
    messages: initialMessages
}: {
    children: ReactNode;
    locale: string;
    messages: Record<string, string>;
}) {
    const [locale, setLocaleState] = useState(initialLocale);
    const [messages, setMessages] = useState(initialMessages);
    const router = useRouter();

    React.useEffect(() => {
        setLocaleState(initialLocale);
        setMessages(initialMessages);
    }, [initialLocale, initialMessages]);

    const t = (key: string) => {
        return messages[key] || key;
    };

    const setLocale = (newLocale: string) => {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
        setLocaleState(newLocale);
        router.refresh();
    };

    return (
        <I18nContext.Provider value={{ locale, messages, t, setLocale }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n deve ser usado dentro de um I18nProvider');
    }
    return context;
}