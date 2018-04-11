import * as actionTypes from '../actions/actionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_ROUTE_LIST:
        return action.payload ;
    default:
        return state;
  }
};