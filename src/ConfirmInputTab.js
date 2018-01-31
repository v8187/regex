import React, { Component } from 'react';

const _renderValues = (ctx) => {
    var { categorizedValues } = ctx.state;

    return categorizedValues.map((item, i) => {
        let { type } = item;
        return (<li key={i}>
            {`${item.chars} (${type})`}
            {type !== 'space' &&
                <label><input type="checkbox"
                    checked={item.isStatic}
                    onChange={(event) => ctx.handleStatic(event, i)} /> Is a static value?</label>}
            {type !== 'space' && item.chars.length > 1 && !item.isStatic &&
                <label><input type="checkbox"
                    checked={item.canSplit}
                    onChange={(event) => ctx.handleSplit(event, i)} /> Further split this value?</label>}
            {(type === 'lowerAlpha' || type === 'upperAlpha') &&
                <label><input type="checkbox"
                    checked={item.isSensitive}
                    onChange={(event) => ctx.handleSensitive(event, i)} /> Case-sensitive</label>}
            <label><input type="checkbox"
                checked={item.isOptional}
                onChange={(event) => ctx.handleOptional(event, i)} />Optional</label>
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() { }

    componeneWillUnMount() { }

    updateCateValsState(i, prop, val) {
        this.state.categorizedValues[i][prop] = val;
        this.setState({
            categorizedValues: this.state.categorizedValues
        });
    }

    handleStatic(evt, i) {
        this.updateCateValsState(i, 'isStatic', evt.target.checked);
    }

    handleSplit(evt, i) { }

    handleSensitive(evt, i) { }

    handleOptional(evt, i) { }

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
                    {_renderValues(this)}
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