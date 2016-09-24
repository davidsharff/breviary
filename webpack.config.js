/*eslint-env node */
'use strict';

const path = require('path');
const SplitByPathPlugin = require('webpack-split-by-path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const args = require('./webpack-args');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './webclient/index.js')
  },
  output: {
    path: path.join(__dirname, 'webclient-dist/static'),
    publicPath: '/static/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'webclient/styles'),
      assets: path.resolve(__dirname, 'webclient/assets')
    }
  },
  plugins: [
    new SplitByPathPlugin([
      {
        name: 'vendor',
        path: /.*\/node_modules\/.*\.(js|json)$/
      }
    ]),
    new webpack.DefinePlugin({
      // Use string substitution so the minifier will remove unused code.
      // Some libraries (React, Redux, etc.) look at process.env.NODE_ENV,
      // so we supply it. `global.buildFlags` is nicer so we supply that
      // for our own use.
      'process.env': {
        NODE_ENV: `"${(args.isDevEnv ? 'development' : 'production')}"`
      },
      'global.buildFlags': {
        isDevEnv: args.isDevEnv ? 'true' : 'false'
      }
    }),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: './webclient/index.html',
      filename: '../index.html',
      hash: true
    }),
    ...(args.isDevEnv
      ? [
        new webpack.SourceMapDevToolPlugin()
      ]
      : [
        new webpack.optimize.UglifyJsPlugin(),
        new CompressionPlugin({
          asset: '{file}',
          test: /\.js$|\.html|\.css$/ // Must match server pattern
        })
      ]
    )
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader?modules&localIdentName=[local]--[hash:base64:5]!sass')
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        query: { // Babel config options
          plugins: [
            'babel-plugin-transform-es2015-destructuring',
            'transform-es2015-parameters',
            'transform-decorators-legacy', // Must go before class properties.
            'transform-class-properties',
            'transform-object-rest-spread'
          ],
          presets: [
            'react',
            ...(
              args.target === 'compatible' ? ['es2015'] : []
            )
          ]
        }
      }
    ]
  }
};