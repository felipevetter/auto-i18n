import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        cli: 'src/cli/index.ts',
        'core/index': 'src/core/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    splitting: true,
    sourcemap: true,
    minify: false,
});
