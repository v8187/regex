import React, { Component } from 'react';

export class Guide extends Component {

    render() {
        return (<div className={`guide-wrapper`}>
            <h1>Guide</h1>
            <div>
                <article>
                    <h3>
                        <span className="rx-btn-icon"><i className="fa fa-chain" /></span> Merge The Values
                    </h3>
                    <p>
                        Click this button to merge the two values (before and next to it).
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-icon"><i className="fa fa-pencil" /></span> Edit Options
                    </h3>
                    <p>
                        Click this button to Edit the settings for it. To provide more information about the sample value provided.
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-icon"><i className="fa fa-chain-broken" /></span> Split The Value
                    </h3>
                    <div>
                        Click this button to break down the values as given below:
                       <ol>
                            <li>
                                If the values is of same type (lowercase, uppercase, digit...), then it will be broken down into single character to configure each character seperately.
                           </li>
                            <li>
                                If the value is of mixed of uppercasee, lowercase, digits etc., then it be broken down based on type first.
                           </li>
                        </ol>
                    </div>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-icon"><i className="fa fa-unlock" /></span> Constant Value
                    </h3>
                    <p>
                        Click this button to make the constant. Means exactly the same values should be used.<br />
                        Min and Max length can be defined to tell if the whole given value should be used as it is or length may vary.
                    </p>
                    <input id="gisConstant" type="checkbox" />
                    <label htmlFor="gisConstant">
                        <span>Show</span><span>Hide</span> examples <i className="fa fa-sort-down"></i><i className="fa fa-sort-up"></i>
                    </label>
                    <p>
                        "disc" will be used as disc only.
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-text"> A </span> Uppercase Value
                    </h3>
                    <p>
                        Click this button to allow Uppercase values
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-text"> a </span> Lowercase Value
                    </h3>
                    <p>
                        Click this button to allow Lowercase values
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-text"> 123 </span> Numeric value
                    </h3>
                    <p>
                        Click this button to allow Numeric values
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-text"> #"$ </span> Special Character Value
                    </h3>
                    <p>
                        Click this button to allow Special character values<br />
                        Only the folllowing characters will be included.<br />
                        ${'` ~ ! @ # $ % ^ & * ( ) - _ = + [ { ] } \\ | ; : \' " , < . > / ?'}
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-text"> _ </span> Space
                    </h3>
                    <p>
                        Click this button to include space.
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-icon"><i className="fa fa-exclamation" /></span> Is Optional?
                    </h3>
                    <p>
                        Enable the button to decide if the given value is optional or required.
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-icon"><i className="fa fa-list" /></span> Need to Exclude it?
                    </h3>
                    <p>
                        Enable this button to decide whether the given value needs to be exclude or not.
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-text"> .* </span> Custom Value: Any
                    </h3>
                    <p>
                        Enable this button to provide selected characters (alphabets, numbers, others) to include/exclude.
                    </p>
                    <input id="gcustomValTypeAny" type="checkbox" />
                    <label htmlFor="gcustomValTypeAny">
                        <span>Show</span><span>Hide</span> examples <i className="fa fa-sort-down"></i><i className="fa fa-sort-up"></i>
                    </label>
                    <p>
                        "a-f" = any letter from a to f<br />
                        "2-6" = any digit from 2 to 6
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-text"> a|2 </span>  Custom Value: List
                    </h3>
                    <p>
                        Enable this button to provide selected words (probably alphabets, but can be others too) to include/exclude.
                    </p>
                    <input id="gcustomValTypeList" type="checkbox" />
                    <label htmlFor="gcustomValTypeList">
                        <span>Show</span><span>Hide</span> examples <i className="fa fa-sort-down"></i><i className="fa fa-sort-up"></i>
                    </label>
                    <p>
                        "a-f" = any letter from a to f<br />
                        "2-6" = any digit from 2 to 6
                    </p>
                </article>
                <article>
                    <h3>
                        <span className="rx-btn-text"> a-b </span>  Custom Value: Range
                    </h3>
                    <p>
                        Enable this button to provide selected ranges of (alphabets, numbers, others) to include/exclude.
                    </p>
                    <input id="gcustomValTypeRange" type="checkbox" />
                    <label htmlFor="gcustomValTypeRange">
                        <span>Show</span><span>Hide</span> examples <i className="fa fa-sort-down"></i><i className="fa fa-sort-up"></i>
                    </label>
                    <p>
                        "a-f" = any letter from a to f<br />
                        "2-6" = any digit from 2 to 6
                    </p>
                </article>
            </div>
        </div>);
    }
}