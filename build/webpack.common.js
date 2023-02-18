const APP_PATH = require('./app-paths');
const HTML_PLUGIN = chunks => {
  return chunks.map(
    ({ chunk, title }) =>
      new HtmlPlugin({
        title: `${title}`,
        filename: `${chunk}.html`,
        chunks: [chunk],
      }),
  );
};

const Dotenv = require('dotenv-webpack');
const HtmlPlugin = require('html-webpack-plugin');
const { env } = require('process');

module.exports = {
  entry: {
    popup: APP_PATH('src/pages/popup/index.tsx'),
    background: APP_PATH('src/pages/background/index.ts'),
    testContent: APP_PATH('src/pages/content/testPage.tsx'),
    solutionContent: APP_PATH('src/pages/content/solutionPage.tsx'),
    problemContent: APP_PATH('src/pages/content/problemPage.tsx'),
    solutionTab: APP_PATH('src/pages/newTab/solution/index.tsx'),
    profileTab: APP_PATH('src/pages/newTab/profile/index.tsx'),
    memoTab: APP_PATH('src/pages/newTab/memo/index.tsx'),
  },
  output: {
    filename: 'script/[name].[fullhash].js',
    path: APP_PATH('dist'),
  },
  cache: {
    type: env.dev ? 'memory' : 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    idleTimeout: 2000,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'esnext',
          tsconfigRaw: require('../tsconfig.json'),
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@src': APP_PATH('./src'),
      '@assets': APP_PATH('./assets'),
    },
  },
  plugins: [
    new Dotenv({
      path: '.env',
    }),
    ...HTML_PLUGIN([
      { chunk: 'popup', title: '프로솔브 - PopUp 페이지' },
      { chunk: 'solutionTab', title: '프로솔브 - 문제 풀이 페이지' },
      { chunk: 'profileTab', title: '프로솔브 - 나의 풀이 페이지' },
      { chunk: 'memoTab', title: '프로솔브 - 문제 아카이빙 페이지' },
    ]),
  ],
};
