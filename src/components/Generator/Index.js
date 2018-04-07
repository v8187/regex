import React, { Component } from 'react';

import { si, gi } from '../../utils/utils';
import { ToolBar } from './ToolBar';
import { TabInput } from './tabs/TabInput';
import { TabConfigValue } from './tabs/TabConfigValue';
import { TabConfigFlag } from './tabs/TabConfigFlag';
import { TabOutput } from './tabs/TabOutput';
import { CategorizedValueModel } from '../../models/CategorizedValue.model';

export class Generator extends Component {

    constructor(props) {

        super(props);
        var _categorizedValues = gi('categorizedValues', []).map(catVal => {
            return new CategorizedValueModel(catVal);
        });

        this.state = {
            categorizedValues: _categorizedValues,
            inputValue: gi('inputValue', 'vikrAM-1234gupta@yhaoo.com'),
            hasBegin: gi('flag:hasBegin', false),
            hasEnd: gi('flag:hasEnd', false),
            global: gi('flag:global', false),
            outputRegExStr: gi('outputRegExStr', null),
            currentTab: gi('currentTab', 'input')
        };

        this.onChangeFromTabInput = this.onChangeFromTabInput.bind(this);
        this.onChangeFromTabConfigValue = this.onChangeFromTabConfigValue.bind(this);
        this.onChangeFromTabConfigFlag = this.onChangeFromTabConfigFlag.bind(this);
        this.onChangeFromTabOutput = this.onChangeFromTabOutput.bind(this);
        this.updateFlags = this.updateFlags.bind(this);
        this.doNext = this.doNext.bind(this);
        this.doBack = this.doBack.bind(this);
    }

    onChangeFromTabInput(categorizedValues, inputValue) {

        this.setState({
            inputValue: inputValue,
            categorizedValues: categorizedValues
        }, () => {
            console.log('onChangeFromTabInput', this.state.categorizedValues, this.state.inputValue);
        });
    }

    onChangeFromTabConfigValue() {
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
        this.setState({ outputRegExStr: strRegEx });
        si('outputRegExStr', strRegEx);
    }

    onChangeFromTabConfigFlag(prop, value) {

        if (prop) {
            var obj = {};
            obj[prop] = value;
            si(`flag:${prop}`, value);
            this.setState(obj, this.updateFlags);
        } else {
            this.updateFlags();
        }
    }

    updateFlags() {

        var outputRegExStr = this.state.outputRegExStr.replace(/^\/\^?([^$]+)\$?\/g?$/, '$1'),
            strRegEx = '';

        strRegEx += this.state.hasBegin ? '/^' : '/';
        strRegEx += outputRegExStr;
        strRegEx += this.state.hasEnd ? '$/' : '/';
        strRegEx += this.state.global ? 'g' : '';

        this.setState({ outputRegExStr: strRegEx });
        si('outputRegExStr', strRegEx);
    }

    onChangeFromTabOutput() { }

    doNext() {
        switch (this.state.currentTab) {
            case 'input':
            default:
                this.setState({ currentTab: 'configValue' });
                si('currentTab', 'configValue');
                break;
            case 'configValue':
                this.onChangeFromTabConfigValue();
                this.setState({ currentTab: 'configFlag' });
                si('currentTab', 'configFlag');
                break;
            case 'configFlag':
                this.onChangeFromTabConfigFlag();
                this.setState({ currentTab: 'output' });
                si('currentTab', 'output');
                break;
        }
    }

    doBack() {
        switch (this.state.currentTab) {
            case 'input':
            default:
                break;
            case 'configValue':
                this.setState({ currentTab: 'input' });
                si('currentTab', 'input');
                break;
            case 'configFlag':
                this.setState({ currentTab: 'configValue' });
                si('currentTab', 'configValue');
                break;
            case 'output':
                this.setState({ currentTab: 'configFlag' });
                si('currentTab', 'configFlag');
                break;
        }
    }

    render() {
        return (
            <div className="generator-wrapper">
                <ToolBar
                    currentTab={this.state.currentTab}
                    doNext={this.doNext}
                    doBack={this.doBack} />
                {this.state.currentTab === 'input' &&
                    <TabInput
                        categorizedValues={this.state.categorizedValues}
                        inputValue={this.state.inputValue}
                        onChange={this.onChangeFromTabInput}
                        onSubmit={this.doNext} />}
                {this.state.currentTab === 'configValue' &&
                    <TabConfigValue
                        categorizedValues={this.state.categorizedValues}
                        onChange={this.onChangeFromTabConfigValue}
                        onSubmit={this.doNext}
                        onBack={this.doBack} />}
                {this.state.currentTab === 'configFlag' &&
                    <TabConfigFlag
                        categorizedValues={this.state.categorizedValues}
                        hasBegin={this.state.hasBegin}
                        hasEnd={this.state.hasEnd}
                        global={this.state.global}
                        onChange={this.onChangeFromTabConfigFlag}
                        onSubmit={this.doNext}
                        onBack={this.doBack} />}
                {this.state.currentTab === 'output' &&
                    <TabOutput
                        outputRegExStr={this.state.outputRegExStr}
                        onChange={this.onChangeFromTabOutput}
                        onBack={this.doBack} />}
            </div>
        );
    }
}