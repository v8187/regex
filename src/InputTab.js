import React, { Component } from 'react';

import { CategorizedValueClass } from './CategorizedValue.class';

export class InputTab extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: this.props.categorizedValues || [],
            value: this.props.inputValue || ''
        };

        this.handleSort = this.handleSort.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        /* this.sortable = new Sortable(this.elUl, {
            handle: '.handle-icon',
            sort: true,
            onSort: this.handleSort
        }); */
    }

    componeneWillUnMount() {
        this.sortable = null;
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

    handleTextAreaChange(evt) {
        evt.preventDefault();

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

        this.setState({
            categorizedValues: catVals,
            value: val
        }, () => { /* console.log(this.state.categorizedValues); */ });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        this.props.onNext(this.state.categorizedValues, this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea cols="50" rows="10"
                    ref={textarea => this.elTA = textarea}
                    onChange={this.handleTextAreaChange}
                    value={this.state.value}></textarea>
                <div>
                    <input type="submit" value="Next" />
                </div>
            </form>
        );
    }
}