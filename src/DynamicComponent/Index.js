// Libraries.

import React, { Component } from "react";

import {createStylesheet} from "../utilities/jsxTranspiler/create-stylesheet";

import { getNestedComponents, saveComponentsToWindow } from "../utilities/nestedComponentSetup";


import "./style.css";

class DynamicComponent extends Component {
    constructor(props) {
        super(props);

        // can we read from localstorage here? ok
        this.component = this.props.component;
        
        if(!this.props.noFreshFetch){
            // to fetch fresh data.
            this.component = JSON.parse(localStorage.getItem("ui-editor")).find(component=>component.name === this.component.name) ||this.props.component;
        }
        
        createStylesheet(this.component.style);
    }

    preventDefault(e){
        let previousTarget = document.querySelectorAll(".droptarget.green");
        if(previousTarget[0]){
            previousTarget[0].classList.remove("droptarget")
            previousTarget[0].classList.remove("green")
            
        }
        e.target.classList.add("droptarget");
        e.target.classList.add("green");
        e.preventDefault();
    }

    onDrop(e){
        e.preventDefault();
        var data = e.dataTransfer.getData("component-name");
    }


    render() {
        let nestedComponents = getNestedComponents(this.component);
        if (nestedComponents.length > 0) {
            saveComponentsToWindow(nestedComponents);
        }
        
        return (
            <div onDrop={this.onDrop.bind(this)} onDragOver={this.preventDefault.bind(this)}>
                {React.createElement(window[this.component.name])}
            </div>
        );
    }

}

export default DynamicComponent;