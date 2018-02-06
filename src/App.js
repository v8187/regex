import React, { Component } from 'react';
// import Sortable from 'sortablejs';


import srvcData from './data.service';
// import { Token } from './models';
import { ToolBar } from './ToolBar';
import { InputTab } from './InputTab';
import { ConfirmInputTab } from './ConfirmInputTab';

import styles from './scss/main.scss';

var _subscriptions = [];

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            categorizedValues: [],
            inputValue: '',
            currentTab: ''
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
        _subscriptions.push(
            srvcData.categorizedValues$.subscribe(categorizedValues => {
                this.setState({ categorizedValues: categorizedValues });
            }),
            srvcData.inputValue$.subscribe(inputValue => {
                this.setState({ inputValue: inputValue });
            }),
            srvcData.currentTab$.subscribe(currentTab => {
                this.setState({ currentTab: currentTab });
            })
        );
    }

    componeneWillUnMount() {
        this.sortable = null;
        _subscriptions.map(subcr => {
            subcr.unsubscribe();
        });
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

    render() {
        return (
            <div className={styles.root}>
                <ToolBar />
                {this.state.currentTab === 'input' &&
                    <InputTab
                        styles={styles}
                        categorizedValues={this.state.categorizedValues}
                        inputValue={this.state.inputValue}
                        onNext={this.handleInputNext} />}
                {this.state.currentTab === 'confirmInput' &&
                    <ConfirmInputTab
                        styles={styles}
                        categorizedValues={this.state.categorizedValues}
                        onNext={this.handleConfirmInputNext}
                        onBack={this.handleConfirmInputBack} />}
            </div>
        );
    }
}

export default App;