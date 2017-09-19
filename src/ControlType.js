import React, { Component } from 'react';

import { ToggleSwitch } from './ToggleSwitch';
import { CheckBox } from './CheckBox';

const isbefore = (a, b) => {
    if (a.parentNode == b.parentNode) {
        let cur = a;
        for (; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return true;
            }
        }
    }
};

export class ControlType extends Component {
    source;
    isDragging = false;

    constructor(props) {

        super(props);

        this.state = {};

        // this.handleChange = this.handleChange.bind(this);
        this.handleAlphaChange = this.handleAlphaChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSpecialChange = this.handleSpecialChange.bind(this);
        this.handleSpaceChange = this.handleSpaceChange.bind(this);
        this.handleOptionalChange = this.handleOptionalChange.bind(this);
        this.handleIncludeChange = this.handleIncludeChange.bind(this);
        this.handleInfiniteChange = this.handleInfiniteChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.dragging = this.dragging.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
    }

    handleChange(evt) {
        evt.stopPropagation();
        this.setState({
            isOn: this.control.checked
        }, () => {
            this.props.onToggle && this.props.onToggle(this.state.isOn);
        });
    }
    handleAlphaChange(evt) { }
    handleNumberChange(evt) { }
    handleSpecialChange(evt) { }
    handleSpaceChange(evt) { }
    handleOptionalChange(evt) { }
    handleIncludeChange(evt) { }
    handleInfiniteChange(evt) { }
    handleInputChange(evt) { }
    dragging(evt) {

    }

    dragStart(evt) {
        console.log(window.el = evt.target.parentNode);
    }

    dragEnd(evt) {
        /*this.source = evt.target.parentNode;
        evt.dataTransfer.effectAllowed = 'move';*/
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
            <i className="icon handle-icon"
                onMouseMove={this.dragging}
                onTouchMove={this.dragging}
                onMouseDown={this.dragStart}
                onTouchStart={this.dragStart}
                onMouseUp={this.dragEnd}
                onTouchEnd={this.dragEnd}
            >:::</i>
            <div className="category-controls">
                <h2>{this.props.label}</h2>
                {this.props.hasOptional && <div>
                    {this.props.placeholder &&
                        <input id={`${this.props.id}Input${this.props.index}`}
                            type="text" placeholder={this.props.placeholder} />}
                    <CheckBox id={`${this.props.id}Alphabet${this.props.index}`}
                        label="Alphabets"
                        onToggle={this.handleAlphaChange} />
                    <CheckBox id={`${this.props.id}Number${this.props.index}`}
                        label="Numbers"
                        onToggle={this.handleNumberChange} />
                    <CheckBox id={`${this.props.id}Special${this.props.index}`}
                        label="Special Characters"
                        onToggle={this.handleSpecialChange} />
                    <CheckBox id={`${this.props.id}Space${this.props.index}`}
                        label="Space"
                        onToggle={this.handleSpaceChange} />
                    {this.props.hasInclude &&
                        <ToggleSwitch id={`${this.props.id}Include${this.props.index}`}
                            onLabel="Include" offLabel="Exclude"
                            onToggle={this.handleIncludeChange} />}
                    {this.props.hasOptional &&
                        <ToggleSwitch id={`${this.props.id}Optional${this.props.index}`}
                            onLabel="Optional" offLabel="Required"
                            onToggle={this.handleOptionalChange} />}
                    {this.props.hasInfinite &&
                        <ToggleSwitch id={`${this.props.id}Infinite${this.props.index}`}
                            onLabel="Infinite" offLabel="Limited"
                            onToggle={this.handleInfiniteChange} />}
                    {this.props.hasMin &&
                        <input id={`${this.props.id}Min${this.props.index}`}
                            type="number" min="0" placeholder="Min" />}
                    {this.props.hasMax &&
                        <input id={`${this.props.id}Max${this.props.index}`}
                            type="number" min="1" placeholder="Max" />}
                </div>}
                <input id={`${this.props.id}Del${this.props.index}`}
                    type="button" className="del-btn" value="x" />
            </div>
        </li>);
    }
}