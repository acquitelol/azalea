import { nodeResolve } from '@rollup/plugin-node-resolve';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { defineConfig } from "rollup";
import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';

import json from '@rollup/plugin-json';
import esbuild from "rollup-plugin-esbuild";
import commonjs from "rollup-plugin-commonjs";

// Move everything else related to the extension like manifest, assets, etc
!existsSync("dist") && mkdirSync("dist");
execSync("cp -rf extension/* dist/");

export default [
    defineConfig({
        input: 'src/index.ts',
    
        output: [
            {
                file: "dist/index.js",
                format: 'iife',
                inlineDynamicImports: true,
                strict: false,
            }
        ],
    
        plugins: [
            esbuild({ minify: true, target: "ES2020" })
        ],
    
        onwarn(warning, warn) {
            if (warning.code === "MISSING_NAME_OPTION_FOR_IIFE_EXPORT") return;
            warn(warning);
        }
    }),
    defineConfig({
        input: 'src/entry.ts',
    
        output: [
            {
                file: "dist/bundle.js",
                format: 'iife',
                inlineDynamicImports: true,
                strict: false,
            }
        ],
    
        plugins: [
            typescriptPaths({ preserveExtensions: true, nonRelative: false }),
            nodeResolve(),
            commonjs(),
            json(),
            esbuild({ minify: true, target: "ES2020" })
        ],
    
        onwarn(warning, warn) {
            if (warning.code === "MISSING_NAME_OPTION_FOR_IIFE_EXPORT") return;
            warn(warning);
        }
    }),
]