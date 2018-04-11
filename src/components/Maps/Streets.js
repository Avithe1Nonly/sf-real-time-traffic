import React, { Component } from "react";
import { get } from "axios";
import { geoPath } from "d3-geo";
import { projectionFunc, getRandomHexColor } from '../../utilities/Utility';

class Streets extends Component {
    constructor() {
        super()
        this.state = {
          geographyPaths: [],
        }
    }
    
    componentDidMount() {
        this.loadPaths()
    }

    loadPaths = () => {
        get("/assets/sfmaps/streets.json")
            .then(res => {
            if (res.status !== 200) return;
            const geographyPaths = res.data.features;
            this.setState({ geographyPaths })
            })
    }

    render() {
        return(
            <g className="streets">
            {
                this.state.geographyPaths.map((d,i) => {
                return (
                <path
                    key={ `path-${ i }` }
                    d={ geoPath().projection(projectionFunc(800, 450))(d) }
                    className="street"
                    fill={getRandomHexColor()}
                    stroke={getRandomHexColor()}
                    strokeWidth={ 0.5 }
                />
                )})
            }
            </g>
        )
    }
}

export default Streets;