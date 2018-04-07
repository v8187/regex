import React, { Component } from 'react';

import { si, gi } from '../../../utils/utils';
import { TestModel } from '../../../models/Test.model';

const _renderTests = (ctx) => {
    const tests = ctx.state.tests;

    return tests.map((test, i) => {
        return (<li key={i}>
            <input type="text"
                value={test.value}
                onChange={(evt) => ctx.updateTest(i, evt.target.value, evt)} />
            <span>
                {test.passed && test.value && <span className="passed">
                    <i className="fa fa-check"></i> Passed
                </span>}
                {!test.passed && test.value && <span className="failed">
                    <i className="fa fa-times"></i> Failed
                </span>}
            </span>
            {tests.length < 10 && <button className="btn-add" onClick={(evt) => ctx.addTest(evt)}>
                <i className="fa fa-plus"></i>
            </button>}
            {tests.length > 1 && <button className="btn-remove" onClick={(evt) => ctx.removeTest(evt, i)}>
                <i className="fa fa-minus"></i>
            </button>}
        </li>);
    }, ctx);
};

export class TabOutput extends Component {

    constructor(props) {

        super(props);
        var _tests = gi('regexp-tests', null);
        if (_tests !== null) {
            _tests = JSON.parse(_tests);
            _tests = _tests.map(test => {
                return new TestModel(test);
            });
        }



        this.state = {
            // regExp: new RegExp(matches[1], matches[2]),
            // outputRegExStr: this.props.outputRegExStr || '',
            tests: _tests || [new TestModel()]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateTest = this.updateTest.bind(this);
        this.addTest = this.addTest.bind(this);
        this.removeTest = this.removeTest.bind(this);
    }

    get regExp() {
        var matches = this.props.outputRegExStr.match(/^\/(\^?[^$]+\$?)\/(g?)$/);
        console.log(new RegExp(matches[1], matches[2]));

        return new RegExp(matches[1], matches[2]);
    }

    handleInputChange(evt) {
        evt && evt.preventDefault();
        this.setState({ outputRegExStr: this.elTA.value });
    }

    updateTest(i, val, evt) {
        evt && evt.preventDefault();
        var _tests = this.state.tests;
        _tests[i].value = val;
        _tests[i].passed = this.regExp.test(val);
        this.setState({ tests: _tests });
        si('regexp-tests', JSON.stringify(_tests));
    }

    addTest(evt) {
        evt && evt.preventDefault();
        this.state.tests.push(new TestModel());
        this.setState({ test: this.state.tests });
        si('regexp-tests', JSON.stringify(this.state.tests));
    }

    removeTest(evt, i) {
        evt && evt.preventDefault();
        this.state.tests.splice(i, 1);
        this.setState({ test: this.state.tests });
        si('regexp-tests', JSON.stringify(this.state.tests));
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="output-tab">
                <h1>Test The Values:</h1>
                <div>
                    <input type="text"
                        readOnly
                        ref={textarea => this.elTA = textarea}
                        onChange={this.handleInputChange}
                        value={this.props.outputRegExStr} />
                    <ul>
                        {_renderTests(this)}
                    </ul>
                </div>
            </form>
        );
    }
}