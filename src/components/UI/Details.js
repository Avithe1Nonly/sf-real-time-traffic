import React from 'react';

const Details = ({hoverDetails})=> {
    const styleColor = hoverDetails.color || "#ccc"
    return (
    <div className="hover-details" style={{"color": styleColor}}>
        <p><strong>Type: </strong> { hoverDetails.type } </p>
        <p><strong>Route: </strong> { hoverDetails.route } </p>
        <p><strong>Bus Tag: </strong> { hoverDetails.busTag } </p>
        <p><strong>Stop Name: </strong> { hoverDetails.stopName } </p>
        <p><strong>Color: </strong>{ hoverDetails.color }</p>
    </div>
)}

export default Details;