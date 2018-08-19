const getClientEnvironment = require('../lib/env');
const webpack              = require('webpack');
const config               = require('./index');
const env                  = getClientEnvironment(config.server.getUrl());
const Visualizer           = require('webpack-visualizer-plugin');
const path                 = require('path');

module.exports = (nextWebpackConfig) => {
  nextWebpackConfig.node = {
    fs: 'empty',
  };

  if (nextWebpackConfig.resolve.alias) {
    delete nextWebpackConfig.resolve.alias.react;
    delete nextWebpackConfig.resolve.alias['react-dom'];
  }

  // Add source map for prod
  if (nextWebpackConfig.devtool === false && config.enableSourceMap === true) {
    nextWebpackConfig.devtool = 'source-map';
  }

  // Ask babel to compile all route files instead of just "client"
  nextWebpackConfig.module.rules.forEach(r => {
    if (r.use && r.use.loader === 'next-babel-loader') {
      r.include = [path.resolve(__dirname + '/..')];
    }
  });

  return ({
    devtool: nextWebpackConfig.devtool,
    name: nextWebpackConfig.name,
    devServer: { quiet: true, noInfo: true, stats: 'errors-only' },
    cache: nextWebpackConfig.cache,
    target: nextWebpackConfig.target,
    externals: nextWebpackConfig.externals,
    context: nextWebpackConfig.context,
    entry: nextWebpackConfig.entry,
    output: nextWebpackConfig.output,
    performance: nextWebpackConfig.performance,
    resolve: nextWebpackConfig.resolve,
    resolveLoader: nextWebpackConfig.resolveLoader,
    module: {
      rules: [
        ...nextWebpackConfig.module.rules,
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      ...nextWebpackConfig.plugins,
      new webpack.DefinePlugin(env.stringified),
      new Visualizer(),
    ],
  });
};