import React, { Component } from 'react';
import { Switch, Route, HashRouter, NavLink, Redirect } from 'react-router-dom';

import { Generator } from './Generator/Index'
import { Guide } from './Guide';
import { List } from './List';
import { About } from './About';

import { } from '../scss/main.scss';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: [],
            inputValue: process.env.NODE_ENV === 'development' ? 'vikrAM-1234gupta@yhaoo.com' : '',
            currentTab: 'input',
            showGuide: false
        };
    }

    render() {
        return (
            <div className="root">
                <HashRouter>
                    <div>
                        <ul className="main-nav">
                            <li>
                                <NavLink to="/create" activeClassName="active" title="Contact Me">
                                    <i className="fa fa-gears"></i> Create
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/list" activeClassName="active" title="Contact Me">
                                    <i className="fa fa-list"></i> Library
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/guide" activeClassName="active" title="Contact Me">
                                    <i className="fa fa-question"></i> Guide
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" activeClassName="active" title="About">
                                    <i className="fa fa-info"></i> About
                                </NavLink>
                            </li>
                        </ul>
                        <Switch>
                            <Route path="/create" component={Generator} />
                            <Route path="/list" component={List} />
                            <Route path="/guide" component={Guide} />
                            <Route path="/about" component={About} />
                            <Route path="/" render={() => (<Redirect to="/create" />)} />
                        </Switch>
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default App;