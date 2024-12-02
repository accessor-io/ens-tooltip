import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/ens-tooltip.js',
            format: 'umd',
            name: 'ENSTooltip',
            globals: {
                ethers: 'ethers'
            }
        },
        {
            file: 'dist/ens-tooltip.min.js',
            format: 'umd',
            name: 'ENSTooltip',
            plugins: [terser()],
            globals: {
                ethers: 'ethers'
            }
        }
    ],
    external: ['ethers'],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        })
    ]
}; 
