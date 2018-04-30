const env     = process.env.NODE_ENV;
const webpack = require('webpack');

module.exports = (config) => {
  return ({
    devtool: config.devtool,
    name: config.name,
    devServer: { quiet: true, noInfo: true, stats: 'errors-only' },
    cache: config.cache,
    target: config.target,
    externals: config.externals,
    context: config.context,
    entry: config.entry,
    output: config.output,
    performance: config.performance,
    resolve: config.resolve,
    resolveLoader: config.resolveLoader,
    module: {
      rules: [...config.module.rules, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }],
    },
    plugins: [...config.plugins],
  });
};