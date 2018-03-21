import React, { Component } from 'react';

export class List extends Component {

    render() {
        return (<div className={`list-wrapper`}>
            <h1>Common Regular Expressions</h1>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Expression</th>
                        <th>Valid values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Float number with optional decimal upto 2 digits</td>
                        <td><code>{'/\\d+(\\.\\d{1,2})?/'}</code></td>
                        <td>10</td>
                    </tr>
                </tbody>
            </table>
        </div>);
    }
}