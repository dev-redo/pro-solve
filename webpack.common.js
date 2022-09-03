/* eslint-env es6 */
const path = require('path');
const getAbsolutePath = pathDir => path.resolve(__dirname, pathDir);
const getHtmlPlugins = chunks => {
  return chunks.map(
    chunk =>
      new HtmlPlugin({
        title: 'React Extension',
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
    newtab: getAbsolutePath('src/pages/NewTab/index.tsx'),
    popup: getAbsolutePath('src/pages/Popup/index.tsx'),
    background: getAbsolutePath('src/pages/Background/index.ts'),
    testContent: getAbsolutePath('src/pages/Content/testPage.ts'),
    solutionContent: getAbsolutePath('src/pages/Content/solutionPage.ts'),
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
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[ext]',
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
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
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
      path: '.env.local',
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: getAbsolutePath('src/static'),
          to: getAbsolutePath('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['popup']),
  ],
};
