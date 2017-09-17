import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <form id="generator">
        <fieldset id="characterTypes">
          <legend>Drag and Drop to re-arrange the following items:</legend>
          <ul></ul>
        </fieldset>
        <output></output>
      </form>
    );
  }
}

export default App;
