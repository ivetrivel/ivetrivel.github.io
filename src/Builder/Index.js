// Libraries.

import React, { Component } from "react";

// State

import State from "./Div/State";

// Utility

import {deleteDiv, copyDiv, anySelected} from "./Utility";
import {buildJSX} from "../utilities/CodeGenerator/JSX";

// Components

import Div from "./Div";
import Window from "../Window"

// Styles.

import "./style.css";


// Constants
import { CONSTANTS } from "../utilities/Constants"; 

class Builder extends Component {
    constructor(props) {
        super(props);
        this.state = State;
    }

    changeMode(e) {

        // check if mode is copy and any div is selected.
        if(anySelected(this.state)){
            if(e.currentTarget.innerText==="Copy" ){
                // Then create a copy div
                copyDiv(this.state);
            }
            if(e.currentTarget.innerText==="Delete" ){
                // Then create a copy div
                deleteDiv(this.state);
            }
        }
        if(e.currentTarget.innerText==="Save" ){
            // Then generate the jsx and with empty state create new component
            var jsx = [this.state].map(buildJSX)[0];
            this.props.onSave({
                trueName: "",
                name: this.state.name|| CONSTANTS.component_name_prefix+Math.ceil(Math.random() * 1000),
                markup: jsx,
                style: "",
                state: JSON.stringify(this.state)
            });
        }
        this.setState({
            builderMode: e.currentTarget.innerText
        })
    }

    DivonUpdate(e) {
        this.setState(e.state);
    }

    render() {
        /**
         * when Draw is on - Disable  - Move, Resize, Delete, copy, Save, Edit
         * when Select is on - Enable - Move, Resize, Delete, copy, Save, Edit
         * when Interact is on - 
         * 
         * There are three modes, Draw, select and interact. 
         * 
         * 1. Draw - When in draw mode, rectangles can be created
         * 2. Select - When in select mode, Rectangle can be selected. After selection it can be moved, resized, Deleted, copied, saved
         * 3. Event - Helps to add event interaction
         * 4. Interact - Helps to preview the changes.
         */
        return (
            <Window>
        <div className="builder">
            <div className="toolBar">
                <button className={this.state.builderMode==="Draw"?"mode":""} onClick={this.changeMode.bind(this)}><i class="fas fa-pen"></i>Draw</button>
                <button className={this.state.builderMode==="Select"?"mode":""} onClick={this.changeMode.bind(this)}><i class="fas fa-check"></i>Select</button>
                <button className={this.state.builderMode==="Move"?"mode":""} onClick={this.changeMode.bind(this)}><i class="fas fa-arrows-alt"></i>Move</button>
                <button className={this.state.builderMode==="Resize"?"mode":""} onClick={this.changeMode.bind(this)}><i class="fas fa-compress-arrows-alt"></i>Resize</button>
                <button className={this.state.builderMode==="Delete"?"mode":""} onClick={this.changeMode.bind(this)}><i class="fas fa-trash-alt"></i>Delete</button>
                <button className={this.state.builderMode==="Copy"?"mode":""} onClick={this.changeMode.bind(this)}><i class="fas fa-copy"></i>Copy</button> 
                <button className={this.state.builderMode==="Interact"?"mode":""} onClick={this.changeMode.bind(this)}><i class="fas fa-bolt"></i>Interact</button> 
                <button className={this.state.builderMode==="Save"?"mode":""} onClick={this.changeMode.bind(this)}><i class="fas fa-save"></i>Save</button> 
            </div>
            <Div parent={this.state} builderMode={this.state.builderMode} state={this.state} index={0}key={Math.ceil(Math.random() * 1000)} 
                    onDrawFinish={this.DivonUpdate.bind(this)}  
                    onDelete={this.DivonUpdate.bind(this)} 
                    onResizeFinish={this.DivonUpdate.bind(this)} 
                    onMoveFinish={this.DivonUpdate.bind(this)}
                    onSelection={this.DivonUpdate.bind(this)}>
            </Div>
        </div>
        </Window>
        )
    }

}

export default Builder;