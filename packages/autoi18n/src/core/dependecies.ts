import { SourceFile } from "ts-morph";

export function ensureI18nImport(sourceFile: SourceFile) {
    const importDeclaration = sourceFile.getImportDeclaration("react-i18next");
    
    if (!importDeclaration) {
        sourceFile.addImportDeclaration({
            moduleSpecifier: "react-i18next",
            namedImports: ["useTranslation"]
        });
    } else {
        const namedImports = importDeclaration.getNamedImports().map(i => i.getName());
        if (!namedImports.includes("useTranslation")) {
            importDeclaration.addNamedImport("useTranslation");
        }
    }
}