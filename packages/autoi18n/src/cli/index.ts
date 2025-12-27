#!/usr/bin/env node

import { run, init } from '../core/index.js';
import { Command } from 'commander';
const program = new Command();

program
  .name('@scopeact/autoi18n')
  .description('CLI para geração de arquivos e tradução automática de arquivos tsx');

program
  .command('run')
  .action(() => {
    run();
  });

program
  .command('init')
  .action(() => {
    init();
  });

program.parse();