import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');

export default [
  // UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'ENSTooltip',
      file: packageJson.main,
      format: 'umd',
      globals: {
        ethers: 'ethers'
      }
    },
    external: ['ethers'],
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        extract: true,
        minimize: true
      }),
      terser()
    ]
  },
  // ESM build
  {
    input: 'src/index.js',
    output: {
      file: packageJson.module,
      format: 'es'
    },
    external: ['ethers'],
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        extract: true,
        minimize: true
      })
    ]
  }
]; 