import React, { Component } from "react";
import { get } from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';
import { routeListURL } from '../../utilities/Utility';
import { fetchRoutes, updateRoutes } from '../../store/actions/index';
import Header from '../../components/UI/Header';
import Map from "../../components/BaseMap/Map";
import Panel from "../../containers/Panel/Panel";

class Dashboard extends Component {
    componentDidMount() {
        // init with 5 routes
        get(routeListURL)
            .then(res => {
                if (res.status !== 200) return;
                const routes = _.get(res, 'data.route')
                if (routes){
                    this.props.fetchRoutes(routes)
                    const first5Routes = _.map(_.take(routes, 5), route => (route.tag))
                    this.props.updateRoutes(first5Routes)
                }
            })
    }

    render() {
        return(
            <div className="dashboard">
                <Header />
                <Map/>
                <Panel/>
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchRoutes,
    updateRoutes
}

export default connect(null, mapDispatchToProps)(Dashboard)