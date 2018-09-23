const getClientEnvironment = require('../lib/env');
const webpack              = require('webpack');
const config               = require('./index');
const env                  = getClientEnvironment(config.server.getUrl());
const Visualizer           = require('webpack-visualizer-plugin');
const path                 = require('path');

/**
 * This is not a real webpack but un function that make changes to
 * the Next's webpack config.
 */
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

  nextWebpackConfig.plugins = nextWebpackConfig.plugins.map(plugin => {
    if (
      plugin.constructor.name === 'CommonsChunkPlugin' &&
      // disable filenameTemplate checks here because they never match
      // (plugin.filenameTemplate === 'commons.js' ||
      //     plugin.filenameTemplate === 'main.js')
      // do check for minChunks though, because this has to (should?) exist
      plugin.minChunks != null
    ) {
      const defaultMinChunks = plugin.minChunks;
      plugin.minChunks = (module, count) => {
        if (module.resource && module.resource.match(/\.(sass|scss|css)$/)) {
          return true;
        }
        return defaultMinChunks(module, count);
      };
    }
    return plugin;
  });

  return ({
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
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
        {
          test: /\.md$/,
          use: [
            {
              loader: "html-loader"
            },
            {
              loader: "markdown-loader",
              options: {
                /* your options here */
              }
            }
          ]
        }
      ],
    },
    plugins: [
      ...nextWebpackConfig.plugins,
      new webpack.DefinePlugin(env.stringified),
      new Visualizer(),
    ],
  });
};