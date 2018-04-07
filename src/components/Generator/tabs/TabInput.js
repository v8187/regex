import React, { Component } from 'react';

import { si, ri } from '../../../utils/utils';
import { splitValue } from '../../../services/regex.service';

export class TabInput extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: this.props.categorizedValues || [],
            inputValue: this.props.inputValue || ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        this.handleInputChange();
    }

    handleInputChange(evt) {
        evt && evt.preventDefault();

        var val = this.elTA.value;
        this.setState({
            categorizedValues: splitValue(val),
            inputValue: val
        }, () => {
            this.props.onChange(this.state.categorizedValues, this.state.inputValue);
            si('inputValue', this.state.inputValue);
            si('categorizedValues', this.state.categorizedValues);
            if (evt) {
                ri('selectedCatVal');
                ri('selectedI');
            }
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="input-tab">
                <h1>Provide a value:</h1>
                <div>
                    <p>Enter a valid value for which Regular Expression needs to be created.</p>
                    <input type="text"
                        ref={textarea => this.elTA = textarea}
                        onChange={this.handleInputChange}
                        value={this.state.inputValue} />
                </div>
            </form>
        );
    }
}