import React, { Component } from 'react';

export class ToggleSwitch extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isOn: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        evt.stopPropagation();
        this.setState({
            isOn: this.control.checked
        }, () => {
            this.props.onToggle(this.state.isOn);
        });
    }

    // Runs after the component output has been rendered to the DOM
    componentDidMount() {
        this.setState({
            isOn: this.props.isOn
        });
    }
    // When Component gets destroyed
    componentWillUnmount() {

    }

    render() {
        return (
            <div className={`toggle-switch-container ${this.props.className || ''}`} ref={div => { this.node = div }}>
                <input type="checkbox"
                    ref={input => { this.control = input }}
                    id={this.props.id}
                    checked={this.state.isOn || false}
                    onChange={this.handleChange}
                />
                <label htmlFor={this.props.id}>
                    <span className="tog-swh-text">
                        {this.props.onLabel}
                    </span>
                    <span className="tog-swh-text">
                        {this.props.offLabel}
                    </span>
                    <span className="tog-swh-btn">
                        IIII
                    </span>
                </label>
            </div>
        );
    }
};