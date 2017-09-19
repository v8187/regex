import React, { Component } from 'react';

export class ControlWrapper extends Component {
    source;

    constructor(props) {

        super(props);

        this.state = {
            deleted: false
        };
    }

    remove() {
        this.setState({ deleted: true });
    }

    render() {
        if (this.state.deleted) {
            return null;
        }
        var index = document.querySelectorAll('.token-control').length;

        return (<li className={this.props.className}>
            <i className="icon handle-icon">:::</i>
            <div className="token-control">
                {this.props.children}
                <input id={`ctrlDel${index}`}
                    onClick={this.remove.bind(this)}
                    type="button" className="del-btn" value="x" />
            </div>
        </li>);
    }
}