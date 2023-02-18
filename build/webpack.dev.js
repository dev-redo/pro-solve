const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [new HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/inline',
      },
    ],
  },
};
