import React, { Component } from 'react';

export class About extends Component {

    render() {
        return (<div className={`about-wrapper`}>
            <h1>About</h1>
            <p><b>App Version:</b> 0.0.1.beta</p>
            <p><b>Developer:</b> Vikram Gupta</p>
            <p><b>Contact:</b> vikram1vicky@gmail.com</p>
        </div>);
    }
}