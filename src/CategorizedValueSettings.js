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
                //     return new CategorizedValueClass(data.type, val);
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

        return (<div className="cate_val_settings_wrapper">
            <p>{`${data.chars}`}</p>
            {/* Can Split Control */}
            {data.type !== 'space' && data.chars.length > 1 && !data.isConstant &&
                <label className={`rx_btn_icon ${data.canSplit ? 'rx_checked' : ''}`}
                    title="Split the text">
                    <input type="checkbox" data-ctrl="canSplit"
                        checked={data.canSplit}
                        onChange={(evt) => this.updateState('canSplit', evt.target.checked)} />
                    <i className="fa fa-chain-broken" />
                </label>}
            {/* Is Constant Control */}
            {data.type !== 'space' && !data.canSplit &&
                <label className={`rx_btn_icon ${data.isConstant ? 'rx_checked' : ''}`}
                    title="Can Split">
                    <input type="checkbox" data-ctrl="isConstant"
                        checked={data.isConstant}
                        onChange={(evt) => this.updateState('isConstant', evt.target.checked)} />
                    <i className={`fa fa-${data.isConstant ? 'lock' : 'unlock'}`} />
                </label>}
            {/* Can Upper Case Control */}
            {!data.canSplit &&
                <label className={`rx_btn_text ${data.canUpper ? 'rx_checked' : ''}`}
                    title="Can Split">
                    <input type="checkbox" data-ctrl="canUpper"
                        checked={data.canUpper}
                        onChange={(evt) => this.updateState('canUpper', evt.target.checked)} />
                    A
                </label>}
            {/* Can Lower Case Control */}
            {!data.canSplit &&
                <label className={`rx_btn_text ${data.canLower ? 'rx_checked' : ''}`}
                    title="Can Split">
                    <input type="checkbox" data-ctrl="canLower"
                        checked={data.canLower}
                        onChange={(evt) => this.updateState('canLower', evt.target.checked)} />
                    a
                </label>}
            {/* is Optional Control */}
            {!data.canSplit &&
                <label className={`rx_btn_icon ${data.isOptional ? 'rx_checked' : ''}`}
                    title="Can Split">
                    <input type="checkbox" data-ctrl="isOptional"
                        checked={data.isOptional}
                        onChange={(evt) => this.updateState('isOptional', evt.target.checked)} />
                    <i className="fa fa-exclamation" />
                </label>}
            {/* Need To Exclude Control */}
            {data.type !== 'space' && !data.isConstant && !data.canSplit &&
                <label className={`rx_btn_icon ${data.exclude ? 'rx_checked' : ''}`}
                    title="Can Split">
                    <input type="checkbox" data-ctrl="exclude"
                        checked={data.exclude}
                        onChange={(evt) => this.updateState('exclude', evt.target.checked)} />
                    <i className={`fa fa-${data.exclude ? 'list-remove' : 'list'}`} />
                </label>}
            {/* !data.isConstant && !data.canSplit &&
                <label className={`rx_btn_text ${data.alphabets ? 'rx_checked' : ''}`}>
                    <input type="checkbox" data-ctrl="alphabets"
                        checked={data.alphabets}
                        onChange={(evt) => this.updateState('alphabets', evt.target.checked)} />
                    abc
                </label> */}
            {/* Can Digits Control */}
            {!data.isConstant && !data.canSplit &&
                <label className={`rx_btn_text ${data.canDigit ? 'rx_checked' : ''}`}
                    title="Can Split">
                    <input type="checkbox" data-ctrl="canDigit"
                        checked={data.canDigit}
                        onChange={(evt) => this.updateState('canDigit', evt.target.checked)} />
                    123
                </label>}
            {/* Can Special Characters Control */}
            {!data.isConstant && !data.canSplit &&
                <label className={`rx_btn_text ${data.canSpecial ? 'rx_checked' : ''}`}
                    title="Can Split">
                    <input type="checkbox" data-ctrl="canSpecial"
                        checked={data.canSpecial}
                        onChange={(evt) => this.updateState('canSpecial', evt.target.checked)} />
                    #"$
                </label>}
            {data.type !== 'space' && !data.canSplit &&
                <label>
                    {/* Minimum Length Control */}
                    <input type="text" data-ctrl="minLength"
                        title="Can Split"
                        value={data.minLength}
                        className="input_num"
                        placeholder="Min."
                        disabled={data.isOptional}
                        onChange={(evt) => this.updateState('minLength', evt.target.value)} />
                    {/* Maximum Length Control */}
                    <input type="text" data-ctrl="maxLength"
                        title="Can Split"
                        value={data.maxLength}
                        className="input_num"
                        placeholder="Max."
                        disabled={data.isConstant}
                        onChange={(evt) => this.updateState('maxLength', evt.target.value)} />
                </label>}
            {/* Custom Values Control */}
            {data.type !== 'space' && !data.isConstant && !data.canSplit &&
                <input type="text" data-ctrl="customValues"
                    title="Can Split"
                    value={data.customValues}
                    className="input_text"
                    placeholder="Custom Values"
                    onChange={(evt) => this.updateState('customValues', evt.target.value)} />
            }
        </div>);
    }
}