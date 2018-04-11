import React, { Component } from "react";
import { generatePathFuc } from '../../../utilities/Utility';
import Bus from '../Vehicle/Bus/Bus';

class Vehicle extends Component {

    handleMouseOver = (d) => {
        const details = {
            type: "Muni Details", 
            route: this.props.route, 
            busTag: d.properties.heading,
            stopName: null, 
            color:this.props.color || null
        }
        if(this.props.updateDetails) {
            this.props.updateDetails(details)
        }
    }

    handleMouseOut = () => {
        this.props.updateDetails({})
    }

    render() {
        return(
            <g transform={`translate(${generatePathFuc().centroid(this.props.d)})`} 
                onMouseOver={() => this.handleMouseOver(this.props.d)}
                onMouseOut={this.handleMouseOut}>
                    <Bus 
                        fill={this.props.color} 
                        size={this.props.size} 
                    />
            </g>
                
        )
    }
}

export default Vehicle;