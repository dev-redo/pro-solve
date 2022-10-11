module.exports = {
  exclude: [/node_modules[\\\/]core-js/, /node_modules[\\\/]webpack[\\\/]buildin/],
  presets: [
    ['@babel/preset-env', { modules: false }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    "@babel/preset-typescript"
  ],
  plugins: [
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    development: {
      plugins: ['babel-plugin-styled-components'],
    },
    production: {
      only: ['src'],
      plugins: [
        ['transform-react-remove-prop-types', { removeImport: true }],
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
  },
};
