import * as actionTypes from './actionTypes';

export const updateCache = (routeFeature) => ({
    type: actionTypes.UPDATE_CACHE_ROUTES,
    payload: routeFeature
});

export const updateRoutes = (route) => ({
    type: actionTypes.UPDATE_CURRENT_ROUTES,
    payload: route
});

export const updateRoute = (route) => ({
    type: actionTypes.UPDATE_CURRENT_ROUTE,
    payload: route
});

export const updateDetails = (details) => ({
    type: actionTypes.UPDATE_DETAILS,
    payload: details
});