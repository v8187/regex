import React, { Component } from 'react';

import { si, gi } from './utils';
import { ToolBar } from './ToolBar';
import { InputTab } from './InputTab';
import { ConfirmInputTab } from './ConfirmInputTab';
import { CategorizedValueClass } from './CategorizedValue.class';



export class Generator extends Component {

    constructor(props) {

        super(props);
        var _categorizedValues = (gi('categorizedValues') || []).map(catVal => {
            return new CategorizedValueClass(catVal.type, catVal.chars);
        });

        this.state = {
            categorizedValues: _categorizedValues,
            inputValue: gi('inputValue') || 'vikrAM-1234gupta@yhaoo.com',
            currentTab: gi('currentTab') || 'input'/* ,
            showGuide: false */
        };

        this.onChangeFromInputTab = this.onChangeFromInputTab.bind(this);
        this.onChangeFromConfirmInputTab = this.onChangeFromConfirmInputTab.bind(this);
        this.handleConfirmInputBack = this.handleConfirmInputBack.bind(this);
        this.doNext = this.doNext.bind(this);
        this.doBack = this.doBack.bind(this);
        // this.doHelp = this.doHelp.bind(this);
    }

    componentDidMount() { }

    componeneWillUnMount() { }

    onChangeFromInputTab(categorizedValues, inputValue) {

        this.setState({
            categorizedValues: categorizedValues,
            inputValue: inputValue
        }, () => {
            si('categorizedValues', categorizedValues);
            si('inputValue', inputValue);
            console.log('onChangeFromInputTab', this.state.categorizedValues, this.state.inputValue);
        });
    }

    onChangeFromConfirmInputTab() {
        var strRegEx = '';

        this.state.categorizedValues.forEach(cVal => {
            if (cVal.canSplit && cVal.splitted && cVal.splitted.length) {
                cVal.splitted.forEach((splt) => {
                    strRegEx += splt.regEx;
                }, this);
            } else {
                strRegEx += cVal.regEx;
            }
        });
        console.log(strRegEx);
    }

    handleConfirmInputBack() {

        this.setState({
            currentTab: 'input'
        }, () => {
            si('currentTab', 'input');
            console.log('handleConfirmInputBack');
        });
    }

    doNext() {
        switch (this.state.currentTab) {
            case 'input':
            default:
                this.setState({ currentTab: 'confirmInput' });
                si('currentTab', 'confirmInput');
                break;
            case 'confirmInput':
                this.onChangeFromConfirmInputTab();
                break;
        }
    }

    doBack() {
        switch (this.state.currentTab) {
            case 'input':
            default:
                break;
            case 'confirmInput':
                this.setState({ currentTab: 'input' });
                si('currentTab', 'input');
                break;
        }
    }

    doHelp() {
        // this.setState({ showGuide: !this.state.showGuide });
    }

    render() {
        return (
            <div className="generator">
                <ToolBar
                    currentTab={this.state.currentTab}
                    /* showGuide={this.state.showGuide} */
                    doNext={this.doNext}
                    doBack={this.doBack}
                    /* doHelp={this.doHelp} */ />

                {this.state.currentTab === 'input' &&
                    <InputTab
                        /* styles={styles} */
                        categorizedValues={this.state.categorizedValues}
                        inputValue={this.state.inputValue}
                        onChange={this.onChangeFromInputTab}
                        onSubmit={this.doNext} />}
                {this.state.currentTab === 'confirmInput' &&
                    <ConfirmInputTab
                        /*  styles={styles} */
                        categorizedValues={this.state.categorizedValues}
                        onChange={this.onChangeFromConfirmInputTab}
                        onSubmit={this.doNext}
                        onBack={this.handleConfirmInputBack} />}
            </div>
        );
    }
}