import React, { Component } from 'react';

import { si, gi } from './utils';

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

export class TabConfigValue extends Component {

    constructor(props) {

        super(props);
        var _selectedCatVal = gi('selectedCatVal');

        if (_selectedCatVal !== null) {
            _selectedCatVal = new CategorizedValueClass(_selectedCatVal);
        }

        this.state = {
            selectedI: gi('selectedI') || undefined,
            selectedJ: gi('selectedJ') || undefined,
            selectedCatVal: _selectedCatVal || undefined,
            categorizedValues: this.props.categorizedValues || []
        };

        this.onItemChnage = this.onItemChnage.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleJoinClick = this.handleJoinClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        si('selectedCatVal', data);
        this.setState({
            categorizedValues: this.state.categorizedValues
        }, () => {
            si('categorizedValues', this.state.categorizedValues);
        });

    }

    handleEditClick(i, j) {
        // srvcData.data('selectedCatVal', j === undefined ?
        //     this.state.categorizedValues[i] :
        //     this.state.categorizedValues[j].splitted[i]);
        // srvcData.data('selectedI', i);
        // srvcData.data('selectedJ', j);
        var _catVals = this.state.categorizedValues,
            _index = null/* ,
            _selCatVal = j === undefined ? _catVals[i] : _catVals[j].splitted[i] */;
        // console.log(`i: ${i}, j: ${j}`);
        _catVals.forEach((cv, k) => {
            if (cv.splitted && cv.splitted.length) {
                _index = k;
                if (i > k) {
                    i += cv.splitted.length - 1;
                }
                // console.log(`cv.splitted.length: ${cv.splitted.length}, k: ${k}`);
            }
        }, this);
        _catVals = _index === null ? _catVals :
            [].concat(_catVals.slice(0, _index), _catVals[_index].splitted, _catVals.slice(_index + 1));
        // console.log(_catVals);
        this.setState({
            categorizedValues: _catVals,
            selectedCatVal: _catVals[_index === null || j === undefined ? i : j + i],
            selectedI: _index === null || j === undefined ? i : j + i
        }, () => {
            si('categorizedValues', this.state.categorizedValues);
            si('selectedCatVal', this.state.selectedCatVal);
            si('selectedI', this.state.selectedI);
        });
    }

    handleJoinClick(i, j) {
        let _categorizedValues = this.state.categorizedValues,
            dest = j === undefined ? _categorizedValues[i] : _categorizedValues[j].splitted[i],
            src = j === undefined ? _categorizedValues[i + 1] : _categorizedValues[j].splitted[i + 1];

        dest = new CategorizedValueClass({ type: 'mixed', chars: dest.chars + src.chars });

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
            si('categorizedValues', this.state.categorizedValues);
            this.state.selectedCatVal && this.handleEditClick(i, j);
            this.props.onChange(this.state.categorizedValues);
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        this.props.onSubmit();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Configure the values:</h1>
                <div>
                    <p>Given value has been split based on: Upper/Lower case, Digits &amp; Special characters.
                    <br /> Click on Chain icon to merge values.
                    <br /> Click on Edit icon to configure it.</p>
                    <ul>
                        {_renderValues(this, this.state.categorizedValues)}
                    </ul>
                    {!!this.state.selectedCatVal && <div>
                        <CategorizedValueSettings
                            data={this.state.selectedCatVal}
                            styles={this.props.styles}
                            onChange={data => { this.onItemChnage(data, this.state.selectedI); }} />
                    </div>}
                </div>
            </form>
        );
    }
}