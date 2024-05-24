

import scss from 'rollup-plugin-scss'

declare module '*.scss';
export default {
    input: "./src/main.tsx",
    output: {
        file: "./build/output.tsx",
        format: 'esm',
        // Removes the hash from the asset filename
        assetFileNames: '[name][extname]'
    },
    plugins: [
        scss() // will output compiled styles to output.css
    ]
}
