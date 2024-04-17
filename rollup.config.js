import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import vue from 'rollup-plugin-vue';
// import serve from 'rollup-plugin-serve';
// import livereload from 'rollup-plugin-livereload';

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
    
    vue({
      compileTemplate: true,
      css: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@vue/babel-preset-jsx'
      ],
      plugins: [
        '@babel/plugin-proposal-optional-chaining'
      ]
    }),
    resolve(),
    commonjs(),
    terser(),
    // serve({
    //   open: true,
    //   contentBase: ['dist'], // 'public' 目录包含 index.html
    //   host: 'localhost',
    //   port: 3000
    // }),
    // livereload('dist')
  ],
  external: ['vue', 'element-ui']
}
