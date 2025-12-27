import ora from "ora";
import { Node, Project, SyntaxKind } from "ts-morph";
import { readConfig } from "./config.js";
import { cleanJsonResponse, createExtractionPrompt, createTranslationPrompt, lerJson, salvarJson, type ExtractionItem } from "./utils.js";
import { askLLM } from "./ai.js";
import chalk from "chalk";
import { ensureI18nImport } from "./dependecies.js";

interface JsonTranslation {
    [key: string]: string;
}

export async function scanFilesAndRun() {
    const sourceLang = readConfig('sourceLang') || 'pt';
    const targetLangs = readConfig('targetLangs') || ['en'];
    const localesDir = readConfig('localesDir') || './locales';

    const pendentes: { node: Node, text: string }[] = [];
    const stringsUnicas = new Set<string>();
    const novasChavesParaSalvar: Record<string, string> = {};
    const mapaTextoParaChave: Record<string, string> = {};

    const project = new Project({
        skipAddingFilesFromTsConfig: true,
    });

    const spinner = ora("📂 Carregando e analisando arquivos...").start();
    project.addSourceFilesAtPaths(readConfig("files"));

    const arquivos = project.getSourceFiles();

    for (const arquivo of arquivos) {
        const shouldInject = readConfig("autoInject") || false;
        if(shouldInject) {
            ensureI18nImport(arquivo);
        }
        arquivo.forEachDescendant((node) => {
            if (node.getKind() === SyntaxKind.JsxText) {
                const textoOriginal = node.getText();
                if (textoOriginal.trim().length > 0) {
                    pendentes.push({ node, text: textoOriginal.trim() });
                    stringsUnicas.add(textoOriginal.trim());
                }
            }
        });
    }

    //pluralização elegante
    const fileCount = arquivos.length;
    const strCount = stringsUnicas.size;
    const sFiles = fileCount === 1 ? '' : 's';
    const sStr = strCount === 1 ? '' : 's';
    spinner.succeed(`Encontrado(s) ${chalk.cyan(strCount)} texto${sStr} único${sStr} em ${chalk.cyan(fileCount)} arquivo${sFiles}.`);
    const spinnerLLM = ora(`🧠 Gerando chaves inteligentes para ${strCount} textos...`).start();
    const listaParaIA = Array.from(stringsUnicas).map((text, index) => ({
        id: index,
        text
    })) as ExtractionItem[];

    const respostaIA = JSON.parse(cleanJsonResponse(await askLLM(createExtractionPrompt(listaParaIA), 'json')));

    respostaIA.forEach((item: any) => {
        const originalText = listaParaIA.find(l => l.id === item.id)?.text;
        if (originalText) mapaTextoParaChave[originalText] = item.key;
    });

    pendentes.forEach(({ node, text }) => {
        const key = mapaTextoParaChave[text];
        if (key) {
            node.replaceWithText(`{t('${key}')}`);
        }
    });
    project.saveSync();
    spinnerLLM.succeed(chalk.green("Código atualizado com as novas chaves i18n!"));

    const spinnerSave = ora("💾 Gerando arquivos de tradução...").start();

    for (const [textoOriginal, chaveGerada] of Object.entries(mapaTextoParaChave)) {
        novasChavesParaSalvar[chaveGerada] = textoOriginal;
    }

    const pathPt = `${localesDir}/${sourceLang}.json`;
    const jsonPtAtual = lerJson(pathPt);
    const jsonPtFinal = { ...jsonPtAtual, ...novasChavesParaSalvar };

    salvarJson(pathPt, jsonPtFinal);

    // Salvar em outros idiomas
    for (const idioma of targetLangs) {
        const pathIdioma = `${localesDir}/${idioma}.json`;
        const jsonIdiomaAtual = lerJson(pathIdioma) as JsonTranslation;

        const deltaParaTraduzir: Record<string, string> = {};

        for (const [key, value] of Object.entries(novasChavesParaSalvar)) {
            if (!jsonIdiomaAtual[key]) {
                deltaParaTraduzir[key] = value;
            }
        }

        if (Object.keys(deltaParaTraduzir).length > 0) {
            const prompt = createTranslationPrompt(deltaParaTraduzir, sourceLang, idioma);

            const respostaIA = cleanJsonResponse(await askLLM(prompt, 'json'));
            const traducoesEn = JSON.parse(respostaIA);

            const jsonIdiomaFinal = { ...jsonIdiomaAtual, ...traducoesEn };
            salvarJson(pathIdioma, jsonIdiomaFinal);
        }
    }

    spinnerSave.succeed('Tradução concluída e chaves salvas com sucesso!');
}