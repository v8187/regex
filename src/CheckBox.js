import React, { Component } from 'react';

export class CheckBox extends Component {

    constructor(props) {

        super(props);

        this.state = {
            checked: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        evt.stopPropagation();
        this.setState({
            checked: this.control.checked
        }, () => {
            this.props.onToggle && this.props.onToggle(this.state.checked);
        });
    }

    // Runs after the component output has been rendered to the DOM
    componentDidMount() {
        this.setState({
            checked: this.props.checked
        });
    }

    render() {
        return (
            <div className={`check-box-container ${this.props.className || ''}`} ref={div => { this.node = div }}>
                <input type="checkbox"
                    ref={input => { this.control = input }}
                    id={this.props.id}
                    checked={this.state.checked || false}
                    onChange={this.handleChange}
                />
                <label htmlFor={this.props.id}>{this.props.label}</label>
            </div>
        );
    }
};