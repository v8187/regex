import React, { Component } from 'react';
import { ControlType } from './ControlType';

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
      cate.index = i;
      return (<ControlType key={i} {...cate} />);
    });
  };

class App extends Component {
  render() {
    return (
      <form id="generator">
        <fieldset id="characterTypes">
          <legend>Drag and Drop to re-arrange the following items:</legend>
          <ul>
            {_renderCategories()}
          </ul>
        </fieldset>
        <output></output>
      </form>
    );
  }
}

export default App;