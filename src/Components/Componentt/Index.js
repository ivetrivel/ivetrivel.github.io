import React, { Component } from 'react';

// Events.

import {selectionChanged} from "./Events";


// Styles.

import  "./Style.css";

class Componentt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedComponent: this.props.selectedComponent
        };
    }

    addComponentDetails(e){

        /** Pass details about component or folder in the drag event */
        
        let name = e.target.getAttribute("data-name")
        e.dataTransfer.setData("component-name", name);
        console.log(e.dataTransfer.getData("component-name"))
        e.dataTransfer.setData("parent-folder-name", e.currentTarget.parentElement.getAttribute("data-folder-name"))
        e.stopPropagation();
    }

    render() {

        let props = this.props;
        let selectedComponent = props.selectedComponent;
        let component = props.component;
        
        return (
                <li 
                    className = {selectedComponent && props.component.name===selectedComponent.name ? "selected component background": "component background"}
                    onClick = {selectionChanged.bind(this,component.name)}
                    onContextMenu = {selectionChanged.bind(this,component.name)}
                    index = {props.index}
                    draggable="true" 
                    data-name={component.name}
                    onDragStart={this.addComponentDetails.bind(this)}>
                    <span className="componentName ">
                        {component.name}
                    </span>
                </li>
        );
    }
}

export default Componentt;
