import React, { Component } from 'react';
import Sortable from 'sortablejs';

import { TokenControl } from './TokenControl';
import { Bracket } from './Bracket';
import { BGroup, EGroup, Token, BList, EList } from './models';

const _renderElements = (ctx) => {
    console.log('_renderElements ', ctx.state.elements.length);
    return ctx.state.elements.map((ele, i) => {
        console.log(ele.id);
        let _obj = {
            key: i,
            onRemove: () => {
                let pair = [ele.id];

                if(ele.type !== 'token') {
                    let tempId = ele.id,
                    isB = ele.type.indexOf('b') === 0;

                    pair.push(tempId.replace(isB ? 'ctrlb' : 'ctrle', isB ? 'ctrle' : 'ctrlb'));
                }
                ctx.removeElement(pair);
            },
            label: ele.label,
            className: ele.className
        };

        switch (ele.type) {
            case 'bGroup':
                return <Bracket {..._obj} />;
            case 'bList':
                return <Bracket {..._obj} />;
            case 'token':
                return <TokenControl {..._obj} />;
            case 'eList':
                return <Bracket {..._obj} />;
            case 'eGroup':
                return <Bracket {..._obj} />;
            default:
                return null;
        }
    });
};

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            elements: [
                new BGroup(),
                new BList(),
                new Token(),
                new EList(),
                new EGroup()
            ]
        };

        this.addGroup = this.addGroup.bind(this);
        this.addList = this.addList.bind(this);
        this.addToken = this.addToken.bind(this);
    }

    componentDidMount() {
        this.sortable = new Sortable(this.elUl, {
            handle: '.handle-icon',
            sort: true
        });
    }

    componeneWillUnMount() {
        this.sortable = null;
    }

    addGroup(evt) {
        evt.preventDefault();

        this.setState({
            elements: this.state.elements.concat(new BGroup(), new EGroup())
        });
    }

    addList(evt) {
        evt.preventDefault();

        this.setState({
            elements: this.state.elements.concat(new BList(), new EList())
        });
    }

    addToken(evt) {
        evt.preventDefault();

        this.setState({
            elements: this.state.elements.concat(new Token())
        });
    }

    removeElement(ids) {
        var _filteredList = this.state.elements.filter(ele => {
            return ele.id !== ids[0] && ele.id !== ids[1];
        });

        _filteredList.map(ele => ele.updateId());

        this.setState({
            elements: _filteredList
        });
    }

    render() {
        return (
            <form id="generator">
                <fieldset id="characterTypes">
                    <legend>Drag and Drop to re-arrange the following items:
            <button onClick={this.addGroup}>Add Group</button>
                        <button onClick={this.addToken}>Add Token Control</button>
                        <button onClick={this.addList}>Add List</button>
                    </legend>
                    <ul ref={ul => { this.elUl = ul; }}>
                        {_renderElements(this)}
                    </ul>
                </fieldset>
                <output></output>
            </form>
        );
    }
}

export default App;