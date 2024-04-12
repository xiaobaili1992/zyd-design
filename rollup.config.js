import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/index-es.js',
    format: 'es'
  }, {
    file: 'dist/index.js',
    format: 'umd',
    name: 'libBuild'
  }],
  plugins: [
    resolve(),
    commonjs(),
    vue({
      compileTemplate: true,
      css: true
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@vue/babel-preset-jsx'
      ]
    }),
    terser()
  ],
  external: ['vue', 'element-ui']
}
