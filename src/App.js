import React, { Component } from 'react';
import Sortable from 'sortablejs';
// import { ControlType } from './ControlType';
import { TokenControl } from './TokenControl';
import { Bracket } from './Bracket';

const cagetories = [
  {
    label: 'Begin Group',
    id: 'bGroup',
    className: 'cat-b-group'
  },
  {
    label: 'Begin List',
    id: 'bList',
    className: 'cat-b-list'
  },
  {
    label: 'Custom Characters List',
    id: 'selCharList',
    className: 'cat-sel-char-list',
    hasInclude: true,
    hasOptional: true,
    hasInfinite: true,
    placeholder: 'Chars to Include/Exclude',
    hasMin: true,
    hasMax: true
  },
  {
    label: 'Alphabet(s)',
    id: 'alpha',
    className: 'cat-alpha',
    hasInclude: true,
    hasOptional: true,
    hasInfinite: true,
    placeholder: 'Alphabets to Include/Exclude',
    hasMin: true,
    hasMax: true
  },
  {
    label: 'Number(s)',
    id: 'num',
    className: 'cat-number',
    hasInclude: true,
    hasOptional: true,
    hasInfinite: true,
    placeholder: 'Numbers to Include/Exclude',
    hasMin: true,
    hasMax: true
  },
  {
    label: 'Special Characters(s)',
    id: 'splChar',
    className: 'cat-spl-char',
    hasInclude: true,
    hasOptional: true,
    hasInfinite: true,
    placeholder: 'Special char to Include/Exclude',
    hasMin: true,
    hasMax: true
  },
  {
    label: 'Space',
    id: 'space',
    className: 'cat-space',
    hasInclude: true,
    hasOptional: true,
    hasInfinite: true,
    hasMin: true,
    hasMax: true
  },
  {
    label: 'End List',
    id: 'eList',
    className: 'cat-e-list'
  },
  {
    label: 'End Group',
    id: 'eGroup',
    className: 'cat-e-group'
  }
],
  _renderCategories = () => {

    return cagetories.map((cate, i) => {
      // cate.index = i;
      return (<TokenControl key={i} {...cate} />);
    });
  },
  _renderElements = (elements) => {
    return elements.map((ele, i) => {

      switch (ele.type) {
        case 'bGroup':
          return <Bracket key={i} label="Begin Group" />;
        case 'bList':
          return <Bracket key={i} label="Begin List" />;
        case 'token':
          return <TokenControl key={i} />;
        case 'eList':
          return <Bracket key={i} label="End List" />;
        case 'eGroup':
          return <Bracket key={i} label="End Group" />;
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
        { type: 'bGroup', id: '', value: '' },
        { type: 'bList', id: '', value: '' },
        { type: 'token', id: '', value: '' },
        { type: 'eList', id: '', value: '' },
        { type: 'eGroup', id: '', value: '' }
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
      elements: this.state.elements.concat({ type: 'bGroup', id: '', value: '' },{ type: 'eGroup', id: '', value: '' })
    });
  }

  addList(evt) {
    evt.preventDefault();

    this.setState({
      elements: this.state.elements.concat({ type: 'bList', id: '', value: '' },{ type: 'eList', id: '', value: '' })
    });
  }

  addToken(evt) {
    evt.preventDefault();

    this.setState({
      elements: this.state.elements.concat({ type: 'token', id: '', value: '' })
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
           { _renderElements(this.state.elements)}
          </ul>
        </fieldset>
        <output></output>
      </form>
    );
  }
}

export default App;