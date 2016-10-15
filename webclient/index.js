'use strict';

// Work around https://github.com/lodash/lodash/issues/1798;
// TODO: Update lodash. This is no longer required in the new version (I think)
require('lodash').noConflict();

const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const store = require('./store');
const socket = require('./socket');
const Root = require('./containers/root/root');

// Include styles.
require('./styles/presets.scss');

socket.on('open', () => {
  console.log('Open socket');
});

socket.on('message', store.dispatch);
socket.on('close', () => {});

// Only include devtools in development.
const DevTools = global.buildFlags.isDevEnv ?
  require('./components/devtools/devtools') : null;

ReactDOM.render((
  <Provider store={store}>
    <Root>
      {DevTools ? <DevTools /> : null}
    </Root>
  </Provider>
), document.getElementById('app'));

