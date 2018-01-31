import React, { Component } from 'react';
// import Sortable from 'sortablejs';

// import { Token } from './models';
import { InputTab } from './InputTab';
import { ConfirmInputTab } from './ConfirmInputTab';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: [],
            inputValue: 'asa23fdADf',
            currentTab: 'input'
        };

        // this.handleSort = this.handleSort.bind(this);
        this.handleInputNext = this.handleInputNext.bind(this);
        this.handleConfirmInputNext = this.handleConfirmInputNext.bind(this);
        this.handleConfirmInputBack = this.handleConfirmInputBack.bind(this);
    }

    componentDidMount() {
        /* this.sortable = new Sortable(this.elUl, {
            handle: '.handle-icon',
            sort: true,
            onSort: this.handleSort
        }); */
    }

    componeneWillUnMount() {
        this.sortable = null;
    }

    handleSort(evt) {
        /* console.log('Sortable: onSort', evt);
        var firstTokenId = this.elUl.childNodes[0].id;
        this.setState({
            tokenControls: this.state.tokenControls.map(tkn => {
                tkn.canJoin = tkn.id !== firstTokenId;
                return tkn;
            }, this)
        }); */
    }

    handleInputNext(categorizedValues, inputValue) {
        this.setState({
            categorizedValues: categorizedValues,
            inputValue: inputValue,
            currentTab: 'confirmInput'
        }, () => {
            console.log('handleInputNext', this.state.categorizedValues, this.state.inputValue);
        });
    }

    handleConfirmInputNext() {
        /*  this.setState({
             currentTab: 'confirmInput'
         }, () => { */
        // console.log('handleConfirmInputNext', this.state.categorizedValues, this.state.inputValue);
        var strRegEx = '';
        this.state.categorizedValues.forEach(cVal => {
            strRegEx += cVal.regEx;
            // if (cVal.isConstant) {
            //     // let setRange = cVal.minLength == cVal.maxLength && ();
            //     strRegEx += cVal.minLength == 1 && cVal.maxLength == 1 ? '' : '('
            //     strRegEx += cVal.chars;
            //     strRegEx += cVal.minLength == 1 && cVal.maxLength == 1 ? '' : `){${cVal.minLength == cVal.maxLength ? cVal.minLength : (`${cVal.isOptional ? 0 : cVal.minLength},${cVal.maxLength}`)}}`;
            // } else {
                if (cVal.canSplit && cVal.splitted && cVal.splitted.length) {
                    cVal.splitted.forEach((splt) => {
                        strRegEx += cVal.regEx;
                        // let setRange = splt.minLength == splt.maxLength || (splt.minLength == 1 && splt.maxLength == 1);
                        // if (splt.isConstant) {
                        //     // let setRange = splt.minLength == splt.maxLength && (splt.minLength != 1 && splt.maxLength != 1);
                        //     strRegEx += splt.minLength == 1 && splt.maxLength == 1 ? '' : '('
                        //     strRegEx += splt.chars;
                        //     strRegEx += splt.minLength == 1 && splt.maxLength == 1 ? '' : `){${splt.minLength == splt.maxLength ? splt.minLength : (`${splt.isOptional ? 0 : splt.minLength},${splt.maxLength}`)}}`;
                        // } else {
                        //     strRegEx += `[${splt.alternateValues ? splt.chars + splt.alternateValues :
                        //         (splt.type === 'lowerAlpha' ? 'a-z' :
                        //             (splt.type === 'upperAlpha' ? 'A-Z' :
                        //                 (splt.type === 'digit' ? '\\d' : '')))}]`;
                        //     strRegEx += splt.minLength == 1 && splt.maxLength == 1 ? '' : `{${splt.minLength == splt.maxLength ? splt.minLength : (`${splt.isOptional ? 0 : splt.minLength},${splt.maxLength}`)}}`;
                        // }
                    }, this);
                } else {
                    strRegEx += cVal.regEx;
                    // strRegEx += `[${cVal.alternateValues ? cVal.chars + cVal.alternateValues :
                    //     (cVal.type === 'lowerAlpha' ? 'a-z' :
                    //         (cVal.type === 'upperAlpha' ? 'A-Z' :
                    //             (cVal.type === 'digit' ? '\\d' : '')))}]`;
                    // strRegEx += cVal.minLength == 1 && cVal.maxLength == 1 ? '' : `{${cVal.minLength == cVal.maxLength ? cVal.minLength : (`${cVal.isOptional ? 0 : cVal.minLength},${cVal.maxLength}`)}}`;
                }
            // }
        });
        console.log(strRegEx);
        // });
    }

    handleConfirmInputBack() {
        this.setState({
            currentTab: 'input'
        }, () => {
            console.log('handleConfirmInputBack');
        });
    }

    render() {
        return (
            <div>
                {this.state.currentTab === 'input' &&
                    <InputTab
                        categorizedValues={this.state.categorizedValues}
                        inputValue={this.state.inputValue}
                        onNext={this.handleInputNext} />}
                {this.state.currentTab === 'confirmInput' &&
                    <ConfirmInputTab
                        categorizedValues={this.state.categorizedValues}
                        onNext={this.handleConfirmInputNext}
                        onBack={this.handleConfirmInputBack} />}
            </div>
        );
    }
}

export default App;