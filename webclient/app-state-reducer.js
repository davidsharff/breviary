'use strict';

const combineReducers = require('./combine-reducers');
const {routeReducer} = require('react-router-redux');

function reducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

module.exports = combineReducers({
  main: reducer,
  routing: routeReducer
});