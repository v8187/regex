import React, { Component } from 'react';

export class List extends Component {

    render() {
        return (<div className={`list-wrapper`}>
            <h1>Common Regular Expressions</h1>
            <p><b>Disclaimer: </b> These examples are given for learning purposes only and may fail for few use-cases.</p>
            <section>
                <h4>Decimal Number</h4>
                <p><code>{'/^\\d+(\\.\\d{1,2})?$/'}</code></p>
                <p>Float number with optional decimal upto 2 digits.</p>
            </section>
            <section>
                <h4>Email</h4>
                <p><code>{'/^[a-z\\d\\-_.]{5,}@[a-z]{2,}\\.[a-z]{1,4}$/i'}</code></p>
                <p> In Email "local-part " can have alphabets, number, "_", "-" and "." characters.
                    <br /> Followed by  "@" symbol
                    <br /> After that domain name should be of min 2 characters, then period ( . ) symbol.
                    <br />At the end, top-level domain should be of 1 to 4 characters.</p>
            </section>
            <section>
                <h4>Mobile Number (Indian)</h4>
                <p><code>{'/^\\d{10}$/'}</code></p>
                <p>Mobile number can have exactly 10 digits.</p>
            </section>
            <section>
                <h4>Pincode (Indian)</h4>
                <p><code>{'/^\\d{6}$/'}</code></p>
                <p>Pincode can have exactly 6 digits.</p>
            </section>
            <section>
                <h4>Permanent Account Number (PAN)</h4>
                <p><code>{'/^[A-Z]{5}\\d{4}[A-Z]$/'}</code></p>
                <p>PAN number starts with 5 alphabets, then 4 digits and ends with an alphabet.</p>
            </section>
            <section>
                <h4>Aadhaar Number</h4>
                <p><code>{'/^\\d{12}$/'}</code></p>
                <p>Aadhaar Number can have exactly 12 digits.</p>
            </section>
            <section>
                <h4>Vehicle Number (Indian)</h4>
                <p><code>{'/^[A-Z]{2}\\d{2}[A-Z]{0,2}\\d{4}$/'}</code></p>
                <p>Indian Vehicle number starts with 2 alphabets, 2 digits, then 1 or 2 alphabets (Optional) and ends with 4 digits.</p>
            </section>
        </div>);
    }
}