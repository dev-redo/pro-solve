const { ESBuildMinifyPlugin } = require('esbuild-loader');
const CopyPlugin = require('copy-webpack-plugin');

const APP_PATH = require('./app-paths');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: APP_PATH('src/static'),
          to: APP_PATH('dist'),
          globOptions: {
            ignore: ['**/*.md'],
          },
        },
      ],
    }),
  ],
};
