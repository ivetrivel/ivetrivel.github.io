
// Libraries.

import React, { Component } from 'react';

// Dependencies.

// Styles.

import style from "./PopupMarkupEditor.css";


class PopupMarkupEditor extends Component {
    constructor(props) {
        super(props);
        // this.state = {... this.props.element};
        this.state = Object.assign({}, this.props.element);
    }

    updateName (event) {
        this.setState({
            name: event.currentTarget.value
        })
    }

    updateMarkup (event) {
        this.setState({
            markup: event.currentTarget.value
        })
    }

    updateStyle (event) {
        this.setState({
            style: event.currentTarget.value
        })
    }

    updateStyleClass (event) {
        this.setState({
            styleClass: event.currentTarget.value
        })
    }

    updateState (event) {
        this.setState({
            state: event.currentTarget.value
        })
    }

    publishElement () {
        this.props.saveAndClose({
            name: this.state.name,
            markup: this.state.markup,
            style: this.state.style,
            styleClass: this.state.styleClass,
            state: this.state.state
        });
    }

    render() {

        let element = this.state;
        // TODO: Should pass the current data. Instead of accessing it from global
        return (
            <div className={style.editor}>
                <section className={style.override}>  
                    <h4>Editor</h4>              
                    <div>
                        <h5>Name:</h5>
                        <input type="text" placeholder="Enter element name" value={element.name} onChange={this.updateName.bind(this)}/>
                        <button id="saveAndClose" onClick={this.publishElement.bind(this)}>Save & close</button>    
                    </div>
                    <div>
                        <h5>Markup: </h5><p>All tags should contain ID selector.</p>
                        <textarea value={element.markup} onChange={this.updateMarkup.bind(this)} />
                    </div>
                    <div>
                        <h5>Style by class: </h5><p>Under development</p>
                        <textarea  value={element.styleClass} onChange={this.updateStyleClass.bind(this)} />
                    </div>
                    <div>
                        <h5>Style:</h5>
                        <textarea value={element.style} onChange={this.updateStyle.bind(this)} />
                    </div>
                    <div>
                        <h5>State:</h5>
                        <textarea value={element.state} onChange={this.updateState.bind(this)} />
                    </div>
                </section>
            </div>
        );
    }
}

export default PopupMarkupEditor;