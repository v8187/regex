import React, { Component } from 'react';
import { OverlayTrigger } from 'react-bootstrap/lib';

import { ControlWrapper } from './ControlWrapper';
import { ToggleSwitch } from './ToggleSwitch';
import { CheckBox } from './CheckBox';
import { correctOrder } from './utils';
import {
    helpAlpha, helpGroup, helpList, helpNumber,
    helpSpaceBefore, helpSpaceAfter, helpSpecialChar, helpExclude,
    helpRequired, helpInfinite, helpMin, helpMax, helpInput,
    helpJoinNext, helpJoinOR, helpJoinXOR
} from './help_tips';

export class TokenControl extends Component {

    constructor(props) {

        super(props);

        this.state = {
            alpha: false,
            number: false,
            specialChar: false,
            spaceBefore: false,
            spaceAfter: false,
            optional: false,
            exclude: false,
            infinite: false,
            textValue: '',
            min: 1,
            max: 1,
            list: false,
            group: false,
            compiledValue: '',
            joinedBy: 'joinNext'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleControlChange = this.handleControlChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange() {
        console.clear();
        var val = '',
            textValue = this.state.textValue,
            lwrAlphas = textValue.match(/([a-z]-[a-z])/g),
            capAlphas = textValue.match(/([A-Z]-[A-Z])/g),
            numbers = textValue.match(/(\d-\d)/g);

        [].concat(lwrAlphas, capAlphas, numbers).forEach(val => {
            val && console.log(val, correctOrder(val));
            val && (textValue = textValue.replace(val, ''));
        });

        console.log('lwrAlphas', lwrAlphas);
        console.log('capAlphas', capAlphas);
        console.log('numbers', numbers);
        console.log('textValue', textValue);

        textValue = this.state.textValue.replace(/\[(?:((a-z)|(A-Z)|(0-9)))\]/g, '$1');

        this.setState({
            textValue: textValue,
            compiledValue: textValue
                .replace(/(a-z)/g, '[$1]')
                .replace(/(A-Z)/g, '[$1]')
                .replace(/(0-9)/g, '\\d')
        }, () => {
            this.props.onChange(this.state.compiledValue);
        });
    }

    handleControlChange(key, value) {

        let obj = {};

        if (key.indexOf('join') === 0) {
            obj.joinedBy = key;
        } else {
            obj[key] = value;
        }

        let { alpha, number, specialChar } = this.state;

        switch (key) {
            case 'alpha':
            case 'number':
            case 'specialChar':
                if (value) {
                    this.elList.toggleState(obj.list = true);
                }
                break;
            case 'list':
                this.elList.toggleState(obj.list = alpha || number || specialChar || value);
                break;
            case 'joinNext':
            case 'joinOR':
            case 'joinXOR':
                this.elJoinNext.toggleState(obj.joinedBy === 'joinNext');
                this.elJoinOr.toggleState(obj.joinedBy === 'joinOR');
                this.elJoinXor.toggleState(obj.joinedBy === 'joinXOR');
            default:
                break;
        }

        this.setState(obj, this.handleChange);
    }

    handleInputChange(evt, key) {
        evt.preventDefault();
        this.handleControlChange(key, evt.target.value);
    }

    render() {
        let { index } = this.props;

        return (<ControlWrapper  {...this.props}>
            {this.props.canJoin && <div className="join-options-wrapper">
                <CheckBox id={`ctrlJoinNext${index}`}
                    ref={el => { this.elJoinNext = el; }}
                    label="Next"
                    checked={this.state.joinedBy === 'joinNext'}
                    helpContent={helpJoinNext}
                    onToggle={(bool) => this.handleControlChange('joinNext', bool)} />
                <CheckBox id={`ctrlJoinOR${index}`}
                    ref={el => { this.elJoinOr = el; }}
                    label="OR"
                    checked={this.state.joinedBy === 'joinOR'}
                    helpContent={helpJoinOR}
                    onToggle={(bool) => this.handleControlChange('joinOR', bool)} />
                <CheckBox id={`ctrlJoinXOR${index}`}
                    ref={el => { this.elJoinXor = el; }}
                    label="XOR"
                    checked={this.state.joinedBy === 'joinXOR'}
                    helpContent={helpJoinXOR}
                    onToggle={(bool) => this.handleControlChange('joinXOR', bool)} />
            </div>}
            <div>
                <CheckBox id={`ctrlAlphabet${index}`}
                    ref={el => { this.elAlpha = el; }}
                    label="A-Z"
                    checked={this.state.alpha}
                    helpContent={helpAlpha}
                    onToggle={(bool) => this.handleControlChange('alpha', bool)} />
                <CheckBox id={`ctrlNumber${index}`}
                    ref={el => { this.elNumber = el; }}
                    label="0-9"
                    checked={this.state.number}
                    helpContent={helpNumber}
                    onToggle={(bool) => this.handleControlChange('number', bool)} />
                <CheckBox id={`ctrlSpecial${index}`}
                    ref={el => { this.elSpecial = el; }}
                    label="! @ # ;"
                    checked={this.state.specialChar}
                    helpContent={helpSpecialChar}
                    onToggle={(bool) => this.handleControlChange('specialChar', bool)} />
                <CheckBox id={`ctrlSpaceBefore${index}`}
                    ref={el => { this.elSpaceBefore = el; }}
                    label="_A"
                    checked={this.state.spaceBefore}
                    helpContent={helpSpaceBefore}
                    onToggle={(bool) => this.handleControlChange('spaceBefore', bool)} />
                <CheckBox id={`ctrlSpaceAfter${index}`}
                    ref={el => { this.elSpaceAfter = el; }}
                    label="A_"
                    checked={this.state.spaceAfter}
                    helpContent={helpSpaceAfter}
                    onToggle={(bool) => this.handleControlChange('spaceAfter', bool)} />
                <CheckBox id={`ctrlIsGroup${index}`}
                    ref={el => { this.elGroup = el; }}
                    label="( )"
                    checked={this.state.group}
                    helpContent={helpGroup}
                    onToggle={(bool) => this.handleControlChange('group', bool)} />
                <CheckBox id={`ctrlIsList${index}`}
                    ref={el => { this.elList = el; }}
                    label="[ ]"
                    checked={this.state.list}
                    helpContent={helpList}
                    onToggle={(bool) => this.handleControlChange('list', bool)} />
                <ToggleSwitch id={`ctrlExclude${index}`}
                    ref={el => { this.elExclude = el; }}
                    onLabel="Exclude" offLabel="Include"
                    isOn={this.state.exclude}
                    helpContent={helpExclude}
                    onToggle={(bool) => this.handleControlChange('exclude', bool)} />
                <ToggleSwitch id={`ctrlOptional${index}`}
                    ref={el => { this.elOptional = el; }}
                    onLabel="Optional" offLabel="Required"
                    isOn={this.state.optional}
                    helpContent={helpRequired}
                    onToggle={(bool) => this.handleControlChange('optional', bool)} />
                <ToggleSwitch id={`ctrlInfinite${index}`}
                    ref={el => { this.elInfinite = el; }}
                    onLabel="Infinite" offLabel="Limited"
                    isOn={this.state.infinite}
                    helpContent={helpInfinite}
                    onToggle={(bool) => this.handleControlChange('infinite', bool)} />
                {!this.state.infinite &&
                    <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpMin}>
                        <input id={`ctrlMin${index}`}
                            ref={el => { this.elMin = el; }}
                            type="number" min="0" placeholder="Min"
                            value={this.state.min}
                            onChange={(evt) => this.handleInputChange(evt, 'min')} />
                    </OverlayTrigger>}
                {!this.state.infinite &&
                    <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpMax}>
                        <input id={`ctrlMax${index}`}
                            ref={el => { this.elMax = el; }}
                            type="number" min="1" placeholder="Max"
                            value={this.state.max}
                            onChange={(evt) => this.handleInputChange(evt, 'max')} />
                    </OverlayTrigger>}
                {!(this.state.alpha && this.state.specialChar && this.state.number) &&
                    <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpInput}>
                        <input id={`ctrlInput${index}`}
                            ref={el => { this.elInput = el; }}
                            type="text" placeholder="Selected characters"
                            value={this.state.textValue}
                            onChange={(evt) => this.handleInputChange(evt, 'textValue')} />
                    </OverlayTrigger>}
            </div>
            <output>{this.state.compiledValue}</output>
        </ControlWrapper>);
    }
}