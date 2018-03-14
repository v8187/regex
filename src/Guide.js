import React, { Component } from 'react';

export class Guide extends Component {

    constructor(props) {

        super(props);
    }

    render() {
        return (<div className="guide-wrapper">
            <h1>Guide</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Description</th>
                        <th>Samples</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> <span className="rx_btn_text">a-b</span></td>
                        <td>This button to decide whether the values given in custom value field, is a range or not.<br />
                            Range can be of alphabets and digits.
                        </td>
                        <td>"a-f" = any letter from a to f<br />
                            "2-6" = any digit from 2 to 6</td>
                    </tr>
                    <tr>
                        <td> <span className="rx_btn_text">a-b</span></td>
                        <td>This button to decide whether the values given in custom value field, is a range or not.<br />
                            Range can be of alphabets and digits.
                        </td>
                        <td>- "a-f" = any letter from a to field<br />
                            - "2-6" = any digit from 2 to 6</td>
                    </tr>
                </tbody>
            </table>

        </div>);
    }
}