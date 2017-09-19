import React, { Component } from 'react';

import { ControlWrapper } from './ControlWrapper';
import { ToggleSwitch } from './ToggleSwitch';
import { CheckBox } from './CheckBox';

export class TokenControl extends Component {
    source;

    constructor(props) {

        super(props);

        this.state = {
            placeholder: 'Selected characters'
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleAlphaChange = this.handleAlphaChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSpecialChange = this.handleSpecialChange.bind(this);
        this.handleSpaceChange = this.handleSpaceChange.bind(this);
        this.handleOptionalChange = this.handleOptionalChange.bind(this);
        this.handleIncludeChange = this.handleIncludeChange.bind(this);
        this.handleInfiniteChange = this.handleInfiniteChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

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
        var index = document.querySelectorAll('.control-element').length;

        return (<ControlWrapper  {...this.props}><div>
            <input id={`ctrlInput${index}`}
                type="text" placeholder={this.state.placeholder} />
            <CheckBox id={`ctrlAlphabet${index}`}
                label="Alphabets"
                onToggle={this.handleAlphaChange} />
            <CheckBox id={`ctrlNumber${index}`}
                label="Numbers"
                onToggle={this.handleNumberChange} />
            <CheckBox id={`ctrlSpecial${index}`}
                label="Special Characters"
                onToggle={this.handleSpecialChange} />
            <CheckBox id={`ctrlSpace${index}`}
                label="Space"
                onToggle={this.handleSpaceChange} />
            <ToggleSwitch id={`ctrlInclude${index}`}
                onLabel="Include" offLabel="Exclude"
                onToggle={this.handleIncludeChange} />
            <ToggleSwitch id={`ctrlOptional${index}`}
                onLabel="Optional" offLabel="Required"
                onToggle={this.handleOptionalChange} />
            <ToggleSwitch id={`ctrlInfinite${index}`}
                onLabel="Infinite" offLabel="Limited"
                onToggle={this.handleInfiniteChange} />
            <input id={`ctrlMin${index}`}
                type="number" min="0" placeholder="Min" />
            <input id={`ctrlMax${index}`}
                type="number" min="1" placeholder="Max" />
        </div></ControlWrapper>);
    }
}