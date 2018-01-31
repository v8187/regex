import React, { Component } from 'react';

import { CategorizedValueClass } from './CategorizedValue.class';

export class CategorizedValue extends Component {

    constructor(props) {

        super(props);



        this.updateCateValsState = this.updateState.bind(this);
        this.handleConstant = this.handleConstant.bind(this);
        this.handleSplit = this.handleSplit.bind(this);
        this.handleSensitive = this.handleSensitive.bind(this);
        this.handleOptional = this.handleOptional.bind(this);
        this.handleMinValue = this.handleMinValue.bind(this);
        this.handleMaxValue = this.handleMaxValue.bind(this);
        this.handleCustomList = this.handleCustomList.bind(this);
        this.updateRegEx = this.updateRegEx.bind(this);

        this.state = {
            data: this.updateRegEx(this.props.data)
        };
    }

    componentDidMount() { }

    componeneWillUnMount() { }

    updateRegEx(data) {
        var strRegEx = '';
        if (data.isConstant) {
            // let setRange = data.minLength == data.maxLength && ();
            strRegEx += data.minLength == 1 && data.maxLength == 1 ? '' : '('
            strRegEx += data.chars;
            strRegEx += data.minLength == 1 && data.maxLength == 1 ? '' : `){${data.minLength == data.maxLength ? data.minLength : (`${data.isOptional ? 0 : data.minLength},${data.maxLength}`)}}`;
        } else if(!data.canSplit) {
            strRegEx += `[${data.alternateValues ? data.chars + data.alternateValues :
                (data.type === 'lowerAlpha' ? 'a-z' :
                    (data.type === 'upperAlpha' ? 'A-Z' :
                        (data.type === 'digit' ? '\\d' : '')))}]`;
            strRegEx += data.minLength == 1 && data.maxLength == 1 ? '' : `{${data.minLength == data.maxLength ? data.minLength : (`${data.isOptional ? 0 : data.minLength},${data.maxLength}`)}}`;
        }
        data.regEx = strRegEx;
        return data;
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
                (data.canSplit || data.isConstant) && (data.alternateValues = '');
                data.splitted = data.canSplit && !data.isConstant ? data.chars.split('').map((val, valI) => {
                    return new CategorizedValueClass(data.type, val);
                }) : null;
                break;
            default:
                data[prop] = val;
                break;
        }


        data = this.updateRegEx(data);
        this.setState({ data: data }, () => {
            this.props.onChange(this.state.data);
        });
    }

    handleConstant(evt) {
        this.updateState('isConstant', evt.target.checked);
    }

    handleSplit(evt) {
        this.updateState('canSplit', evt.target.checked);
    }

    handleSensitive(evt) {
        this.updateState('isSensitive', evt.target.checked);
    }

    handleOptional(evt) {
        this.updateState('isOptional', evt.target.checked);
    }

    handleMinValue(evt) {
        this.updateState('minLength', evt.target.value);
    }

    handleMaxValue(evt) {
        this.updateState('maxLength', evt.target.value);
    }

    handleCustomList(evt) {
        this.updateState('alternateValues', evt.target.value);
    }

    render() {
        let { data } = this.state;
        return (<div>{`${data.chars} (${data.type}) is `}
            {data.type !== 'space' &&
                <label><input type="checkbox" data-ctrl="isConstant"
                    checked={data.isConstant}
                    onChange={(event) => this.handleConstant(event)} /> constant value?</label>}
            {data.type !== 'space' && data.chars.length > 1 && !data.isConstant &&
                <label><input type="checkbox" data-ctrl="canSplit"
                    checked={data.canSplit}
                    onChange={(event) => this.handleSplit(event)} /> Further split this value?</label>}
            {(data.type === 'lowerAlpha' || data.type === 'upperAlpha') &&
                <label><input type="checkbox" data-ctrl="isSensitive"
                    checked={data.isSensitive}
                    onChange={(event) => this.handleSensitive(event)} /> Case-sensitive</label>}
            <label><input type="checkbox" data-ctrl="isOptional"
                checked={data.isOptional}
                onChange={(event) => this.handleOptional(event)} />Optional</label>
            {data.type !== 'space' && !data.isConstant && !data.canSplit &&
                <label>
                    <input type="text" data-ctrl="alternateValues"
                        value={data.alternateValues}
                        placeholder="Alternate Values"
                        onChange={(event) => this.handleCustomList(event)} />
                </label>}
            {data.type !== 'space' && !data.canSplit &&
                <label>
                    <input type="text" data-ctrl="minLength"
                        value={data.minLength}
                        placeholder="Min."
                        disabled={data.isOptional}
                        onChange={(event) => this.handleMinValue(event)} />
                    <input type="text" data-ctrl="maxLength"
                        value={data.maxLength}
                        placeholder="Max."
                        disabled={data.isConstant}
                        onChange={(event) => this.handleMaxValue(event)} />
                </label>}
        </div>);
    }
}