import React, { Component } from "react";
import { get } from "axios";
import { geoPath } from "d3-geo";
import { projectionFunc, getRandomHexColor } from '../../utilities/Utility';

class Neighborhoods extends Component {
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
        get("/assets/sfmaps/neighborhoods.json")
            .then(res => {
            if (res.status !== 200) return;
            const geographyPaths = res.data.features;
            this.setState({ geographyPaths })
            })
    }

    render() {
        return(
            <g className="neighborhoods">
            {
                this.state.geographyPaths.map((d,i) => {
                return (
                <path
                    key={ `path-${ i }` }
                    d={ geoPath().projection(projectionFunc(800, 450))(d) }
                    className="neighborhood"
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

export default Neighborhoods;