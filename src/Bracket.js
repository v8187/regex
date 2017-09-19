import React, { Component } from 'react';

import { ControlWrapper } from './ControlWrapper';

export class Bracket extends Component {
    source;
    Composite = null;

    constructor(props) {

        super(props);

        this.state = {
            placeholder: 'Selected characters'
        };

        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        evt.stopPropagation();
        this.setState({
            isOn: this.control.checked
        }, () => {
            this.props.onToggle && this.props.onToggle(this.state.isOn);
        });
    }

    // Runs after the component output has been rendered to the DOM
    componentDidMount() {
        this.setState({
            isOn: this.props.isOn
        });
        // this.elUl && this.elUl.replaceWith(this.elUl.children);
    }

    render() {
        var index = document.querySelectorAll('.control-element').length;

        return <ControlWrapper {...this.props}>
            <h2>{this.props.label}</h2>
        </ControlWrapper>;
    }
}