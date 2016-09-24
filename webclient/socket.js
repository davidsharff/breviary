'use strict';

const ws = new window.WebSocket(`ws://${window.location.host}`);
const ee = require('event-emitter');
const _ = require('lodash');

const socket = ee({
  send: function(message) {
    if (message instanceof Object || message instanceof Array) {
      message = JSON.stringify(message);
    } else if (!_.isString(message)){
      throw new Error('Messages sent to a websocket should be Objects, Arrays, or strings');
    }
    ws.send(message);
  },
  close: () => ws.close()
});

ws.onmessage = (message) => socket.emit('message', JSON.parse(message.data));
ws.onopen  = () => socket.emit('open');
ws.onclose = () => socket.emit('close');

module.exports = socket;