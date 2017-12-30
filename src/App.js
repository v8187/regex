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
            inputValue: '',
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
        console.log('handleConfirmInputNext', this.state.categorizedValues, this.state.inputValue);
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