'use strict';

const {createStore, compose, applyMiddleware} = require('redux');
const {syncHistory} = require('react-router-redux');

const history = require('./history');
const reducer = require('./app-state-reducer');

const initialState = {
  main: {},
  routing: null
};

const reduxRouterMiddleware = syncHistory(history);

const devStoreEnhancers = global.buildFlags.isDevEnv ? [
  require('./components/devtools/devtools').instrument()
] : [];

const storeEnhancers = [
  applyMiddleware(
    reduxRouterMiddleware
  ),
  ...devStoreEnhancers
];

const store = compose(...storeEnhancers)(createStore)(reducer, initialState);

reduxRouterMiddleware.listenForReplays(store);

module.exports = store;