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

// Fix: Storybook build시 오류 발생하는 설정 (env field 문제)
// module.exports = {
//   presets: [
//     ['@babel/preset-env', { targets: '> 0.25%' }],
//     ['@babel/preset-react', { runtime: 'automatic' }],
//     '@babel/preset-typescript',
//   ],
//   plugins: [
//     ['@babel/plugin-transform-runtime', { corejs: 3 }],
//     '@babel/plugin-syntax-dynamic-import',
//     'babel-plugin-styled-components',
//   ],
//   env: {
//     production: {
//       only: ['src'],
//       plugins: [
//         ['babel-plugin-styled-components', { displayName: false }],
//         'transform-react-remove-prop-types',
//         '@babel/plugin-transform-react-inline-elements',
//         '@babel/plugin-transform-react-constant-elements',
//       ],
//     },
//   },
// };
