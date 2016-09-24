'use strict';

const path = require('path');
const http = require('http');
const WebSocketServer = require('ws').Server;
const express = require('express');
const {getArgs} = require('./args');
const DIST_PATH = path.resolve(__dirname, '../webclient-dist/');

const app = express();

if (!getArgs().isDevEnv) {
  app.use(/\/static\/.*\.(js|css|html)(\?.*)?$/, (req, res, next) => {
    res.set('Content-Encoding', 'gzip');
    next();
  });
}

// Serve static files.
app.use('/static/', express.static(path.join(DIST_PATH, 'static'), {
  index: false
}));

// Serve SPA index file.
app.use('/', (req, res) => {
  res.sendFile(path.resolve(DIST_PATH, 'index.html'));
});

// Create WebSocket server.
const server = http.createServer();
const wss = new WebSocketServer({ server: server });
wss.on('connection', (ws) => console.log('new connection: ') || ws);

// Listen.
server.on('request', app);
server.listen(getArgs().port, function () {
  console.log(`Listening on ${server.address().port}.`);
});