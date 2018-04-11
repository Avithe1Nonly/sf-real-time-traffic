import React, { Component } from "react";
import { get } from "axios";
import _ from "lodash";
import { feature } from 'topojson-client';
import { routeConfigFunc } from '../../utilities/Utility';
import Vehicles from '../Vehicles/Vechiles';
import BusStop from '../BusStop/BusStop';

class Route extends Component {
    constructor() {
        super()
        this.state = {
          geographyPaths: [],
          color: "#000",
          showVehicle: true,
          strokeWidth: 0.5,
          size: "20px"
        }
    }
    
    componentDidMount() {
        this.loadPaths()
    }

    loadPaths = () => {
        if (this.props.cacheRoute) {
            const cacheRoute = this.props.cacheRoute
            this.setState({ geographyPaths: cacheRoute.geographyPaths, color: cacheRoute.color })
        } else {
            get(routeConfigFunc(this.props.route))
            .then(res => {
                if (res.status !== 200) return
                const stops =  _.get(res, 'data.route.stop')
                const color = _.get(res, 'data.route.color')
                if (!stops || !color) return
                const featureStops = _.map(stops, stop => this.parseStop(stop))
                const geographyPaths = featureStops
                this.setState({ geographyPaths, color: `#${color}` })
                const cache = {}
                cache[this.props.route] = { geographyPaths, color: `#${color}` }
                this.props.updateCache(cache)
            })
        }
    }

    parseStop = (stop) => {
        const stopObject = {
            type:"Point", 
            properties:{title:stop.title}, 
            coordinates:[stop.lon/1, stop.lat/1, 0]
        }
        return feature({type: "Topology", objects: stopObject}, stopObject);
    }

    handleMouseOver= () => {
        this.setState({
            strokeWidth: 5,
            size: "25px"
        })
    }

    handleMouseOut= () => {
        this.setState({
            strokeWidth: 0.5,
            size: "20px",
        })
    }

    render() {
        return(
            <g className="routeVehicle" 
            onMouseOver = { this.handleMouseOver }
            onMouseOut = { this.handleMouseOut }>
                <g className="routeStops">{
                    this.state.geographyPaths.map((d,i) => (
                        <BusStop key={ `busStop_`+ i } 
                            strokeWidth={ this.state.strokeWidth }
                            color={ this.state.color }
                            d={ d }
                            route={ this.props.route }
                            updateDetails={ this.props.updateDetails }
                        />
                    )
                )
                }
                </g>
                <g className="vehicles">
                    { this.state.showVehicle && <Vehicles route={this.props.route} 
                    color={this.state.color} 
                    size={this.state.size} 
                    updateDetails={this.props.updateDetails}/>}
                </g>
            </g>
        )
    }
}

export default Route;