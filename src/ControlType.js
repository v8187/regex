import React, { Component } from 'react';

import { ToggleSwitch } from './ToggleSwitch';

export class ControlType extends Component {

    constructor(props) {

        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleOptionalChange = this.handleOptionalChange.bind(this);
        this.handleIncludeChange = this.handleIncludeChange.bind(this);
        this.handleInfiniteChange = this.handleInfiniteChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleOptionalChange(evt) {

    }
    handleIncludeChange(evt) {
        
    }
    handleInfiniteChange(evt) {
        
    }

    handleInputChange(evt) {

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
        return (<li className={this.props.className}>
            <i className="icon">:::</i>
            <div className="category-controls">
                <h2>{this.props.label}</h2>
                {this.props.hasOptional && <div>
                    {this.props.placeholder &&
                        <input id={`${this.props.id}Input${this.props.index}`} type="text" placeholder={this.props.placeholder} />}
                    {this.props.hasInclude &&
                        <ToggleSwitch
                            onLabel="Include"
                            offLabel="Exclude"
                            onToggle={this.handleIncludeChange}
                            id={`${this.props.id}Include${this.props.index}`} />}
                    {this.props.hasOptional &&
                        <ToggleSwitch
                            onLabel="Optional"
                            offLabel="Required"
                            onToggle={this.handleOptionalChange}
                            id={`${this.props.id}Optional${this.props.index}`} />}
                    {this.props.hasInfinite &&
                        <ToggleSwitch
                            onLabel="Infinite"
                            offLabel="Limited"
                            onToggle={this.handleInfiniteChange}
                            id={`${this.props.id}Infinite${this.props.index}`} />}

                    {this.props.hasMin &&
                        <input id={`${this.props.id}Min${this.props.index}`} type="number" min="0" placeholder="Min" />}
                    {this.props.hasMax &&
                        <input id={`${this.props.id}Max${this.props.index}`} type="number" min="1" placeholder="Max" />}
                </div>}
                <input id={`${this.props.id}Del${this.props.index}`} type="button" className="del-btn" value="x" />
            </div>
        </li>);
    }
}