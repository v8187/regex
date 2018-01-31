import React, { Component } from 'react';

import { CategorizedValueClass } from './CategorizedValue.class';

export class CategorizedValue extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: this.props.data
        };

        this.updateCateValsState = this.updateState.bind(this);
        this.handleStatic = this.handleStatic.bind(this);
        this.handleSplit = this.handleSplit.bind(this);
        this.handleSensitive = this.handleSensitive.bind(this);
        this.handleOptional = this.handleOptional.bind(this);
        this.handleMinValue = this.handleMinValue.bind(this);
        this.handleMaxValue = this.handleMaxValue.bind(this);
        this.handleCustomList = this.handleCustomList.bind(this);
    }

    componentDidMount() { }

    componeneWillUnMount() { }

    updateState(prop, val) {
        var { data } = this.state;

        switch (prop) {
            case 'isOptional':
                data.minLength = val ? 0 : 1;
                data.isOptional = val;
                break;
            case 'minLength':
                data.minLength = val > data.maxLength ? data.minLength : val;
                break;
            case 'maxLength':
                data.maxLength = val < data.minLength ? data.maxLength : val;
                break;
            case 'canSplit':
            case 'isStatic':
                data[prop] = val;
                (data.canSplit || data.isStatic) && (data.customList = '');
                data.splitted = data.canSplit && !data.isStatic ? data.chars.split('').map((val, valI) => {
                    return new CategorizedValueClass(data.type, val);
                }) : null;
                break;
            default:
                data[prop] = val;
                break;
        }
        this.setState({ data: data }, () => {
            this.props.onChange(this.state.data);
        });
    }

    handleStatic(evt) {
        this.updateState('isStatic', evt.target.checked);
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
        this.updateState('customList', evt.target.value);
    }

    render() {
        let { data } = this.state;
        return (<div>{`${data.chars} (${data.type})`}
            {data.type !== 'space' &&
                <label><input type="checkbox" data-ctrl="isStatic"
                    checked={data.isStatic}
                    onChange={(event) => this.handleStatic(event)} /> Is a static value?</label>}
            {data.type !== 'space' && data.chars.length > 1 && !data.isStatic &&
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
            {data.type !== 'space' && !data.isStatic && !data.canSplit &&
                <label>
                    <input type="text" data-ctrl="customList"
                        value={data.customList}
                        placeholder="Custom List"
                        onChange={(event) => this.handleCustomList(event)} />
                </label>}
            {data.type !== 'space' && data.chars.length > 1 && !data.canSplit &&
                <label>
                    {!data.isOptional && <input type="text" data-ctrl="minLength"
                        value={data.minLength}
                        placeholder="Min."
                        onChange={(event) => this.handleMinValue(event)} />}
                    <input type="text" data-ctrl="maxLength"
                        value={data.maxLength}
                        placeholder="Max."
                        onChange={(event) => this.handleMaxValue(event)} />
                </label>}
        </div>);
    }
}