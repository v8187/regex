import React, { Component } from 'react';

// import srvcData from './data.service';

import { CategorizedValueClass } from './CategorizedValue.class';

// var _subscriptions = [];

export class InputTab extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: this.props.categorizedValues || [],
            inputValue: this.props.inputValue || ''
        };

        this.handleSort = this.handleSort.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        this.handleInputChange();
        /* this.sortable = new Sortable(this.elUl, {
            handle: '.handle-icon',
            sort: true,
            onSort: this.handleSort
        }); */
        // _subscriptions.push(
        //     srvcData.categorizedValues$.subscribe(categorizedValues => {
        //         this.setState({ categorizedValues: categorizedValues });
        //     }),
        //     srvcData.inputValue$.subscribe(inputValue => {
        //         this.setState({ inputValue: inputValue });
        //         this.handleInputChange();
        //     })
        // );
    }

    componeneWillUnMount() {
        this.sortable = null;
        // _subscriptions.map(subcr => {
        //     subcr.unsubscribe();
        // });
    }

    handleSort(evt) {
        /* console.log('Sortable: onSort', evt);
        var firstTokenId = this.elUl.childNodes[0].id;
        this.setState({
            tokenControls: this.state.tokenControls.map(tkn => {
                tkn.canJoin = tkn.id !== firstTokenId;
                return tkn;
            }, this)
        }); */
    }

    handleInputChange(evt) {
        evt && evt.preventDefault();

        var val = this.elTA.value,
            lastItem, catVals = [],
            _fn = (char, type) => {
                if (lastItem && lastItem.type === type) {
                    lastItem.chars += char;
                    lastItem.maxLength = lastItem.chars.length;
                } else {
                    catVals.push(lastItem = new CategorizedValueClass(type, char));
                }
            };

        val.split('').forEach((char, i) => {
            lastItem = catVals[catVals.length - 1];

            if (/[a-z]/.test(char)) {
                _fn(char, 'lowerAlpha');
            } else if (/[A-Z]/.test(char)) {
                _fn(char, 'upperAlpha');
            } else if (/\d/.test(char)) {
                _fn(char, 'digit');
            } else if (/\s/.test(char)) {
                _fn(char, 'space');
            } else if (/[^a-z\d\s]/i.test(char)) {
                _fn(char, 'special');
            }
        }, this);
        // srvcData.data('categorizedValues', catVals);
        // evt && srvcData.data('inputValue', val);
        console.log(catVals);
        this.setState({
            categorizedValues: catVals,
            inputValue: val
        }, () => {
            this.props.onChange(this.state.categorizedValues, this.state.inputValue);
            /* console.log(this.state.categorizedValues); */
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit();
        // srvcData.data('currentTab', 'confirmInput');
    }

    render() {
        console.log('InputTab', this.state);
        return (
            <form onSubmit={this.handleSubmit} className={this.props.styles.input_tab}>
                <input type="text"
                    ref={textarea => this.elTA = textarea}
                    onChange={this.handleInputChange}
                    value={this.state.inputValue} />
                {/* <div>
                    <button type="button" onClick={this.handleSubmit}>
                        <i className="fa fa-angle-double-right" />
                    </button>
                </div> */}
            </form>
        );
    }
}