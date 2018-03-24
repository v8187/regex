import React, { Component } from 'react';

// import { CategorizedValueClass } from './CategorizedValue.class';
import { updateRegEx, splitValue } from './regex.service';

export class CategorizedValueSettings extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: updateRegEx(this.props.data)
        };

        this.updateState = this.updateState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: updateRegEx(nextProps.data)
        });
    }

    updateState(prop, val) {
        var { data } = this.state;

        switch (prop) {
            case 'isOptional':
                data.minLength = val ? 0 : 1;
                data.isOptional = val;
                break;
            case 'minLength':
                data.minLength = val > data.maxLength && val !== '' ? data.minLength : val;
                break;
            case 'maxLength':
                data.maxLength = val < data.minLength && val !== '' ? data.maxLength : val;
                break;
            case 'canSplit':
            case 'isConstant':
                data[prop] = val;
                if (data.isConstant) {
                    data.canSplit = false;
                    data.maxLength = data.chars.length;
                }
                if (data.canSplit || data.isConstant) {
                    data.customValues = '';
                    data.exclude = false;
                };
                // data.splitted = data.canSplit && !data.isConstant ? data.chars.split('').map((val, valI) => {
                //     return new CategorizedValueClass(data);
                // }) : null;
                data.splitted = data.canSplit && !data.isConstant ? splitValue(data.chars, data.type) : null;
                break;
            case 'canLower':
                data.hasLower(val);
                break;
            case 'canUpper':
                data.hasUpper(val);
                break;
            case 'canDigit':
                data.hasDigit(val);
                break;
            case 'canSpecial':
                data.hasSpecial(val);
                break;
            case 'canSpace':
                data.hasSpace(val);
                break;
            default:
                data[prop] = val;
                break;
        }

        data = updateRegEx(data);
        this.setState({ data: data }, () => {
            this.props.onChange(this.state.data);
        });
    }

    render() {
        let { data } = this.state;
        console.log(data);
        return (<div className="cate-val-settings-wrapper">
            <p>{`${data.chars}`}</p>
            {/* Can Split Control */}
            {data.type !== 'space' && data.chars.length > 1 && !data.isConstant &&
                <label className={`rx-btn-icon ${data.canSplit ? 'rx-checked' : ''}`}
                    title="Split the value">
                    <input type="checkbox" data-ctrl="canSplit"
                        checked={data.canSplit}
                        onChange={(evt) => this.updateState('canSplit', evt.target.checked)} />
                    <i className="fa fa-chain-broken" />
                </label>}
            {/* Is Constant Control */}
            {data.type !== 'space' && !data.canSplit &&
                <label className={`rx-btn-icon ${data.isConstant ? 'rx-checked' : ''}`}
                    title="Is a Constant Value">
                    <input type="checkbox" data-ctrl="isConstant"
                        checked={data.isConstant}
                        onChange={(evt) => this.updateState('isConstant', evt.target.checked)} />
                    <i className={`fa fa-${data.isConstant ? 'lock' : 'unlock'}`} />
                </label>}
            {/* Can Upper Case Control */}
            {!data.canSplit &&
                <label className={`rx-btn-text ${data.canUpper ? 'rx-checked' : ''}`}
                    title="Uppercase value">
                    <input type="checkbox" data-ctrl="canUpper"
                        checked={data.canUpper}
                        onChange={(evt) => this.updateState('canUpper', evt.target.checked)} />
                    A
                </label>}
            {/* Can Lower Case Control */}
            {!data.canSplit &&
                <label className={`rx-btn-text ${data.canLower ? 'rx-checked' : ''}`}
                    title="Lowercase value">
                    <input type="checkbox" data-ctrl="canLower"
                        checked={data.canLower}
                        onChange={(evt) => this.updateState('canLower', evt.target.checked)} />
                    a
                </label>}
            {/* Can Digits Control */}
            {!data.isConstant && !data.canSplit &&
                <label className={`rx-btn-text ${data.canDigit ? 'rx-checked' : ''}`}
                    title="Digits">
                    <input type="checkbox" data-ctrl="canDigit"
                        checked={data.canDigit}
                        onChange={(evt) => this.updateState('canDigit', evt.target.checked)} />
                    123
                </label>}
            {/* Can Special Characters Control */}
            {!data.isConstant && !data.canSplit &&
                <label className={`rx-btn-text ${data.canSpecial ? 'rx-checked' : ''}`}
                    title="Special Characters">
                    <input type="checkbox" data-ctrl="canSpecial"
                        checked={data.canSpecial}
                        onChange={(evt) => this.updateState('canSpecial', evt.target.checked)} />
                    #"$
                </label>}
            {/* Can Space Control */}
            {!data.isConstant && !data.canSplit &&
                <label className={`rx-btn-text ${data.canSpace ? 'rx-checked' : ''}`}
                    title="Space">
                    <input type="checkbox" data-ctrl="canSpace"
                        checked={data.canSpace}
                        onChange={(evt) => this.updateState('canSpace', evt.target.checked)} />
                    _
                </label>}
            {/* is Optional Control */}
            {!data.canSplit &&
                <label className={`rx-btn-icon ${data.isOptional ? 'rx-checked' : ''}`}
                    title="It is Optional">
                    <input type="checkbox" data-ctrl="isOptional"
                        checked={data.isOptional}
                        onChange={(evt) => this.updateState('isOptional', evt.target.checked)} />
                    <i className="fa fa-exclamation" />
                </label>}
            {/* Need To Exclude Control */}
            {data.type !== 'space' && !data.isConstant && !data.canSplit &&
                <label className={`rx-btn-icon ${data.exclude ? 'rx-checked' : ''}`}
                    title="Exclude this value">
                    <input type="checkbox" data-ctrl="exclude"
                        checked={data.exclude}
                        onChange={(evt) => this.updateState('exclude', evt.target.checked)} />
                    <i className={`fa fa-${data.exclude ? 'list-remove' : 'list'}`} />
                </label>}
            {/* Any characters in Custom Value */}
            {data.type !== 'space' && !data.isConstant && !data.canSplit &&
                <label className={`rx-btn-text ${data.customValType === 'any' ? 'rx-checked' : ''}`}
                    title="Any characters in Custom Value">
                    <input type="radio" data-ctrl="customValType" name="customValType"
                        checked={data.customValType === 'any'}
                        onChange={(evt) => this.updateState('customValType', 'any')} />
                    .*
                </label>}
            {/* Selected words in Custom Value */}
            {data.type !== 'space' && !data.isConstant && !data.canSplit &&
                <label className={`rx-btn-text ${data.customValType === 'list' ? 'rx-checked' : ''}`}
                    title="Selected words in Custom Value">
                    <input type="radio" data-ctrl="customValType" name="customValType"
                        checked={data.customValType === 'list'}
                        onChange={(evt) => this.updateState('customValType', 'list')} />
                    a|2
                </label>}
            {/* Values Range in Custom Value */}
            {data.type !== 'space' && !data.isConstant && !data.canSplit &&
                <label className={`rx-btn-text ${data.customValType === 'range' ? 'rx-checked' : ''}`}
                    title="Values Range in Custom Value">
                    <input type="radio" data-ctrl="customValType" name="customValType"
                        checked={data.customValType === 'range'}
                        onChange={(evt) => this.updateState('customValType', 'range')} />
                    a-b
                </label>}
            {/* !data.isConstant && !data.canSplit &&
                <label className={`rx-btn-text ${data.alphabets ? 'rx-checked' : ''}`}>
                    <input type="checkbox" data-ctrl="alphabets"
                        checked={data.alphabets}
                        onChange={(evt) => this.updateState('alphabets', evt.target.checked)} />
                    abc
                </label> */}
            {data.type !== 'space' && !data.canSplit &&
                <label>
                    {/* Minimum Length Control */}
                    <input type="text" data-ctrl="minLength"
                        title="Minimum Length"
                        value={data.minLength}
                        className="input-num"
                        placeholder="Min."
                        disabled={data.isOptional}
                        onChange={(evt) => this.updateState('minLength', evt.target.value)} />
                    {/* Maximum Length Control */}
                    <input type="text" data-ctrl="maxLength"
                        title="Maximum Length"
                        value={data.maxLength}
                        className="input-num"
                        placeholder="Max."
                        disabled={data.isConstant}
                        onChange={(evt) => this.updateState('maxLength', evt.target.value)} />
                </label>}
            {/* Custom Values Control */}
            {data.type !== 'space' && !data.isConstant && !data.canSplit &&
                <input type="text" data-ctrl="customValues"
                    title="Custom Values"
                    value={data.customValues}
                    className="input-text"
                    placeholder="Custom Values"
                    onChange={(evt) => this.updateState('customValues', evt.target.value)} />
            }
        </div>);
    }
}