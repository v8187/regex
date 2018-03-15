import React, { Component } from 'react';

import { ToolBar } from './ToolBar';
import { Guide } from './Guide';
import { InputTab } from './InputTab';
import { ConfirmInputTab } from './ConfirmInputTab';


export class Generator extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: [],
            inputValue: 'vikrAM-1234gupta@yhaoo.com',
            currentTab: 'input',
            showGuide: false
        };

        this.onChangeFromInputTab = this.onChangeFromInputTab.bind(this);
        this.onChangeFromConfirmInputTab = this.onChangeFromConfirmInputTab.bind(this);
        this.handleConfirmInputBack = this.handleConfirmInputBack.bind(this);
        this.doNext = this.doNext.bind(this);
        this.doBack = this.doBack.bind(this);
        this.doHelp = this.doHelp.bind(this);
    }

    componentDidMount() {

    }

    componeneWillUnMount() {


    }


    onChangeFromInputTab(categorizedValues, inputValue) {

        this.setState({
            categorizedValues: categorizedValues,
            inputValue: inputValue
        }, () => {
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
            console.log('handleConfirmInputBack');
        });
    }

    doNext() {
        switch (this.state.currentTab) {
            case 'input':
            default:
                this.setState({ currentTab: 'confirmInput' });
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
                this.setState({ showGuide: 'input' });
                break;
        }
    }

    doHelp() {
        this.setState({ showGuide: !this.state.showGuide });
    }

    render() {
        return (
            <div className="generator">
                <ToolBar
                    currentTab={this.state.currentTab}
                    showGuide={this.state.showGuide}
                    doNext={this.doNext}
                    doBack={this.doBack}
                    doHelp={this.doHelp} />
                <Guide showGuide={this.state.showGuide} />
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