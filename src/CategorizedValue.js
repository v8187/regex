import React, { Component } from 'react';
import { OverlayTrigger } from 'react-bootstrap/lib';

// import { CategorizedValueClass } from './CategorizedValue.class';
import { updateRegEx } from './regex.service';
import { helpEdit } from './help_tips';

export class CategorizedValue extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: updateRegEx(this.props.data)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: updateRegEx(nextProps.data)
        });
    }

    render() {
        return (<OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={helpEdit}>
            <div className="cate-val-wrapper">
                <p>
                    {`${this.state.data.chars}`}
                    <a className="rx-btn-edit" onClick={this.props.onEdit}>
                        <i className="fa fa-pencil" />
                    </a>
                </p>
            </div>
        </OverlayTrigger>);
    }
}