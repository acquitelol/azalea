import { nodeResolve } from '@rollup/plugin-node-resolve';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { defineConfig, Plugin, RollupOptions } from 'rollup';
import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';

import json from '@rollup/plugin-json';
import esbuild from 'rollup-plugin-esbuild';
import commonjs from 'rollup-plugin-commonjs';
import obfuscator, { ObfuscatorOptions } from 'javascript-obfuscator';

const obfuscateCode = (options?: ObfuscatorOptions): Plugin => ({
    name: 'javascript-obfuscator',
    transform(code) {
        const obfuscationResult = obfuscator.obfuscate(code, options);

        return {
            code: obfuscationResult.getObfuscatedCode()
        };
    }
});

const copyExtension = (): Plugin => ({
    name: 'copy-extension',
    generateBundle() {
        !existsSync('dist') && mkdirSync('dist');

        switch (process.platform) {
            case 'win32':
                execSync('copy extension\\* dist\\');
                break;
            default:
                execSync('cp -rf extension/* dist/');
        }
    }
})

const defineExtendedConfig = (options: RollupOptions) => defineConfig({
    onwarn(warning, warn) {
        if (['MISSING_NAME_OPTION_FOR_IIFE_EXPORT', 'EVAL'].includes(warning.code)) return;
        warn(warning);
    },

    watch: {
        exclude: [
            'dist/*',
            'dist',
            'rollup.config-*.mjs',
            'package.json'
        ]
    },

    ...options
})

export default [
    defineExtendedConfig({
        input: 'src/index.ts',

        output: [
            {
                file: 'dist/index.js',
                format: 'iife',
                inlineDynamicImports: true,
                strict: false,
            }
        ],

        plugins: [
            typescriptPaths({
                preserveExtensions: true,
                nonRelative: process.platform === 'darwin' ? false : true
            }),
            esbuild({ minify: true, target: 'ES2020' }),
            obfuscateCode()
        ]
    }),
    defineExtendedConfig({
        input: 'src/intermediate.ts',

        output: [
            {
                file: 'dist/intermediate.js',
                format: 'iife',
                inlineDynamicImports: true,
                strict: false,
            }
        ],

        plugins: [
            typescriptPaths({
                preserveExtensions: true,
                nonRelative: process.platform === 'darwin' ? false : true
            }),
            esbuild({ minify: true, target: 'ES2020' }),
            obfuscateCode()
        ]
    }),
    defineExtendedConfig({
        input: 'src/entry/index.ts',

        output: [
            {
                file: 'dist/bundle.js',
                format: 'iife',
                inlineDynamicImports: true,
                strict: false,
            }
        ],

        plugins: [
            typescriptPaths({
                preserveExtensions: true,
                nonRelative: process.platform === 'darwin' ? false : true
            }),
            nodeResolve(),
            commonjs(),
            json(),
            esbuild({ minify: true, target: 'ES2020' }),
            obfuscateCode(),
            copyExtension()
        ]
    }),
]