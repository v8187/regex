import React, { Component } from 'react';

export class ControlWrapper extends Component {
    source;

    constructor(props) {

        super(props);

        this.state = {};
    }

    remove(evt) {
        evt.preventDefault();
        this.props.onRemove();
    }

    render() {

        return (<li className={this.props.className}>
            <i className="icon handle-icon">:::</i>
            <div className="control-element">
                {this.props.children}
                <input
                    onClick={this.remove.bind(this)}
                    type="button" className="del-btn" value="x" />
            </div>
        </li>);
    }
}