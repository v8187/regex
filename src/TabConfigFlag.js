import React, { Component } from 'react';

import { si, gi } from './utils';

export class TabConfigFlag extends Component {

    constructor(props) {

        super(props);

        this.state = {
            hasBegin: gi('flag:hasBegin') || false,
            hasEnd: gi('flag:hasEnd') || false,
            global: gi('flag:global') || false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.updateState = this.updateState.bind(this);
    }

    componentDidMount() { }

    componeneWillUnMount() { }

    updateState(prop, value) {
        var obj = {};
        obj[prop] = value;
        this.setState(obj);
        si(`flag:${prop}`, value);
    }

    handleSubmit(evt) {
        evt.preventDefault();

        this.props.onSubmit();
    }

    render() {
        const { hasBegin, hasEnd, global, onChange } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Configure the Expression:</h1>
                <ul>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                checked={hasBegin}
                                onChange={(evt) => onChange('hasBegin', evt.target.checked)} />
                            <i className={`fa ${hasBegin ? 'fa-check-square' : 'fa-square-o'}`}></i>
                            Valid value must be start of the given string.
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                checked={hasEnd}
                                onChange={(evt) => onChange('hasEnd', evt.target.checked)} />
                            <i className={`fa ${hasEnd ? 'fa-check-square' : 'fa-square-o'}`}></i>
                            Valid value must be end of the given string.
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                checked={global}
                                onChange={(evt) => onChange('global', evt.target.checked)} />
                            <i className={`fa ${global ? 'fa-check-square' : 'fa-square-o'}`}></i>
                            Test the all occurances in the given string.
                        </label>
                    </li>
                </ul>
            </form>
        );
    }
}