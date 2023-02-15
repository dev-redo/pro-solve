module.exports = {
  presets: [
    ['@babel/preset-env', { targets: '> 0.25%' }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-arrow-functions',
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
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
