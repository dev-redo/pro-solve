const path = require('path');

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
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { env } = require('process');

module.exports = {
  entry: {
    popup: APP_PATH('src/pages/popup/index.tsx'),
    background: APP_PATH('src/pages/background/index.ts'),
    testContent: APP_PATH('src/pages/content/testPage.tsx'),
    solutionContent: APP_PATH('src/pages/content/solutionPage.tsx'),
    problemContent: APP_PATH('src/pages/content/problemPage.tsx'),
    profileTab: APP_PATH('src/pages/newTab/profile/index.tsx'),
    solutionTab: APP_PATH('src/pages/newTab/Solution.tsx'),
  },
  output: {
    filename: 'script/[name].js',
    publicPath: './',
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
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
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
    new CopyPlugin({
      patterns: [
        {
          from: APP_PATH('src/static'),
          to: APP_PATH('dist'),
        },
      ],
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', path.resolve(process.cwd(), 'dist/**/*')],
    }),
    ...HTML_PLUGIN([
      { chunk: 'popup', title: '프로솔브 - PopUp 페이지' },
      { chunk: 'solutionTab', title: '프로솔브 - 문제 풀이 페이지' },
      { chunk: 'profileTab', title: '프로솔브 - 나의 풀이 페이지' },
    ]),
  ],
};
