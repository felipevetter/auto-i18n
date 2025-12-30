import fs from "fs";
import path from "path";
import ora from "ora";

const configPath = path.join(process.cwd(), "auto-i18n.config.json");

export function readConfig(key: string) {
    if (!fs.existsSync(configPath)) {
        createConfig();
    }
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return config[key];
}

export function createConfig() {
    const spinner = ora('Criando arquivos de configuração...').start();
    const defaultConfig = {
        $schema: `https://unpkg.com/@scopeact/autoi18n@latest/schema.json`,
        sourceLang: "pt",
        targetLangs: ["en", "es"],
        autoInject: false,
        i18nLibrary: "@scopeact/autoi18n",
        provider: "openai",
        localesDir: "./locales",
        model: "gpt-3.5-turbo",
        files: ["app/**/*.tsx", "components/**/*.tsx"]
    };

    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    spinner.succeed();
}