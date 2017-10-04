import React, { Component } from 'react';
import { OverlayTrigger } from 'react-bootstrap/lib';

import { ControlWrapper } from './ControlWrapper';
import { ToggleSwitch } from './ToggleSwitch';
import { CheckBox } from './CheckBox';
import { correctOrder } from './utils';
import {
    helpAlpha, helpGroup, helpList, helpNumber,
    helpSpaceBefore, helpSpaceAfter, helpSpecialChar, helpExclude,
    helpRequired, helpInfinite, helpMin, helpMax, helpInput
} from './help_tips';

const
    CheckBoxAlphas = (props) => {
        return (<CheckBox id={`ctrlAlphabet${props.ctx.props.index}`}
            label="A - Z"
            title="Any Alphabet"
            checked={props.ctx.state.alpha}
            onToggle={(bool) => props.ctx.handleControlChange('alpha', bool)} />);
    }
    ;

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
            compiledValue: ''
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
        obj[key] = value;

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

        return (<ControlWrapper  {...this.props}><div>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpAlpha}>
                <div>
                    <CheckBox id={`ctrlAlphabet${index}`}
                        ref={instance => { this.elAlpha = instance; }}
                        label="A-Z"
                        checked={this.state.alpha}
                        onToggle={(bool) => this.handleControlChange('alpha', bool)} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpNumber}>
                <div>
                    <CheckBox id={`ctrlNumber${index}`}
                        ref={instance => { this.elNumber = instance; }}
                        label="0-9"
                        checked={this.state.number}
                        onToggle={(bool) => this.handleControlChange('number', bool)} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpSpecialChar}>
                <div>
                    <CheckBox id={`ctrlSpecial${index}`}
                        ref={instance => { this.elSpecial = instance; }}
                        label="! @ # ;"
                        checked={this.state.specialChar}
                        onToggle={(bool) => this.handleControlChange('specialChar', bool)} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpSpaceBefore}>
                <div>
                    <CheckBox id={`ctrlSpaceBefore${index}`}
                        ref={instance => { this.elSpaceBefore = instance; }}
                        label="_A"
                        checked={this.state.spaceBefore}
                        onToggle={(bool) => this.handleControlChange('spaceBefore', bool)} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpSpaceAfter}>
                <div>
                    <CheckBox id={`ctrlSpaceAfter${index}`}
                        ref={instance => { this.elSpaceAfter = instance; }}
                        label="A_"
                        checked={this.state.spaceAfter}
                        onToggle={(bool) => this.handleControlChange('spaceAfter', bool)} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpGroup}>
                <div>
                    <CheckBox id={`ctrlIsGroup${index}`}
                        ref={instance => { this.elGroup = instance; }}
                        label="( )"
                        checked={this.state.group}
                        onToggle={(bool) => this.handleControlChange('group', bool)} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpList}>
                <div>
                    <CheckBox id={`ctrlIsList${index}`}
                        ref={instance => { this.elList = instance; }}
                        label="[ ]"
                        checked={this.state.list}
                        onToggle={(bool) => this.handleControlChange('list', bool)} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpExclude}>
                <div>
                    <ToggleSwitch id={`ctrlExclude${index}`}
                        ref={instance => { this.elExclude = instance; }}
                        onLabel="Exclude" offLabel="Include"
                        isOn={this.state.exclude}
                        onToggle={(bool) => this.handleControlChange('exclude', bool)} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpRequired}>
                <div>
                    <ToggleSwitch id={`ctrlOptional${index}`}
                        ref={instance => { this.elOptional = instance; }}
                        onLabel="Optional" offLabel="Required"
                        isOn={this.state.optional}
                        onToggle={(bool) => this.handleControlChange('optional', bool)} />
                </div>
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpInfinite}>
                <div>
                    <ToggleSwitch id={`ctrlInfinite${index}`}
                        ref={instance => { this.elInfinite = instance; }}
                        onLabel="Infinite" offLabel="Limited"
                        isOn={this.state.infinite}
                        onToggle={(bool) => this.handleControlChange('infinite', bool)} />
                </div>
            </OverlayTrigger>
            {!this.state.infinite &&
                <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpMin}>
                    <div>
                        <input id={`ctrlMin${index}`}
                            ref={instance => { this.elMin = instance; }}
                            type="number" min="0" placeholder="Min"
                            value={this.state.min}
                            onChange={(evt) => this.handleInputChange(evt, 'min')} />
                    </div>
                </OverlayTrigger>}
            {!this.state.infinite &&
                <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpMax}>
                    <div>
                        <input id={`ctrlMax${index}`}
                            ref={instance => { this.elMax = instance; }}
                            type="number" min="1" placeholder="Max"
                            value={this.state.max}
                            onChange={(evt) => this.handleInputChange(evt, 'max')} />
                    </div>
                </OverlayTrigger>}
            {!(this.state.alpha && this.state.specialChar && this.state.number) &&
                <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpInput}>
                    <div>
                        <input id={`ctrlInput${index}`}
                            ref={instance => { this.elInput = instance; }}
                            type="text" placeholder="Selected characters"
                            value={this.state.textValue}
                            onChange={(evt) => this.handleInputChange(evt, 'textValue')} />
                    </div>
                </OverlayTrigger>}
        </div>
            <output>{this.state.compiledValue}</output>
        </ControlWrapper>);
    }
}