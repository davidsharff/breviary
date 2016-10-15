'use strict';

const {routeReducer} = require('react-router-redux');
const _ = require('lodash');
const combineReducers = require('./combine-reducers');
const localActionTypes = require('./local-action-types');

function reducer(state, action) {
  const {type, payload} = action;

  switch (type) {

    case localActionTypes.SUBMIT_NEW_CODING_PARAMETER: {
      const {type, label} = payload;
      return _.assign({}, state, {
        codingParameters: [
          ...state.codingParameters,
          {
            type,
            label
          }
        ]
      });
    }

    default:
      return state;
  }
}

module.exports = combineReducers({
  app: reducer,
  routing: routeReducer
});