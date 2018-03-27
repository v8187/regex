import React, { Component } from 'react';

// import srvcData from './data.service';

// var _subscriptions = [];

export class ToolBar extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: [],
            inputValue: '',
            currentTab: ''
        };

        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
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
        //     })
        // );
    }

    componeneWillUnMount() {
        // _subscriptions.map(subcr => {
        //     subcr.unsubscribe();
        // });
    }

    next(evt) {
        evt && evt.preventDefault();

        switch (this.state.currentTab) {
            case 'input':
            default:
                // srvcData.data('currentTab', 'configValue');
                break;
            case 'configValue':
                // srvcData.data('currentTab', 'configValue');
                break;
        }
    }

    back(evt) {
        evt && evt.preventDefault();
        switch (this.state.currentTab) {
            case 'input':
            default:
                // srvcData.data('currentTab', 'input');
                break;
            case 'configValue':
                // srvcData.data('currentTab', 'input');
                break;
        }
    }

    render() {
        return (<div className="rx-toolbar-wrapper">
            <div className="rx-nav-btns">
                {this.props.currentTab !== 'input' &&
                    <button type="button" onClick={this.props.doBack}>
                        <i className="fa fa-angle-double-left" />
                    </button>}
                {this.props.currentTab !== 'output' &&
                    <button type="button" onClick={this.props.doNext}>
                        <i className="fa fa-angle-double-right" />
                    </button>}
            </div>

            {/*  <div className="rx-help-btns">
                <button type="button" onClick={this.props.doHelp} className={this.props.showGuide ? 'active' : ''}>
                    <i className="fa fa-question" />
                </button>
            </div> */}
        </div>);
    }
}