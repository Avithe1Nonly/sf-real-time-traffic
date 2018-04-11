import * as actionTypes from '../actions/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case actionTypes.UPDATE_CACHE_ROUTES:
        return {...state, ...action.payload}
    default:
        return state;
  }
};