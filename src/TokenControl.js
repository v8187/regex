import React, { Component } from 'react';

import { ControlWrapper } from './ControlWrapper';
import { ToggleSwitch } from './ToggleSwitch';
import { CheckBox } from './CheckBox';

export class TokenControl extends Component {

    constructor(props) {

        super(props);

        this.state = {
            alpha: false,
            number: false,
            specialChar: false,
            space: false,
            optional: false,
            include: true,
            infinite: false,
            textValue: '',
            min: 1,
            max: 1,
            list: false,
            group: false
        };

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

    handleAlphaChange(bool) {
        this.setState({
            alpha: bool
        });
    }
    handleNumberChange(bool) {
        this.setState({
            number: bool
        });
    }
    handleSpecialChange(bool) {
        this.setState({
            specialChar: bool
        });
    }
    handleSpaceChange(bool) {
        this.setState({
            space: bool
        });
    }
    handleOptionalChange(bool) {
        this.setState({
            optional: bool
        });
    }
    handleIncludeChange(bool) {
        this.setState({
            include: bool
        });
    }
    handleInfiniteChange(bool) {
        this.setState({
            infinite: bool
        });
    }
    handleInputChange(evt) {
        evt.preventDefault();

        this.setState({
            textValue: evt.target.value
        });
    }
    handleMinChange(evt) {
        evt.preventDefault();

        this.setState({
            min: evt.target.value
        });
    }
    handleMaxChange(evt) {
        evt.preventDefault();

        this.setState({
            max: evt.target.value
        });
    }
    handleIsListChange(bool) {
        this.setState({
            list: bool
        });
    }
    handleIsGroupChange(bool) {
        this.setState({
            group: bool
        });
    }

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
                value={this.state.textValue}
                onChange={this.handleInputChange} />
            <CheckBox id={`ctrlAlphabet${index}`}
                label="Alphabets"
                checked={this.state.alpha}
                onToggle={this.handleAlphaChange} />
            <CheckBox id={`ctrlNumber${index}`}
                label="Numbers"
                checked={this.state.number}
                onToggle={this.handleNumberChange} />
            <CheckBox id={`ctrlSpecial${index}`}
                label="Special Characters"
                checked={this.state.specialChar}
                onToggle={this.handleSpecialChange} />
            <CheckBox id={`ctrlSpace${index}`}
                label="Space"
                checked={this.state.space}
                onToggle={this.handleSpaceChange} />
            <CheckBox id={`ctrlIsGroup${index}`}
                label="Is Group"
                checked={this.state.group}
                onToggle={this.handleIsGroupChange} />
            <CheckBox id={`ctrlIsList${index}`}
                label="Is List"
                checked={this.state.list}
                onToggle={this.handleIsListChange} />
            <ToggleSwitch id={`ctrlInclude${index}`}
                onLabel="Include" offLabel="Exclude"
                isOn={this.state.include}
                onToggle={this.handleIncludeChange} />
            <ToggleSwitch id={`ctrlOptional${index}`}
                onLabel="Optional" offLabel="Required"
                isOn={this.state.optional}
                onToggle={this.handleOptionalChange} />
            <ToggleSwitch id={`ctrlInfinite${index}`}
                onLabel="Infinite" offLabel="Limited"
                isOn={this.state.infinite}
                onToggle={this.handleInfiniteChange} />
            {!this.state.infinite && <input id={`ctrlMin${index}`}
                type="number" min="0" placeholder="Min"
                value={this.state.min}
                onChange={this.handleMinChange} />}
            {!this.state.infinite && <input id={`ctrlMax${index}`}
                type="number" min="1" placeholder="Max"
                value={this.state.max}
                onChange={this.handleMaxChange} />}
        </div></ControlWrapper>);
    }
}