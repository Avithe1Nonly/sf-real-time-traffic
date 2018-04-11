import * as actionTypes from '../actions/actionTypes';

export default function(state = {} , action) {
  switch (action.type) {
    case actionTypes.UPDATE_DETAILS:
        return action.payload
    default:
        return state;
  }
};