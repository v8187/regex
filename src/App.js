import React, { Component } from 'react';
// import Sortable from 'sortablejs';

// import srvcData from './data.service';
// import { Token } from './models';
import { ToolBar } from './ToolBar';
import { InputTab } from './InputTab';
import { ConfirmInputTab } from './ConfirmInputTab';

import styles from './scss/main.scss';

// var _subscriptions = [];

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: [],
            inputValue: 'vikrAM-1234gupta@yhaoo.com',
            currentTab: 'input'
        };

        // this.handleSort = this.handleSort.bind(this);
        this.onChangeFromInputTab = this.onChangeFromInputTab.bind(this);
        this.onChangeFromConfirmInputTab = this.onChangeFromConfirmInputTab.bind(this);
        this.handleConfirmInputBack = this.handleConfirmInputBack.bind(this);
        this.doNext = this.doNext.bind(this);
        this.doBack = this.doBack.bind(this);
        this.doHelp = this.doHelp.bind(this);
    }

    componentDidMount() {
        /* this.sortable = new Sortable(this.elUl, {
            handle: '.handle-icon',
            sort: true,
            onSort: this.handleSort
        }); */
        // _subscriptions.push(
        //     srvcData.categorizedValues$.subscribe(categorizedValues => {
        //         this.setState({ categorizedValues: categorizedValues });
        //     }),
        //     srvcData.inputValue$.subscribe(inputValue => {
        //         this.setState({ inputValue: inputValue });
        //     }),
        //     srvcData.currentTab$.subscribe(currentTab => {
        //         this.setState({ currentTab: currentTab });
        //     })
        // );
    }

    componeneWillUnMount() {
        this.sortable = null;
        // _subscriptions.map(subcr => {
        //     subcr.unsubscribe();
        // });
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

    onChangeFromInputTab(categorizedValues, inputValue) {
        // srvcData.data('categorizedValues', categorizedValues);
        // srvcData.data('inputValue', inputValue);
        // srvcData.data('currentTab', 'confirmInput');
        this.setState({
            categorizedValues: categorizedValues,
            inputValue: inputValue/* ,
            currentTab: 'confirmInput' */
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
        // srvcData.data('currentTab', 'input');
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
                // srvcData.data('currentTab', 'confirmInput');
                this.setState({ currentTab: 'confirmInput' });
                break;
            case 'confirmInput':
                // srvcData.data('currentTab', 'confirmInput');
                // this.setState({currentTab:'confirmInput'});
                this.onChangeFromConfirmInputTab();
                break;
        }
    }

    doBack() {
        switch (this.state.currentTab) {
            case 'input':
            default:
                // srvcData.data('currentTab', 'input');
                // this.setState({currentTab:'confirmInput'});
                break;
            case 'confirmInput':
                // srvcData.data('currentTab', 'input');
                this.setState({ currentTab: 'input' });
                break;
        }
    }

    doHelp() {

    }

    render() {
        return (
            <div className="root">
                <ToolBar
                    currentTab={this.state.currentTab}
                    doNext={this.doNext}
                    doBack={this.doBack}
                    doHelp={this.doHelp} />
                {this.state.currentTab === 'input' &&
                    <InputTab
                        styles={styles}
                        categorizedValues={this.state.categorizedValues}
                        inputValue={this.state.inputValue}
                        onChange={this.onChangeFromInputTab}
                        onSubmit={this.doNext} />}
                {this.state.currentTab === 'confirmInput' &&
                    <ConfirmInputTab
                        styles={styles}
                        categorizedValues={this.state.categorizedValues}
                        onChange={this.onChangeFromConfirmInputTab}
                        onSubmit={this.doNext}
                        onBack={this.handleConfirmInputBack} />}
            </div>
        );
    }
}

export default App;