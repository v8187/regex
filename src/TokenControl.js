import React, { Component } from 'react';

import { ControlWrapper } from './ControlWrapper';
import { ToggleSwitch } from './ToggleSwitch';
import { CheckBox } from './CheckBox';

export class TokenControl extends Component {

    constructor(props) {

        super(props);

        this.state = {};

        this.handleAlphaChange = this.handleAlphaChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSpecialChange = this.handleSpecialChange.bind(this);
        this.handleSpaceChange = this.handleSpaceChange.bind(this);
        this.handleOptionalChange = this.handleOptionalChange.bind(this);
        this.handleIncludeChange = this.handleIncludeChange.bind(this);
        this.handleInfiniteChange = this.handleInfiniteChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMinChange = this.handleMinChange.bind(this);
        this.handleMaxChange = this.handleMaxChange.bind(this);
        this.handleIsListChange = this.handleIsListChange.bind(this);
        this.handleIsGroupChange = this.handleIsGroupChange.bind(this);
    }

    handleAlphaChange(evt) { }
    handleNumberChange(evt) { }
    handleSpecialChange(evt) { }
    handleSpaceChange(evt) { }
    handleOptionalChange(evt) { }
    handleIncludeChange(evt) { }
    handleInfiniteChange(evt) { }
    handleInputChange(evt) { }
    handleMinChange(evt) { }
    handleMaxChange(evt) { }
    handleIsListChange(evt) { }
    handleIsGroupChange(evt) { }

    // Runs after the component output has been rendered to the DOM
    componentDidMount() {
        this.setState({
            isOn: this.props.isOn
        });
    }

    render() {
        let { index } = this.props;

        return (<ControlWrapper  {...this.props}><div>
            <input id={`ctrlInput${index}`}
                type="text" placeholder="Selected characters"
                onChange={this.handleInputChange} />
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
            <CheckBox id={`ctrlIsGroup${index}`}
                label="Is Group"
                onToggle={this.handleIsGroupChange} />
            <CheckBox id={`ctrlIsList${index}`}
                label="Is List"
                onToggle={this.handleIsListChange} />
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
                type="number" min="0" placeholder="Min"
                onChange={this.handleMinChange} />
            <input id={`ctrlMax${index}`}
                type="number" min="1" placeholder="Max"
                onChange={this.handleMaxChange} />
        </div></ControlWrapper>);
    }
}