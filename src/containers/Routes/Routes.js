import React from "react";
import { connect } from 'react-redux';
import { get } from 'lodash';
import Route from '../../components/Route/Route';
import { updateCache, updateDetails } from '../../store/actions/index';

const Routes = (props) => (
    <g>
        { props.currentRoutes.map((route, i)=>{
            // get the cacheRoute if there is one, so we don't call API again
            const cacheRoute = props.cacheRoutes[route] || null
            return (
            <Route key={`route-${i}`} 
                route={route} 
                updateCache={props.updateCache} 
                cacheRoute={cacheRoute}
                updateDetails={props.updateDetails} 
                />
        )})}
    </g>
)

const mapStateToProps = (state) => ({
    currentRoutes: get(state, 'currentRoutes', []),
    cacheRoutes: get(state, 'cacheRoutes', {})
})

const mapDispatchToProps = {
    updateCache,
    updateDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);