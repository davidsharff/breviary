#!/usr/bin/env node
'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config.js');
const livereload = require('livereload');
const args = require('../webpack-args');

const EC_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(EC_DIR, 'webclient-dist');

const compiler = webpack(config);

if (args.isDevEnv) {
  const server = livereload.createServer();
  server.watch(DIST_DIR);
  compiler.watch({
    aggregateTimeout: 0,
    poll: false
  }, log);
} else {
  compiler.run(log);
}

function log(error, stats) {
  console.log(stats.toString({
    hash: false,
    version: false,
    timings: true,
    assets: false,
    chunks: true,
    chunkModules: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    errorDetails: true,
    chunkOrigins: false,
    colors: true
  }));
}