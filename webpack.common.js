/* eslint-env es6 */
const path = require('path');
const getAbsolutePath = pathDir => path.resolve(__dirname, pathDir);
const getHtmlPlugins = chunks => {
  return chunks.map(
    chunk =>
      new HtmlPlugin({
        title: '프로솔브',
        filename: `${chunk}.html`,
        chunks: [chunk],
      }),
  );
};

const Dotenv = require('dotenv-webpack');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    popup: getAbsolutePath('src/pages/popup/index.tsx'),
    background: getAbsolutePath('src/pages/background/index.ts'),
    testContent: getAbsolutePath('src/pages/content/testPage.tsx'),
    solutionContent: getAbsolutePath('src/pages/content/solutionPage.tsx'),
    problemContent: getAbsolutePath('src/pages/content/problemPage.tsx'),
    solutionTab: getAbsolutePath('src/pages/newTab/solution/index.tsx'),
    profileTab: getAbsolutePath('src/pages/newTab/profile/index.tsx'),
  },
  output: {
    filename: 'script/[name].js',
    path: getAbsolutePath('dist'),
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
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
          tsconfigRaw: require('./tsconfig.json'),
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
      '@src': getAbsolutePath('./src'),
      '@assets': getAbsolutePath('./assets'),
    },
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new Dotenv({
      path: '.env',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', path.resolve(process.cwd(), 'dist/**/*')],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: getAbsolutePath('src/static'),
          to: getAbsolutePath('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['popup', 'solutionTab', 'profileTab']),
  ],
};
