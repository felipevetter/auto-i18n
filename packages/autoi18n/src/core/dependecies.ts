import { SourceFile, SyntaxKind } from "ts-morph";
import { readConfig } from "./config.js";

export function ensureI18nImport(sourceFile: SourceFile) {
    const isClientFile = sourceFile.getStatementsWithComments()
        .some(s => s.getText().includes("'use client'") || s.getText().includes('"use client"'));

    const i18nLibBase = readConfig("i18nLibrary") || "@scopeact/autoi18n";
    let targetModule = i18nLibBase;
    let functionToInject = "";

    if (i18nLibBase === "@scopeact/autoi18n") {
        targetModule = isClientFile ? "@scopeact/autoi18n/client" : "@scopeact/autoi18n/server";
        functionToInject = isClientFile ? "useI18n" : "getI18n";
    } else {
        const legacyMap: any = { 'react-i18next': 'useTranslation', 'next-intl': 'useTranslations' };
        functionToInject = legacyMap[i18nLibBase];
    }

    let importDeclaration = sourceFile.getImportDeclaration(targetModule);

    if (!importDeclaration) {
        sourceFile.addImportDeclaration({
            moduleSpecifier: targetModule,
            namedImports: [functionToInject]
        });
    } else {
        if (!importDeclaration.getNamedImports().some(i => i.getName() === functionToInject)) {
            importDeclaration.addNamedImport(functionToInject);
        }
    }

    sourceFile.getFunctions().forEach(fn => {
        const isComponent = fn.getDescendantsOfKind(SyntaxKind.JsxElement).length > 0;
        if (!isComponent) return;

        if (isClientFile) {
            if (!fn.getText().includes(functionToInject)) {
                fn.insertStatements(0, `const { t } = ${functionToInject}();`);
            }
        } else {
            if (!fn.getText().includes(functionToInject)) {
                fn.setIsAsync(true);
                fn.insertStatements(0, `const { t } = await ${functionToInject}();`);
            }
        }
    })
}