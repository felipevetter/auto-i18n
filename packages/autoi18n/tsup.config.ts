import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        cli: 'src/cli/index.ts',
        'core/index': 'src/core/index.ts',
        server: 'src/runtime/server.ts',
        client: 'src/runtime/client.tsx',
    },
    format: ['esm', 'cjs'],
    external: ['next', 'next/headers', 'next/navigation', 'react', 'react-dom'],
    dts: true,
    clean: true,
    splitting: true,
    sourcemap: true,
    minify: false,
});
