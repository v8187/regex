import React, { Component } from 'react';

// import srvcData from './data.service';

import { CategorizedValue } from './CategorizedValue';
import { CategorizedValueSettings } from './CategorizedValueSettings';
import { CategorizedValueClass } from './CategorizedValue.class';

// var _subscriptions = [];

const _renderValues = (ctx, categorizedValues, j) => {
    let len = categorizedValues.length;

    return categorizedValues.map((item, i) => {
        return (<li key={`${i}${j !== undefined ? j : ''}`}>
            {!item.splitted && <CategorizedValue
                data={item}
                styles={ctx.props.styles}
                onChange={data => { ctx.onItemChnage(data, i, j); }}
                onEdit={() => { ctx.handleEditClick(i, j); }} />}
            {(i < len - 1 || j !== undefined) && !item.splitted && (<a className="rx-btn-join" onClick={() => { ctx.handleJoinClick(i, j); }}>
                <i className="fa fa-chain" />
            </a>)}
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
            selectedI: undefined,
            selectedJ: undefined,
            selectedCatVal: undefined,
            categorizedValues: this.props.categorizedValues || []
        };

        this.onItemChnage = this.onItemChnage.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleJoinClick = this.handleJoinClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        // _subscriptions.push(
        //     srvcData.categorizedValues$.subscribe(categorizedValues => {
        //         this.setState({ categorizedValues: categorizedValues });
        //     }),
        //     srvcData.inputValue$.subscribe(inputValue => {
        //         this.setState({ inputValue: inputValue });
        //     }),
        //     srvcData.currentTab$.subscribe(currentTab => {
        //         this.setState({ currentTab: currentTab });
        //     }),
        //     srvcData.selectedCatVal$.subscribe(selectedCatVal => {
        //         this.setState({ selectedCatVal: selectedCatVal });
        //     }),
        //     srvcData.selectedI$.subscribe(selectedI => {
        //         this.setState({ selectedI: selectedI });
        //     }),
        //     srvcData.selectedJ$.subscribe(selectedJ => {
        //         this.setState({ selectedJ: selectedJ });
        //     })
        // );
    }

    componeneWillUnMount() {
        // _subscriptions.map(subcr => {
        //     subcr.unsubscribe();
        // });
    }

    onItemChnage(data, i, j) {
        Object.assign(j === undefined ?
            this.state.categorizedValues[i] :
            this.state.categorizedValues[j].splitted[i], data);

        // srvcData.data('categorizedValues', this.state.categorizedValues);
        this.setState({
            categorizedValues: this.state.categorizedValues
        });
    }

    handleEditClick(i, j) {
        // srvcData.data('selectedCatVal', j === undefined ?
        //     this.state.categorizedValues[i] :
        //     this.state.categorizedValues[j].splitted[i]);
        // srvcData.data('selectedI', i);
        // srvcData.data('selectedJ', j);
        this.setState({
            selectedCatVal: j === undefined ?
                this.state.categorizedValues[i] :
                this.state.categorizedValues[j].splitted[i],
            selectedI: i,
            selectedJ: j
        });
    }

    handleJoinClick(i, j) {
        let _categorizedValues = this.state.categorizedValues,
            dest = j === undefined ? _categorizedValues[i] : _categorizedValues[j].splitted[i],
            src = j === undefined ? _categorizedValues[i + 1] : _categorizedValues[j].splitted[i + 1];

        dest = new CategorizedValueClass('mixed', dest.chars + src.chars);

        if (j === undefined) {
            _categorizedValues.splice(i, 1, dest);
            _categorizedValues.splice(i + 1, 1);
        } else {
            _categorizedValues[j].splitted.splice(i, 1, dest);
            _categorizedValues[j].splitted.splice(i + 1, 1);
        }
        // srvcData.data('categorizedValues', _categorizedValues);
        this.setState({
            categorizedValues: _categorizedValues
        }, () => {
            this.state.selectedCatVal && this.handleEditClick(i, j);
            this.props.onChange(this.state.categorizedValues);
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        this.props.onSubmit();
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
                {!!this.state.selectedCatVal && <div>
                    <CategorizedValueSettings
                        data={this.state.selectedCatVal}
                        styles={this.props.styles}
                        onChange={data => { this.onItemChnage(data, this.state.selectedI, this.state.selectedJ); }} />
                </div>}
                {/* <div>
                    <button type="button" onClick={this.goBack}>
                        <i className="fa fa-angle-double-left" />
                    </button>
                    <button type="button" onClick={this.handleSubmit}>
                        <i className="fa fa-angle-double-right" />
                    </button>
                </div> */}
            </form>
        );
    }
}