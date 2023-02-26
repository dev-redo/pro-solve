const { merge } = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const commonConfig = require('./build/webpack.common.js');

const optionalPlugin = pluginsArg => {
  const optionalPlugin = [pluginsArg].filter(Boolean);

  return optionalPlugin.map(pluginsArg =>
    require(`./build/optionalPlugin/webpack.${pluginsArg}.js`),
  );
};

module.exports = env => {
  const envConfig = require(`./build/webpack.${env.env}.js`);
  const smp = new SpeedMeasurePlugin();

  const mergedConfig = smp.wrap(
    merge(commonConfig, envConfig, ...optionalPlugin(env.optionalPlugin)),
  );

  return mergedConfig;
};
