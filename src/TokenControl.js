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
            group: false,
            compiledValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleControlChange = this.handleControlChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange() {
        var val = '';

        // console.log(this.state.textValue.match(/^(a\-z)?(A\-Z)?(\d+)?([a-zA-Z]+)?(\s+)?([~`!@#$%^&*()_+\-=[]\\{}|:";',\.\/<>\?]+)?$/));
        console.log(this.state.textValue.match(/([a-z]-[a-z])/g));
        console.log(this.state.textValue.match(/([A-Z]-[A-Z])/g));
        console.log(this.state.textValue.match(/(\d-\d)/g));
        
        this.setState({
            compiledValue: val
        }, () => {
            this.props.onChange(this.state.compiledValue);
        });
    }

    handleControlChange(key, value) {

        let obj = {};
        obj[key] = value;

        this.setState(obj, this.handleChange);
    }

    handleInputChange(evt, key) {
        evt.preventDefault();
        this.handleControlChange(key, evt.target.value);
    }

    render() {
        let { index } = this.props;

        return (<ControlWrapper  {...this.props}><div>
            <input id={`ctrlInput${index}`}
                type="text" placeholder="Selected characters"
                value={this.state.textValue}
                onChange={(evt) => this.handleInputChange(evt, 'textValue')} />
            <CheckBox id={`ctrlAlphabet${index}`}
                label="Alphabets"
                checked={this.state.alpha}
                onToggle={(bool) => this.handleControlChange('alpha', bool)} />
            <CheckBox id={`ctrlNumber${index}`}
                label="Numbers"
                checked={this.state.number}
                onToggle={(bool) => this.handleControlChange('number', bool)} />
            <CheckBox id={`ctrlSpecial${index}`}
                label="Special Characters"
                checked={this.state.specialChar}
                onToggle={(bool) => this.handleControlChange('specialChar', bool)} />
            <CheckBox id={`ctrlSpace${index}`}
                label="Space"
                checked={this.state.space}
                onToggle={(bool) => this.handleControlChange('space', bool)} />
            <CheckBox id={`ctrlIsGroup${index}`}
                label="Is Group"
                checked={this.state.group}
                onToggle={(bool) => this.handleControlChange('group', bool)} />
            <CheckBox id={`ctrlIsList${index}`}
                label="Is List"
                checked={this.state.list}
                onToggle={(bool) => this.handleControlChange('list', bool)} />
            <ToggleSwitch id={`ctrlInclude${index}`}
                onLabel="Include" offLabel="Exclude"
                isOn={this.state.include}
                onToggle={(bool) => this.handleControlChange('include', bool)} />
            <ToggleSwitch id={`ctrlOptional${index}`}
                onLabel="Optional" offLabel="Required"
                isOn={this.state.optional}
                onToggle={(bool) => this.handleControlChange('optional', bool)} />
            <ToggleSwitch id={`ctrlInfinite${index}`}
                onLabel="Infinite" offLabel="Limited"
                isOn={this.state.infinite}
                onToggle={(bool) => this.handleControlChange('infinite', bool)} />
            {!this.state.infinite && <input id={`ctrlMin${index}`}
                type="number" min="0" placeholder="Min"
                value={this.state.min}
                onChange={(evt) => this.handleInputChange(evt, 'min')} />}
            {!this.state.infinite && <input id={`ctrlMax${index}`}
                type="number" min="1" placeholder="Max"
                value={this.state.max}
                onChange={(evt) => this.handleInputChange(evt, 'max')} />}
        </div></ControlWrapper>);
    }
}