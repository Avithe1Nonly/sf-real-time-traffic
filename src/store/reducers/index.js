import { combineReducers } from 'redux';
import routesList from './routesList';
import currentRoutes from './currentRoutes';
import cacheRoutes from './cacheRoutes';
import hoverDetails from './hoverDetails';

export default combineReducers({
    routesList,
    currentRoutes,
    cacheRoutes,
    hoverDetails,
});