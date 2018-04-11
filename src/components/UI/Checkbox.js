import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(){
        super()
        this.state = {
            isActive: false
        }
    }

    componentDidMount(){
        // set the checkbox checked status if it's active
        if(this.props.currentRoutes){
            this.updateActive(this.props.currentRoutes)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.currentRoutes !== this.props.currentRoutes) {
            this.updateActive(nextProps.currentRoutes)
        }
    }

    updateActive = (currentRoutes) => {
        if(currentRoutes.indexOf(this.props.tag)>-1){
            this.setState({
                isActive: true
            })
        } else {
            this.setState({
                isActive: false
            })
        }
    }

    toggleClick= () => {
        this.setState({
            isActive: !this.state.isActive
        })

        if(this.props.updateRoute){
            this.props.updateRoute(this.props.tag)
        }
    }

    render() {
        return(
            <p>
                <input type="checkbox" className="filled-in" checked={ this.state.isActive } id={this.props.tag} onClick={this.toggleClick}/>
                <label htmlFor={this.props.tag}>{ this.props.title } </label>
            </p>
        )
    }
}

export default Checkbox;