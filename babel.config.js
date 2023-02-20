module.exports = {
  presets: [
    ['@babel/preset-env', { targets: '> 0.25%' }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    '@babel/plugin-syntax-dynamic-import',
  ],
};
