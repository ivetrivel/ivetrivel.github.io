// Libraries.

import React, { Component } from "react";

import { getNestedComponents, saveComponentsToWindow } from "../../utilities/Runtime";

import "./style.css";

class DynamicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: this.props.component
        }
        
    }

    dropHandler(){}

    dragOverHandler(e){

        /** Drop hint, Target shift hint */

        /** Show drop hint as above if cursor is half above center of e.target */

        /** Show drop hint as below if cursor is half below center of e.target */

        /** Show drop hint as right if cursor is half right center of e.target */

        /** Show drop hint as left if cursor is half left center of e.target */
        
        console.log(e.target, e.currentTarget, e.sourceTarget)
    }

    render() {

        if(this.state.component.name===undefined){
            return (<p>No component selected.</p>)
        }
        let nestedComponents = getNestedComponents(this.state.component);
        if (nestedComponents.length > 0) {
            saveComponentsToWindow(nestedComponents);
        }

        if(!window[this.state.component.name]){
            return (<div></div>)
        }

        return (
            <div 
                onDrop={this.dropHandler.bind(this)} 
                onDragOver={this.dragOverHandler.bind(this)} >
                {React.createElement(window[this.state.component.name])}
            </div>
        );
    }

}

export default DynamicComponent;