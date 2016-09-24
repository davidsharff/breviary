'use strict';

const React = require('react');
const createDevTools = require('redux-devtools').createDevTools;
const LogMonitor = require('redux-devtools-log-monitor').default;
const DockMonitor = require('redux-devtools-dock-monitor').default;

const DevTools = createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-m"
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

module.exports = DevTools;