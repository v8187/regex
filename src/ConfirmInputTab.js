import React, { Component } from 'react';

import { CategorizedValue } from './CategorizedValue';

const _renderValues = (ctx, categorizedValues, j) => {
    return categorizedValues.map((item, i) => {
        return (<li key={`${i}${j !== undefined ? j : ''}`}>
            <CategorizedValue data={item} onChange={data => { ctx.onItemChnage(data, i, j); }} />
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

        
        this.onItemChnage = this.onItemChnage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() { }

    componeneWillUnMount() { }
    
    onItemChnage(data, i, j) {
        Object.assign(j === undefined ?
            this.state.categorizedValues[i] :
            this.state.categorizedValues[j].splitted[i], data);

        this.setState({
            categorizedValues: this.state.categorizedValues
        });
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