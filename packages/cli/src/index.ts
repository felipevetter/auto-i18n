import { saudar } from '@scpa/auto-i18n-core';
import { Command } from 'commander';
const program = new Command();

program
  .name('@scpa/auto-i18n')
  .description('CLI para geração de arquivos e tradução automática de arquivos tsx');

program
  .command('run')
  .argument('[nome]', 'nome para saudar')
  .action((nome) => {
    console.log(saudar(nome || 'Mundo'));
  });

program.parse();