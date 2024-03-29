const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
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
