import React, { Component } from 'react';

// import srvcData from './data.service';

import { splitValue } from './regex.service';

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

        var val = this.elTA.value;
        this.setState({
            categorizedValues: splitValue(val),
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
        return (
            <form onSubmit={this.handleSubmit} className="input_tab">
                <input type="text"
                    ref={textarea => this.elTA = textarea}
                    onChange={this.handleInputChange}
                    value={this.state.inputValue} />
            </form>
        );
    }
}