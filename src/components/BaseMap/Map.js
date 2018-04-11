import React from "react";
import Streets from '../Maps/Streets';
import Routes from '../../containers/Routes/Routes';
import Arteries from "../Maps/arteries";
import Freeways from "../Maps/freeways";
import Neighborhoods from "../Maps/neighborhoods";
import "./Map.css";

const Map = () => (
    <div className="map">
        <svg width={ 800 } height={ 600 } viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <Arteries/>
            <Freeways/>
            <Neighborhoods/>
            <Streets/>
            <Routes/>
        </svg>
    </div>
)
    
export default Map;