const getClientEnvironment = require('./env');
const webpack              = require('webpack');
const config               = require('./index');
const env                  = getClientEnvironment(config.server.url);

module.exports = (nextWebpackConfig) => {
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
      rules: [...nextWebpackConfig.module.rules, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }],
    },
    plugins: [
      ...nextWebpackConfig.plugins,
      new webpack.DefinePlugin(env.stringified),
    ],
  });
};