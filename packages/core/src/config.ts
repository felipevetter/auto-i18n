import fs from "fs";
import path from "path";
import ora from "ora";
const configPath = path.join(process.cwd(), "auto-i18n.config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

export function readConfig(key: string) {
    return config[key];
}

export async function createConfig() {
    const spinner = ora('Criando arquivos de configuração...').start();
    const defaultConfig = {
        $schema: `https://unpkg.com/@scpa/auto-i18n-core@latest/schema.json`,
        sourceLang: "pt",
        targetLangs: ["en", "es"],
        provider: "openai",
        model: "gpt-3.5-turbo",
        files: ["src/**/*.tsx", "src/**/*.ts"]
    };

    await fs.promises.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
    spinner.succeed();
}