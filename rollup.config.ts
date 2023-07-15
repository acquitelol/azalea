import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from "rollup-plugin-esbuild";
import commonjs from "rollup-plugin-commonjs";
import { defineConfig } from "rollup";
import { execSync } from 'child_process';

// Move everything else related to the extension like manifest, assets, etc
execSync("mkdir dist && cp -rf extension/* dist/");

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
    
        plugins: [esbuild({ minify: true, target: "ES2020" })],
    
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
            nodeResolve(),
            commonjs(),
            esbuild({ minify: false, target: "ES2020" })
        ],
    
        onwarn(warning, warn) {
            if (warning.code === "MISSING_NAME_OPTION_FOR_IIFE_EXPORT") return;
            warn(warning);
        }
    }),
]