import React, { Component } from 'react';

export class ToolBar extends Component {

    render() {
        return (<div className="rx-toolbar-wrapper">
            <div className="rx-nav-btns">
                <a
                    href="https://github.com/v8187/regex-generator/issues/new"
                    target="_blank"
                    rel="noopener noreferrer">
                    Report a Bug
                </a>
                {this.props.currentTab !== 'input' &&
                    <button type="button" onClick={this.props.doBack}>
                        <i className="fa fa-angle-double-left" />
                    </button>}
                {this.props.currentTab !== 'output' &&
                    <button type="button" onClick={this.props.doNext}>
                        <i className="fa fa-angle-double-right" />
                    </button>}
            </div>
        </div>);
    }
}