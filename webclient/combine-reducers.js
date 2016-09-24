'use strict';

const _ = require('lodash');
const TypedError = require('typed-error');

function combineReducers(reducersObj) {
  return function(state, action) {
    if(typeof state === 'undefined') {
      throw new NoInitialStateError();
    }
    return _.mapValues(reducersObj, (reducer, key) => {
      if(typeof state[key] === 'undefined') {
        throw new NoInitialStateError(state[key]);
      }
      return reducer(state[key], action, state /*top level*/);
    });
  };
}

module.exports = combineReducers;

class NoInitialStateError extends TypedError {
  constructor(reducerType) {
    let message = reducerType ?
      `The "${reducerType}" reducer expects an initial state` :
      `Reducer expects an initial state`;
    super(message);
  }
}