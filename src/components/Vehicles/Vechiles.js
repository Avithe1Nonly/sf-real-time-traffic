import React, { Component } from "react";
import { get } from "axios";
import _ from "lodash";
import { feature } from 'topojson-client';
import { vehicleLocFunc, refreshTime } from '../../utilities/Utility';
import Vehicle from './Vehicle/Vechile';

class Vehicles extends Component {
    constructor() {
        super()
        this.state = {
          geographyPaths: [],
        }
    }
    
    componentDidMount() {
        this.loadPaths();
        this.timer = setInterval(this.loadPaths.bind(this), refreshTime);
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    loadPaths = () => {
        const showTime = new Date().getTime() - 1000 * 60; 
        const Link = vehicleLocFunc(this.props.route, showTime)
        get(Link)
            .then(res => {
                if (res.status !== 200) return;
                const vehicles =  _.get(res, 'data.vehicle');
                if(!vehicles || !_.isArray(vehicles)) return;
                const predictableVehicles = vehicles.filter(vehicle => vehicle.predictable === "true")
                const featureVehicle = _.map(predictableVehicles, vehicle => this.parseVehicle(vehicle));
                const geographyPaths = featureVehicle;
                this.setState({ geographyPaths })
            })
    }

    parseVehicle = (vehicle) => {
        const vehicleObject = {
            type:"Point", 
            properties:{heading:vehicle.heading}, 
            coordinates:[vehicle.lon/1, vehicle.lat/1, 0]
        }
        return feature({type: "Topology", objects: vehicleObject}, vehicleObject);
    }

    handleMouseOver = (d) => {
        const details = {
            type: "Muni", 
            route: this.props.route, 
            busTag: d.properties.heading,
            stopName: null, 
            color:this.props.color || null
        }
        if(this.props.updateDetails) {
            this.props.updateDetails(details)
        }
    }

    render() {
        return(
            <g className="vehicles">
            {
                this.state.geographyPaths.map((d,i) => (
                    <Vehicle key={ i } 
                    color={ this.props.color }
                    size={ this.props.size }
                    d={ d } 
                    route={ this.props.route }
                    updateDetails={ this.props.updateDetails } />
                ))
            }
            </g>
        )
    }
}

export default Vehicles;