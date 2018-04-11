import * as actionTypes from './actionTypes';

export const fetchRoutes = (routes) => ({
    type: actionTypes.FETCH_ROUTE_LIST,
    payload: routes
})