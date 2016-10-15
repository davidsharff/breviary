'use strict';

const {createStore, compose, applyMiddleware} = require('redux');
const {syncHistory} = require('react-router-redux');
const _ = require('lodash');

const constants = require('shared/constants');

const history = require('./history');
const reducer = require('./app-state-reducer');

const initialState = {
  app: {
    codingTypes: _.values(constants.CODING_TYPES),
    codingParameters: [
      {type: constants.CODING_TYPES.YES_NO, label: 'Conflict?'},
      {type: constants.CODING_TYPES.YES_NO, label: 'Mentions Cats?'}
    ]
  },
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