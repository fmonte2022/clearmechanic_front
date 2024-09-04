import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from "path";

import type { InlineConfig } from 'vitest';
import type { UserConfig } from 'vite';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
    build: {
        outDir: 'build',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: true,
        alias: {
            '~': '/src',
        },
    },
    resolve: {
        alias: {
          '~': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [react(), viteTsconfigPaths()]
} as VitestConfigExport);