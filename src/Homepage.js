import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class Homepage extends Component {

    constructor(props) {

        super(props);
    }

    render() {
        return (<div className={`homepage-wrapper`}>
            <ul>
                <li>
                    <NavLink to="/contact" activeClassName="active" title="Contact Me">
                        <i className="fa fa-envelope"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/feedback" activeClassName="active" title="Share Feedback">
                        <i className="fa fa-commenting"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/generator" activeClassName="active" title="Create Regular Expression">
                        <i className="fa fa-gears"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/readymade" activeClassName="active" title="Readymade Regular Expressions">
                        <i className="fa fa-list"></i>
                    </NavLink>
                </li>
            </ul>
        </div>);
    }
}