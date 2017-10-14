import React, { Component } from 'react';
import Sortable from 'sortablejs';

import { TokenControl } from './TokenControl';
import { Token } from './models';

const _renderTokenControls = (ctx) => {
    return ctx.state.tokenControls.map((token, i) => {
        let _obj = {
            key: i,
            onRemove: () => {
                ctx.removeToken(token.id);
            },
            onChange: ctx.onTokenValueChange,
            id: token.id,
            index: token.index,
            className: token.className,
            value: token.value,
            canJoin: token.canJoin
        };

        return <TokenControl {..._obj} />;
    });
};

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            tokenControls: []
        };

        this.addToken = this.addToken.bind(this);
        this.removeToken = this.removeToken.bind(this);
        this.onTokenValueChange = this.onTokenValueChange.bind(this);
    }

    componentDidMount() {
        this.addToken();

        this.sortable = new Sortable(this.elUl, {
            handle: '.handle-icon',
            sort: true,
            onSort: (evt) => {
                console.log('Sortable: onSort', evt);
            }
        });
    }

    componeneWillUnMount() {
        this.sortable = null;
    }

    addToken(evt) {
        evt && evt.preventDefault();

        this.setState({
            tokenControls: this.state.tokenControls.concat(this.setTokenId(new Token(), this.state.tokenControls.length))
        });
    }

    setTokenId(token, index) {
        token.index = index;
        token.id = `ctrlToken${index}`;
        token.canJoin = !!index;

        return token;
    }

    removeToken(id) {
        var _filteredControls = this.state.tokenControls.filter(token => {
            return token.id !== id;
        });

        console.log(_filteredControls.map((token, i) => {
            this.setTokenId(token, i);
            return token;
        }));

        this.setState({
            tokenControls: _filteredControls
        });
    }

    onTokenValueChange(val) {
        console.log('onTokenValueChange', val);
    }

    render() {
        return (
            <form id="generator">
                <fieldset id="characterTypes">
                    <legend>Drag and Drop to re-arrange the following items:
                        <button onClick={this.addToken}>Add Token Control</button>
                    </legend>
                    <ul ref={ul => { this.elUl = ul; }}>
                        {_renderTokenControls(this)}
                    </ul>
                </fieldset>
                <output></output>
            </form>
        );
    }
}

export default App;