import React, { Component } from 'react';

import { CategorizedValue } from './CategorizedValue.class';

const _renderValues = (ctx, categorizedValues, j) => {
    return categorizedValues.map((item, i) => {
        let { type } = item;
        return (<li key={`${i}${j !== undefined ? j : ''}`}>
            {`${item.chars} (${type})`}
            {type !== 'space' &&
                <label><input type="checkbox"
                    checked={item.isStatic}
                    onChange={(event) => ctx.handleStatic(event, i, j)} /> Is a static value?</label>}
            {type !== 'space' && item.chars.length > 1 && !item.isStatic &&
                <label><input type="checkbox"
                    checked={item.canSplit}
                    onChange={(event) => ctx.handleSplit(event, i, j)} /> Further split this value?</label>}
            {(type === 'lowerAlpha' || type === 'upperAlpha') &&
                <label><input type="checkbox"
                    checked={item.isSensitive}
                    onChange={(event) => ctx.handleSensitive(event, i, j)} /> Case-sensitive</label>}
            <label><input type="checkbox"
                checked={item.isOptional}
                onChange={(event) => ctx.handleOptional(event, i, j)} />Optional</label>
            {type !== 'space' && !item.isStatic && !item.canSplit &&
                <label>
                    <input type="text"
                        value={item.customList}
                        placeholder="Custom List"
                        onChange={(event) => ctx.handleCustomList(event, i, j)} />
                </label>}
            {type !== 'space' && item.chars.length > 1 && !item.canSplit &&
                <label>
                    {!item.isOptional && <input type="text"
                        value={item.minLength}
                        placeholder="Min."
                        onChange={(event) => ctx.handleMinValue(event, i, j)} />}
                    <input type="text"
                        value={item.maxLength}
                        placeholder="Max."
                        onChange={(event) => ctx.handleMaxValue(event, i, j)} />
                </label>}
            {item.splitted && item.splitted.length && <ul>
                {_renderValues(ctx, item.splitted, i)}
            </ul>}
        </li>);
    }, ctx);
};

export class ConfirmInputTab extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: this.props.categorizedValues || []
        };

        this.updateCateValsState = this.updateCateValsState.bind(this);
        this.handleStatic = this.handleStatic.bind(this);
        this.handleSplit = this.handleSplit.bind(this);
        this.handleSensitive = this.handleSensitive.bind(this);
        this.handleOptional = this.handleOptional.bind(this);
        this.handleMinValue = this.handleMinValue.bind(this);
        this.handleMaxValue = this.handleMaxValue.bind(this);
        this.handleCustomList = this.handleCustomList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() { }

    componeneWillUnMount() { }

    updateCateValsState(i, j, prop, val) {
        var cVal = j === undefined ?
            this.state.categorizedValues[i] :
            this.state.categorizedValues[j].splitted[i];

        switch (prop) {
            case 'isOptional':
                cVal.minLength = val ? 0 : 1;
                cVal.isOptional = val;
                break;
            case 'minLength':
                cVal.minLength = val > cVal.maxLength ? cVal.minLength : val;
                break;
            case 'maxLength':
                cVal.maxLength = val < cVal.minLength ? cVal.maxLength : val;
                break;
            case 'canSplit':
            case 'isStatic':
                cVal[prop] = val;
                (cVal.canSplit || cVal.isStatic) && (cVal.customList = '');
                cVal.splitted = cVal.canSplit && !cVal.isStatic ? cVal.chars.split('').map((val, valI) => {
                    return new CategorizedValue(cVal.type, val);
                }) : null;
                break;
            default:
                cVal[prop] = val;
                break;
        }
        this.setState({
            categorizedValues: this.state.categorizedValues
        });
    }

    handleStatic(evt, i, j) {
        this.updateCateValsState(i, j, 'isStatic', evt.target.checked);
    }

    handleSplit(evt, i, j) {
        this.updateCateValsState(i, j, 'canSplit', evt.target.checked);
    }

    handleSensitive(evt, i, j) {
        this.updateCateValsState(i, j, 'isSensitive', evt.target.checked);
    }

    handleOptional(evt, i, j) {
        this.updateCateValsState(i, j, 'isOptional', evt.target.checked);
    }

    handleMinValue(evt, i, j) {
        this.updateCateValsState(i, j, 'minLength', evt.target.value);
    }

    handleMaxValue(evt, i, j) {
        this.updateCateValsState(i, j, 'maxLength', evt.target.value);
    }

    handleCustomList(evt, i, j) {
        this.updateCateValsState(i, j, 'customList', evt.target.value);
    }

    handleSubmit(evt) {
        evt.preventDefault();

        this.props.onNext();
    }

    goBack(evt) {
        evt.preventDefault();

        this.props.onBack();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {_renderValues(this, this.state.categorizedValues)}
                </ul>
                <div>
                    <input type="button" value="Back"
                        onClick={this.goBack} />
                    <input type="submit" value="Next" />
                </div>
            </form>
        );
    }
}