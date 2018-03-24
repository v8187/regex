import React, { Component } from 'react';

import { si, gi } from './utils';

class TestModel {
    constructor(options) {
        this.value = options && options.value !== undefined ? options.value : '';
        this.valid = options && options.valid !== undefined ? options.valid : false;
    }
};

const _renderTests = (ctx) => {
    const tests = ctx.state.tests,
        len = tests.length;

    return tests.map((test, i) => {
        return (<li key={i}>
            <input type="text"
                value={test.value}
                onChange={(evt) => ctx.updateTest(i, evt.target.value, evt)} />
            {test.passed && <span className="passed">
                Passed <i className="fa fa-tick"></i>
            </span>}
            {!test.passed && <span className="Failed">
                Failed <i className="fa fa-tick"></i>
            </span>}
            <button className="btn-add">
                <i className="fa fa-plus"></i>
            </button>
            <button className="btn-remove">
                <i className="fa fa-track"></i>
            </button>
        </li>);
    }, ctx);
};

export class OutputTab extends Component {

    constructor(props) {

        super(props);
        var _tests = gi('regexp-tests');
        if (_tests !== null) {
            _tests = JSON.parse(_tests);
            _tests = _tests.map(test => {
                return new TestModel(test);
            });
        }
        this.state = {
            outputValue: this.props.outputValue || '',
            tests: _tests || [new TestModel()]
        };
        this.regExp = new RegExp(this.state.outputValue);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateTest = this.updateTest.bind(this);
    }

    componentDidMount() { }

    componeneWillUnMount() { }

    handleInputChange(evt) {
        evt && evt.preventDefault();

        var val = this.elTA.value;
        this.setState({
            outputValue: val
        }, () => {
            // this.props.onChange(this.state.categorizedValues, this.state.outputValue);
        });
    }

    updateTest(i, val, evt) {
        evt && evt.preventDefault();

        this.state.tests[i].value = val;
        this.state.tests[i].passed = this.regExp.test(val);
        this.setState({ tests: this.tests });
        si('regexp-tests', JSON.stringify(this.state.tests));
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit();
        // srvcData.data('currentTab', 'confirmInput');
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="output-tab">
                <input type="text"
                    readOnly
                    ref={textarea => this.elTA = textarea}
                    onChange={this.handleInputChange}
                    value={this.state.outputValue} />
                <ul>
                    {_renderTests(this)}
                </ul>
            </form>
        );
    }
}